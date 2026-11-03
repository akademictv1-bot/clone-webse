# CRM do BBA — Google Sheets + Apps Script (kit completo)

Esta pasta tem **tudo** para criar o CRM próprio do **Bright Beginnings Academy** num
Google Sheet, receber os formulários do site (`contact.html` e `inscricao-2027.html`)
e receber avisos por e-mail em **admin@bba.edu.mz**.

> ⚠️ **Enclave ≠ BBA — empresas diferentes, CRMs separados.**
> Este kit é exclusivo do BBA. Ele **não toca** na planilha nem no Apps Script do
> Enclave, e vice-versa. Podem coexistir, mas nunca misturar dados, tokens ou URLs.

> 📌 **Formato funcional do site: intocado.** O formulário, os campos e o token
> continuam exatamente como são. Este script foi escrito para receber *exatamente*
> o pacote que o site já envia hoje — só muda para onde ele aponta (o novo `/exec`).

## Ficheiros desta pasta

| Ficheiro | Para que serve |
|---|---|
| `LEIA-ME-COMO-CRIAR.md` | Este guia (comece aqui) |
| `crm-bba-apps-script.gs` | O código para colar no Apps Script |
| `CAMPOS-QUE-O-SITE-ENVIA.md` | Tabela campo do site → coluna da planilha |
| `colunas-leads.csv` | Cabeçalhos prontos para importar (opcional) |

---

# PARTE 1 — As páginas (abas) da sua planilha

Você cria o documento no Google Sheets e **as abas (páginas) dentro dele** que vão
guardar os dados. Duas formas: **manual** (você cria tudo) ou **automática** (o menu
do script cria por você). Recomendo a automática, mas aqui está tudo documentado:

## Aba principal: `Leads do Site`

Esta é a página que guarda cada formulário do site como uma linha. Crie assim:

1. Na planilha, clique no **+** (canto inferior esquerdo) para nova aba.
2. Renomeie para exatamente: **`Leads do Site`** (o script procura este nome).
3. Na linha 1, cole estes cabeçalhos (A até L):

| Coluna | Cabeçalho | O que guarda |
|---|---|---|
| A | `Quando (local)` | Data/hora do envio, fuso de Moçambique (ex.: `28/10/2026 07:45:12`) |
| B | `Quando (ISO)` | A mesma hora em formato ISO — usada pelo anti-duplicado |
| C | `Origem` | Sempre `site-bba` (identifica de que site veio) |
| D | `Página` | `/contact.html` (mensagem) ou `/inscricao-2027.html` (pré-inscrição) |
| E | `Nome do encarregado` | Nome de quem preencheu |
| F | `Aluno(a)` | Nome da criança (só existe na pré-inscrição) |
| G | `Nível` | `Early Years (2–5 anos)`, `Primary (Grades 1–7)` ou `Secondary (Grades 8–10)` |
| H | `Telefone` | Telefone/WhatsApp do encarregado |
| I | `Email` | Email do encarregado (só existe no formulário de contactos) |
| J | `Mensagem` | Texto livre do formulário |
| K | `Status` | Começa como `Novo` — você muda para `Em atendimento`, `Matriculado`, `Sem resposta`… |
| L | `Observações` | Espaço livre para a secretaria anotar |

**Dica rápida:** em vez de digitar, importe `colunas-leads.csv` (Ficheiro → Importar
→ Substituir folha atual) — ou use o menu automático abaixo, que cria tudo.

**Formatação sugerida (opcional):** linha 1 em negrito com fundo azul-escuro
(`#0B1B3A`) e letra branca; congelar a linha 1 (Ver → Congelar → 1 linha);
largura maior nas colunas E e J.

## Outras abas (opcional, para o futuro)

- **`Resumo`** — contadores simples com fórmulas (ex.: `=COUNTA('Leads do Site'!E2:E)`
  para total de leads; `=COUNTIF('Leads do Site'!K:K,"Novo")` para pendentes).
