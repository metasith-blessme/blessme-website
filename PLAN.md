# PLAN.md — BlessMe Website Deployment & Roadmap

## Project Goal

Launch `blessmethailand.com` as a professional B2B wholesale website for BlessMe (Thailand) Co., Ltd.
Target audience: cafés, restaurants, dessert brands, retailers in Thailand.

---

## Phase 1 — Launch (Deploy to live domain) ✅ READY NOW

### Step 1: Push to GitHub

```bash
cd /Users/metasithjumpatip/Desktop/Blessme/blessme-web-ui
git init
git add .
git commit -m "feat: initial BlessMe website"
git remote add origin https://github.com/metasith-blessme/blessme-website.git
git branch -M main
git push -u origin main
```

Repository: `github.com/metasith-blessme/blessme-website`
GitHub account: `metasith-blessme` (Metasith@gmail.com)

### Step 2: Deploy on Cloudflare Pages

1. Go to dash.cloudflare.com → sign up with Metasith@gmail.com
2. Workers & Pages → Create → Pages → Connect to Git
3. Select `metasith-blessme/blessme-website`
4. Build settings:
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: /
5. Deploy → live at `blessme-website.pages.dev`

### Step 3: Buy domain blessmethailand.com

- Cloudflare Registrar → Domain Registration → blessmethailand.com
- Cost: ~$10–12 USD/year (at-cost, no markup)

### Step 4: Connect domain

- Cloudflare Pages → project → Custom domains → blessmethailand.com
- DNS set automatically (since domain is at Cloudflare)
- SSL auto-provisioned (~5 min)

**Result:** Site live at https://blessmethailand.com, auto-deploys on every git push.

---

## Phase 2 — Improve (Post-launch optimization) ✅ COMPLETE

### 2A: OG image ✅
- ✅ Created `assets/og-image.png` (1200×630px)
- ✅ Shows: BlessMe logo circle + "Specialty Food Wholesale" + flavor pills
- ✅ Used by Facebook, LINE, Twitter when link is shared
- ✅ Meta tags ready in `<head>`

### 2B: Image optimization ✅
- ✅ All 6 products converted to WebP (87-94% size reduction)
- ✅ `<picture>` tags with WebP source + PNG/JPG fallback
- ✅ Modern browsers use WebP (faster) · older browsers use PNG/JPG
- ✅ Barley: 1.9 MB → 121 KB | Oat: 1.6 MB → 95 KB | etc.

### 2C: Contact form ✅
- ✅ Web3Forms integrated (free, 250 submissions/month)
- ✅ Form POSTs to Web3Forms API → emails Blessme.team@gmail.com
- ✅ Access key added (line 944 in index.html)
- ✅ Live on About us page (under "Request a wholesale quote")

### 2D: Google Search Console ⏳
- ✅ Meta tag placeholder added (line ~30 in index.html)
- ⏳ **User action**: Get GSC verification code at search.google.com/search-console and paste into meta tag

---

## Phase 3 — Analytics & Growth (Week 2–4)

### 3A: Cloudflare Web Analytics (free, already included)
- Cloudflare Dashboard → Analytics → Web Analytics
- Add 1 script tag to index.html
- Shows: visitors, page views, countries, top pages
- Privacy-first, no cookies, no GDPR issues

### 3B: Google Analytics 4 (optional, more detailed)
- GA4 shows user behavior, time-on-page, scroll depth
- Add gtag.js snippet to index.html
- Connect to Google Search Console for full picture

### 3C: LINE Notify for lead alerts
- When someone clicks "Request wholesale quote", send LINE notification
- Requires a simple Cloudflare Worker (serverless function, free tier)
- Alert appears on phone instantly

---

## Phase 4 — Content & SEO (Month 2) ✅ COMPLETE

### 4A: Blog content strategy ✅
- ✅ 6 articles currently live
- 📅 **Future**: Add Thai-language article versions
- 📅 **Future**: Recipe ideas using BlessMe products
- 📅 **Future**: "How to store popping boba" practical guide
- 📅 **Future**: Partner spotlight features

### 4B: Thai-language version ✅
- ✅ Full language toggle (TH / EN) in Nav
- ✅ Translation object `T` with 100+ UI strings (Nav, hero, products, FAQ, footer)
- ✅ Language preference saved to localStorage (persists on refresh)
- ✅ Blog articles currently EN-only (can be translated by adding `titleTh`, `bodyTh` fields)
- ✅ Thai language improves SEO for Thai search terms

### 4C: SEO files ✅
- ✅ `sitemap.xml` created (5 pages with priorities)
- ✅ `robots.txt` created (allow all + sitemap pointer)
- ✅ Canonical URL: `https://blessmethailand.com/`
- ✅ OG tags: title, description, image (1200×630)
- ✅ Twitter Card tags

---

## Phase 5 — Partner Portal (Future, when needed)

- Password-protected partner login
- Download product spec sheets (PDF)
- View order history / reorder
- Options: Next.js app (already have quotation-app skills), Supabase auth

---

## Status Tracker (As of 2026-04-29)

| Item | Status | Notes |
|------|--------|-------|
| OG image | ✅ DONE | 1200×630 PNG created at `assets/og-image.png` |
| WebP images | ✅ DONE | All 6 products converted, 87-94% size reduction |
| Contact form | ✅ DONE | Web3Forms integrated, key added (6a29a76e-...) |
| sitemap.xml | ✅ DONE | 5 URLs listed with priorities |
| robots.txt | ✅ DONE | Created with sitemap pointer |
| Thai/EN language | ✅ DONE | Full translation object, language toggle in Nav |
| Google Search Console | ✅ DONE | Meta tag placeholder added (awaiting user GSC code) |
| Codebase audit | ✅ DONE | All 10 issues fixed (2 critical, 5 high, 4 medium, 1 low) |
| Web3Forms key | ✅ DONE | Added to ContactForm (line 944) |
| **Ready to deploy** | ✅ YES | Push to GitHub → Cloudflare Pages → blessmethailand.com |

---

## Cost Summary

| Item | Cost | Frequency |
|------|------|-----------|
| Domain (blessmethailand.com) | ~$11 USD | Per year |
| Cloudflare Pages hosting | FREE | - |
| Cloudflare Analytics | FREE | - |
| Web3Forms contact form | FREE | Up to 250/month |
| Google Search Console | FREE | - |
| **Total** | **~$11/year** | |
