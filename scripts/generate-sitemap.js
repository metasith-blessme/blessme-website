import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { PRODUCTS } from '../src/constants/products.js';
import { ARTICLES } from '../src/content/blog.js';

// Mirror of routing.buildPath without the trailing slash. urlFor adds the slash for
// canonicals. Redirect sources below must stay unsashed so both forms 301 once.
// Thai is the default at `/…`. English lives at `/en/…`.
const PAGE_TO_PATH = { 'Products': '/', 'Catalogue': '/products', 'Wholesale': '/wholesale', 'Customers': '/customers', 'About us': '/about', 'Blog': '/blog', 'FAQ': '/faq' };
function buildPath({ page, productId = null, articleId = null, lang = 'th' }) {
  const prefix = lang === 'en' ? '/en' : '';
  if (articleId) return `${prefix}/blog/${articleId}`;
  if (productId) return `${prefix}/products/${productId}`;
  const base = PAGE_TO_PATH[page] || '/';
  return base === '/' ? `${prefix}/` : `${prefix}${base}`;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const BASE_URL = 'https://blessmethailand.com';
const LANGS = ['th', 'en'];

// URL move date. Article publish dates stay in JSON-LD; every sitemap URL is new or re-homed today.
const LASTMOD = '2026-10-26';
const routes = [
  { page: 'Products', priority: '1.0', changefreq: 'weekly' },
  { page: 'Catalogue', priority: '0.9', changefreq: 'weekly' },
  { page: 'Wholesale', priority: '0.9', changefreq: 'weekly' },
  { page: 'Customers', priority: '0.8', changefreq: 'weekly' },
  { page: 'About us', priority: '0.8', changefreq: 'weekly' },
  { page: 'Blog', priority: '0.8', changefreq: 'weekly' },
  { page: 'FAQ', priority: '0.8', changefreq: 'weekly' },
  ...PRODUCTS.map((p) => ({ page: 'Products', productId: p.id, priority: '0.9', changefreq: 'monthly' })),
  ...ARTICLES.map((a) => ({ page: 'Blog', articleId: a.id, priority: '0.7', changefreq: 'monthly' })),
];

// Absolute URL for a route in a language, trailing-slash normalized to match how Cloudflare serves it.
function urlFor(route, lang) {
  let p = buildPath({ page: route.page, productId: route.productId, articleId: route.articleId, lang });
  if (p !== '/' && !p.endsWith('/')) p += '/';
  return BASE_URL + p;
}

function generateSitemap() {
  const entries = [];
  for (const route of routes) {
    const alternates = [
      `<xhtml:link rel="alternate" hreflang="th" href="${urlFor(route, 'th')}"/>`,
      `<xhtml:link rel="alternate" hreflang="en" href="${urlFor(route, 'en')}"/>`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(route, 'th')}"/>`,
    ].join('');
    for (const lang of LANGS) {
      entries.push(
        `<url><loc>${urlFor(route, lang)}</loc><lastmod>${LASTMOD}</lastmod><changefreq>${route.changefreq}</changefreq><priority>${route.priority}</priority>${alternates}</url>`
      );
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n  ${entries.join('\n  ')}\n</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`✅ sitemap.xml generated (${entries.length} URLs, TH at root + EN under /en/, x-default Thai, lastmod ${LASTMOD})`);
}

// Old /th/… → Thai root. Legacy English-only paths (removed SKU, merged posts) → /en/….
// Live former English URLs are NOT redirected: those paths now serve Thai.
// Every target is the final slashed URL, so nothing here chains into another 301.
const MERGED_POSTS = [
  ['popping-boba-wholesale-price-buy-bangkok', 'popping-boba-wholesale-price-thailand'],
  ['popping-boba-supplier-bangkok', 'best-popping-boba-wholesale-supplier-bangkok'],
  ['greek-yogurt-cafe-premium-popping-boba-revenue', 'popping-boba-greek-yogurt-healthy-pairing'],
];

function withSlash(p) {
  return p !== '/' && !p.endsWith('/') ? `${p}/` : p;
}

function generateRedirects() {
  const rules = [];
  const add = (from, to) => {
    const dest = withSlash(to);
    const existing = rules.find((rule) => rule.from === from);
    if (existing) {
      if (existing.to !== dest) throw new Error(`Redirect conflict: ${from} → ${existing.to} vs ${dest}`);
      return;
    }
    rules.push({ from, to: dest });
  };

  for (const [fromId, toId] of MERGED_POSTS) {
    add(`/blog/${fromId}`, `/en/blog/${toId}/`);
    add(`/blog/${fromId}/`, `/en/blog/${toId}/`);
    add(`/th/blog/${fromId}`, `/blog/${toId}/`);
    add(`/th/blog/${fromId}/`, `/blog/${toId}/`);
  }
  for (const route of routes) {
    const thai = urlFor(route, 'th').slice(BASE_URL.length);
    const oldBase = buildPath({ page: route.page, productId: route.productId, articleId: route.articleId, lang: 'th' });
    const legacy = oldBase === '/' ? '/th' : `/th${oldBase}`;
    add(legacy, thai);
    if (!legacy.endsWith('/')) add(`${legacy}/`, thai);
  }

  // Retired solutions page. Each source lands on /customers/ in one hop.
  const retiredSolutions = [
    ['/solutions', '/customers/'],
    ['/solutions/', '/customers/'],
    ['/en/solutions', '/en/customers/'],
    ['/en/solutions/', '/en/customers/'],
    ['/th/solutions', '/customers/'],
    ['/th/solutions/', '/customers/'],
  ];
  for (const [from, to] of retiredSolutions) add(from, to);

  // html_handling answers these aliases with a 307. Search treats that as temporary.
  const canonicalPaths = new Set(
    routes.flatMap((route) => LANGS.map((lang) => urlFor(route, lang).slice(BASE_URL.length)))
  );
  for (const target of canonicalPaths) {
    if (target === '/') {
      // /index.html is the file `/` serves. A _redirects rule from that file back
      // to `/` loops inside the asset server and the request never completes.
      // html_handling already 307s /index.html to `/`, and the worker promotes it.
      add('/index', '/');
      continue;
    }
    const bare = target.replace(/\/$/, '');
    add(bare, target);
    add(`${target}index.html`, target);
    add(`${target}index`, target);
    add(`${bare}.html`, target);
  }

  const sources = new Set(rules.map((rule) => rule.from));
  for (const rule of rules) {
    if (sources.has(rule.to)) throw new Error(`Redirect chain: ${rule.from} → ${rule.to}`);
    if (rule.from === rule.to) throw new Error(`Redirect loop: ${rule.from}`);
  }
  const unique = new Set(rules.map((rule) => rule.from));
  if (unique.size !== rules.length) throw new Error('Duplicate redirect sources');

  const body = [
    '# Generated by scripts/generate-sitemap.js. Do not hand-edit; the next build overwrites this file.',
    '# Thai is served at the root. These 301s send retired URLs straight to the final slashed URL.',
    ...rules.map((rule) => `${rule.from}  ${rule.to}  301`),
    '',
  ].join('\n');
  fs.writeFileSync(path.join(PUBLIC_DIR, '_redirects'), body, 'utf8');
  console.log(`✅ _redirects generated (${rules.length} permanent redirects, no chains)`);
}

generateSitemap();
generateRedirects();
