import React, { useState } from 'react';
import './styles/index.css';
import {
  ARTICLES,
  getAdjacentArticles,
  getArticleBlocks,
  getArticleById,
  getArticleMeta,
  getArticleSchema,
  getBlogCategories,
  getRelatedArticles,
} from './content/blog';

/* ===== TRANSLATIONS (EN / TH) ===== */
const T = {
  en: {
    nav: ['Products', 'Solutions', 'About us', 'Blog', 'FAQ'],
    heroEyebrow: 'BLESSME (THAILAND) · SPECIALTY FOOD WHOLESALE',
    heroTitle: ['Bringing a new ', 'experience', ' to your menu.'],
    heroSub: 'We discover, source, and supply specialty food products that give our partners a true point of difference — products customers cannot find elsewhere in the market.',
    heroCta1: 'See our solution', heroCta2: 'Request samples',
    heroMeta: 'First in Thailand · Trusted factory standard · Stock available now',
    productRange: 'PRODUCT RANGE', sixFlavors: 'Six wholesale flavors.',
    productSub: 'Curated for the Thai market. Selected for cafés, restaurants, retailers, and dessert brands.',
    viewDetails: 'View details →',
    trustItems: [
      { n: '6',    l: 'Curated flavors' },
      { n: '1st',  l: 'Of its kind in Thailand' },
      { n: '12',   l: 'Months shelf life' },
      { n: '100%', l: 'Stock in Bangkok' },
    ],
    modalPack: 'PACK', modalShelf: 'SHELF LIFE', modalStorage: 'STORAGE', modalOrigin: 'ORIGIN',
    modalCta: 'Request wholesale quote',
    modalSmall: 'Minimum wholesale order applies. Contact our team for pricing.',
    aboutEyebrow: 'ABOUT BLESSME (THAILAND)',
    aboutTitle: 'A trusted partner for specialty food brands.',
    aboutLead: 'BlessMe (Thailand) Co., Ltd. introduces specialty food products to the Thai market — new experiences our clients have been searching for, but could not find anywhere else.',
    aboutBody1: 'We work with cafés, restaurants, dessert brands, retailers, and food-service operators who want to differentiate their offering with products that are genuinely new to consumers. Our role is to handle the hard parts — sourcing, testing, importing, stocking — so our partners can focus on what they do best: serving great products to their customers.',
    aboutBody2: 'Headquartered in Bangkok, we operate to international food-safety standards and maintain consistent stock year-round.',
    contactEyebrow: 'GET IN TOUCH', contactTitle: 'Wholesale enquiries welcome.',
    formName: 'Your name', formBusiness: 'Business name', formEmail: 'Email address',
    formPhone: 'Phone number', formProduct: 'Product of interest', formQty: 'Estimated monthly qty',
    formMsg: 'Tell us about your business (optional)',
    formCta: 'Send enquiry', formSending: 'Sending…',
    formSuccess: 'Message sent! We\'ll be in touch within 1 business day.',
    formProducts: ['-- Select a product --','Barley','Oat','Red Bean','Water Chestnut','Cheese','Osmanthus','Multiple / All'],
    solEyebrow: 'OUR SOLUTION', solTitle: 'A six-step framework for bringing something new to market.',
    solLead: 'BlessMe is more than a supplier. We help our wholesale partners discover, validate, and launch a category that does not yet exist in Thailand — end-to-end.',
    solCtaEyebrow: 'READY TO TALK?', solCtaTitle: 'Bring a true point of difference to your menu.',
    solCtaBody: 'Wholesale enquiries, sample requests, and partnership conversations welcome.',
    solCtaBtn: 'Contact our team',
    blogEyebrow: 'JOURNAL', blogTitle: 'Notes from our team.',
    blogLead: 'Insights for partners and customers — on the category, our process, and the products we bring to market.',
    readMore: 'Read article →', featured: 'FEATURED',
    faqEyebrow: 'FREQUENTLY ASKED QUESTIONS', faqTitle: 'Questions, answered.',
    footerBlessing: 'Specialty food wholesale.\nBangkok, Thailand.',
    footerCatalogue: 'Catalogue', footerCompany: 'Company', footerContact: 'Contact',
    footerJournal: 'Journal',
    wholesale: 'Wholesale enquiry',
  },
  th: {
    nav: ['สินค้า', 'โซลูชัน', 'เกี่ยวกับเรา', 'บล็อก', 'คำถาม'],
    heroEyebrow: 'เบลสมี (ประเทศไทย) · ผู้จัดจำหน่ายอาหารพิเศษ',
    heroTitle: ['นำ', 'ประสบการณ์ใหม่', ' มาสู่เมนูของคุณ'],
    heroSub: 'เราค้นหา จัดหา และจัดส่งผลิตภัณฑ์อาหารพิเศษที่ให้พาร์ทเนอร์ของเรามีจุดแตกต่างที่แท้จริง — สินค้าที่ลูกค้าหาไม่ได้ที่อื่นในตลาด',
    heroCta1: 'ดูโซลูชันของเรา', heroCta2: 'ขอตัวอย่างสินค้า',
    heroMeta: 'แรกในไทย · มาตรฐานโรงงานที่เชื่อถือได้ · มีสต็อกพร้อมส่ง',
    productRange: 'ช่วงผลิตภัณฑ์', sixFlavors: 'หกรสชาติสำหรับค้าส่ง',
    productSub: 'คัดสรรมาเพื่อตลาดไทย เหมาะสำหรับคาเฟ่ ร้านอาหาร ร้านขายปลีก และแบรนด์ขนมหวาน',
    viewDetails: 'ดูรายละเอียด →',
    trustItems: [
      { n: '6',    l: 'รสชาติคัดสรร' },
      { n: '1st',  l: 'แรกในประเทศไทย' },
      { n: '12',   l: 'เดือน อายุผลิตภัณฑ์' },
      { n: '100%', l: 'สต็อกในกรุงเทพฯ' },
    ],
    modalPack: 'ขนาดบรรจุ', modalShelf: 'อายุผลิตภัณฑ์', modalStorage: 'การเก็บรักษา', modalOrigin: 'แหล่งกำเนิด',
    modalCta: 'ขอใบเสนอราคาค้าส่ง',
    modalSmall: 'มีปริมาณสั่งซื้อขั้นต่ำสำหรับค้าส่ง ติดต่อทีมงานของเราเพื่อราคา',
    aboutEyebrow: 'เกี่ยวกับเบลสมี (ประเทศไทย)',
    aboutTitle: 'พาร์ทเนอร์ที่น่าเชื่อถือสำหรับแบรนด์อาหารพิเศษ',
    aboutLead: 'บริษัท เบลสมี (ประเทศไทย) จำกัด นำผลิตภัณฑ์อาหารพิเศษเข้าสู่ตลาดไทย — ประสบการณ์ใหม่ที่ลูกค้าของเรากำลังมองหา แต่ไม่เคยพบที่ไหน',
    aboutBody1: 'เราทำงานร่วมกับคาเฟ่ ร้านอาหาร แบรนด์ขนมหวาน ร้านค้าปลีก และผู้ประกอบการบริการอาหาร ที่ต้องการสร้างความแตกต่างด้วยผลิตภัณฑ์ที่ใหม่สำหรับผู้บริโภค',
    aboutBody2: 'มีสำนักงานในกรุงเทพมหานคร เราดำเนินงานตามมาตรฐานความปลอดภัยด้านอาหารระดับสากล และรักษาสต็อกสม่ำเสมอตลอดทั้งปี',
    contactEyebrow: 'ติดต่อเรา', contactTitle: 'ยินดีรับการสอบถามค้าส่ง',
    formName: 'ชื่อของคุณ', formBusiness: 'ชื่อธุรกิจ', formEmail: 'อีเมล',
    formPhone: 'หมายเลขโทรศัพท์', formProduct: 'สินค้าที่สนใจ', formQty: 'ปริมาณต่อเดือนโดยประมาณ',
    formMsg: 'บอกเราเกี่ยวกับธุรกิจของคุณ (ไม่บังคับ)',
    formCta: 'ส่งข้อความ', formSending: 'กำลังส่ง…',
    formSuccess: 'ส่งข้อความแล้ว! เราจะติดต่อกลับภายใน 1 วันทำการ',
    formProducts: ['-- เลือกสินค้า --','บาร์เลย์','โอ๊ต','ถั่วแดง','แห้ว','ชีส','ดอกหอมหมื่นลี้','หลายรายการ / ทั้งหมด'],
    solEyebrow: 'โซลูชันของเรา', solTitle: 'กรอบการทำงาน 6 ขั้นตอน สำหรับการนำสิ่งใหม่สู่ตลาด',
    solLead: 'เบลสมีไม่ใช่แค่ซัพพลายเออร์ เราช่วยพาร์ทเนอร์ค้าส่งค้นพบ ยืนยัน และเปิดตัวหมวดหมู่ที่ยังไม่มีในไทย',
    solCtaEyebrow: 'พร้อมคุยแล้วหรือยัง?', solCtaTitle: 'นำจุดแตกต่างที่แท้จริงมาสู่เมนูของคุณ',
    solCtaBody: 'ยินดีรับการสอบถามค้าส่ง คำขอตัวอย่าง และการสนทนาเรื่องความร่วมมือ',
    solCtaBtn: 'ติดต่อทีมงาน',
    blogEyebrow: 'บทความ', blogTitle: 'บันทึกจากทีมงาน',
    blogLead: 'ข้อมูลเชิงลึกสำหรับพาร์ทเนอร์และลูกค้า — เกี่ยวกับหมวดหมู่ กระบวนการ และผลิตภัณฑ์ที่เรานำมาสู่ตลาด',
    readMore: 'อ่านบทความ →', featured: 'แนะนำ',
    faqEyebrow: 'คำถามที่พบบ่อย', faqTitle: 'คำถาม ตอบแล้ว',
    footerBlessing: 'ผู้จัดจำหน่ายอาหารพิเศษ\nกรุงเทพมหานคร ประเทศไทย',
    footerCatalogue: 'แคตตาล็อก', footerCompany: 'บริษัท', footerContact: 'ติดต่อ',
    footerJournal: 'บทความ',
    wholesale: 'สอบถามค้าส่ง',
  },
};

