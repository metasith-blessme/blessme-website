import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

// Synthetic browser boundaries only: no network requests or real GA/Web3Forms traffic.
class Target {
  listeners = new Map();
  addEventListener(type, fn) { if (!this.listeners.has(type)) this.listeners.set(type, new Set()); this.listeners.get(type).add(fn); }
  removeEventListener(type, fn) { this.listeners.get(type)?.delete(fn); }
  emit(type, event = {}) { for (const fn of [...(this.listeners.get(type) || [])]) fn(event); }
}
const doc = new Target();
doc.documentElement = { lang: 'th' };
doc.visibilityState = 'visible';
globalThis.document = doc;
globalThis.window = new Target();
window.location = { pathname: '/th/wholesale', href: 'https://example.com/th/wholesale?email=private#secret' };
const events = [];
window.gtag = (...args) => events.push(args);
const analytics = await import('../src/lib/analytics.js');
assert.equal(typeof analytics.initContactTracking, 'function');
const stop = analytics.initContactTracking();
const click = (href, intent = null) => doc.emit('click', { target: { closest: () => ({ getAttribute: name => name === 'href' ? href : intent }) } });
click('https://line.me/R/ti/p/@blessmethailand?text=private');
click('mailto:Blessme.team@gmail.com?subject=private');
click('tel:+66828965199');
click('mailto:someone@example.com');
click('https://line.me.evil.test/R/ti/p/@blessmethailand');
click('tel:+668****5199');
assert.deepEqual(events.map(e => e[2].contact_method), ['line', 'email', 'phone']);
assert.ok(events.every(e => e[0] === 'event' && e[1] === 'contact_click'));
assert.deepEqual(events[0][2], { contact_method: 'line', contact_intent: 'contact', page_path: '/th/wholesale', language: 'th' });
click('mailto:Blessme.team@gmail.com?subject=private', 'sample');
click('https://line.me/R/ti/p/@blessmethailand?text=private', 'quote');
assert.equal(events[3][2].contact_intent, 'sample');
assert.equal(events[4][2].contact_intent, 'quote');
assert(events.every(e => !JSON.stringify(e[2]).includes('private')));
stop(); click('mailto:Blessme.team@gmail.com'); assert.equal(events.length, 5);
window.gtag = () => { throw Error('blocked analytics'); };
assert.doesNotThrow(() => analytics.trackLead('en'));
window.gtag = (...args) => events.push(args);
console.log('PASS contact allowlist, privacy, cleanup, blocked analytics');

const observers = [];
window.PerformanceObserver = class {
  constructor(callback) { this.callback = callback; observers.push(this); this.pending = []; }
  observe({ type }) { this.type = type; }
  disconnect() { this.disconnected = true; }
  takeRecords() { return this.pending.splice(0); }
  feed(entries) { this.callback({ getEntries: () => entries }); }
};
globalThis.PerformanceObserver = window.PerformanceObserver;
const { initWebVitals } = await import('../src/lib/web-vitals.js');
const stopVitals = initWebVitals();
const cls = observers.find(o => o.type === 'layout-shift');
cls.feed([{ value: 0.125, startTime: 100, hadRecentInput: false }, { value: 0.01, startTime: 2000, hadRecentInput: false }]);
observers.find(o => o.type === 'largest-contentful-paint').feed([{ startTime: 3000, renderTime: 3000 }]);
doc.emit('visibilitychange'); // Visible must not consume the hide handler.
cls.pending.push({ value: 0.02, startTime: 2200, hadRecentInput: false });
doc.visibilityState = 'hidden'; doc.emit('visibilitychange');
assert.equal(events.find(e => e[1] === 'web_vitals_cls')[2].value, 0.125);
assert.equal(typeof stopVitals, 'function');
assert.ok(observers.every(o => o.disconnected));
assert.ok(!observers.some(o => o.type === 'first-input'));
const afterHide = events.length;
doc.emit('visibilitychange'); window.emit('pagehide'); stopVitals();
assert.equal(events.length, afterHide);
const cleanup = initWebVitals(); cleanup();
assert.ok(observers.every(o => o.disconnected));
assert.equal(doc.listeners.get('visibilitychange')?.size || 0, 0);
console.log('PASS CLS precision/session maximum, single hide report, observer cleanup, no FID-as-INP');

const source = await readFile(new URL('../src/components/ContactForm.jsx', import.meta.url), 'utf8');
const compiled = await transform(source.replace(/^import .*;\n/gm, '').replace(/export function/g, 'function'), { loader: 'jsx', jsx: 'transform' });
async function formFixture(response, { duplicate = false, unmount = false, analyticsThrows = false } = {}) {
  const statuses = [], timers = new Map(), cleanups = [];
  let calls = 0, leads = 0, release, signal;
  const gate = new Promise(resolve => { release = resolve; });
  const context = {
    React: { createElement: (type, props, ...children) => ({ type, props, children }) },
    useState: () => ['idle', state => statuses.push(state)],
    useRef: value => ({ current: value }),
    useEffect: setup => { const cleanup = setup(); if (cleanup) cleanups.push(cleanup); },
    FormData: class { append() {} get() { return 'PRIVATE TEST FIELD'; } },
    AbortController,
    setTimeout: fn => { timers.set(1, fn); return 1; },
    clearTimeout: id => timers.delete(id),
    fetch: async (_url, options) => { calls++; signal = options.signal; await gate; if (response instanceof Error) throw response; return response; },
    trackLead: () => { leads++; if (analyticsThrows) throw Error('analytics unavailable'); },
  };
  vm.createContext(context);
  vm.runInContext(compiled.code + '\nthis.form = ContactForm({lang:"th",t:{formProducts:[]}});', context);
  const event = { preventDefault() {}, target: {}, currentTarget: {} };
  const first = context.form.props.onSubmit(event);
  const second = duplicate ? context.form.props.onSubmit(event) : undefined;
  if (unmount) cleanups.forEach(fn => fn());
  release(); await first; await second;
  assert.equal(timers.size, 0, 'request timer must always be cleared');
  if (unmount) { assert.ok(signal.aborted); assert.deepEqual(statuses, ['sending']); assert.equal(leads, 0); }
  return { statuses, calls, leads };
}
const success = { ok: true, json: async () => ({ success: true }) };
assert.deepEqual(await formFixture(success, { duplicate: true }), { statuses: ['sending', 'success'], calls: 1, leads: 1 });
for (const response of [
  { ok: false, json: async () => ({ success: true }) },
  { ok: true, json: async () => ({ success: false }) },
  { ok: true, json: async () => ({ success: 'true' }) },
  { ok: true, json: async () => { throw Error('invalid JSON'); } },
  Error('network error'),
]) assert.deepEqual(await formFixture(response), { statuses: ['sending', 'error'], calls: 1, leads: 0 });
assert.deepEqual((await formFixture(success, { analyticsThrows: true })).statuses, ['sending', 'success']);
await formFixture(success, { unmount: true });
console.log('PASS form HTTP+JSON gate, duplicates, failure isolation, timer/unmount cleanup (mock requests only)');
