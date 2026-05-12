# Performance Baseline Tracking

> Track Core Web Vitals, Lighthouse scores, and performance metrics over time

## Current Baseline (2026-05-12)

### Core Web Vitals
| Metric | Value | Status | Target |
|--------|-------|--------|--------|
| LCP (Largest Contentful Paint) | — | TBD | < 2.5s |
| FID (First Input Delay) | — | TBD | < 100ms |
| CLS (Cumulative Layout Shift) | — | TBD | < 0.1 |
| TTFB (Time to First Byte) | — | TBD | < 600ms |

### Lighthouse Scores
| Category | Score | Target |
|----------|-------|--------|
| Performance | — | > 90 |
| Accessibility | — | > 90 |
| Best Practices | — | > 90 |
| SEO | — | > 90 |

### Network Metrics
| Metric | Value | Status |
|--------|-------|--------|
| Total Page Size | — | — |
| JavaScript Size | — | — |
| CSS Size | — | — |
| Image Size | — | — |
| Cache Hit Ratio | — | Target: > 70% |

---

## How to Measure

### Option 1: Google PageSpeed Insights
1. Go to: https://pagespeed.web.dev
2. Enter: `https://blessmethailand.com`
3. Record scores for both Desktop and Mobile
4. Update table below

### Option 2: Lighthouse CLI
```bash
npm install -g lighthouse
lighthouse https://blessmethailand.com --output-path=report.html
```

### Option 3: Local Performance API
```javascript
import { getPerformanceData } from './src/lib/web-vitals';
const data = getPerformanceData();
console.log(data);
```

### Option 4: Cloudflare Analytics
Dashboard → Analytics → Performance

---

## Performance History

### Week 1 (May 12–18, 2026)

| Date | LCP | FID | CLS | TTFB | Lighthouse | Notes |
|------|-----|-----|-----|------|-----------|-------|
| May 12 | — | — | — | — | — | Baseline: Optimizations deployed |
| May 14 | — | — | — | — | — | |
| May 16 | — | — | — | — | — | |
| May 18 | — | — | — | — | — | |

### Week 2 (May 19–25, 2026)

| Date | LCP | FID | CLS | TTFB | Lighthouse | Notes |
|------|-----|-----|-----|------|-----------|-------|
| May 19 | — | — | — | — | — | |
| May 21 | — | — | — | — | — | |
| May 23 | — | — | — | — | — | |
| May 25 | — | — | — | — | — | |

---

## Performance Improvements Made

### Code Optimizations (2026-05-12)
- ✅ Enhanced Vite minification (terser)
- ✅ Added Web Vitals monitoring
- ✅ Improved asset preloading
- ✅ Added security headers
- ✅ Optimized cache control

### Cloudflare Configuration (Pending)
- ⏳ Auto Minify (CSS, JS, HTML)
- ⏳ Brotli compression
- ⏳ Cache rules (HTML 1h, Assets 1y)
- ⏳ Argo Smart Routing
- ⏳ Image optimization (Polish)

---

## Troubleshooting Guide

### If LCP > 2.5s:
1. Check image sizes with `npm run build`
2. Verify Cloudflare Polish is enabled
3. Enable Argo Smart Routing
4. Check Google PageSpeed Insights for specific recommendations

### If FID > 100ms:
1. Check for long JavaScript tasks
2. Use Lighthouse performance profiler
3. Consider code-splitting in Vite
4. Check for third-party scripts blocking

### If CLS > 0.1:
1. Specify image/embed dimensions
2. Use `font-display: swap` (already done)
3. Avoid dynamic content injection
4. Use Lighthouse Layout Shift Inspector

### If Cache Hit Ratio < 70%:
1. Verify cache rules are created
2. Check `public/_headers` file
3. Enable Tiered Caching
4. Check Cloudflare Analytics dashboard

---

## Next Steps

1. **Week 1**: Measure baseline performance
2. **Week 2**: Verify all Cloudflare settings configured
3. **Week 3**: Review Core Web Vitals in Google Search Console
4. **Month 1**: Full performance audit and optimization review

---

## References

- [Google Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Cloudflare Performance](https://developers.cloudflare.com/speed/)
- [Core Web Vitals Guide](https://developers.google.com/search/docs/guides/core-web-vitals)

---

**Last Updated:** 2026-05-12
**Owner:** BlessMe Web Team
