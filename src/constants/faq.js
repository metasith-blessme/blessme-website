import { T } from './translations';

const PRICE_EN = 'Barley, Oat, Red Bean and Osmanthus Konjac cost 90 THB per pack; Moji Yogurt costs 120 THB. Each pack is 500g with 300g drained weight. At 15g drained per serving: 20 servings, costing 4.50 THB (90 THB pack) or 6.00 THB (Moji Yogurt), before shipping, tax and waste.';
const PRICE_TH = 'ข้าวบาร์เลย์ ข้าวโอ๊ต ถั่วแดง และบุกหอมหมื่นลี้ แพ็คละ 90 บาท โมจิโยเกิร์ต 120 บาท ทุกแพ็ค 500g น้ำหนักเนื้อ 300g ถ้าตักเนื้อ 15g ได้ 20 แก้ว ต้นทุน 4.50 บาท หรือ 6.00 บาทถ้าเป็นโมจิโยเกิร์ต ยังไม่รวมขนส่ง ภาษี และของเสีย';

/* ===== FAQ DATA (top-level for schema access) ===== */
export const FAQS_EN = [
  { q: 'What serving and allergy warnings should I know?', a: `${T.en.syrupGuidance} ${T.en.childWarning} Barley and Oat: ${T.en.allergenWarning}` },
  { q: 'What products does BlessMe supply?', a: 'BlessMe is a specialty food wholesaler bringing new categories to the Thai market. Our current range features five signature toppings, with new specialty product lines in development.' },
  { q: 'Are the products vegan?', a: 'Yes. All five products, including Moji Yogurt and Osmanthus Konjac, are vegan. Vegan does not mean allergen-free; check the individual product label.' },
  { q: 'What is the minimum wholesale order?', a: 'No minimum order.' },
  { q: 'Do you provide samples before purchase?', a: 'Yes. Request free samples by emailing Blessme.team@gmail.com.' },
  { q: 'How long is the shelf life?', a: `${T.en.storageUnopened} ${T.en.storageOpened}` },
  { q: 'Do you ship outside Bangkok?', a: 'Yes. We ship nationwide across Thailand from our Bangkok warehouse, and we are open to international wholesale enquiries.' },
  { q: 'How is BlessMe different from other suppliers?', a: 'We curate. Every product we carry is researched, sourced from trusted factories, tested with our partners, and supported by marketing that builds end-consumer demand. We help our partners launch categories that do not yet exist in the Thai market.' },
  { q: 'Where can I buy popping boba wholesale in Bangkok?', a: 'BlessMe (Thailand) Co., Ltd. stocks premium popping boba in Bangkok with nationwide shipping. 5 toppings available: Barley, Red Bean, Oat, Osmanthus, and Moji Yogurt. Contact us at Blessme.team@gmail.com or LINE: @blessmethailand for wholesale pricing.' },
  { q: 'What is the minimum order for BlessMe popping boba?', a: `No minimum order. ${PRICE_EN}` },
  { q: 'What makes BlessMe popping boba different from other suppliers?', a: 'Our range includes Barley, Oat and Red Bean popping boba, Moji Yogurt, and Osmanthus Konjac, with stock in Bangkok. Contact the team for individual product specifications.' },
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
  { q: 'Is Osmanthus Konjac popping boba?', a: 'No. Osmanthus Konjac is a konjac topping, not popping boba. The popping boba range is Barley, Oat, Red Bean and Moji Yogurt.' },
  { q: 'What is the pack size?', a: 'Every topping is a 500g pack with 300g drained weight. Use the drained weight when you portion a drink or dessert.' },
];

