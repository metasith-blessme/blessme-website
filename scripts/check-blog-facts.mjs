import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { ARTICLES, getArticleMeta } from '../src/content/blog.js';

const bodies = JSON.parse(readFileSync(new URL('../src/content/blog-bodies.json', import.meta.url)));
assert.equal(ARTICLES.length, 18);
assert.equal(new Set(ARTICLES.map(a => a.id)).size, 18);
assert.deepEqual(Object.keys(bodies).sort(), ARTICLES.map(a => a.id).sort());
const glutenGuide = ARTICLES.find(article => article.id === 'is-popping-boba-gluten-free');
assert.match(glutenGuide.imgAlt, /มีกลูเตน/);
assert.doesNotMatch(glutenGuide.imgAlt, /ไร้กลูเตน|ปลอดกลูเตน|gluten.free/i);
assert.match(bodies[glutenGuide.id].body[0][1], /Barley and Oat.*containing gluten/);
assert.match(bodies[glutenGuide.id].bodyTh[0][1], /บาร์เลย์และโอ๊ต.*มีกลูเตน/);
const unsupported = /vitamin C|สารต้านอนุมูลอิสระ|beta-glucan|not preservatives|ไม่ใช่สารกันเสีย|QC-tested|QC ทุก|QC อย่าง|Halal.certified|Halal certification|รับรองฮาลาล|ใบรับรองฮาลาล|best.?sell|ขายดี|9\.5\/10|30[–-]40%|no artificial fruit coloring|ไม่มีสีผสมอาหารเทียม|health.positioning|health.aligned|health halo|healthy match|health benefits|health-conscious|healthiest|functional nutrition|ดีต่อสุขภาพ|สายเฮลตี้|สายสุขภาพ|เพื่อสุขภาพ|อิ่มนาน|อิ่มท้องนาน|ชีส|\bcheese\b|consistent inventory|never caught out of stock|exclusive flavors|exclusive range|unavailable (?:in|from)|30%|2[–-]4x|2-4 เท่า|20 billion|2 หมื่นล้าน|no oxidation risk|ไม่มีความเสี่ยงจากออกซิเดชัน/i;
const escapeHtml = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
let variants = 0;
for (const article of ARTICLES) {
  for (const image of [article.img, article.imgSmall, article.img?.endsWith('.jpg') ? article.img.replace(/\.jpg$/, '.webp') : null]) {
    if (image?.startsWith('/assets/')) assert.ok(existsSync(new URL(`../dist${image}`, import.meta.url)), `${article.id}: missing image ${image}`);
  }
  assert.doesNotMatch(JSON.stringify(article), unsupported, `${article.id}: metadata claim`);
  for (const lang of ['en', 'th']) {
    const label = `${article.id}/${lang}`;
    const blocks = bodies[article.id][lang === 'th' ? 'bodyTh' : 'body'];
    assert.ok(blocks?.length > 0, `${label}: empty body`);
    const canonical = `https://blessmethailand.com/${lang === 'th' ? 'th/' : ''}blog/${article.id}/`;
    assert.equal(getArticleMeta(article, lang, 'https://blessmethailand.com').canonical, canonical);
    assert.doesNotMatch(JSON.stringify(blocks), unsupported, `${label}: unsupported claim`);
    // JSON alone is not readable article markup: assert both SSR and hydration data.
    const html = readFileSync(new URL(`../dist/${lang === 'th' ? 'th/' : ''}blog/${article.id}/index.html`, import.meta.url), 'utf8');
    assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1], canonical, `${label}: prerender canonical`);
    assert.ok(html.includes(`<html lang="${lang}">`), `${label}: document language`);
    const bodyHtml = html.match(/<div class="bm-article-body"[^>]*>([\s\S]*?)<\/div>/)?.[1];
    assert.ok(bodyHtml, `${label}: missing readable prerender body`);
    for (const [tag, content] of blocks) {
      const texts = tag === 'ul' ? content : tag === 'image' ? [content.alt, content.caption].filter(Boolean) : [content];
      for (const text of texts) assert.ok(bodyHtml.includes(escapeHtml(text)), `${label}: missing rendered block: ${text}`);
    }
    const bodyScript = html.match(/<script type="application\/json" id="bm-article-body-data">([\s\S]*?)<\/script>/)?.[1];
    assert.ok(bodyScript, `${label}: missing article body script tag`);
    const bodyData = JSON.parse(bodyScript);
    assert.equal(bodyData.articleId, article.id, `${label}: script tag articleId mismatch`);
    const renderedBlocks = (lang === 'th' && bodyData.bodyTh) ? bodyData.bodyTh : bodyData.body;
    assert.deepEqual(renderedBlocks, blocks, `${label}: prerender body content does not match source`);
    const title = lang === 'th' ? article.titleTh : article.title;
    assert.equal(html.match(/<h1\b[^>]*class="bm-article-title"[^>]*>([\s\S]*?)<\/h1>/)?.[1], escapeHtml(title), `${label}: localized title`);
    const schemas = JSON.parse(html.match(/<script type="application\/ld\+json" id="bm-schema">([\s\S]*?)<\/script>/)[1]);
    const posting = (Array.isArray(schemas) ? schemas : [schemas]).find(s => s['@type'] === 'BlogPosting');
    assert.equal(posting.url, canonical, `${label}: schema URL`);
    assert.equal(posting.mainEntityOfPage, canonical, `${label}: schema canonical`);
    assert.equal(posting.headline, title, `${label}: schema title`);
    assert.equal(posting.inLanguage, lang, `${label}: schema language`);
    variants++;
  }
}
assert.equal(variants, 36);
const portions = bodies['popping-boba-wholesale-profit-margins'];
assert.match(JSON.stringify(portions.body), /25g drained gives 12 servings/);
assert.match(JSON.stringify(portions.bodyTh), /25g จะได้ 12 เสิร์ฟ/);
console.log('Blog facts: 18 unique articles × 2 languages; 36 actual prerenders, exact canonicals, schema, claims and portions passed.');