- **`Backup`** — cópia periódica das linhas antigas (Ficheiro → Fazer cópia também funciona).

O script **só precisa** da aba `Leads do Site` — as outras são conforto seu.

---

# PARTE 2 — O código que você executa

## 2.1 Colar o código

1. Na planilha: **Extensões → Apps Script**.
2. Apague o código de exemplo e cole todo o conteúdo de **`crm-bba-apps-script.gs`**.
3. **Guardar** (disquete).

## 2.2 Comandos no menu (depois de F5 na planilha)

| Comando (menu **CRM BBA**) | O que faz | Quando usar |
|---|---|---|
| **1) Preparar abas do CRM (uma vez)** | Cria a aba `Leads do Site` com cabeçalhos (se você não criou à mão) | 1ª vez, logo após colar o código — pede autorização |
| **2) Enviar e-mail de teste** | Manda um e-mail para `EMAIL_NOTIFICACAO` | Antes de publicar — confirme que chega em `admin@bba.edu.mz` |
| **Instruções rápidas** | Lembretes na tela | Quando quiser |
| *(função no editor)* `simularFormulario()` | Grava 1 linha de teste sem precisar do site | Para conferir as colunas; apague a linha depois |

## 2.3 Publicar o "App da Web" (isto gera o CONECTOR)

1. No editor do Apps Script: **Implementar → Nova implementação**.
2. Tipo: **App da Web**.
3. *Executar como*: **Eu** · *Quem tem acesso*: **qualquer pessoa**.
4. **Implementar** → copie o **URL que termina em `/exec`**.
   É este URL o **conector** que o site vai usar.

> Depois de qualquer edição futura no código: **Implementar → Gerenciar implantações
> → editar (lápis) → Versão: Nova versão → Implementar**. O URL `/exec` não muda.

---

# PARTE 3 — Hand-off do conector (você → eu)

Quando tiver o URL novo, **me envie assim** (copie e preencha):

```
NOVO CONECTOR CRM-BBA
URL /exec: https://script.google.com/macros/s/_________________/exec
Token (opcional, se quiser trocar o FORM_TOKEN): __________________
```

**O que eu faço quando receber:**
1. Coloco o URL no `SHEET_ENDPOINT` em `sites/bba/assets/bba-config.js` (1 linha só).
2. Se você mandar token novo, atualizo o `FORM_TOKEN` do site **e** o `SECRET` do
   script — os dois lados, sempre iguais.
3. Testamos o fluxo completo (formulário → linha na planilha → e-mail de aviso).
4. **Só com a sua autorização** publico no Firebase Hosting.

---

# PARTE 4 — Publicar o site (sempre com a sua autorização)

Comando pronto na raiz do projeto: **`publicar-bba.bat`**

| Opção | Efeito |
|---|---|
| **[2]** | Publica num **canal de teste** (URL de preview, não afeta o site no ar) → teste 1 formulário real e confira a linha no CRM |
| **[1]** | Publica **de verdade** em `bba.edu.mz` |

Comando manual equivalente (se preferir o terminal):

```
cd "E:\bright beginnings\clone 1\sites\bba"
firebase deploy --only hosting
```

Se algo parecer errado depois de publicar: **Console Firebase → Hosting → Rollback**
(volta a versão anterior num clique). O CRM, o domínio e o DNS nunca são tocados
pelo deploy — ele só troca os arquivos visuais do site.

---

## Segurança (importante)

- `SECRET` no script = `FORM_TOKEN` no site (`bba-config.js`). Nunca partilhe.
- Envio só é aceite se o token combinar — bots que acharem o URL `/exec` não gravam nada.
- Anti-duplicado: mesmo telefone em menos de 2 minutos não cria linha repetida.
- Se um dia trocar de email de novo: mude `EMAIL_NOTIFICACAO` no topo do script
  (e re-implante uma nova versão).
