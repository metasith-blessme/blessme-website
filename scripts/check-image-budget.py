#!/usr/bin/env python3
"""
check-image-budget.py

Phase 2 acceptance gate for WEBSITE-PERFORMANCE-PLAN.md.

Builds the site, serves it with `vite preview`, then opens /blog/ and
/th/blog/ in headless Chrome with a cold cache. Asserts:

- No request is made for any multi-megabyte original photograph (boba-drink,
  bangkok-market, cold-chain, barley grain). Each of those source files is
  in public/assets/.originals and is named without the -opt suffix; the live
  HTML must reference the optimized derivatives only.

- Every editorial image actually requested by the page is at most 300 KB
  on the wire. The plan sets a 300 KB budget per editorial derivative.

- The home page must request the optimized header logo (webp) and not the
  656 KB PNG.

Exits 0 on pass, 1 on fail.
"""
import json
import os
import socket
import subprocess
import sys
import time
import urllib.request
from contextlib import closing
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_ASSETS = ROOT / "public" / "assets" / ".originals"
PORT = 4181

ORIGINAL_NAMES = [
    "boba-drink-wholesale.jpg",
    "bangkok-market-supplier.jpg",
    "cold-chain-logistics.jpg",
    "barley-grain-boba.jpg",
]
LOGO_PNG = "logo-full.png"
EDITORIAL_BUDGET = 300 * 1024  # 300 KB

# Routes to check (Phase 2 acceptance mentions cold loads on home + blog/article)
# Use the longest route to maximize the chance of catching every editorial image.
# Sample one article in each language so the hero path is exercised.
ROUTE_ARTICLES = {
    "en": "what-is-popping-boba-khai-muk-pop",
    "th": "what-is-popping-boba-khai-muk-pop",
}
ROUTES = [
    "/",
    "/blog/",
    "/th/blog/",
    "/blog/" + ROUTE_ARTICLES["en"] + "/",
    "/th/blog/" + ROUTE_ARTICLES["th"] + "/",
]


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
        stderr=subprocess.DEVNULL,
    )
    try:
        if not wait_for(f"http://127.0.0.1:{PORT}/"):
            print("preview server did not start", file=sys.stderr)
            return 2

        from playwright.sync_api import sync_playwright

        failures = []
        rows = []
        # Use a fresh context per route so each load is cold-cached.
        with sync_playwright() as p:
            browser = p.chromium.launch(channel="chrome", headless=True)
            try:
                for route in ROUTES:
                    context = browser.new_context(viewport={"width": 1440, "height": 900})
                    page = context.new_page()
                    image_requests = []

                    def on_response(r):
                        if r.request.resource_type != "image":
                            return
                        # Try header first; fall back to actual bytes via body().
                        # Some asset servers (and Vite preview) omit Content-Length,
                        # which would silently zero out every entry and turn the
                        # 300 KB budget check into a no-op.
                        try:
                            cl = int(r.headers.get("content-length") or 0)
                        except ValueError:
                            cl = 0
                        try:
                            body = r.body()
                            actual = len(body)
                        except Exception:
                            actual = cl
                        image_requests.append({
                            "url": r.url,
                            "cl": cl,
                            "bytes": actual,
                            "status": r.status,
                        })

                    page.on("response", on_response)
                    page.goto(f"http://127.0.0.1:{PORT}{route}", wait_until="networkidle")
                    # Give lazy loaders a chance to fire on initial below-fold.
                    page.wait_for_timeout(500)

                    requested = [r["url"] for r in image_requests]
                    forbidden = [n for n in ORIGINAL_NAMES if any(n in u for u in requested)]
                    if forbidden:
                        failures.append(f"{route}: original-sized image still requested: {forbidden}")
                    if any("/.originals/" in u for u in requested):
                        failures.append(f"{route}: original source under .originals/ was requested")

                    logo_png = any(LOGO_PNG in u and not u.endswith(".webp") for u in requested)
                    if route == "/" and logo_png:
                        failures.append(f"{route}: header logo still served as PNG")

                    over = [
                        (r["url"].rsplit("/", 1)[-1], r["bytes"])
                        for r in image_requests
                        if r["bytes"] > EDITORIAL_BUDGET
                    ]
                    if over:
                        failures.append(f"{route}: editorial image over 300 KB: {over}")

                    rows.append({
                        "route": route,
                        "image_count": len(image_requests),
                        "total_bytes": sum(r["bytes"] for r in image_requests),
                        "forbidden_requests": forbidden,
                    })
                    context.close()
            finally:
                browser.close()

        print(json.dumps(rows, indent=2))
        if failures:
            print("FAIL", file=sys.stderr)
            for f in failures:
                print(f"  - {f}", file=sys.stderr)
            return 1
        print("PASS: image budgets satisfied; no original multi-MB JPEG requested")
        return 0
    finally:
        preview.terminate()
        try:
            preview.wait(timeout=5)
        except subprocess.TimeoutExpired:
            preview.kill()


if __name__ == "__main__":
    sys.exit(main())
