/* ===== PRODUCTS DATA ===== */
export const PRODUCTS = [
  { id: 'barley', containsGluten: true,    name: 'Barley',         nameTh: 'บาร์เลย์',       tag: 'Signature flavor', flavor: 'Toasty · Nutty · Refined', flavorTh: 'หอมข้าวคั่ว',
    articleIds: ['barley-popping-boba-thailand'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['☕ Iced Latte', '🧋 Milk Tea', '🧁 Bakery Garnish'],
    pairingsTh: ['☕ ลาเต้เย็น', '🧋 ชานม', '🧁 ท็อปปิ้งเบเกอรี'],
    img: '/assets/products/barley.webp',    imgFallback: '/assets/products/barley.png',
    note: 'Roasted Asian barley, captured in a bursting pearl. A grown-up topping for desserts, drinks, and bakery applications.',
    noteTh: 'หอมกลิ่นข้าวคั่วเหมือนชาข้าวบาร์เลย์ กัดแล้วแตกในปาก ใส่ลาเต้เย็นคือเข้ากันสุด ชานมกับโปะหน้าเบเกอรีก็ดี' },
  { id: 'oat', containsGluten: true,       name: 'Oat',            nameTh: 'โอ๊ต',           tag: 'Signature flavor', flavor: 'Creamy · Mellow · Modern', flavorTh: 'นวล ๆ ไม่หวานแหลม',
    articleIds: ['popping-boba-yogurt-smoothie-pairing'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['🥛 Plant Milk', '☕ Dirty Coffee', '🥤 Acai Smoothie'],
    pairingsTh: ['🥛 นมโอ๊ต', '☕ เดอร์ตี้', '🥤 สมูทตี้อาซาอิ'],
    img: '/assets/products/oat.webp',       imgFallback: '/assets/products/oat.png',
    note: 'A clean, plant-forward oat profile sealed in a delicate pearl. Designed for the modern wellness category.',
    noteTh: 'รสโอ๊ตนวล ๆ ไม่หวานแหลม ร้านที่มีเมนูนมโอ๊ต กาแฟ หรือสมูทตี้อยู่แล้ว เริ่มจากตัวนี้ได้เลย' },
  { id: 'redbean',   name: 'Red Bean',       nameTh: 'ถั่วแดง',        tag: 'Signature flavor', flavor: 'Sweet · Earthy · Heritage', flavorTh: 'หวานแบบถั่วแดงกวน',
    articleIds: ['popping-boba-yogurt-smoothie-pairing'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['🍧 Kakigori', '🍨 Matcha Parfait', '🧋 Brown Sugar Tea'],
    pairingsTh: ['🍧 น้ำแข็งไส', '🍨 มัทฉะพาร์เฟต์', '🧋 ชานมบราวน์ชูการ์'],
    img: '/assets/products/redbean.webp',   imgFallback: '/assets/products/redbean.png',
    note: 'A heritage Asian flavor profile, elevated. Pairs naturally with cold desserts, shaved ice, and pastries.',
    noteTh: 'หวานแบบถั่วแดงกวน คนไทยกินแล้วคุ้นปาก โปะน้ำแข็งไส บิงซู หรือใส่ชาเขียวนมได้หมด' },
  { id: 'chestnut',  name: 'Water Chestnut', nameTh: 'แห้ว',           tag: 'Signature flavor', flavor: 'Crisp · Cool · Clean', flavorTh: 'กรุบ ๆ หวานน้อย',
    articleIds: ['popping-boba-cafe-menu-ideas'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['🍵 Fruit Tea', '🍸 Craft Mocktail', '🧊 Cold Brew Tea'],
    pairingsTh: ['🍵 ชาผลไม้', '🍸 ม็อกเทล', '🧊 ชาโคลด์บรู'],
    img: '/assets/products/waterchestnut.webp', imgFallback: '/assets/products/waterchestnut.png',
    note: 'A crisp, cool water chestnut pearl for fruit tea, mocktails and cold brew tea.',
    noteTh: 'เนื้อแห้วกรุบ ๆ หวานน้อย ใส่ชาผลไม้ โซดา หรือชาโคลด์บรูแล้วสดชื่นมาก' },
  { id: 'cheese',    name: 'Moji Yogurt',    nameTh: 'โมจิโยเกิร์ต',    tag: 'Signature flavor', flavor: 'Tangy · Rich · Creamy-sweet', flavorTh: 'เปรี้ยวอมหวาน',
    articleIds: ['moji-yogurt-trend-asia'],
    price: 120, packSize: '500g', drainedWeight: '300g',
    pairings: ['🍓 Yogurt Shake', '🍧 Strawberry Bingsu', '🍰 Tart Topping'],
    pairingsTh: ['🍓 โยเกิร์ตเชค', '🍧 บิงซูสตรอว์เบอร์รี', '🍰 โปะหน้าทาร์ต'],
    img: '/assets/products/moji-yogurt.webp', imgFallback: '/assets/products/moji-yogurt.png',
    note: 'A rich moji-yogurt core. The trend-forward topping reshaping cold dessert and beverage menus.',
    noteTh: 'กัดแล้วซอสโยเกิร์ตเปรี้ยวอมหวานแตกออกมา คู่กับสตรอว์เบอร์รีดีที่สุด ใส่บิงซูหรือโยเกิร์ตเชคก็ขึ้น' },
  { id: 'osmanthus', name: 'Osmanthus Konjac', nameTh: 'บุกหอมหมื่นลี้',   tag: 'Signature flavor', flavor: 'Floral · Honeyed · Elegant', flavorTh: 'หนึบ ๆ หอมดอกไม้',
    articleIds: ['popping-boba-yogurt-smoothie-pairing'],
    price: 90, packSize: '500g', drainedWeight: '300g',
    pairings: ['🌸 Jasmine Sparkling', '🍵 Oolong Tea', '🍦 Soft Serve'],
    pairingsTh: ['🌸 โซดามะลิ', '🍵 ชาอู่หลงเย็น', '🍦 ซอฟต์เสิร์ฟ'],
    img: '/assets/products/osmanthus.webp', imgFallback: '/assets/products/osmanthus.png',
    note: 'Tiny gold flowers, steeped and sealed. A whisper of honey for the premium dessert tier.',
    noteTh: 'เม็ดบุกเคี้ยวหนึบ ๆ หอมดอกหอมหมื่นลี้กับน้ำผึ้ง ใส่ชาอู่หลงเย็นหรือโซดาคือดีมาก ตัวนี้สำหรับคนชอบเคี้ยว' },
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
