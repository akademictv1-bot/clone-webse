/* Bright Beginnings Academy — Config central
 * ============================================================
 * QUANDO COMPRAREM O NOVO DOMÍNIO / EMAIL OFICIAL:
 * -> mudem SÓ ESTE FICHEIRO. Nada mais no site precisa mudar.
 *
 * WHATSAPP: só dígitos, sem + nem espaços. Ex: "258844277021"
 * EMAIL_DESTINO: email oficial da escola.
 * SHEET_ENDPOINT: vazio "" = modo teste (só WhatsApp + backup local).
 *   Depois de criares a planilha + Apps Script, colas aqui o link /exec
 *   Ex: "https://script.google.com/macros/s/AKfyc.../exec"
 */
window.BBA_CONFIG = {
  WHATSAPP: "258844277021",
  EMAIL_DESTINO: "admin@bbamoz.com",
  SHEET_ENDPOINT: "https://script.google.com/macros/s/AKfycbyl-zZqJV17C6B3z5GKGZI_sQJCx0ctuVxu2V7UF4rdJyus6gtGwvbLiwJvegdLCHAygQ/exec",
  ORIGEM_SITE: "site-bba",
  /* Token anti-spam: tem de ser IGUAL ao SECRET no crm-apps-script.gs.
   * Nunca partilhes este valor. Se vazar, gera outro e atualiza os 2 lados. */
  FORM_TOKEN: "c305567861293b7d6cdbf44f0c4c1abc"
};
