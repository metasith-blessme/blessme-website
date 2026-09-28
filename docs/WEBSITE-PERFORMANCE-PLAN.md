# Website performance review and fix plan

Original review: 2026-09-25. Corrective follow-up: 2026-09-28; implemented and locally verified, not committed or deployed. The original audit below is historical; current results are in the follow-up section.

## Decision

Fix oversized blog images and unused mouse tracking first. Re-measure before changing routing, adding caching, paginating the blog, or splitting the application. No framework migration or new runtime dependency is justified by this audit.

## Evidence and scope

Built the current working tree with `npm run build`: successful; 54 prerendered pages. Inspected imports, article listing/detail rendering, navigation, styles, image requests, and existing measurement code. A pygount scan of `src` and `scripts` reported 35 files and 3,574 code lines; this is a small application, not an architecture-scale problem.

Browser measurements used installed Python Playwright and headless Chrome, the production preview at 1440×900, and analytics blocked to avoid synthetic events. These are local lab observations, not field INP/LCP or proof of a particular mobile experience.

The live `/blog` request redirected to `/blog/`, rendered the correct heading, and reported no page errors. Its application bundle filename matched this build (`index-aUPVIKc2.js`). Local `/blog/` and `/th/blog/` also hydrated without page errors. An initial no-trailing-slash Vite preview test served homepage HTML and produced hydration errors; that result was rejected as a preview fallback artifact, not a production bug.

### 1. High priority: original-size photographs reach blog readers

`src/content/blog.js:45` and `src/content/blog.js:68` reference original JPEGs, rendered directly by `src/pages/BlogPage.jsx:23`. On the desktop blog load, both were actually requested despite lazy loading:

| Asset | Response body bytes | Natural width | Displayed width |
| --- | ---: | ---: | ---: |
| boba-drink-wholesale.jpg | 9,572,697 | 6,336 px | 594 px |
| bangkok-market-supplier.jpg | 1,653,951 | 6,016 px | 594 px |
| logo-full.png | 656,097 | 2,667 px | 64 px |

Other original photos referenced by articles are also large on disk: `cold-chain-logistics.jpg` is 4,196,471 bytes and `barley-grain-boba.jpg` is 2,849,188 bytes. These later images were not all requested in the initial viewport; file size is not the same as initial transfer size.

**Cause:** original photography is sent to relatively small display slots. Lazy loading controls request timing, not image size. The logo is also preloaded globally (`index.html:43`) despite its small rendered dimensions.

### 2. High priority: unused cursor work rerenders the application

`src/App.jsx:71–91` stores pointer coordinates in top-level React state and subscribes to every mousemove. `src/App.jsx:135–139` renders the corresponding element. No `.custom-cursor` styling was found in the stylesheet; computed style showed a static, zero-height element. It does not provide a visible cursor effect in this build.

Controlled A/B: dispatch 120 mousemove events, one per animation frame, after initial loading. The control suppresses only registration of the window mousemove listener; application files remain unchanged.

| Route | React commits: normal → control | Script CPU ms: normal → control |
| --- | ---: | ---: |
| /blog/ | 120 → 0 | 79.43 → 0.65 |
| /th/blog/ | 120 → 0 | 101.54 → 0.63 |
| / | 120 → 0 | 149.52 → 0.82 |

**Cause:** mouse position state lives above the whole page, so pointer motion repeatedly executes the page subtree. The script timings are individual lab samples; the repeatable 120-versus-zero commit count is the stronger evidence. This does not explain touch-only scrolling by itself.

### 3. Medium priority: all routes and article bodies load eagerly

`src/App.jsx:20–26` statically imports every page. `src/pages/ArticlePage.jsx:10` imports all bilingual article bodies. That JSON source is 141,553 bytes, including formatting. The initial application bundle is 415,085 bytes plus a 139,182-byte React vendor bundle; independently gzipped sizes are 101,556 and 44,895 bytes respectively. Source JSON size is not its exact contribution to the compressed bundle.

