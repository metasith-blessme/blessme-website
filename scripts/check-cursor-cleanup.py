#!/usr/bin/env python3
"""
check-cursor-cleanup.py

Runnable regression check for WEBSITE-PERFORMANCE-PLAN.md Phase 1.

Builds the site, serves it with `vite preview`, then opens /, /blog/, /th/blog/
in headless Chrome. For each route it dispatches 120 frame-spaced mousemove
events and measures script time via CDP Performance.getMetrics. The cursor
logic removed from src/App.jsx used to add tens-to-hundreds of milliseconds
of script time per mouse workload; after the fix the figure must stay
small.

Why CDP metrics, not a React commit counter: React 18 production builds do
NOT read window.__REACT_DEVTOOLS_GLOBAL_HOOK__, so a commit-count gate
would silently pass on a regression. Script-time at the page level still
catches the dominant cost of re-running setState on every mousemove.

Pass criteria per route: script_ms <= SCRIPT_BUDGET_MS, no page errors.
Exits 0 on pass, 1 on fail. Requires Python 3.9+, playwright.
"""
import json
import socket
import subprocess
import sys
import time
import urllib.request
from contextlib import closing
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PORT = 4180
# Budget is ~14x the post-fix floor (0.6 ms) so a real regression that
# recovers 5–10% of the original 79–149 ms still fails, while ordinary
# lab noise won't false-fail.
SCRIPT_BUDGET_MS = 10.0
ROUTES = ["/", "/blog/", "/th/blog/"]


def wait_for(url, timeout=20):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=2) as r:
                if r.status < 500:
                    return True
        except Exception:
            time.sleep(0.25)
    return False


def port_free(port):
    with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as s:
        return s.connect_ex(("127.0.0.1", port)) != 0


def main():
    if not port_free(PORT):
        print(f"port {PORT} in use; abort", file=sys.stderr)
        return 2

    subprocess.run(["npm", "run", "build"], cwd=ROOT, check=True)

    preview = subprocess.Popen(
        ["npx", "--no-install", "vite", "preview", "--host", "127.0.0.1", "--port", str(PORT)],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
    )
    try:
        if not wait_for(f"http://127.0.0.1:{PORT}/", timeout=20):
            print("preview server did not start", file=sys.stderr)
            return 2

        from playwright.sync_api import sync_playwright

        failures = []
        rows = []
        with sync_playwright() as p:
            browser = p.chromium.launch(channel="chrome", headless=True)
            try:
                for route in ROUTES:
                    page = browser.new_page(viewport={"width": 1440, "height": 900})
                    errors = []
                    page.on("pageerror", lambda e: errors.append(str(e)))
                    cdp = page.context.new_cdp_session(page)
                    cdp.send("Performance.enable")
                    page.goto(f"http://127.0.0.1:{PORT}{route}", wait_until="networkidle")
                    page.wait_for_timeout(300)
                    before = {m["name"]: m["value"] for m in cdp.send("Performance.getMetrics")["metrics"]}
                    page.evaluate(
                        "async()=>{for(let i=0;i<120;i++){"
                        "window.dispatchEvent(new MouseEvent('mousemove',"
                        "{clientX:100+i*3,clientY:300}));"
                        "await new Promise(requestAnimationFrame)}}"
                    )
                    after = {m["name"]: m["value"] for m in cdp.send("Performance.getMetrics")["metrics"]}
                    script_ms = round((after["ScriptDuration"] - before["ScriptDuration"]) * 1000, 2)
                    rows.append({"route": route, "script_ms": script_ms, "errors": errors})
                    page.close()
                    if script_ms > SCRIPT_BUDGET_MS:
                        failures.append(f"{route}: script {script_ms} ms > budget {SCRIPT_BUDGET_MS} ms")
                    if errors:
                        failures.append(f"{route}: page errors {errors}")
            finally:
                browser.close()

        print(json.dumps(rows, indent=2))
        if failures:
            print("FAIL", file=sys.stderr)
            for f in failures:
                print(f"  - {f}", file=sys.stderr)
            return 1
        print(f"PASS: pointer workload adds <={SCRIPT_BUDGET_MS} ms script time")
        return 0
    finally:
        preview.terminate()
        try:
            preview.wait(timeout=5)
        except subprocess.TimeoutExpired:
            preview.kill()


if __name__ == "__main__":
    sys.exit(main())
