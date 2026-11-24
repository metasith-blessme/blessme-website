import { T } from './translations';

const PRICE_EN = 'Barley, Oat, Red Bean, Water Chestnut and Osmanthus Konjac cost 90 THB per pack; Moji Yogurt costs 120 THB. Each pack is 500g with 300g drained weight. At 15g drained per serving: 20 servings, costing 4.50 THB (90 THB pack) or 6.00 THB (Moji Yogurt), before shipping, tax and waste.';
const PRICE_TH = 'บาร์เลย์ โอ๊ต ถั่วแดง แห้ว และบุกหอมหมื่นลี้ แพ็คละ 90 บาท ส่วนโมจิโยเกิร์ต 120 บาท แพ็คละ 500 กรัม (เป็นเนื้อ 300 กรัม) ตักแก้วละ 15 กรัมได้ประมาณ 20 แก้ว ต้นทุนแก้วละ 4.50 บาท (โมจิโยเกิร์ต 6 บาท)';

/* ===== FAQ DATA (top-level for schema access) ===== */
export const FAQS_EN = [
  { q: 'What serving and allergy warnings should I know?', a: `${T.en.syrupGuidance} ${T.en.childWarning} Barley and Oat: ${T.en.allergenWarning}` },
  { q: 'What products does BlessMe supply?', a: 'BlessMe wholesales six toppings: Barley, Oat, Red Bean and Water Chestnut popping boba, Moji Yogurt, and Osmanthus Konjac.' },
  { q: 'Are the products vegan?', a: 'Yes. All six products, including Moji Yogurt and Osmanthus Konjac, are vegan. Vegan does not mean allergen-free; check the individual product label.' },
  { q: 'What is the minimum wholesale order?', a: 'No minimum order.' },
  { q: 'Do you provide samples before purchase?', a: 'Yes. Request free samples by emailing Blessme.team@gmail.com.' },
  { q: 'How long is the shelf life?', a: `${T.en.storageUnopened} ${T.en.storageOpened}` },
  { q: 'Do you ship outside Bangkok?', a: 'Yes. We ship nationwide across Thailand from our Bangkok warehouse, and we are open to international wholesale enquiries.' },
  { q: 'How is BlessMe different from other suppliers?', a: 'We curate. Every product we carry is researched, sourced from trusted factories, tested with our partners, and supported by marketing that builds end-consumer demand. We help our partners launch categories that do not yet exist in the Thai market.' },
  { q: 'Where can I buy popping boba wholesale in Bangkok?', a: 'BlessMe (Thailand) Co., Ltd. stocks popping boba in Bangkok with nationwide shipping. 6 toppings available: Barley, Red Bean, Oat, Water Chestnut, Osmanthus, and Moji Yogurt. Contact us at Blessme.team@gmail.com or LINE: @blessmethailand for wholesale pricing.' },
  { q: 'What is the minimum order for BlessMe popping boba?', a: `No minimum order. ${PRICE_EN}` },
  { q: 'What makes BlessMe popping boba different from other suppliers?', a: 'Our range includes Barley, Oat, Red Bean and Water Chestnut popping boba, Moji Yogurt, and Osmanthus Konjac, with stock in Bangkok. Contact the team for individual product specifications.' },
  { q: 'How much does popping boba wholesale cost in Thailand?', a: PRICE_EN },
  { q: 'Can I get free samples of BlessMe popping boba before ordering?', a: 'Yes. Request free samples by emailing Blessme.team@gmail.com.' },
  { q: 'What is popping boba?', a: 'Popping boba is a round topping with a liquid centre. It bursts and releases flavour when bitten, unlike chewy tapioca pearls.' },
  { q: 'How is popping boba different from tapioca pearls?', a: 'Popping boba has liquid inside that bursts when bitten. Tapioca pearls are chewy. Osmanthus Konjac is a separate konjac topping, not popping boba.' },
  { q: 'How should I store popping boba after opening?', a: T.en.storageOpened },
  { q: 'Can I drain the syrup before serving?', a: T.en.syrupGuidance },
  { q: 'Can young children eat popping boba?', a: T.en.childWarning },
  { q: 'Does popping boba contain gluten?', a: `Barley and Oat: ${T.en.allergenWarning} For the other toppings, check the individual product label. Vegan does not mean allergen-free.` },
  { q: 'How many servings are in one pack?', a: 'Each pack is 500g with 300g drained weight. At 15g drained per serving that is about 20 servings. Portion cost is 4.50 THB for a 90 THB pack or 6.00 THB for Moji Yogurt, before shipping, tax and waste.' },
  { q: 'How do I order wholesale on LINE?', a: 'Message LINE @blessmethailand, call 082-896-5199, or email Blessme.team@gmail.com. There is no minimum order. BlessMe ships nationwide from Bangkok.' },
  { q: 'Can I buy retail on Shopee?', a: 'Yes. Retail orders can be placed on the Shopee shop blessme_thailand at https://shopee.co.th/blessme_thailand. For wholesale, order on LINE @blessmethailand.' },
  { q: 'Which drinks and desserts can I use it in?', a: 'Cafés try popping boba with milk tea, soda, yogurt, smoothies and desserts. These are serving ideas to test in your own shop, not measured recipes or sales results. Osmanthus Konjac is a konjac topping, not popping boba.' },
  { q: 'Is Osmanthus Konjac popping boba?', a: 'No. Osmanthus Konjac is a konjac topping, not popping boba. The popping boba range is Barley, Oat, Red Bean, Water Chestnut and Moji Yogurt.' },
  { q: 'What is the pack size?', a: 'Every topping is a 500g pack with 300g drained weight. Use the drained weight when you portion a drink or dessert.' },
];

