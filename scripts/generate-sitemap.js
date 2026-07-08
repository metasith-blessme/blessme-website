import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { PRODUCTS } from '../src/constants/products.js';
import { ARTICLES } from '../src/content/blog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const BASE_URL = 'https://blessmethailand.com';

const staticRoutes = [
  '/',
  '/about',
  '/solutions',
  '/blog',
  '/faq'
];

function generateSitemap() {
  const urls = [];

  // Add static routes
  for (const route of staticRoutes) {
    urls.push(`<url><loc>${BASE_URL}${route}</loc><changefreq>weekly</changefreq><priority>${route === '/' ? '1.0' : '0.8'}</priority></url>`);
  }

  // Add products
  for (const product of PRODUCTS) {
    urls.push(`<url><loc>${BASE_URL}/products/${product.id}</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>`);
  }

  // Add articles
  for (const article of ARTICLES) {
    // Prefer updatedDate, fallback to publishedDate or isoDate
    const lastMod = article.updatedDate || article.publishedDate || article.isoDate;
    const lastModStr = lastMod ? `<lastmod>${lastMod}</lastmod>` : '';
    urls.push(`<url><loc>${BASE_URL}/blog/${article.id}</loc>${lastModStr}<changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls.join('\n  ')}\n</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapContent, 'utf8');
  console.log('✅ sitemap.xml generated successfully!');
}

generateSitemap();
