import { PRODUCTS } from '../constants/products';
import { getArticleById } from '../content/blog';

/* ===== URL ROUTING MAPS =====
 * Thai is the default language at `/…` (long-term Thai SEO). English lives at
 * `/en/…`. Each language keeps its own crawlable URL for hreflang.
 *
 * Old `/th/…` URLs are 301'd at the edge (public/_redirects) onto these Thai
 * paths. The former English root URLs are the same paths Thai now occupies, so
 * they stay 200 and serve Thai; they are not redirected to `/en/…`.
 */
export const PATH_TO_PAGE = {
  '/':           'Products',
  '/products':   'Catalogue',
  '/wholesale':  'Wholesale',
  '/solutions':  'Solutions',
  '/about':      'About us',
  '/blog':       'Blog',
  '/faq':        'FAQ',
};

export const PAGE_TO_PATH = {
  'Products':  '/',
  'Catalogue': '/products',
  'Wholesale': '/wholesale',
  'Solutions': '/solutions',
  'About us':  '/about',
  'Blog':      '/blog',
  'FAQ':       '/faq',
};

// Resolve a language-neutral path (no /en prefix) into page/product/article.
function resolvePage(path) {
  if (path.startsWith('/blog/')) {
    const articleId = path.slice(6);
    if (getArticleById(articleId)) return { page: 'Blog', articleId, productId: null };
  }
  if (path.startsWith('/products/')) {
    const productId = path.slice(10);
    if (PRODUCTS.some(p => p.id === productId)) return { page: 'Products', articleId: null, productId };
  }
  return { page: PATH_TO_PAGE[path] || 'NotFound', articleId: null, productId: null };
}

function stripLangPrefix(path) {
  if (path === '/en' || path.startsWith('/en/')) return path.slice(3) || '/';
  if (path === '/th' || path.startsWith('/th/')) return path.slice(3) || '/';
  return path;
}

// Parse a full pathname (may include /en prefix) → { page, productId, articleId, lang }.
export function getInitialState(pathname) {
  // ponytail: accept an explicit path for SSR/prerender; fall back to window on the client
  let path = (pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/')).replace(/\/+$/, '') || '/';
  let lang = 'th';
  if (path === '/en' || path.startsWith('/en/')) {
    lang = 'en';
    path = path.slice(3) || '/';
  }
  return { ...resolvePage(path), lang };
}

// Preserve native new-tab clicks; intercept only ordinary navigation.
export function handleLinkClick(event, navigate) {
  if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigate();
}

function withTrailingSlash(path) {
  if (path === '/' || path.endsWith('/')) return path;
  return `${path}/`;
}

// Build a URL path for a target page/product/article in a given language.
// Directory routes keep a trailing slash so the browser requests the 200 URL.
export function buildPath({ page, productId = null, articleId = null, lang = 'th' }) {
  const prefix = lang === 'en' ? '/en' : '';
  if (articleId) return withTrailingSlash(`${prefix}/blog/${articleId}`);
  if (productId) return withTrailingSlash(`${prefix}/products/${productId}`);
  const base = PAGE_TO_PATH[page] || '/';
  return withTrailingSlash(base === '/' ? `${prefix}/` : `${prefix}${base}`);
}

// Re-home a pathname that is not in the route table (404s, legacy /th links).
export function pathForLang(pathname, lang = 'th') {
  const path = stripLangPrefix(String(pathname || '/').replace(/\/+$/, '') || '/');
  if (lang === 'en') return withTrailingSlash(path === '/' ? '/en/' : `/en${path}`);
  return withTrailingSlash(path === '/' ? '/' : path);
}