export const FAQS_TH = [
  { q: 'มุกป๊อปคืออะไร ต่างจากไข่มุกยังไง?', a: 'มุกป๊อป (ไข่มุกป๊อป) คือเม็ดเปลือกบาง ๆ ข้างในเป็นน้ำผลไม้หรือซอส กัดแล้วแตกป๊อปในปาก ส่วนไข่มุกทั่วไปทำจากแป้ง เคี้ยวหนึบ ๆ ต้องต้มก่อนใช้ มุกป๊อปไม่ต้องต้ม ตักใส่แก้วได้เลย' },
  { q: 'มีรสอะไรบ้าง?', a: 'มุกป๊อป 5 รส คือ บาร์เลย์ โอ๊ต ถั่วแดง แห้ว และโมจิโยเกิร์ต กับบุกหอมหมื่นลี้อีก 1 รส ตัวนี้เป็นเม็ดบุก ไม่ใช่มุกป๊อป กัดแล้วไม่แตก แต่เคี้ยวหนึบ ๆ แทน' },
  { q: 'ราคาส่งเท่าไหร่ 1 แพ็คได้กี่แก้ว?', a: PRICE_TH },
  { q: 'ต้องสั่งขั้นต่ำกี่แพ็ค?', a: 'ไม่มีขั้นต่ำเลย แพ็คเดียวก็ส่ง หลายร้านสั่ง 2–3 แพ็คไปลองขายก่อน ขายได้ค่อยสั่งเพิ่ม' },
  { q: 'ขอชิมก่อนได้ไหม?', a: 'ได้ ขอตัวอย่างฟรีได้ที่อีเมล Blessme.team@gmail.com บอกชื่อร้าน ที่อยู่ และรสที่อยากลอง เดี๋ยวเราส่งไปให้' },
  { q: 'สั่งยังไง?', a: 'แอด LINE @blessmethailand แล้วบอกรส จำนวนแพ็ค และที่อยู่ส่งของ ถ้าไม่สะดวก LINE โทร 082-896-5199 หรืออีเมล Blessme.team@gmail.com ก็ได้' },
  { q: 'ส่งต่างจังหวัดได้ไหม?', a: 'ได้ทุกจังหวัด ของอยู่ที่กรุงเทพฯ แพ็คส่งได้เลย ไม่ต้องรอนำเข้า ร้านที่อยู่ต่างประเทศทักมาคุยได้เหมือนกัน' },
  { q: 'ซื้อปลีกได้ไหม?', a: 'ได้ ซื้อปลีกที่ร้าน Shopee blessme_thailand https://shopee.co.th/blessme_thailand ถ้าสั่งไปใช้ในร้านเป็นประจำ ทัก LINE @blessmethailand จะคุ้มกว่า' },
  { q: 'เก็บได้นานแค่ไหน?', a: `${T.th.storageUnopened} ${T.th.storageOpened}` },
  { q: 'ทานมังสวิรัติ/วีแกนได้ไหม?', a: 'ได้ ทั้ง 6 รสเป็นวีแกน ไม่ใส่เจลาติน ใครแพ้อาหารให้ดูส่วนผสมบนฉลากก่อนนะ' },
  { q: 'มีกลูเตนไหม ทานแล้วต้องระวังอะไร?', a: `ข้าวบาร์เลย์และข้าวโอ๊ต: ${T.th.allergenWarning} ${T.th.syrupGuidance} ${T.th.childWarning}` },
  { q: 'ใส่เมนูอะไรได้บ้าง?', a: 'ใส่ได้เกือบทุกเมนูเย็น ชานม ชาผลไม้ โซดา โยเกิร์ต สมูทตี้ บิงซู หรือโปะหน้าเค้กก็ได้ บาร์เลย์เข้ากับลาเต้ โมจิโยเกิร์ตเข้ากับสตรอว์เบอร์รี ลองดูไอเดียเมนูเพิ่มได้ในหน้าบทความ' },
  { q: 'ต่างจากเจ้าอื่นยังไง?', a: 'เราทำร้านเครื่องดื่มเองด้วย เลยเลือกแต่ของที่ใช้ง่ายหน้าร้าน ของพร้อมส่งจากกรุงเทพฯ ไม่ต้องรอพรีออเดอร์ สั่งแพ็คเดียวก็ได้ และขอชิมก่อนได้ฟรี' },
];

