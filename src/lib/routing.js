import { PRODUCTS } from '../constants/products';
import { getArticleById } from '../content/blog';

/* ===== URL ROUTING MAPS =====
 * Language lives in the URL: EN at `/…`, Thai at `/th/…`. This gives each
 * language its own crawlable, indexable URL (required for Thai SEO/hreflang).
 */
export const PATH_TO_PAGE = {
  '/':          'Products',
  '/solutions': 'Solutions',
  '/about':     'About us',
  '/blog':      'Blog',
  '/faq':       'FAQ',
};

export const PAGE_TO_PATH = {
  'Products':  '/',
  'Solutions': '/solutions',
  'About us':  '/about',
  'Blog':      '/blog',
  'FAQ':       '/faq',
};

// Resolve a language-neutral path (no /th prefix) into page/product/article.
function resolvePage(path) {
  if (path.startsWith('/blog/')) {
    const articleId = path.slice(6);
    return { page: 'Blog', articleId: getArticleById(articleId) ? articleId : null, productId: null };
  }
  if (path.startsWith('/products/')) {
    const productId = path.slice(10);
    return { page: 'Products', articleId: null, productId: PRODUCTS.some(p => p.id === productId) ? productId : null };
  }
  return { page: PATH_TO_PAGE[path] || 'Products', articleId: null, productId: null };
}

// Parse a full pathname (may include /th prefix) → { page, productId, articleId, lang }.
export function getInitialState(pathname) {
  // ponytail: accept an explicit path for SSR/prerender; fall back to window on the client
  let path = (pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/')).replace(/\/+$/, '') || '/';
  let lang = 'en';
  if (path === '/th' || path.startsWith('/th/')) {
    lang = 'th';
    path = path.slice(3) || '/';
  }
  return { ...resolvePage(path), lang };
}

// Build a URL path for a target page/product/article in a given language.
export function buildPath({ page, productId = null, articleId = null, lang = 'en' }) {
  const prefix = lang === 'th' ? '/th' : '';
  if (articleId) return `${prefix}/blog/${articleId}`;
  if (productId) return `${prefix}/products/${productId}`;
  const base = PAGE_TO_PATH[page] || '/';
  return base === '/' ? `${prefix}/` : `${prefix}${base}`;
}
