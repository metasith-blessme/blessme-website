import React, { useState } from 'react';
import { PRODUCTS } from '../constants/products';
import { WHOLESALE_FAQS_EN, WHOLESALE_FAQS_TH } from '../constants/faq';

const LINE_URL = 'https://line.me/R/ti/p/@blessmethailand';
const EMAIL = 'Blessme.team@gmail.com';

const CONTENT = {
  en: {
    eyebrow: 'WHOLESALE',
    h1: 'Popping Boba Wholesale in Bangkok',
    lead: 'Six vegan flavors of popping boba, in stock in Bangkok. Wholesale 80–115 THB per pack, nationwide shipping, and free samples for cafés and F&B businesses.',
    ctaLine: 'Order on LINE',
    ctaSamples: 'Request free samples',
    whyTitle: 'Why buy popping boba wholesale from BlessMe',
    why: [
      ['Stock in Bangkok', 'No import wait — fast nationwide shipping.'],
      ['Vegan, no gelatin', 'Seaweed-based shells filled with real fruit juice.'],
      ['6 signature flavors', 'Barley, Red Bean, Oat, Water Chestnut, Osmanthus, Moji Yogurt.'],
      ['Free samples', 'Taste before you commit.'],
      ['12-month shelf life', 'Shelf-stable, no refrigeration needed.'],
      ['Low cost per cup', '~4–7 THB per serving, easy 10–20 THB upcharge.'],
    ],
    priceTitle: 'Wholesale pricing',
    priceRows: [
      ['Single pack (500g)', '115 THB / pack'],
      ['Case of 24 packs', '80 THB / pack'],
      ['Servings per pack', '~20 (15g each)'],
    ],
    flavorsTitle: '6 wholesale flavors',
    faqTitle: 'Wholesale FAQ',
    finalTitle: 'Ready to order popping boba wholesale?',
    finalLead: 'Message us on LINE @blessmethailand or email us for pricing and free samples.',
  },
  th: {
    eyebrow: 'ขายส่ง',
    h1: 'ขายส่งไข่มุกป๊อป (มุกป๊อป) กรุงเทพ',
    lead: 'ไข่มุกป๊อป 6 รสวีแกน สต็อกในกรุงเทพฯ ราคาส่ง 80–115 บาท/แพ็ค ส่งทั่วไทย มีตัวอย่างฟรีสำหรับคาเฟ่และธุรกิจอาหาร',
    ctaLine: 'สั่งซื้อทาง LINE',
    ctaSamples: 'ขอตัวอย่างฟรี',
    whyTitle: 'ทำไมต้องสั่งไข่มุกป๊อปขายส่งกับ BlessMe',
    why: [
      ['สต็อกในกรุงเทพฯ', 'ไม่ต้องรอนำเข้า ส่งเร็วทั่วไทย'],
      ['วีแกน ไม่ใช้เจลาติน', 'เปลือกสาหร่ายห่อน้ำผลไม้แท้'],
      ['6 รสซิกเนเจอร์', 'บาร์เลย์ ถั่วแดง ข้าวโอ๊ต แห้ว หอมหมื่นลี้ โมจิโยเกิร์ต'],
      ['มีตัวอย่างฟรี', 'ชิมก่อนตัดสินใจสั่งจริง'],
      ['อายุ 12 เดือน', 'เก็บได้นาน ไม่ต้องแช่เย็น'],
      ['ต้นทุนต่อแก้วต่ำ', '~4–7 บาท/แก้ว บวกราคาท็อปปิ้งได้ 10–20 บาท'],
    ],
    priceTitle: 'ราคาส่ง',
    priceRows: [
      ['แพ็คเดี่ยว (500g)', '115 บาท / แพ็ค'],
      ['ยกลัง 24 แพ็ค', '80 บาท / แพ็ค'],
      ['จำนวนที่เสิร์ฟต่อแพ็ค', '~20 ที่ (15g/ที่)'],
    ],
    flavorsTitle: '6 รสชาติขายส่ง',
    faqTitle: 'คำถามที่พบบ่อย (ขายส่ง)',
    finalTitle: 'พร้อมสั่งไข่มุกป๊อปขายส่งแล้วหรือยัง?',
    finalLead: 'ทักหาเราทาง LINE @blessmethailand หรืออีเมล เพื่อสอบถามราคาและขอตัวอย่างฟรี',
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
          <a href={`mailto:${EMAIL}`}
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
            <button key={p.id} onClick={() => setPage('Products')}
              className="text-left bg-white/70 border border-[#EAE2D5] rounded-xl px-5 py-4 hover:border-[#4E7C59] transition-colors">
              <div className="font-['Fraunces'] text-lg font-semibold">{lang === 'th' ? p.nameTh : p.name}</div>
              <div className="text-xs text-[#8A7E71] mt-1">{lang === 'th' ? p.flavorTh : p.flavor}</div>
            </button>
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
              {open === i && <p className="text-[#5B5048] leading-relaxed pb-5 -mt-1">{f.a}</p>}
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
            <a href={`mailto:${EMAIL}`}
              className="px-7 py-3.5 bg-white/10 border border-white/25 text-white font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors">
              {EMAIL}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
