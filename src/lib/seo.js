import { PRODUCTS, productSearchName, productHeading } from '../constants/products';
import { FAQS_EN, FAQS_TH, WHOLESALE_FAQS_EN, WHOLESALE_FAQS_TH, HUB_FAQS_EN, HUB_FAQS_TH } from '../constants/faq';
import { getArticleById, getArticleMeta, getArticleSchema } from '../content/blog';
import { buildPath } from './routing';

export const BASE_URL = 'https://blessmethailand.com';

// Language-correct canonical, trailing-slash normalized to match how Cloudflare serves the file.
export function canonicalFor(page, productId = null, articleId = null, lang = 'en') {
  let p = buildPath({ page, productId, articleId, lang });
  if (p !== '/' && !p.endsWith('/')) p += '/';
  return BASE_URL + p;
}
export const ORG_DESCRIPTION = 'BlessMe (Thailand) — specialty food wholesaler supplying cafés, restaurants, and dessert brands with premium popping boba. 5 curated toppings, stock in Bangkok, 12 months from manufacture unopened at room temperature.';

export const PAGE_META = {
  Products: {
    title: 'Popping Boba Wholesale Bangkok, 90 THB/pack | BlessMe',
    description: 'Wholesale vegan toppings: popping boba, Moji Yogurt and Osmanthus Konjac. 90–120 THB/pack, no minimum order. Bangkok stock, nationwide Thailand shipping.',
    canonical: `${BASE_URL}/`
  },
  Wholesale: { title: 'Popping Boba Wholesale Bangkok — Prices & Order | BlessMe Thailand', description: 'Vegan toppings at 90 THB/pack; Moji Yogurt 120 THB. No minimum order. Order via LINE @blessmethailand; request free samples by email Blessme.team@gmail.com.', canonical: `${BASE_URL}/wholesale` },
  Solutions: { title: 'How BlessMe Works — 6-Step Framework | BlessMe Thailand', description: 'Discover the six-step framework BlessMe uses to source, test, and supply specialty food products to wholesale partners across Thailand.', canonical: `${BASE_URL}/solutions` },
  'About us': { title: 'About BlessMe Thailand — Food Wholesaler Bangkok', description: 'BlessMe (Thailand) Co., Ltd. introduces specialty food categories to the Thai B2B market. Headquartered in Bangkok, serving cafés, restaurants, and dessert brands nationwide.', canonical: `${BASE_URL}/about` },
  Blog: { title: 'Journal — Specialty Food Insights | BlessMe Thailand', description: 'Notes from the BlessMe team on specialty food sourcing, cold-chain logistics, shelf life, and how to introduce new products to the Thai market.', canonical: `${BASE_URL}/blog` },
  FAQ: { title: 'Popping Boba Wholesale FAQ | BlessMe Thailand', description: 'Answers on what popping boba is, storage, shelf life, wholesale prices, minimum orders, LINE and Shopee ordering, and drink and dessert uses.', canonical: `${BASE_URL}/faq` },
  Catalogue: { title: 'Popping Boba Wholesale, All Flavours in Stock | BlessMe', description: 'Barley, oat, red bean, Moji Yogurt and Osmanthus Konjac in stock. 90–120 THB per pack, no minimum order. Bangkok wholesale, Shopee retail.', canonical: `${BASE_URL}/products` },
};

