# CRM ENCLAVE ACCOMMODATION — Google Sheets + E-mail + WhatsApp

Este é o guia completo para ativar o CRM do site Enclave. O formulário do site
grava os dados: **no Google Sheets (CRM)**, **envia para o e-mail** e, no final,
**leva a pessoa para o WhatsApp**.

---

## PARTE 1 — O que precisa de criar

Você não precisa criar as colunas à mão: o script cria tudo sozinho quando
executar o item "1. Preparar abas do CRM". Mas esta é a estrutura que fica
criada (tal como já está definida no código `CRM-ENCLAVE-Apps-Script.gs`):

### 📄 Tabela/Aba 1: `Leads` (contato do site)

| Ordem | Coluna | Opções (lista) |
|------:|--------|----------------|
| 1 | Data/Hora | — |
| 2 | Nome | — |
| 3 | Email | — |
| 4 | Telefone | — |
| 5 | Mensagem | — |
| 6 | Idioma | pt / en |
| 7 | Origem | — |
| 8 | Status | Novo · Em conversa · Reservado · Sem resposta · Perdido |
| 9 | Observações internas | — |

### 📄 Tabela/Aba 2: `Reservas` (formulário de reserva)

| Ordem | Coluna | Opções (lista) |
|------:|--------|----------------|
| 1 | ID | — |
| 2 | Data/Hora | — |
| 3 | Nome do hóspede | — |
| 4 | Telefone/WhatsApp | — |
| 5 | Propriedade | chimoio · nyanga · greenside-mutare |
| 6 | Acomodação | — |
| 7 | Cidade/País | — |
| 8 | Opção de quarto | — |
| 9 | Tarifa | — |
| 10 | Check-in | — |
| 11 | Check-out | — |
| 12 | Noites | — |
| 13 | Hóspedes | — |
| 14 | Total estimado | — |
| 15 | Observações | — |
| 16 | Idioma | pt / en |
| 17 | Status | Nova · Confirmada · Hóspede chegou · Concluída · Cancelada |
| 18 | Observações internas | — |

> **Folhas antigas:** ao executar "1. Preparar abas do CRM" o script insere automaticamente
> as colunas **ID** e **Propriedade** sem perder dados. As reservas antigas ficam com a
> Propriedade vazia (preencha à mão com `chimoio`, `nyanga` ou `greenside-mutare` se
> quiser que bloqueiem datas no calendário).

