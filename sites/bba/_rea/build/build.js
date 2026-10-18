// ============================================================
// BBA v2 — Build final: gera as páginas autocontidas em sites/bba/
// Uso: node build.js   (dentro de sites/bba/_rea/build/)
// ============================================================
"use strict";
const fs = require("fs");
const path = require("path");

const shell = require("./shell");
const home = require("./pages-home");
const main = require("./pages-main");
const extra = require("./pages-extra");
const legal = require("./pages-legal");

const BUILD = __dirname;
const OUT = path.resolve(BUILD, "..", "..");            // sites/bba
const ROOT = path.resolve(OUT, "..", "..");             // pasta conectada (clone 1)
const TPL = path.join(ROOT, "prospector-de-sites", "skills", "redesign-premium", "references", "comparador-template.html");

const css = fs.readFileSync(path.join(BUILD, "ds.css"), "utf8");
const editor = fs.readFileSync(path.join(BUILD, "editor-block.html"), "utf8");

const pages = [
  home.page,
  main.about, main.programmes, main.oxford, main.missao,
  extra.inscricao, extra.contact, extra.gallery, extra.noticia,
  legal.privacy, legal.terms,
];

let total = 0;
console.log("A gerar páginas em " + OUT);
for (const p of pages) {
  const html = shell.pageShell(p, css);
  fs.writeFileSync(path.join(OUT, p.file), html, "utf8");
  const kb = Buffer.byteLength(html, "utf8") / 1024;
  total += kb;
  console.log("  ok  " + p.file.padEnd(22) + kb.toFixed(0).padStart(4) + " KB");
}

// ---- versão editor (index + camada de edição visual)
const idx = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
if (!idx.includes("</body>")) throw new Error("index.html sem </body> — build abortado");
const idxEditor = idx.replace("</body>", editor + "\n</body>");
fs.writeFileSync(path.join(OUT, "index-editor.html"), idxEditor, "utf8");
console.log("  ok  index-editor.html      (camada de edição aplicada)");

// ---- compatibilidade com o Prospector (bba.html e bba-editor.html como páginas completas)
fs.writeFileSync(path.join(OUT, "bba.html"), idx, "utf8");
fs.writeFileSync(path.join(OUT, "bba-editor.html"), idxEditor, "utf8");
console.log("  ok  bba.html / bba-editor.html (sincronizados com o Prospector)");

// ---- comparar.html na raiz da pasta conectada (a partir do template da skill)
let tpl = fs.readFileSync(TPL, "utf8");
const clientes = [
  {
    nome: "Bright Beginnings Academy",
    slug: "bba",
    old: "https://bba.edu.mz/",
    novo: "sites/bba/index.html",
  },
];
tpl = tpl.replace("var CLIENTES=__CLIENTES__;", "var CLIENTES=" + JSON.stringify(clientes) + ";");
if (!tpl.includes("var CLIENTES=[") && !tpl.includes("var CLIENTES=[")) {
  throw new Error("comparador: falha ao substituir marcador de clientes");
}
tpl = tpl.replace(
  "var novo='sites/'+c.slug+'/'+c.slug+'.html';",
  "var novo=c.novo||('sites/'+c.slug+'/'+c.slug+'.html');"
);
fs.writeFileSync(path.join(ROOT, "comparar.html"), tpl, "utf8");
console.log("  ok  comparar.html          (raiz da pasta conectada)");

console.log("\nTotal: " + total.toFixed(0) + " KB em " + pages.length + " páginas autocontidas (+ editor + comparador).");
