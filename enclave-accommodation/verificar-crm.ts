/**
 * ================================================================
 * VERIFICAÇÃO DA INTEGRAÇÃO RESERVAS ↔ CRM (sem rede externa)
 * ================================================================
 * Um servidor HTTP local imita 1:1 as regras do CRM-ENCLAVE-Apps-Script.gs
 * (mesmos códigos de erro, mesma regra de sobreposição, mesma semântica de
 * disponibilidade) e o cliente do site é testado contra ele:
 *   1. Reserva normal                          → ok:true, id
 *   2. Datas sobrepostas (semeada e recém-criada) → datas_indisponiveis
 *   3. Datas inválidas (ordem, passado, formato) → datas_invalidas
 *   4. Dados em falta / propriedade desconhecida → dados_invalidos
 *   5. Lead do formulário de contacto          → ok:true
 *   6. Disponibilidade com datas ocupadas (noites interiores bloqueadas,
 *      dia de saída livre, disponibilidade isolada por propriedade)
 *   7. Funções puras de datas (noites, validações, formatação)
 *   8. Comportamento sem CRM_ENDPOINT configurado
 *
 * Executar:  npm exec tsx -- verificar-crm.ts   (pasta enclave-accommodation)
 */

import * as http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";

import {
  definirEndpointParaTestes,
  enviarLead,
  enviarReserva,
  obterDisponibilidade
} from "./src/crm/crmClient";
import {
  contarNoites,
  dataValidaISO,
  estadiaLivre,
  formatarDataVisivel,
  hojeISO,
  incrementarDia,
  noitesOcupadas,
  validarDatasCliente
} from "./src/crm/datas";

/* ---------- Emulação fiel do backend Apps Script ---------- */

interface LinhaReserva {
  propriedade: string;
  status: string;
  checkin: string;
  checkout: string;
  id: string;
}

const PROPRIEDADES_VALIDAS = ["chimoio", "nyanga", "greenside-mutare"];

/** Tabela "Reservas" semeada: reserva existente em cada grupo de propriedades. */
const reservas: LinhaReserva[] = [
  { id: "RES-SEMEADA-GS", propriedade: "greenside-mutare", status: "Confirmada", checkin: incrementarDia(hojeISO(), 3), checkout: incrementarDia(hojeISO(), 6) },
  { id: "RES-SEMEADA-CH", propriedade: "chimoio", status: "Nova", checkin: incrementarDia(hojeISO(), 100), checkout: incrementarDia(hojeISO(), 103) },
  { id: "RES-SEMEADA-CANC", propriedade: "nyanga", status: "Cancelada", checkin: incrementarDia(hojeISO(), 200), checkout: incrementarDia(hojeISO(), 210) }
];

function eDataISO(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s || "")) return false;
  const d = new Date(s + "T00:00:00Z");
  return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function noitesEntre(ci: string, co: string): number {
  const a = new Date(ci + "T00:00:00Z").getTime();
  const b = new Date(co + "T00:00:00Z").getTime();
  if (isNaN(a) || isNaN(b)) return 0;
  return Math.round((b - a) / 86400000);
}

function identificarPropriedade(p: Record<string, string>): string {
  const candidato = (p.propriedade || "").toLowerCase().trim();
  if (PROPRIEDADES_VALIDAS.indexOf(candidato) !== -1) return candidato;
  /* no emulador é suficiente: o cliente real envia sempre o ID estável */
  return "";
}

function intervalosOcupados(propriedade: string): { de: string; ate: string }[] {
  return reservas
    .filter((r) => r.propriedade === propriedade && r.status.toLowerCase() !== "cancelada")
    .map((r) => ({ de: r.checkin, ate: r.checkout }));
}

let contadorId = 0;
function novoIdReserva(): string {
  contadorId += 1;
  return "RES-TESTE-" + String(contadorId).padStart(3, "0");
}

