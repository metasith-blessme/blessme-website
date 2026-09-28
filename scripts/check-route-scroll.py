#!/usr/bin/env python3
"""Build first. Verify route changes do not animate through the new page."""
import importlib.util
from pathlib import Path
import functools
import threading
from http.server import ThreadingHTTPServer
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('article_checks', ROOT / 'scripts/check-article-loading.py')
assert spec and spec.loader
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)
server = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(checks.QuietHandler, directory=str(ROOT / 'dist')))
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()
failures = []
try:
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        try:
            for width in [390, 1440]:
                for lang in ['en', 'th']:
                    for motion in ['reduce', 'no-preference']:
                        page = browser.new_page(viewport={'width': width, 'height': 844}, reduced_motion=motion)
                        origin = f'http://127.0.0.1:{server.server_port}'
                        page.route('**/*', lambda r: r.continue_() if r.request.url.startswith(origin) else r.abort())
                        page.goto(origin + ('/th' if lang == 'th' else '') + '/blog/', wait_until='networkidle')
                        for selector in ['.bm-feature-link', '.bm-blog-card-hit']:
                            target = page.locator(selector).first
                            target.hover()
                            page.wait_for_timeout(300)
                            style = target.evaluate('(el)=>({transform:getComputedStyle(el).transform,duration:getComputedStyle(el).transitionDuration})')
                            assert (style['transform'] == 'none') == (motion == 'reduce'), (selector, motion, style)
                            if motion == 'reduce':
                                assert all(float(value.strip().rstrip('s')) == 0 for value in style['duration'].split(',')), style
                        result = page.evaluate('''async()=>{
                          const link=[...document.querySelectorAll('.bm-blog-card-hit')].at(-1);
                          link.scrollIntoView({behavior:'instant',block:'center'});
                          await new Promise(requestAnimationFrame);
                          const before=scrollY;link.click();
                          const immediate=scrollY, frames=[];
                          for(let i=0;i<45;i++){await new Promise(requestAnimationFrame);frames.push(scrollY)}
                          return {before,immediate,maxAfter:Math.max(...frames),last:frames.at(-1)};
                        }''')
                        print(width, lang, motion, result)
                        expect(page.locator('.bm-article-body p').first).to_be_visible()
                        expect(page.locator('.bm-article-title')).to_be_focused()
                        nav = page.locator('.bm-article-nav-card').first
                        nav.hover()
                        page.wait_for_timeout(300)
                        assert (nav.evaluate('(el)=>getComputedStyle(el).transform') == 'none') == (motion == 'reduce')
                        if result['before'] < 500 or result['immediate'] > 1 or result['maxAfter'] > 1:
                            failures.append((width, lang, motion, result))
                        page.go_back()
                        page.locator('input[type="search"]').fill('boba')
                        page.locator('.bm-filter-pill').nth(1).click()
                        category = page.locator('.bm-filter-pill.is-active').text_content()
                        page.locator('.bm-feature-link').click()
                        expect(page.locator('.bm-article-title')).to_be_focused()
                        page.go_back()
                        expect(page.locator('input[type="search"]')).to_have_value('boba')
                        expect(page.locator('.bm-filter-pill.is-active')).to_have_text(category)
                        page.goto(origin + ('/th/' if lang == 'th' else '/'), wait_until='networkidle')
                        behavior = page.evaluate('''()=>{
                          let behavior; const original=Element.prototype.scrollIntoView;
                          Element.prototype.scrollIntoView=function(options){behavior=options.behavior;original.call(this,options)};
                          const button=[...document.querySelectorAll('button')].find(b=>b.querySelector('path[d="M5 12h14M12 5l7 7-7 7"]'));
                          button.click();Element.prototype.scrollIntoView=original;return behavior;
                        }''')
                        assert behavior == ('instant' if motion == 'reduce' else 'smooth'), behavior
                        # Isolated CSS fixture for the decorative pearl hover rule.
                        page.evaluate('''()=>{const el=document.createElement('div');el.id='motion-probe';el.className='bm-boba-3d';el.style.cssText='position:fixed;top:110px;left:5px;width:30px;height:30px;z-index:9999';document.body.append(el)}''')
                        pearl = page.locator('#motion-probe')
                        pearl.hover()
                        page.wait_for_timeout(350)
                        assert (pearl.evaluate('(el)=>getComputedStyle(el).transform') == 'none') == (motion == 'reduce')
                        page.close()
        finally:
            browser.close()
finally:
    server.shutdown()
    server.server_close()
    thread.join()
assert not failures, failures
print('PASS: immediate route positioning across both languages, viewports and motion preferences')
