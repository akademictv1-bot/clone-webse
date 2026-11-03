# Campos que o site envia → colunas do CRM

O site (built em `sites/bba`) envia um POST para o `SHEET_ENDPOINT`
com `Content-Type: text/plain` e corpo JSON **igual a este**:

```json
{
  "token":  "c305567861293b7d6cdbf44f0c4c1abc",
  "origem": "site-bba",
  "pagina": "/inscricao-2027.html",
  "quando": "2026-10-28T07:45:12.000Z",
  "dados": {
    "nome":     "Nome do encarregado",
    "aluno":    "Nome do aluno (só na pré-inscrição)",
    "nivel":    "Early Years (2–5 anos) | Primary (Grades 1–7) | Secondary (Grades 8–10)",
    "telefone": "+258 ...",
    "email":    "email do encarregado (só no formulário de contactos)",
    "mensagem": "texto livre"
  }
}
```

O código-fonte deste envio está no `shell.js` do build (formulário `data-wa`),
e aparece idêntico no fim de cada página HTML gerada:

```js
fetch(conf.SHEET_ENDPOINT, {
  method: "POST", mode: "no-cors",
  headers: { "Content-Type": "text/plain;charset=utf-8" },
  body: JSON.stringify({
    token: conf.FORM_TOKEN,
    origem: conf.ORIGEM_SITE,
    pagina: location.pathname,
    quando: new Date().toISOString(),
    dados: d
  })
});
```

## Dicionário: campos → colunas da aba "Leads do Site"

| Campo do pacote | Coluna no Sheet | Contact page | Inscrição 2027 |
|---|---|---|---|
| `quando` (formatado local) | A — Quando (local) | sempre | sempre |
| `quando` (ISO, para anti-duplicado) | B — Quando (ISO) | sempre | sempre |
| `origem` | C — Origem | `site-bba` | `site-bba` |
| `pagina` | D — Página | `/contact.html` | `/inscricao-2027.html` |
| `dados.nome` | E — Nome do encarregado | ✓ (obrigatório) | ✓ (obrigatório) |
| `dados.aluno` | F — Aluno(a) | ✗ (não existe) | ✓ |
| `dados.nivel` | G — Nível | ✓ (obrigatório) | ✓ (obrigatório) |
| `dados.telefone` | H — Telefone | ✓ (obrigatório) | ✓ (obrigatório) |
| `dados.email` | I — Email | ✓ | ✗ (não existe) |
| `dados.mensagem` | J — Mensagem | ✓ | ✓ |
| — (o operador muda) | K — Status | começa **Novo** | começa **Novo** |
| — (o operador escreve) | L — Observações | vazio | vazio |

Notas:
- O campo escondido anti-spam `website` **nunca** chega ao CRM (o site retira-o;
  e o script também o verifica a título de segurança — se vier preenchido, ignora).
- O `token` não é gravado: serve apenas de letra de confirmação (`SECRET`).
- Se um formulário novo aparecer (ex.: enquete), acrescente o campo no site e o
  script simplesmente continuará a gravar o resto — campos em falta ficam vazios.
