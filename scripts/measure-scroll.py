#!/usr/bin/env python3
"""Run against a production preview: python3 scripts/measure-scroll.py ORIGIN OUTPUT.json.
Three cold loads per route/profile. Synthetic frame intervals are not field INP or device FPS.
"""
import json
import statistics
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

origin, output = sys.argv[1:]
routes = ['/', '/blog/', '/th/blog/', '/blog/what-is-popping-boba-khai-muk-pop/', '/th/blog/what-is-popping-boba-khai-muk-pop/']
rows = []
with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    try:
        for profile, width, height, cpu in [('desktop', 1440, 900, 1), ('mobile', 390, 844, 4)]:
            for route in routes:
                for run in range(3):
                    context = browser.new_context(viewport={'width': width, 'height': height}, is_mobile=profile == 'mobile', has_touch=profile == 'mobile')
                    page = context.new_page()
                    page.route('**/*googletagmanager.com/**', lambda r: r.abort())
                    page.route('**/*google-analytics.com/**', lambda r: r.abort())
                    errors = []
                    page.on('pageerror', lambda e: errors.append(str(e)))
                    page.add_init_script("""window.__lab={lcp:0,shifts:[],tasks:[]};
                    new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__lab.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});
                    new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__lab.shifts.push(e.value)})).observe({type:'layout-shift',buffered:true});
                    new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__lab.tasks.push({start:e.startTime,ms:e.duration}))).observe({type:'longtask',buffered:true});""")
                    cdp = context.new_cdp_session(page)
                    cdp.send('Network.enable')
                    cdp.send('Network.setCacheDisabled', {'cacheDisabled': True})
                    cdp.send('Emulation.setCPUThrottlingRate', {'rate': cpu})
                    if profile == 'mobile':
                        cdp.send('Network.emulateNetworkConditions', {'offline': False, 'latency': 150, 'downloadThroughput': 200000, 'uploadThroughput': 93750})
                    page.goto(origin + route, wait_until='networkidle')
                    page.evaluate('document.fonts.ready')
                    initial = page.evaluate('({...window.__lab,bytes:performance.getEntriesByType("resource").reduce((n,r)=>n+r.transferSize,0)})')
                    scroll = page.evaluate("""async()=>{
                      const start=performance.now(), frames=[];let last;
                      for(let i=0;i<=120;i++){
                        const now=await new Promise(requestAnimationFrame);
                        if(last!==undefined)frames.push(now-last);last=now;
                        window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*i/120,behavior:'instant'});
                      }
                      frames.sort((a,b)=>a-b);
                      return {p95FrameMs:frames[Math.floor(frames.length*.95)],longTasks:window.__lab.tasks.filter(t=>t.start>=start).length,
                        atBottom:Math.abs(scrollY+innerHeight-document.documentElement.scrollHeight)<3,
                        horizontalOverflow:document.documentElement.scrollWidth>innerWidth+1};
                    }""")
                    row = {'profile': profile, 'route': route, 'run': run + 1, 'lcpMs': round(initial['lcp'], 1), 'layoutShiftSum': round(sum(initial['shifts']), 4), 'initialMeasuredResourceBytes': initial['bytes'], **scroll, 'errors': errors}
                    rows.append(row)
                    Path(output).write_text(json.dumps({'method': 'Chrome headless; fresh contexts/cache disabled; desktop native CPU/network; mobile 4x CPU, 1.6 Mbps down/150 ms latency; analytics blocked; 120-frame scripted top-to-bottom scroll; layoutShiftSum is not session-window CLS; cross-origin transfer bytes may be unavailable', 'rows': rows}, indent=2))
                    assert not errors and not scroll['horizontalOverflow'], row
                    context.close()
                group = rows[-3:]
                print(json.dumps({'profile': profile, 'route': route, 'medianLcpMs': statistics.median(r['lcpMs'] for r in group), 'medianScrollP95Ms': round(statistics.median(r['p95FrameMs'] for r in group), 2), 'scrollLongTasks': sum(r['longTasks'] for r in group)}), flush=True)
    finally:
        browser.close()
assert len(rows) == len(routes) * 2 * 3
print(f'Saved {len(rows)} measured runs to {output}')
