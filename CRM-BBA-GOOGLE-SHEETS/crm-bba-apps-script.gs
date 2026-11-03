/**
 * ============================================================
 *  CRM — Bright Beginnings Academy (Google Sheets + Apps Script)
 *  Recebe os formulários de contact.html e inscricao-2027.html
 *  do site bba.edu.mz e guarda cada pedido como uma linha.
 *
 *  INSTALAÇÃO: veja o ficheiro LEIA-ME-COMO-CRIAR.md nesta pasta.
 *  IMPORTANTE: este código é um CRM dedicado ao BBA — não toca
 *  no CRM do Enclave nem em mais nada. Pode coexistir com ele.
 * ============================================================
 */

var CONFIG = {
  NEGOCIO: "Bright Beginnings Academy",

  /** E-mail que recebe os avisos de cada pedido do site. */
  EMAIL_NOTIFICACAO: "admin@bba.edu.mz",

  /** TEM de ser IGUAL ao FORM_TOKEN em sites/bba/assets/bba-config.js.
   *  Nunca partilhe este valor. Se um dia não quiser mais este token, gere outro
   *  e atualize nos 2 lados (aqui no SECRET e no bba-config.js). */
  SECRET: "c305567861293b7d6cdbf44f0c4c1abc",

  FUZO: "Africa/Maputo",
  ABA_LEADS: "Leads do Site"
};

/* ============================================================
 *  MENU na planilha
 * ============================================================ */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("CRM BBA")
    .addItem("1) Preparar abas do CRM (uma vez)", "prepararAbas")
    .addItem("2) Enviar e-mail de teste", "enviarEmailTeste")
    .addItem("Instruções rápidas", "mostrarInstrucoes")
    .addToUi();
}

function mostrarInstrucoes() {
  SpreadsheetApp.getUi().alert(
    "CRM Bright Beginnings Academy — passos rápidos\n\n" +
    "1) CRM BBA > Preparar abas do CRM (feito uma vez)\n" +
    "2) Apps Script > Implementar > Nova implementação > App da Web (Execute como: eu; Acesso: qualquer pessoa)\n" +
    "3) Copie o URL que termina em /exec e cole em sites/bba/assets/bba-config.js (SHEET_ENDPOINT)\n" +
    "4) Depois de editar este código: Implementar > Gerenciar implantações > Editar > Nova versão\n" +
    "5) No site, envie 1 formulário de teste e confira a linha aqui na aba \"" + CONFIG.ABA_LEADS + "\""
  );
}

/* ============================================================
 *  ESTRUTURA: cria a aba "Leads do Site" com cabeçalhos
 * ============================================================ */
function prepararAbas() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CONFIG.ABA_LEADS);
  if (!sh) { sh = ss.insertSheet(CONFIG.ABA_LEADS); }
  if (sh.getLastRow() === 0) {
    sh.appendRow([
      "Quando (local)", "Quando (ISO)", "Origem", "Página",
      "Nome do encarregado", "Aluno(a)", "Nível", "Telefone",
      "Email", "Mensagem", "Status", "Observações"
    ]);
    sh.setFrozenRows(1);
    sh.getRange("A1:L1").setFontWeight("bold").setBackground("#0B1B3A").setFontColor("#FFFFFF");
    sh.setColumnWidth(5, 190);
    sh.setColumnWidth(10, 320);
  }
  return sh;
}

/* ============================================================
 *  RECEÇÃO: o site faz POST (text/plain) com JSON:
 *  { token, origem, pagina, quando, dados:{ nome, aluno, nivel, telefone, email, mensagem } }
 * ============================================================ */
function doPost(e) {
  var resposta;
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Pedido sem corpo (sem postData).");
    }
    var p = JSON.parse(e.postData.contents);

    if (p.token !== CONFIG.SECRET) {
      return json({ ok: false, erro: "Token inválido (SECRET vs FORM_TOKEN)." });
    }

    var d = p.dados || {};

    // Honeypot do site (campo escondido "website"): robots não devem passar daqui.
    if (d.website) {
      return json({ ok: true, ignorado: "honeypot" });
    }

    // Anti-duplicado: mesmo telefone nos últimos 2 minutos (cliques duplos).
    var quandoISO = p.quando || new Date().toISOString();
    if (e_duplicado(d.telefone, quandoISO)) {
      return json({ ok: true, duplicado: true });
    }

    guardarLead(p, d, quandoISO);
    notificar(p, d, quandoISO);
    resposta = { ok: true };
  } catch (err) {
    resposta = { ok: false, erro: String(err && err.message ? err.message : err) };
  }
  return json(resposta);
}

/** Confirmação de vida pelo navegador: abre ?ping=1 e vê o JSON. */
function doGet(e) {
  return json({
    ok: true,
    servico: "CRM BBA",
    aba: CONFIG.ABA_LEADS,
    dica: "Este CRM espera POST do site bba.edu.mz."
  });
}

