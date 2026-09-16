// Real DOM regression, offline: render the actual modal and intercept every CTA.
// CHROME_BIN overrides the default macOS Chrome executable.
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { build } from 'esbuild';

const temporary = await mkdtemp(path.join(tmpdir(), 'blessme-modal-'));
let chrome;
const deadline = setTimeout(() => { chrome?.kill(); console.error('Chrome test timed out'); process.exitCode = 1; }, 60000);
try {
  const bundle = await build({
    stdin: { contents: `
      import React from 'react';
      import { createRoot } from 'react-dom/client';
      import { flushSync } from 'react-dom';
      import Modal from './src/components/Modal.jsx';
      import { PRODUCTS } from './src/constants/products.js';
      import { initContactTracking } from './src/lib/analytics.js';
      const check = (ok, message) => { if (!ok) throw Error(message); };
      try {
        const root = createRoot(document.getElementById('root'));
        const events = [];
        window.gtag = (...args) => events.push(args);
        // Suppress mail clients/new tabs while preserving actual event propagation.
        window.addEventListener('click', e => e.preventDefault(), true);
        let closed = 0;
        let cases = 0;
        for (const lang of ['en', 'th']) {
          document.documentElement.lang = lang;
          for (const product of PRODUCTS) {
            flushSync(() => root.render(<Modal product={product} lang={lang} onClose={() => closed++} />));
            let stop = initContactTracking();
            // Exercise effect cleanup/remount: no duplicate document listeners.
            stop(); stop = initContactTracking();
            for (const [selector, method] of [['a[href^="mailto:"]', 'email'], ['a[href^="https://line.me/"]', 'line']]) {
              const link = document.querySelector('.bm-modal ' + selector);
              check(link, 'Missing modal CTA');
              const before = events.length;
              link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
              check(events.length === before + 1, product.id + '/' + lang + ': ' + method + ' must emit once');
              const [command, name, payload] = events.at(-1);
              check(command === 'event' && name === 'contact_click', 'Wrong event');
              check(payload.contact_method === method && payload.language === lang, 'Wrong attribution');
              check(method !== 'email' || payload.contact_intent === 'quote', 'Missing quote intent');
              check(!JSON.stringify(payload).includes('subject='), 'Leaked email query');
              cases++;
            }
            stop();
            const before = events.length;
            document.querySelector('.bm-modal a[href^="mailto:"]').click();
            check(events.length === before, 'Listener cleanup failed');
          }
        }
        check(closed === 0, 'Contact clicks must not close modal');
        flushSync(() => root.unmount());
        document.getElementById('result').textContent = 'PASS ' + cases + ' modal contact clicks; cleanup, attribution, no navigation';
      } catch (error) { document.getElementById('result').textContent = 'FAIL ' + error.message; }
    `, loader: 'jsx', resolveDir: process.cwd() },
    bundle: true, write: false, platform: 'browser', define: { 'process.env.NODE_ENV': '"production"' },
  });
  chrome = spawn(process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new', '--disable-gpu', '--no-first-run', '--disable-background-networking',
    '--host-resolver-rules=MAP * ~NOTFOUND', '--remote-debugging-pipe',
    `--user-data-dir=${path.join(temporary, 'profile')}`, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'] });
  let id = 0, buffer = '';
  const pending = new Map();
  chrome.on('error', error => { for (const p of pending.values()) p.reject(error); });
  chrome.on('exit', () => { for (const p of pending.values()) p.reject(Error('Chrome exited')); });
  chrome.stdio[4].on('data', chunk => {
    buffer += chunk.toString();
    let end;
    while ((end = buffer.indexOf('\0')) >= 0) {
      const message = JSON.parse(buffer.slice(0, end)); buffer = buffer.slice(end + 1);
      const request = pending.get(message.id);
      if (request) { pending.delete(message.id); message.error ? request.reject(Error(message.error.message)) : request.resolve(message.result); }
    }
  });
  const call = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    chrome.stdio[3].write(JSON.stringify({ id, method, params, sessionId }) + '\0');
  });
  const { targetId } = await call('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await call('Target.attachToTarget', { targetId, flatten: true });
  await call('Network.enable', {}, sessionId);
  await call('Network.setBlockedURLs', { urls: ['*'] }, sessionId);
  const evaluated = await call('Runtime.evaluate', { expression: `document.body.innerHTML = '<div id="root"></div><pre id="result">PENDING</pre>';\n${bundle.outputFiles[0].text}\ndocument.getElementById('result').textContent`, returnByValue: true }, sessionId);
  assert.ok(!evaluated.exceptionDetails, JSON.stringify(evaluated.exceptionDetails));
  const result = evaluated.result.value;
  assert.match(result || '', /^PASS 24 modal contact clicks;/);
  console.log(result);
} finally {
  clearTimeout(deadline);
  if (chrome && chrome.exitCode === null) { const exited = new Promise(resolve => chrome.once('exit', resolve)); chrome.kill(); await exited; }
  await rm(temporary, { recursive: true, force: true });
}
