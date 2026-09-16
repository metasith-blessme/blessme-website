import { PRODUCTS, productSearchName } from '../constants/products';
import { FAQS_EN, FAQS_TH, WHOLESALE_FAQS_EN, WHOLESALE_FAQS_TH } from '../constants/faq';
import { getArticleById, getArticleMeta, getArticleSchema } from '../content/blog';
import { buildPath } from './routing';

export const BASE_URL = 'https://blessmethailand.com';

// Language-correct canonical, trailing-slash normalized to match how Cloudflare serves the file.
export function canonicalFor(page, productId = null, articleId = null, lang = 'en') {
  let p = buildPath({ page, productId, articleId, lang });
  if (p !== '/' && !p.endsWith('/')) p += '/';
  return BASE_URL + p;
}
export const ORG_DESCRIPTION = 'BlessMe (Thailand) — specialty food wholesaler supplying cafés, restaurants, and dessert brands with premium popping boba. 6 curated flavors, stock in Bangkok, 12-month shelf life.';

export const PAGE_META = {
  Products: {
    title: 'Popping Boba & Konjac Wholesale Bangkok | BlessMe Thailand',
    description: 'Wholesale vegan toppings: popping boba, Moji Yogurt and Osmanthus Konjac. 90–120 THB/pack, no minimum order. Bangkok stock, nationwide Thailand shipping.',
    canonical: `${BASE_URL}/`
  },
  Wholesale: { title: 'Popping Boba Wholesale Bangkok — Prices & Order | BlessMe Thailand', description: 'Vegan toppings at 90 THB/pack; Moji Yogurt 120 THB. No minimum order. Order via LINE @blessmethailand; request free samples by email Blessme.team@gmail.com.', canonical: `${BASE_URL}/wholesale` },
  Solutions: { title: 'How BlessMe Works — 6-Step Framework | BlessMe Thailand', description: 'Discover the six-step framework BlessMe uses to source, test, and supply specialty food products to wholesale partners across Thailand.', canonical: `${BASE_URL}/solutions` },
  'About us': { title: 'About BlessMe Thailand — Food Wholesaler Bangkok', description: 'BlessMe (Thailand) Co., Ltd. introduces specialty food categories to the Thai B2B market. Headquartered in Bangkok, serving cafés, restaurants, and dessert brands nationwide.', canonical: `${BASE_URL}/about` },
  Blog: { title: 'Journal — Specialty Food Insights | BlessMe Thailand', description: 'Notes from the BlessMe team on specialty food sourcing, cold-chain logistics, shelf life, and how to introduce new products to the Thai market.', canonical: `${BASE_URL}/blog` },
  FAQ: { title: 'FAQ — BlessMe Wholesale Thailand | Popping Boba Questions', description: 'Frequently asked questions about BlessMe wholesale pricing, minimum orders, shelf life, product range, and shipping across Thailand.', canonical: `${BASE_URL}/faq` },
};

export const PAGE_META_TH = {
  Products: {
    title: 'ขายส่งมุกป๊อป กรุงเทพฯ | ท็อปปิ้งพรีเมียม 6 รายการ ราคาส่ง — เบลสมี ไทยแลนด์',
    description: 'ขายส่งมุกป๊อปข้าวบาร์เลย์ ข้าวโอ๊ต ถั่วแดง แห้ว โมจิโยเกิร์ต และบุกหอมหมื่นลี้ 90–120 บาท/แพ็ค ไม่มีขั้นต่ำ สต็อกกรุงเทพฯ ส่งทั่วไทย',
    canonical: BASE_URL + '/'
  },
  Wholesale: { title: 'ขายส่งไข่มุกป๊อป (มุกป๊อป) กรุงเทพ — ราคาส่ง & สั่งซื้อ | เบลสมี ไทยแลนด์', description: 'ท็อปปิ้งวีแกน 5 รส 90 บาท/แพ็ค โมจิโยเกิร์ต 120 บาท ไม่มีขั้นต่ำ สั่งทาง LINE @blessmethailand ขอตัวอย่างฟรีทางอีเมล Blessme.team@gmail.com', canonical: BASE_URL+'/wholesale' },
  Solutions: { title: 'โซลูชันวัตถุดิบอาหารพิเศษ — บริการพาร์ทเนอร์ค้าส่ง | เบลสมี ไทยแลนด์', description: 'เจาะลึกกระบวนการจัดหาและทดสอบวัตถุดิบอาหารพิเศษของเบลสมี เพื่อช่วยคาเฟ่และร้านอาหารสร้างจุดแตกต่างที่ยั่งยืนในตลาดไทย', canonical: BASE_URL+'/solutions' },
  'About us': { title: 'เกี่ยวกับ เบลสมี (ประเทศไทย) — ผู้นำเข้าและจัดจำหน่ายวัตถุดิบอาหารพิเศษ', description: 'เราคือพาร์ทเนอร์ที่ไว้วางใจได้สำหรับแบรนด์คาเฟ่และร้านขนมหวาน นำเข้าและสต็อกวัตถุดิบป๊อปปิ้งโบบาพรีเมียมเพื่อธุรกิจ B2B ทั่วไทย', canonical: BASE_URL+'/about' },
  Blog: { title: 'บทความและข้อมูลเชิงลึก วัตถุดิบคาเฟ่และป๊อปปิ้งโบบา | เบลสมี ไทยแลนด์', description: 'อัปเดตเทรนด์วัตถุดิบคาเฟ่ เทคนิคการเลือกท็อปปิ่ง และเบื้องหลังการจัดหาอาหารพิเศษจากทีมงานผู้เชี่ยวชาญของเบลสมี', canonical: BASE_URL+'/blog' },
  FAQ: { title: 'คำถามที่พบบ่อย — การสั่งซื้อป๊อปปิ้งโบบาราคาส่ง | เบลสมี ไทยแลนด์', description: 'รวมทุกคำถามเกี่ยวกับการสั่งซื้อค้าส่ง ขั้นต่ำการสั่งซื้อ การจัดส่งทั่วไทย และการเก็บรักษาป๊อปปิ้งโบบาและท็อปปิ่งของเบลสมี', canonical: BASE_URL+'/faq' },
};

