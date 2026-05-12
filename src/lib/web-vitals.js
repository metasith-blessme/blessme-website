/**
 * Web Vitals Monitoring Module
 * Tracks Core Web Vitals (LCP, CLS, FID/INP) and sends to analytics
 *
 * Usage:
 *   import { initWebVitals } from './lib/web-vitals';
 *   initWebVitals({ analyticsId: 'GA_ID', sendBeacon: true });
 */

export const initWebVitals = (options = {}) => {
  const {
    analyticsId = 'G-M2HGM3SM29',
    sendBeacon = true,
    verbose = false,
    customEndpoint = null,
  } = options;

  const vitalsData = {
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  };

  // Helper: Get connection speed
  const getConnectionSpeed = () => {
    if ('connection' in navigator && navigator.connection) {
      return navigator.connection.effectiveType;
    }
    return 'unknown';
  };

  vitalsData.connection = getConnectionSpeed();

  // Helper: Send vitals to endpoint
  const sendVital = (metric) => {
    const payload = {
      ...vitalsData,
      metric: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating || 'unknown',
    };

    if (verbose) {
      console.log(`[Web Vitals] ${metric.name}: ${Math.round(metric.value)}ms (${metric.rating})`);
    }

    // Send to custom endpoint if provided
    if (customEndpoint) {
      navigator.sendBeacon?.(customEndpoint, JSON.stringify(payload));
    }

    // Send to Google Analytics if available
    if (window.gtag && sendBeacon) {
      gtag('event', `web_vitals_${metric.name.toLowerCase()}`, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.name,
      });
    }
  };

  // Initialize observers
  if ('PerformanceObserver' in window) {
    // LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        const metric = {
          name: 'LCP',
          value: lastEntry.renderTime || lastEntry.loadTime,
          rating: lastEntry.renderTime || lastEntry.loadTime < 2500 ? 'good' : 'poor',
        };

        sendVital(metric);
        lcpObserver.disconnect();
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      if (verbose) console.warn('LCP Observer failed:', e);
    }

    // CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries = [];

      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            if (
              entry.startTime - (lastSessionEntry?.startTime || 0) < 1000 &&
              entry.startTime - (firstSessionEntry?.startTime || 0) < 5000
            ) {
              sessionEntries.push(entry);
              sessionValue += entry.value;
            } else {
              sessionEntries = [entry];
              sessionValue = entry.value;
            }
          }
        }

        clsValue = Math.max(clsValue, sessionValue);
      });

      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Report CLS on page hide
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          const metric = {
            name: 'CLS',
            value: clsValue,
            rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
          };

          sendVital(metric);
          clsObserver.disconnect();
        }
      });
    } catch (e) {
      if (verbose) console.warn('CLS Observer failed:', e);
    }

    // FID/INP (First Input Delay / Interaction to Next Paint)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const metric = {
            name: 'FID',
            value: entry.processingDuration,
            rating: entry.processingDuration < 100 ? 'good' : 'poor',
          };

          sendVital(metric);
          fidObserver.disconnect();
          break; // Only report first input
        }
      });

      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      if (verbose) console.warn('FID Observer failed:', e);
    }

    // TTFB (Time to First Byte)
    try {
      const ttfbObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const navigationEntry = entries[0];

        if (navigationEntry) {
          const metric = {
            name: 'TTFB',
            value: navigationEntry.responseStart - navigationEntry.fetchStart,
            rating: (navigationEntry.responseStart - navigationEntry.fetchStart) < 600 ? 'good' : 'poor',
          };

          sendVital(metric);
          ttfbObserver.disconnect();
        }
      });

      ttfbObserver.observe({ type: 'navigation', buffered: true });
    } catch (e) {
      if (verbose) console.warn('TTFB Observer failed:', e);
    }
  }

  if (verbose) {
    console.log('✅ Web Vitals monitoring initialized');
    console.log(`📊 Connection: ${vitalsData.connection}`);
  }
};

// Export utility function to manually track custom metrics
export const trackCustomMetric = (name, value, category = 'Custom') => {
  if (window.gtag) {
    gtag('event', name, {
      value: Math.round(value),
      event_category: category,
    });
  }
};

// Export utility to get current performance data
export const getPerformanceData = () => {
  if (!window.performance || !window.performance.timing) {
    return null;
  }

  const timing = window.performance.timing;
  const navigation = window.performance.navigation;

  return {
    // Core timing metrics
    dns: timing.domainLookupEnd - timing.domainLookupStart,
    tcp: timing.connectEnd - timing.connectStart,
    ttfb: timing.responseStart - timing.fetchStart,
    download: timing.responseEnd - timing.responseStart,
    domInteractive: timing.domInteractive - timing.fetchStart,
    domComplete: timing.domComplete - timing.fetchStart,
    pageLoad: timing.loadEventEnd - timing.fetchStart,

    // Navigation type
    navigationType: navigation.type,
    isReload: navigation.type === 1,
    isBackForward: navigation.type === 2,
  };
};
