import { PRODUCTS } from '../constants/products';
import { FAQS_EN, FAQS_TH } from '../constants/faq';
import { getArticleById, getArticleMeta, getArticleSchema } from '../content/blog';

export const BASE_URL = 'https://blessmethailand.com';
export const ORG_DESCRIPTION = 'BlessMe (Thailand) — specialty food wholesaler supplying cafés, restaurants, and dessert brands with premium popping boba. 6 curated flavors, stock in Bangkok, 12-month shelf life.';

export const PAGE_META = {
  Products: {
    title: 'ขายส่งมุกป็อป กรุงเทพฯ | Popping Boba Wholesale Bangkok — BlessMe Thailand',
    description: 'ป็อปปิ่งโบบา 6 รสชาติพรีเมียม สต็อกกรุงเทพฯ ราคาส่ง 80–115 บาท/แพ็ค ส่งทั่วไทย ไม่ต้องแช่เย็น อายุ 12 เดือน ติดต่อ LINE @blessmethailand',
    canonical: `${BASE_URL}/`
  },
  Solutions: { title: 'How BlessMe Works — 6-Step Framework | BlessMe Thailand', description: 'Discover the six-step framework BlessMe uses to source, test, and supply specialty food products to wholesale partners across Thailand.', canonical: `${BASE_URL}/solutions` },
  'About us': { title: 'About BlessMe Thailand — Food Wholesaler Bangkok', description: 'BlessMe (Thailand) Co., Ltd. introduces specialty food categories to the Thai B2B market. Headquartered in Bangkok, serving cafés, restaurants, and dessert brands nationwide.', canonical: `${BASE_URL}/about` },
  Blog: { title: 'Journal — Specialty Food Insights | BlessMe Thailand', description: 'Notes from the BlessMe team on specialty food sourcing, cold-chain logistics, shelf life, and how to introduce new products to the Thai market.', canonical: `${BASE_URL}/blog` },
  FAQ: { title: 'FAQ — BlessMe Wholesale Thailand | Popping Boba Questions', description: 'Frequently asked questions about BlessMe wholesale pricing, minimum orders, shelf life, product range, and shipping across Thailand.', canonical: `${BASE_URL}/faq` },
};

export const PAGE_META_TH = {
  Products: {
    title: 'ขายส่งมุกป็อป กรุงเทพฯ | มุกป็อปพรีเมียม 6 รส ราคาส่ง — เบลสมี ไทยแลนด์',
    description: 'ป็อปปิ่งโบบา (มุกป็อป) 6 รสชาติพรีเมียม: บาร์เลย์ ถั่วแดง ข้าวโอ๊ต แห้ว หอบหมื่นลี้ โมจิโยเกิร์ต สต็อกกรุงเทพฯ ราคาส่ง 80–115 บาท/แพ็ค ส่งทั่วไทย',
    canonical: BASE_URL + '/'
  },
  Solutions: { title: 'โซลูชันวัตถุดิบอาหารพิเศษ — บริการพาร์ทเนอร์ค้าส่ง | เบลสมี ไทยแลนด์', description: 'เจาะลึกกระบวนการจัดหาและทดสอบวัตถุดิบอาหารพิเศษของเบลสมี เพื่อช่วยคาเฟ่และร้านอาหารสร้างจุดแตกต่างที่ยั่งยืนในตลาดไทย', canonical: BASE_URL+'/solutions' },
  'About us': { title: 'เกี่ยวกับ เบลสมี (ประเทศไทย) — ผู้นำเข้าและจัดจำหน่ายวัตถุดิบอาหารพิเศษ', description: 'เราคือพาร์ทเนอร์ที่ไว้วางใจได้สำหรับแบรนด์คาเฟ่และร้านขนมหวาน นำเข้าและสต็อกวัตถุดิบป็อปปิ่งโบบาพรีเมียมเพื่อธุรกิจ B2B ทั่วไทย', canonical: BASE_URL+'/about' },
  Blog: { title: 'บทความและข้อมูลเชิงลึก วัตถุดิบคาเฟ่และป็อปปิ่งโบบา | เบลสมี ไทยแลนด์', description: 'อัปเดตเทรนด์วัตถุดิบคาเฟ่ เทคนิคการเลือกท็อปปิ่ง และเบื้องหลังการจัดหาอาหารพิเศษจากทีมงานผู้เชี่ยวชาญของเบลสมี', canonical: BASE_URL+'/blog' },
  FAQ: { title: 'คำถามที่พบบ่อย — การสั่งซื้อป็อปปิ่งโบบาราคาส่ง | เบลสมี ไทยแลนด์', description: 'รวมทุกคำถามเกี่ยวกับการสั่งซื้อค้าส่ง ขั้นต่ำการสั่งซื้อ การจัดส่งทั่วไทย และการเก็บรักษาป็อปปิ่งโบบาและท็อปปิ่งของเบลสมี', canonical: BASE_URL+'/faq' },
};

