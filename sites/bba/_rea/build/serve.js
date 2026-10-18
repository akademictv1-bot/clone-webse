// Servidor estático interno (só para verificação visual do build)
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const ROOT = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, "..", ".."); // sites/bba
const PORT = process.argv[3] ? parseInt(process.argv[3], 10) : 4173;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
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
  .listen(PORT, () => console.log("serving " + ROOT + " em http://127.0.0.1:" + PORT));