export const FAQS_TH = [
  { q: 'มีคำแนะนำการเสิร์ฟและคำเตือนการแพ้อะไรบ้าง?', a: `${T.th.syrupGuidance} ${T.th.childWarning} ข้าวบาร์เลย์และข้าวโอ๊ต: ${T.th.allergenWarning}` },
  { q: 'เบลสมีจำหน่ายสินค้าอะไรบ้าง?', a: 'เบลสมีขายส่งท็อปปิ้ง 5 รายการ คือมุกป๊อปข้าวบาร์เลย์ ข้าวโอ๊ต ถั่วแดง โมจิโยเกิร์ต และบุกหอมหมื่นลี้ กำลังดูสินค้าตัวถัดไปอยู่ แต่ยังไม่เปิดขาย' },
  { q: 'ผลิตภัณฑ์เหมาะสำหรับผู้ทานมังสวิรัติหรือไม่?', a: 'ใช่ ทั้ง 5 รายการ รวมโมจิโยเกิร์ตและบุกหอมหมื่นลี้เป็นวีแกน วีแกนไม่ได้หมายความว่าปลอดสารก่อภูมิแพ้ โปรดตรวจฉลากแต่ละสินค้า' },
  { q: 'ปริมาณสั่งซื้อขั้นต่ำสำหรับค้าส่งคือเท่าไหร่?', a: 'ไม่มีขั้นต่ำในการสั่งซื้อ' },
  { q: 'มีตัวอย่างสินค้าก่อนสั่งซื้อหรือไม่?', a: 'ได้ ขอตัวอย่างฟรีทางอีเมล Blessme.team@gmail.com' },
  { q: 'อายุผลิตภัณฑ์นานเท่าไหร่?', a: `${T.th.storageUnopened} ${T.th.storageOpened}` },
  { q: 'จัดส่งนอกกรุงเทพฯ ได้หรือไม่?', a: 'ได้ เราจัดส่งทั่วประเทศไทยจากคลังสินค้ากรุงเทพฯ และเรายินดีรับการสอบถามค้าส่งจากต่างประเทศด้วย' },
  { q: 'เบลสมีแตกต่างจากซัพพลายเออร์รายอื่นอย่างไร?', a: 'เราไม่ได้ลงของทุกอย่าง ของที่ขายผ่านการหาโรงงาน ทดลองกับร้าน และมีสต็อกที่กรุงเทพฯ เราช่วยทำเนื้อหาให้คนกินรู้จักสินค้าด้วย' },
  { q: 'ซื้อป๊อปปิ่งโบบาราคาส่งในกรุงเทพฯ ได้ที่ไหน?', a: 'ซื้อมุกป๊อป (ป๊อปปิ่งโบบา) ได้ที่เบลสมี (ประเทศไทย) จำกัด ของอยู่กรุงเทพฯ ส่งทั่วไทย มี 5 รายการ: บาร์เลย์ ถั่วแดง ข้าวโอ๊ต บุกหอมหมื่นลี้ และโมจิโยเกิร์ต ทัก Blessme.team@gmail.com หรือ LINE @blessmethailand' },
  { q: 'สั่งซื้อมุกป๊อปของ BlessMe ขั้นต่ำเท่าไหร่?', a: `ไม่มีขั้นต่ำในการสั่งซื้อ ${PRICE_TH}` },
  { q: 'มุกป๊อปของ BlessMe แตกต่างจากซัพพลายเออร์รายอื่นอย่างไร?', a: 'มีมุกป๊อปข้าวบาร์เลย์ ข้าวโอ๊ต ถั่วแดง โมจิโยเกิร์ต และบุกหอมหมื่นลี้ ของอยู่กรุงเทพฯ สเปกรายตัวถามทีมงานได้' },
  { q: 'ป๊อปปิ่งโบบาราคาส่งในไทยราคาเท่าไหร่?', a: PRICE_TH },
  { q: 'ขอตัวอย่างสินค้า BlessMe ฟรีได้ไหม?', a: 'ได้ ขอตัวอย่างฟรีทางอีเมล Blessme.team@gmail.com' },
  { q: 'มุกป๊อปคืออะไร?', a: 'มุกป๊อป (ไข่มุกป๊อป) คือเม็ดท็อปปิ้งทรงกลมที่มีของเหลวด้านใน เมื่อกัดเม็ดจะแตกและปล่อยรสชาติออกมา ต่างจากไข่มุกทาปิโอกาที่เคี้ยวหนึบ' },
  { q: 'ไข่มุกป๊อปต่างจากไข่มุกทาปิโอกาอย่างไร?', a: 'ไข่มุกป๊อปมีของเหลวด้านในที่แตกเมื่อกัด ส่วนไข่มุกทาปิโอกาเคี้ยวหนึบ บุกหอมหมื่นลี้เป็นท็อปปิ้งบุกอีกประเภท ไม่ใช่มุกป๊อป' },
  { q: 'เปิดแล้วเก็บมุกป๊อปอย่างไร?', a: T.th.storageOpened },
  { q: 'เทน้ำเชื่อมออกก่อนเสิร์ฟได้ไหม?', a: T.th.syrupGuidance },
  { q: 'เด็กอายุต่ำกว่า 6 ปีทานได้ไหม?', a: T.th.childWarning },
  { q: 'มุกป๊อปมีกลูเตนไหม?', a: `ข้าวบาร์เลย์และข้าวโอ๊ต: ${T.th.allergenWarning} รายการอื่นให้ตรวจฉลากสินค้า วีแกนไม่ได้หมายความว่าปลอดสารก่อภูมิแพ้` },
  { q: 'หนึ่งแพ็คเสิร์ฟได้กี่แก้ว?', a: 'ทุกแพ็คขนาด 500g น้ำหนักเนื้อ 300g ถ้าใช้เนื้อเสิร์ฟละ 15g จะได้ประมาณ 20 แก้ว ต้นทุน 4.50 บาทสำหรับแพ็ค 90 บาท หรือ 6.00 บาทสำหรับโมจิโยเกิร์ต ยังไม่รวมขนส่ง ภาษี และของเสีย' },
  { q: 'สั่งซื้อทาง LINE อย่างไร?', a: 'ทัก LINE @blessmethailand โทร 082-896-5199 หรืออีเมล Blessme.team@gmail.com ไม่มีขั้นต่ำ ส่งทั่วไทยจากกรุงเทพฯ' },
  { q: 'ซื้อปลีกทาง Shopee ได้ไหม?', a: 'ได้ สั่งปลีกที่ร้าน Shopee blessme_thailand https://shopee.co.th/blessme_thailand ส่วนการสั่งขายส่งให้ทัก LINE @blessmethailand' },
  { q: 'ใช้มุกป๊อปกับเมนูอะไรได้บ้าง?', a: 'ร้านคาเฟ่ทดลองเสิร์ฟมุกป๊อปกับชานม โซดา โยเกิร์ต สมูทตี้ และของหวาน เป็นไอเดียให้ทดลองในร้าน ไม่ใช่สูตรที่วัดผลยอดขายแล้ว บุกหอมหมื่นลี้เป็นท็อปปิ้งบุก ไม่ใช่มุกป๊อป' },
  { q: 'บุกหอมหมื่นลี้เป็นมุกป๊อปหรือไม่?', a: 'ไม่ใช่ บุกหอมหมื่นลี้เป็นท็อปปิ้งบุก ไม่ใช่มุกป๊อป มุกป๊อปของเบลสมีคือข้าวบาร์เลย์ ข้าวโอ๊ต ถั่วแดง และโมจิโยเกิร์ต' },
  { q: 'ขนาดแพ็คเท่าไหร่?', a: 'ทุกท็อปปิ้งแพ็คขนาด 500g น้ำหนักเนื้อ 300g ใช้น้ำหนักเนื้อตอนตวงใส่เครื่องดื่มหรือของหวาน' },
];

