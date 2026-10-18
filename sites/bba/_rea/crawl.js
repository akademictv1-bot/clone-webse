// REA+BBA crawler: baixa todas as páginas e assets do site bba.edu.mz
// Gera: sites/bba/_old/ (referência HTML/JSON/JS) e sites/bba/assets/ (arquivos estáticos)
// + sites/bba/_rea/manifest-download.json (tamanho, sha256, status de cada arquivo)
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE = 'https://bba.edu.mz/';
const ALLOWED_HOSTS = new Set(['bba.edu.mz', 'www.bba.edu.mz']);
const OUT_OLD = 'sites/bba/_old';
const OUT_ASSETS = 'sites/bba/assets';
const MANIFEST = 'sites/bba/_rea/manifest-download.json';

const PAGES = ['', 'about.html', 'programmes.html', 'inscricao-2027.html', 'missao.html', 'contact.html', 'gallery.html', 'noticia.html'];
const EXTRA = ['news.json', 'bba-config.js'];

const EXT_RE = /\.(jpe?g|png|webp|gif|svg|ico|css|js|json|mp4|webm|pdf|woff2?|ttf|eot)$/i;

function absUrl(u, pageUrl) {
  try {
    if (/^(data:|mailto:|tel:|javascript:|#)/i.test(u)) return null;
    const r = new URL(u, pageUrl);
    if (!ALLOWED_HOSTS.has(r.hostname)) return null;
    return r.origin + r.pathname + r.search;
  } catch { return null; }
}

function extractAssetUrls(text, pageUrl) {
  const found = new Set();
  // atributos comuns
  for (const m of text.matchAll(/(?:src|href|poster|content)\s*=\s*["']([^"']+)["']/gi)) {
    const a = absUrl(m[1].trim(), pageUrl);
    if (a && EXT_RE.test(new URL(a).pathname)) found.add(a);
  }
  // srcset (pega cada candidato antes das vírgulas)
  for (const m of text.matchAll(/srcset\s*=\s*["']([^"']+)["']/gi)) {
    for (const cand of m[1].split(',')) {
      const u = cand.trim().split(/\s+/)[0];
      const a = absUrl(u, pageUrl);
      if (a && EXT_RE.test(new URL(a).pathname)) found.add(a);
    }
  }
  // url(...) em CSS inline
  for (const m of text.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)) {
    const a = absUrl(m[1].trim(), pageUrl);
    if (a && EXT_RE.test(new URL(a).pathname)) found.add(a);
  }
  // strings absolutas soltas (JSON-LD, news.json, etc.)
  for (const m of text.matchAll(/["'](https?:\/\/[^"'()\s]+\.(?:jpe?g|png|webp|svg|ico|mp4))["']/gi)) {
    const a = absUrl(m[1], pageUrl);
    if (a) found.add(a);
  }
  return [...found];
}

async function fetchBuf(url) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (REA-BBA-crawl)' } });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return Buffer.from(await res.arrayBuffer());
}

(async () => {
  fs.mkdirSync(OUT_OLD, { recursive: true });
  fs.mkdirSync(OUT_ASSETS, { recursive: true });
  const manifest = [];
  const assetQueue = new Map(); // url -> nome de referência
  const pageTexts = {};

  for (const p of PAGES) {
    const url = new URL(p, BASE).href;
    try {
      const buf = await fetchBuf(url);
      const name = p === '' ? 'index.html' : p;
      fs.writeFileSync(path.join(OUT_OLD, name), buf);
      const text = buf.toString('utf8');
      pageTexts[name] = text;
      manifest.push({ url, file: `_old/${name}`, bytes: buf.length, sha256: crypto.createHash('sha256').update(buf).digest('hex'), kind: 'page' });
      console.log('PAGE OK   ', name.padEnd(24), buf.length);
      for (const a of extractAssetUrls(text, url)) assetQueue.set(a, true);
    } catch (e) {
      console.log('PAGE FAIL ', p, e.message);
      manifest.push({ url, error: e.message, kind: 'page' });
    }
  }
  for (const x of EXTRA) {
    const url = new URL(x, BASE).href;
    try {
      const buf = await fetchBuf(url);
      fs.writeFileSync(path.join(OUT_OLD, x), buf);
      manifest.push({ url, file: `_old/${x}`, bytes: buf.length, sha256: crypto.createHash('sha256').update(buf).digest('hex'), kind: 'extra' });
      console.log('EXTRA OK  ', x.padEnd(24), buf.length);
      const text = buf.toString('utf8');
      for (const a of extractAssetUrls(text, url)) assetQueue.set(a, true);
    } catch (e) {
      console.log('EXTRA FAIL', x, e.message);
      manifest.push({ url, error: e.message, kind: 'extra' });
    }
  }

  console.log(`\nAssets únicos encontrados: ${assetQueue.size}\n`);
  for (const url of assetQueue.keys()) {
    const rel = new URL(url).pathname.replace(/^\/+/, '').replace(/%20/g, ' ');
    const dest = path.join(OUT_ASSETS, rel);
    if (fs.existsSync(dest)) { console.log('SKIP      ', rel); continue; }
    try {
      const buf = await fetchBuf(url);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, buf);
      manifest.push({ url, file: `assets/${rel}`, bytes: buf.length, sha256: crypto.createHash('sha256').update(buf).digest('hex'), kind: 'asset' });
      console.log('ASSET OK  ', rel.padEnd(44), buf.length);
    } catch (e) {
      console.log('ASSET FAIL', rel, e.message);
      manifest.push({ url, error: e.message, kind: 'asset' });
    }
  }

  fs.writeFileSync(MANIFEST, JSON.stringify({ base: BASE, generated: new Date().toISOString(), files: manifest }, null, 2));
  console.log('\nManifesto salvo em', MANIFEST);
})();