/* ===== URL ROUTING ===== */
const PATH_TO_PAGE = {
  '/':          'Products',
  '/solutions': 'Solutions',
  '/about':     'About us',
  '/blog':      'Blog',
  '/faq':       'FAQ',
};

const PAGE_TO_PATH = {
  'Products':  '/',
  'Solutions': '/solutions',
  'About us':  '/about',
  'Blog':      '/blog',
  'FAQ':       '/faq',
};

function getInitialState() {
  const path = window.location.pathname;
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

/* ===== PRODUCTS DATA ===== */
const PRODUCTS = [
  { id: 'barley',    name: 'Barley',         nameTh: 'บาร์เลย์',       tag: 'Signature flavor', flavor: 'Toasty · Nutty · Refined', flavorTh: 'คั่ว · กลิ่นถั่ว · ประณีต',
    img: '/assets/products/barley.webp',    imgFallback: '/assets/products/barley.png',
    note: 'Roasted Asian barley, captured in a bursting pearl. A grown-up topping for desserts, drinks, and bakery applications.',
    noteTh: 'บาร์เลย์อบจากเอเชีย ถูกกักไว้ในเม็ดบีดแตกกระจาย เป็นท็อปปิ้งพรีเมียมสำหรับของหวาน เครื่องดื่ม และเบเกอรี' },
  { id: 'oat',       name: 'Oat',            nameTh: 'โอ๊ต',           tag: 'Signature flavor', flavor: 'Creamy · Mellow · Modern', flavorTh: 'ครีมมี่ · นุ่มนวล · ทันสมัย',
    img: '/assets/products/oat.webp',       imgFallback: '/assets/products/oat.png',
    note: 'A clean, plant-forward oat profile sealed in a delicate pearl. Designed for the modern wellness category.',
    noteTh: 'รสโอ๊ตบริสุทธิ์ที่เน้นพืชเป็นหลัก ปิดผนึกในเม็ดบีดละเอียด ออกแบบมาสำหรับตลาดสุขภาพยุคใหม่' },
  { id: 'redbean',   name: 'Red Bean',       nameTh: 'ถั่วแดง',        tag: 'Signature flavor', flavor: 'Sweet · Earthy · Heritage', flavorTh: 'หวาน · ดินดั้งเดิม · คลาสสิก',
    img: '/assets/products/redbean.webp',   imgFallback: 'assets/products/redbean.png',
    note: 'A heritage Asian flavor profile, elevated. Pairs naturally with cold desserts, shaved ice, and pastries.',
    noteTh: 'รสชาติดั้งเดิมของเอเชียที่ยกระดับขึ้น เข้ากันได้ดีกับของหวานเย็น น้ำแข็งไส และขนมอบ' },
  { id: 'chestnut',  name: 'Water Chestnut', nameTh: 'แห้ว',           tag: 'Signature flavor', flavor: 'Crisp · Cool · Clean', flavorTh: 'กรอบ · เย็นสดชื่น · สะอาด',
    img: '/assets/products/chestnut.webp',  imgFallback: 'assets/products/chestnut.png',
    note: 'A signature crunch in pearl form — subtle, hydrating, distinctly Asian.',
    noteTh: 'ความกรุบกรอบเอกลักษณ์ในรูปแบบเม็ดบีด — ละเอียดอ่อน ให้ความชุ่มชื้น มีกลิ่นอายเอเชียชัดเจน' },
  { id: 'cheese',    name: 'Cheese',         nameTh: 'ชีส',            tag: 'Signature flavor', flavor: 'Salty · Rich · Savory-sweet', flavorTh: 'เค็ม · เข้มข้น · เค็มหวาน',
    img: '/assets/products/cheese.webp',    imgFallback: '/assets/products/cheese.jpg',
    note: 'A salted cream-cheese core. The trend-forward topping reshaping cold dessert and beverage menus.',
    noteTh: 'แกนครีมชีสเค็ม ท็อปปิ้งล้ำสมัยที่กำลังเปลี่ยนเมนูของหวานเย็นและเครื่องดื่ม' },
  { id: 'osmanthus', name: 'Osmanthus',      nameTh: 'ดอกหอมหมื่นลี้',   tag: 'Signature flavor', flavor: 'Floral · Honeyed · Elegant', flavorTh: 'ดอกไม้ · น้ำผึ้ง · หรูหรา',
    img: '/assets/products/osmanthus.webp', imgFallback: 'assets/products/osmanthus.png',
    note: 'Tiny gold flowers, steeped and sealed. A whisper of honey for the premium dessert tier.',
    noteTh: 'ดอกไม้สีทองขนาดเล็ก ชงแล้วปิดผนึก กลิ่นน้ำผึ้งอ่อนๆ สำหรับของหวานระดับพรีเมียม' },
];

/* ===== FAQ DATA (top-level for schema access) ===== */
const FAQS_EN = [
  { q: 'What products does BlessMe supply?', a: 'BlessMe is a specialty food wholesaler bringing new categories to the Thai market. Our current range features six signature flavors, with new specialty product lines in development.' },
  { q: 'Are the products vegan?', a: 'Yes. All six flavors in our current range are vegan and vegetarian. We use seaweed-derived alginate, not gelatin.' },
  { q: 'What is the minimum wholesale order?', a: 'Minimum order quantities depend on the partner profile and shipping arrangement. Please contact our team — we tailor each agreement to the client.' },
  { q: 'Do you provide samples before purchase?', a: 'Yes. We send sample tubs to qualified wholesale prospects so your team can taste and evaluate before committing.' },
  { q: 'How long is the shelf life?', a: 'Twelve months unopened, stored cool and dry. Once opened, refrigerate and use within 14 days for best texture.' },
  { q: 'Do you ship outside Bangkok?', a: 'Yes. We ship nationwide across Thailand from our Bangkok warehouse, and we are open to international wholesale enquiries.' },
  { q: 'How is BlessMe different from other suppliers?', a: 'We curate. Every product we carry is researched, sourced from trusted factories, tested with our partners, and supported by marketing that builds end-consumer demand. We help our partners launch categories that do not yet exist in the Thai market.' },
];
const FAQS_TH = [
  { q: 'เบลสมีจำหน่ายสินค้าอะไรบ้าง?', a: 'เบลสมีคือผู้ค้าส่งอาหารพิเศษที่นำหมวดหมู่ใหม่ๆ เข้าสู่ตลาดไทย ปัจจุบันเรามี 6 รสชาติซิกเนเจอร์ และกำลังพัฒนาสายผลิตภัณฑ์อาหารพิเศษใหม่ๆ เพิ่มเติม' },
  { q: 'ผลิตภัณฑ์เหมาะสำหรับผู้ทานมังสวิรัติหรือไม่?', a: 'ใช่ ทุกรสชาติทั้ง 6 รายการเหมาะสำหรับผู้ทานมังสวิรัติและวีแกน เราใช้สาหร่ายอัลจิเนตแทนเจลาติน' },
  { q: 'ปริมาณสั่งซื้อขั้นต่ำสำหรับค้าส่งคือเท่าไหร่?', a: 'ขึ้นอยู่กับโปรไฟล์พาร์ทเนอร์และการจัดการขนส่ง กรุณาติดต่อทีมงานของเรา — เราปรับข้อเสนอตามความต้องการของลูกค้าแต่ละราย' },
  { q: 'มีตัวอย่างสินค้าก่อนสั่งซื้อหรือไม่?', a: 'มี เราส่งถังตัวอย่างให้กับผู้สนใจค้าส่งที่มีคุณสมบัติ เพื่อให้ทีมงานของคุณได้ชิมและประเมินก่อนตัดสินใจ' },
  { q: 'อายุผลิตภัณฑ์นานเท่าไหร่?', a: 'สิบสองเดือนเมื่อยังไม่ได้เปิด เก็บในที่เย็นและแห้ง เมื่อเปิดแล้วให้แช่เย็นและใช้ภายใน 14 วัน เพื่อเนื้อสัมผัสที่ดีที่สุด' },
  { q: 'จัดส่งนอกกรุงเทพฯ ได้หรือไม่?', a: 'ได้ เราจัดส่งทั่วประเทศไทยจากคลังสินค้ากรุงเทพฯ และเรายินดีรับการสอบถามค้าส่งจากต่างประเทศด้วย' },
  { q: 'เบลสมีแตกต่างจากซัพพลายเออร์รายอื่นอย่างไร?', a: 'เราคัดสรร ทุกผลิตภัณฑ์ที่เราจำหน่ายได้รับการวิจัย จัดหาจากโรงงานที่น่าเชื่อถือ ทดสอบกับพาร์ทเนอร์ และสนับสนุนด้วยการตลาดที่สร้างความต้องการของผู้บริโภคปลายทาง เราช่วยพาร์ทเนอร์เปิดตัวหมวดหมู่ที่ยังไม่มีในตลาดไทย' },
];

/* ===== META TAG UPDATER ===== */
const BASE_URL = 'https://blessmethailand.com';
const ORG_DESCRIPTION = 'BlessMe (Thailand) — specialty food wholesaler supplying cafés, restaurants, and dessert brands with premium popping boba. 6 curated flavors, stock in Bangkok, 12-month shelf life.';

const PAGE_META = {
  Products: { title: 'BlessMe Thailand — Specialty Food Wholesale | Popping Boba', description: ORG_DESCRIPTION, canonical: `${BASE_URL}/` },
  Solutions: { title: 'How BlessMe Works — 6-Step Framework | BlessMe Thailand', description: 'Discover the six-step framework BlessMe uses to source, test, and supply specialty food products to wholesale partners across Thailand.', canonical: `${BASE_URL}/solutions` },
  'About us': { title: 'About BlessMe Thailand — Food Wholesaler Bangkok', description: 'BlessMe (Thailand) Co., Ltd. introduces specialty food categories to the Thai B2B market. Headquartered in Bangkok, serving cafés, restaurants, and dessert brands nationwide.', canonical: `${BASE_URL}/about` },
  Blog: { title: 'Journal — Specialty Food Insights | BlessMe Thailand', description: 'Notes from the BlessMe team on specialty food sourcing, cold-chain logistics, shelf life, and how to introduce new products to the Thai market.', canonical: `${BASE_URL}/blog` },
  FAQ: { title: 'FAQ — BlessMe Wholesale Thailand | Popping Boba Questions', description: 'Frequently asked questions about BlessMe wholesale pricing, minimum orders, shelf life, product range, and shipping across Thailand.', canonical: `${BASE_URL}/faq` },
};

const PAGE_META_TH = {
  Products: { title: 'เบลสมี ไทยแลนด์ — ขายส่งป็อปปิ่งโบบา และท็อปปิ่งคาเฟ่ ราคาส่ง', description: 'เบลสมี (ประเทศไทย) — แหล่งรวมวัตถุดิบคาเฟ่ ขายส่งท็อปปิ่ง ป็อปปิ่งโบบา 6 รสชาติพรีเมียม สต็อกพร้อมส่งในกรุงเทพฯ คุณภาพโรงงานมาตรฐาน อายุผลิตภัณฑ์ 12 เดือน', canonical: BASE_URL+'/' },
  Solutions: { title: 'โซลูชันวัตถุดิบอาหารพิเศษ — บริการพาร์ทเนอร์ค้าส่ง | เบลสมี ไทยแลนด์', description: 'เจาะลึกกระบวนการจัดหาและทดสอบวัตถุดิบอาหารพิเศษของเบลสมี เพื่อช่วยคาเฟ่และร้านอาหารสร้างจุดแตกต่างที่ยั่งยืนในตลาดไทย', canonical: BASE_URL+'/solutions' },
  'About us': { title: 'เกี่ยวกับ เบลสมี (ประเทศไทย) — ผู้นำเข้าและจัดจำหน่ายวัตถุดิบอาหารพิเศษ', description: 'เราคือพาร์ทเนอร์ที่ไว้วางใจได้สำหรับแบรนด์คาเฟ่และร้านขนมหวาน นำเข้าและสต็อกวัตถุดิบป็อปปิ่งโบบาพรีเมียมเพื่อธุรกิจ B2B ทั่วไทย', canonical: BASE_URL+'/about' },
  Blog: { title: 'บทความและข้อมูลเชิงลึก วัตถุดิบคาเฟ่และป็อปปิ่งโบบา | เบลสมี ไทยแลนด์', description: 'อัปเดตเทรนด์วัตถุดิบคาเฟ่ เทคนิคการเลือกท็อปปิ่ง และเบื้องหลังการจัดหาอาหารพิเศษจากทีมงานผู้เชี่ยวชาญของเบลสมี', canonical: BASE_URL+'/blog' },
  FAQ: { title: 'คำถามที่พบบ่อย — การสั่งซื้อป็อปปิ่งโบบาราคาส่ง | เบลสมี ไทยแลนด์', description: 'รวมทุกคำถามเกี่ยวกับการสั่งซื้อค้าส่ง ขั้นต่ำการสั่งซื้อ การจัดส่งทั่วไทย และการเก็บรักษาป็อปปิ่งโบบาและท็อปปิ่งของเบลสมี', canonical: BASE_URL+'/faq' },
};

function buildProductMeta(product, lang) {
  if (lang === 'th') {
    return {
      title: `${product.nameTh} ท็อปปิ่ง ป็อปปิ่งโบบา ค้าส่ง | เบลสมี ไทยแลนด์`,
      description: `${product.nameTh} — ${product.noteTh} สั่งซื้อค้าส่งจากเบลสมี ไทยแลนด์ สต็อกในกรุงเทพฯ อายุผลิตภัณฑ์ 12 เดือน`,
      canonical: `${BASE_URL}/products/${product.id}`
    };
  }
  return { title: `${product.name} Popping Boba Wholesale | BlessMe Thailand`, description: `${product.name} popping boba (${product.flavor}) — ${product.note} Available for wholesale from BlessMe Thailand. Stock in Bangkok, 12-month shelf life.`, canonical: `${BASE_URL}/products/${product.id}` };
}

function setMeta(title, description, canonical, lang='en') {
  document.title = title;
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute('content', description);
  const canonEl = document.querySelector('link[rel="canonical"]');
  if (canonEl) canonEl.setAttribute('href', canonical);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonical);
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', lang === 'th' ? 'th_TH' : 'en_US');
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', title);
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', description);
  // Update hreflang links dynamically
  document.querySelectorAll('link[hreflang]').forEach(el => el.setAttribute('href', canonical));
}

