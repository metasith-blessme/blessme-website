# BlessMe Web UI — SEO & Performance Optimization Guide

> Last Updated: 2026-05-12

This guide documents all SEO and performance optimizations implemented for `blessmethailand.com`.

## Table of Contents

1. [Core Web Vitals Monitoring](#core-web-vitals-monitoring)
2. [Cloudflare Configuration](#cloudflare-configuration)
3. [Code-Level Optimizations](#code-level-optimizations)
4. [SEO Implementation](#seo-implementation)
5. [Performance Monitoring](#performance-monitoring)
6. [Testing & Verification](#testing--verification)

---

## Core Web Vitals Monitoring

### What are Core Web Vitals?

Google's Core Web Vitals are three metrics that measure website performance:

| Metric | Meaning | Good | Needs Improvement | Poor |
|--------|---------|------|-------------------|------|
| **LCP** | Largest Contentful Paint (loading performance) | < 2.5s | 2.5–4s | > 4s |
| **FID** | First Input Delay (interactivity) | < 100ms | 100–300ms | > 300ms |
| **CLS** | Cumulative Layout Shift (visual stability) | < 0.1 | 0.1–0.25 | > 0.25 |

### Monitoring Implementation

Web Vitals are automatically tracked via:

1. **Browser Script** (`index.html`):
   - Collects LCP, CLS, FID/INP metrics
   - Sends to Vercel Analytics endpoint
   - Forwards to Google Analytics (gtag)

2. **React Module** (`src/lib/web-vitals.js`):
   - Integrated into App component
   - Tracks TTFB (Time to First Byte)
   - Supports custom endpoints
   - Verbose logging for debugging

3. **Monitoring Dashboard** (`scripts/monitor-vitals.js`):
   - Local CLI tool to monitor metrics
   - Mock data for testing
   - Real data integration with Cloudflare Analytics API

### How to Use the Monitoring Module

```javascript
import { initWebVitals, trackCustomMetric, getPerformanceData } from './lib/web-vitals';

// Initialize on app start
initWebVitals({
  analyticsId: 'G-M2HGM3SM29',
  sendBeacon: true,
  verbose: false,
  customEndpoint: null,
});

// Track custom metrics
trackCustomMetric('custom-metric', 1234, 'Performance');

// Get performance data
const data = getPerformanceData();
console.log(data.ttfb); // Time to First Byte
console.log(data.pageLoad); // Total page load time
```

---

## Cloudflare Configuration

### Essential Settings

#### 1. Speed → Optimization

- ✅ **Auto Minify**: CSS, JavaScript, HTML
- ✅ **Compression**: Brotli (auto-enabled)
- ✅ **Tiered Caching**: Reduces origin load
- ✅ **Polish**: Image optimization (Lossy recommended)

#### 2. Speed → Argo Smart Routing

- ✅ **Enable Argo**: ~30% TTFB improvement
- Uses intelligent routing to avoid congested internet paths

#### 3. Caching → Cache Rules

```
Rule: Cache HTML with 1 hour TTL
When: URI Full matches "^https://blessmethailand.com/$" OR URI Path matches "^/.*\.html$"
Then:
  - Browser Cache TTL: 1 hour (3600 seconds)
  - Edge Cache TTL: 1 hour (3600 seconds)
  - Cache Deception Armor: Off

Rule: Cache static assets for 1 year
When: URI Path matches "^/assets/.*"
Then:
  - Browser Cache TTL: 1 year (31536000 seconds)
  - Edge Cache TTL: 1 year (31536000 seconds)
```

#### 4. SSL/TLS

- ✅ **HTTPS**: Always On
- ✅ **HSTS**: Enable (12 months, include subdomains, preload)
- ✅ **Automatic HTTPS Rewrites**: On

#### 5. Security → Bots

- ✅ **Verified Bots**: Allow
- ✅ **Super Bot Fight Mode**: ON (Medium setting)
- ✅ **JavaScript Detections**: On

#### 6. Browser Cache TTL

- **Setting**: 1 month (2592000 seconds)
- Reduces server load by caching in browsers

---

## Code-Level Optimizations

### Build Optimization (vite.config.js)

```javascript
build: {
  minify: 'terser',           // Advanced JS minification
  terserOptions: {
    compress: { drop_console: true } // Remove console logs
  },
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'] // Split bundle
      }
    }
  },
  cssMinify: true,            // Minify CSS
  chunkSizeWarningLimit: 1000 // Warn if chunks > 1MB
}
```

### Asset Loading (index.html)

```html
<!-- Performance hints -->
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />

<!-- Preload critical resources -->
<link rel="preload" as="image" href="/assets/logo-full.png" fetchpriority="high" />
<link rel="preload" as="style" href="/src/styles/index.css" />
```

### Cache Control Headers (public/_headers)

```
# HTML pages - short TTL
/index.html
  Cache-Control: public, max-age=3600, must-revalidate

# Static assets - long TTL
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Security headers
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## SEO Implementation

### Meta Tags & Schema

All pages have:

- ✅ **Meta Description**: Unique per page
- ✅ **Open Graph Tags**: Social sharing (og:title, og:description, og:image)
- ✅ **Hreflang**: Bilingual EN/TH
- ✅ **Canonical**: Prevents duplicate content issues
- ✅ **JSON-LD Schema**: LocalBusiness, Products, Articles, FAQ

### Sitemap & Robots

- ✅ **Sitemap**: `public/sitemap.xml` (auto-generated)
  - Main pages (6)
  - Product pages (6 SKUs)
  - Blog articles (6 articles)
  - Proper `lastmod` and `priority` tags

- ✅ **Robots.txt**: `robots.txt`
  - Allows all crawlers
  - Links to sitemap

### Structured Data

JSON-LD schemas automatically updated for:

- **Organization**: LocalBusiness type with contact info
- **Products**: Each SKU with description, price, image
- **Articles**: Blog posts with author, date, content
- **FAQPage**: FAQ accordion with Q&A pairs
- **BreadcrumbList**: Navigation path for products/articles

### Translation Management

Bilingual support via `T` object in App.jsx:

```javascript
const T = {
  en: { /* English strings */ },
  th: { /* Thai strings */ }
};

// Language switching
<button onClick={() => setLang(lang === 'en' ? 'th' : 'en')}>
  {lang === 'en' ? 'ไทย' : 'English'}
</button>

// Hreflang tags auto-generated for each language
```

---

## Performance Monitoring

### Google Search Console

1. Go to: [Google Search Console](https://search.google.com/search-console)
2. Select domain: `blessmethailand.com`
3. Monitor:
   - **Core Web Vitals**: Real user data
   - **Mobile Usability**: Issues with mobile experience
   - **Coverage**: Crawl errors, indexed pages
   - **Performance**: Queries, clicks, impressions

### Google PageSpeed Insights

Test at: https://pagespeed.web.dev/?url=blessmethailand.com

Metrics measured:
- Core Web Vitals
- Lighthouse Score
- Performance opportunities

### Cloudflare Analytics

Dashboard → Analytics → Performance

Monitor:
- **Cache Hit Ratio**: Should be 70–90%
- **Bandwidth Saved**: Shows Cloudflare's caching benefit
- **TTFB**: Time to First Byte
- **Country traffic**: Geographic distribution

### Local Monitoring

Run the monitoring dashboard:

```bash
node scripts/monitor-vitals.js
```

Output shows:
- Current LCP, FID, CLS, TTFB
- Status (Good/Needs Improvement/Poor)
- Recommendations for improvement

---

## Testing & Verification

### Before Deploying Changes

1. **Build locally**
   ```bash
   npm run build
   npm run preview
   ```

2. **Test Web Vitals**
   ```bash
   npm install -g lighthouse
   lighthouse https://localhost:5173
   ```

3. **Check bundle size**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

### After Deploying to Cloudflare

1. **Wait 24–48 hours** for data to accumulate
2. **Check PageSpeed Insights**: https://pagespeed.web.dev
3. **Check Google Search Console**: Core Web Vitals report
4. **Monitor Cloudflare Analytics**: Cache hit ratio, TTFB

### Expected Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| **LCP** | < 2.5s | — |
| **FID** | < 100ms | — |
| **CLS** | < 0.1 | — |
| **TTFB** | < 600ms | — |
| **Cache Hit Ratio** | > 70% | — |
| **Lighthouse Score** | > 90 | — |

---

## Troubleshooting

### High LCP (> 2.5s)

**Causes:**
- Large images not optimized
- Slow server response (TTFB)
- Render-blocking resources

**Solutions:**
- Enable Cloudflare Polish (image optimization)
- Use WebP format + fallbacks
- Enable Argo Smart Routing
- Preload critical resources

### High CLS (> 0.1)

**Causes:**
- Unoptimized ads or embeds
- Web fonts loading late
- Dynamically injected content

**Solutions:**
- Specify image/embed dimensions
- Use `font-display: swap`
- Avoid inserting content above the fold

### Poor Cache Hit Ratio (< 70%)

**Causes:**
- Cache rules not configured
- HTML has `Cache-Control: no-cache`
- Too many unique URLs

**Solutions:**
- Create cache rules for HTML and assets
- Enable Tiered Caching
- Use URL parameters wisely

---

## Further Reading

- [Google Web Vitals Guide](https://web.dev/vitals/)
- [Cloudflare Performance Guide](https://developers.cloudflare.com/speed/)
- [Cloudflare Caching Rules](https://developers.cloudflare.com/cache/concepts/cache-control/)
- [JSON-LD Structured Data](https://schema.org/)
- [React Performance Tips](https://react.dev/reference/react/memo)

---

## Changelog

| Date | Change |
|------|--------|
| 2026-05-12 | Initial SEO & performance optimization setup |
| — | — |
