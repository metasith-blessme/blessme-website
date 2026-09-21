import React, { useState } from 'react';
import { PRODUCTS, productSearchName } from '../constants/products';
import { buildPath } from '../lib/routing';
import { T } from '../constants/translations';
import { WHOLESALE_FAQS_EN, WHOLESALE_FAQS_TH } from '../constants/faq';

const LINE_URL = 'https://line.me/R/ti/p/@blessmethailand';
const EMAIL = 'Blessme.team@gmail.com';

const CONTENT = {
  en: {
    eyebrow: 'WHOLESALE',
    h1: 'Popping Boba Wholesale in Bangkok',
    lead: 'Six vegan toppings, including popping boba, Moji Yogurt and Osmanthus Konjac. 90–120 THB per pack, no minimum order. Bangkok stock, nationwide shipping. Request free samples by email.',
    ctaLine: 'Order on LINE',
    ctaSamples: 'Request free samples',
    whyTitle: 'Why buy popping boba wholesale from BlessMe',
    why: [
      ['Stock in Bangkok', 'No import wait — fast nationwide shipping.'],
      ['Vegan, no gelatin', 'All six products are vegan; check individual labels for allergens.'],
      ['6 signature flavors', 'Barley, Red Bean, Oat, Water Chestnut, Osmanthus Konjac, Moji Yogurt.'],
      ['Free samples', 'Request by email: Blessme.team@gmail.com.'],
      ['12-month shelf life', `${T.en.storageUnopened} ${T.en.storageOpened}`],
      ['Low cost per cup', '4.50–6.00 THB at 15g drained per serving; excludes other expenses.'],
    ],
    priceTitle: 'Wholesale pricing',
    priceRows: [
      ['Five flavors, excluding Moji Yogurt (500g)', '90 THB / pack'],
      ['Moji Yogurt (500g)', '120 THB / pack'],
      ['Servings per pack', '~15–20 servings (300g drained)'],
    ],
    flavorsTitle: '6 wholesale flavors',
    faqTitle: 'Wholesale FAQ',
    finalTitle: 'Ready to order popping boba wholesale?',
    finalLead: 'Order on LINE @blessmethailand. Request free samples by email: Blessme.team@gmail.com.',
  },
  th: {
    eyebrow: 'ขายส่ง',
    h1: 'ขายส่งไข่มุกป๊อป (มุกป๊อป) กรุงเทพ',
    lead: 'ท็อปปิ้งวีแกน 6 รายการ รวมมุกป๊อป โมจิโยเกิร์ต และบุกหอมหมื่นลี้ ราคา 90–120 บาท/แพ็ค ไม่มีขั้นต่ำ สต็อกกรุงเทพฯ ส่งทั่วไทย ขอตัวอย่างฟรีทางอีเมล',
    ctaLine: 'สั่งซื้อทาง LINE',
    ctaSamples: 'ขอตัวอย่างฟรี',
    whyTitle: 'ทำไมต้องสั่งไข่มุกป๊อปขายส่งกับ BlessMe',
    why: [
      ['สต็อกในกรุงเทพฯ', 'ไม่ต้องรอนำเข้า ส่งเร็วทั่วไทย'],
      ['วีแกน ไม่ใช้เจลาติน', 'ทั้ง 6 รายการเป็นวีแกน ตรวจสารก่อภูมิแพ้จากฉลากรายสินค้า'],
      ['6 รสซิกเนเจอร์', 'บาร์เลย์ ถั่วแดง ข้าวโอ๊ต แห้ว บุกหอมหมื่นลี้ โมจิโยเกิร์ต'],
      ['มีตัวอย่างฟรี', 'ขอทางอีเมล Blessme.team@gmail.com'],
      ['อายุ 12 เดือน', `${T.th.storageUnopened} ${T.th.storageOpened}`],
      ['ต้นทุนต่อแก้วต่ำ', '4.50–6.00 บาท เมื่อใช้เนื้อ 15g ต่อเสิร์ฟ ยังไม่รวมค่าใช้จ่ายอื่น'],
    ],
    priceTitle: 'ราคาส่ง',
    priceRows: [
      ['5 รส ไม่รวมโมจิโยเกิร์ต (500g)', '90 บาท / แพ็ค'],
      ['โมจิโยเกิร์ต (500g)', '120 บาท / แพ็ค'],
      ['จำนวนที่เสิร์ฟต่อแพ็ค', '~15–20 ที่ (น้ำหนักเนื้อ 300g)'],
    ],
    flavorsTitle: '6 รสชาติขายส่ง',
    faqTitle: 'คำถามที่พบบ่อย (ขายส่ง)',
    finalTitle: 'พร้อมสั่งไข่มุกป๊อปขายส่งแล้วหรือยัง?',
    finalLead: 'สั่งซื้อทาง LINE @blessmethailand ขอตัวอย่างฟรีทางอีเมล Blessme.team@gmail.com',
  },
};