This is confirmed avoidable payload on non-article routes, but its user-visible cost has not been isolated. Optimize after the larger image and pointer problems. Prerendered article bodies and hydration must survive any splitting; wrapping the existing imports in React.lazy without adapting prerendering is not an acceptable shortcut.

### 4. Lower priority / not yet proven

- `BlogPage.jsx:146` lazy-loads the featured image. Measure the actual LCP element at each viewport before changing priority; keep below-fold images lazy.
- `App.jsx:98,106` requests smooth scrolling on route changes. Test opening an article from far down the list; route transitions may benefit from immediate top positioning, but this audit did not isolate that as a measured bottleneck.
- Multiple font families are requested (`index.html:39–41`). No font-removal recommendation without checking actual font use and Thai rendering.
- Existing `docs/PERFORMANCE-BASELINE.md` contains empty measurements and older FID-based targets. It is not an established performance baseline. `src/lib/web-vitals.js` correctly describes its own metrics as diagnostics rather than canonical field CWV.
- Search/category smoke checks passed in both languages; the list contains 15 articles. There is no evidence justifying search infrastructure or virtualization.

## Implementation order and acceptance gates

### Phase 1 — remove wasted pointer work

Delete cursor state, cursor-only mouse listeners and the invisible element from App. Remove the `useReducedMotion` import/use only if no remaining caller needs it; preserve `MotionConfig reducedMotion="user"` for actual motion components.

Acceptance:
- A runnable browser regression check dispatches the same 120 frame-spaced events on home and both blog languages and reports zero pointer-driven React commits after settling.
- Native pointer/hover behavior, keyboard focus and reduced-motion behavior remain usable.
- Existing navigation and analytics checks pass.

### Phase 2 — resize existing imagery, preserve content

Generate optimized derivatives of the four large editorial photographs. Reuse a suitable existing encoder or offline tool; no new runtime image service. Keep originals. Update their shared article metadata references so blog cards and article heroes use the optimized assets consistently. Preserve filenames referenced externally unless retaining the original URL as well. Use responsive variants only if measured mobile savings justify them.

Optimize the small header/footer logo separately from the full-resolution social/brand image. Inspect all logo references before editing; do not silently change brand artwork or social metadata.

Acceptance:
- Proposed budget: each editorial derivative at most 300 KB, with visual inspection at card and article-hero sizes; adjust quality instead of accepting visible artifacts to hit a number.
- No original multi-megabyte JPEG is requested during blog loading, full scrolling, or article navigation in either language.
- No missing images, altered crop intent, layout regressions, lost alt text or content edits.
- Compare cold-cache image bytes and loading under the same mobile/desktop settings before and after; save the results.

### Phase 3 — measure again; split only if still needed

Collect three comparable cold loads per home/blog/article route on desktop and a throttled mobile profile. Record transferred bytes, LCP element/timing, layout shifts and long tasks. Exercise search, filters, scrolling and page transitions. Timing medians are lab results, not field INP.

If JavaScript is still a meaningful bottleneck, separate article-only code/data from the initial non-article bundle using the existing Vite setup. Preserve direct article hydration, full prerendered EN/TH body text, metadata, related links and true 404 handling. Inspect every import path so another static import does not pull the same data back into the entry bundle. Add a bundle-content regression check if this phase is implemented.

## Verification for implementation

