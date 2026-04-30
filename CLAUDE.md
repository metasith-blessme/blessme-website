# CLAUDE.md — BlessMe Web UI

This file tells Claude Code everything it needs to know to work on this project.

## What This Project Is

A single-file React SPA (`index.html`) for **BlessMe (Thailand) Co., Ltd.** — a specialty food wholesaler that imports and distributes premium popping boba to cafés, restaurants, and dessert brands in Thailand.

This is the **public-facing wholesale website** for the domain `blessmethailand.com`.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 6 |
| Styling | Plain CSS in `src/styles/index.css` (design tokens + BEM-like classes) |
| Fonts | Google Fonts — Fraunces (display), Instrument Serif (editorial), Inter (body), JetBrains Mono (labels) |
| Hosting | Cloudflare Pages (free tier) |
| Domain | blessmethailand.com |
| Repo | github.com/metasith-blessme/blessme-website |

## File Structure

```
blessme-web-ui/
├── index.html              ← Entry point (no inline CSS/JS)
├── vite.config.js          ← Vite configuration
├── package.json            ← Dependencies (React 18, Vite 6)
├── dist/                   ← Built output (deploy this to Cloudflare Pages)
├── src/
│   ├── main.jsx            ← App entry
│   ├── App.jsx             ← Root component, routing logic
│   ├── styles/
│   │   └── index.css       ← All CSS (migrated from inline <style>)
│   ├── data/
│   │   ├── translations.js  ← T object (EN/TH translations)
│   │   ├── products.js     ← PRODUCTS array
│   │   └── articles.js     ← ARTICLES array
│   └── components/
│       ├── Nav.jsx
│       ├── TrustBar.jsx
│       ├── ProductCard.jsx
│       ├── ProductDetail.jsx
│       ├── ProductsPage.jsx
│       ├── AboutPage.jsx   ← Also contains ContactItem + ContactForm
│       ├── SolutionsPage.jsx
│       ├── BlogPage.jsx
│       ├── ArticlePage.jsx
│       ├── FAQPage.jsx
│       └── Footer.jsx
├── public/
│   └── assets/             ← images (logo, products)
├── robots.txt
├── sitemap.xml
└── CLAUDE.md
```

## Pages (all in index.html)

| Page | Component | Description |
|------|-----------|-------------|
| Products | `ProductsPage` | Hero + 6-product grid + TrustBar. Default page. |
| Solutions | `SolutionsPage` | 6-step framework + dark CTA |
| About us | `AboutPage` | Company story + contact block |
| Blog | `BlogPage` + `ArticlePage` | Featured article + 5-card grid + full article reader |
| FAQ | `FAQPage` | 7-question accordion |

Shared: `Nav`, `Footer`, `ProductDetail` (modal), `TrustBar`, `ContactItem`

## Products (6 SKUs)

| ID | Name | Flavor notes |
|----|------|-------------|
| barley | Barley | Toasty · Nutty · Refined |
| oat | Oat | Creamy · Mellow · Modern |
| redbean | Red Bean | Sweet · Earthy · Heritage |
| chestnut | Water Chestnut | Crisp · Cool · Clean |
| cheese | Cheese | Salty · Rich · Savory-sweet |
| osmanthus | Osmanthus | Floral · Honeyed · Elegant |

Pack size: 3.3 kg tub. Shelf life: 12 months. Storage: cool, dry.

## Brand Colours

```css
--ci-sky:      #38b6ff   /* primary blue */
--ci-sky-deep: #1d6fa8   /* hover/deep */
--ci-sky-ink:  #0c2a3d   /* text on light */
--ci-sky-soft: #e6f4ff   /* page background */
--cream:       #fffdf7   /* card background */
--lime:        #c8d63a   /* brand accent (logo) */
--pink:        #f2768a   /* heart/love accent */
--gold:        #e8a83a   /* spoon accent */
```

## Contact Info (real, do not change without asking)

- Email: Blessme.team@gmail.com
- Phone: +66 (0) 82-896-5199 (คุณจ้า)
- LINE OA: @591dzhsr
- Instagram: blessme_thailand
- Facebook: @BlessMe Thailand

## How to Edit

Since there's no build step, edit `index.html` directly.

- **CSS**: edit the `<style>` block at the top of the file
- **Content**: edit `PRODUCTS` array and `ARTICLES` array (lines ~430–485)
- **Components**: JSX functions start around line 559
- **New page**: add a new function + wire it in `App()` render + add to `Nav` pages array

## Current Status (2026-04-29)

✅ **LAUNCH-READY** — All critical items complete:
- ✅ OG image (1200×630 PNG for social sharing)
- ✅ WebP images (all 6 products, 87-94% size reduction with PNG/JPG fallbacks)
- ✅ Contact form (Web3Forms API integrated, key in place)
- ✅ SEO (sitemap.xml, robots.txt, meta tags, Thai language)
- ✅ Accessibility (ARIA roles, skip links, semantic HTML)
- ✅ Mobile responsive (tested at 320px, 768px, 1920px)
- ✅ Bilingual (EN/TH toggle, full translation object for all UI text)

### Known Limitations (acceptable for v1)

- Babel standalone compiles JSX at runtime (~1s extra on first load) — fine for a content site
- No backend — contact form POST to Web3Forms, quote button opens pre-filled email
- No analytics yet (Cloudflare Web Analytics can be added post-launch)
- Google Search Console verification code needs to be added by user (line ~30)

## Next Steps (Deployment)

See **PLAN.md** for full roadmap. Quick summary:

1. **GitHub push** (from project root):
   ```bash
   git init && git add . && git commit -m "feat: launch"
   git remote add origin https://github.com/metasith-blessme/blessme-website.git
   git branch -M main && git push -u origin main
   ```

2. **Cloudflare Pages** (free hosting):
   - Sign up at dash.cloudflare.com with Metasith@gmail.com
   - Workers & Pages → Create → Pages → Connect to Git → metasith-blessme/blessme-website
   - Framework: None | Build command: (empty) | Output directory: /
   - Deploy → live at blessme-website.pages.dev

3. **Buy domain** (Cloudflare Registrar):
   - blessmethailand.com (~$11 USD/year)
   - Connect in Pages → Custom domains

4. **Post-launch** (optional, see PLAN.md):
   - Add Google Search Console verification code (line ~30)
   - Add Cloudflare Web Analytics (1 script tag)
   - Monitor contact form submissions at web3forms.com

## Do Not Change Without Asking

- **Web3Forms key** (line 944) — `6a29a76e-ace2-44da-8bc4-22c10901684e` (sends to Blessme.team@gmail.com)
- **Contact info** — phone (+66 82-896-5199), email (Blessme.team@gmail.com), LINE (@591dzhsr)
- **Product SKU data** — names, flavors, descriptions, pack size, shelf life
- **Domain names** — `blessmethailand.com` in canonical, OG, robots.txt
- **React CDN versions** — 18.3.1 Babel Standalone (tested, stable)
- **Brand colours** — CSS custom properties in `:root` (--ci-sky, --ci-sky-deep, etc.)
