// Custom events only. These run on a real click or a confirmed form success,
// never because a page loaded.
// Payloads never include form fields, link URLs, query strings or hashes.
export const SHOPEE_URL = 'https://shopee.co.th/blessme_thailand';

function track(name, method, language = document.documentElement.lang, intent = 'contact') {
  try {
    const base = {
      method,
      page_path: window.location.pathname,
      language: language === 'th' ? 'th' : 'en',
    };
    window.gtag?.('event', name, name === 'shopee_click' ? base : {
      ...base,
      contact_method: method,
      contact_intent: intent,
    });
  } catch {
    // Analytics blockers must not interrupt navigation or a successful enquiry.
  }
}

export function trackLead(language) {
  track('generate_lead', 'form', language);
}

// Host check, not a substring: line.me.evil.test must not count as LINE.
function hostIs(hostname, domain) {
  const host = hostname.toLowerCase().replace(/\.$/, '');
  return host === domain || host.endsWith(`.${domain}`);
}

function contactMethod(destination) {
  const lower = destination.toLowerCase();
  if (lower.startsWith('mailto:')) {
    // mailto:?subject=… is the article share sheet, not a lead.
    return lower.slice('mailto:'.length) ? 'email' : null;
  }
  if (lower.startsWith('tel:')) return /\d/.test(destination) ? 'phone' : null;
  let url;
  try {
    url = new URL(destination);
  } catch {
    return null;
  }
  if (hostIs(url.hostname, 'line.me')) return 'line';
  if (hostIs(url.hostname, 'shopee.co.th')) return 'shopee';
  return null;
}

export function initContactTracking() {
  const onClick = (event) => {
    const link = event.target?.closest?.('a[href]');
    const href = link?.getAttribute('href');
    if (!href) return;
    // Match the actual destination, never substring-match an arbitrary hostname.
    const destination = href.split(/[?#]/, 1)[0];
    const method = contactMethod(destination);
    if (!method) return;
    if (method === 'shopee') {
      track('shopee_click', 'shopee', document.documentElement.lang);
      return;
    }
    const requestedIntent = link?.getAttribute('data-contact-intent');
    const intent = ['sample', 'quote'].includes(requestedIntent) ? requestedIntent : 'contact';
    track('contact_click', method, document.documentElement.lang, intent);
  };
  // Capture contact clicks before modal containers stop bubbling.
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
