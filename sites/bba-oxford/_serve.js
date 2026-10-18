// Servidor estático do clone local do site bba-oxford (baseado em sites/bba/_rea/build/serve.js)
// Uso: node _serve.js [porta]   (padrão: 4178)  ·  abre em http://127.0.0.1:<porta>/
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;
const PORT = process.argv[2] ? parseInt(process.argv[2], 10) : 4178;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
};
http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p === "/") p = "/index.html";
    const f = path.join(ROOT, p);
    if (!f.startsWith(ROOT)) { res.writeHead(403); res.end("403"); return; }
    fs.readFile(f, (e, buf) => {
      if (e) { res.writeHead(404); res.end("404"); return; }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(f).toLowerCase()] || "application/octet-stream" });
      res.end(buf);
    });
  })
  .listen(PORT, () => console.log("clone bba-oxford em http://127.0.0.1:" + PORT + " (" + ROOT + ")"));
