"use strict";
const fs = require("fs");
const path = require("path");
const shell = require("./shell");

const BUILD = __dirname;
const OUT = path.resolve(BUILD, "..", "..");
const css = fs.readFileSync(path.join(BUILD, "ds.css"), "utf8");

const p404 = {
  file: "404.html",
  active: "",
  meta: {
    pt: {
      title: "Página Não Encontrada (404) | Bright Beginnings Academy — Chimoio",
      desc: "A página que procura não existe ou foi movida. Visite o site oficial da Bright Beginnings Academy em Chimoio ou contacte a nossa secretaria."
    },
    en: {
      title: "Page Not Found (404) | Bright Beginnings Academy — Chimoio",
      desc: "The page you are looking for does not exist or has been moved. Visit the official Bright Beginnings Academy website or contact our admissions office."
    }
  },
  body: `
<section class="sec tint" style="min-height:60vh;display:flex;align-items:center;padding:clamp(60px,10vw,120px) 0">
  <div class="container" style="text-align:center;max-width:680px">
    <div class="eyebrow eb-red" style="justify-content:center" data-i18n="p404_eye">Erro 404</div>
    <h1 class="h2" style="font-size:clamp(32px,5vw,52px);margin-bottom:18px" data-i18n="p404_t">Página não encontrada</h1>
    <p class="lead" style="margin-bottom:32px" data-i18n="p404_d">
      O endereço que introduziu pode ter sido alterado ou a página já não está disponível. Não se preocupe — estamos aqui para ajudar.
    </p>
    <div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-bottom:36px">
      <a class="btn btn-blue" href="index.html" data-i18n="p404_home">Voltar ao Início</a>
      <a class="btn btn-red" href="inscricao-2027.html" data-i18n="p404_apply">Inscrições 2027</a>
      <a class="btn btn-wa" href="https://wa.me/258844277021?text=Ol%C3%A1%20Bright%20Beginnings%20Academy!" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg><span data-i18n="btn_wa">Falar no WhatsApp</span></a>
    </div>
    <p style="font-size:14px;color:var(--muted)">
      Dúvidas imediatas? Ligue <a href="tel:+258844277021" style="font-weight:600;color:var(--blue)">+258 844 277 021</a> ou escreva para <a href="mailto:admin@bba.edu.mz" style="font-weight:600;color:var(--blue)">admin@bba.edu.mz</a>.
    </p>
  </div>
</section>
  `,
  dict: {
    p404_eye: "Error 404",
    p404_t: "Page Not Found",
    p404_d: "The URL you entered might have changed or the page is no longer available. Don't worry — we are here to help.",
    p404_home: "Back to Home",
    p404_apply: "Admissions 2027",
  }
};

let html = shell.pageShell(p404, css);
// Add noindex to 404 page
html = html.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">', '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">\n<meta name="robots" content="noindex, follow">');

fs.writeFileSync(path.join(OUT, "404.html"), html, "utf8");
console.log("Created 404.html successfully!");