/* ===== WHOLESALE LANDING FAQ (commercial-intent, keyword-targeted) ===== */
export const WHOLESALE_FAQS_EN = [
  { q: 'How much is popping boba wholesale in Thailand?', a: PRICE_EN },
  { q: 'Where can I buy popping boba wholesale in Bangkok?', a: 'BlessMe (Thailand) Co., Ltd. stocks popping boba in Bangkok and ships nationwide — no import wait. Order via LINE @blessmethailand, email Blessme.team@gmail.com, or call 082-896-5199.' },
  { q: 'Is there a minimum order?', a: 'No minimum order.' },
  { q: 'Can I get free samples before ordering?', a: 'Yes. Request free samples by emailing Blessme.team@gmail.com.' },
  { q: 'What flavors are available?', a: `Six vegan toppings: Barley, Oat, Red Bean and Water Chestnut popping boba, Moji Yogurt, and Osmanthus Konjac. ${T.en.storageUnopened} ${T.en.storageOpened}` },
];

export const WHOLESALE_FAQS_TH = [
  { q: 'ไข่มุกป๊อปราคาส่งเท่าไหร่?', a: PRICE_TH },
  { q: 'ซื้อไข่มุกป๊อปขายส่งในกรุงเทพได้ที่ไหน?', a: 'ที่เบลสมี (ประเทศไทย) จำกัด ของพร้อมอยู่ที่กรุงเทพฯ ส่งได้ทั่วไทย แอด LINE @blessmethailand โทร 082-896-5199 หรืออีเมล Blessme.team@gmail.com' },
  { q: 'ต้องสั่งขั้นต่ำไหม?', a: 'ไม่ต้องเลย แพ็คเดียวก็ส่ง' },
  { q: 'ขอชิมก่อนสั่งได้ไหม?', a: 'ได้ ขอตัวอย่างฟรีที่ Blessme.team@gmail.com' },
  { q: 'เก็บได้นานแค่ไหน?', a: `${T.th.storageUnopened} ${T.th.storageOpened}` },
];