- `npm run check:seo`
- Start `npx --no-install wrangler dev --local --ip 127.0.0.1 --port 8791`, then `node scripts/check-not-found.js http://127.0.0.1:8791` (this check needs Cloudflare's local asset server, not Vite preview).
- `node scripts/check-blog-facts.mjs`
- `node scripts/check-modal-tracking.mjs`
- Browser: EN/TH home, blog, article and product routes; direct refresh; navigation/back/forward; search match/no-match/clear; category filtering; language toggle; desktop/mobile and reduced motion; no hydration errors.
- Preserve all 54 prerendered pages, full article body text, canonical/hreflang/schema, contact details, analytics ID, brand colors and product facts.
- No deploy or commit without authorization. Re-read git status before implementation and preserve the user's unrelated staged/untracked changes.

## Audit artifacts and limitations

Local scratch probes (temporary, not application dependencies):
- `~/.hermes/cache/scratch/blessme-perf-audit.py`
- `~/.hermes/cache/scratch/blessme-perf-results.json`
- `~/.hermes/cache/scratch/blessme-perf-followup.py`

To repeat the pointer comparison while these probes are retained: build, start `npm run preview -- --host 127.0.0.1`, then run `python3 ~/.hermes/cache/scratch/blessme-perf-audit.py`. Requires Python Playwright and installed Chrome. The probe records A/B evidence, not an installed CI regression gate; Phase 1 adds that gate before changing code.

Verified during review: production build; direct EN/TH blog hydration; empty-search and clear behavior; category selection; article navigation and body rendering; live blog redirect and application-bundle identity. Existing search-link, SEO-foundation, analytics, blog-facts and modal-tracking checks all passed. The 404 check passed against Wrangler on port 8791: 54 known routes, slash redirects and 14 missing paths. Its first invocation lacked a reachable server; the default Wrangler port then conflicted on IPv6, so verification used an explicit IPv4 address and alternate port. `git diff --check` passed.

At the original audit: field Core Web Vitals, mobile CPU/network profiles, a full-site trace and post-fix improvement were not measured. No performance code or image changes had yet been applied.

## Corrective follow-up — 2026-09-28

Baseline: `721cd184783bb9aaf33469cdfbd1a5eef36aeb85` (already includes image optimization, cursor removal and article splitting). Kept those optimizations; did not introduce a framework, runtime dependency or cache.

### Corrected

- Pass the selected article body into server rendering and initialize hydration from matching embedded data. All 36 EN/TH article bodies now exist as visible HTML, not only JSON. The full body collection remains outside the browser entry bundle.
- Key article instances by ID and language, cancel abandoned requests, validate fetched blocks, and show localized retry UI. A failed request cannot leave another article's text beneath the new heading.
- Serve article JSON through Vite development middleware, reading current source data rather than requiring production output.
- Correct the Oat gluten-free alt text. Remove unsupported medical/legal assurances, regional trend claims and caffeine/brewing generalizations from the three newly added bilingual articles; retain approved product facts and URLs.
- Strengthen gates: inspect visible article markup, verify zero pointer-driven React commits with a working language-change positive control, decode images during full-page traversal and article navigation, and exercise failed/malformed responses plus recovery in a real browser.

### Verification

- `npm run check:perf`: build (60 routes), pointer, image, visible-body/bundle and browser article checks pass.
- Browser checks: EN/TH, desktop and mobile with reduced motion; production SSR/hydration and plain Vite development; failed navigation, retry, malformed data, back/forward and language toggle pass.
- Search-link, SEO-foundation, analytics, blog-fact and modal checks pass.
- Local Wrangler: all 60 known routes and slash redirects pass; 14 missing paths return true 404 for GET/HEAD and navigation requests.
- Pointer workload: zero commits on all five routes; language-change control proves the production commit hook is active.
- Full blog traversal plus article navigation requests 1,733,236 image-body bytes in each language, with no original multi-megabyte JPEG requests. This includes below-fold images and is not initial viewport transfer size.

### Saved before/after measurements

`docs/performance-scroll-before.json` and `docs/performance-scroll-results.json` each contain 30 runs: five routes × two profiles × three cold loads. Baseline was built from a scratch archive of the pinned commit; the user's working tree was not reset. Both use `scripts/measure-scroll.py` against Vite production preview. Desktop: 1440×900/native CPU and network. Mobile: 390×844, 4× CPU slowdown, 1.6 Mbps down and 150 ms latency. Analytics blocked; fresh browser contexts with cache disabled.

| Throttled-mobile route | Before median LCP | After median LCP |
| --- | ---: | ---: |
| Home | 2,652 ms | 2,440 ms |
| EN blog | 888 ms | 876 ms |
| TH blog | 1,032 ms | 1,036 ms |
| EN sample article | 3,296 ms | 3,288 ms |
| TH sample article | 2,436 ms | 2,412 ms |

All measured scripted scrolls reached the bottom without page errors or horizontal overflow. Median per-run p95 frame interval was about 16.7–16.8 ms in both revisions; no long tasks were observed during those scroll windows. These results establish no observed regression, **not a significant additional speedup** over the already-optimized baseline. The baseline had missing visible SSR; its article timings do not establish correctness.

Repeat: start `npm run preview -- --host 127.0.0.1`, then `python3 scripts/measure-scroll.py http://127.0.0.1:4173 OUTPUT.json`. Requires installed Python Playwright and Chrome. Development regression check: `python3 scripts/check-article-loading.py --origin http://127.0.0.1:5173` against `npm run dev`.

Limitations at this stage: synthetic scrolling is not physical-device FPS or field INP. Recorded resource bytes exclude the HTML document and may omit cross-origin sizes; image gates separately measure response bodies. The layout-shift sum is not canonical session-window CLS. EN article mobile LCP was about 3.3 seconds; see the next measured iteration below. No claim of real-device or production-site verification; no commit, push or deployment.

## Loading and navigation iteration — 2026-09-28

Two read-only agents reviewed loading and scrolling; findings were independently checked before changes. A separate three-run mobile trace identified the sample article's Moji Yogurt hero as its LCP element. A smaller derivative now serves at widths up to 640px, while the original remains unchanged for larger screens. Image body size: 130,916 → 40,070 bytes. The derivative was visually inspected. Generated the two missing smoothie WebP sources without replacing their JPEG originals; a static gate now checks all local article image variants exist.

Same-harness local mobile measurements (Python static server, no compression; not directly comparable to earlier Vite-preview numbers):

| Language | Before LCP samples (ms) | After samples (ms) | Median before → after |
| --- | --- | --- | --- |
| EN | 3588, 3588, 3612 | 2156, 2180, 2144 | 3588 → 2156 ms |
| TH | 3284, 3284, 3248 | 2284, 2256, 2264 | 3284 → 2264 ms |

Latest detailed resource/LCP output: `docs/performance-lcp-trace.json`; earlier samples above are preserved from the actual pre-change tool output. These are local lab improvements, not a field guarantee.

Navigation fixes: preserve blog search/category state across article visits; focus the article heading without scrolling; respect reduced-motion preference for the catalog CTA. Existing instant route positioning is retained. `npm run check:scroll` now verifies destination body/focus, filter retention, and catalog motion choice across EN/TH, mobile/desktop and both motion preferences. All eight combinations passed. One combined run exceeded its timeout; the isolated rerun passed without code changes.

At that iteration, build, pointer/image/bundle gates, article recovery/hydration checks, SEO/search/analytics/modal checks and `git diff --check` passed. No new dependency, font changes or further route splitting. The remaining reading-position and hover checks are completed below.

## Final local acceptance — 2026-09-28

- Reproduced deep-reading jumps on Back and language switches with delayed JSON responses in EN/TH at 390px and 1440px widths. Retain only visited article bodies in page-lifetime memory, validate both languages before retention, and disable article scroll anchoring. This avoids collapsing the article to a short loader during revisits; no eager fetch of the full collection or persistent storage.
- The new `scripts/check-reading-position.py` initially failed all four cases. It now restores the exact tested positions (2386, 2373, 2149 and 2041px) on both Back and language switching.
- Reduced-motion disables movement/transitions on featured/blog/article-navigation cards and decorative pearl hover. Real browser hover checks cover both motion preferences, languages and viewport widths; decorative pearl CSS is checked using an isolated DOM fixture.
- `npm run check:perf` now includes article recovery, route/motion and reading-position gates. Full suite passed after the final source changes, plus search, SEO, analytics, modal, whitespace and local Wrangler 404 checks (60 known routes, 14 missing paths).
- User authorized commit and production deployment. Commit/deployment results must be verified separately; physical-phone verification is not claimed by desktop mobile emulation.
