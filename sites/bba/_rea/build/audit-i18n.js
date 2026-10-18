// Auditoria rápida do build: chaves data-i18n sem tradução EN + verificação de anos.
// Uso: node audit-i18n.js
"use strict";
const fs = require("fs");
const path = require("path");

const OUT = path.resolve(__dirname, "..", ".."); // sites/bba
const files = fs.readdirSync(OUT).filter((f) => f.endsWith(".html"));
let problems = 0;

for (const f of files) {
  const html = fs.readFileSync(path.join(OUT, f), "utf8");
  const m = html.match(/window\.__EN\s*=\s*(\{[\s\S]*?\});/);
  if (!m) {
    console.log(`- ${f}: sem bloco __EN (ok para páginas legais?)`);
    continue;
  }
  let en;
  try {
    en = JSON.parse(m[1]);
  } catch (e) {
    console.log(`! ${f}: __EN não é JSON válido → ${e.message}`);
    problems++;
    continue;
  }
  const keys = new Set();
  const rx = /data-i18n="([^"]+)"/g;
  let k;
  while ((k = rx.exec(html))) keys.add(k[1]);
  const missing = [...keys].filter((key) => !(key in en));
  const y2015 = html.includes("2015");
  const y2014 = html.includes("2014");
  const y2025 = html.includes("2025");
  console.log(
    `- ${f}: ${keys.size} chaves i18n · faltam EN: ${missing.length}${missing.length ? " → " + missing.join(", ") : ""} · 2015:${y2015 ? "SIM" : "não"} · 2014:${y2014 ? "sim" : "NÃO"} · 2025:${y2025 ? "sim" : "NÃO"}`
  );
  if (missing.length) problems++;
  if (y2015) problems++;
}
console.log(problems ? `\n${problems} problema(s) encontrados.` : "\nSem problemas: todas as chaves EN cobertas, sem 2015.");
