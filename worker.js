const CANONICAL_HOST = 'blessmethailand.com';
const PRODUCTION_HOSTS = new Set([CANONICAL_HOST, 'www.blessmethailand.com']);

function hostName(url) {
  return url.hostname.toLowerCase().replace(/\.$/, '');
}

export function visitorScheme(request) {
  const visitor = request.headers.get('CF-Visitor');
  if (visitor) {
    try {
      const parsed = JSON.parse(visitor);
      if (parsed && typeof parsed.scheme === 'string' && parsed.scheme) return parsed.scheme;
    } catch {
      // A malformed edge header must not take the site down. Use the request URL.
    }
  }
  return new URL(request.url).protocol.replace(':', '');
}

// A _redirects rule for /index.html loops: that file is what `/` serves.
export function canonicalRedirect({ requestUrl, scheme, assetStatus, assetLocation }) {
  const url = new URL(requestUrl);
  const needsHttps = PRODUCTION_HOSTS.has(hostName(url)) && scheme === 'http';
  if (url.pathname === '/index.html') {
    const location = new URL('/', url);
    location.search = url.search;
    if (needsHttps) {
      location.protocol = 'https:';
      location.hostname = CANONICAL_HOST;
    }
    return { status: 301, location: location.toString() };
  }
  if (needsHttps && assetLocation) {
    const location = new URL(assetLocation, requestUrl);
    location.protocol = 'https:';
    location.hostname = CANONICAL_HOST;
    return { status: assetStatus === 308 ? 308 : 301, location: location.toString() };
  }
  if (needsHttps && assetStatus === 200) {
    url.protocol = 'https:';
    url.hostname = CANONICAL_HOST;
    return { status: 301, location: url.toString() };
  }
  return null;
}

export default {
  async fetch(request, env) {
    const asset = await env.ASSETS.fetch(request);
    const decision = canonicalRedirect({
      requestUrl: request.url,
      scheme: visitorScheme(request),
      assetStatus: asset.status,
      assetLocation: asset.headers.get('Location'),
    });
    if (!decision) return asset;
    return Response.redirect(decision.location, decision.status);
  },
};
