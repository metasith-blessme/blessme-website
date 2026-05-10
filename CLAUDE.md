# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

Public-facing website for **BlessMe (Thailand) Co., Ltd.** — a specialty food wholesaler distributing premium popping boba to cafés, restaurants, and dessert brands in Thailand. Live at `blessmethailand.com`.

## Commands

```bash
npm run dev       # Vite dev server (hot reload)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 6 |
| Styling | Plain CSS with design tokens + BEM-like classes |
| Fonts | Google Fonts (Fraunces, Instrument Serif, Inter, JetBrains Mono) + local DB Ozone X Med (Thai) |
| Hosting | Cloudflare Workers & Pages (auto-deploy from `main` branch) |
| Domain | blessmethailand.com |
| Repo | github.com/metasith-blessme/blessme-website |
| Contact form | Web3Forms API |

## Architecture

**Single-page app with client-side routing.** All components, data, routing, and meta/schema updaters live in `src/App.jsx` (~1200 lines). No React Router — routing is manual via `window.history.pushState` + `popstate` listener.

```
src/
├── main.jsx              ← ReactDOM.createRoot entry
├── App.jsx               ← ALL components, routing, products data, FAQ data, meta updaters
├── content/
│   └── blog.js           ← ARTICLES array + helper functions (getArticleById, getRelatedArticles, etc.)
└── styles/
    └── index.css          ← All CSS (design tokens in :root, Thai font overrides under [lang="th"])