export const HOME_FAQS_TH = [
  { q: 'มุกป๊อปคืออะไร', a: 'มุกป๊อป (ไข่มุกป๊อป) คือเม็ดเปลือกบาง ๆ ข้างในเป็นน้ำผลไม้หรือซอส กัดแล้วแตกป๊อปในปาก ไม่ต้องต้มเหมือนไข่มุกแป้ง ตักใส่แก้วได้เลย' },
  { q: 'มีรสอะไรบ้าง', a: 'มุกป๊อป 5 รส คือ บาร์เลย์ โอ๊ต ถั่วแดง แห้ว โมจิโยเกิร์ต และเม็ดบุกหอมหมื่นลี้อีก 1 รสสำหรับคนชอบเคี้ยวหนึบ' },
  { q: 'สั่งยังไง', a: 'แอด LINE @blessmethailand บอกรสกับจำนวนแพ็ค แพ็คเดียวก็ส่ง หรือโทร 082-896-5199' },
  { q: 'ซื้อปลีกได้ไหม', a: 'ได้ ซื้อปลีกที่ Shopee blessme_thailand https://shopee.co.th/blessme_thailand' },
  { q: 'แพ็คละเท่าไหร่', a: 'แพ็คละ 90 บาท ส่วนโมจิโยเกิร์ต 120 บาท แพ็คละ 500 กรัม ตักได้ประมาณ 20 แก้ว' },
];

export const HOME_FAQS_EN = [
  { q: 'What is popping boba?', a: 'Popping boba is a round topping with a liquid centre. It bursts and releases flavour when bitten, unlike chewy tapioca pearls.' },
  { q: 'Which flavours are in stock?', a: 'The popping boba range is Barley, Oat, Red Bean, Water Chestnut and Moji Yogurt. Osmanthus Konjac is a konjac topping, not popping boba.' },
  { q: 'How do I order wholesale?', a: 'Message LINE @blessmethailand, call 082-896-5199, or email Blessme.team@gmail.com. There is no minimum order. BlessMe ships nationwide from Bangkok.' },
  { q: 'Can I buy retail on Shopee?', a: 'Yes. Retail orders can be placed on the Shopee shop blessme_thailand at https://shopee.co.th/blessme_thailand. For wholesale, order on LINE @blessmethailand.' },
  { q: 'How much is a pack?', a: 'Barley, Oat, Red Bean, Water Chestnut and Osmanthus Konjac cost 90 THB per pack; Moji Yogurt costs 120 THB. Each pack is 500g with 300g drained weight.' },
];

export const HUB_FAQS_EN = [
  FAQS_EN.find(item => item.q === 'What is popping boba?'),
  FAQS_EN.find(item => item.q === 'How much does popping boba wholesale cost in Thailand?'),
  FAQS_EN.find(item => item.q === 'What is the minimum wholesale order?'),
  FAQS_EN.find(item => item.q === 'How do I order wholesale on LINE?'),
];

export const HUB_FAQS_TH = [
  FAQS_TH.find(item => item.q === 'มุกป๊อปคืออะไร ต่างจากไข่มุกยังไง?'),
  FAQS_TH.find(item => item.q === 'ราคาส่งเท่าไหร่ 1 แพ็คได้กี่แก้ว?'),
  FAQS_TH.find(item => item.q === 'ต้องสั่งขั้นต่ำกี่แพ็ค?'),
  FAQS_TH.find(item => item.q === 'สั่งยังไง?'),
];
