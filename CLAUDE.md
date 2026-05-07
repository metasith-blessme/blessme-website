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

### Blog system

Blog content in `src/content/blog.js` supports rich article bodies with block types: `p`, `h2`, `h3`, `quote`, `ul`, `ol`. The `BlogPage` component has search, category filtering, and a featured article hero. `ArticlePage` renders full articles with prev/next navigation.

## Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `ProductsPage` | Hero + 6-product grid + TrustBar. Default page. |
| `/solutions` | `SolutionsPage` | 6-step framework + dark CTA |
| `/about` | `AboutPage` | Company story + contact form (Web3Forms) |
| `/blog` | `BlogPage` | Featured article + filterable 2-column card grid |
| `/blog/:id` | `ArticlePage` | Full article with related articles + prev/next nav |
| `/faq` | `FAQPage` | 7-question accordion |

## Deployment

Cloudflare Workers & Pages auto-deploys on push to `main`.

- **Build command**: `npm run build`
- **Deploy command**: `npx wrangler versions upload`
- **Output directory**: `dist`
- **Node version**: 22 (set via `.nvmrc` and `.node-version`)
- SPA routing handled by wrangler's `not_found_handling: "single-page-application"` in `wrangler.jsonc`

## Do Not Change Without Asking

- **Web3Forms key** — `6a29a76e-ace2-44da-8bc4-22c10901684e` (sends to Blessme.team@gmail.com)
- **Contact info** — phone (+66 82-896-5199), email (Blessme.team@gmail.com), LINE (@591dzhsr)
- **Product SKU data** — names, flavors, descriptions, pack size, shelf life
- **Domain names** — `blessmethailand.com` in canonical, OG, robots.txt
- **Brand colours** — CSS custom properties in `:root` (--ci-sky, --ci-sky-deep, etc.)
- **GA4 measurement ID** — `G-M2HGM3SM29` in index.html
