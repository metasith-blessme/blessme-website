// Run after npm run build. No network, analytics traffic or real form submissions.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

const root = path.resolve(import.meta.dirname, '..');
const vite = await createServer({ root, optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const escape = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
try {
  const { PRODUCTS, productSearchName } = await vite.ssrLoadModule('/src/constants/products.js');
  const { ARTICLES } = await vite.ssrLoadModule('/src/content/blog.js');
  const { getInitialState } = await vite.ssrLoadModule('/src/lib/routing.js');
  const { getMeta, getSchemas, canonicalFor, updateMeta } = await vite.ssrLoadModule('/src/lib/seo.js');
  const { calculateUplift } = await vite.ssrLoadModule('/src/components/RoiCalculator.jsx');
  const urls = [...fs.readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.equal(urls.length, (6 + PRODUCTS.length + ARTICLES.length) * 2);
  assert.equal(new Set(urls).size, urls.length);
  let productPages = 0;
  for (const url of urls) {
    const pathname = new URL(url).pathname;
    const { page, productId, articleId, lang } = getInitialState(pathname);
    const html = fs.readFileSync(path.join(root, 'dist', pathname, 'index.html'), 'utf8');
    if (productId) {
      const product = PRODUCTS.find(p => p.id === productId);
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
      const headings = [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
      assert.deepEqual(headings.map(m => m[1]), [escape(productSearchName(product, lang))], `${pathname}: SKU-specific main H1`);
      assert(main.includes(escape(lang === 'th' ? product.noteTh : product.note)), `${pathname}: SKU description in main`);
      assert.match(main, new RegExp(`<a[^>]*href="${lang === 'th' ? '/th/' : '/'}"[^>]*>← ${lang === 'th' ? 'สินค้าทั้งหมด' : 'All products'}</a>`), `${pathname}: localized native back link`);
      const guidance = lang === 'th' ? [
        'ก่อนเปิด: เก็บที่อุณหภูมิห้องได้นาน 12 เดือนนับจากวันผลิต',
        'หลังเปิด: ปิดให้สนิทและแช่เย็นที่อุณหภูมิไม่เกิน 4°C เก็บได้นานสูงสุด 1 เดือน',
        'บรรจุในน้ำเชื่อมและมีน้ำตาล สามารถเทน้ำเชื่อมออกเพื่อลดความหวานได้ แต่ไม่ได้ทำให้ปราศจากน้ำตาล',
        'ไม่แนะนำสำหรับเด็กอายุต่ำกว่า 6 ปี เนื่องจากเสี่ยงต่อการสำลัก',
        'นำเข้าจากโรงงานพาร์ทเนอร์ที่ได้มาตรฐานอาหารระดับสากล',
      ] : [
        'Unopened: store at room temperature for 12 months from manufacture.',
        'After opening: keep tightly closed and refrigerated at 4°C or below for up to 1 month.',
        'Packed in syrup and contains sugar. You can drain the syrup for less sweetness, but this does not make the product sugar-free.',
        'Not recommended for children under 6 years due to choking risk.',
        'Imported from partner factories that meet international food standards',
      ];
      for (const text of guidance) assert(main.includes(escape(text)), `${pathname}: missing guidance: ${text}`);
      const containsGluten = ['barley', 'oat'].includes(productId);
      const allergenWarning = lang === 'th' ? 'มีกลูเตน' : 'Contains gluten.';
      assert.equal(main.includes(allergenWarning), containsGluten, `${pathname}: gluten warning only for owner-confirmed barley and oat`);
      if (!containsGluten) assert.doesNotMatch(main, /gluten|กลูเตน/i, `${pathname}: no invented allergen status`);
      assert.doesNotMatch(main, /gluten[- ]free|ปราศจากกลูเตน|ปลอดกลูเตน|allergen[- ]free|ปลอดสารก่อภูมิแพ้/i);
      assert.match(main, /data-contact-intent="quote"/);
      assert.doesNotMatch(html, /role="dialog"|aria-modal=|bm-modal-scrim|bm-mesh-drift/, `${pathname}: no dialog or home hero`);
      productPages++;
    }
    assert.doesNotMatch(html, /\bGMP\b|\bHACCP\b|within 7 days|ภายใน 7 วัน|no refrigeration or freezing at any stage|ไม่ต้องแช่เย็นหรือแช่แข็งในทุกขั้นตอน|follow the (?:individual product )?label.*(?:use-by|after opening)|หลังเปิดทำตามฉลาก/i, `${pathname}: no stale storage or explicit certification claims`);
    assert.doesNotMatch(html, /without adding sugar|โดยไม่เพิ่มน้ำตาล|without the guilt of heavy sugars|Naturally lower glycemic index|ดัชนีน้ำตาลต่ำกว่าน้ำตาลที่ผ่านการกลั่น/i, `${pathname}: no unsupported sugar claims`);
    if (page === 'FAQ' || page === 'Wholesale') {
      assert(html.includes(lang === 'th' ? '12 เดือนนับจากวันผลิต' : '12 months from manufacture'), `${pathname}: manufacture-based shelf life`);
      assert(html.includes(lang === 'th' ? 'ไม่เกิน 4°C' : '4°C or below'), `${pathname}: opened refrigeration limit`);
      assert(html.includes(lang === 'th' ? 'สูงสุด 1 เดือน' : 'up to 1 month'), `${pathname}: opened shelf life`);
    }
    const meta = getMeta(page, productId, articleId, lang);
    assert.equal(meta.canonical, url);
    assert(html.includes(`<title>${escape(meta.title).replace(/&#x27;/g, "'")}</title>`), pathname);
    assert(html.includes(`rel="canonical" href="${url}"`), pathname);
    assert(html.includes(`og:url" content="${url}"`), pathname);
    assert(html.includes('twitter:card" content="summary_large_image"'));
    assert.doesNotMatch(html, /80[–—-]115|115 THB|115 บาท|80 THB\/pack|80 บาท\/แพ็ค|@591dzhsr|Minimum wholesale order applies/);
    const schemas = JSON.parse(html.match(/<script type="application\/ld\+json" id="bm-schema">([\s\S]*?)<\/script>/)[1]);
    assert.deepEqual(schemas, getSchemas(page, productId, articleId, lang));
    if (page === 'FAQ') {
      const scopedWarning = lang === 'th' ? 'ข้าวบาร์เลย์และข้าวโอ๊ต: มีกลูเตน' : 'Barley and Oat: Contains gluten.';
      assert(html.includes(scopedWarning), `${pathname}: FAQ names the two confirmed SKUs`);
      const faq = schemas.find(schema => schema['@type'] === 'FAQPage');
      assert(faq.mainEntity.some(q => q.acceptedAnswer.text.includes(scopedWarning)), `${pathname}: FAQ schema preserves allergen scope`);
    }
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

  assert.equal(productPages, 12, 'All six SKUs in EN/TH must be standalone');
  const llms = fs.readFileSync(path.join(root, 'dist/llms.txt'), 'utf8');
  for (const warning of ['Barley and Oat: Contains gluten.', 'ข้าวบาร์เลย์และข้าวโอ๊ต: มีกลูเตน']) {
    assert(llms.includes(warning), 'llms.txt names the two confirmed SKUs');
  }
  assert.doesNotMatch(llms, /General warning from BlessMe|คำเตือนทั่วไปจาก BlessMe|gluten[- ]free|ปราศจากกลูเตน|ปลอดกลูเตน/i);

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
