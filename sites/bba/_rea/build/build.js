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

const VIEWPORT = '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">';
const robotsTag = (c) => VIEWPORT + '\n<meta name="robots" content="' + c + '">';

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
if (!idx.includes(VIEWPORT)) throw new Error("index.html sem meta viewport conhecida — build abortado");

// Páginas de edição e cópia do Prospector NÃO devem ser indexadas.
const idxEditorBase = idx.replace(VIEWPORT, robotsTag("noindex, nofollow"));
const idxBba = idx.replace(VIEWPORT, robotsTag("noindex, follow"));

// camada de editor aplicada na cópia com noindex
const idxEditor = idxEditorBase.replace("</body>", editor + "\n</body>");
fs.writeFileSync(path.join(OUT, "index-editor.html"), idxEditor);
console.log("  ok  index-editor.html      (camada de edição aplicada)");

// ---- compatibilidade com o Prospector (bba.html e bba-editor.html como páginas completas)
fs.writeFileSync(path.join(OUT, "bba.html"), idxBba);
fs.writeFileSync(path.join(OUT, "bba-editor.html"), idxEditor);
console.log("  ok  bba.html / bba-editor.html (sincronizados com o Prospector, noindex)");

// ---- sitemap.xml gerado automaticamente (lastmod = data do build)
const SY = new Date();
const ymd = SY.getFullYear() + "-" + String(SY.getMonth() + 1).padStart(2, "0") + "-" + String(SY.getDate()).padStart(2, "0");
const sitemapPages = [
  ["https://www.bba.edu.mz/", "weekly", "1.0"],
  ["https://www.bba.edu.mz/about.html", "monthly", "0.8"],
  ["https://www.bba.edu.mz/programmes.html", "monthly", "0.8"],
  ["https://www.bba.edu.mz/oxford.html", "monthly", "0.8"],
  ["https://www.bba.edu.mz/inscricao-2027.html", "weekly", "0.9"],
  ["https://www.bba.edu.mz/missao.html", "monthly", "0.7"],
  ["https://www.bba.edu.mz/contact.html", "monthly", "0.7"],
  ["https://www.bba.edu.mz/gallery.html", "monthly", "0.6"],
  ["https://www.bba.edu.mz/noticia.html", "weekly", "0.6"],
  ["https://www.bba.edu.mz/privacy.html", "yearly", "0.3"],
  ["https://www.bba.edu.mz/terms.html", "yearly", "0.3"],
];
const sitemapXml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  sitemapPages.map(([loc, cf, pr]) =>
    "  <url>\n    <loc>" + loc + "</loc>\n    <lastmod>" + ymd + "</lastmod>\n    <changefreq>" + cf + "</changefreq>\n    <priority>" + pr + "</priority>\n  </url>"
  ).join("\n") +
  "\n</urlset>\n";
fs.writeFileSync(path.join(OUT, "sitemap.xml"), sitemapXml, "utf8");
console.log("  ok  sitemap.xml            (lastmod " + ymd + ")");

// ---- 404.html (página de erro personalizada para o Firebase Hosting)
require("./gen-404");

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