> **Como criar o arquivo:** abra [sheets.google.com](https://sheets.google.com) >
> + Em branco > dê o nome **"CRM Enclave Accommodation"**. As abas `Leads` e
> `Reservas` são criadas automaticamente pelo script.

---

## PARTE 2 — Código para executar no Google Sheets (Apps Script)

**Passo a passo:**

1. Abra a folha **"CRM Enclave Accommodation"** no Google Sheets.
2. Menu **Extensões > Apps Script** (abra num navegador no Google Chrome).
3. **Apague tudo** que estiver no editor e cole TODO o código da barra abaixo
   (é o mesmo que está no ficheiro `CRM-ENCLAVE-Apps-Script.gs` na raiz
   destes projectos).
4. Salve com **Ctrl+S**.
5. Em ⚙️ **Configurações do projeto** > Fuso horário > escolha **Africa/Maputo**.
6. Volte à folha, recarregue (F5). Vai aparecer o menu **"CRM Enclave"** no topo.
7. Clique **CRM Enclave > 1. Preparar abas do CRM** e autorize
   (clique "Avançado > Ir para CRM Enclave (não seguro) > Permitir").
   ✅ Isto cria as duas tabelas `Leads` e `Reservas` com todas as colunas.
8. Clique **CRM Enclave > 2. Enviar e-mail de teste** e veja a caixa de entrada
   de `enclaveccommodation@gmail.com` (verifique o spam).

<details>
<summary><strong>Clique aqui para expandir / o código está também em
<code>CRM-ENCLAVE-Apps-Script.gs</code></strong></summary>

```javascript
/** ================================================================
 *  CRM ENCLAVE ACCOMMODATION — Google Sheets + E-mail automático
 *  ================================================================ */

var CONFIG = {
  EMAIL_NOTIFICACAO: "enclaveccommodation@gmail.com", // e-mail que recebe os avisos (pode mudar aqui)
  ABA_LEADS: "Leads",
  ABA_RESERVAS: "Reservas",
  NEGOCIO: "Enclave Accommodation"
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
  { t: "Data/Hora", l: 150 },
  { t: "Nome do hóspede", l: 180 },
  { t: "Telefone/WhatsApp", l: 150 },
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

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("CRM Enclave")
    .addItem("1. Preparar abas do CRM", "prepararAbas")
    .addItem("2. Enviar e-mail de teste", "enviarEmailTeste")
    .addSeparator()
    .addItem("Instruções rápidas", "mostrarInstrucoes")
    .addToUi();
}

function prepararAbas() {
  criarAba(CONFIG.ABA_LEADS, COLUNAS_LEADS);
  criarAba(CONFIG.ABA_RESERVAS, COLUNAS_RESERVAS);
  SpreadsheetApp.getUi().alert(
    "CRM Enclave preparado!\n\nAbas criadas/verificadas: " + CONFIG.ABA_LEADS +
    " e " + CONFIG.ABA_RESERVAS +
    ".\nAgora faça: Implantação > Nova implantação > Aplicativo da Web."
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
    var cab = []; var larg = [];
    for (var i = 0; i < colunas.length; i++) {
      cab.push(colunas[i].t); larg.push(colunas[i].l);
    }
    sh.getRange(1, 1, 1, cab.length).setValues([cab]);
    sh.getRange(1, 1, 1, cab.length)
      .setFontWeight("bold").setBackground("#1C1C1C").setFontColor("#D4AF37");
    sh.setFrozenRows(1);
    for (var j = 0; j < colunas.length; j++) {
      sh.setColumnWidth(j + 1, colunas[j].l);
      if (colunas[j].lista) {
        var regra = SpreadsheetApp.newDataValidation()
          .requireValueInList(colunas[j].lista, true).setAllowInvalid(false).build();
        sh.getRange(2, j + 1, 500, 1).setDataValidation(regra);
      }
    }
  }
}

function doPost(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  var tipo = String(p.tipo || "lead").toLowerCase();
  var ok = false; var erro = "";
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    if (tipo === "reserva") { gravarReserva(p); } else { gravarLead(p); }
    ok = true;
  } catch (err) { erro = String(err); }
  finally { try { lock.releaseLock(); } catch (err2) {} }
  return ContentService.createTextOutput(JSON.stringify({ ok: ok, erro: erro }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput("OK — CRM " + CONFIG.NEGOCIO + " ativo");
}

function gravarLead(p) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CONFIG.ABA_LEADS);
  if (!sh) { prepararAbas(); sh = ss.getSheetByName(CONFIG.ABA_LEADS); }
  sh.appendRow([
    novoTimestamp(), p.nome || "", p.email || "", p.telefone || "", p.mensagem || "",
    p.idioma || "pt", p.origem || "site", "Novo", ""
  ]);
  notificar(
    "Novo contato pelo site — " + (p.nome || "(sem nome)"),
    "Chegou um novo contato pelo site (" + CONFIG.NEGOCIO + ").\n\n" +
    "Data/Hora: " + novoTimestamp() + "\nNome: " + (p.nome || "-") +
    "\nEmail: " + (p.email || "-") + "\nTelefone: " + (p.telefone || "-") +
    "\nIdioma: " + (p.idioma || "pt") + "\nOrigem: " + (p.origem || "-") +
    "\n\nMensagem:\n" + (p.mensagem || "-") +
    "\n\nAbra a folha do CRM para acompanhar:\n" + ss.getUrl(),
    p.email
  );
}

function gravarReserva(p) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CONFIG.ABA_RESERVAS);
  if (!sh) { prepararAbas(); sh = ss.getSheetByName(CONFIG.ABA_RESERVAS); }
  sh.appendRow([
    novoTimestamp(), p.nome || "", p.telefone || "", p.acomodacao || "",
    [p.cidade, p.pais].filter(Boolean).join(", "), p.opcao || "", p.tarifa || "",
    p.checkin || "", p.checkout || "", p.noites || "", p.hospedes || "",
    p.total || "", p.observacoes || "", p.idioma || "pt", "Nova", ""
  ]);
  notificar(
    "Nova solicitação de reserva — " + (p.acomodacao || "-") + " — " + (p.nome || "(sem nome)"),
    "Chegou uma nova solicitação de reserva pelo site (" + CONFIG.NEGOCIO + ").\n\n" +
    "Data/Hora: " + novoTimestamp() + "\nNome do hóspede: " + (p.nome || "-") +
    "\nTelefone/WhatsApp: " + (p.telefone || "-") + "\nAcomodação: " + (p.acomodacao || "-") +
    "\nCidade/País: " + (p.cidade || "-") + ", " + (p.pais || "-") +
    "\nOpção de quarto: " + (p.opcao || "-") + "\nTarifa: " + (p.tarifa || "-") +
    "\nCheck-in: " + (p.checkin || "-") + "\nCheck-out: " + (p.checkout || "-") +
    "\nNoites: " + (p.noites || "-") + "\nHóspedes: " + (p.hospedes || "-") +
    "\nTotal estimado: " + (p.total || "-") + "\nIdioma: " + (p.idioma || "pt") +
    "\n\nObservações do hóspede:\n" + (p.observacoes || "-") +
    "\n\nAbra a folha do CRM para acompanhar:\n" + ss.getUrl(),
    p.email
  );
}

function notificar(assunto, corpo, replyTo) {
  var email = CONFIG.EMAIL_NOTIFICACAO;
  if (!email) { email = Session.getEffectiveUser().getEmail(); }
  var opts = { name: CONFIG.NEGOCIO + " (site)" };
  if (replyTo) { opts.replyTo = replyTo; }
  try { MailApp.sendEmail(email, assunto, corpo, opts); } catch (err) {}
}

function novoTimestamp() {
  var tz = Session.getScriptTimeZone() || "Africa/Maputo";
  return Utilities.formatDate(new Date(), tz, "dd/MM/yyyy HH:mm");
}

function enviarEmailTeste() {
  var email = CONFIG.EMAIL_NOTIFICACAO || Session.getEffectiveUser().getEmail();
  MailApp.sendEmail(email, "Teste do CRM Enclave", "O e-mail do CRM " + CONFIG.NEGOCIO + " está a funcionar.");
  SpreadsheetApp.getUi().alert("E-mail de teste enviado para " + email + ".");
}

function mostrarInstrucoes() {
  SpreadsheetApp.getUi().alert(
    "CRM Enclave — Instruções rápidas\n\n" +
    "1) CRM Enclave > Preparar abas do CRM (feito uma vez)\n" +
    "2) Apps Script > Implantação > Nova implantação > Aplicativo da Web\n" +
    "3) Copie o URL (/exec) e coloque no site (CRM_ENDPOINT)\n" +
    "4) Ao editar este código: Gerenciar implantações > Nova versão"
  );
}
```
</details>

---

## PARTE 3 — Publicar o receptor (webhook) no Google

1. No **Apps Script**: **Implantação > Nova implantação**.
2. Clique na engrenagem/`tipo` e escolha **Aplicativo da Web**.
3. Preencha:
   - **Descrição:** CRM Enclave v1
   - **Executar como:** Eu (o seu e-mail)
   - **Quem tem acesso:** Qualquer pessoa ⚠️
4. Clique **Implantar** e copie o **URL que termina em /exec** (ex.:
   `https://script.google.com/macros/s/xxxxxxxxxxxxxxxx/exec`).
   Guarda esse URL: é o **CRM_ENDPOINT** do site.

> Teste rápido: cole o URL /exec no navegador — deve aparecer
> `OK — CRM Enclave Accommodation ativo`.

---

---

## PARTE 4 — Colocar o CRM no site Enclave (enclave-accommodation)

O site tem **um único sítio** onde o URL do CRM é configurado:

`enclave-accommodation/src/crm/crmClient.ts`

```ts
// ⚠️ COLE AQUI O URL /exec DO SEU BACKEND (Apps Script) ⚠️
export const CRM_ENDPOINT = "";
```

1. Copie o URL da implantação (PARTE 3) e cole-o entre as aspas.
2. Se editar mais alguma fois o código do Apps Script, relembre: no Apps Script
   **Implantação > Gerenciar implantações > editar (lápis) > Versão: Nova versão** —
   o URL continua igual, mas o código passa a estar activo.
3. Nada de credenciais no site: o úico valor no site é o URL público `/exec`.
   Nem tokens, nem lógica de aprovação — isso vive apenas no CRM.

O site envia automaticamente:
- **Reserva** (`tipo=reserva`): propriedade (chimoio / nyanga / greenside-mutare),
  acomodação, nome, telefone, email, cidade, país, opção de quarto, tarifa, hóspedes,
  total estimado, observações, check-in, check-out, noites, idioma.
- **Contacto** (`tipo=lead`): nome, email, telefone, mensagem, idioma, origem (site).
- **Disponibilidade** (`?acao=disponibilidade&propriedade=<ID>`): alimenta o calendário
  do formulário; os dias de saída de cada reserva continuam livres para novo check-in.

## PARTE 5 — Aprovar/cancelar (só o administrador)

- Cada reserva nova chega por e-mail com **dois links**:
  - **CONFIRMAR** → status passa a `Confirmada`
  - **CANCELAR** → status passa a `Cancelada` e as datas voltam a ficar livres no calendário
- Os links são protegidos por `CONFIG.SEGREDO_ADMIN` — **mude esse segredo uma vez** no
  código do Apps Script antes de implantar.
- O formulário público **não tem** nenhum botão ou página de cancelamento: só o
  administrador, pelo link do e-mail (ou mudando o Status na folha).

## PARTE 6 — Testes

**No navegador (backend):**
- Abra o URL `/exec` → deve mostrar `OK — CRM Enclave Accommodation ativo`.
- Abra `/exec?acao=disponibilidade&propriedade=chimoio` → JSON
  `{"ok":true,"ocupadas":[...]}` (vazio se a folha não tiver reservas).

**No site (automatizados):**
```
cd enclave-accommodation
npm exec tsx -- verificar-crm.ts
```
(a suíte sobe um servidor local que imita o Apps Script e verifica reserva normal,
sobreposição, datas inválidas, dados em falta, leads e o calendário de disponibilidade)

**No site (manual, depois de colar o CRM_ENDPOINT):**
1. Reserva normal com datas futuras livres → mensagem verde "Pedido recebido" + referência `RES-...`.
2. Escolher noites já reservadas no calendário (ex.: inicie uma reserva e verifique).
3. Tentar a mesma estadia 2 vezes com o servidor a devolver `datas_indisponiveis`.
4. Conferir na folha do CRM (aba `Reservas`) que aparecem ID, Propriedade, datas e status `Nova`.
