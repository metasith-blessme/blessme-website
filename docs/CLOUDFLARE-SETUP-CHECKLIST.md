# Cloudflare Setup Checklist

> Complete these steps to fully optimize your BlessMe website on Cloudflare

## Dashboard Configuration

### 1. Speed Optimization

**Location**: Dashboard → Speed → Optimization

- [ ] **Auto Minify**
  - [x] Minify CSS
  - [x] Minify JavaScript
  - [x] Minify HTML

- [ ] **Compression**
  - Set to: Default or Higher
  - Brotli: Auto-enabled

- [ ] **Tiered Caching**
  - [x] Enable (reduces origin load)

- [ ] **Polish** (Image Optimization)
  - [x] Enable
  - Format: Lossy (recommended) or Lossless

### 2. Caching Rules

**Location**: Dashboard → Caching → Cache Rules

**Rule 1: Cache HTML (1 hour)**
```
Name: Cache HTML pages
When: (URI Full matches "^https://blessmethailand.com/$") OR (URI Path matches "^/.*\.html$")
Then:
  - Browser Cache TTL: 1 hour (3600)
  - Edge Cache TTL: 1 hour (3600)
  - Cache Deception Armor: Off
```
- [ ] Created

**Rule 2: Cache Assets (1 year)**
```
Name: Cache static assets long-term
When: URI Path matches "^/assets/.*"
Then:
  - Browser Cache TTL: 1 year (31536000)
  - Edge Cache TTL: 1 year (31536000)
```
- [ ] Created

### 3. Browser Cache TTL

**Location**: Dashboard → Caching → Browser Cache TTL

- [ ] Set to: 1 month (2592000 seconds)

### 4. Argo Smart Routing

**Location**: Dashboard → Speed → Argo Smart Routing

- [ ] Enable Argo (reduces TTFB ~30%)

### 5. SSL/TLS

**Location**: Dashboard → SSL/TLS

- [ ] HTTPS: Always On
- [ ] Automatic HTTPS Rewrites: On

**HSTS**
**Location**: Dashboard → SSL/TLS → Edge Certificates → HSTS

- [ ] Enable HSTS
  - [ ] Max Age: 12 months (31536000)
  - [ ] Include Subdomains: On
  - [ ] Preload: On

### 6. Security Headers

**Location**: Dashboard → Rules → Origin Rules

- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] Strict-Transport-Security: max-age=31536000

_Note: These are already in `public/_headers` file_

### 7. Bot Management

**Location**: Dashboard → Security → Bots

- [ ] Verified Bots: Allow
- [ ] Super Bot Fight Mode: On
  - [ ] Block pattern: Medium
  - [ ] JavaScript Detections: On

---

## Code Verification

- [ ] `vite.config.js` - Enhanced minification settings ✅
- [ ] `index.html` - Web Vitals monitoring script ✅
- [ ] `public/_headers` - Cache & security headers ✅
- [ ] `src/lib/web-vitals.js` - Vitals monitoring module ✅
- [ ] `src/App.jsx` - initWebVitals() called on mount ✅

---

## Deployment

- [ ] Push changes to `main` branch
- [ ] Verify auto-deployment on Cloudflare Pages
- [ ] Check build logs for errors

---

## Testing (After 24-48 hours)

### Google PageSpeed Insights
https://pagespeed.web.dev/?url=blessmethailand.com

- [ ] Desktop Score: > 90
- [ ] Mobile Score: > 85
- [ ] LCP: < 2.5s
- [ ] FID: < 100ms
- [ ] CLS: < 0.1

### Google Search Console
https://search.google.com/search-console

- [ ] Core Web Vitals: All "Good"
- [ ] Mobile Usability: No issues
- [ ] Coverage: All pages indexed
- [ ] Sitemap: Submitted & processed

### Cloudflare Analytics
Dashboard → Analytics → Performance

- [ ] Cache Hit Ratio: > 70%
- [ ] Bandwidth Saved: Visible
- [ ] TTFB: < 600ms

### Lighthouse Report
```bash
npm install -g lighthouse
lighthouse https://blessmethailand.com
```

- [ ] Performance: > 90
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

---

## Ongoing Monitoring

**Daily:**
- [ ] Check Cloudflare Analytics dashboard

**Weekly:**
- [ ] Run `node scripts/monitor-vitals.js`
- [ ] Review Google Search Console Core Web Vitals

**Monthly:**
- [ ] Full Lighthouse audit
- [ ] PageSpeed Insights check
- [ ] Review Cloudflare cache hit ratio

---

## Quick Links

| Resource | URL |
|----------|-----|
| Cloudflare Dashboard | https://dash.cloudflare.com |
| Google Search Console | https://search.google.com/search-console |
| PageSpeed Insights | https://pagespeed.web.dev |
| Google Analytics | https://analytics.google.com |
| BlessMe Website | https://blessmethailand.com |

---

## Support

For issues or questions:

1. Check `docs/SEO-OPTIMIZATION.md` for detailed info
2. Review Cloudflare documentation
3. Check Google Search Console for specific issues
4. Test with Lighthouse locally

---

**Last Updated:** 2026-05-12
**Status:** ✅ All optimizations implemented
