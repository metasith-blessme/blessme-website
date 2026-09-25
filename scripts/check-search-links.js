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
const main = (text) => text.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
const anchors = (text) => [...text.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(([, href, body]) => ({
  href: href.replace(/\/$/, ''),
  text: body.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&'),
}));
const names = {
  barley: ['Barley Popping Boba', 'มุกป๊อปข้าวบาร์เลย์'],
  oat: ['Oat Popping Boba', 'มุกป๊อปข้าวโอ๊ต'],
  redbean: ['Red Bean Popping Boba', 'มุกป๊อปถั่วแดง'],
  chestnut: ['Water Chestnut Popping Boba', 'มุกป๊อปแห้ว'],
  cheese: ['Moji Yogurt', 'โมจิโยเกิร์ต'],
  osmanthus: ['Osmanthus Konjac', 'บุกหอมหมื่นลี้'],
};
// Curated from the bilingual article bodies, not incidental names in price/warning boilerplate.
const productArticles = {
  barley: 'barley-popping-boba-thailand',
  oat: 'popping-boba-yogurt-smoothie-pairing',
  redbean: 'popping-boba-yogurt-smoothie-pairing',
  osmanthus: 'popping-boba-yogurt-smoothie-pairing',
  chestnut: 'popping-boba-cafe-menu-ideas',
  cheese: 'moji-yogurt-trend-asia',
};
const section = (text, id) => text.match(new RegExp(`<section[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/section>`))?.[1] || '';
for (const p of PRODUCTS) {
  assert.deepEqual(p.articleIds, [productArticles[p.id]], `${p.id}: curated article metadata`);
  assert(p.articleIds.every(id => ARTICLES.some(a => a.id === id)), `${p.id}: unknown article`);
}
const comparisonErrors = [];
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
    const card = anchors(main(html(`${prefix}/wholesale`))).find(a => a.href === url);
    const name = names[p.id][prefix ? 1 : 0];
    const article = ARTICLES.find(a => a.id === productArticles[p.id]);
    assert.deepEqual(anchors(section(main(html(url)), 'related-articles')), [{
      href: `${prefix}/blog/${article.id}`, text: prefix ? article.titleTh : article.title,
    }], `${url}: localized curated article link`);
    const faq = section(main(html(url)), 'product-faq');
    if (p.id === 'osmanthus') {
      assert(faq.includes(prefix ? 'บุกหอมหมื่นลี้เป็นท็อปปิ้งบุก ไม่ใช่มุกป๊อป' : 'Osmanthus Konjac is a konjac topping, not popping boba.'), `${url}: category clarification`);
    } else assert.equal(faq, '', `${url}: no repetitive SKU FAQ`);
    const price = `${p.price} ${prefix ? 'บาท / แพ็ค' : 'THB / pack'}`;
    if (!card?.text.includes(name)) comparisonErrors.push(`Wholesale card missing ${name}: ${url}`);
    if (!card?.text.includes(price)) comparisonErrors.push(`Wholesale card missing ${price}: ${url}`);
    const label = prefix ? 'เปรียบเทียบสินค้าและราคาขายส่ง' : 'Compare products & wholesale pricing';
    if (!anchors(main(html(url))).some(a => a.href === `${prefix}/wholesale` && a.text === label)) {
      comparisonErrors.push(`Product main missing localized wholesale comparison link: ${url}`);
    }
  }
  for (const a of ARTICLES) {
    const url = `${prefix}/blog/${a.id}`;
    assert(blog.includes(url), `Blog missing article link: ${url}`);
    assert(hrefs(html(url)).includes(`${prefix}/blog`), `Missing back link: ${url}`);
    const expected = PRODUCTS.filter(p => productArticles[p.id] === a.id).map(p => ({
      href: `${prefix}/products/${p.id}`, text: names[p.id][prefix ? 1 : 0],
    }));
    const related = section(main(html(url)), 'related-products');
    assert.deepEqual(anchors(related), expected, `${url}: exact reciprocal SKU links`);
    if (!expected.length) assert.equal(related, '', `${url}: no empty related section`);
  }
}
assert.deepEqual(comparisonErrors, [], 'Localized SKU comparison content must be present');
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
