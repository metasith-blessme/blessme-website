/**
 * Build-time prerender: render every route to real static HTML so crawlers and
 * answer engines (ChatGPT, Perplexity, Gemini, Google AI) see full content and
 * per-route meta/OG/schema without executing JavaScript.
 *
 * Runs after `vite build`. Uses Vite's SSR module loader so the exact same React
 * app (and pure seo.js builders) produce the markup. The client then hydrates.
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

const vite = await createServer({
  root: ROOT,
  logLevel: 'warn',
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  const { getMeta, getSchemas } = await vite.ssrLoadModule('/src/lib/seo.js');
  const { PRODUCTS } = await vite.ssrLoadModule('/src/constants/products.js');
  const { ARTICLES } = await vite.ssrLoadModule('/src/content/blog.js');

  const abs = (url) => new URL(url, BASE_URL).href;

  // EN is the canonical, indexable language (P2 will add /th/*). Prerender EN for every route.
  const routes = [
    { path: '/', page: 'Products' },
    { path: '/solutions', page: 'Solutions' },
    { path: '/about', page: 'About us' },
    { path: '/blog', page: 'Blog' },
    { path: '/faq', page: 'FAQ' },
    ...PRODUCTS.map((p) => ({
      path: `/products/${p.id}`,
      page: 'Products',
      productId: p.id,
      ogImage: abs(p.imgFallback),
    })),
    ...ARTICLES.map((a) => ({
      path: `/blog/${a.id}`,
      page: 'Blog',
      articleId: a.id,
      ogImage: a.img ? abs(a.img) : undefined,
    })),
  ];

  const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

  const esc = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  // Replace an existing tag if present, otherwise inject before </head>.
  const upsert = (html, matcher, tag) =>
    matcher.test(html) ? html.replace(matcher, tag) : html.replace('</head>', `${tag}\n</head>`);

  function applyHead(html, route) {
    const lang = 'en';
    const m = getMeta(route.page, route.productId ?? null, route.articleId ?? null, lang);
    const schemas = getSchemas(route.page, route.productId ?? null, route.articleId ?? null, lang);
    const schemaJson = schemas.length === 1 ? JSON.stringify(schemas[0]) : JSON.stringify(schemas);
    const ogImage = route.ogImage || DEFAULT_OG_IMAGE;
    const ogType = route.articleId ? 'article' : 'website';

    let out = html;
    out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`);
    out = upsert(out, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(m.description)}" />`);
    out = upsert(out, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${esc(m.canonical)}" />`);
    out = upsert(out, /<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${ogType}" />`);
    out = upsert(out, /<meta property="og:site_name"[^>]*>/, `<meta property="og:site_name" content="BlessMe Thailand" />`);
    out = upsert(out, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(m.title)}" />`);
    out = upsert(out, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(m.description)}" />`);
    out = upsert(out, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${esc(m.canonical)}" />`);
    out = upsert(out, /<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${esc(ogImage)}" />`);
    out = upsert(out, /<meta property="og:locale"[^>]*>/, `<meta property="og:locale" content="en_US" />`);
    out = upsert(out, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(m.title)}" />`);
    out = upsert(out, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(m.description)}" />`);
    out = upsert(out, /<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${esc(ogImage)}" />`);
    out = out.replace(
      /(<script type="application\/ld\+json" id="bm-schema">)[\s\S]*?(<\/script>)/,
      `$1\n${schemaJson}\n$2`
    );
    return out;
  }

  for (const route of routes) {
    const appHtml = renderToString(React.createElement(App, { ssrPath: route.path }));
    let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    html = applyHead(html, route);

    const outPath =
      route.path === '/'
        ? path.join(DIST, 'index.html')
        : path.join(DIST, route.path.replace(/^\//, ''), 'index.html');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf8');
  }

  console.log(`✅ Prerendered ${routes.length} routes to dist/`);
} finally {
  await vite.close();
}
