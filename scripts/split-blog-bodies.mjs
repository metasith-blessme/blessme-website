// split-blog-bodies.mjs
//
// Emits dist/blog-bodies/<id>.json for every article so the client runtime
// can lazy-load each article body on demand instead of statically importing
// the whole blog-bodies.json into the bundle. Prerender keeps using the
// single source file at src/content/blog-bodies.json for HTML rendering so
// SEO/crawler coverage and hydration are unchanged.
//
// Run from npm run build after vite build, before prerender.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src', 'content', 'blog-bodies.json');
const DIST = path.join(ROOT, 'dist', 'blog-bodies');

const bodies = JSON.parse(fs.readFileSync(SRC, 'utf8'));
fs.mkdirSync(DIST, { recursive: true });
let count = 0;
for (const id of Object.keys(bodies)) {
  const out = path.join(DIST, `${id}.json`);
  fs.writeFileSync(out, JSON.stringify(bodies[id]), 'utf8');
  count++;
}
console.log(`✅ split blog-bodies.json into ${count} files under dist/blog-bodies/`);
