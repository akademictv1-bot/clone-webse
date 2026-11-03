# CÓDIGO COMPLETO — CRM ENCLAVE (para copiar e colar)

Este ficheiro tem **tudo** o que precisa para pôr o CRM a funcionar.
Siga a ordem: **1 → 2 → 3 → 4 → 5**.

---

## 1. CRIAR A FOLHA NO GOOGLE SHEETS

1. Abra [sheets.google.com](https://sheets.google.com) com a sua conta Google.
2. Clique em **+ Em branco**.
3. Dê o nome à folha: **CRM Enclave Accommodation**.

> **Não precisa de criar as abas/colunas à mão!**
> O código (passo 2) cria as abas **Leads** e **Reservas** com todas as colunas
> automaticamente. Só tem de executar o menu uma vez (ver passo 2, n.º 6).

### Tabelas que vão ficar criadas (aba 1: Leads)

| Ordem | Coluna | Opções (lista pendente) |
|-------:|--------|--------------------------|
| 1 | Data/Hora | — |
| 2 | Nome | — |
| 3 | Email | — |
| 4 | Telefone | — |
| 5 | Mensagem | — |
| 6 | Idioma | pt / en |
| 7 | Origem | — (ex.: site) |
| 8 | Status | Novo · Em conversa · Reservado · Sem resposta · Perdido |
| 9 | Observações internas | — |

### Tabelas que vão ficar criadas (aba 2: Reservas)

| Ordem | Coluna | Opções (lista pendente) |
|-------:|--------|--------------------------|
| 1 | ID | — (o CRM cria ex.: RES-260819-X4K2) |
| 2 | Data/Hora | — |
| 3 | Nome do hóspede | — |
| 4 | Telefone/WhatsApp | — |
| 5 | Propriedade | chimoio · nyanga · greenside-mutare |
| 6 | Acomodação | — |
| 7 | Cidade/País | — |
| 8 | Opção de quarto | — |
| 9 | Tarifa | — |
| 10 | Check-in | — (AAAA-MM-DD) |
| 11 | Check-out | — (AAAA-MM-DD) |
| 12 | Noites | — |
| 13 | Hóspedes | — |
| 14 | Total estimado | — |
| 15 | Observações | — |
| 16 | Idioma | pt / en |
| 17 | Status | Nova · Confirmada · Hóspede chegou · Concluída · Cancelada |
| 18 | Observações internas | — |

> **Prefere criar as abas à mão?** Também pode: crie duas abas com os nomes exatos
> `Leads` e `Reservas` e os títulos das colunas acima pela ordem apresentada.
> Depois execute "1. Preparar abas do CRM" (passo 2, n.º 6) — ele completa formatação,
> larguras e listas pendentes. Se a aba `Reservas` for antiga (sem as colunas
> **ID** e **Propriedade**), o mesmo botão insere essas colunas sem perder dados.

---

## 2. COLAR O CÓDIGO NO APPS SCRIPT

1. Na folha do Google Sheets, menu: **Extensões > Apps Script**.
2. Vai abrir o editor. Apague **tudo** o que lá estiver no ficheiro `Código.gs`.
3. Copie **TODO** o código dentro da caixa verde do **passo 3** (abaixo) e cole lá.
4. ⚠️ Mude o segredo que protege os links de confirmar/cancelar: procure
   `SEGREDO_ADMIN` no início do código e escreva a sua frase secreta, ex.:
   `SEGREDO_ADMIN: "minha-frase-secreta-enclave-2026"`.
5. Clique **Guardar** (Ctrl + S).
6. Volte à folha, recarregue (F5). Aparece o menu **CRM Enclave** no topo:
   - **1. Preparar abas do CRM** → autorize quando pedir
     (Avançado > Ir para CRM Enclave (não seguro) > Permitir).
   - **2. Enviar e-mail de teste** → confirme a caixa de entrada (e o spam).
7. No Apps Script: **Definições do projeto > Fuso horário** → escolha **Africa/Maputo**.

---

## 3. O CÓDIGO COMPLETO DO CRM (Google Apps Script)

**Copie tudo, do `/**` até ao fim, dentro da caixa:**

```javascript
/** ================================================================
 *  CRM ENCLAVE ACCOMMODATION — Google Sheets + E-mail automático
 *  ================================================================
 *  COMO INSTALAR (passo a passo em INSTRUCOES-CRM-GOOGLE-SHEETS.md):
 *  1. Abra a folha do Google Sheets do CRM.
 *  2. Menu: Extensões > Apps Script. Apague tudo e cole este código.
 *  3. Salve (Ctrl+S). Volte à folha e recarregue (F5).
 *  4. Aparecerá o menu "CRM Enclave" no topo da folha.
 *  5. CRM Enclave > "1. Preparar abas do CRM" → autorize quando pedir
 *     (Avançado > Ir para CRM Enclave (não seguro) > Permitir).
 *  6. CRM Enclave > "2. Enviar e-mail de teste" → verifique a caixa de entrada.
 *  7. No Apps Script: Implantação > Nova implantação > tipo "Aplicativo da Web":
 *       - Descrição: CRM Enclave v2
 *       - Executar como: Eu (o seu e-mail)
 *       - Quem tem acesso: Qualquer pessoa
 *     Copie o URL gerado (termina em /exec) — é o CRM_ENDPOINT do site.
 *     (Se já tinha uma implantação: Implantação > Gerenciar implantações >
 *      editar (lápis) > Versão: Nova versão para activar as alterações.)
 *  8. FUSO HORÁRIO do projecto Apps Script: "Africa/Maputo"
 *     (Definições do projecto > Fuso horário).
 *  9. O site (front-end) só envia pedidos ao CRM em src/crm/crmClient.ts.
 *     NUNCA coloque aqui o segredo nem a lógica de administração no site:
 *     só o administrador confirma/cancela pelos links recebidos no e-mail.
 *  ================================================================ */

var CONFIG = {
  EMAIL_NOTIFICACAO: "enclaveccommodation@gmail.com", // e-mail que recebe os avisos (pode mudar aqui)
  ABA_LEADS: "Leads",
  ABA_RESERVAS: "Reservas",
  NEGOCIO: "Enclave Accommodation",
  // Propriedades com ID estável (o calendário do site consulta por este ID)
  PROPRIEDADES: { "chimoio": true, "nyanga": true, "greenside-mutare": true },
  // Mude este segredo uma vez: protege os links de confirmar/cancelar do e-mail
  SEGREDO_ADMIN: "MUDE-ESTE-SEGREDO-ENCLAVE-2026"
};

var COLUNAS_LEADS = [
  { t: "Data/Hora", l: 150 },
  { t: "Nome", l: 180 },
  { t: "Email", l: 230 },
  { t: "Telefone", l: 150 },
  { t: "Mensagem", l: 420 },
  { t: "Idioma", l: 80 },
  { t: "Origem", l: 220 },
  { t: "Status", l: 130, lista: ["Novo", "Em conversa", "Reservado", "Sem resposta", "Perdido"] },
  { t: "Observações internas", l: 300 }
];

var COLUNAS_RESERVAS = [
  { t: "ID", l: 140 },
  { t: "Data/Hora", l: 150 },
  { t: "Nome do hóspede", l: 180 },
  { t: "Telefone/WhatsApp", l: 150 },
  { t: "Propriedade", l: 130 },
  { t: "Acomodação", l: 170 },
  { t: "Cidade/País", l: 160 },
  { t: "Opção de quarto", l: 200 },
  { t: "Tarifa", l: 150 },
  { t: "Check-in", l: 110 },
  { t: "Check-out", l: 110 },
  { t: "Noites", l: 70 },
  { t: "Hóspedes", l: 90 },
  { t: "Total estimado", l: 150 },
  { t: "Observações", l: 300 },
  { t: "Idioma", l: 80 },
  { t: "Status", l: 130, lista: ["Nova", "Confirmada", "Hóspede chegou", "Concluída", "Cancelada"] },
  { t: "Observações internas", l: 300 }
];

/* ---------- MENU (aparece ao abrir a folha) ---------- */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("CRM Enclave")
    .addItem("1. Preparar abas do CRM", "prepararAbas")
    .addItem("2. Enviar e-mail de teste", "enviarEmailTeste")
    .addSeparator()
    .addItem("Instruções rápidas", "mostrarInstrucoes")
    .addToUi();
}

/* ---------- PREPARAÇÃO DAS TABELAS ---------- */

function prepararAbas() {
  criarAba(CONFIG.ABA_LEADS, COLUNAS_LEADS);
  criarAba(CONFIG.ABA_RESERVAS, COLUNAS_RESERVAS);
  garantirSchemaReservas();
  SpreadsheetApp.getUi().alert(
    "CRM Enclave preparado!\n\nAbas criadas/verificadas: " + CONFIG.ABA_LEADS +
    " e " + CONFIG.ABA_RESERVAS +
    " (agora com colunas ID e Propriedade).\n" +
    "Depois: Implantação > Gerenciar implantações > Nova versão."
  );
}

function criarAba(nome, colunas) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(nome);
  var precisaCabecalho = false;
  if (!sh) {
    sh = ss.insertSheet(nome);
    precisaCabecalho = true;
  } else if (sh.getLastRow() === 0) {
    precisaCabecalho = true;
  }
  if (precisaCabecalho) {
    var cab = [];
    var larg = [];
    for (var i = 0; i < colunas.length; i++) {
      cab.push(colunas[i].t);
      larg.push(colunas[i].l);
    }
    sh.getRange(1, 1, 1, cab.length).setValues([cab]);
    sh.getRange(1, 1, 1, cab.length)
      .setFontWeight("bold")
      .setBackground("#1C1C1C")
      .setFontColor("#D4AF37");
    sh.setFrozenRows(1);
    for (var j = 0; j < colunas.length; j++) {
      sh.setColumnWidth(j + 1, colunas[j].l);
      if (colunas[j].lista) {
        var regra = SpreadsheetApp.newDataValidation()
          .requireValueInList(colunas[j].lista, true)
          .setAllowInvalid(false)
          .build();
        sh.getRange(2, j + 1, 500, 1).setDataValidation(regra);
      }
    }
  }
}

/**
 * Garante que a aba Reservas tem as colunas "ID" e "Propriedade",
 * mesmo em folhas antigas (insere as colunas sem perder dados).
 * Devolve a lista de títulos na ordem actual das colunas.
 */
function garantirSchemaReservas() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESERVAS);
  if (!sh || sh.getLastRow() === 0) {
    // folha inexistente ou vazia: criar com o novo esquema completo
    criarAba(CONFIG.ABA_RESERVAS, COLUNAS_RESERVAS);
    sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESERVAS);
    return titulosDe(sh);
  }
  var titulos = titulosDe(sh);
  if (titulos.length === 0 || titulos[0] === "") return titulos;

  if (titulos.indexOf("ID") === -1) {
    sh.insertColumns(1, 1);
    var cId = sh.getRange(1, 1);
    cId.setValue("ID");
    formatarCabecalho(cId);
  }
  titulos = titulosDe(sh);
  if (titulos.indexOf("Propriedade") === -1) {
    var idxAcomodacao = titulos.indexOf("Acomodação");
    var novaPosicao = idxAcomodacao === -1 ? 1 : idxAcomodacao + 1;
    sh.insertColumns(novaPosicao, 1);
    var cProp = sh.getRange(1, novaPosicao);
    cProp.setValue("Propriedade");
    formatarCabecalho(cProp);
  }
  titulos = titulosDe(sh);
  if (titulos.indexOf("Status") !== -1) {
    // garante a validação de Status (nova/confirmada/cancelada)
    var colStatus = titulos.indexOf("Status") + 1;
    var regra = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Nova", "Confirmada", "Hóspede chegou", "Concluída", "Cancelada"], true)
      .setAllowInvalid(false)
      .build();
    sh.getRange(2, colStatus, sh.getMaxRows() - 1, 1).setDataValidation(regra);
  }
  return titulos;
}

function titulosDe(sh) {
  if (!sh || sh.getLastRow() === 0) return [];
  var largura = Math.max(sh.getLastColumn(), 1);
  return sh.getRange(1, 1, 1, largura).getValues()[0]
    .map(function (t) { return String(t || "").trim(); });
}

function formatarCabecalho(celula) {
  celula.setFontWeight("bold")
    .setBackground("#1C1C1C")
    .setFontColor("#D4AF37");
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESERVAS).setFrozenRows(1);
}

/* ---------- RECEBEDOR DO SITE (webhook) ---------- */

function doPost(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  var tipo = String(p.tipo || "lead").toLowerCase();
  var resultado;
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    if (tipo === "reserva") {
      resultado = processarReserva(p);
    } else if (tipo === "lead") {
      gravarLead(p);
      resultado = { ok: true };
    } else {
      gravarLead(p);
      resultado = { ok: true };
    }
  } catch (err) {
    console.error("CRM doPost falhou: " + String(err && err.stack ? err.stack : err));
    resultado = { ok: false, erro: "falha_interna" };
  } finally {
    try { lock.releaseLock(); } catch (err2) {}
  }
  return ContentService.createTextOutput(JSON.stringify({
    ok: !!resultado.ok,
    id: resultado.id || "",
    erro: resultado.erro || ""
  })).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- RESERVAS: validação do lado do servidor ---------- */

var TEXTO_ERRO = {
  dados_invalidos: "dados_invalidos",
  datas_invalidas: "datas_invalidas",
  datas_indisponiveis: "datas_indisponiveis",
  falha_interna: "falha_interna"
};

function processarReserva(p) {
  // 1. Campos obrigatórios
  var nome = String(p.nome || "").trim();
  var telefone = String(p.telefone || "").trim();
  var checkin = String(p.checkin || "").trim();
  var checkout = String(p.checkout || "").trim();
  if (!nome || !telefone || !checkin || !checkout) {
    return { ok: false, erro: TEXTO_ERRO.dados_invalidos };
  }

  // 2. Propriedade válida (ID estável) — deriva do nome legado, se faltar
  var propriedade = identificarPropriedade(p);
  if (!CONFIG.PROPRIEDADES[propriedade]) {
    return { ok: false, erro: TEXTO_ERRO.dados_invalidos };
  }

  // 3. Datas: formato correcto, ordem e passado
  if (!eDataISO(checkin) || !eDataISO(checkout)) {
    return { ok: false, erro: TEXTO_ERRO.datas_invalidas };
  }
  var noites = noitesEntre(checkin, checkout);
  if (noites < 1) {
    return { ok: false, erro: TEXTO_ERRO.datas_invalidas };
  }
  if (checkin < hojeServidor()) {
    return { ok: false, erro: TEXTO_ERRO.datas_invalidas };
  }

  // 4. Sobreposição (dd/mm/aaaa antigos também são lidos)
  var ocupacao = intervalosOcupados(propriedade);
  for (var i = 0; i < ocupacao.length; i++) {
    var oi = ocupacao[i];
    if (checkin < oi.ate && checkout > oi.de) {
      return { ok: false, erro: TEXTO_ERRO.datas_indisponiveis };
    }
  }

  // 5. Datas livres? Grava e avisa o administrador por e-mail
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CONFIG.ABA_RESERVAS);
  if (!sh) { prepararAbas(); sh = ss.getSheetByName(CONFIG.ABA_RESERVAS); }
  var titulos = garantirSchemaReservas();
  var id = novoIdReserva();
  var linha = linhaReserva(titulos, p, id, propriedade, noites);
  var nCol = Math.max(titulos.length, linha.length);
  if (linha.length < nCol) { while (linha.length < nCol) linha.push(""); }
  sh.getRange(sh.getLastRow() + 1, 1, 1, linha.length).setValues([linha]);
  notificarReserva(p, id, propriedade, noites, ss.getUrl());
  return { ok: true, id: id };
}

/* ---------- LEADS (formulário de contato) ---------- */

function gravarLead(p) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CONFIG.ABA_LEADS);
  if (!sh) { prepararAbas(); sh = ss.getSheetByName(CONFIG.ABA_LEADS); }
  sh.appendRow([
    novoTimestamp(),
    p.nome || "",
    p.email || "",
    p.telefone || "",
    p.mensagem || "",
    p.idioma || "pt",
    p.origem || "site",
    "Novo",
    ""
  ]);
  notificar(
    "Novo contato pelo site — " + (p.nome || "(sem nome)"),
    "Chegou um novo contato pelo site (" + CONFIG.NEGOCIO + ").\n\n" +
    "Data/Hora: " + novoTimestamp() + "\n" +
    "Nome: " + (p.nome || "-") + "\n" +
    "Email: " + (p.email || "-") + "\n" +
    "Telefone: " + (p.telefone || "-") + "\n" +
    "Idioma: " + (p.idioma || "pt") + "\n" +
    "Origem: " + (p.origem || "-") + "\n\n" +
    "Mensagem:\n" + (p.mensagem || "-") + "\n\n" +
    "Abra a folha do CRM para acompanhar:\n" + ss.getUrl(),
    p.email
  );
}

/* ---------- CONSULTAS: DISPONIBILIDADE (calendário do site) ---------- */

function doGet(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  var acao = (p.acao || "").toLowerCase();

  // Calendário do site: ?acao=disponibilidade&propriedade=<ID>
  if (acao === "disponibilidade") {
    var propriedade = String(p.propriedade || "").trim();
    if (!CONFIG.PROPRIEDADES[propriedade]) {
      return json({ ok: false, erro: TEXTO_ERRO.dados_invalidos });
    }
    var ocupadas = intervalosOcupados(propriedade);
    return json({ ok: true, ocupadas: ocupadas });
  }

  // Administração (links recebidos por e-mail): confirmar / cancelar
  if (acao === "confirmar" || acao === "cancelar") {
    return processarAcaoAdmin(p, acao);
  }

  // Teste de vida do CRM
  return ContentService.createTextOutput("OK — CRM " + CONFIG.NEGOCIO + " ativo");
}

/**
 * Devolve os intervalos ocupados de uma propriedade.
 * Cada intervalo ocupa as noites de "de" até "ate" EXCLUINDO "ate"
 * (o dia "ate" é de saída e fica livre para um novo check-in).
 * Reservas "Cancelada" libertam as datas.
 */
function intervalosOcupados(propriedade) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESERVAS);
  if (!sh || sh.getLastRow() < 2) return [];
  var titulos = titulosDe(sh);
  var iTit = {};
  ["ID", "Propriedade", "Status", "Check-in", "Check-out"].forEach(function (t) {
    iTit[t] = titulos.indexOf(t);
  });
  if (iTit["Check-in"] === -1 || iTit["Check-out"] === -1) return [];
  var vals = sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
  var ocupadas = [];
  for (var i = 0; i < vals.length; i++) {
    var linha = vals[i];
    var status = String(iTit["Status"] > -1 ? linha[iTit["Status"]] : "").trim();
    if (status.toLowerCase() === "cancelada") continue;
    if (iTit["Propriedade"] > -1 && String(linha[iTit["Propriedade"]]).trim() !== propriedade) continue;
    var de = celulaParaISO(linha[iTit["Check-in"]]);
    var ate = celulaParaISO(linha[iTit["Check-out"]]);
    if (!eDataISO(de) || !eDataISO(ate) || noitesEntre(de, ate) < 1) continue;
    ocupadas.push({ de: de, ate: ate });
  }
  return ocupadas;
}

/* ---------- ADMINISTRAÇÃO: confirmar / cancelar pelo link do e-mail ---------- */

function processarAcaoAdmin(p, acao) {
  var id = String(p.id || "").trim();
  var token = String(p.token || "").trim();
  if (!id || !token || token !== assinaturaReserva(id)) {
    return htmlAdmin("Acesso negado", "O link é inválido ou já não é válido. Contacte o administrador do CRM.", false);
  }
  var lock = LockService.getScriptLock();
  var resultado = false;
  try {
    lock.waitLock(30000);
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_RESERVAS);
    if (!sh || sh.getLastRow() < 2) throw new Error("sem dados");
    var titulos = titulosDe(sh);
    var colId = titulos.indexOf("ID");
    var colStatus = titulos.indexOf("Status");
    if (colId === -1 || colStatus === -1) throw new Error("schema incompleto");
    var vals = sh.getRange(2, colId + 1, sh.getLastRow() - 1, 1).getValues();
    for (var i = 0; i < vals.length; i++) {
      if (String(vals[i][0]).trim() === id) {
        sh.getRange(i + 2, colStatus + 1).setValue(
          acao === "confirmar" ? "Confirmada" : "Cancelada"
        );
        resultado = true;
        break;
      }
    }
  } catch (err) {
    console.error("Ação admin falhou: " + String(err));
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
  if (acao === "confirmar") {
    return resultado
      ? htmlAdmin("Reserva confirmada", "Reserva " + id + " está CONFIRMADA. A folha do CRM já está actualizada.", true)
      : htmlAdmin("Reserva não encontrada", "Não encontrei a reserva " + id + " na folha do CRM.", false);
  }
  return resultado
    ? htmlAdmin("Reserva cancelada", "Reserva " + id + " está CANCELADA e as datas voltaram a ficar livres no calendário.", true)
    : htmlAdmin("Reserva não encontrada", "Não encontrei a reserva " + id + " na folha do CRM.", false);
}

/** Assinatura (token) que protege os links do e-mail — só está no CRM, nunca no site. */
function assinaturaReserva(id) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, id + "|" + CONFIG.SEGREDO_ADMIN);
  var hex = bytes.map(function (b) { return ((b < 0 ? b + 256 : b) < 16 ? "0" : "") + (b < 0 ? b + 256 : b).toString(16); }).join("");
  return hex.slice(0, 16);
}

function htmlAdmin(titulo, texto, sucesso) {
  var cor = sucesso ? "#023625" : "#7b580b";
  var html = '<!doctype html><html><head><meta charset="utf-8"/>' +
    '<meta name="viewport" content="width=device-width, initial-scale=1"/>' +
    '<title>CRM Enclave</title></head>' +
    '<body style="margin:0;padding:40px 16px;background:#f9f9f9;font-family:Georgia,serif;">' +
    '<div style="max-width:420px;margin:0 auto;background:#ffffff;border:1px solid #c0c9c2;border-radius:16px;padding:32px 24px;text-align:center;">' +
    '<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7b580b;font-weight:bold;">Enclave Accommodation — CRM</div>' +
    '<h1 style="color:' + cor + ';font-size:22px;margin:14px 0 10px;">' + titulo + '</h1>' +
    '<p style="color:#414944;font-size:14px;line-height:1.6;margin:0 0 18px;">' + texto + '</p>' +
    '<div style="font-size:11px;color:#9aa7a0;">Pode fechar esta página.</div>' +
    '</div></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle("CRM Enclave");
}

/* ---------- E-MAILS ---------- */

function urlDoCrm() {
  try {
    var url = ScriptApp.getService().getUrl();
    if (url) return url.replace(/\/+$/, "");
  } catch (err) {}
  return "";
}

function linkAdmin(acao, id) {
  var base = urlDoCrm();
  if (!base) return "";
  return base + "?acao=" + acao + "&id=" + encodeURIComponent(id) +
    "&token=" + assinaturaReserva(id);
}

function notificarReserva(p, id, propriedade, noites, urlFolha) {
  var links =
    "\n----------------------------------------------------------------\n" +
    "GERIR ESTA RESERVA (só para o administrador):\n";
  var linkConfirmar = linkAdmin("confirmar", id);
  var linkCancelar = linkAdmin("cancelar", id);
  if (linkConfirmar && linkCancelar) {
    links += "CONFIRMAR: " + linkConfirmar + "\n" +
             "CANCELAR:  " + linkCancelar + "\n";
  } else {
    links += "Os links automáticos não estão disponíveis nesta versão.\n" +
             "Actualize o STATUS directamente na folha do CRM.\n";
  }
  links += "(Ao mesmo tempo pode mudar o status na folha: Nova / " +
    "Confirmada / Cancelada. Cancelar liberta as datas no calendário.)\n";

  notificar(
    "Nova solicitação de reserva — " + (p.acomodacao || propriedade) + " — " + (p.nome || "(sem nome)") + " — " + id,
    "Chegou uma nova solicitação de reserva pelo site (" + CONFIG.NEGOCIO + ").\n\n" +
    "ID da reserva: " + id + "\n" +
    "Data/Hora: " + novoTimestamp() + "\n" +
    "Nome do hóspede: " + (p.nome || "-") + "\n" +
    "Telefone/WhatsApp: " + (p.telefone || "-") + "\n" +
    "Email: " + (p.email || "-") + "\n" +
    "Propriedade (ID estável): " + propriedade + "\n" +
    "Acomodação: " + (p.acomodacao || "-") + "\n" +
    "Cidade/País: " + (p.cidade || "-") + ", " + (p.pais || "-") + "\n" +
    "Opção de quarto: " + (p.opcao || "-") + "\n" +
    "Tarifa: " + (p.tarifa || "-") + "\n" +
    "Check-in: " + (p.checkin || "-") + "\n" +
    "Check-out: " + (p.checkout || "-") + "\n" +
    "Noites: " + noites + "\n" +
    "Hóspedes: " + (p.hospedes || "-") + "\n" +
    "Total estimado: " + (p.total || "-") + "\n" +
    "Idioma: " + (p.idioma || "pt") + "\n\n" +
    "Observações do hóspede:\n" + (p.observacoes || "-") + "\n\n" +
    "ATENÇÃO: a reserva fica com o status \"Nova\". Ela BLOQUEIA as datas " +
    "do calendário do site. Confirme quando estiver tudo acordado ou cancele " +
    "para libertar as datas.\n" +
    links +
    "\nAbra a folha do CRM para acompanhar:\n" + urlFolha,
    p.email
  );
}

function notificar(assunto, corpo, replyTo) {
  var email = CONFIG.EMAIL_NOTIFICACAO;
  if (!email) { email = Session.getEffectiveUser().getEmail(); }
  var opts = { name: CONFIG.NEGOCIO + " (site)" };
  if (replyTo) { opts.replyTo = replyTo; }
  try {
    MailApp.sendEmail(email, assunto, corpo, opts);
  } catch (err) {
    // Nunca quebra a gravação por falha de e-mail
  }
}

/* ---------- UTILITÁRIOS ---------- */

function novoTimestamp() {
  var tz = Session.getScriptTimeZone() || "Africa/Maputo";
  return Utilities.formatDate(new Date(), tz, "dd/MM/yyyy HH:mm");
}

function hojeServidor() {
  var tz = Session.getScriptTimeZone() || "Africa/Maputo";
  return Utilities.formatDate(new Date(), tz, "yyyy-MM-dd");
}

function novoIdReserva() {
  var tz = Session.getScriptTimeZone() || "Africa/Maputo";
  var prefixo = Utilities.formatDate(new Date(), tz, "yyMMdd");
  var aleatorio = Math.floor(Math.random() * 912161 + 4096).toString(36).toUpperCase();
  return "RES-" + prefixo + "-" + aleatorio;
}

function noitesEntre(ci, co) {
  var a = new Date(ci + "T00:00:00Z").getTime();
  var b = new Date(co + "T00:00:00Z").getTime();
  if (isNaN(a) || isNaN(b)) return 0;
  return Math.round((b - a) / 86400000);
}

function eDataISO(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s || "")) return false;
  var d = new Date(s + "T00:00:00Z");
  return !isNaN(d.getTime()) && Utilities.formatDate(d, "UTC", "yyyy-MM-dd") === s;
}

/**
 * Lê a célula da folha e devolve "AAAA-MM-DD" quando possível.
 * Aceita células de data do Sheets e texto dd/mm/aaaa (folhas antigas).
 */
function celulaParaISO(v) {
  if (v instanceof Date) {
    return Utilities.formatDate(v, Session.getScriptTimeZone() || "Africa/Maputo", "yyyy-MM-dd");
  }
  var s = String(v || "").trim();
  if (eDataISO(s)) return s;
  var m = s.match(/^(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{4})$/);
  if (m) {
    var iso = m[3] + "-" + ("0" + m[2]).slice(-2) + "-" + ("0" + m[1]).slice(-2);
    if (eDataISO(iso)) return iso;
  }
  return s;
}

/** Converte a acomodação/propriedade recebida no ID estável (chimoio | nyanga | greenside-mutare). */
function identificarPropriedade(p) {
  var candidato = String(p.propriedade || "").toLowerCase().trim();
  if (CONFIG.PROPRIEDADES[candidato]) return candidato;
  var texto = (String(p.acomodacao || "") + " " + String(p.cidade || "") + " " + candidato)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (texto.indexOf("chimoio") !== -1) return "chimoio";
  if (texto.indexOf("nyanga") !== -1) return "nyanga";
  if (texto.indexOf("greenside") !== -1 || texto.indexOf("mutare") !== -1) return "greenside-mutare";
  return "";
}

/** Monta a linha da reserva pela ordem dos títulos reais da folha. */
function linhaReserva(titulos, p, id, propriedade, noites) {
  var valores = {
    "ID": id,
    "Data/Hora": novoTimestamp(),
    "Nome do hóspede": String(p.nome || "").trim(),
    "Telefone/WhatsApp": String(p.telefone || "").trim(),
    "Propriedade": propriedade,
    "Acomodação": String(p.acomodacao || ""),
    "Cidade/País": [String(p.cidade || ""), String(p.pais || "")].filter(Boolean).join(", "),
    "Opção de quarto": String(p.opcao || ""),
    "Tarifa": String(p.tarifa || ""),
    "Check-in": String(p.checkin || ""),
    "Check-out": String(p.checkout || ""),
    "Noites": noites,
    "Hóspedes": String(p.hospedes || ""),
    "Total estimado": String(p.total || ""),
    "Observações": String(p.observacoes || ""),
    "Idioma": String(p.idioma || "pt"),
    "Status": "Nova",
    "Observações internas": ""
  };
  return titulos.map(function (t) { return valores[t] !== undefined ? valores[t] : ""; });
}

/** Dica: os textos do envio JSON para GET (disponibilidade). */
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- TESTES PELO MENU ---------- */

function enviarEmailTeste() {
  var email = CONFIG.EMAIL_NOTIFICACAO || Session.getEffectiveUser().getEmail();
  MailApp.sendEmail(email, "Teste do CRM Enclave", "O e-mail do CRM " + CONFIG.NEGOCIO + " está a funcionar.");
  SpreadsheetApp.getUi().alert("E-mail de teste enviado para " + email + ". Verifique a caixa de entrada (e o spam).");
}

function mostrarInstrucoes() {
  SpreadsheetApp.getUi().alert(
    "CRM Enclave — Instruções rápidas\n\n" +
    "1) CRM Enclave > Preparar abas do CRM (cria/actualiza colunas ID e Propriedade)\n" +
    "2) Apps Script > Implantação > Aplicativo da Web (ao editar, use Gerenciar implantações > Nova versão)\n" +
    "3) Copie o URL (/exec) e cole em src/crm/crmClient.ts (CRM_ENDPOINT do site)\n" +
    "4) MUDE o SEGREDO_ADMIN em CONFIG uma vez — protege os links do e-mail\n\n" +
    "Teste no navegador: abra o URL /exec — deve mostrar 'OK — CRM ativo'.\n" +
    "Teste disponibilidade: .../exec?acao=disponibilidade&propriedade=chimoio"
  );
}
```

---

## 4. PUBLICAR E APANHAR O URL DO CRM

1. No Apps Script, menu superior: **Implantação > Nova implantação**.
2. Clique na engrenagem / tipo e escolha **Aplicativo da Web**.
3. Preencha:
   - **Descrição:** CRM Enclave v2
   - **Executar como:** Eu (o seu e-mail)
   - **Quem tem acesso:** Qualquer pessoa
4. Clique **Implantar** e copie o **URL que termina em `/exec`**, ex.:
   `https://script.google.com/macros/s/xxxxxxxxxxxxx/exec`
5. Teste rápido no navegador: abra esse URL — deve mostrar
   `OK — CRM Enclave Accommodation ativo`.

> **Se um dia editar o código do CRM:** Implantação > **Gerenciar implantações** >
> editar (lápis) > **Versão: Nova versão** > Implantar. O URL fica o mesmo.

---

## 5. COLAR O URL NO SITE (a única linha a alterar)

Abra o ficheiro do site:

```
enclave-accommodation/src/crm/crmClient.ts
```

e no topo troque a linha vazia por:

```ts
// ⚠️ COLE AQUI O URL /exec DO SEU BACKEND (Apps Script) ⚠️
export const CRM_ENDPOINT = "https://script.google.com/macros/s/O-SEU_URL_AQUI/exec";
```

Não coloque mais nada aí: **nenhum token, nenhum senha, nenhuma lógica de
administração no site.** Só o URL público `/exec`.

---

## 6. COMO O CRM ESCREVE AS RESERVAS (resumo)

- **Formulário de reserva do site** → grava em `Reservas` com status **Nova** →
  manda e-mail com **links CONFIRMAR e CANCELAR** → o dono clica no link →
  o status muda na folha e as datas ficam/param de ficar bloqueadas no calendário.
- **Formulário de contacto do site** → grava em `Leads` com status **Novo**.
- **O servidor é quem decide sempre**: se as datas já estão ocupadas
  → resposta `datas_indisponiveis`; datas inválidas → `datas_invalidas`;
  campos em falta → `dados_invalidos`; erro genérico → `falha_interna`.
- **Só o administrador** confirma ou cancela (pelo link do e-mail). O site não
  tem botão nenhum de cancelamento para o cliente.

## 7. TESTES RÁPIDOS DEPÓIS DE IMPLANTAR

1. `https://SEU_URL/exec` → deve mostrar `OK — CRM Enclave Accommodation ativo`.
2. `https://SEU_URL/exec?acao=disponibilidade&propriedade=chimoio` →
   deve mostrar `{"ok":true,"ocupadas":[...]}` (vazio no começo: `"ocupadas":[]`).
3. No site: `cd enclave-accommodation` e depois
   `npm exec tsx -- verificar-crm.ts` → todos os testes devem passar.
4. No site aberto (npm run dev): faça uma reserva de teste com datas futuras →
   aparece a mensagem verde "Pedido recebido" + referência `RES-...`;
   confira a linha nova na aba **Reservas** e o e-mail com os links.

---

*Guia detalhado em `INSTRUCOES-CRM-GOOGLE-SHEETS.md`.*