/* ===== WHOLESALE LANDING FAQ (commercial-intent, keyword-targeted) ===== */
export const WHOLESALE_FAQS_EN = [
  { q: 'How much is popping boba wholesale in Thailand?', a: PRICE_EN },
  { q: 'Where can I buy popping boba wholesale in Bangkok?', a: 'BlessMe (Thailand) Co., Ltd. stocks popping boba in Bangkok and ships nationwide — no import wait. Order via LINE @blessmethailand, email Blessme.team@gmail.com, or call 082-896-5199.' },
  { q: 'Is there a minimum order?', a: 'No minimum order.' },
  { q: 'Can I get free samples before ordering?', a: 'Yes. Request free samples by emailing Blessme.team@gmail.com.' },
  { q: 'What flavors are available?', a: `Five vegan toppings: Barley, Oat and Red Bean popping boba, Moji Yogurt, and Osmanthus Konjac. ${T.en.storageUnopened} ${T.en.storageOpened}` },
];

export const WHOLESALE_FAQS_TH = [
  { q: 'ไข่มุกป๊อป (มุกป๊อป) ราคาส่งเท่าไหร่?', a: PRICE_TH },
  { q: 'ซื้อไข่มุกป๊อปขายส่งในกรุงเทพได้ที่ไหน?', a: 'เบลสมี (ประเทศไทย) จำกัด มีไข่มุกป๊อปที่กรุงเทพฯ ส่งทั่วไทย ไม่ต้องรอของจากต่างประเทศ ทัก LINE @blessmethailand อีเมล Blessme.team@gmail.com หรือโทร 082-896-5199' },
  { q: 'มีขั้นต่ำในการสั่งซื้อไหม?', a: 'ไม่มีขั้นต่ำในการสั่งซื้อ' },
  { q: 'ขอตัวอย่างฟรีก่อนสั่งได้ไหม?', a: 'ได้ ขอตัวอย่างฟรีทางอีเมล Blessme.team@gmail.com' },
  { q: 'มีรสชาติอะไรบ้าง?', a: `ท็อปปิ้งวีแกน 5 รายการ คือมุกป๊อปข้าวบาร์เลย์ ข้าวโอ๊ต ถั่วแดง โมจิโยเกิร์ต และบุกหอมหมื่นลี้ ${T.th.storageUnopened} ${T.th.storageOpened}` },
];

export const HUB_FAQS_EN = [
  FAQS_EN.find(item => item.q === 'What is popping boba?'),
  FAQS_EN.find(item => item.q === 'How much does popping boba wholesale cost in Thailand?'),
  FAQS_EN.find(item => item.q === 'What is the minimum wholesale order?'),
  FAQS_EN.find(item => item.q === 'How do I order wholesale on LINE?'),
];

export const HUB_FAQS_TH = [
  FAQS_TH.find(item => item.q === 'มุกป๊อปคืออะไร?'),
  FAQS_TH.find(item => item.q === 'ป๊อปปิ่งโบบาราคาส่งในไทยราคาเท่าไหร่?'),
  FAQS_TH.find(item => item.q === 'ปริมาณสั่งซื้อขั้นต่ำสำหรับค้าส่งคือเท่าไหร่?'),
  FAQS_TH.find(item => item.q === 'สั่งซื้อทาง LINE อย่างไร?'),
];