/* ============================================================
 *  GRAVAÇÃO + AVISO POR E-MAIL
 * ============================================================ */
function guardarLead(p, d, quandoISO) {
  var sh = prepararAbas();
  var quandoTxt = Utilities.formatDate(new Date(quandoISO), CONFIG.FUZO, "dd/MM/yyyy HH:mm:ss");
  sh.appendRow([
    quandoTxt,
    quandoISO,
    p.origem || "site-bba",
    p.pagina || "",
    d.nome || "",
    d.aluno || "",
    d.nivel || "",
    d.telefone || "",
    d.email || "",
    d.mensagem || "",
    "Novo",
    ""
  ]);
}

function notificar(p, d, quandoISO) {
  var email = CONFIG.EMAIL_NOTIFICACAO;
  if (!email) { email = Session.getEffectiveUser().getEmail(); }

  var quandoTxt = Utilities.formatDate(new Date(quandoISO), CONFIG.FUZO, "dd/MM/yyyy HH:mm:ss");
  var tipo = d.aluno ? "Nova pré-inscrição 2027" : "Novo contacto pelo site";
  var assunto = tipo + " — " + (d.nome || "(sem nome)") + (d.aluno ? " (aluno: " + d.aluno + ")" : "");

  var linhas = [
    "Chegou um novo pedido pelo site (" + CONFIG.NEGOCIO + ").",
    "",
    "Data/Hora: " + quandoTxt,
    "Origem: " + (p.origem || "site-bba") + (p.pagina ? " — página " + p.pagina : ""),
    "Nome do encarregado: " + (d.nome || "-"),
    d.aluno ? "Aluno(a): " + d.aluno : null,
    "Nível: " + (d.nivel || "-"),
    "Telefone/WhatsApp: " + (d.telefone || "-"),
    d.email ? "Email do responsável: " + d.email : null,
    "",
    "Mensagem:",
    (d.mensagem || "-"),
    "",
    "Abra a planilha do CRM para acompanhar e marcar o Status:",
    SpreadsheetApp.getActiveSpreadsheet().getUrl()
  ].filter(function (x) { return x !== null; });

  var opts = { name: CONFIG.NEGOCIO + " (site)" };
  if (d.email) { opts.replyTo = d.email; }
  try { MailApp.sendEmail(email, assunto, linhas.join("\n"), opts); }
  catch (erro) { /* e-mail falhar nunca deve perder o lead — ele já está gravado */ }
}

/* ============================================================
 *  UTILITÁRIOS
 * ============================================================ */
function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}

function e_duplicado(telefone, quandoISO) {
  if (!telefone) return false;
  try {
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.ABA_LEADS);
    if (!sh) return false;
    var ui = new Date(quandoISO).getTime();
    var ult = Math.max(sh.getLastRow() - 6, 2);
    var dadosCol = sh.getRange(ult, 2, Math.max(sh.getLastRow() - ult + 1, 1), 8).getValues(); // col B = ISO, col H = Telefone
    for (var i = 0; i < dadosCol.length; i++) {
      var iso = String(dadosCol[i][0]);
      var tel = String(dadosCol[i][7]);
      if (tel === String(telefone) && iso) {
        var tAnterior = new Date(iso).getTime();
        if (!isNaN(tAnterior) && (ui - tAnterior) < 120000) return true;
      }
    }
  } catch (erro) { return false; }
  return false;
}

/** Teste do cano todo: envia um e-mail para o endereço de aviso. */
function enviarEmailTeste() {
  var email = CONFIG.EMAIL_NOTIFICACAO || Session.getEffectiveUser().getEmail();
  MailApp.sendEmail(email, "Teste do CRM BBA", "O e-mail do CRM " + CONFIG.NEGOCIO + " está a funcionar.");
  SpreadsheetApp.getUi().alert("E-mail de teste enviado para " + email + ".");
}

/**
 * (Opcional) Teste sem navegador: recebe o MESMO pacote que o site envia
 * e grava uma linha de exemplo. Rodar uma vez para conferir as colunas,
 * depois apagar a linha de teste.
 */
function simularFormulario() {
  var p = {
    token: CONFIG.SECRET,
    origem: "site-bba",
    pagina: "/inscricao-2027.html",
    quando: new Date().toISOString(),
    dados: {
      nome: "TESTE — Encarregado (apagar)",
      aluno: "TESTE — Aluno (apagar)",
      nivel: "Early Years (2–5 anos)",
      telefone: "+000000000000",
      email: "teste@bba.edu.mz",
      mensagem: "Linha de teste criada por simularFormulario()"
    }
  };
  var d = p.dados;
  var quandoISO = p.quando;
  if (e_duplicado(d.telefone, quandoISO)) { return "Duplicado saltado."; }
  guardarLead(p, d, quandoISO);
  return "Linha de teste gravada na aba " + CONFIG.ABA_LEADS + ".";
}
