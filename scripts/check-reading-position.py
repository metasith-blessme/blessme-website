#!/usr/bin/env python3
"""Build first. Exercise article Back and language changes with delayed body requests."""
import functools
import importlib.util
import threading
import time
from http.server import ThreadingHTTPServer
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('article_checks', ROOT / 'scripts/check-article-loading.py')
assert spec and spec.loader
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)
server = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(checks.QuietHandler, directory=str(ROOT / 'dist')))
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()
origin = f'http://127.0.0.1:{server.server_port}'
failures = []
try:
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        try:
            for width in [390, 1440]:
                for lang in ['en', 'th']:
                    page = browser.new_page(viewport={'width': width, 'height': 844})
                    page.route('**/*', lambda r: r.continue_() if r.request.url.startswith(origin) else r.abort())
                    def delayed(route):
                        time.sleep(0.8)
                        route.continue_()
                    page.route('**/blog-bodies/*.json', delayed)
                    prefix = '/th' if lang == 'th' else ''
                    field = 'bodyTh' if lang == 'th' else 'body'
                    page.goto(origin + prefix + '/blog/', wait_until='networkidle')
                    page.locator('.bm-feature-link').click()
                    expect(page.locator('.bm-article-body')).to_contain_text(checks.BODIES[checks.FIRST][field][0][1])
                    page.evaluate('document.fonts.ready')
                    # Pick a position beyond the loading placeholder's height.
                    before = page.evaluate('''()=>{
                      const body=document.querySelector('.bm-article-body');
                      window.scrollTo({top:body.offsetTop+body.offsetHeight*.7,behavior:'instant'});return scrollY;
                    }''')
                    page.wait_for_timeout(100)
                    page.locator('.bm-article-nav a').first.evaluate('(a)=>a.click()')
                    expect(page.locator('.bm-article-body')).to_contain_text(checks.BODIES[checks.SECOND][field][0][1])
                    page.go_back()
                    expect(page.locator('.bm-article-body')).to_contain_text(checks.BODIES[checks.FIRST][field][0][1])
                    page.wait_for_timeout(200)
                    after = page.evaluate('scrollY')
                    if abs(after-before)>3:
                        failures.append(f'{width}/{lang} Back: {before} -> {after}')
                    # Change language at the same deep position, without scrolling to a control.
                    page.evaluate('(y)=>window.scrollTo({top:y,behavior:"instant"})', before)
                    page.evaluate('''(label)=>[...document.querySelectorAll('button')].find(b=>b.textContent.trim()===label).click()''', 'TH' if lang == 'en' else 'EN')
                    expect(page.locator('.bm-article-body')).to_contain_text(checks.BODIES[checks.FIRST]['body' if lang == 'th' else 'bodyTh'][0][1])
                    page.wait_for_timeout(200)
                    translated = page.evaluate('scrollY')
                    max_y = page.evaluate('document.documentElement.scrollHeight-innerHeight')
                    if abs(translated-min(before,max_y))>3:
                        failures.append(f'{width}/{lang} language: {before} -> {translated}')
                    print(width, lang, {'before':before,'back':after,'language':translated}, flush=True)
                    page.close()
        finally:
            browser.close()
finally:
    server.shutdown()
    server.server_close()
    thread.join()
assert not failures, failures
print('PASS: deep reading position survives delayed Back and language changes')
