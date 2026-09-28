#!/usr/bin/env python3
"""Build first. Requires Python Playwright + Chrome. Optional --origin tests Vite dev."""
import argparse
import functools
import json
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parent.parent
BODIES = json.loads((ROOT / 'src/content/blog-bodies.json').read_text())
FIRST, SECOND = list(BODIES)[:2]

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def check(origin, development=False):
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        try:
            for mobile, lang in [(mobile, lang) for mobile in [False, True] for lang in ['en', 'th']]:
                prefix = '/th' if lang == 'th' else ''
                field = 'bodyTh' if lang == 'th' else 'body'
                route = f'{prefix}/blog/{FIRST}/'
                if not development:
                    context = browser.new_context(java_script_enabled=False)
                    page = context.new_page()
                    page.route('**/*', lambda r: r.continue_() if r.request.url.startswith(origin) else r.abort())
                    page.goto(origin + route)
                    expect(page.locator('.bm-article-body')).to_contain_text(BODIES[FIRST][field][0][1])
                    context.close()
                context = browser.new_context(viewport={'width': 390 if mobile else 1440, 'height': 844 if mobile else 900}, is_mobile=mobile, has_touch=mobile, reduced_motion='reduce' if mobile else 'no-preference')
                page = context.new_page()
                page.route('**/*', lambda r: r.continue_() if r.request.url.startswith(origin) else r.abort())
                errors = []
                page.on('pageerror', lambda e: errors.append(str(e)))
                page.on('console', lambda m: errors.append(m.text) if m.type == 'error' and 'hydrat' in m.text.lower() else None)
                page.goto(origin + route)
                body = page.locator('.bm-article-body')
                expect(body).to_contain_text(BODIES[FIRST][field][0][1])
                # Force a real navigation failure, not a mocked internal hook.
                pattern = '**/blog-bodies/*.json'
                page.route(pattern, lambda r: r.fulfill(status=503, body='unavailable'))
                page.locator(f'.bm-article-nav a[href="{prefix}/blog/{SECOND}"]').click()
                expect(body).not_to_contain_text(BODIES[FIRST][field][0][1])
                expect(body.get_by_role('alert')).to_be_visible()
                page.unroute(pattern)
                body.get_by_role('button').click()
                expect(body).to_contain_text(BODIES[SECOND][field][0][1])
                expect(body.get_by_role('alert')).to_have_count(0)
                page.go_back()
                expect(body).to_contain_text(BODIES[FIRST][field][0][1])
                page.go_forward()
                expect(body).to_contain_text(BODIES[SECOND][field][0][1])
                # Malformed data must produce recovery UI, not crash rendering.
                page.route(pattern, lambda r: r.fulfill(content_type='application/json', body='{"body":{},"bodyTh":{}}'))
                page.goto(origin + prefix + '/blog/')
                page.locator('.bm-feature-link').click()
                expect(page.locator('.bm-article-body').get_by_role('alert')).to_be_visible()
                page.unroute(pattern)
                page.locator('.bm-article-body').get_by_role('button').click()
                expect(page.locator('.bm-article-body')).to_contain_text(BODIES[FIRST][field][0][1])
                # A valid image with an object caption must also remain recoverable.
                image = ['image', {'src': '/invalid-caption.webp', 'alt': 'Caption regression', 'caption': {'text': 'Invalid'}}]
                page.route(pattern, lambda r: r.fulfill(content_type='application/json', body=json.dumps({'body': [image], 'bodyTh': [image]})))
                page.goto(origin + prefix + '/blog/')
                page.locator('.bm-feature-link').click()
                alert = body.get_by_role('alert')
                expect(alert).to_contain_text('ไม่สามารถโหลดบทความได้ โปรดลองอีกครั้ง' if lang == 'th' else 'Could not load this article. Please try again.')
                page.unroute(pattern)
                alert.get_by_role('button', name='ลองอีกครั้ง' if lang == 'th' else 'Try again', exact=True).click()
                expect(body).to_contain_text(BODIES[FIRST][field][0][1])
                expect(alert).to_have_count(0)
                assert not errors, errors
                if mobile:
                    page.get_by_role('button', name='Open menu', exact=True).click()
                    page.get_by_role('button', name='English (EN)' if lang == 'th' else 'ภาษาไทย (TH)', exact=True).click()
                    page.get_by_role('button', name='Close menu', exact=True).click()
                else:
                    page.get_by_role('button', name='EN' if lang == 'th' else 'TH', exact=True).click()
                expect(page.locator('.bm-article-body')).to_contain_text(BODIES[FIRST]['body' if lang == 'th' else 'bodyTh'][0][1])
                assert not errors, errors
                context.close()
                print(f'PASS {lang}/{"mobile reduced-motion" if mobile else "desktop"}: {"development loading" if development else "readable SSR + hydration"}, failed navigation, retry, malformed JSON, back/forward, language toggle')
        finally:
            browser.close()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--origin', help='Running Vite development origin; omit to test dist')
    args = parser.parse_args()
    if args.origin:
        check(args.origin.rstrip('/'), development=True)
    else:
        server = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(ROOT / 'dist')))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            check(f'http://127.0.0.1:{server.server_port}')
        finally:
            server.shutdown()
            server.server_close()
            thread.join()