```

### Key patterns in App.jsx

- **Routing**: `getInitialState()` reads `window.location.pathname` → maps to page via `PATH_TO_PAGE`. Navigation via `goToPage()` which calls `pushState`.
- **Language**: `lang` state (`'en'` | `'th'`). Sets `document.documentElement.lang`. Translation object `T` has `T.en` and `T.th` keys.
- **SEO**: `updateMeta()` and `updateSchema()` run on every route/lang change. They update `<title>`, meta tags, and JSON-LD `<script>` in `<head>`.
- **Products data**: `PRODUCTS` array defined inline in App.jsx (6 SKUs).
- **Blog data**: `ARTICLES` array + helpers imported from `src/content/blog.js`.

### Thai font system

DB Ozone X Med (loaded via `@font-face` from `/assets/DB-Ozone-X-Med.ttf`) has smaller visual metrics than Inter/Fraunces. Two mechanisms handle this:

1. **CSS custom property overrides** under `[lang="th"]` — overrides `--font-display`, `--font-body`, `--font-editorial`, `--font-mono` to use DB Ozone X as primary.
2. **Per-element size overrides** — `[lang="th"] .bm-h1`, `[lang="th"] .bm-body`, etc. with larger `font-size` values, because most elements use hardcoded px sizes rather than CSS variables.

### Bilingual system (English + Thai)

- **Default language**: English (resets to EN on page load; users can toggle to TH via nav button)
- **Translation object `T`**: Lives at top of App.jsx (lines 15–106), structured as `T.en` and `T.th` with identical keys
- **Language state**: Managed in App component via `lang` useState hook
- **DOM language attribute**: `document.documentElement.lang` set to current lang for CSS `:lang` selectors
- **Persistent preference**: User's choice saved to localStorage but resets on page refresh (intentional)

Thai typography is handled by:
- Font overrides: `[lang="th"]` CSS selector switches font family and applies DB Ozone X as primary
- Size adjustments: Lines 112–152 in index.css contain per-element `[lang="th"]` font-size overrides (Thai glyphs need larger px values to match visual weight)

To update translations: Edit both `T.en` and `T.th` keys in App.jsx simultaneously. Test both languages in nav toggle.

### Blog system

Blog content in `src/content/blog.js` supports rich article bodies with block types: `p`, `h2`, `h3`, `quote`, `ul`, `ol`. The `BlogPage` component has search, category filtering, and a featured article hero. `ArticlePage` renders full articles with prev/next navigation.

Each article in the `ARTICLES` array has English and Thai versions (e.g., `title` + `titleTh`, `excerpt` + `excerptTh`). Helper functions like `getArticleById()`, `getRelatedArticles()`, `getArticleSchema()` handle querying and rendering.

## Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `ProductsPage` | Hero + 6-product grid + TrustBar. Default page. |
| `/solutions` | `SolutionsPage` | 6-step framework + dark CTA |
| `/about` | `AboutPage` | Company story + contact form (Web3Forms) |
| `/blog` | `BlogPage` | Featured article + filterable 2-column card grid |
| `/blog/:id` | `ArticlePage` | Full article with related articles + prev/next nav |
| `/faq` | `FAQPage` | 7-question accordion |

## SEO & Meta Tags

`updateMeta()` and `updateSchema()` functions (lines 217–309) run on every route/language change:

- **updateMeta()**: Updates `<title>`, `<meta description>`, `<meta og:*>`, `<meta twitter:*>`, and `<link hreflang>` tags in `<head>`
- **updateSchema()**: Builds and injects JSON-LD schema into `<script id="bm-schema">` for:
  - Organization schema (LocalBusiness)
  - Page-specific schema (WebPage, Product, Article, FAQPage, ItemList)
  - Breadcrumb schema for products and articles

Both functions take `lang` parameter to render localized titles/descriptions. Products get custom meta via `buildProductMeta()`. Articles get meta/schema via helpers in `content/blog.js`.

## Deployment

Cloudflare Workers & Pages auto-deploys on push to `main`.

- **Build command**: `npm run build`
- **Deploy command**: `npx wrangler versions upload`
- **Output directory**: `dist`
- **Node version**: 22 (set via `.nvmrc` and `.node-version`)
- SPA routing handled by wrangler's `not_found_handling: "single-page-application"` in `wrangler.jsonc`

## Component Naming & Styling

All component classes use `.bm-` prefix (BlessMe namespace) with BEM-like structure:

- `.bm-hero` — sections
- `.bm-h1`, `.bm-body`, `.bm-lead` — typography helpers
- `.bm-btn`, `.bm-btn--primary`, `.bm-btn--sm` — button variants
- Modifiers: `.is-open`, `.is-active`, `--sky`, `--lime`, `--inv` (inverted)

CSS is monolithic (`src/styles/index.css`) with design tokens in `:root` (colors, spacing, fonts, shadows, animations). No component-scoped CSS or CSS-in-JS.

## Do Not Change Without Asking

- **Web3Forms key** — `6a29a76e-ace2-44da-8bc4-22c10901684e` (sends to Blessme.team@gmail.com)
- **Contact info** — phone (+66 82-896-5199), email (Blessme.team@gmail.com), LINE (@591dzhsr)
- **Product SKU data** — names, flavors, descriptions, pack size, shelf life
- **Domain names** — `blessmethailand.com` in canonical, OG, robots.txt
- **Brand colours** — CSS custom properties in `:root` (--ci-sky, --ci-sky-deep, etc.)
- **GA4 measurement ID** — `G-M2HGM3SM29` in index.html

## Common Tasks

**Update translations**: Edit both `T.en` and `T.th` keys in App.jsx (lines 15–106). Test with language toggle in nav. Changes auto-sync via hot reload.

**Update product data**: Modify `PRODUCTS` array (lines 139–164). Include both English and Thai variants (e.g., `name` + `nameTh`). Images need both `.webp` and `.png` fallback.

**Add/edit blog articles**: Edit `ARTICLES` array in `src/content/blog.js`. Each article needs English + Thai versions for title, excerpt, category, date, author, and body blocks.

**Update contact form fields**: Form fields in `T.en.formProducts` and `T.th.formProducts`. Form submission via Web3Forms API (no backend needed).

**Adjust Thai typography**: Edit `[lang="th"]` overrides in `index.css` (lines 95–152). Increase font-size for Thai elements to match visual hierarchy of English text.
