const fs = require('fs');
const path = require('path');

const siteDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(siteDir).filter(f => f.endsWith('.html') && !f.endsWith('-editor.html') && f !== 'bba.html');

console.log('=== AUDITING BBA SITE FOR SEO & DEPLOY READINESS ===\n');

// 1. Audit Sitemap
const sitemapPath = path.join(siteDir, 'sitemap.xml');
let sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  const smContent = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = [...smContent.matchAll(/<loc>([^<]+)<\/loc>/g)];
  sitemapUrls = locMatches.map(m => m[1]);
  console.log(`[SITEMAP] Found ${sitemapUrls.length} URLs in sitemap.xml:`);
  sitemapUrls.forEach(u => console.log('  - ' + u));
} else {
  console.log('[SITEMAP] ERROR: sitemap.xml NOT FOUND!');
}

// 2. Audit robots.txt
const robotsPath = path.join(siteDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const rbContent = fs.readFileSync(robotsPath, 'utf8');
  console.log('\n[ROBOTS.TXT] Content:');
  console.log(rbContent.trim().split('\n').map(l => '  ' + l).join('\n'));
} else {
  console.log('\n[ROBOTS.TXT] ERROR: robots.txt NOT FOUND!');
}

// 3. Audit HTML Pages
console.log('\n[PAGES AUDIT]');
const missingSitemapPages = [];
const deadLinks = [];
const missingImages = [];
const allExternalDomains = new Set();
const seoReport = [];

files.forEach(file => {
  const filePath = path.join(siteDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check in sitemap
  const pageCanonicalUrl = file === 'index.html' ? 'https://www.bba.edu.mz/' : `https://www.bba.edu.mz/${file}`;
  const inSitemap = sitemapUrls.includes(pageCanonicalUrl) || (file === 'index.html' && sitemapUrls.includes('https://bba.edu.mz/index.html'));
  if (!inSitemap) {
    missingSitemapPages.push({ file, expected: pageCanonicalUrl });
  }

  // Meta Title
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  // Meta Description
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    content.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const desc = descMatch ? descMatch[1].trim() : null;

  // Canonical link
  const canonMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                     content.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const canonical = canonMatch ? canonMatch[1].trim() : null;

  // OG tags
  const ogTitle = /<meta[^>]*property=["']og:title["']/i.test(content);
  const ogDesc = /<meta[^>]*property=["']og:description["']/i.test(content);
  const ogImage = content.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
  const ogUrl = content.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i);

  // Favicon
  const favicon = /<link[^>]*rel=["'](shortcut )?icon["']/i.test(content);

  // H1
  const h1s = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

  // Lang
  const langMatch = content.match(/<html[^>]*lang=["']([^"']*)["']/i);
  const lang = langMatch ? langMatch[1] : null;

  // Schema.org
  const hasSchema = /<script[^>]*type=["']application\/ld\+json["']/i.test(content);

  seoReport.push({
    file,
    title,
    titleLen: title ? title.length : 0,
    descLen: desc ? desc.length : 0,
    desc,
    canonical,
    ogTitle,
    ogDesc,
    ogImage: ogImage ? ogImage[1] : null,
    ogUrl: ogUrl ? ogUrl[1] : null,
    favicon,
    h1Count: h1s.length,
    h1s,
    lang,
    hasSchema,
    inSitemap
  });

  // Check <a> links
  const linkMatches = [...content.matchAll(/<a[^>]*href=["']([^"']*)["']/gi)];
  linkMatches.forEach(m => {
    let href = m[1].trim();
    if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) return;
    if (href.startsWith('http://') || href.startsWith('https://')) {
      try {
        const u = new URL(href);
        allExternalDomains.add(u.origin);
      } catch (e) {}
      return;
    }
    // internal link
    const cleanHref = href.split('#')[0].split('?')[0];
    if (cleanHref) {
      const targetPath = path.join(siteDir, cleanHref);
      if (!fs.existsSync(targetPath)) {
        deadLinks.push({ file, href, targetPath });
      }
    }
  });

  // Check <img> tags
  const imgMatches = [...content.matchAll(/<img[^>]*src=["']([^"']*)["']([^>]*)>/gi)];
  imgMatches.forEach(m => {
    const src = m[1].trim();
    const rest = m[2];
    const hasAlt = /alt=["'][^"']*["']/i.test(rest) || /alt=["'][^"']*["']/i.test(m[0]);
    if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) {
      return;
    }
    const cleanSrc = src.split('#')[0].split('?')[0];
    if (cleanSrc) {
      const targetPath = path.join(siteDir, cleanSrc);
      if (!fs.existsSync(targetPath)) {
        missingImages.push({ file, src });
      }
    }
  });

  // External scripts / stylesheets / iframes
  const scriptSrcs = [...content.matchAll(/<script[^>]*src=["']([^"']*)["']/gi)];
  scriptSrcs.forEach(m => {
    if (m[1].startsWith('http')) {
      try { allExternalDomains.add(new URL(m[1]).origin); } catch (e) {}
    }
  });
  const linkHrefs = [...content.matchAll(/<link[^>]*href=["']([^"']*)["']/gi)];
  linkHrefs.forEach(m => {
    if (m[1].startsWith('http')) {
      try { allExternalDomains.add(new URL(m[1]).origin); } catch (e) {}
    }
  });
  const iframeSrcs = [...content.matchAll(/<iframe[^>]*src=["']([^"']*)["']/gi)];
  iframeSrcs.forEach(m => {
    if (m[1].startsWith('http')) {
      try { allExternalDomains.add(new URL(m[1]).origin); } catch (e) {}
    }
  });
});

console.log(JSON.stringify({
  seoReport,
  missingSitemapPages,
  deadLinks,
  missingImages,
  allExternalDomains: Array.from(allExternalDomains)
}, null, 2));
