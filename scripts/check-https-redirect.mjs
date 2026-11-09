import assert from 'node:assert/strict';
import { canonicalRedirect, visitorScheme } from '../worker.js';

const httpHome = new Request('http://blessmethailand.com/products/oat?utm=x');
assert.equal(visitorScheme(httpHome), 'http');
assert.equal(
  visitorScheme(new Request('https://blessmethailand.com/', { headers: { 'CF-Visitor': '{"scheme":"http"}' } })),
  'http',
);
assert.equal(
  visitorScheme(new Request('https://blessmethailand.com/', { headers: { 'CF-Visitor': 'not-json' } })),
  'https',
);

assert.deepEqual(
  canonicalRedirect({
    requestUrl: 'https://blessmethailand.com/products/oat?utm=x',
    scheme: 'http',
    assetStatus: 301,
    assetLocation: '/products/oat/?utm=x',
  }),
  { status: 301, location: 'https://blessmethailand.com/products/oat/?utm=x' },
);

assert.deepEqual(
  canonicalRedirect({
    requestUrl: 'http://www.blessmethailand.com/',
    scheme: 'http',
    assetStatus: 200,
    assetLocation: null,
  }),
  { status: 301, location: 'https://blessmethailand.com/' },
);

assert.equal(
  canonicalRedirect({
    requestUrl: 'http://127.0.0.1:8787/products/oat',
    scheme: 'http',
    assetStatus: 301,
    assetLocation: '/products/oat/',
  }),
  null,
);

assert.equal(
  canonicalRedirect({
    requestUrl: 'https://blessmethailand.com/products/oat',
    scheme: 'https',
    assetStatus: 307,
    assetLocation: '/products/oat/',
  }),
  null,
);

assert.equal(
  canonicalRedirect({
    requestUrl: 'https://blessmethailand.com/google0a8e80513ae99f42.html',
    scheme: 'https',
    assetStatus: 307,
    assetLocation: '/google0a8e80513ae99f42',
  }),
  null,
);

assert.deepEqual(
  canonicalRedirect({
    requestUrl: 'https://blessmethailand.com/index.html?utm=x',
    scheme: 'http',
    assetStatus: 307,
    assetLocation: '/?utm=x',
  }),
  { status: 301, location: 'https://blessmethailand.com/?utm=x' },
);

assert.equal(
  canonicalRedirect({
    requestUrl: 'https://blessmethailand.com/products/oat/',
    scheme: 'https',
    assetStatus: 200,
    assetLocation: null,
  }),
  null,
);

assert.equal(
  canonicalRedirect({
    requestUrl: 'https://blessme-website.workers.dev/',
    scheme: 'http',
    assetStatus: 200,
    assetLocation: null,
  }),
  null,
);

console.log('https redirect OK');