export const ORG_SCHEMA = { "@context": "https://schema.org", "@type": "LocalBusiness", "name": "BlessMe (Thailand) Co., Ltd.", "url": "https://blessmethailand.com", "logo": "https://blessmethailand.com/assets/logo-full.png", "image": "https://blessmethailand.com/assets/logo-full.png", "description": "Specialty food wholesaler supplying cafés, restaurants, and dessert brands with premium popping boba in Thailand.", "address": { "@type": "PostalAddress", "addressLocality": "Bangkok", "addressCountry": "TH" }, "contactPoint": { "@type": "ContactPoint", "telephone": "+66-82-896-5199", "email": "Blessme.team@gmail.com", "contactType": "sales", "areaServed": "TH", "availableLanguage": ["Thai", "English"] }, "sameAs": ["https://instagram.com/blessme_thailand", "https://facebook.com/BlessMeThailand"], "priceRange": "฿฿", "areaServed": { "@type": "Country", "name": "Thailand" } };

export const PAGE_NAMES = { Products: 'BlessMe Thailand — Specialty Food Wholesale', Wholesale: 'Popping Boba Wholesale Bangkok', Solutions: 'How BlessMe Works', 'About us': 'About BlessMe Thailand', Blog: 'Journal — Specialty Food Insights', FAQ: 'FAQ — BlessMe Wholesale Thailand' };

export function buildProductMeta(product, lang) {
  const name = productSearchName(product, lang);
  return {
    title: lang === 'th' ? `${name} ขายส่ง | เบลสมี ไทยแลนด์` : `${name} Wholesale | BlessMe Thailand`,
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
  return { '@context': 'https://schema.org', '@type': 'Product', name: productSearchName(product, lang), description: lang === 'th' ? product.noteTh : product.note, sku: product.id, url, image: new URL(product.imgFallback, BASE_URL).href, brand: { '@type': 'Brand', name: 'BlessMe Thailand' }, offers: { '@type': 'Offer', url, price: product.price, priceCurrency: 'THB', availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'BlessMe (Thailand) Co., Ltd.' } } };
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
  const schemas = [ORG_SCHEMA];
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
      schemas.push(buildBreadcrumbSchema([home, { name: lang === 'th' ? 'บทความ' : 'Journal', url: canonicalFor('Blog', null, null, lang) }, { name: lang === 'th' ? article.titleTh : article.title, url: canonicalFor('Blog', null, article.id, lang) }]));
    }
  } else {
    schemas.push(buildWebPageSchema(page, canonicalFor(page, null, null, lang)));
    if (page === 'Products') {
      schemas.push({ '@context': 'https://schema.org', '@type': 'ItemList', name: lang === 'th' ? 'ท็อปปิ้งขายส่ง BlessMe' : 'BlessMe Wholesale Toppings', url: home.url, numberOfItems: PRODUCTS.length, itemListElement: PRODUCTS.map((p, idx) => ({ '@type': 'ListItem', position: idx + 1, url: canonicalFor('Products', p.id, null, lang), name: productSearchName(p, lang) })) });
    }
    if (page === 'FAQ') {
      schemas.push(buildFAQSchema(lang === 'th' ? FAQS_TH : FAQS_EN));
    }
    if (page === 'Wholesale') {
      schemas.push(buildFAQSchema(lang === 'th' ? WHOLESALE_FAQS_TH : WHOLESALE_FAQS_EN));
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