export default function WholesalePage({ lang, setPage }) {
  const c = CONTENT[lang] || CONTENT.en;
  const faqs = lang === 'th' ? WHOLESALE_FAQS_TH : WHOLESALE_FAQS_EN;
  const [open, setOpen] = useState(0);

  return (
    <div className="relative w-full bg-gradient-to-b from-[#FDFBF6] to-[#F1EADF] text-[#2B241E] font-['Inter']">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-16 md:py-24">

        {/* Hero */}
        <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#3B6146] mb-4">
          <span className="w-4 h-px bg-[#4E7C59]"></span>{c.eyebrow}
        </div>
        <h1 className="font-['Fraunces'] text-4xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] mb-5">{c.h1}</h1>
        <p className="text-lg text-[#5B5048] max-w-[640px] mb-8 leading-relaxed">{c.lead}</p>
        <div className="flex flex-wrap gap-4">
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer"
            className="px-7 py-3.5 bg-[#4E7C59] text-white font-semibold text-sm rounded-xl hover:bg-[#3B6146] transition-colors shadow-[0_6px_18px_rgba(59,97,70,0.22)]">
            {c.ctaLine}
          </a>
          <a href={`mailto:${EMAIL}?subject=Sample%20Request`} data-contact-intent="sample"
            className="px-7 py-3.5 bg-white/70 border border-[#E0D6C6] text-[#2B241E] font-semibold text-sm rounded-xl hover:bg-white hover:border-[#4E7C59] transition-colors">
            {c.ctaSamples}
          </a>
        </div>

        {/* Why us */}
        <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold mt-20 mb-8">{c.whyTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.why.map(([t, d]) => (
            <div key={t} className="bg-white/70 border border-[#EAE2D5] rounded-2xl p-6">
              <div className="font-['Fraunces'] text-xl font-semibold text-[#3B6146] mb-2">{t}</div>
              <p className="text-[#5B5048] text-[15px] leading-relaxed">{d}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold mt-20 mb-8">{c.priceTitle}</h2>
        <div className="bg-white/80 border border-[#EAE2D5] rounded-2xl overflow-hidden max-w-[560px]">
          {c.priceRows.map(([label, val], i) => (
            <div key={label} className={`flex items-center justify-between px-6 py-4 ${i > 0 ? 'border-t border-[#EAE2D5]' : ''}`}>
              <span className="text-[#5B5048]">{label}</span>
              <span className="font-mono font-semibold text-[#2B241E]">{val}</span>
            </div>
          ))}
        </div>

        {/* Flavors */}
        <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold mt-20 mb-8">{c.flavorsTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PRODUCTS.map((p) => (
            <a key={p.id} href={buildPath({ page: 'Products', productId: p.id, lang })}
              className="text-left bg-white/70 border border-[#EAE2D5] rounded-xl px-5 py-4 hover:border-[#4E7C59] transition-colors">
              <div className="font-['Fraunces'] text-lg font-semibold">{productSearchName(p, lang)}</div>
              <div className="text-xs text-[#8A7E71] mt-1">{lang === 'th' ? p.flavorTh : p.flavor}</div>
              <div className="text-sm font-semibold text-[#3B6146] mt-2">{p.price} {lang === 'th' ? 'บาท / แพ็ค' : 'THB / pack'}</div>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold mt-20 mb-8">{c.faqTitle}</h2>
        <div className="max-w-[760px]">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b border-[#EAE2D5]">
              <button
                className="w-full flex items-center justify-between gap-4 text-left py-5"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-[#2B241E]">{f.q}</span>
                <span className="text-[#4E7C59] text-xl shrink-0">{open === i ? '–' : '+'}</span>
              </button>
              <p hidden={open !== i} className="text-[#5B5048] leading-relaxed pb-5 -mt-1">{f.a}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-20 bg-[#2B241E] text-[#FAF6EF] rounded-3xl px-8 py-12 text-center">
          <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold mb-4">{c.finalTitle}</h2>
          <p className="text-[#D8CDBE] max-w-[560px] mx-auto mb-8 leading-relaxed">{c.finalLead}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#4E7C59] text-white font-semibold text-sm rounded-xl hover:bg-[#5b8a72] transition-colors">
              {c.ctaLine}
            </a>
            <a href={`mailto:${EMAIL}?subject=Sample%20Request`} data-contact-intent="sample"
              className="px-7 py-3.5 bg-white/10 border border-white/25 text-white font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors">
              {EMAIL}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
