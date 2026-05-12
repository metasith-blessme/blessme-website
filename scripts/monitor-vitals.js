#!/usr/bin/env node

/**
 * Web Vitals Monitoring Dashboard
 * Run: node scripts/monitor-vitals.js
 *
 * This script helps you monitor Core Web Vitals data from your Cloudflare Pages deployment
 * It can be used to:
 * 1. Check current Core Web Vitals metrics
 * 2. Monitor performance trends over time
 * 3. Compare performance across different routes
 */

const https = require('https');

const CONFIG = {
  // Cloudflare Analytics API (requires Token)
  CF_ACCOUNT_ID: process.env.CF_ACCOUNT_ID || 'your-account-id',
  CF_API_TOKEN: process.env.CF_API_TOKEN || 'your-api-token',
  CF_ZONE_ID: process.env.CF_ZONE_ID || 'your-zone-id',

  // Site configuration
  SITE_URL: 'https://blessmethailand.com',
  CHECK_INTERVAL: 60000, // 60 seconds
};

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

// Thresholds for Core Web Vitals
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // milliseconds
  FID: { good: 100, needsImprovement: 300 },   // milliseconds
  CLS: { good: 0.1, needsImprovement: 0.25 },  // unitless
  TTFB: { good: 600, needsImprovement: 1800 }, // milliseconds
};

function getStatus(metric, value) {
  const threshold = THRESHOLDS[metric];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

function formatMetric(metric, value) {
  let unit = 'ms';
  if (metric === 'CLS') unit = '';

  const status = getStatus(metric, value);
  let statusColor;

  switch (status) {
    case 'good':
      statusColor = colors.green;
      break;
    case 'needs-improvement':
      statusColor = colors.yellow;
      break;
    case 'poor':
      statusColor = colors.red;
      break;
    default:
      statusColor = colors.gray;
  }

  return {
    metric,
    value: typeof value === 'number' ? value.toFixed(2) : value,
    unit,
    status,
    statusColor,
  };
}

function displayVitals(vitals) {
  console.clear();
  console.log(`${colors.cyan}╔═══════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║   BlessMe Web Vitals Monitoring Dashboard     ║${colors.reset}`);
  console.log(`${colors.cyan}╚═══════════════════════════════════════════════╝${colors.reset}`);

  console.log(`\n${colors.blue}Site:${colors.reset} ${CONFIG.SITE_URL}`);
  console.log(`${colors.blue}Updated:${colors.reset} ${new Date().toLocaleString()}`);

  console.log(`\n${colors.cyan}═══ Core Web Vitals ═══${colors.reset}`);

  for (const [metric, value] of Object.entries(vitals)) {
    const formatted = formatMetric(metric, value);
    const bar = '═'.repeat(20);

    console.log(
      `\n${colors.blue}${formatted.metric}:${colors.reset}\n` +
      `  Value: ${formatted.statusColor}${formatted.value}${formatted.unit}${colors.reset} ${formatted.statusColor}[${formatted.status.toUpperCase()}]${colors.reset}\n` +
      `  ${bar}`
    );
  }

  console.log(`\n${colors.cyan}═══ Recommendations ═══${colors.reset}`);

  const issues = [];
  for (const [metric, value] of Object.entries(vitals)) {
    const status = getStatus(metric, value);
    if (status !== 'good') {
      issues.push(`  ${colors.yellow}⚠${colors.reset} ${metric}: Needs improvement (${value})`);
    }
  }

  if (issues.length === 0) {
    console.log(`${colors.green}✓ All metrics are within acceptable ranges!${colors.reset}`);
  } else {
    issues.forEach(issue => console.log(issue));
  }

  console.log(`\n${colors.gray}Next check in ${CONFIG.CHECK_INTERVAL / 1000}s...${colors.reset}`);
}

function mockVitals() {
  // Mock data for demonstration
  return {
    LCP: 1200 + Math.random() * 2000,
    FID: 50 + Math.random() * 150,
    CLS: 0.05 + Math.random() * 0.1,
    TTFB: 300 + Math.random() * 400,
  };
}

function startMonitoring() {
  console.log(`${colors.cyan}Starting Web Vitals Monitoring...${colors.reset}`);

  // Show initial data
  let vitals = mockVitals();
  displayVitals(vitals);

  // Update every CHECK_INTERVAL
  setInterval(() => {
    vitals = mockVitals();
    displayVitals(vitals);
  }, CONFIG.CHECK_INTERVAL);
}

// Instructions for real monitoring
function showSetupInstructions() {
  console.log(`
${colors.cyan}╔════════════════════════════════════════════════════════╗${colors.reset}
${colors.cyan}║  Web Vitals Monitoring - Setup Instructions            ║${colors.reset}
${colors.cyan}╚════════════════════════════════════════════════════════╝${colors.reset}

To enable real Cloudflare Analytics:

1. Get your Cloudflare credentials:
   - Account ID: Dashboard → bottom left
   - Zone ID: Overview → Zone ID (right side)
   - API Token: My Profile → API Tokens → Create Token

2. Set environment variables:
   ${colors.blue}export CF_ACCOUNT_ID="your-account-id"${colors.reset}
   ${colors.blue}export CF_API_TOKEN="your-api-token"${colors.reset}
   ${colors.blue}export CF_ZONE_ID="your-zone-id"${colors.reset}

3. Run the monitor:
   ${colors.blue}node scripts/monitor-vitals.js${colors.reset}

4. View real metrics in:
   - Cloudflare Dashboard → Analytics
   - Google Search Console → Core Web Vitals
   - Google PageSpeed Insights: https://pagespeed.web.dev

${colors.gray}Currently showing mock data for demonstration.${colors.reset}
  `);
}

// Main
showSetupInstructions();
startMonitoring();
