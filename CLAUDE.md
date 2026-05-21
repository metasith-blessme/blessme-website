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
| Contact form | Web3Forms API

## Architecture

**Single-page app with modular client-side routing.** Fully decoupled modular structure dividing data constants, reusable layout components, pages, utility libraries, and the main App orchestrator. No React Router — custom routing is manual via standard `window.history.pushState` triggers + a `popstate` listener.

```
src/
├── main.jsx              ← ReactDOM.createRoot entry
├── App.jsx               ← Sleek state orchestrator & layout wrapper (~130 lines)
├── components/           ← Reusable UI Elements
│   ├── ContactForm.jsx   ← Web3Forms contact form
│   ├── Footer.jsx        ← Corporate site footer
│   ├── Modal.jsx         ← Specifications detail overlays & B2B mailto quote generator
│   ├── Navbar.jsx        ← Bilingual header navigation and mobile drawer toggler
│   ├── ProductCard.jsx   ← Popping Boba showcase card wrapped in React.memo
│   └── TrustBar.jsx      ← Certification and milestone trust meters
├── constants/            ← Static Data Constants
│   ├── faq.js            ← Localized collapsible accordions (FAQS_EN / FAQS_TH)
│   ├── products.js       ← Popping Boba product specifications & meta (PRODUCTS)
│   └── translations.js   ← Localized bilingual translation dictionaries (T)
├── content/              ← Custom Blog Data
│   └── blog.js           ← Articles database array (ARTICLES) & rendering helpers
├── lib/                  ← Core Utilities & Side Effects
│   ├── routing.js        ← Path-to-page mappings and state hydrator (getInitialState)
│   ├── seo.js            ← Meta tags updaters (updateMeta) and JSON-LD schema injectors (updateSchema)
│   └── web-vitals.js     ← Core Web Vitals monitoring setup
├── pages/                ← Individual Layout Views
│   ├── AboutPage.jsx     ← Company milestones & contacts page
│   ├── ArticlePage.jsx   ← Rich blog post layout rendering engine
│   ├── BlogPage.jsx      ← Articles filtering, searching, and cards list page
│   ├── FAQPage.jsx       ← Collapsible accordions page
│   ├── ProductsPage.jsx  ← Boba catalogue grids and call-to-actions
│   └── SolutionsPage.jsx ← 6-stage wholesale supply framework page
└── styles/
    └── index.css         ← Monolithic stylesheet (BEM class variables and lang="th" sizing overrides)
```

### Key modular patterns

- **Routing**: Hydrated via `getInitialState()` inside `src/lib/routing.js` which reads `window.location.pathname` → maps path to page name via `PATH_TO_PAGE`. Navigation is driven by `goToPage()` in `App.jsx` which pushes history state updates.
- **Language**: Bilingual state managed in the main App (`lang` state `'en'` | `'th'`). Side effects automatically update `document.documentElement.lang` to sync localized CSS typography adjustments.
- **SEO**: Side effects run `updateMeta()` and `updateSchema()` inside `src/lib/seo.js` on every language toggle or routing event, updating `<title>`, metadata, and JSON-LD structured schemas.
- **Static Assets**: Products arrays live in `src/constants/products.js`. Translated text strings live in `src/constants/translations.js`.
- **Blog indexing**: Renders dynamic lists and handles text search/filtering queries in `src/pages/BlogPage.jsx` based on the data imported from `src/content/blog.js`.

### Thai font system

DB Ozone X Med (loaded via `@font-face` from `/assets/DB-Ozone-X-Med.ttf`) has smaller visual metrics than Inter/Fraunces. Two mechanisms handle this:

1. **CSS custom property overrides** under `[lang="th"]` — overrides `--font-display`, `--font-body`, `--font-editorial`, `--font-mono` to use DB Ozone X as primary.
2. **Per-element size overrides** — `[lang="th"] .bm-h1`, `[lang="th"] .bm-body`, etc. with larger `font-size` values in `src/styles/index.css`.

### Bilingual system (English + Thai)

- **Default language**: English (resets to EN on page load; users can toggle to TH via nav button)
- **Translation object `T`**: Lives in `src/constants/translations.js`, structured as `T.en` and `T.th` with identical keys.
- **Language state**: Managed in `App.jsx` via `lang` useState hook.
- **DOM language attribute**: `document.documentElement.lang` automatically kept synced.
- **Persistent preference**: Saved to localStorage but resets on page refresh (intentional).

---

## Deployment

Cloudflare Workers & Pages auto-deploys on push to `main`.

- **Build command**: `npm run build`
- **Deploy command**: `npx wrangler versions upload` (used for manual CLI previews)
- **Output directory**: `dist`
- **Node version**: 22 (set via `.nvmrc` and `.node-version`)
- SPA routing handled by wrangler's `not_found_handling = "single-page-application"` in `wrangler.toml`

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
