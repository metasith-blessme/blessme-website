/* ===== PRODUCTS DATA ===== */
export const PRODUCTS = [
  { id: 'barley', containsGluten: true,    name: 'Barley',         nameTh: 'บาร์เลย์',       tag: 'Signature flavor', flavor: 'Toasty · Nutty · Refined', flavorTh: 'คั่ว · กลิ่นถั่ว',
    articleIds: ['barley-popping-boba-thailand'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['☕ Iced Latte', '🧋 Milk Tea', '🧁 Bakery Garnish'],
    pairingsTh: ['☕ ลาเต้เย็น', '🧋 ชานม', '🧁 ท็อปปิ้งเบเกอรี'],
    img: '/assets/products/barley.webp',    imgFallback: '/assets/products/barley.png',
    note: 'Roasted Asian barley, captured in a bursting pearl. A grown-up topping for desserts, drinks, and bakery applications.',
    noteTh: 'บาร์เลย์คั่วอยู่ในเม็ดที่แตกตอนกัด ใส่ลาเต้ ชานม หรือเบเกอรีได้' },
  { id: 'oat', containsGluten: true,       name: 'Oat',            nameTh: 'โอ๊ต',           tag: 'Signature flavor', flavor: 'Creamy · Mellow · Modern', flavorTh: 'รสโอ๊ต · นุ่ม',
    articleIds: ['popping-boba-yogurt-smoothie-pairing'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['🥛 Plant Milk', '☕ Dirty Coffee', '🥤 Acai Smoothie'],
    pairingsTh: ['🥛 นมพืช', '☕ เดอร์ตี้คอฟฟี่', '🥤 อาซาอิสมูทตี้'],
    img: '/assets/products/oat.webp',       imgFallback: '/assets/products/oat.png',
    note: 'A clean, plant-forward oat profile sealed in a delicate pearl. Designed for the modern wellness category.',
    noteTh: 'รสโอ๊ตที่เน้นพืชเป็นหลัก อยู่ในเม็ดที่แตกตอนกัด ใส่กับนมพืช กาแฟ หรือสมูทตี้' },
  { id: 'redbean',   name: 'Red Bean',       nameTh: 'ถั่วแดง',        tag: 'Signature flavor', flavor: 'Sweet · Earthy · Heritage', flavorTh: 'หวาน · ถั่วแดง',
    articleIds: ['popping-boba-yogurt-smoothie-pairing'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['🍧 Kakigori', '🍨 Matcha Parfait', '🧋 Brown Sugar Tea'],
    pairingsTh: ['🍧 น้ำแข็งไส', '🍨 มัทฉะพาร์เฟต์', '🧋 ชานมบราวน์ชูการ์'],
    img: '/assets/products/redbean.webp',   imgFallback: '/assets/products/redbean.png',
    note: 'A heritage Asian flavor profile, elevated. Pairs naturally with cold desserts, shaved ice, and pastries.',
    noteTh: 'รสถั่วแดงหวานแบบวัตถุดิบเอเชีย เข้ากับของหวานเย็น น้ำแข็งไส และขนมอบ' },
  { id: 'cheese',    name: 'Moji Yogurt',    nameTh: 'โมจิโยเกิร์ต',    tag: 'Signature flavor', flavor: 'Tangy · Rich · Creamy-sweet', flavorTh: 'เปรี้ยวอมหวาน',
    articleIds: ['moji-yogurt-trend-asia'],
    price: 120, packSize: '500g', drainedWeight: '300g',
    pairings: ['🍓 Yogurt Shake', '🍧 Strawberry Bingsu', '🍰 Tart Topping'],
    pairingsTh: ['🍓 โยเกิร์ตเชค', '🍧 สตรอว์เบอร์รีบิงซู', '🍰 หน้าทาร์ตเค้ก'],
    img: '/assets/products/moji-yogurt.webp', imgFallback: '/assets/products/moji-yogurt.png',
    note: 'A rich moji-yogurt core. The trend-forward topping reshaping cold dessert and beverage menus.',
    noteTh: 'มุกป๊อปที่มีของเหลวรสโยเกิร์ตเปรี้ยวอมหวานข้างใน ใส่เครื่องดื่มเย็นหรือของหวานได้' },
  { id: 'osmanthus', name: 'Osmanthus Konjac', nameTh: 'บุกหอมหมื่นลี้',   tag: 'Signature flavor', flavor: 'Floral · Honeyed · Elegant', flavorTh: 'กลิ่นดอกไม้ · น้ำผึ้ง',
    articleIds: ['popping-boba-yogurt-smoothie-pairing'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['🌸 Jasmine Sparkling', '🍵 Oolong Tea', '🍦 Soft Serve'],
    pairingsTh: ['🌸 สปาร์กลิ้งมะลิ', '🍵 ชาอู่หลง', '🍦 ซอฟต์เสิร์ฟ'],
    img: '/assets/products/osmanthus.webp', imgFallback: '/assets/products/osmanthus.png',
    note: 'Tiny gold flowers, steeped and sealed. A whisper of honey for the premium dessert tier.',
    noteTh: 'ท็อปปิ้งบุก กลิ่นดอกหอมหมื่นลี้และน้ำผึ้ง ไม่ใช่มุกป๊อป ใส่ชา โซดา หรือซอฟต์เสิร์ฟได้' },
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
