/**
 * Build-time prerender: render every route to real static HTML so crawlers and
 * answer engines (ChatGPT, Perplexity, Gemini, Google AI) see full content and
 * per-route meta/OG/schema without executing JavaScript.
 *
 * Bilingual: each route is emitted in English (/…) and Thai (/th/…) with
 * hreflang alternates and language-correct canonicals. The client hydrates on top.
 *
 * Runs after `vite build`. Uses Vite's SSR module loader so the exact same React
 * app (and pure seo.js builders) produce the markup.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const BASE_URL = 'https://blessmethailand.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/og-image.png`;
const LANGS = ['en', 'th'];

const vite = await createServer({
  root: ROOT,
  logLevel: 'warn',
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  const { getMeta, getSchemas, canonicalFor } = await vite.ssrLoadModule('/src/lib/seo.js');
  const { buildPath } = await vite.ssrLoadModule('/src/lib/routing.js');
  const { PRODUCTS } = await vite.ssrLoadModule('/src/constants/products.js');
  const { ARTICLES } = await vite.ssrLoadModule('/src/content/blog.js');

  const abs = (url) => new URL(url, BASE_URL).href;

  // Language-neutral route list; each is emitted once per language below.
  const routes = [
    { page: 'Products' },
    { page: 'Solutions' },
    { page: 'About us' },
    { page: 'Blog' },
    { page: 'FAQ' },
    ...PRODUCTS.map((p) => ({ page: 'Products', productId: p.id, ogImage: abs(p.imgFallback) })),
    ...ARTICLES.map((a) => ({ page: 'Blog', articleId: a.id, ogImage: a.img ? abs(a.img) : undefined })),
  ];

  const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

  const esc = (s) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // Replace an existing tag if present, otherwise inject before </head>.
  const upsert = (html, matcher, tag) =>
    matcher.test(html) ? html.replace(matcher, tag) : html.replace('</head>', `${tag}\n</head>`);

  function applyHead(html, route, lang) {
    const { productId = null, articleId = null, page } = route;
    const m = getMeta(page, productId, articleId, lang);
    const schemas = getSchemas(page, productId, articleId, lang);
    const schemaJson = schemas.length === 1 ? JSON.stringify(schemas[0]) : JSON.stringify(schemas);
    const ogImage = route.ogImage || DEFAULT_OG_IMAGE;
    const ogType = articleId ? 'article' : 'website';
    const canonical = m.canonical;
    const enUrl = canonicalFor(page, productId, articleId, 'en');
    const thUrl = canonicalFor(page, productId, articleId, 'th');

    let out = html;
    out = out.replace('<html lang="en">', `<html lang="${lang}">`);
    out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`);
    out = upsert(out, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(m.description)}" />`);
    out = upsert(out, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${esc(canonical)}" />`);
    // hreflang alternates (inject once, before </head>)
    const hreflang = [
      `<link rel="alternate" hreflang="en" href="${esc(enUrl)}" />`,
      `<link rel="alternate" hreflang="th" href="${esc(thUrl)}" />`,
      `<link rel="alternate" hreflang="x-default" href="${esc(enUrl)}" />`,
    ].join('\n');
    out = out.replace('</head>', `${hreflang}\n</head>`);
    out = upsert(out, /<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${ogType}" />`);
    out = upsert(out, /<meta property="og:site_name"[^>]*>/, `<meta property="og:site_name" content="BlessMe Thailand" />`);
    out = upsert(out, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(m.title)}" />`);
    out = upsert(out, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(m.description)}" />`);
    out = upsert(out, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${esc(canonical)}" />`);
    out = upsert(out, /<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${esc(ogImage)}" />`);
    out = upsert(out, /<meta property="og:locale"[^>]*>/, `<meta property="og:locale" content="${lang === 'th' ? 'th_TH' : 'en_US'}" />`);
    out = upsert(out, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(m.title)}" />`);
    out = upsert(out, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(m.description)}" />`);
    out = upsert(out, /<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${esc(ogImage)}" />`);
    out = out.replace(
      /(<script type="application\/ld\+json" id="bm-schema">)[\s\S]*?(<\/script>)/,
      `$1\n${schemaJson}\n$2`
    );
    return out;
  }

  let count = 0;
  for (const route of routes) {
    for (const lang of LANGS) {
      const urlPath = buildPath({ page: route.page, productId: route.productId, articleId: route.articleId, lang });
      const appHtml = renderToString(React.createElement(App, { ssrPath: urlPath }));
      let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
      html = applyHead(html, route, lang);

      const outPath = path.join(DIST, urlPath, 'index.html');
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html, 'utf8');
      count++;
    }
  }

  console.log(`✅ Prerendered ${count} pages (${routes.length} routes × ${LANGS.length} languages) to dist/`);
} finally {
  await vite.close();
}
