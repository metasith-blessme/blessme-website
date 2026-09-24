import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ARTICLES, getArticleMeta, getArticleBlocks } from '../src/content/blog.js';

const bodies = JSON.parse(readFileSync(new URL('../src/content/blog-bodies.json', import.meta.url)));
assert.equal(ARTICLES.length, 15);
assert.deepEqual(Object.keys(bodies).sort(), ARTICLES.map(a => a.id).sort());
const unsupported = /vitamin C|สารต้านอนุมูลอิสระ|beta-glucan|not preservatives|ไม่ใช่สารกันเสีย|QC-tested|QC ทุก batch|QC ทุก|QC อย่าง|Halal.certified|Halal certification|รับรองฮาลาล|ใบรับรองฮาลาล|#1 Bestseller|ขายดีอันดับ 1|9\.5\/10|30–40%|30-40%/i;
for (const article of ARTICLES) {
  for (const lang of ['en', 'th']) {
    const blocks = getArticleBlocks({ ...article, ...bodies[article.id] }, lang);
    assert.ok(blocks.length > 0, `${article.id}/${lang}: empty body`);
    const meta = getArticleMeta(article, lang, 'https://blessmethailand.com');
    assert.ok(meta.canonical.endsWith(`/blog/${article.id}/`));
    assert.doesNotMatch(JSON.stringify([meta, blocks]), unsupported, `${article.id}/${lang}: unsupported claim`);
  }
}
const portions = bodies['popping-boba-wholesale-profit-margins'];
assert.match(JSON.stringify(portions.body), /25g drained gives 12 servings/);
assert.match(JSON.stringify(portions.bodyTh), /25g จะได้ 12 เสิร์ฟ/);
console.log('Blog facts: 15 articles × 2 languages; claim and portion checks passed.');
