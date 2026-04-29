# BlessMe Thailand — Wholesale Website

Official website for **BlessMe (Thailand) Co., Ltd.**
Specialty food wholesaler · Popping boba · Bangkok, Thailand

**Live site:** https://blessmethailand.com  
**Repository:** https://github.com/metasith-blessme/blessme-website

---

## About the Business

BlessMe (Thailand) discovers, imports, and distributes specialty food products to:
- Cafés and coffee shops
- Restaurants and food-service operators
- Dessert brands and bubble tea shops
- Retailers

Current product range: **6 signature popping boba flavors**
- Barley · Oat · Red Bean · Water Chestnut · Cheese · Osmanthus
- Pack size: 3.3 kg tub · Shelf life: 12 months · Stock in Bangkok

---

## Quick Start

No installation, no build step. Just open the file:

```bash
open index.html
# or drag index.html into any browser
```

Or serve locally:
```bash
npx serve .
# then open http://localhost:3000
```

---

## What's Inside

| File | Purpose |
|------|---------|
| `index.html` | The entire website — HTML + CSS + React JSX (bilingual EN/TH + Web3Forms contact) |
| `assets/og-image.png` | Social sharing image (1200×630px for Facebook, LINE, Twitter) |
| `assets/logo-full.png` | BlessMe logo |
| `assets/products/` | 6 product photos (WebP + PNG/JPG fallbacks for mobile performance) |
| `robots.txt` | Search engine instructions |
| `sitemap.xml` | Page structure for Google Search |
| `CLAUDE.md` | Technical instructions for Claude Code (for future AI sessions) |
| `PLAN.md` | Deployment checklist and future roadmap |

### Pages

- **Products** — hero section, 6 product cards, trust bar (stats)
- **Solutions** — 6-step "how we work" framework
- **About us** — company story + full contact info
- **Blog / Journal** — 6 articles with full reading view
- **FAQ** — 7 frequently asked questions

---

## Status: Launch-Ready ✅

This site is **fully functional and ready to go live**:
- ✅ All content complete (6 products, 6 articles, 7 FAQs)
- ✅ Mobile responsive (tested 320px–1920px)
- ✅ Bilingual EN/TH with language toggle
- ✅ SEO optimized (sitemap, robots.txt, OG tags)
- ✅ Images optimized (WebP + fallbacks, 87-94% size reduction)
- ✅ Contact form ready (Web3Forms integration)
- ✅ WCAG accessible

## How to Deploy

See `PLAN.md` for the full step-by-step. Quick version:

1. **GitHub**: Push this folder to `github.com/metasith-blessme/blessme-website`
2. **Cloudflare Pages** (free hosting): Connect the repo, auto-deploys on every push
3. **Domain**: Buy `blessmethailand.com` via Cloudflare Registrar (~$11/year)
4. **Go live**: Add custom domain in Cloudflare Pages — SSL automatic
5. **Contact form**: Already working (sends to Blessme.team@gmail.com via Web3Forms)

---

## How to Edit Content

### Change product info
Edit the `PRODUCTS` array (~line 430 in index.html):
```js
{ id: 'barley', name: 'Barley', flavor: 'Toasty · Nutty · Refined',
  note: 'Your description here...' }
```

### Add a blog article
Add to the `ARTICLES` array (~line 450 in index.html):
```js
{
  id: 'my-article',
  title: 'Article title',
  excerpt: 'Short summary...',
  date: 'May 1, 2026',
  read: '5 min read',
  cat: 'Category',
  author: 'BlessMe Team',
  cover: 'linear-gradient(140deg, #38b6ff, #0c2a3d)',
  body: [
    ['p', 'First paragraph...'],
    ['h2', 'Section heading'],
    ['p', 'More content...'],
  ],
}
```

### Change contact info
Search for `Blessme.team@gmail.com` or `82-896-5199` in index.html.

---

## Tech Stack

- **React 18** (production CDN, no npm install needed)
- **Babel Standalone** (JSX compiled in browser at runtime)
- **Pure CSS** with design tokens (CSS variables in `:root`)
- **Google Fonts**: Fraunces · Instrument Serif · Inter · JetBrains Mono
- **Web3Forms** (contact form, free tier: 250 submissions/month)
- **WebP images** (87-94% smaller) with PNG/JPG fallbacks
- **Cloudflare Pages** (hosting + CDN + SSL, all free)
- **Bilingual** (EN/TH language toggle, localStorage persistence)

---

## Contact

- Email: Blessme.team@gmail.com
- Phone: +66 (0) 82-896-5199
- LINE: @591dzhsr
- Instagram: blessme_thailand
- Facebook: @BlessMe Thailand

---

*Built with Claude Code · BlessMe (Thailand) Co., Ltd.*