export const ORG_SCHEMA = { "@context": "https://schema.org", "@type": "LocalBusiness", "name": "BlessMe (Thailand) Co., Ltd.", "url": "https://blessmethailand.com", "logo": "https://blessmethailand.com/assets/logo-full.png", "image": "https://blessmethailand.com/assets/logo-full.png", "description": "Specialty food wholesaler supplying cafés, restaurants, and dessert brands with premium popping boba in Thailand.", "address": { "@type": "PostalAddress", "addressLocality": "Bangkok", "addressCountry": "TH" }, "contactPoint": { "@type": "ContactPoint", "telephone": "+66-82-896-5199", "email": "Blessme.team@gmail.com", "contactType": "sales", "areaServed": "TH", "availableLanguage": ["Thai", "English"] }, "sameAs": ["https://instagram.com/blessme_thailand", "https://facebook.com/BlessMeThailand"], "priceRange": "฿฿", "areaServed": { "@type": "Country", "name": "Thailand" } };

export const PAGE_NAMES = { Products: 'BlessMe Thailand — Specialty Food Wholesale', Solutions: 'How BlessMe Works', 'About us': 'About BlessMe Thailand', Blog: 'Journal — Specialty Food Insights', FAQ: 'FAQ — BlessMe Wholesale Thailand' };

export function buildProductMeta(product, lang) {
  if (lang === 'th') {
    return {
      title: `${product.nameTh} ท็อปปิ่ง ป็อปปิ่งโบบา ค้าส่ง | เบลสมี ไทยแลนด์`,
      description: `${product.nameTh} — ${product.noteTh} สั่งซื้อค้าส่งจากเบลสมี ไทยแลนด์ สต็อกในกรุงเทพฯ อายุผลิตภัณฑ์ 12 เดือน`,
      canonical: `${BASE_URL}/products/${product.id}`
    };
  }
  return { title: `${product.name} Popping Boba Wholesale | BlessMe Thailand`, description: `${product.name} popping boba (${product.flavor}) — ${product.note} Available for wholesale from BlessMe Thailand. Stock in Bangkok, 12-month shelf life.`, canonical: `${BASE_URL}/products/${product.id}` };
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

export function setMeta(title, description, canonical, lang='en') {
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

  // ponytail: hreflang removed — single-URL site with JS lang toggle makes hreflang misleading to crawlers
}

// Pure: compute { title, description, canonical } for a route. Reused by the prerenderer.
export function getMeta(page, productId = null, articleId = null, lang = 'en') {
  if (productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) return buildProductMeta(product, lang);
  }
  if (articleId) {
    const article = getArticleById(articleId);
    if (article) return getArticleMeta(article, lang, BASE_URL);
  }
  const metaSet = lang === 'th' ? PAGE_META_TH : PAGE_META;
  return metaSet[page] || metaSet.Products;
}

export function updateMeta(page, productId = null, articleId = null, lang = 'en') {
  const m = getMeta(page, productId, articleId, lang);
  setMeta(m.title, m.description, m.canonical, lang);
}

export function buildWebPageSchema(page, canonical) {
  return { "@context": "https://schema.org", "@type": "WebPage", "name": PAGE_NAMES[page] || PAGE_NAMES.Products, "url": canonical, "isPartOf": { "@id": "https://blessmethailand.com" } };
}

export function buildProductSchema(product) {
  return { "@context": "https://schema.org", "@type": "Product", "name": `${product.name} Popping Boba`, "description": `${product.note} ${product.flavor}.`, "image": new URL(product.imgFallback, BASE_URL).href, "brand": { "@type": "Brand", "name": "BlessMe Thailand" }, "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "THB", "seller": { "@type": "Organization", "name": "BlessMe (Thailand) Co., Ltd." } } };
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
  const schemas = [ORG_SCHEMA];
  if (productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      schemas.push(buildProductSchema(product));
      schemas.push(buildBreadcrumbSchema([{ name: 'Home', url: 'https://blessmethailand.com/' }, { name: 'Products', url: 'https://blessmethailand.com/' }, { name: `${product.name} Popping Boba`, url: `https://blessmethailand.com/products/${product.id}` }]));
    }
  } else if (articleId) {
    const article = getArticleById(articleId);
    if (article) {
      schemas.push(getArticleSchema(article, lang, BASE_URL));
      schemas.push(buildBreadcrumbSchema([{ name: 'Home', url: 'https://blessmethailand.com/' }, { name: 'Journal', url: 'https://blessmethailand.com/blog' }, { name: lang === 'th' ? article.titleTh : article.title, url: `https://blessmethailand.com/blog/${article.id}` }]));
    }
  } else {
    const m = (lang === 'th' ? PAGE_META_TH : PAGE_META)[page];
    if (m) schemas.push(buildWebPageSchema(page, m.canonical));
    if (page === 'Products') {
      schemas.push({ "@context": "https://schema.org", "@type": "ItemList", "name": "BlessMe Popping Boba — Wholesale Product Range", "url": "https://blessmethailand.com/", "numberOfItems": PRODUCTS.length, "itemListElement": PRODUCTS.map((p, idx) => ({ "@type": "ListItem", "position": idx + 1, "url": `https://blessmethailand.com/products/${p.id}`, "name": `${p.name} Popping Boba` })) });
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "BlessMe Thailand — Popping Boba Wholesale Bangkok",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".bm-hero", ".bm-lead", ".bm-h1"]
        },
        "url": "https://blessmethailand.com"
      });
    }
    if (page === 'FAQ') {
      schemas.push(buildFAQSchema(lang === 'th' ? FAQS_TH : FAQS_EN));
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
