# Formulário BBA — Envio para CRM + E‑mail + WhatsApp

Página simples de pedido para a **Bright Beginnings Academy**.

## O que esta pasta tem

| Ficheiro | Função |
|---|---|
| `index.html` | Página simples com o formulário. Ao clicar em **Enviar pedido**: |
| | 1. Envia o pedido para o **CRM (Google Sheets)** via Apps Script (`SHEET_ENDPOINT`) |
| | 2. O CRM grava na **nova Google Sheet** e **envia o e‑mail** da secretaria (`EMAIL_NOTIFICACAO`) |
| | 3. Abre o **WhatsApp** (`wa.me`) com a conversa pronta |
| | 4. Mostra a mensagem de sucesso |

## Passos no Google (uma vez)

1. **Criar a nova Google Sheet** → nome: `CRM BBA – Leads do Site` (ou o que preferir).
2. **Criar o Apps Script** nessa Sheet → colar o conteúdo de `crm-bba-apps-script.gs` → **Guardar**.
3. **Implantar → Nova implantação → App da Web**:
   - *Executar como*: Eu
   - *Quem tem acesso*: Qualquer pessoa
   - → Copiar a URL que termina em **`/exec`**
4. **Colar a URL** no `SHEET_ENDPOINT` do `index.html` (linha do `conf`).
5. **Colar o token** no `FORM_TOKEN` do `index.html` — e no `SECRET` do script (os dois devem ser iguais).

## Teste

1. Abrir `index.html` no browser → preencher e submeter.
2. Ver: linha na Sheet + e‑mail + WhatsApp aberto.
3. Se o WhatsApp abrir e o e‑mail chegar → pedido concluído.

## Nota

- O **e‑mail** que chega é o do topo do script: `EMAIL_NOTIFICACAO: "admin@bba.edu.mz"`.
- O **token anti‑spoofing** continua igual entre site e script.
- Depois, o fluxo completo (site oficial → CRM → e‑mail → WhatsApp) já está a funcionar.