function updateMeta(page, productId = null, articleId = null, lang = 'en') {
  if (productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) { const m = buildProductMeta(product, lang); setMeta(m.title, m.description, m.canonical, lang); return; }
  }
  if (articleId) {
    const article = getArticleById(articleId);
    if (article) { const m = getArticleMeta(article, lang, BASE_URL); setMeta(m.title, m.description, m.canonical, lang); return; }
  }
  const metaSet = lang === 'th' ? PAGE_META_TH : PAGE_META;
  const m = metaSet[page] || metaSet.Products;
  setMeta(m.title, m.description, m.canonical, lang);
}

/* ===== SCHEMA.ORG JSON-LD UPDATER ===== */
const ORG_SCHEMA = { "@context": "https://schema.org", "@type": "LocalBusiness", "name": "BlessMe (Thailand) Co., Ltd.", "url": "https://blessmethailand.com", "logo": "https://blessmethailand.com/assets/logo-full.png", "image": "https://blessmethailand.com/assets/logo-full.png", "description": "Specialty food wholesaler supplying cafés, restaurants, and dessert brands with premium popping boba in Thailand.", "address": { "@type": "PostalAddress", "addressLocality": "Bangkok", "addressCountry": "TH" }, "contactPoint": { "@type": "ContactPoint", "telephone": "+66-82-896-5199", "email": "Blessme.team@gmail.com", "contactType": "sales", "areaServed": "TH", "availableLanguage": ["Thai", "English"] }, "sameAs": ["https://instagram.com/blessme_thailand", "https://facebook.com/BlessMeThailand"], "priceRange": "฿฿", "areaServed": { "@type": "Country", "name": "Thailand" } };

