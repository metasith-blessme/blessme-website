// Run after npm run build. No network, analytics traffic or real form submissions.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

const root = path.resolve(import.meta.dirname, '..');
const vite = await createServer({ root, optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const escape = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
try {
  const { PRODUCTS } = await vite.ssrLoadModule('/src/constants/products.js');
  const { ARTICLES } = await vite.ssrLoadModule('/src/content/blog.js');
  const { getInitialState } = await vite.ssrLoadModule('/src/lib/routing.js');
  const { getMeta, getSchemas, canonicalFor, updateMeta } = await vite.ssrLoadModule('/src/lib/seo.js');
  const { calculateUplift } = await vite.ssrLoadModule('/src/components/RoiCalculator.jsx');
  const urls = [...fs.readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.equal(urls.length, (6 + PRODUCTS.length + ARTICLES.length) * 2);
  assert.equal(new Set(urls).size, urls.length);
  for (const url of urls) {
    const pathname = new URL(url).pathname;
    const { page, productId, articleId, lang } = getInitialState(pathname);
    const html = fs.readFileSync(path.join(root, 'dist', pathname, 'index.html'), 'utf8');
    const meta = getMeta(page, productId, articleId, lang);
    assert.equal(meta.canonical, url);
    assert(html.includes(`<title>${escape(meta.title).replace(/&#x27;/g, "'")}</title>`), pathname);
    assert(html.includes(`rel="canonical" href="${url}"`), pathname);
    assert(html.includes(`og:url" content="${url}"`), pathname);
    assert(html.includes('twitter:card" content="summary_large_image"'));
    assert.doesNotMatch(html, /80[–—-]115|115 THB|115 บาท|80 THB\/pack|80 บาท\/แพ็ค|@591dzhsr|Minimum wholesale order applies/);
    const schemas = JSON.parse(html.match(/<script type="application\/ld\+json" id="bm-schema">([\s\S]*?)<\/script>/)[1]);
    assert.deepEqual(schemas, getSchemas(page, productId, articleId, lang));
    for (const alt of ['en', 'th', 'x-default']) assert(html.includes(`hreflang="${alt}" href="${canonicalFor(page, productId, articleId, alt === 'th' ? 'th' : 'en')}"`));
    for (const schema of schemas) {
      if (schema['@type'] === 'Product') {
        const product = PRODUCTS.find(p => p.id === productId);
        assert.equal(schema.offers.price, product.price);
        assert.equal(schema.offers.priceCurrency, 'THB');
        assert.equal(schema.offers.url, url);
        assert.equal(schema.url, url);
        assert(html.includes(`og:image" content="https://blessmethailand.com${product.imgFallback}"`));
        if (productId === 'osmanthus') assert.doesNotMatch(schema.name, /Popping Boba|ป๊อปปิ้งโบบา/);
      }
      if (schema['@type'] === 'BlogPosting') {
        assert.equal(schema.url, url);
        assert.equal(schema.mainEntityOfPage, url);
        assert(html.includes(encodeURIComponent(url)), 'Article email share preserves locale');
        assert(html.includes('og:type" content="article"'));
      }
      if (schema['@type'] === 'BreadcrumbList') {
        for (const item of schema.itemListElement) {
          assert.equal(new URL(item.item).pathname.startsWith('/th/'), lang === 'th');
          assert(item.item.endsWith('/'));
        }
      }
      if (schema['@type'] === 'FAQPage') for (const q of schema.mainEntity) assert(html.includes(escape(q.acceptedAnswer.text)), 'FAQ answer must be in HTML, not only schema');
    }
  }

  // Minimal head boundary: exercise updates across SPA product/article/lang/404 transitions.
  const nodes = new Map();
  globalThis.document = {
    title: '',
    querySelector: selector => nodes.get(selector) || null,
    querySelectorAll: () => [...nodes.entries()].filter(([key]) => key.startsWith('link[rel="alternate"]')).map(([,node]) => node),
    createElement: tag => ({ tag, attrs: {}, setAttribute(k, v) { this.attrs[k] = v; }, remove() { for (const [key, node] of nodes) if (node === this) nodes.delete(key); } }),
    head: { appendChild(node) {
      const a = node.attrs;
      const key = node.tag === 'meta' ? (a.property ? `meta[property="${a.property}"]` : `meta[name="${a.name}"]`) : `link[rel="${a.rel}"]${a.hreflang ? `[hreflang="${a.hreflang}"]` : ''}`;
      nodes.set(key, node);
    } },
  };
  updateMeta('Products', 'barley', null, 'th');
  assert.equal(nodes.get('meta[property="og:image"]').attrs.content, 'https://blessmethailand.com/assets/products/barley.png');
  updateMeta('Blog', null, ARTICLES[0].id, 'th');
  assert.equal(nodes.get('meta[property="og:type"]').attrs.content, 'article');
  assert.equal(nodes.get('link[rel="alternate"][hreflang="th"]').attrs.href, canonicalFor('Blog', null, ARTICLES[0].id, 'th'));
  updateMeta('Products', null, null, 'en');
  assert.equal(nodes.get('meta[property="og:image"]').attrs.content, 'https://blessmethailand.com/assets/og-image.png');
  assert.equal(nodes.get('meta[property="og:type"]').attrs.content, 'website');
  updateMeta('NotFound', null, null, 'th');
  assert.equal(nodes.get('meta[name="robots"]').attrs.content, 'noindex, follow');
  assert(!nodes.has('link[rel="canonical"]'));
  assert.equal([...nodes.keys()].filter(k => k.includes('hreflang')).length, 0);
  assert.deepEqual(getSchemas('NotFound'), []);
  updateMeta('Products');
  assert.match(nodes.get('meta[name="robots"]').attrs.content, /^index, follow/);

  for (const product of PRODUCTS) {
    const r = calculateUplift(product, 15, 50, 20);
    assert.equal(r.costPerServing, product.price / 20);
    assert.equal(r.packsNeeded, 75);
    assert.equal(r.monthlyProfit, 1500 * (20 - product.price / 20));
  }
  assert.equal(calculateUplift(PRODUCTS[0], 25, 50, 20).costPerServing, 7.5);
  assert.equal(calculateUplift(PRODUCTS[0], 15, 1, 0).monthlyProfit, -135);
  assert.throws(() => calculateUplift(PRODUCTS[0], 0, 50, 20), RangeError);
  console.log(`SEO foundation OK: ${urls.length} HTML pages, localized meta/schema/share, SPA head reset, FAQ HTML, approved prices and ROI math.`);
} finally {
  delete globalThis.document;
  await vite.close();
}
