/**
 * Lightweight first-hide LCP/CLS diagnostics, NOT a canonical field CWV report.
 * No FID-as-INP: INP requires the full interaction lifecycle, not first-input delay.
 * Use Search Console > Core Web Vitals (CrUX, rolling 28-day field data) for
 * real LCP/INP/CLS assessment, split mobile/desktop; insufficient data is unknown.
 * BFCache/prerender lifecycles are not measured here. Adopt the official web-vitals
 * package if full client-side CWV collection is approved. No manual pageviews.
 * initWebVitals({ sendBeacon: true, verbose: false }) returns cleanup.
 */
export const initWebVitals = ({ sendBeacon = true, verbose = false } = {}) => {
  const observers = [];
  let lcp;
  let cls = 0;
  let session = 0;
  let first;
  let last;
  let stopped = false;
  const send = (name, value) => {
    if (verbose) console.log(`[Web Vitals diagnostic] ${name}: ${value}${name === 'CLS' ? '' : 'ms'}`);
    try {
      if (sendBeacon) window.gtag?.('event', `web_vitals_${name.toLowerCase()}`, {
        value,
        page_path: window.location.pathname,
        language: document.documentElement.lang === 'th' ? 'th' : 'en',
      });
    } catch { /* Analytics must never interrupt the page lifecycle. */ }
  };
  const observe = (type, collect) => {
    try {
      const observer = new window.PerformanceObserver(list => collect(list.getEntries()));
      observer.observe({ type, buffered: true });
      observers.push({ observer, collect, type });
    } catch { /* Unsupported metric: do not invent a measurement. */ }
  };
  if ('PerformanceObserver' in window) {
    observe('largest-contentful-paint', entries => {
      const entry = entries[entries.length - 1];
      if (entry) lcp = entry.startTime;
    });
    observe('layout-shift', entries => {
      for (const entry of entries) {
        if (entry.hadRecentInput) continue;
        if (last !== undefined && entry.startTime - last < 1000 && entry.startTime - first < 5000) {
          session += entry.value;
        } else {
          first = entry.startTime;
          session = entry.value;
        }
        last = entry.startTime;
        cls = Math.max(cls, session);
      }
    });
  }
  const cleanup = () => {
    stopped = true;
    observers.forEach(({ observer }) => observer.disconnect());
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pagehide', report);
  };
  const report = () => {
    if (stopped) return;
    for (const { observer, collect } of observers) collect(observer.takeRecords());
    if (lcp !== undefined) send('LCP', lcp);
    if (observers.some(({ type }) => type === 'layout-shift')) send('CLS', cls);
    cleanup();
  };
  const onVisibility = () => { if (document.visibilityState === 'hidden') report(); };
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', report);
  return cleanup;
};
