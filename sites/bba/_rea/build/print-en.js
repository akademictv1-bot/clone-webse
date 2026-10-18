// Imprime as strings EN embutidas numa página gerada (para revisão de texto).
// Uso: node print-en.js <pagina.html>
"use strict";
const fs = require("fs");
const path = require("path");
const OUT = path.resolve(__dirname, "..", "..");
const f = process.argv[2];
const html = fs.readFileSync(path.join(OUT, f), "utf8");
const m = html.match(/window\.__EN\s*=\s*(\{[\s\S]*?\});/);
if (!m) { console.log("sem __EN"); process.exit(0); }
const en = JSON.parse(m[1]);
for (const k of Object.keys(en)) console.log(k + ": " + en[k]);
