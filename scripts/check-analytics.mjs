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
  const statuses = [], timers = new Map(), cleanups = [], states = [], refs = [];
  const fields = { name: 'ผู้ทดสอบ & + ?', business: 'คาเฟ่ & Co + ?', email: 'test+tag@example.com', phone: '+66 123?', product: 'โยเกิร์ต & ชา', qty: '10 + 2?', message: 'ขอราคา & รายละเอียด?\nขอบคุณ + 😊' };
  const nodes = tree => tree && typeof tree === 'object' ? [tree, ...tree.children.flat(Infinity).flatMap(nodes)] : [];
  const fallback = tree => nodes(tree).find(node => node.type === 'a' && node.props.href?.startsWith('mailto:'));
  let stateIndex = 0, refIndex = 0;
  let calls = 0, leads = 0, release, signal;
  const gate = new Promise(resolve => { release = resolve; });
  const context = {
    React: { createElement: (type, props, ...children) => ({ type, props, children }) },
    useState: initial => { const index = stateIndex++; if (!(index in states)) states[index] = initial; return [states[index], value => { states[index] = value; if (index === 0) statuses.push(value); }]; },
    useRef: value => refs[refIndex++] ||= { current: value },
    useEffect: setup => { if (!cleanups.length) { const cleanup = setup(); if (cleanup) cleanups.push(cleanup); } },
    FormData: class extends Map { constructor(form) { assert.ok(form, 'form must be captured before await'); super(Object.entries(form)); } append(key, value) { this.set(key, value); } },
    AbortController,
    setTimeout: fn => { timers.set(1, fn); return 1; },
    clearTimeout: id => timers.delete(id),
    fetch: async (_url, options) => { calls++; signal = options.signal; await gate; if (response instanceof Error) throw response; return response; },
    trackLead: () => { leads++; if (analyticsThrows) throw Error('analytics unavailable'); },
  };
  vm.createContext(context);
  vm.runInContext(compiled.code, context);
  const render = (lang = 'th') => { stateIndex = 0; refIndex = 0; return context.ContactForm({ lang, t: { formProducts: [], formSuccess: 'CONFIRMED SUCCESS' } }); };
  const form = render();
  assert.equal(fallback(form), undefined, 'no fallback before failure');
  const event = { preventDefault() {}, target: {}, currentTarget: fields };
  const first = form.props.onSubmit(event);
  const second = duplicate ? form.props.onSubmit(event) : undefined;
  event.currentTarget = null; // React clears currentTarget after the synchronous handler.
  assert.equal(fallback(render()), undefined, 'no fallback while sending');
  if (unmount) cleanups.forEach(fn => fn());
  release(); await first; await second;
  for (const lang of ['th', 'en']) {
    const tree = render(lang);
    if (statuses.at(-1) === 'error') {
      const link = fallback(tree);
      assert.ok(link, 'provider failure must offer an email fallback');
      const url = new URL(link.props.href);
      assert.equal(url.pathname, 'Blessme.team@gmail.com');
      assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
      assert.equal(url.searchParams.get('subject'), `BlessMe Wholesale Enquiry — ${fields.business}`);
      const labels = ['Name', 'Business', 'Email', 'Phone', 'Product', 'Quantity', 'Message'];
      assert.equal(url.searchParams.get('body'), Object.values(fields).map((value, i) => `${labels[i]}: ${value}`).join('\n'));
      assert.equal(link.props.onClick, undefined, 'fallback is a native link, not an auto-send or lead handler');
      assert.ok(nodes(tree).some(node => node.props?.href === 'https://line.me/R/ti/p/@blessmethailand'));
      const alert = nodes(tree).find(node => node.props?.role === 'alert');
      assert.ok(alert, 'failure instructions must be announced');
      const text = JSON.stringify(alert);
      assert.match(text, lang === 'th' ? /กดส่ง/ : /send.*yourself/i);
      assert.ok(!JSON.stringify(tree).includes('CONFIRMED SUCCESS'));
      assert.equal(leads, 0);
    } else assert.equal(fallback(tree), undefined, 'no fallback on success or unmount');
  }
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
console.log('PASS error-only TH/EN email fallback, all fields/Unicode/&/+/? encoding, accessible send instructions, no false success or leads');