const PAGE_NAMES = { Products: 'BlessMe Thailand — Specialty Food Wholesale', Solutions: 'How BlessMe Works', 'About us': 'About BlessMe Thailand', Blog: 'Journal — Specialty Food Insights', FAQ: 'FAQ — BlessMe Wholesale Thailand' };

function buildWebPageSchema(page, canonical) {
  return { "@context": "https://schema.org", "@type": "WebPage", "name": PAGE_NAMES[page] || PAGE_NAMES.Products, "url": canonical, "isPartOf": { "@id": "https://blessmethailand.com" } };
}

function buildProductSchema(product) {
  return { "@context": "https://schema.org", "@type": "Product", "name": `${product.name} Popping Boba`, "description": `${product.note} ${product.flavor}.`, "image": `https://blessmethailand.com/${product.imgFallback}`, "brand": { "@type": "Brand", "name": "BlessMe Thailand" }, "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "THB", "seller": { "@type": "Organization", "name": "BlessMe (Thailand) Co., Ltd." } } };
}

function buildBreadcrumbSchema(items) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items.map((item, idx) => ({ "@type": "ListItem", "position": idx + 1, "name": item.name, "item": item.url })) };
}

function buildFAQSchema(faqs) {
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

function updateSchema(page, productId = null, articleId = null, lang = 'en') {
  const el = document.getElementById('bm-schema');
  if (!el) return;
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
      schemas.push(getArticleSchema(article, lang));
      schemas.push(buildBreadcrumbSchema([{ name: 'Home', url: 'https://blessmethailand.com/' }, { name: 'Journal', url: 'https://blessmethailand.com/blog' }, { name: lang === 'th' ? article.titleTh : article.title, url: `https://blessmethailand.com/blog/${article.id}` }]));
    }
  } else {
    const m = (lang === 'th' ? PAGE_META_TH : PAGE_META)[page];
    if (m) schemas.push(buildWebPageSchema(page, m.canonical));
    if (page === 'Products') {
      schemas.push({ "@context": "https://schema.org", "@type": "ItemList", "name": "BlessMe Popping Boba — Wholesale Product Range", "url": "https://blessmethailand.com/", "numberOfItems": PRODUCTS.length, "itemListElement": PRODUCTS.map((p, idx) => ({ "@type": "ListItem", "position": idx + 1, "url": `https://blessmethailand.com/products/${p.id}`, "name": `${p.name} Popping Boba` })) });
    }
    if (page === 'FAQ') {
      schemas.push(buildFAQSchema(lang === 'th' ? FAQS_TH : FAQS_EN));
    }
  }
  el.textContent = schemas.length === 1 ? JSON.stringify(schemas[0]) : JSON.stringify(schemas);
}