export const PAGE_META_TH = {
  Products: {
    title: 'ไข่มุกป๊อป ขายส่ง กรุงเทพฯ ราคาส่ง 90 บาท | เบลสมี',
    description: 'ขายส่งไข่มุกป๊อป มุกป๊อปบาร์เลย์ โอ๊ต ถั่วแดง โมจิโยเกิร์ต บุกหอมหมื่นลี้ 90–120 บาท/แพ็ค ไม่มีขั้นต่ำ ส่งทั่วไทย สั่ง LINE หรือ Shopee',
    canonical: BASE_URL + '/'
  },
  Wholesale: { title: 'มุกป๊อป ขายส่ง ราคาส่ง ไม่มีขั้นต่ำ | เบลสมี ไทยแลนด์', description: 'ไข่มุกป๊อปขายส่ง 90 บาท/แพ็ค โมจิโยเกิร์ต 120 บาท ไม่มีขั้นต่ำ ขอตัวอย่างฟรี สั่งทาง LINE @blessmethailand ส่งทั่วประเทศ', canonical: BASE_URL+'/wholesale' },
  Solutions: { title: 'วิธีทำงานกับเบลสมี 6 ขั้นตอน | ขายส่งมุกป๊อป', description: 'กระบวนการจัดหาและทดสอบวัตถุดิบของเบลสมี สำหรับคาเฟ่ที่อยากเพิ่มมุกป๊อปและท็อปปิ้งขายส่งในเมนู', canonical: BASE_URL+'/solutions' },
  'About us': { title: 'เกี่ยวกับ เบลสมี (ประเทศไทย) — ผู้นำเข้าไข่มุกป๊อปขายส่ง', description: 'เบลสมี (ประเทศไทย) จำกัด นำเข้าและสต็อกไข่มุกป๊อปและท็อปปิ้งขายส่งในกรุงเทพฯ สำหรับคาเฟ่ ร้านอาหาร และแบรนด์ขนมหวานทั่วไทย', canonical: BASE_URL+'/about' },
  Blog: { title: 'บทความมุกป๊อปและวัตถุดิบคาเฟ่ | เบลสมี ไทยแลนด์', description: 'อัปเดตเทรนด์วัตถุดิบคาเฟ่ เทคนิคการเลือกท็อปปิ้ง และเบื้องหลังการจัดหาอาหารพิเศษจากทีมงานเบลสมี', canonical: BASE_URL+'/blog' },
  FAQ: { title: 'คำถามที่พบบ่อย ไข่มุกป๊อป ขายส่ง | เบลสมี', description: 'มุกป๊อปคืออะไร เก็บอย่างไร อายุสินค้า ราคาส่ง 90–120 บาท ไม่มีขั้นต่ำ สั่ง LINE @blessmethailand หรือ Shopee ส่งทั่วไทย', canonical: BASE_URL+'/faq' },
  Catalogue: { title: 'มุกป๊อป (ไข่มุกป๊อป) ขายส่ง ทุกรส | เบลสมี', description: 'มุกป๊อปขายส่งทุกรสที่ยังมีสต็อก ข้าวบาร์เลย์ ข้าวโอ๊ต ถั่วแดง โมจิโยเกิร์ต และบุกหอมหมื่นลี้ 90–120 บาท/แพ็ค ไม่มีขั้นต่ำ สั่ง LINE หรือ Shopee', canonical: BASE_URL+'/products' },
};

// logo + image URLs intentionally stay logo-full.png: this is a stable
// social/SEO identifier (Schema.org LocalBusiness, OpenGraph crawlers).
// Visible-UI renderers use <picture> with logo-full.webp; json-ld stays png.
export const ORG_ID = 'https://blessmethailand.com/#org';
const LOGO = 'https://blessmethailand.com/assets/logo-full.png';

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'BlessMe Thailand',
  legalName: 'BlessMe (Thailand) Co., Ltd.',
  url: 'https://blessmethailand.com',
  logo: LOGO,
  image: LOGO,
  description: ORG_DESCRIPTION,
  sameAs: [
    'https://shopee.co.th/blessme_thailand',
    'https://line.me/R/ti/p/@blessmethailand',
    'https://instagram.com/blessme_thailand',
    'https://facebook.com/BlessMeThailand',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+66-82-896-5199',
    email: 'Blessme.team@gmail.com',
    contactType: 'sales',
    areaServed: 'TH',
    availableLanguage: ['Thai', 'English'],
  },
};

