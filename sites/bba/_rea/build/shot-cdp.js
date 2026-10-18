// Captura de ecrã via CDP com viewport controlável (desktop/mobile) + full-page.
// Uso: node shot-cdp.js <url> <largura> <altura> <saida.png> [full]
"use strict";
const fs = require("fs");
const http = require("http");

function httpReq(method, path) {
  return new Promise((res, rej) => {
    const req = http.request({ host: "127.0.0.1", port: 9222, path, method }, (r) => {
      let d = "";
      r.on("data", (c) => (d += c));
      r.on("end", () => res(d));
    });
    req.on("error", rej);
    req.end();
  });
}

(async () => {
  const [, , url, w, h, out, mode, lang] = process.argv;
  const W = parseInt(w, 10);
  const H = parseInt(h, 10);
  const t = JSON.parse(await httpReq("PUT", "/json/new?" + encodeURIComponent(url)));
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  let id = 0;
  const pend = new Map();
  const send = (method, params) =>
    new Promise((res, rej) => {
      const i = ++id;
      pend.set(i, { res, rej });
      ws.send(JSON.stringify({ id: i, method, params }));
    });
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pend.has(m.id)) {
      const p = pend.get(m.id);
      pend.delete(m.id);
      m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result);
    }
  };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: W,
    height: H,
    deviceScaleFactor: 1,
    mobile: W < 700,
  });
  await new Promise((r) => setTimeout(r, 2200)); // fontes + imagens + slider
  if (lang === "en" || lang === "pt") {
    await send("Runtime.evaluate", {
      expression: `var b=document.querySelector('[data-lang-btn="${lang}"]');if(b)b.click();true`,
    });
    await new Promise((r) => setTimeout(r, 700));
  }
  // revela tudo o que o scroll revelaria (para capturas full-page fiéis)
  await send("Runtime.evaluate", {
    expression:
      "document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in')});" +
      "document.querySelectorAll('img[loading=lazy]').forEach(function(i){i.loading='eager'});" +
      "var ck=document.getElementById('cookie'); if(ck) ck.remove();" +
      "document.documentElement.style.scrollBehavior='auto';true",
  });
  await new Promise((r) => setTimeout(r, 900));
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: mode === "full",
  });
  const buf = Buffer.from(shot.data, "base64");
  fs.writeFileSync(out, buf);
  console.log("PNG " + out + " · " + (buf.length / 1024).toFixed(0) + " KB · " + W + "x" + H + (mode === "full" ? " (full)" : ""));
  await httpReq("GET", "/json/close/" + t.id);
  process.exit(0);
})().catch((e) => {
  console.error("ERRO:", e.message);
  process.exit(1);
});
