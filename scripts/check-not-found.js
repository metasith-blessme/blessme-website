// Build first; start `npx wrangler dev --local --port 8787`, then run this check.
// Optional origin: node scripts/check-not-found.js http://127.0.0.1:8787
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = path.resolve(import.meta.dirname, '..');
const origin = process.argv[2] || 'http://127.0.0.1:8787';
const missing = ['', '/th'].flatMap(prefix => [
  `${prefix}/not-a-real-page`, `${prefix}/products/not-a-real-product`,
  `${prefix}/blog/not-a-real-article`, `${prefix}/assets/not-a-real-file.js`,
  `${prefix}/not-a-real-page/`, `${prefix}/products/not-a-real-product/`,
  `${prefix}/blog/not-a-real-article/`,
]);
const vite = await createServer({ root, optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const { getInitialState } = await vite.ssrLoadModule('/src/lib/routing.js');
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  for (const url of missing) {
    assert.deepEqual(getInitialState(url), {
      page: 'NotFound', productId: null, articleId: null, lang: url.startsWith('/th/') ? 'th' : 'en',
    }, url);
    assert.match(renderToString(React.createElement(App, { ssrPath: url })), /<h1[^>]*>404/);
  }
} finally {
  await vite.close();
}
const sitemap = fs.readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
assert(routes.length > 0 && routes.some(p => p.startsWith('/th/')));
for (const url of routes) {
  const response = await fetch(new URL(url, origin), { redirect: 'manual' });
  assert.equal(response.status, 200, url);
  assert.match(await response.text(), /<div id="root"><div/);
  if (url !== '/' && url.endsWith('/')) {
    const redirect = await fetch(new URL(url.slice(0, -1), origin), { redirect: 'manual' });
    assert.equal(redirect.status, 307, url);
    assert.equal(new URL(redirect.headers.get('location'), origin).pathname, url);
  }
}
for (const url of missing) {
  for (const method of ['GET', 'HEAD']) {
    for (const headers of [{}, { 'Sec-Fetch-Mode': 'navigate' }]) {
      const response = await fetch(new URL(url, origin), { method, redirect: 'manual', headers });
      assert.equal(response.status, 404, `${method} ${url}`);
      if (method === 'GET') {
        const html = await response.text();
        assert.match(html, /404/);
        assert.match(html, /ไม่พบหน้า/);
        assert.match(html, /name="robots" content="noindex/);
        assert.doesNotMatch(html, /<script|rel="canonical"|application\/ld\+json/);
      }
    }
  }
}
const asset = fs.readdirSync(path.join(root, 'dist/assets')).find(name => name.endsWith('.js'));
assert(asset, 'Built JavaScript asset exists');
assert.equal((await fetch(new URL(`/assets/${asset}`, origin))).status, 200);
console.log(`404 checks OK: ${routes.length} EN/TH routes return 200 (slash redirects checked); ${missing.length} missing paths return 404 for GET + HEAD, with/without navigation headers; existing JS returns 200; routing and SSR show NotFound.`);
