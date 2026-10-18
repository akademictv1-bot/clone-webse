// ============================================================
// BBA v2 — Casca comum das páginas (uso interno do build)
// ============================================================
"use strict";

const WA_DEFAULT = "https://wa.me/258844277021?text=" + encodeURIComponent("Olá Bright Beginnings Academy! Quero saber mais sobre a escola.");

const I = (p, extra) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${extra ? " " + extra : ""}>${p}</svg>`;
const F = (p) => `<svg viewBox="0 0 24 24" fill="currentColor">${p}</svg>`;

const ICON = {
  phone: I(`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`),
  mail: I(`<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/>`),
  pin: I(`<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`),
  clock: I(`<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`),
  check: I(`<path d="M20 6L9 17l-5-5"/>`),
  arrow: I(`<path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>`),
  down: I(`<path d="M6 9l6 6 6-6"/>`),
  calendar: I(`<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>`),
  book: I(`<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`),
  globe: I(`<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`),
  users: I(`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`),
  award: I(`<circle cx="12" cy="8" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>`),
  cap: I(`<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/><path d="M22 10v6"/>`),
  school: I(`<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4h6v4"/><path d="M9 10h.01M12 10h.01M15 10h.01M9 13.5h.01M12 13.5h.01M15 13.5h.01"/>`),
  shield: I(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`),
  star: I(`<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`),
  menu: I(`<path d="M3 6h18M3 12h18M3 18h18"/>`),
  x: I(`<path d="M18 6L6 18M6 6l12 12"/>`),
  heart: I(`<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`),
  zap: I(`<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`),
  compass: I(`<circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>`),
  target: I(`<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`),
  flask: I(`<path d="M10 2v6L4.6 18.4A2 2 0 0 0 6.4 21h11.2a2 2 0 0 0 1.8-2.6L14 8V2"/><path d="M8.5 2h7"/><path d="M7 15h10"/>`),
  palette: I(`<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.68-.75 1.68-1.68 0-.44-.17-.84-.44-1.14a1.7 1.7 0 0 1 1.26-2.86H16c3.31 0 6-2.69 6-6 0-4.97-4.5-8.32-10-8.32z"/>`),
  trophy: I(`<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H5a2 2 0 0 0 0 4h2"/><path d="M17 6h2a2 2 0 0 1 0 4h-2"/>`),
  play: I(`<path d="M5 3l14 9-14 9V3z"/>`),
  send: I(`<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>`),
  sparkle: I(`<path d="M12 3l1.9 5.7L19.6 10l-5.7 1.9L12 17.6l-1.9-5.7L4.4 10l5.7-1.9L12 3z"/>`),
  layers: I(`<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>`),
  file: I(`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/>`),
  camera: I(`<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>`),
  grid: I(`<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>`),
  note: I(`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/>`),
  wa: F(`<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>`),
  fb: F(`<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>`),
  ig: I(`<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>`),
  tt: F(`<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>`),
  quote: F(`<path d="M6.5 10c-.1 2.6-1 4.3-2.9 5.5L2 13.6c1.2-.7 1.9-1.6 2.1-2.6H2V4h6.5v6zm11 0c-.1 2.6-1 4.3-2.9 5.5l-1.6-1.9c1.2-.7 1.9-1.6 2.1-2.6H13V4h6.5v6z"/>`),
  shieldCheck: I(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>`),
};

// ---------- Páginas do menu ----------
const NAV = [
  { href: "about.html", key: "nav_about", pt: "Sobre Nós" },
  { href: "programmes.html", key: "nav_prog", pt: "Programas" },
  { href: "oxford.html", key: "nav_oxford", pt: "Currículo Oxford" },
  { href: "missao.html", key: "nav_missao", pt: "Missão & Valores" },
  { href: "gallery.html", key: "nav_gal", pt: "Galeria" },
  { href: "contact.html", key: "nav_contact", pt: "Contacto" },
];
const WA_FOOTER = "https://wa.me/258844277021?text=" + encodeURIComponent("Olá Bright Beginnings Academy!");
const WA_SECRETARIA = "https://wa.me/258844277021?text=" + encodeURIComponent("Olá Bright Beginnings Academy! Quero informações sobre as inscrições 2027.");
const WA_VISITA = "https://wa.me/258844277021?text=" + encodeURIComponent("Olá! Quero agendar uma visita à escola.");

// ---------- Head ----------
function head(p) {
  const t = p.meta.pt;
  const canonical = "https://bba.edu.mz/" + (p.file === "index.html" ? "" : p.file);
  const ogimg = "https://bba.edu.mz/assets/img/hero-school.jpg";
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${t.title}</title>
<meta name="description" content="${t.desc}">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/jpeg" href="assets/img/favicon.jpg">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.jpg">
<meta name="theme-color" content="#0B1B3A">
<meta property="og:title" content="${t.title}">
<meta property="og:description" content="${t.desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogimg}">
<meta property="og:site_name" content="Bright Beginnings Academy">
<meta property="og:locale" content="pt_MZ">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap" rel="stylesheet">
${p.preload ? `<link rel="preload" as="image" href="${p.preload}" fetchpriority="high">` : ""}${p.schema ? `\n<script type="application/ld+json">${p.schema}</script>` : ""}`;
}

// ---------- Header ----------
function header(active) {
  const nav = NAV.map((n) => `<a href="${n.href}"${active === n.href ? ' class="on"' : ""} data-i18n="${n.key}">${n.pt}</a>`).join("\n      ");
  const dnav = NAV.map((n) => `<a href="${n.href}" data-i18n="${n.key}">${n.pt}</a>`).join("\n      ");
  return `<div class="annc">
  <div class="container">
    <span class="annc-ic" aria-hidden="true">${ICON.cap}</span><span data-i18n="bar_annc">Inscrições Abertas 2027 — Garanta a vaga do seu filho.</span>
    <a href="inscricao-2027.html" data-i18n="bar_cta">Candidatar agora →</a>
  </div>
</div>
<header class="hdr">
  <div class="container hdr-in">
    <a class="brand" href="index.html" aria-label="Bright Beginnings Academy — Início">
      <img src="assets/img/logo-header.jpg" alt="Brasão Bright Beginnings Academy" width="48" height="48">
      <span class="bn-block">
        <span class="bn-top"><span class="brand-bright">Bright</span> <span class="brand-beginnings">Beginnings</span></span>
        <span class="bn-sub"><span class="brand-academy">Academy</span> · <span class="brand-city">Chimoio</span></span>
      </span>
    </a>
    <nav class="nav" aria-label="Navegação principal">
      ${nav}
    </nav>
    <div class="lang" role="group" aria-label="Idioma">
      <button type="button" data-lang-btn="pt" class="on">PT</button>
      <button type="button" data-lang-btn="en">EN</button>
    </div>
    <a class="btn btn-red btn-sm btn-hdr" href="inscricao-2027.html"><span data-i18n="btn_apply">Candidatura 2027</span></a>
    <button class="burger" type="button" aria-label="Abrir menu" id="burger">${ICON.menu}</button>
  </div>
</header>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="Menu">
  <div class="d-head">
    <a class="brand" href="index.html" aria-label="Bright Beginnings Academy" style="gap:10px">
      <img src="assets/img/logo-header.jpg" alt="Bright Beginnings Academy" width="40" height="40">
      <span class="bn-block">
        <span class="bn-top" style="font-size:15px"><span class="brand-bright">Bright</span> <span class="brand-beginnings">Beginnings</span></span>
        <span class="bn-sub" style="font-size:9.5px"><span class="brand-academy">Academy</span> · <span class="brand-city">Chimoio</span></span>
      </span>
    </a>
    <button class="burger-x" type="button" id="drawer-x" aria-label="Fechar menu">${ICON.x}</button>
  </div>
  <nav>
      ${dnav}
  </nav>
  <div class="d-cta">
    <a class="btn btn-red btn-block" href="inscricao-2027.html"><span data-i18n="btn_apply">Candidatura 2027</span></a>
    <a class="btn btn-wa btn-block" href="${WA_DEFAULT}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="btn_wa">Falar no WhatsApp</span></a>
    <div class="lang" style="margin:6px auto 0">
      <button type="button" data-lang-btn="pt" class="on">PT</button>
      <button type="button" data-lang-btn="en">EN</button>
    </div>
  </div>
  <div class="d-info">
    <a href="tel:+258844277021">${ICON.phone}+258 844 277 021</a>
    <a href="mailto:admin@bbamoz.com">${ICON.mail}admin@bbamoz.com</a>
    <a href="https://maps.google.com/?q=Rua+17+de+Julho,+Bairro+Em%C3%ADlia+Dausse,+Chimoio" target="_blank" rel="noopener">${ICON.pin}Rua 17 de Julho, Chimoio</a>
  </div>
</aside>`;
}
// ---------- Footer ----------
function footer() {
  return `<footer class="footer">
  <div class="container">
    <div class="f-grid">
      <div class="f-brand">
        <img src="assets/img/logo-header.jpg" alt="Bright Beginnings Academy">
        <p data-i18n="f_blurb">Escola internacional em Chimoio com o Oxford International Curriculum, do Early Years ao Grade 10 — uma comunidade que conhece cada aluno pelo nome.</p>
        <p class="f-line">${ICON.pin}<span>Rua 17 de Julho, Bairro Emília Dausse, Chimoio, Moçambique</span></p>
        <p class="f-line">${ICON.phone}<a href="tel:+258844277021">+258 844 277 021</a></p>
        <p class="f-line">${ICON.mail}<a href="mailto:admin@bbamoz.com">admin@bbamoz.com</a></p>
        <p class="f-line">${ICON.clock}<span data-i18n="f_hours">Seg–Sex · 07:30–16:00</span></p>
        <div class="f-social">
          <a href="https://www.facebook.com/profile.php?id=61594581886025" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a>
          <a href="https://www.instagram.com/bright_bba_oficial" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
          <a href="https://www.tiktok.com/@nussy25" target="_blank" rel="noopener" aria-label="TikTok">${ICON.tt}</a>
        </div>
      </div>
      <div class="f-col">
        <h4 data-i18n="f_pages">Escola</h4>
        <a href="about.html" data-i18n="nav_about">Sobre Nós</a>
        <a href="programmes.html" data-i18n="nav_prog">Programas</a>
        <a href="oxford.html" data-i18n="nav_oxford">Currículo Oxford</a>
        <a href="missao.html" data-i18n="nav_missao">Missão & Valores</a>
        <a href="gallery.html" data-i18n="nav_gal">Galeria</a>
      </div>
      <div class="f-col">
        <h4 data-i18n="f_adm">Admissões</h4>
        <a href="inscricao-2027.html" data-i18n="f_insc">Inscrições 2027</a>
        <a href="contact.html" data-i18n="nav_contact">Contacto</a>
        <a href="privacy.html" data-i18n="f_priv">Política de Privacidade</a>
        <a href="terms.html" data-i18n="f_terms">Termos de Uso</a>
      </div>
      <div class="f-col">
        <h4 data-i18n="f_talk">Fale connosco</h4>
        <p data-i18n="f_note">A secretaria responde em até 24 horas úteis, de segunda a sexta. Visitas guiadas com marcação.</p>
        <a class="btn btn-wa btn-sm" href="${WA_FOOTER}" target="_blank" rel="noopener">${ICON.wa}<span data-i18n="btn_wa">Falar no WhatsApp</span></a>
      </div>
    </div>
    <div class="f-bottom">
      <span data-i18n="f_copy">© 2026 <b>Bright Beginnings Academy</b> · Fundada em 2014 · Chimoio, Moçambique</span>
      <span data-i18n="f_love">Learn to love to learn.</span>
      <span data-i18n="f_oxford">Escola certificada Oxford International Curriculum · desde 2025</span>
    </div>
  </div>
</footer>
<a class="fab" href="${WA_FOOTER}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ICON.wa}</a>
<div class="cookie" id="cookie" role="dialog" aria-label="Cookies">
  <p><span data-i18n="cookie_t">Usamos apenas dados essenciais para responder ao seu pedido. Sem rastreadores de publicidade.</span> <a href="privacy.html" data-i18n="cookie_l">Ver Política de Privacidade</a>.</p>
  <button class="btn btn-blue btn-sm" type="button" id="cookie-ok" data-i18n="cookie_b">Aceitar</button>
</div>`;
}

// ---------- JavaScript comum ----------
const COMMON_JS = `
(function(){
"use strict";
var EN=window.__EN||{}, META=window.__META||{};
function apply(l){
  var isEn=l==="en";
  document.documentElement.lang = isEn ? "en" : "pt-MZ";
  document.querySelectorAll("[data-i18n]").forEach(function(el){
    var k=el.getAttribute("data-i18n");
    if(isEn){
      if(el.dataset.pt===undefined) el.dataset.pt=el.innerHTML;
      if(EN[k]!==undefined) el.innerHTML=EN[k];
    }else if(el.dataset.pt!==undefined){ el.innerHTML=el.dataset.pt; }
  });
  document.querySelectorAll("[data-lang-btn]").forEach(function(b){ b.classList.toggle("on", b.getAttribute("data-lang-btn")===l); });
  if(META[l]){ document.title=META[l].title; var md=document.querySelector('meta[name="description"]'); if(md) md.setAttribute("content", META[l].desc); }
  try{ localStorage.setItem("bba-lang", l); }catch(e){}
  window.__lang=l;
  document.dispatchEvent(new CustomEvent("bba:lang",{detail:{lang:l}}));
}
var lang="pt"; try{ lang=localStorage.getItem("bba-lang")||"pt"; }catch(e){}
document.querySelectorAll("[data-lang-btn]").forEach(function(b){
  b.addEventListener("click", function(){ apply(b.getAttribute("data-lang-btn")); });
});
apply(lang);

var hdr=document.querySelector(".hdr");
if(hdr){ var onS=function(){ hdr.classList.toggle("scrolled", window.scrollY>8); }; window.addEventListener("scroll", onS, {passive:true}); onS(); }

var burger=document.getElementById("burger"), drawer=document.getElementById("drawer"), scrim=document.getElementById("scrim"), dx=document.getElementById("drawer-x");
function close(){ if(drawer) drawer.classList.remove("open"); if(scrim) scrim.classList.remove("show"); }
if(burger&&drawer){
  burger.addEventListener("click", function(){ drawer.classList.add("open"); if(scrim) scrim.classList.add("show"); });
  if(dx) dx.addEventListener("click", close);
  if(scrim) scrim.addEventListener("click", close);
  drawer.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", close); });
  document.addEventListener("keydown", function(e){ if(e.key==="Escape") close(); });
}

var els=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches){
  var io=new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } }); }, {threshold:.1, rootMargin:"0px 0px -36px 0px"});
  els.forEach(function(el){ io.observe(el); });
}else{ els.forEach(function(el){ el.classList.add("in"); }); }

var slider=document.querySelector(".hero-slider");
if(slider){
  var slides=slider.querySelectorAll(".hero-slide"), dots=document.querySelectorAll(".hdot"), i=0, t=null;
  function go(n){ slides[i].classList.remove("active"); if(dots[i]) dots[i].classList.remove("on"); i=(n+slides.length)%slides.length; slides[i].classList.add("active"); if(dots[i]) dots[i].classList.add("on"); }
  function auto(){ if(t) clearInterval(t); if(!matchMedia("(prefers-reduced-motion: reduce)").matches) t=setInterval(function(){ go(i+1); }, 6000); }
  dots.forEach(function(d, n){ d.addEventListener("click", function(){ go(n); auto(); }); });
  slider.addEventListener("mouseenter", function(){ if(t) clearInterval(t); });
  slider.addEventListener("mouseleave", auto);
  go(0); auto();
}

var ck=document.getElementById("cookie");
if(ck){
  var ok=false; try{ ok=localStorage.getItem("bba-cookie-ok")==="1"; }catch(e){}
  if(!ok) setTimeout(function(){ ck.classList.add("show"); }, 1400);
  var bok=document.getElementById("cookie-ok");
  if(bok) bok.addEventListener("click", function(){ ck.classList.remove("show"); try{ localStorage.setItem("bba-cookie-ok","1"); }catch(e){} });
}

document.querySelectorAll("form[data-wa]").forEach(function(f){
  f.addEventListener("submit", function(e){
    e.preventDefault();
    var hp=f.querySelector('input[name="website"]'); if(hp && hp.value) return;
    var d={}; f.querySelectorAll("input,select,textarea").forEach(function(el){ if(el.name && el.name!=="website") d[el.name]=el.value; });
    var conf=window.BBA||{};
    var linhas=[f.getAttribute("data-wa")||"Olá! Vim pelo site."];
    if(d.nome) linhas.push("Nome: "+d.nome);
    if(d.aluno) linhas.push("Aluno(a): "+d.aluno);
    if(d.nivel) linhas.push("Nível: "+d.nivel);
    if(d.telefone) linhas.push("Telefone/WhatsApp: "+d.telefone);
    if(d.email) linhas.push("Email: "+d.email);
    if(d.mensagem) linhas.push("Mensagem: "+d.mensagem);
    try{
      if(conf.SHEET_ENDPOINT){
        fetch(conf.SHEET_ENDPOINT,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({token:conf.FORM_TOKEN,origem:conf.ORIGEM_SITE,pagina:location.pathname,quando:new Date().toISOString(),dados:d})});
      }
    }catch(err){}
    var wa=conf.WHATSAPP||"258844277021";
    window.open("https://wa.me/"+wa+"?text="+encodeURIComponent(linhas.join("\\n")),"_blank","noopener");
    var okbox=f.querySelector(".form-ok");
    if(okbox){ f.style.display="none"; var sc=okbox.querySelector(".ok-extra"); if(sc) sc.style.display="block"; okbox.style.display="block"; okbox.focus(); }
  });
});
})();
`;

// ---------- Traduções comuns (EN) ----------
const COMMON_EN = {
  bar_annc: "Admissions Open for 2027 — Secure your child's place.",
  bar_cta: "Apply now →",
  nav_about: "About Us",
  nav_prog: "Programmes",
  nav_oxford: "Oxford Curriculum",
  nav_missao: "Mission & Values",
  nav_gal: "Gallery",
  nav_contact: "Contact",
  btn_apply: "Apply for 2027",
  btn_wa: "Chat on WhatsApp",
  ab_cta1: "Apply for 2027",
  f_blurb: "International school in Chimoio teaching the Oxford International Curriculum, from Early Years to Grade 10 — a community that knows every student by name.",
  f_hours: "Mon–Fri · 07:30–16:00",
  f_pages: "School",
  f_adm: "Admissions",
  f_insc: "Admissions 2027",
  f_priv: "Privacy Policy",
  f_terms: "Terms of Use",
  f_talk: "Talk to us",
  f_note: "Our office replies within 24 business hours, Monday to Friday. Campus tours by appointment.",
  f_love: "Learn to love to learn.",
  f_oxford: "Oxford International Curriculum — certified school since 2025",
  f_copy: "© 2026 <b>Bright Beginnings Academy</b> · Established in 2014 · Chimoio, Mozambique",
  cookie_t: "We use only essential data to answer your request. No advertising trackers.",
  cookie_l: "See Privacy Policy",
  cookie_b: "Accept",
  nav_home: "Home",
  ct_btn1: "Book a visit on WhatsApp",
  ct_btn2: "Contacts & location",
  t_saber: "Learn more",
  ct_consent: "I have read and accept the <a href=\"privacy.html\">Privacy Policy</a> and agree to be contacted about this enquiry.",
  side_priv: "We use your data only to answer this request. No advertising. <a href=\"privacy.html\">See Privacy Policy</a>.",
  ox_badge: "Oxford International certified · since 2025",
  lb_x: "Close ✕",
  side_btn: "Book a visit",
  n_eyebrow: "News",
  side_nc_t: "No obligation",
  side_dp_t: "Your data, protected",
  m1_t: "Talk to us",
  m1_d: "Complete the pre-enrolment form or message us on WhatsApp (+258 844 277 021). We schedule the guided visit on the day that suits your family best.",
  m2_t: "Visit the campus and submit your documents",
  m2_d: "Tour the campus, meet our leadership team and submit the document checklist. Primary applicants have a friendly placement conversation.",
  m3_t: "Confirm your place",
  m3_d: "Once your documents are validated, our office confirms the 2027 enrolment and shares the class, materials and key dates.",
  q1: "What language are lessons taught in?",
  a1: "Lessons are taught in English, with Portuguese support for beginners — the school's bilingual model since it was founded.",
  q2: "How can I visit the school before deciding?",
  a2: "Complete the pre-enrolment form or call +258 844 277 021 to schedule a guided visit: Rua 17 de Julho, Bairro Emília Dausse, Chimoio, Monday to Friday, 07:30–16:00.",
  q3: "Is there an entrance exam?",
  a3: "From Primary onwards, there is a placement conversation to get to know your child. There is no pass-or-fail exam — it simply ensures the right class placement.",
  q4: "Which ages do you accept at each level?",
  a4: "Early Years: ages 2–5. Primary: Grades 1–7. Secondary: Grades 8–10 (up to around age 16).",
  q5: "How do I find out the 2027 fees?",
  a5: "Our office will send you the updated fee schedule on WhatsApp or during your visit — no obligation, no small print.",
};

// ---------- Montagem da página ----------
function pageShell(p, css) {
  const body = p.banner === false ? p.body : p.body;
  return `<!DOCTYPE html>
<html lang="pt-MZ">
<head>
${head(p)}
<style>
${css}
</style>
</head>
<body>
<a class="skip-link" href="#main">Saltar para o conteúdo</a>
${header(p.active || "")}
<main id="main">
${body}
</main>
${footer()}
<script>
window.__EN=${JSON.stringify(Object.assign({}, COMMON_EN, p.dict || {}))};
window.__META=${JSON.stringify(p.meta)};
window.BBA=${JSON.stringify({
    WHATSAPP: "258844277021",
    EMAIL_DESTINO: "admin@bbamoz.com",
    SHEET_ENDPOINT: "https://script.google.com/macros/s/AKfycbyl-zZqJV17C6B3z5GKGZI_sQJCx0ctuVxu2V7UF4rdJyus6gtGwvbLiwJvegdLCHAygQ/exec",
    ORIGEM_SITE: "site-bba",
    FORM_TOKEN: "c305567861293b7d6cdbf44f0c4c1abc"
  })};
${COMMON_JS}
${p.extraJs || ""}
</script>
</body>
</html>`;
}

module.exports = { ICON, NAV, head, header, footer, COMMON_JS, COMMON_EN, pageShell, WA_DEFAULT, WA_FOOTER, WA_SECRETARIA, WA_VISITA };