// City-level locality only. Street address, hours and registration numbers stay off until the owner confirms them.
export const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WholesaleStore',
  '@id': 'https://blessmethailand.com/#store',
  name: 'BlessMe (Thailand) Co., Ltd.',
  url: 'https://blessmethailand.com',
  logo: LOGO,
  image: LOGO,
  description: ORG_DESCRIPTION,
  parentOrganization: { '@id': ORG_ID },
  telephone: '+66-82-896-5199',
  email: 'Blessme.team@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Bangkok', addressCountry: 'TH' },
  areaServed: { '@type': 'Country', name: 'Thailand' },
  priceRange: '฿฿',
};

export const PAGE_NAMES = { Products: 'BlessMe Thailand — Specialty Food Wholesale', Catalogue: 'Popping Boba Wholesale', Wholesale: 'Popping Boba Wholesale Bangkok', Solutions: 'How BlessMe Works', 'About us': 'About BlessMe Thailand', Blog: 'Journal — Specialty Food Insights', FAQ: 'FAQ — BlessMe Wholesale Thailand' };

const CRUMB_NAMES = {
  en: { Catalogue: 'Popping boba', Wholesale: 'Wholesale', Solutions: 'How BlessMe works', 'About us': 'About', Blog: 'Journal', FAQ: 'FAQ' },
  th: { Catalogue: 'มุกป๊อปขายส่ง', Wholesale: 'ขายส่ง', Solutions: 'โซลูชัน', 'About us': 'เกี่ยวกับเรา', Blog: 'บทความ', FAQ: 'คำถามที่พบบ่อย' },
};

export function pageCrumbs(page, lang = 'en') {
  const current = CRUMB_NAMES[lang]?.[page];
  if (!current) return [];
  return [
    { name: lang === 'th' ? 'หน้าหลัก' : 'Home', url: canonicalFor('Products', null, null, lang) },
    { name: current, url: canonicalFor(page, null, null, lang) },
  ];
}

const TH_PRODUCT_TITLE = {
  barley: 'มุกป๊อปบาร์เลย์ ขายส่ง 90 บาท/แพ็ค | เบลสมี',
  oat: 'มุกป๊อปข้าวโอ๊ต ขายส่ง 90 บาท/แพ็ค | เบลสมี',
  redbean: 'มุกป๊อปถั่วแดง ขายส่ง 90 บาท/แพ็ค | เบลสมี',
  cheese: 'มุกป๊อป โยเกิร์ต ขายส่ง 120 บาท | เบลสมี',
  osmanthus: 'บุกหอมหมื่นลี้ มุกบุก เยลลี่บุก | เบลสมี',
};

export function buildProductMeta(product, lang) {
  const name = productSearchName(product, lang);
  return {
    title: lang === 'th' ? (TH_PRODUCT_TITLE[product.id] || `${productHeading(product, lang)} | เบลสมี`) : `${name} Wholesale | BlessMe Thailand`,
    description: lang === 'th'
      ? `${name} — ${product.noteTh} ${product.price} บาท/แพ็ค ${product.packSize} ไม่มีขั้นต่ำ สต็อกกรุงเทพฯ ส่งทั่วไทย`
      : `${name} — ${product.note} ${product.price} THB per ${product.packSize} pack. No minimum order. Bangkok stock, nationwide Thailand shipping.`,
    canonical: canonicalFor('Products', product.id, null, lang),
  };
}

function getOrCreateTag(selector, tagType, attributes = {}) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement(tagType);
    Object.entries(attributes).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  return el;
}

