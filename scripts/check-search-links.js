// Run after npm run build: node scripts/check-search-links.js
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';
import { PRODUCTS } from '../src/constants/products.js';
import { ARTICLES } from '../src/content/blog.js';

const root = path.resolve(import.meta.dirname, '..');
const html = (route) => fs.readFileSync(path.join(root, 'dist', route, 'index.html'), 'utf8');
const hrefs = (text) => [...text.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map(m => m[1].replace(/\/$/, '') || '/');
const sitemap = fs.readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.equal(urls.length, new Set(urls).size, 'Sitemap URLs must be unique');
for (const prefix of ['', '/th']) {
  const home = hrefs(html(`${prefix}/`));
  const wholesale = hrefs(html(`${prefix}/wholesale`));
  const blog = hrefs(html(`${prefix}/blog`));
  assert(urls.includes(`https://blessmethailand.com${prefix}/wholesale/`));
  for (const p of PRODUCTS) {
    const url = `${prefix}/products/${p.id}`;
    assert(home.includes(url), `Home missing product link: ${url}`);
    assert(wholesale.includes(url), `Wholesale missing product link: ${url}`);
  }
  for (const a of ARTICLES) {
    const url = `${prefix}/blog/${a.id}`;
    assert(blog.includes(url), `Blog missing article link: ${url}`);
    assert(hrefs(html(url)).includes(`${prefix}/blog`), `Missing back link: ${url}`);
  }
}
const vite = await createServer({ root, optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const { handleLinkClick } = await vite.ssrLoadModule('/src/lib/routing.js');
  for (const overrides of [{}, { metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { defaultPrevented: true }]) {
    let prevented = false, navigated = false;
    const e = { button: 0, preventDefault() { prevented = true; }, ...overrides };
    handleLinkClick(e, () => { navigated = true; });
    const plain = Object.keys(overrides).length === 0;
    assert.equal(prevented, plain);
    assert.equal(navigated, plain);
  }
} finally {
  await vite.close();
}
console.log(`Search links OK: ${PRODUCTS.length} products and ${ARTICLES.length} articles in both languages; sitemap unique; modified clicks preserved.`);
