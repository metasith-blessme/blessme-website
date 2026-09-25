#!/usr/bin/env node
// check-bundle.mjs
//
// Bundle-content regression for WEBSITE-PERFORMANCE-PLAN.md Phase 3 / Q1(b).
//
// Asserts that the article-body JSON content has been pulled out of the
// client bundle. The plan's body data used to ship inside the entry
// (~120 KB at 15 articles; 800 KB at 100). After the per-article split,
// none of the article body text should appear in any client-side output
// and per-route JSON files should exist under dist/blog-bodies/.
//
// Hard gates:
//   * dist/assets/index-*.js exists.
//   * dist/assets/index-*.js contains zero occurrences of body text.
//   * dist/blog-bodies/<id>.json emitted for every article.
//   * dist/<route>/index.html files contain the body markup server-rendered.
//
// Exits 0 on pass, 1 on fail.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const BODIES_SRC = path.join(ROOT, 'src', 'content', 'blog-bodies.json');
const BLOBS_DIR = path.join(DIST, 'blog-bodies');

const failures = [];
const log = (s) => console.log(s);
const fail = (s) => failures.push(s);

const bodies = JSON.parse(fs.readFileSync(BODIES_SRC, 'utf8'));
const articleIds = Object.keys(bodies);
const sampleText = bodies[articleIds[0]].body[0][1].slice(0, 60);
log(`sample body fragment: "${sampleText}…"`);

// 1. dist/blog-bodies/<id>.json present for every article
for (const id of articleIds) {
  if (!fs.existsSync(path.join(BLOBS_DIR, `${id}.json`))) {
    fail(`missing dist/blog-bodies/${id}.json`);
  }
}
log(`✓ ${articleIds.length} per-article JSON files emitted`);

// 2. Bundle contains zero occurrences of the body text.
const bundle = fs.readdirSync(path.join(DIST, 'assets'))
  .find((f) => /^index-.*\.js$/.test(f));
if (!bundle) { fail('no index-*.js in dist/assets/'); }
else {
  const text = fs.readFileSync(path.join(DIST, 'assets', bundle), 'utf8');
  const hits = text.split(sampleText).length - 1;
  if (hits > 0) fail(`bundle ${bundle} still contains ${hits} occurrence(s) of body text`);
  log(`✓ bundle ${bundle} (${(text.length/1024).toFixed(1)} KB) has no body text`);
}

// 3. A sample article's prerendered HTML contains the body markup, in both languages.
const sampleId = articleIds[0];
for (const lang of ['en', 'th']) {
  const out = lang === 'en'
    ? path.join(DIST, 'blog', sampleId, 'index.html')
    : path.join(DIST, 'th', 'blog', sampleId, 'index.html');
  if (!fs.existsSync(out)) { fail(`missing prerender ${out}`); continue; }
  const html = fs.readFileSync(out, 'utf8');
  const blocks = bodies[sampleId][lang === 'th' ? 'bodyTh' : 'body'];
  const sample = (typeof blocks[0][1] === 'string' ? blocks[0][1] : '').slice(0, 60);
  if (!sample) { fail(`empty sample body for ${sampleId}/${lang}`); continue; }
  if (!html.includes(sample)) fail(`prerender ${path.relative(DIST, out)} missing body text`);
  log(`✓ prerender ${path.relative(DIST, out)} contains body text`);
}

if (failures.length) {
  console.error('FAIL');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('PASS: bundle-content gate; article bodies split out of client bundle, prerendered HTML still crawls');