export function setMeta(title, description, canonical, lang='en', image = `${BASE_URL}/assets/og-image.png`, type = 'website') {
  document.title = title;
  
  const descEl = getOrCreateTag('meta[name="description"]', 'meta', { name: 'description' });
  descEl.setAttribute('content', description);
  
  const canonEl = getOrCreateTag('link[rel="canonical"]', 'link', { rel: 'canonical' });
  canonEl.setAttribute('href', canonical);
  
  const ogTitle = getOrCreateTag('meta[property="og:title"]', 'meta', { property: 'og:title' });
  ogTitle.setAttribute('content', title);
  
  const ogDesc = getOrCreateTag('meta[property="og:description"]', 'meta', { property: 'og:description' });
  ogDesc.setAttribute('content', description);
  
  const ogUrl = getOrCreateTag('meta[property="og:url"]', 'meta', { property: 'og:url' });
  ogUrl.setAttribute('content', canonical);
  
  const ogLocale = getOrCreateTag('meta[property="og:locale"]', 'meta', { property: 'og:locale' });
  ogLocale.setAttribute('content', lang === 'th' ? 'th_TH' : 'en_US');
  
  const twTitle = getOrCreateTag('meta[name="twitter:title"]', 'meta', { name: 'twitter:title' });
  twTitle.setAttribute('content', title);
  
  const twDesc = getOrCreateTag('meta[name="twitter:description"]', 'meta', { name: 'twitter:description' });
  twDesc.setAttribute('content', description);

  getOrCreateTag('meta[property="og:image"]', 'meta', { property: 'og:image' }).setAttribute('content', image);
  getOrCreateTag('meta[name="twitter:image"]', 'meta', { name: 'twitter:image' }).setAttribute('content', image);
  getOrCreateTag('meta[property="og:type"]', 'meta', { property: 'og:type' }).setAttribute('content', type);
  getOrCreateTag('meta[name="twitter:card"]', 'meta', { name: 'twitter:card' }).setAttribute('content', 'summary_large_image');
}

// Pure: compute { title, description, canonical } for a route. Reused by the prerenderer.
// Canonical is always derived from the language + route so EN and /th URLs stay correct.
export function getMeta(page, productId = null, articleId = null, lang = 'en') {
  if (page === 'NotFound') return { title: lang === 'th' ? '404 — ไม่พบหน้า | BlessMe Thailand' : '404 — Page not found | BlessMe Thailand', description: lang === 'th' ? 'ไม่พบหน้าที่คุณต้องการ' : 'The requested page does not exist.', canonical: null };
  const canonical = canonicalFor(page, productId, articleId, lang);
  if (productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) return { ...buildProductMeta(product, lang), canonical };
  }
  if (articleId) {
    const article = getArticleById(articleId);
    if (article) return { ...getArticleMeta(article, lang, BASE_URL), canonical };
  }
  const metaSet = lang === 'th' ? PAGE_META_TH : PAGE_META;
  return { ...(metaSet[page] || metaSet.Products), canonical };
}

export function updateMeta(page, productId = null, articleId = null, lang = 'en') {
  const m = getMeta(page, productId, articleId, lang);
  const product = PRODUCTS.find(p => p.id === productId);
  const article = getArticleById(articleId);
  const image = new URL(product?.imgFallback || article?.img || '/assets/og-image.png', BASE_URL).href;
  setMeta(m.title, m.description, m.canonical || '', lang, image, article ? 'article' : 'website');
  getOrCreateTag('meta[name="robots"]', 'meta', { name: 'robots' }).setAttribute('content', page === 'NotFound' ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  if (page === 'NotFound') {
    document.querySelector('link[rel="canonical"]')?.remove();
    document.querySelector('meta[property="og:url"]')?.remove();
    return;
  }
  for (const alternate of ['en', 'th', 'x-default']) {
    getOrCreateTag(`link[rel="alternate"][hreflang="${alternate}"]`, 'link', { rel: 'alternate', hreflang: alternate })
      .setAttribute('href', canonicalFor(page, productId, articleId, alternate === 'th' ? 'th' : 'en'));
  }
}

export function buildWebPageSchema(page, canonical) {
  return { "@context": "https://schema.org", "@type": "WebPage", "name": PAGE_NAMES[page] || PAGE_NAMES.Products, "url": canonical, "isPartOf": { "@id": "https://blessmethailand.com" } };
}

export function buildProductSchema(product, lang = 'en') {
  const url = canonicalFor('Products', product.id, null, lang);
  const properties = [
    { '@type': 'PropertyValue', name: 'Pack size', value: product.packSize },
    { '@type': 'PropertyValue', name: 'Drained weight', value: product.drainedWeight },
    { '@type': 'PropertyValue', name: 'Vegan', value: 'Yes' },
  ];
  if (product.containsGluten) properties.push({ '@type': 'PropertyValue', name: 'Gluten', value: 'Contains gluten' });
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productSearchName(product, lang),
    alternateName: lang === 'th' ? product.name : product.nameTh,
    description: lang === 'th' ? product.noteTh : product.note,
    sku: product.id,
    category: product.id === 'osmanthus' ? 'Konjac topping' : 'Popping boba',
    url,
    image: new URL(product.imgFallback, BASE_URL).href,
    brand: { '@type': 'Brand', '@id': ORG_ID, name: 'BlessMe Thailand' },
    additionalProperty: properties,
    offers: {
      '@type': 'Offer',
      url,
      price: product.price,
      priceCurrency: 'THB',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': ORG_ID, '@type': 'Organization', name: 'BlessMe (Thailand) Co., Ltd.' },
    },
  };
}

