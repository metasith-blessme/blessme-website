// Custom events only. Verify GA4 Enhanced Measurement before adding pageviews.
// These payloads never include form fields, link URLs, query strings or hashes.
function track(name, method, language = document.documentElement.lang, intent = 'contact') {
  try {
    window.gtag?.('event', name, {
      contact_method: method,
      contact_intent: intent,
      page_path: window.location.pathname,
      language: language === 'th' ? 'th' : 'en',
    });
  } catch {
    // Analytics blockers must not interrupt navigation or a successful enquiry.
  }
}

export function trackLead(language) {
  track('generate_lead', 'form', language);
}

export function initContactTracking() {
  const onClick = (event) => {
    const link = event.target?.closest?.('a[href]');
    const href = link?.getAttribute('href');
    if (!href) return;
    // Match the actual destination, never substring-match an arbitrary hostname.
    const destination = href.split(/[?#]/, 1)[0];
    let method;
    if (destination === 'https://line.me/R/ti/p/@blessmethailand') method = 'line';
    if (destination.toLowerCase() === 'mailto:blessme.team@gmail.com') method = 'email';
    // Displayed business number only; deliberately reject the existing masked href.
    if (destination === 'tel:+66828965199') method = 'phone';
    const requestedIntent = link?.getAttribute('data-contact-intent');
    const intent = ['sample', 'quote'].includes(requestedIntent) ? requestedIntent : 'contact';
    if (method) track('contact_click', method, document.documentElement.lang, intent);
  };
  // Capture contact clicks before modal containers stop bubbling.
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