/** Porta directa de doPost/processarReserva do .gs. */
function doPostEmulado(campos: Record<string, string>): { ok: boolean; id?: string; erro?: string } {
  const tipo = (campos.tipo || "lead").toLowerCase();
  if (tipo === "reserva") {
    const nome = (campos.nome || "").trim();
    const telefone = (campos.telefone || "").trim();
    const checkin = (campos.checkin || "").trim();
    const checkout = (campos.checkout || "").trim();
    if (!nome || !telefone || !checkin || !checkout) return { ok: false, erro: "dados_invalidos" };

    const propriedade = identificarPropriedade(campos);
    if (!propriedade) return { ok: false, erro: "dados_invalidos" };

    if (!eDataISO(checkin) || !eDataISO(checkout)) return { ok: false, erro: "datas_invalidas" };
    if (noitesEntre(checkin, checkout) < 1) return { ok: false, erro: "datas_invalidas" };
    if (checkin < hojeISO()) return { ok: false, erro: "datas_invalidas" };

    for (const oi of intervalosOcupados(propriedade)) {
      if (checkin < oi.ate && checkout > oi.de) {
        return { ok: false, erro: "datas_indisponiveis" };
      }
    }

    const id = novoIdReserva();
    reservas.push({ id, propriedade, status: "Nova", checkin, checkout });
    return { ok: true, id };
  }
  // tipo=lead
  if (!(campos.nome || "").trim()) return { ok: false, erro: "dados_invalidos" };
  return { ok: true };
}

function doGetEmulado(query: URLSearchParams): unknown {
  const acao = (query.get("acao") || "").toLowerCase();
  if (acao === "disponibilidade") {
    const propriedade = (query.get("propriedade") || "").trim();
    if (PROPRIEDADES_VALIDAS.indexOf(propriedade) === -1) {
      return { ok: false, erro: "dados_invalidos" };
    }
    return { ok: true, ocupadas: intervalosOcupados(propriedade) };
  }
  return { texto: "OK — CRM Enclave Accommodation ativo" };
}

/* ---------- Servidor local ---------- */

function lerCorpo(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let dados = "";
    req.on("data", (c) => { dados += c; });
    req.on("end", () => resolve(dados));
  });
}

function iniciarServidor(): Promise<{ url: string; fechar: () => void }> {
  const servidor = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const u = new URL(req.url || "/", "http://local.test");
    let saida = { ok: false, erro: "falha_interna" as unknown as unknown };
    if (req.method === "POST") {
      const corpo = await lerCorpo(req);
      saida = doPostEmulado(Object.fromEntries(new URLSearchParams(corpo))) as unknown as typeof saida;
    } else {
      saida = doGetEmulado(u.searchParams) as unknown as typeof saida;
    }
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(saida));
  });
  return new Promise((resolve) => {
    servidor.listen(0, "127.0.0.1", () => {
      const addr = servidor.address();
      const porta = typeof addr === "object" && addr ? addr.port : 0;
      resolve({
        url: `http://127.0.0.1:${porta}/exec`,
        fechar: () => servidor.close()
      });
    });
  });
}

/* ---------- Banco de asserções ---------- */

let falhas = 0;
let testes = 0;

function verificar(nome: string, condicao: boolean, detalhe?: string): void {
  testes += 1;
  if (condicao) {
    console.log("  PASS  " + nome);
  } else {
    falhas += 1;
    console.log("  FALHA " + nome + (detalhe ? " — " + detalhe : ""));
  }
}

function igual(nome: string, actual: unknown, esperado: unknown): void {
  verificar(nome, JSON.stringify(actual) === JSON.stringify(esperado), "obtido=" + JSON.stringify(actual) + " esperado=" + JSON.stringify(esperado));
}

