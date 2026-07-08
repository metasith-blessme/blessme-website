import { PRODUCTS } from '../src/constants/products.js';
import { ARTICLES } from '../src/content/blog.js';

const PAGE_META = {
  '/': {
    title: 'ขายส่งป็อปปิ่งโบบา กรุงเทพฯ | Popping Boba Wholesale Bangkok — BlessMe Thailand',
    description: 'ป็อปปิ่งโบบา 6 รสชาติพรีเมียม สต็อกกรุงเทพฯ ราคาส่ง 80–115 บาท/แพ็ค ส่งทั่วไทย ไม่ต้องแช่เย็น อายุ 12 เดือน ติดต่อ LINE @591dzhsr'
  },
  '/solutions': {
    title: 'How BlessMe Works — 6-Step Framework | BlessMe Thailand',
    description: 'Discover the six-step framework BlessMe uses to source, test, and supply specialty food products to wholesale partners across Thailand.'
  },
  '/about': {
    title: 'About BlessMe Thailand — Food Wholesaler Bangkok',
    description: 'BlessMe (Thailand) Co., Ltd. introduces specialty food categories to the Thai B2B market. Headquartered in Bangkok, serving cafés, restaurants, and dessert brands nationwide.'
  },
  '/blog': {
    title: 'Journal — Specialty Food Insights | BlessMe Thailand',
    description: 'Notes from the BlessMe team on specialty food sourcing, cold-chain logistics, shelf life, and how to introduce new products to the Thai market.'
  },
  '/faq': {
    title: 'FAQ — BlessMe Wholesale Thailand | Popping Boba Questions',
    description: 'Frequently asked questions about BlessMe wholesale pricing, minimum orders, shelf life, product range, and shipping across Thailand.'
  }
};

class MetaRewriter {
  constructor(title, description, image, canonical) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.canonical = canonical;
  }

  element(element) {
    if (element.tagName === 'title' && this.title) {
      element.setInnerContent(this.title);
    } else if (element.tagName === 'meta') {
      const name = element.getAttribute('name');
      const property = element.getAttribute('property');
      
      if ((name === 'description' || property === 'og:description' || name === 'twitter:description') && this.description) {
        element.setAttribute('content', this.description);
      }
      if ((property === 'og:title' || name === 'twitter:title') && this.title) {
        element.setAttribute('content', this.title);
      }
      if ((property === 'og:image' || name === 'twitter:image') && this.image) {
        element.setAttribute('content', this.image);
      }
    } else if (element.tagName === 'link' && element.getAttribute('rel') === 'canonical' && this.canonical) {
      element.setAttribute('href', this.canonical);
    }
  }
}

export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Let the static asset request pass through
  const response = await context.next();
  
  // Only process HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  const BASE_URL = 'https://blessmethailand.com';
  let title = PAGE_META['/'].title;
  let description = PAGE_META['/'].description;
  let image = `${BASE_URL}/assets/logo-full.png`;
  let canonical = `${BASE_URL}${path}`;

  if (path.startsWith('/products/')) {
    const id = path.split('/')[2];
    const product = PRODUCTS.find(p => p.id === id);
    if (product) {
      title = `${product.name} Popping Boba Wholesale | BlessMe Thailand`;
      description = `${product.name} popping boba (${product.flavor}) — ${product.note} Available for wholesale from BlessMe Thailand. Stock in Bangkok, 12-month shelf life.`;
      image = `${BASE_URL}${product.imgFallback}`;
    }
  } else if (path.startsWith('/blog/')) {
    const id = path.split('/')[2];
    const article = ARTICLES.find(a => a.id === id);
    if (article) {
      title = `${article.title} | BlessMe Thailand`;
      description = article.excerpt;
      image = article.img ? `${BASE_URL}${article.img}` : image;
    }
  } else if (PAGE_META[path]) {
    title = PAGE_META[path].title;
    description = PAGE_META[path].description;
  }

  return new HTMLRewriter()
    .on('title', new MetaRewriter(title, description, image, canonical))
    .on('meta', new MetaRewriter(title, description, image, canonical))
    .on('link', new MetaRewriter(title, description, image, canonical))
    .transform(response);
}
