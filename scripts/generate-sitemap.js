import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { PRODUCTS } from '../src/constants/products.js';
import { ARTICLES } from '../src/content/blog.js';

// Mirror of routing.buildPath (inlined so this script runs under plain Node without
// Vite's extensionless-import resolution). Keep in sync with src/lib/routing.js.
// Thai is the default at `/…`. English lives at `/en/…`.
const PAGE_TO_PATH = { 'Products': '/', 'Catalogue': '/products', 'Wholesale': '/wholesale', 'Solutions': '/solutions', 'About us': '/about', 'Blog': '/blog', 'FAQ': '/faq' };
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
  { page: 'Solutions', priority: '0.8', changefreq: 'weekly' },
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
  const add = (from, to) => rules.push({ from, to: withSlash(to) });

  for (const [fromId, toId] of MERGED_POSTS) {
    add(`/blog/${fromId}`, `/en/blog/${toId}/`);
    add(`/blog/${fromId}/`, `/en/blog/${toId}/`);
    add(`/th/blog/${fromId}`, `/blog/${toId}/`);
    add(`/th/blog/${fromId}/`, `/blog/${toId}/`);
  }
  // Discontinued water chestnut SKU → the popping-boba category page, in the same language.
  add('/products/chestnut', '/en/products/');
  add('/products/chestnut/', '/en/products/');
  add('/th/products/chestnut', '/products/');
  add('/th/products/chestnut/', '/products/');

  for (const route of routes) {
    const thai = urlFor(route, 'th').slice(BASE_URL.length);
    const oldBase = buildPath({ page: route.page, productId: route.productId, articleId: route.articleId, lang: 'th' });
    const legacy = oldBase === '/' ? '/th' : `/th${oldBase}`;
    add(legacy, thai);
    if (!legacy.endsWith('/')) add(`${legacy}/`, thai);
  }

  const sources = new Set(rules.map((rule) => rule.from));
  for (const rule of rules) {
    if (sources.has(rule.to) || sources.has(rule.to.replace(/\/$/, '') || '/')) {
      throw new Error(`Redirect chain: ${rule.from} → ${rule.to}`);
    }
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
