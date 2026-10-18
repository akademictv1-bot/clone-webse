// Baixa páginas faltantes + gera digest de conteúdo (texto + imagens + links) de cada página
const fs = require('fs');
const path = require('path');

const BASE = 'https://bba.edu.mz/';
const OLD = 'sites/bba/_old';
const DIG = path.join(OLD, '_digest');
const MISSING = ['oxford.html', 'privacy.html', 'terms.html'];

async function fetchSave(name) {
  const dest = path.join(OLD, name);
  if (fs.existsSync(dest)) return;
  try {
    const res = await fetch(new URL(name, BASE), { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!res.ok) { console.log('FAIL', name, res.status); return; }
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    console.log('FETCHED', name);
  } catch (e) { console.log('FAIL', name, e.message); }
}

function digest(html) {
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1] || '';
  let body = html.replace(/<head[\s\S]*?<\/head>/i, '');
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<style[\s\S]*?<\/style>/gi, '');
  body = body.replace(/<!--[\s\S]*?-->/g, '');
  // marcas
  body = body.replace(/<img\b[^>]*>/gi, (m) => {
    const src = (m.match(/src\s*=\s*["']([^"']*)["']/i) || [])[1] || '';
    const alt = (m.match(/alt\s*=\s*["']([^"']*)["']/i) || [])[1] || '';
    return ` [IMG src=${src} alt=${alt}] `;
  });
  body = body.replace(/<a\b[^>]*href\s*=\s*["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (m, href, txt) => {
    const t = txt.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return t ? ` ${t} [→${href}] ` : ` [→${href}] `;
  });
  body = body.replace(/<(h[1-6])\b[^>]*>/gi, (m, h) => `\n${'#'.repeat(+h[1] + 1)} `);
  body = body.replace(/<\/h[1-6]>/gi, '\n');
  body = body.replace(/<(section|article|div|li|p|ul|ol|table|tr|footer|header|nav|main|form|label|button|figcaption)\b[^>]*>/gi, '\n');
  body = body.replace(/<br\s*\/?>/gi, '\n');
  body = body.replace(/<[^>]+>/g, ' ');
  body = body.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&rarr;/g, '→').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–');
  const lines = body.split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter((l) => l && l !== '-');
  // remove duplicatas consecutivas
  const out = [];
  for (const l of lines) if (out[out.length - 1] !== l) out.push(l);
  return `TITLE: ${title.trim()}\nDESC: ${desc.trim()}\n\n` + out.join('\n');
}

(async () => {
  for (const m of MISSING) await fetchSave(m);
  fs.mkdirSync(DIG, { recursive: true });
  for (const f of fs.readdirSync(OLD).filter((f) => f.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(OLD, f), 'utf8');
    const d = digest(html);
    fs.writeFileSync(path.join(DIG, f.replace('.html', '.txt')), d);
    console.log('DIGEST', f, '->', d.split('\n').length, 'linhas');
  }
})();