async function main(): Promise<void> {
  console.log("== Integração reservas ↔ CRM (verificar-crm.ts) ==\n");

  /* --- 7. Funções puras de datas (independentes de rede) --- */
  console.log("[Datas — funções puras]");
  igual("dataValidaISO aceita 2026-07-31", dataValidaISO("2026-07-31"), true);
  igual("dataValidaISO rejeita 30/02/2026", dataValidaISO("2026-02-30"), false);
  igual("dataValidaISO rejeita dd/mm/aaaa", dataValidaISO("04/08/2026"), false);
  igual("contarNoites(+5, +8) = 3", contarNoites("2026-07-05", "2026-07-08"), 3);
  igual("contarNoites invertida = 0", contarNoites("2026-07-08", "2026-07-05"), 0);

  const quadro = noitesOcupadas([{ de: "2026-08-01", ate: "2026-08-05" }]);
  verificar("intervalo 01–05/08 ocupa noites 01..04", !quadro.has("2026-08-05") && ["2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04"].every((d) => quadro.has(d)));
  verificar("check-in no dia ocupado (02/08) é inválido", !estadiaLivre("2026-08-02", "2026-08-09", quadro));
  verificar("check-out no dia de saída (05/08) é livre para nova entrada", estadiaLivre("2026-08-05", "2026-08-08", quadro));
  // estadia que TERMINA na ENTRADA de outra: outra = 05–08/08; até 05/08 as noites 01..04 são todas livres
  const quadro2 = noitesOcupadas([{ de: "2026-08-05", ate: "2026-08-08" }]);
  verificar("estadia que termina na entrada do outro (05/08) é válida", estadiaLivre("2026-08-01", "2026-08-05", quadro2));
  verificar("estadia que atravessa noites ocupadas é inválida", !estadiaLivre("2026-07-31", "2026-08-03", quadro));

  const hoje = hojeISO();
  verificar("validarDatasCliente(data passada) assinala", validarDatasCliente(incrementarDia(hoje, -3), incrementarDia(hoje, 2)).length > 0);
  verificar("validarDatasCliente(ordem invertida) assinala", validarDatasCliente(incrementarDia(hoje, 5), incrementarDia(hoje, 3)).length > 0);
  verificar("validarDatasCliente(intervalo válido) passa", validarDatasCliente(incrementarDia(hoje, 5), incrementarDia(hoje, 8)).length === 0);
  igual("formatarDataVisivel('2026-12-31')", formatarDataVisivel("2026-12-31"), "31/12/2026");

  /* --- 8. Sem endpoint configurado --- */
  console.log("\n[Sem CRM_ENDPOINT configurado]");
  const semEndpoint = await enviarReserva({ nome: "X", telefone: "1", checkin: incrementarDia(hojeISO(), 5), checkout: incrementarDia(hojeISO(), 6) });
  igual("enviarReserva sem endpoint → falha_interna (mensagem aconselha WhatsApp)", semEndpoint.ok === false && semEndpoint.erro === "falha_interna", true);

  /* --- 1..6. Cliente contra o servidor que imita o Apps Script --- */
  const { url, fechar } = await iniciarServidor();
  definirEndpointParaTestes(url);
  console.log("\n[Servidor emulador do Apps Script em " + url + "]");

  // 1. Reserva normal
  const normal = await enviarReserva({
    propriedade: "chimoio", acomodacao: "Enclave Chimoio (Trangapasso)",
    nome: "Ana Teste", telefone: "+258845555555", email: "ana@teste.com",
    cidade: "Chimoio", pais: "Moçambique", opcao: "Casa Inteira (Whole House)",
    tarifa: "USD 150", hospedes: "4", total: "USD 450",
    observacoes: "Chegada tardia", checkin: incrementarDia(hojeISO(), 20),
    checkout: incrementarDia(hojeISO(), 23), noites: "3", idioma: "pt"
  });
  verificar("reserva normal → ok", normal.ok === true);
  verificar("reserva normal → id começa por RES-", /^RES-/.test(normal.id || ""), normal.id);

  // 2. Datas sobrepostas (contra semeada e contra a recém-criada)
  const sobrepostaSemeada = await enviarReserva({
    propriedade: "chimoio", nome: "Berta Teste", telefone: "+258841111111",
    checkin: incrementarDia(hojeISO(), 102), checkout: incrementarDia(hojeISO(), 104), noites: "2", idioma: "pt"
  });
  igual("sobreposição com reserva semeada → datas_indisponiveis", [sobrepostaSemeada.ok, sobrepostaSemeada.erro], [false, "datas_indisponiveis"]);

  const sobrepostaRecem = await enviarReserva({
    propriedade: "chimoio", nome: "Carlos Teste", telefone: "+258842222222",
    checkin: incrementarDia(hojeISO(), 21), checkout: incrementarDia(hojeISO(), 24), noites: "3", idioma: "en"
  });
  igual("sobreposição com reserva acabada de criar → datas_indisponiveis", [sobrepostaRecem.ok, sobrepostaRecem.erro], [false, "datas_indisponiveis"]);

  // 3. Datas inválidas
  const ordemInvertida = await enviarReserva({
    propriedade: "chimoio", nome: "Dora Teste", telefone: "+258843333333",
    checkin: incrementarDia(hojeISO(), 10), checkout: incrementarDia(hojeISO(), 10), noites: "0", idioma: "pt"
  });
  igual("checkout igual ao check-in → datas_invalidas", [ordemInvertida.ok, ordemInvertida.erro], [false, "datas_invalidas"]);

  const noPassado = await enviarReserva({
    propriedade: "chimoio", nome: "Edu Teste", telefone: "+258844444444",
    checkin: incrementarDia(hojeISO(), -2), checkout: incrementarDia(hojeISO(), 2), noites: "4", idioma: "pt"
  });
  igual("check-in no passado → datas_invalidas", [noPassado.ok, noPassado.erro], [false, "datas_invalidas"]);

  const formatoMau = await enviarReserva({
    propriedade: "chimoio", nome: "Fina Teste", telefone: "+258845555551",
    checkin: "04/08/2026", checkout: "06/08/2026", noites: "2", idioma: "pt"
  });
  igual("formato dd/mm/aaaa → datas_invalidas", [formatoMau.ok, formatoMau.erro], [false, "datas_invalidas"]);

  // 4. Dados inválidos
  const semTelefone = await enviarReserva({
    propriedade: "nyanga", nome: "Gil Teste", telefone: "",
    checkin: incrementarDia(hojeISO(), 40), checkout: incrementarDia(hojeISO(), 43), noites: "3", idioma: "pt"
  });
  igual("sem telefone → dados_invalidos", [semTelefone.ok, semTelefone.erro], [false, "dados_invalidos"]);

  const propriedadeErrada = await enviarReserva({
    propriedade: "villa-misteriosa", nome: "Hugo Teste", telefone: "+258846666666",
    checkin: incrementarDia(hojeISO(), 40), checkout: incrementarDia(hojeISO(), 43), noites: "3", idioma: "pt"
  });
  igual("propriedade fora da lista → dados_invalidos", [propriedadeErrada.ok, propriedadeErrada.erro], [false, "dados_invalidos"]);

  // 5. Lead (contacto)
  const lead = await enviarLead({ nome: "Iris Teste", email: "iris@teste.com", telefone: "+258847777777", mensagem: "Quero informação", idioma: "pt", origem: "site" });
  verificar("lead do formulário de contacto → ok", lead.ok === true);
  const leadSemNome = await enviarLead({ nome: "", email: "x@y.com", telefone: "+258848888888", mensagem: "m", idioma: "pt", origem: "site" });
  igual("lead sem nome → dados_invalidos", [leadSemNome.ok, leadSemNome.erro], [false, "dados_invalidos"]);

  // 6. Propriedade com datas ocupadas (greenside-mutare partilhado)
  const ocupadasGs = await obterDisponibilidade("greenside-mutare");
  igual("disponibilidade greenside-mutare → intervalos semeados (Main House partilha Cottage)", ocupadasGs, [{ de: incrementarDia(hoje, 3), ate: incrementarDia(hoje, 6) }]);

  const magnetGs = noitesOcupadas(ocupadasGs);
  verificar("+3, +4, +5 desactivadas no calendário", magnetGs.has(incrementarDia(hoje, 3)) && magnetGs.has(incrementarDia(hoje, 4)) && magnetGs.has(incrementarDia(hoje, 5)));
  verificar("dia de saída +6 fica livre para novo check-in", !magnetGs.has(incrementarDia(hoje, 6)));
  verificar("estadia +1–+6 atravessa noites ocupadas → inválida", !estadiaLivre(incrementarDia(hoje, 1), incrementarDia(hoje, 6), magnetGs));
  verificar("estadia +6–+8 (entra no dia da saída do outro) → válida", estadiaLivre(incrementarDia(hoje, 6), incrementarDia(hoje, 8), magnetGs));

  const ocupadasCh = await obterDisponibilidade("chimoio");
  const diasOcupadosCh = new Set(ocupadasCh.flatMap((r) => Array.from(noitesOcupadas([r]))));
  verificar(
    "disponibilidade de chimoio isola da de greenside-mutare (semeada + reserva recém-criada, nenhuma de greenside)",
    diasOcupadosCh.has(incrementarDia(hoje, 100)) &&
      diasOcupadosCh.has(incrementarDia(hoje, 20)) &&
      !diasOcupadosCh.has(incrementarDia(hoje, 3)) &&
      !diasOcupadosCh.has(incrementarDia(hoje, 4)) &&
      !diasOcupadosCh.has(incrementarDia(hoje, 5))
  );

  const ocupadasNy = await obterDisponibilidade("nyanga");
  verificar("reserva Cancelada não bloqueia (nyanga sem ocupação)", ocupadasNy.length === 0);

  const propriedadeVazia = await obterDisponibilidade("");
  verificar("sem propriedade → sem bloqueios (reserva prossegue; servidor valida)", propriedadeVazia.length === 0);

  fechar();

  console.log("\n== Resultado: " + (testes - falhas) + "/" + testes + " testes passaram ==");
  if (falhas > 0) {
    console.log(falhas + " TESTE(S) FALHARAM");
    process.exit(1);
  }
  console.log("Tudo em ordem. Copie o URL /exec e cole-o em src/crm/crmClient.ts.");
}

main().catch((e) => {
  console.error("Erro fatal nos testes:", e);
  process.exit(1);
});