/* ===== NAV ===== */
function Nav({ page, setPage, lang, setLang }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const t = T[lang];
  const navigate = (p) => { setMenuOpen(false); setPage(p); };
  return (
    <>
      <header className="bm-nav-shell">
        <nav className="bm-nav" role="navigation" aria-label="Main navigation">
          <a className="bm-brand" href="#" aria-label="BlessMe — go to homepage" onClick={(e) => { e.preventDefault(); navigate('Products'); }}>
            <img src="/assets/logo-full.png" alt="BlessMe Thailand" />
          </a>
          <div className="bm-links" role="menubar">
            {t.nav.map((l, i) => {
              const key = ['Products','Solutions','About us','Blog','FAQ'][i];
              return (
                <a key={key} role="menuitem" className={page === key ? 'active' : ''} onClick={() => navigate(key)}
                  aria-current={page === key ? 'page' : undefined}>{l}</a>
              );
            })}
          </div>
          <div className="bm-nav-right">
            <span className="bm-nav-contact-line">+66 (0) 82-896-5199</span>
            <div className="bm-lang-toggle" role="group" aria-label="Language">
              <button className={`bm-lang-btn${lang==='en'?' active':''}`} onClick={() => setLang('en')} aria-pressed={lang==='en'}>EN</button>
              <button className={`bm-lang-btn${lang==='th'?' active':''}`} onClick={() => setLang('th')} aria-pressed={lang==='th'}>TH</button>
            </div>
            <button className="bm-btn bm-btn--primary bm-btn--sm" onClick={() => navigate('Solutions')}>{t.wholesale}</button>
            <button className={`bm-hamburger${menuOpen?' is-open':''}`} aria-label={menuOpen?'Close menu':'Open menu'}
              aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
              <span/><span/><span/>
            </button>
          </div>
        </nav>
      </header>
      <div id="mobile-menu" className={`bm-mobile-menu${menuOpen?' is-open':''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        {t.nav.map((l, i) => {
          const key = ['Products','Solutions','About us','Blog','FAQ'][i];
          return <a key={key} onClick={() => navigate(key)} aria-current={page===key?'page':undefined}>{l}</a>;
        })}
        <div className="bm-lang-toggle" role="group" aria-label="Language" style={{marginTop:8}}>
          <button className={`bm-lang-btn${lang==='en'?' active':''}`} onClick={() => setLang('en')}>EN</button>
          <button className={`bm-lang-btn${lang==='th'?' active':''}`} onClick={() => setLang('th')}>TH</button>
        </div>
        <button className="bm-btn bm-btn--primary" onClick={() => navigate('Solutions')}>{t.wholesale}</button>
      </div>
    </>
  );
}

/* ===== TRUST BAR ===== */
function TrustBar({ lang }) {
  const items = T[lang].trustItems;
  return (
    <div className="bm-trustbar">
      {items.map(i => (
        <div key={i.l} className="bm-trustbar-item">
          <div className="n">{i.n}</div>
          <div className="l">{i.l}</div>
        </div>
      ))}
    </div>
  );
}

/* ===== PRODUCT CARD ===== */
const ProductCard = React.memo(function ProductCard({ product, blessed, onClick, lang }) {
  const t = T[lang];
  const displayName = lang === 'th' ? product.nameTh : product.name;
  const displayNote = lang === 'th' ? product.noteTh : product.note;
  return (
    <article className="bm-recipe" onClick={onClick} role="button" tabIndex={0}
      aria-label={`View details for ${displayName} popping boba`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}>
      <div className="bm-recipe-img">
        {blessed && <span className="bm-corner">SIGNATURE</span>}
        <picture>
          <source srcSet={product.img} type="image/webp" />
          <img src={product.imgFallback} alt={`${displayName} popping boba`} loading="lazy" width="400" height="260" />
        </picture>
      </div>
      <div className="bm-recipe-body">
        <div className="bm-meta">{product.tag.toUpperCase()}</div>
        <h3 className="bm-recipe-title">{displayName}</h3>
        <p className="bm-product-flavor">{lang === 'th' && product.flavorTh ? product.flavorTh : product.flavor}</p>
        <p className="bm-product-note">{displayNote}</p>
        <div className="bm-card-cta" aria-hidden="true">{t.viewDetails}</div>
      </div>
    </article>
  );
});

/* ===== PRODUCT DETAIL MODAL ===== */
function ProductDetail({ product, onClose, lang }) {
  const [qty, setQty] = useState(12);
  const t = T[lang];
  const displayName = lang === 'th' ? product.nameTh : product.name;
  const displayNote = lang === 'th' ? product.noteTh : product.note;

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product) return null;

  const quoteSubject = encodeURIComponent(`Wholesale Quote Request — ${product.name} (x${qty} tubs)`);
  const quoteBody = encodeURIComponent(
    `Hello BlessMe Team,\n\nI would like to request a wholesale quote for:\n\nProduct: ${product.name}\nQuantity: ${qty} tubs\n\nPlease let me know pricing and minimum order details.\n\nThank you.`
  );
  const quoteHref = `mailto:Blessme.team@gmail.com?subject=${quoteSubject}&body=${quoteBody}`;

  return (
    <div className="bm-modal-scrim" onClick={onClose} role="presentation">
      <div className="bm-modal" onClick={(e) => e.stopPropagation()}
        role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="bm-modal-close" onClick={onClose} aria-label="Close product details">×</button>
        <div className="bm-modal-img">
          <picture>
            <source srcSet={product.img} type="image/webp" />
            <img src={product.imgFallback} alt={`${displayName} popping boba`} width="600" height="400" style={{aspectRatio:'3/2'}} />
          </picture>
        </div>
        <div className="bm-modal-body">
          <div className="bm-eyebrow">{product.tag.toUpperCase()}</div>
          <h2 className="bm-h1" id="modal-title">{displayName}</h2>
          <p className="bm-product-flavor" style={{ marginTop: 4 }}>{lang === 'th' && product.flavorTh ? product.flavorTh : product.flavor}</p>
          <p className="bm-body" style={{ marginTop: 16 }}>{displayNote}</p>
          <div className="bm-spec-grid" role="list" aria-label="Product specifications">
            <div role="listitem"><div className="k">{t.modalPack}</div><div className="v">500g</div></div>
            <div role="listitem"><div className="k">{t.modalShelf}</div><div className="v">{lang==='th'?'12 เดือน':'12 months'}</div></div>
            <div role="listitem"><div className="k">{t.modalStorage}</div><div className="v">{lang==='th'?'อุณหภูมิห้อง ที่แห้ง':'Room Temperature, dry'}</div></div>
            <div role="listitem"><div className="k">{t.modalOrigin}</div><div className="v">{lang==='th'?'เอเชีย · โรงงานมาตรฐาน':'Asia · trusted factory'}</div></div>
          </div>
          <div className="bm-buy-row">
            <div className="bm-stepper" role="group" aria-label="Order quantity">
              <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span aria-live="polite" aria-atomic="true">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <a className="bm-btn bm-btn--primary" style={{ flex: 1, justifyContent: 'center' }} href={quoteHref}>
              {t.modalCta}
            </a>
          </div>
          <p className="bm-small" style={{ marginTop: 10 }}>{t.modalSmall}</p>
        </div>
      </div>
    </div>
  );
}

/* ===== PRODUCTS PAGE ===== */
function ProductsPage({ onOpen, setPage, lang }) {
  const t = T[lang];
  return (
    <>
      <section className="bm-hero bm-hero--sky">
        <div className="bm-hero-content">
          <div className="bm-eyebrow">{t.heroEyebrow}</div>
          <h1 className="bm-hero-title">
            {t.heroTitle[0]}<span className="bm-highlight-sky">{t.heroTitle[1]}</span>{t.heroTitle[2]}
          </h1>
          <p className="bm-hero-sub">{t.heroSub}</p>
          <div className="bm-hero-actions">
            <button className="bm-btn bm-btn--primary" onClick={() => setPage('Solutions')}>{t.heroCta1}</button>
            <button className="bm-btn bm-btn--ghost" onClick={() => setPage('About us')}>{t.heroCta2}</button>
          </div>
          <div className="bm-hero-meta">
            <span className="bm-checks">✓ ✓ ✓</span>
            <span>{t.heroMeta}</span>
          </div>
        </div>
        <div className="bm-hero-deco">
          <div className="bm-hero-mark"><img src="/assets/logo-full.png" alt="BlessMe Thailand" width="360" height="360" /></div>
        </div>
      </section>

      <section className="bm-featured">
        <div className="bm-featured-head">
          <div>
            <div className="bm-eyebrow">{t.productRange}</div>
            <h2 className="bm-h1">{t.sixFlavors}</h2>
          </div>
          <p className="bm-lead-sub">{t.productSub}</p>
        </div>
        <div className="bm-recipe-grid">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} blessed={i === 0} onClick={() => onOpen(p)} lang={lang} />
          ))}
        </div>
      </section>

      <TrustBar lang={lang} />
    </>
  );
}

/* ===== ABOUT PAGE ===== */
function AboutPage({ lang }) {
  const t = T[lang];
  return (
    <section className="bm-content-page">
      <div className="bm-eyebrow">{t.aboutEyebrow}</div>
      <h2 className="bm-h1">{t.aboutTitle}</h2>
      <div className="bm-two-col">
        <div>
          <p className="bm-lead">{t.aboutLead}</p>
          <p className="bm-body" style={{ marginTop: 20 }}>{t.aboutBody1}</p>
          <p className="bm-body" style={{ marginTop: 16 }}>{t.aboutBody2}</p>
        </div>
        <div className="bm-stat-stack">
          <div className="bm-stat bm-stat--sky"><div className="n">1<sup>st</sup></div><div className="l">{lang==='th'?'แรกในไทย':'In Thailand'}</div></div>
          <div className="bm-stat"><div className="n">6</div><div className="l">{lang==='th'?'รสชาติคัดสรร':'Curated flavors'}</div></div>
          <div className="bm-stat"><div className="n">100%</div><div className="l">{lang==='th'?'สต็อกในกรุงเทพฯ':'Stock in Bangkok'}</div></div>
          <div className="bm-stat bm-stat--lime"><div className="n">B2B</div><div className="l">{lang==='th'?'ค้าส่งเท่านั้น':'Wholesale focus'}</div></div>
        </div>
      </div>

      <div className="bm-contact-block">
        <div className="bm-contact-head">
          <div className="bm-eyebrow" style={{ color: 'var(--ci-sky)' }}>{t.contactEyebrow}</div>
          <h2 className="bm-h2-cta">{t.contactTitle}</h2>
        </div>
        <div className="bm-contact-grid">
          <ContactItem k="EMAIL"      v="Blessme.team@gmail.com" href="mailto:Blessme.team@gmail.com" />
          <ContactItem k="PHONE"      v="+66 (0) 82-896-5199" sub="คุณจ้า" href="tel:+66828965199" />
          <ContactItem k="LINE"       v="@591dzhsr" href="https://line.me/R/ti/p/@591dzhsr" />
          <ContactItem k="INSTAGRAM"  v="blessme_thailand" href="https://instagram.com/blessme_thailand" />
          <ContactItem k="FACEBOOK"   v="@BlessMe Thailand" href="https://facebook.com/BlessMeThailand" />
          <ContactItem k="WAREHOUSE"  v="Bangkok, Thailand" />
        </div>

        {/* ===== CONTACT FORM (Web3Forms) ===== */}
        <ContactForm lang={lang} t={t} />
      </div>
    </section>
  );
}

function ContactItem({ k, v, sub, href }) {
  return (
    <div className="bm-contact-item">
      <div className="bm-contact-k">{k}</div>
      {href
        ? <a className="bm-contact-v" href={href} target={href.startsWith('http')?'_blank':undefined}
            rel={href.startsWith('http')?'noopener noreferrer':undefined} style={{textDecoration:'none'}}>{v}</a>
        : <div className="bm-contact-v">{v}</div>
      }
      {sub && <div className="bm-contact-sub">{sub}</div>}
    </div>
  );
}

/* ===== CONTACT FORM (Web3Forms — free, no backend) ===== */
function ContactForm({ lang, t }) {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const W3F_ACCESS_KEY = '6a29a76e-ace2-44da-8bc4-22c10901684e'; // get free key at web3forms.com

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.target);
    data.append('access_key', W3F_ACCESS_KEY);
    data.append('subject', `BlessMe Wholesale Enquiry — ${data.get('business') || data.get('name')}`);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, signal: controller.signal });
      clearTimeout(timeout);
      const json = await res.json();
      setStatus(json.success ? 'success' : 'error');
    } catch (err) {
      clearTimeout(timeout);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bm-form-success">
        <span>✓</span>
        {t.formSuccess}
      </div>
    );
  }

  const isTh = lang === 'th';
  return (
    <form className="bm-form" onSubmit={handleSubmit} noValidate>
      <div className="bm-form-row">
        <div className="bm-field">
          <label htmlFor="f-name">{t.formName}</label>
          <input id="f-name" name="name" type="text" placeholder={t.formName} required />
        </div>
        <div className="bm-field">
          <label htmlFor="f-biz">{t.formBusiness}</label>
          <input id="f-biz" name="business" type="text" placeholder={t.formBusiness} required />
        </div>
      </div>
      <div className="bm-form-row">
        <div className="bm-field">
          <label htmlFor="f-email">{t.formEmail}</label>
          <input id="f-email" name="email" type="email" placeholder={t.formEmail} required />
        </div>
        <div className="bm-field">
          <label htmlFor="f-phone">{t.formPhone}</label>
          <input id="f-phone" name="phone" type="tel" placeholder={t.formPhone} />
        </div>
      </div>
      <div className="bm-form-row">
        <div className="bm-field">
          <label htmlFor="f-product">{t.formProduct}</label>
          <select id="f-product" name="product">
            {t.formProducts.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="bm-field">
          <label htmlFor="f-qty">{t.formQty}</label>
          <input id="f-qty" name="qty" type="text" placeholder={isTh ? 'เช่น 10 ห่อ/เดือน' : 'e.g. 10 packs/month'} />
        </div>
      </div>
      <div className="bm-field">
        <label htmlFor="f-msg">{t.formMsg}</label>
        <textarea id="f-msg" name="message" placeholder={t.formMsg} />
      </div>
      <button type="submit" className="bm-btn bm-btn--sky" disabled={status==='sending'}
        style={{ alignSelf: 'flex-start', opacity: status==='sending'?0.7:1 }}>
        {status === 'sending' ? t.formSending : t.formCta}
      </button>
      {status === 'error' && (
        <p style={{ color: '#f2768a', fontSize: 14, marginTop: 8 }}>
          {isTh ? 'เกิดข้อผิดพลาด กรุณาลองใหม่หรือส่ง LINE โดยตรง' : 'Something went wrong. Please try again or contact us on LINE.'}
        </p>
      )}
    </form>
  );
}

/* ===== SOLUTIONS PAGE ===== */
function SolutionsPage({ setPage, lang }) {
  const t = T[lang];
  const stepsEn = [
    { n: '01', t: 'Client Request',
      d: 'Our clients are looking for a new experience — a true point of difference from existing products in the market. We start every engagement by listening.' },
    { n: '02', t: 'Research',
      d: 'There is currently no prior use of this product in Thailand. We map the category, study consumer behavior, and identify the gap our partners can own.' },
    { n: '03', t: 'Sourcing',
      d: 'We identify and partner with a trusted factory delivering the best balance of price, quality, and food-safety standards — vetted in person, audited continuously.' },
    { n: '04', t: 'Testing',
      d: 'We test products with our partners and end consumers. Every product goes through rounds of feedback before it is approved for the wholesale catalogue.' },
    { n: '05', t: 'Stock',
      d: 'We hold consistent stock in our Bangkok warehouse so our partners never face downtime. Forecast-driven inventory protects launch schedules and reorders.' },
    { n: '06', t: 'Marketing',
      d: 'We educate the market — building consumer awareness and demand through brand storytelling, retail support, and content — so our partners receive ready-to-buy customers.' },
  ];
  const stepsTh = [
    { n: '01', t: 'ความต้องการของลูกค้า', d: 'ลูกค้าของเรากำลังมองหาประสบการณ์ใหม่ — จุดแตกต่างที่แท้จริง เราเริ่มต้นทุกการมีส่วนร่วมด้วยการฟัง' },
    { n: '02', t: 'การวิจัย', d: 'ปัจจุบันยังไม่มีการใช้ผลิตภัณฑ์นี้ในประเทศไทย เราทำแผนผังหมวดหมู่ ศึกษาพฤติกรรมผู้บริโภค และระบุช่องว่างที่พาร์ทเนอร์ของเราสามารถครอบครองได้' },
    { n: '03', t: 'การจัดหา', d: 'เราระบุและเป็นพาร์ทเนอร์กับโรงงานที่น่าเชื่อถือที่มอบสมดุลที่ดีที่สุดของราคา คุณภาพ และมาตรฐานความปลอดภัยด้านอาหาร — ตรวจสอบด้วยตนเอง ตรวจสอบอย่างต่อเนื่อง' },
    { n: '04', t: 'การทดสอบ', d: 'เราทดสอบผลิตภัณฑ์กับพาร์ทเนอร์และผู้บริโภคปลายทาง ทุกผลิตภัณฑ์ผ่านรอบฟีดแบ็กหลายรอบก่อนได้รับการอนุมัติให้เข้าแคตตาล็อกค้าส่ง' },
    { n: '05', t: 'สต็อก', d: 'เรารักษาสต็อกที่สม่ำเสมอในคลังสินค้ากรุงเทพฯ เพื่อให้พาร์ทเนอร์ไม่เคยหยุดชะงัก สินค้าคงคลังที่ขับเคลื่อนด้วยการพยากรณ์ช่วยปกป้องกำหนดการเปิดตัวและการสั่งซื้อซ้ำ' },
    { n: '06', t: 'การตลาด', d: 'เราให้ความรู้แก่ตลาด — สร้างการรับรู้และความต้องการของผู้บริโภคผ่านการเล่าเรื่องแบรนด์ การสนับสนุนการขายปลีก และเนื้อหา — เพื่อให้พาร์ทเนอร์ได้รับลูกค้าที่พร้อมซื้อ' },
  ];
  const steps = lang === 'th' ? stepsTh : stepsEn;

  return (
    <section className="bm-content-page">
      <div className="bm-eyebrow">{t.solEyebrow}</div>
      <h1 className="bm-h1">{t.solTitle}</h1>
      <p className="bm-lead" style={{ maxWidth: '64ch', marginTop: 22 }}>
        {t.solLead}
      </p>
      <div className="bm-solution-grid">
        {steps.map(s => (
          <div key={s.n} className="bm-solution">
            <div className="bm-solution-head">
              <span className="bm-solution-num">{s.n}</span>
              <div className="bm-solution-line"/>
            </div>
            <h3 className="bm-solution-title">{s.t}</h3>
            <p className="bm-solution-desc">{s.d}</p>
          </div>
        ))}
      </div>
      <div className="bm-solution-cta">
        <div>
          <div className="bm-eyebrow" style={{ color: 'var(--ci-sky)' }}>{t.solCtaEyebrow}</div>
          <h2 className="bm-h2-cta">{t.solCtaTitle}</h2>
          <p className="bm-body bm-body--inv" style={{ marginTop: 14, maxWidth: '52ch' }}>
            {t.solCtaBody}
          </p>
        </div>
        <button className="bm-btn bm-btn--sky" onClick={() => setPage('About us')}>{t.solCtaBtn}</button>
      </div>
    </section>
  );
}

function BlogCard({ article, onOpenArticle, lang, compact = false }) {
  const title = lang === 'th' ? article.titleTh : article.title;
  const excerpt = lang === 'th' ? article.excerptTh : article.excerpt;
  const category = lang === 'th' ? article.catTh || article.cat : article.cat;
  const meta = `${(lang === 'th' ? article.dateTh : article.date).toUpperCase()} · ${(lang === 'th' ? article.readTh : article.read).toUpperCase()}`;
  const cta = lang === 'th' ? 'อ่านบทความ' : 'Read article';

  return (
    <article className={`bm-blog-card${compact ? ' bm-blog-card--compact' : ''}`}>
      <button
        type="button"
        className="bm-blog-card-hit"
        onClick={() => onOpenArticle(article.id)}
        aria-label={`${cta}: ${title}`}
      >
        <div className="bm-blog-img">
          {article.img ? (
            <img src={article.img} alt={title} loading="lazy" />
          ) : (
            <div className="bm-blog-fill" style={{ background: article.cover }} />
          )}
          <span className="bm-blog-cat">{category}</span>
        </div>
        <div className="bm-blog-body">
          <div className="bm-meta">{meta}</div>
          <h3 className="bm-blog-title">{title}</h3>
          {!compact && <p className="bm-blog-excerpt">{excerpt}</p>}
          <div className="bm-card-cta">{cta} →</div>
        </div>
      </button>
    </article>
  );
}

function renderArticleBlock(block, index) {
  const [tag, content] = block;

  if (tag === 'h2') return <h2 key={index} className="bm-article-h2">{content}</h2>;
  if (tag === 'h3') return <h3 key={index} className="bm-article-h3">{content}</h3>;
  if (tag === 'quote') return <blockquote key={index} className="bm-article-quote">{content}</blockquote>;
  if (tag === 'ul') {
    return (
      <ul key={index} className="bm-article-list">
        {content.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  if (tag === 'image') {
    return (
      <figure key={index} className="bm-article-figure">
        <img src={content.src} alt={content.alt} className="bm-article-inline-img" loading="lazy" />
        {content.caption && <figcaption className="bm-article-caption">{content.caption}</figcaption>}
      </figure>
    );
  }

  return <p key={index} className="bm-article-p">{content}</p>;
}

/* ===== BLOG INDEX ===== */
function BlogPage({ onOpenArticle, lang }) {
  const t = T[lang];
  const labels = lang === 'th'
    ? {
        allTopics: 'ทุกหัวข้อ',
        search: 'ค้นหาบทความ',
        searchPlaceholder: 'ค้นหาจากหัวข้อ คำอธิบาย หรือหมวดหมู่',
        articleCollection: 'บทความทั้งหมด',
        results: 'ผลลัพธ์',
        emptyTitle: 'ยังไม่พบบทความที่ตรงกัน',
        emptyBody: 'ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น',
      }
    : {
        allTopics: 'All topics',
        search: 'Search articles',
        searchPlaceholder: 'Search by title, summary, or topic',
        articleCollection: 'All articles',
        results: 'Results',
        emptyTitle: 'No articles match that search yet.',
        emptyBody: 'Try a different keyword or switch topics.',
      };
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const categories = React.useMemo(
    () => [{ id: 'all', label: labels.allTopics }, ...getBlogCategories(lang)],
    [lang, labels.allTopics]
  );
  const normalizedQuery = query.trim().toLowerCase();
  const filteredArticles = React.useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory = activeCategory === 'all' || article.cat === activeCategory;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      const haystack = [
        article.title,
        article.titleTh,
        article.excerpt,
        article.excerptTh,
        article.cat,
        article.catTh,
      ].join(' ').toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [activeCategory, normalizedQuery]);
  const featured = filteredArticles[0] || null;
  const rest = filteredArticles.slice(1);

  return (
    <section className="bm-content-page bm-blog-page">
      <div className="bm-blog-shell">
        <div className="bm-blog-intro">
          <div className="bm-eyebrow">{t.blogEyebrow}</div>
          <h1 className="bm-h1">{t.blogTitle}</h1>
          <p className="bm-lead bm-blog-lead">{t.blogLead}</p>
        </div>

        <section className="bm-blog-tools" aria-label={labels.search}>
          <label className="bm-blog-search">
            <span className="bm-blog-search-label">{labels.search}</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
            />
          </label>
          <div className="bm-blog-filters" role="tablist" aria-label={labels.allTopics}>
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`bm-filter-pill${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={isActive}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </section>

        <div className="bm-blog-results-head">
          <div className="bm-eyebrow">{normalizedQuery || activeCategory !== 'all' ? labels.results : labels.articleCollection}</div>
          <div className="bm-blog-count">{filteredArticles.length} {lang === 'th' ? 'บทความ' : 'articles'}</div>
        </div>

        {featured ? (
          <>
            <article className="bm-feature-article">
              <button
                type="button"
                className="bm-feature-link"
                onClick={() => onOpenArticle(featured.id)}
                aria-label={`${t.readMore} ${lang === 'th' ? featured.titleTh : featured.title}`}
              >
                <div className="bm-feature-cover">
                  {featured.img ? (
                    <img src={featured.img} alt={lang === 'th' ? featured.titleTh : featured.title} loading="lazy" />
                  ) : (
                    <div className="bm-blog-fill" style={{ background: featured.cover }} />
                  )}
                  <span className="bm-blog-cat">{lang === 'th' ? featured.catTh || featured.cat : featured.cat}</span>
                </div>
                <div className="bm-feature-body">
                  <div className="bm-meta">{t.featured} · {(lang === 'th' ? featured.dateTh : featured.date).toUpperCase()} · {(lang === 'th' ? featured.readTh : featured.read).toUpperCase()}</div>
                  <h2 className="bm-feature-title">{lang === 'th' ? featured.titleTh : featured.title}</h2>
                  <p className="bm-feature-excerpt">{lang === 'th' ? featured.excerptTh : featured.excerpt}</p>
                  <div className="bm-card-cta">{t.readMore}</div>
                </div>
              </button>
            </article>

            {rest.length > 0 && (
              <div className="bm-blog-grid">
                {rest.map((article) => (
                  <BlogCard key={article.id} article={article} onOpenArticle={onOpenArticle} lang={lang} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="bm-blog-empty">
            <h2>{labels.emptyTitle}</h2>
            <p>{labels.emptyBody}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ===== ARTICLE PAGE ===== */
function ArticlePage({ articleId, onBack, onOpenArticle, lang }) {
  const article = getArticleById(articleId) || ARTICLES[0];
  const others = getRelatedArticles(article.id, 3);
  const { previous, next } = getAdjacentArticles(article.id);
  const shareUrl = `${BASE_URL}/blog/${article.id}`;
  const title = lang === 'th' ? article.titleTh : article.title;
  const excerpt = lang === 'th' ? article.excerptTh : article.excerpt;
  const category = lang === 'th' ? article.catTh || article.cat : article.cat;
  const authorRole = lang === 'th' ? article.authorRoleTh || article.authorRole : article.authorRole;
  const blocks = getArticleBlocks(article, lang);
  const heroCaption = lang === 'th'
    ? article.imgCaptionTh || article.imgAlt
    : article.imgCaption || article.imgAlt;
  const [copied, setCopied] = useState(false);
  const copyLinkLabel = copied
    ? (lang === 'th' ? 'คัดลอกแล้ว' : 'Copied')
    : (lang === 'th' ? 'คัดลอกลิงก์' : 'Copy link');

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        window.prompt('Copy this link', shareUrl);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      window.prompt('Copy this link', shareUrl);
    }
  };

  return (
    <article className="bm-article-page">
      <button className="bm-back-link" onClick={onBack}>
        {lang === 'th' ? '← บทความทั้งหมด' : '← All articles'}
      </button>

      <div className="bm-article-main">
        <header className="bm-article-head">
          <div className="bm-eyebrow">{category.toUpperCase()}</div>
          <h1 className="bm-article-title">{title}</h1>
          <div className="bm-article-meta">
            <span>{lang === 'th' ? article.dateTh : article.date}</span>
            <span className="dot">·</span>
            <span>{lang === 'th' ? article.readTh : article.read}</span>
          </div>
          <p className="bm-article-excerpt">{excerpt}</p>
        </header>

        {article.img ? (
          <figure className="bm-article-figure bm-article-figure--hero">
            <img src={article.img} alt={article.imgAlt} className="bm-article-hero-img" width="1080" height="608" />
            {heroCaption && <figcaption className="bm-article-caption">{heroCaption}</figcaption>}
          </figure>
        ) : (
          <div className="bm-article-cover" style={{ background: article.cover }} />
        )}

        <div className="bm-article-body">
          {blocks.map((block, index) => renderArticleBlock(block, index))}
        </div>

        <div className="bm-article-support">
          <div className="bm-article-panel">
            <div className="bm-eyebrow">{lang === 'th' ? 'เขียนโดย' : 'Written by'}</div>
            <h2>{article.author}</h2>
            <p>{authorRole}</p>
          </div>
          <div className="bm-article-panel">
            <div className="bm-eyebrow">{lang === 'th' ? 'แบ่งปัน' : 'Share'}</div>
            <div className="bm-article-actions">
              <button type="button" className="bm-article-action" onClick={handleCopyLink}>{copyLinkLabel}</button>
              <a className="bm-article-action" href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${shareUrl}`)}`}>
                {lang === 'th' ? 'ส่งอีเมล' : 'Email article'}
              </a>
            </div>
          </div>
          <div className="bm-article-panel">
            <div className="bm-eyebrow">{lang === 'th' ? 'คุยกับเรา' : 'Talk to us'}</div>
            <p>{lang === 'th' ? 'หากคุณต้องการนำสินค้าหมวดหมู่นี้ไปใช้กับเมนูของคุณ ทีมงานของเราพร้อมช่วยประเมินการเปิดตัว' : 'If you are considering this category for your menu, our team can help evaluate launch fit and sample timing.'}</p>
            <a className="bm-inline-link" href="mailto:Blessme.team@gmail.com">Blessme.team@gmail.com</a>
          </div>
        </div>

        <div className="bm-article-footer">
          <div className="bm-eyebrow">{lang === 'th' ? '— จบ —' : '— END —'}</div>
          <p className="bm-article-signoff">
            {lang === 'th'
              ? <>มีคำถามเกี่ยวกับสิ่งที่คุณได้อ่านที่นี่ใช่ไหม? ติดต่อเราได้ที่ <strong>Blessme.team@gmail.com</strong></>
              : <>Have a question about anything you read here? Reach out at <strong>Blessme.team@gmail.com</strong>.</>}
          </p>
        </div>

        {(previous || next) && (
          <nav className="bm-article-nav" aria-label={lang === 'th' ? 'การนำทางบทความ' : 'Article navigation'}>
            {previous ? (
              <button type="button" className="bm-article-nav-card" onClick={() => onOpenArticle(previous.id)}>
                <span className="bm-eyebrow">{lang === 'th' ? 'เก่ากว่า' : 'Older'}</span>
                <strong>{lang === 'th' ? previous.titleTh : previous.title}</strong>
              </button>
            ) : <div />}
            {next ? (
              <button type="button" className="bm-article-nav-card bm-article-nav-card--next" onClick={() => onOpenArticle(next.id)}>
                <span className="bm-eyebrow">{lang === 'th' ? 'ใหม่กว่า' : 'Newer'}</span>
                <strong>{lang === 'th' ? next.titleTh : next.title}</strong>
              </button>
            ) : <div />}
          </nav>
        )}
      </div>

      <section className="bm-related">
        <div className="bm-eyebrow">{lang === 'th' ? 'อ่านต่อ' : 'CONTINUE READING'}</div>
        <div className="bm-related-grid">
          {others.map((other) => (
            <BlogCard key={other.id} article={other} onOpenArticle={onOpenArticle} lang={lang} compact />
          ))}
        </div>
      </section>
    </article>
  );
}

/* ===== FAQ PAGE ===== */
function FAQPage({ lang }) {
  const t = T[lang];
  const faqs = lang === 'th' ? FAQS_TH : FAQS_EN;
  const [open, setOpen] = useState(0);
  return (
    <section className="bm-content-page">
      <div className="bm-eyebrow">{t.faqEyebrow}</div>
      <h1 className="bm-h1">{t.faqTitle}</h1>
      <div className="bm-faq-list" role="list">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          const answerId = `faq-answer-${i}`;
          return (
            <div key={i} className={`bm-faq${isOpen ? ' is-open' : ''}`} role="listitem">
              <button
                className="bm-faq-q"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span>{f.q}</span>
                <span className="bm-faq-ico" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              <div id={answerId} className="bm-faq-a" role="region" aria-label={f.q}
                hidden={!isOpen} style={isOpen ? { display: 'block' } : { display: 'none' }}>
                {f.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ===== FOOTER ===== */
function Footer({ setPage, lang }) {
  const t = T[lang];
  const navKeys = ['Products','Solutions','About us','Blog','FAQ'];
  const blessing = t.footerBlessing.split('\n');
  return (
    <footer className="bm-footer">
      <div className="bm-footer-main">
        <div className="bm-brand bm-brand--lg">
          <img src="/assets/logo-full.png" alt="BlessMe" />
        </div>
        <p className="bm-footer-blessing">
          {blessing[0]}<br/>{blessing[1]}
        </p>
      </div>
      <div className="bm-footer-cols">
        <div>
          <div className="bm-eyebrow">{t.footerCatalogue}</div>
          <a onClick={() => setPage('Products')}>{t.nav[0]}</a>
          <a onClick={() => setPage('Solutions')}>{t.nav[1]}</a>
        </div>
        <div>
          <div className="bm-eyebrow">{t.footerCompany}</div>
          <a onClick={() => setPage('About us')}>{t.nav[2]}</a>
          <a onClick={() => setPage('Blog')}>{t.footerJournal}</a>
          <a onClick={() => setPage('FAQ')}>{t.nav[4]}</a>
        </div>
        <div>
          <div className="bm-eyebrow">{t.footerContact}</div>
          <a href="mailto:Blessme.team@gmail.com">Blessme.team@gmail.com</a>
          <a href="tel:+66828965199">+66 (0) 82-896-5199</a>
          <a href="https://line.me/R/ti/p/@591dzhsr" target="_blank" rel="noopener noreferrer">LINE @591dzhsr</a>
        </div>
      </div>
      <div className="bm-footer-fine">© {new Date().getFullYear()} BlessMe (Thailand) Co., Ltd. · Bangkok</div>
    </footer>
  );
}

/* ===== APP ===== */
function App() {
  const initial = getInitialState();
  const [page, setPage] = useState(initial.page);
  const [detail, setDetail] = useState(initial.productId ? PRODUCTS.find(p => p.id === initial.productId) || null : null);
  const [articleId, setArticleId] = useState(initial.articleId);
  const [lang, setLang] = useState('en');

  // Always start with English on page load
  React.useEffect(() => { setLang('en'); }, []);
  // Save language preference to localStorage
  React.useEffect(() => { localStorage.setItem('bm-lang', lang); }, [lang]);

  // Handle browser back/forward buttons
  React.useEffect(() => {
    const onPop = () => {
      const { page: p, articleId: aid, productId: pid } = getInitialState();
      setPage(p);
      setArticleId(aid);
      setDetail(pid ? PRODUCTS.find(pr => pr.id === pid) || null : null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Update language attribute on html element
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Update meta tags on every route change
  React.useEffect(() => {
    const pid = detail ? detail.id : null;
    const aid = articleId;
    updateMeta(page, pid, aid, lang);
    updateSchema(page, pid, aid, lang);
  }, [page, detail, articleId, lang]);

  const goToPage = (p) => {
    const path = PAGE_TO_PATH[p] || '/';
    window.history.pushState({}, '', path);
    setArticleId(null);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openArticle = (id) => {
    window.history.pushState({}, '', `/blog/${id}`);
    setPage('Blog');
    setArticleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const closeArticle = () => {
    window.history.pushState({}, '', '/blog');
    setPage('Blog');
    setArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openProduct = (product) => {
    window.history.pushState({}, '', `/products/${product.id}`);
    setDetail(product);
  };
  const closeProduct = () => {
    window.history.pushState({}, '', '/');
    setDetail(null);
  };

  return (
    <div className="bm-page">
      <a href="#main-content" className="bm-skip-link">Skip to content</a>
      <Nav page={page} setPage={goToPage} lang={lang} setLang={setLang} />
      <main id="main-content">
        {articleId ? (
          <ArticlePage articleId={articleId} onBack={closeArticle} onOpenArticle={openArticle} lang={lang} />
        ) : (
          <>
            {page === 'Products'  && <ProductsPage onOpen={openProduct} setPage={goToPage} lang={lang} />}
            {page === 'About us'  && <AboutPage lang={lang} />}
            {page === 'Blog'      && <BlogPage onOpenArticle={openArticle} lang={lang} />}
            {page === 'Solutions' && <SolutionsPage setPage={goToPage} lang={lang} />}
            {page === 'FAQ'       && <FAQPage lang={lang} />}
          </>
        )}
      </main>
      <Footer setPage={goToPage} lang={lang} />
      {detail && <ProductDetail product={detail} onClose={closeProduct} lang={lang} />}

      {/* LINE floating action button */}
      <a href="https://line.me/R/ti/p/@591dzhsr" target="_blank" rel="noopener noreferrer"
        className="bm-line-fab" aria-label="Contact us on LINE">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M24 4C13 4 4 11.8 4 21.4c0 6.6 4.4 12.4 11 15.6-.5 1.7-1.6 6.1-1.8 7 0 0-.1.4.2.6.3.2.6 0 .6 0 .8-.1 9.3-6.1 10.7-7.1.8.1 1.5.1 2.3.1 11 0 20-7.8 20-17.4C44 11.8 35 4 24 4z" fill="white"/>
        </svg>
      </a>
    </div>
  );
}


export default App;
