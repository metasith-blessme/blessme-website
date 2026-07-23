import { PRODUCTS } from '../constants/products';
import { getArticleById } from '../content/blog';

/* ===== URL ROUTING MAPS ===== */
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

export function getInitialState(pathname) {
  // ponytail: accept an explicit path for SSR/prerender; fall back to window on the client
  const raw = pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const path = raw.replace(/\/+$/, '') || '/';
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
