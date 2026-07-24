import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { PRODUCTS } from '../src/constants/products.js';
import { ARTICLES } from '../src/content/blog.js';

// Mirror of routing.buildPath (inlined so this script runs under plain Node without
// Vite's extensionless-import resolution). Keep in sync with src/lib/routing.js.
const PAGE_TO_PATH = { 'Products': '/', 'Solutions': '/solutions', 'About us': '/about', 'Blog': '/blog', 'FAQ': '/faq' };
function buildPath({ page, productId = null, articleId = null, lang = 'en' }) {
  const prefix = lang === 'th' ? '/th' : '';
  if (articleId) return `${prefix}/blog/${articleId}`;
  if (productId) return `${prefix}/products/${productId}`;
  const base = PAGE_TO_PATH[page] || '/';
  return base === '/' ? `${prefix}/` : `${prefix}${base}`;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const BASE_URL = 'https://blessmethailand.com';
const LANGS = ['en', 'th'];

// Language-neutral routes; each emitted per language with hreflang alternates.
const routes = [
  { page: 'Products', priority: '1.0', changefreq: 'weekly' },
  { page: 'Solutions', priority: '0.8', changefreq: 'weekly' },
  { page: 'About us', priority: '0.8', changefreq: 'weekly' },
  { page: 'Blog', priority: '0.8', changefreq: 'weekly' },
  { page: 'FAQ', priority: '0.8', changefreq: 'weekly' },
  ...PRODUCTS.map((p) => ({ page: 'Products', productId: p.id, priority: '0.9', changefreq: 'monthly' })),
  ...ARTICLES.map((a) => ({
    page: 'Blog',
    articleId: a.id,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: a.updatedDate || a.publishedDate || a.isoDate,
  })),
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
      `<xhtml:link rel="alternate" hreflang="en" href="${urlFor(route, 'en')}"/>`,
      `<xhtml:link rel="alternate" hreflang="th" href="${urlFor(route, 'th')}"/>`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(route, 'en')}"/>`,
    ].join('');
    for (const lang of LANGS) {
      const lastmod = route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : '';
      entries.push(
        `<url><loc>${urlFor(route, lang)}</loc>${lastmod}<changefreq>${route.changefreq}</changefreq><priority>${route.priority}</priority>${alternates}</url>`
      );
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n  ${entries.join('\n  ')}\n</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`✅ sitemap.xml generated (${entries.length} URLs, EN + TH with hreflang)`);
}

generateSitemap();
