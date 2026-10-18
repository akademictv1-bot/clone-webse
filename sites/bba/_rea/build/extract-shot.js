// Extrai o PNG de um envelope de screenshot REA (JSON gerado pelo PowerShell, UTF-16 ou UTF-8)
// Uso: node extract-shot.js <envelope.json> <saida.png>
"use strict";
const fs = require("fs");
const [, , src, dst] = process.argv;
if (!src || !dst) {
  console.error("uso: node extract-shot.js <envelope.json> <saida.png>");
  process.exit(1);
}
let raw = fs.readFileSync(src);
let text;
if (raw[0] === 0xff && raw[1] === 0xfe) {
  text = raw.slice(2).toString("utf16le");
} else {
  text = raw.toString("utf8").replace(/^\uFEFF/, "");
}
const j = JSON.parse(text);
const art = j.data.normalized_result.artifact;
fs.writeFileSync(dst, Buffer.from(art.data_base64, "base64"));
console.log(
  "PNG " + dst + " · " + (art.bytes / 1024).toFixed(0) + " KB · sha256 " + art.sha256.slice(0, 12) +
  " · viewport " + JSON.stringify(j.data.normalized_result.viewport)
);
