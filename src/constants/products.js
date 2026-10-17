/* ===== PRODUCTS DATA ===== */
export const PRODUCTS = [
  { id: 'barley', containsGluten: true,    name: 'Barley',         nameTh: 'บาร์เลย์',       tag: 'Signature flavor', flavor: 'Toasty · Nutty · Refined', flavorTh: 'คั่ว · กลิ่นถั่ว · ประณีต',
    articleIds: ['barley-popping-boba-thailand'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['☕ Iced Latte', '🧋 Milk Tea', '🧁 Bakery Garnish'],
    pairingsTh: ['☕ ลาเต้เย็น', '🧋 ชานมพรีเมียม', '🧁 ท็อปปิ้งเบเกอรี'],
    img: '/assets/products/barley.webp',    imgFallback: '/assets/products/barley.png',
    note: 'Roasted Asian barley, captured in a bursting pearl. A grown-up topping for desserts, drinks, and bakery applications.',
    noteTh: 'บาร์เลย์อบจากเอเชีย ถูกกักไว้ในเม็ดบีดแตกกระจาย เป็นท็อปปิ้งพรีเมียมสำหรับของหวาน เครื่องดื่ม และเบเกอรี' },
  { id: 'oat', containsGluten: true,       name: 'Oat',            nameTh: 'โอ๊ต',           tag: 'Signature flavor', flavor: 'Creamy · Mellow · Modern', flavorTh: 'ครีมมี่ · นุ่มนวล · ทันสมัย',
    articleIds: ['popping-boba-yogurt-smoothie-pairing'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['🥛 Plant Milk', '☕ Dirty Coffee', '🥤 Acai Smoothie'],
    pairingsTh: ['🥛 นมพืช/โอ๊ต', '☕ เดอร์ตี้คอฟฟี่', '🥤 อาซาอิสมูทตี้'],
    img: '/assets/products/oat.webp',       imgFallback: '/assets/products/oat.png',
    note: 'A clean, plant-forward oat profile sealed in a delicate pearl. Designed for the modern wellness category.',
    noteTh: 'รสโอ๊ตบริสุทธิ์ที่เน้นพืชเป็นหลัก ปิดผนึกในเม็ดบีดละเอียด ออกแบบมาสำหรับตลาดสุขภาพยุคใหม่' },
  { id: 'redbean',   name: 'Red Bean',       nameTh: 'ถั่วแดง',        tag: 'Signature flavor', flavor: 'Sweet · Earthy · Heritage', flavorTh: 'หวาน · ดินดั้งเดิม · คลาสสิก',
    articleIds: ['popping-boba-yogurt-smoothie-pairing'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['🍧 Kakigori', '🍨 Matcha Parfait', '🧋 Brown Sugar Tea'],
    pairingsTh: ['🍧 คากิโกริ/บิงซู', '🍨 มัทฉะพาร์เฟต์', '🧋 ชาชานมบราวน์ชูการ์'],
    img: '/assets/products/redbean.webp',   imgFallback: '/assets/products/redbean.png',
    note: 'A heritage Asian flavor profile, elevated. Pairs naturally with cold desserts, shaved ice, and pastries.',
    noteTh: 'รสชาติดั้งเดิมของเอเชียที่ยกระดับขึ้น เข้ากันได้ดีกับของหวานเย็น น้ำแข็งไส และขนมอบ' },
  { id: 'cheese',    name: 'Moji Yogurt',    nameTh: 'โมจิโยเกิร์ต',    tag: 'Signature flavor', flavor: 'Tangy · Rich · Creamy-sweet', flavorTh: 'เปรี้ยวอมหวาน · เข้มข้น · ครีมมี่',
    articleIds: ['moji-yogurt-trend-asia'],
    price: 120, packSize: '500g', drainedWeight: '300g',
    pairings: ['🍓 Yogurt Shake', '🍧 Strawberry Bingsu', '🍰 Tart Topping'],
    pairingsTh: ['🍓 โยเกิร์ตเชค', '🍧 สตรอว์เบอร์รีบิงซู', '🍰 หน้าทาร์ตเค้ก'],
    img: '/assets/products/moji-yogurt.webp', imgFallback: '/assets/products/moji-yogurt.png',
    note: 'A rich moji-yogurt core. The trend-forward topping reshaping cold dessert and beverage menus.',
    noteTh: 'แกนโมจิโยเกิร์ตรสเข้มข้น ท็อปปิ้งล้ำสมัยที่กำลังเปลี่ยนเมนูของหวานเย็นและเครื่องดื่ม' },
  { id: 'osmanthus', name: 'Osmanthus Konjac', nameTh: 'บุกหอมหมื่นลี้',   tag: 'Signature flavor', flavor: 'Floral · Honeyed · Elegant', flavorTh: 'ดอกไม้ · น้ำผึ้ง · หรูหรา',
    articleIds: ['popping-boba-yogurt-smoothie-pairing'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['🌸 Jasmine Sparkling', '🍵 Oolong Tea', '🍦 Soft Serve'],
    pairingsTh: ['🌸 สปาร์คกลิ้งมะลิ', '🍵 ชาอู่หลงพรีเมียม', '🍦 ซอฟต์เสิร์ฟ'],
    img: '/assets/products/osmanthus.webp', imgFallback: '/assets/products/osmanthus.png',
    note: 'Tiny gold flowers, steeped and sealed. A whisper of honey for the premium dessert tier.',
    noteTh: 'ดอกไม้สีทองขนาดเล็ก ชงแล้วปิดผนึก กลิ่นน้ำผึ้งอ่อนๆ สำหรับของหวานระดับพรีเมียม' },
];

export function productSearchName(product, lang = 'en') {
  if (product.id === 'osmanthus' || product.id === 'cheese') {
    return lang === 'th' ? product.nameTh : product.name;
  }
  const thaiName = { barley: 'ข้าวบาร์เลย์', oat: 'ข้าวโอ๊ต' }[product.id] || product.nameTh;
  return lang === 'th' ? `มุกป๊อป${thaiName}` : `${product.name} Popping Boba`;
}

// Visible product-page H1. English stays the SKU name; Thai uses the search spelling.
export function productHeading(product, lang = 'en') {
  if (lang !== 'th') return productSearchName(product, lang);
  if (product.id === 'osmanthus') return 'บุกหอมหมื่นลี้ ท็อปปิ้งขายส่ง';
  if (product.id === 'cheese') return 'มุกป๊อปโมจิโยเกิร์ต ขายส่ง';
  return `${productSearchName(product, lang)} ขายส่ง`;
}
