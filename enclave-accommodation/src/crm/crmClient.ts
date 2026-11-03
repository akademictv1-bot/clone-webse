/**
 * ================================================================
 *  LIGAÇÃO AO CRM (Google Apps Script) — Enclave Accommodation
 * ================================================================
 *
 *  >>> ÚNICO LUGAR do site onde o URL do CRM é configurado <<<
 *
 *  1. Abra a implantação do Apps Script e copie o URL que termina
 *     em "/exec".
 *  2. Cole-o aqui dentro das aspas, por exemplo:
 *         const CRM_ENDPOINT = "https://script.google.com/macros/s/AKfy.../exec";
 *
 *  NÃO coloque aqui credenciais, tokens ou lógica de administração:
 *  só o proprietário confirma/cancela os pedidos a partir do
 *  enlace recebido por e-mail (tudo isso vive no CRM).
 */

// ⚠️ COLE AQUI O URL /exec DO SEU BACKEND (Apps Script) ⚠️
export const CRM_ENDPOINT = "https://script.google.com/macros/s/AKfycbzw7lw6hYXiiWSz0wAJ3k6oyGrEssAjnLTIraJxl8HTdZ98vmAAg2be4-LXSzUVYG2iUw/exec";

/** Endereço activo (a app usa CRM_ENDPOINT; o definidor serve só para testes). */
let enderecoActivo = CRM_ENDPOINT;

/** Só para testes automatizados em Node — o site nunca usa isto. */
export function definirEndpointParaTestes(url: string): void {
  enderecoActivo = url;
}

export type ErroCrm =
  | "datas_indisponiveis"
  | "datas_invalidas"
  | "dados_invalidos"
  | "falha_interna";

export interface IntervaloOcupado {
  de: string; // "AAAA-MM-DD" (check-in ocupado)
  ate: string; // "AAAA-MM-DD" (dia de saída — fica livre)
}

export interface RespostaCrm {
  ok: boolean;
  id?: string;
  erro?: ErroCrm;
}

const ERROS_CONHECIDOS: ErroCrm[] = [
  "datas_indisponiveis",
  "datas_invalidas",
  "dados_invalidos",
  "falha_interna"
];

function normalizarErro(valor: unknown): ErroCrm {
  return ERROS_CONHECIDOS.includes(valor as ErroCrm)
    ? (valor as ErroCrm)
    : "falha_interna";
}

/**
 * Leva uma acomodação do site ao ID estável de propriedade usado pelo CRM:
 *  - "chimoio"          → Enclave Chimoio (Trangapasso)
 *  - "nyanga"           → Nyanga Enclave
 *  - "greenside-mutare" → Greenside Enclave (Main House + Cottage, mesmo terreno)
 * ajustável aqui sem tocar no resto do site.
 */
export function identificarPropriedade(acc: { name?: string; city?: string }): string {
  const norm = (s?: string) =>
    (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const alvo = `${norm(acc?.name)} ${norm(acc?.city)}`;
  if (alvo.includes("chimoio")) return "chimoio";
  if (alvo.includes("nyanga")) return "nyanga";
  if (alvo.includes("greenside") || alvo.includes("mutare")) return "greenside-mutare";
  return "";
}

/** Envia uma reserva (tipo=reserva) ao CRM com URLSearchParams (x-www-form-urlencoded, sem cabeçalhos próprios). */
export async function enviarReserva(campos: Record<string, string>): Promise<RespostaCrm> {
  if (!enderecoActivo) {
    console.warn("CRM_ENDPOINT não configurado — cole o URL /exec em src/crm/crmClient.ts");
    return { ok: false, erro: "falha_interna" };
  }
  try {
    const corpo = new URLSearchParams({ tipo: "reserva", ...campos });
    const resposta = await fetch(enderecoActivo, { method: "POST", body: corpo });
    const dados = await resposta.json();
    if (dados && dados.ok === true) {
      return { ok: true, id: String(dados.id || "") };
    }
    return { ok: false, erro: normalizarErro(dados && dados.erro) };
  } catch (e) {
    console.warn("Falha de rede ao contactar o CRM:", e);
    return { ok: false, erro: "falha_interna" };
  }
}

/** Envia um contacto (tipo=lead) ao CRM com o mesmo método. */
export async function enviarLead(campos: {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  idioma: string;
  origem: string;
}): Promise<RespostaCrm> {
  if (!enderecoActivo) {
    console.warn("CRM_ENDPOINT não configurado — cole o URL /exec em src/crm/crmClient.ts");
    return { ok: false, erro: "falha_interna" };
  }
  try {
    const corpo = new URLSearchParams({ tipo: "lead", ...campos });
    const resposta = await fetch(enderecoActivo, { method: "POST", body: corpo });
    const dados = await resposta.json();
    if (dados && dados.ok === true) {
      return { ok: true, id: dados.id ? String(dados.id) : undefined };
    }
    return { ok: false, erro: normalizarErro(dados && dados.erro) };
  } catch (e) {
    console.warn("Falha de rede ao contactar o CRM:", e);
    return { ok: false, erro: "falha_interna" };
  }
}

/**
 * Pede a disponibilidade de uma propriedade ao CRM:
 *   GET CRM_ENDPOINT?acao=disponibilidade&propriedade=<ID>
 * Resposta: { ok: true, ocupadas: [{ de, ate }] }
 * Em caso de falha devolve [] e o site deixa reservar na mesma,
 * porque o servidor volta a validar ao registar o pedido.
 */
export async function obterDisponibilidade(propriedade: string): Promise<IntervaloOcupado[]> {
  if (!enderecoActivo || !propriedade) return [];
  try {
    const url = `${enderecoActivo}?acao=disponibilidade&propriedade=${encodeURIComponent(propriedade)}`;
    const resposta = await fetch(url, { method: "GET" });
    const dados = await resposta.json();
    if (dados && dados.ok === true && Array.isArray(dados.ocupadas)) {
      return dados.ocupadas
        .filter((r: unknown) => {
          const x = r as IntervaloOcupado;
          return !!x && /^\d{4}-\d{2}-\d{2}$/.test(x.de || "") && /^\d{4}-\d{2}-\d{2}$/.test(x.ate || "");
        })
        .map((r: IntervaloOcupado) => ({ de: r.de, ate: r.ate }));
    }
    return [];
  } catch (e) {
    console.warn("Disponibilidade não confirmada (o pedido ainda é validado pelo servidor):", e);
    return [];
  }
}

/** Mensagens de erro claras para o visitante (pt/en). */
export function descreverErro(erro: ErroCrm | undefined, idioma: "pt" | "en"): string {
  const pt = idioma === "pt";
  switch (erro) {
    case "datas_indisponiveis":
      return pt
        ? "As datas que escolheu já foram reservadas entretanto. Por favor escolha outras datas no calendário."
        : "The dates you chose have just been booked. Please pick different dates on the calendar.";
    case "datas_invalidas":
      return pt
        ? "As datas não são válidas: confirme que o check-out é depois do check-in e que o check-in não é no passado."
        : "The dates are not valid: make sure check-out is after check-in and check-in is not in the past.";
    case "dados_invalidos":
      return pt
        ? "Verifique os campos do formulário: nome e telefone são obrigatórios e as datas devem estar preenchidas."
        : "Please review the form: name and phone are required and the dates must be filled in.";
    case "falha_interna":
    default:
      return pt
        ? "Não foi possível registar o seu pedido neste momento. Tente novamente dentro de momentos ou fale connosco pelo WhatsApp."
        : "We could not register your request right now. Please try again in a moment or reach us on WhatsApp.";
  }
}