export function buildBreadcrumbSchema(items) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items.map((item, idx) => ({ "@type": "ListItem", "position": idx + 1, "name": item.name, "item": item.url })) };
}

export function buildFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
}

// Pure: assemble the JSON-LD schema array for a route. Reused by the prerenderer.
export function getSchemas(page, productId = null, articleId = null, lang = 'en') {
  if (page === 'NotFound') return [];
  const schemas = [ORGANIZATION_SCHEMA, ORG_SCHEMA];
  const home = { name: lang === 'th' ? 'หน้าหลัก' : 'Home', url: canonicalFor('Products', null, null, lang) };
  if (productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      schemas.push(buildProductSchema(product, lang));
      schemas.push(buildBreadcrumbSchema([home, { name: productSearchName(product, lang), url: canonicalFor('Products', product.id, null, lang) }]));
    }
  } else if (articleId) {
    const article = getArticleById(articleId);
    if (article) {
      schemas.push(getArticleSchema(article, lang, BASE_URL));
      const articleFaqs = lang === 'th' ? article.faqsTh : article.faqs;
      if (articleFaqs?.length) schemas.push(buildFAQSchema(articleFaqs));
      schemas.push(buildBreadcrumbSchema([home, { name: lang === 'th' ? 'บทความ' : 'Journal', url: canonicalFor('Blog', null, null, lang) }, { name: lang === 'th' ? article.titleTh : article.title, url: canonicalFor('Blog', null, article.id, lang) }]));
    }
  } else {
    schemas.push(buildWebPageSchema(page, canonicalFor(page, null, null, lang)));
    if (page !== 'Products') {
      const crumbs = pageCrumbs(page, lang);
      if (crumbs.length) schemas.push(buildBreadcrumbSchema(crumbs));
    }
    if (page === 'Products' || page === 'Catalogue') {
      schemas.push({ '@context': 'https://schema.org', '@type': 'ItemList', name: lang === 'th' ? 'ท็อปปิ้งขายส่ง BlessMe' : 'BlessMe Wholesale Toppings', url: canonicalFor(page, null, null, lang), numberOfItems: PRODUCTS.length, itemListElement: PRODUCTS.map((p, idx) => ({ '@type': 'ListItem', position: idx + 1, url: canonicalFor('Products', p.id, null, lang), name: productSearchName(p, lang) })) });
    }
    if (page === 'FAQ') {
      schemas.push(buildFAQSchema(lang === 'th' ? FAQS_TH : FAQS_EN));
    }
    if (page === 'Wholesale') {
      schemas.push(buildFAQSchema(lang === 'th' ? WHOLESALE_FAQS_TH : WHOLESALE_FAQS_EN));
    }
    if (page === 'Catalogue') {
      schemas.push(buildFAQSchema(lang === 'th' ? HUB_FAQS_TH : HUB_FAQS_EN));
    }
  }
  return schemas;
}

export function updateSchema(page, productId = null, articleId = null, lang = 'en') {
  const el = document.getElementById('bm-schema');
  if (!el) return;
  const schemas = getSchemas(page, productId, articleId, lang);
  el.textContent = schemas.length === 1 ? JSON.stringify(schemas[0]) : JSON.stringify(schemas);
}
