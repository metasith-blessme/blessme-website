import React from 'react';
import { PRODUCTS, productSearchName } from '../constants/products';
import { HUB_FAQS_EN, HUB_FAQS_TH } from '../constants/faq';
import { SHOPEE_URL } from '../lib/analytics';
import { buildPath } from '../lib/routing';
import { pageCrumbs } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';

const LINE_URL = 'https://line.me/R/ti/p/@blessmethailand';
const PILLAR = 'what-is-popping-boba-khai-muk-pop';

const COPY = {
  en: {
    eyebrow: 'POPPING BOBA',
    h1: 'Popping Boba Wholesale, Every Flavour in Stock',
    definition: 'Popping boba is a round topping with a liquid centre that bursts when bitten, unlike chewy tapioca pearls.',
    lead: 'BlessMe stocks barley, oat and red bean popping boba, Moji Yogurt, and Osmanthus Konjac in Bangkok. Packs are 90–120 THB, with no minimum order, and ship nationwide.',
    line: 'Order on LINE',
    shopee: 'Buy retail on Shopee',
    samples: 'Request free samples',
    tableTitle: 'Flavours in stock',
    headers: ['Product', 'Type', 'Pack', 'Wholesale price'],
    linksTitle: 'Keep reading',
    pillar: 'What is popping boba?',
    faqLink: 'Popping boba wholesale FAQ',
    wholesale: 'Wholesale prices and how to order',
    faqTitle: 'Quick answers',
  },
  th: {
    eyebrow: 'มุกป๊อป',
    h1: 'มุกป๊อป (ไข่มุกป๊อป) ขายส่ง ทุกรส ราคาส่ง 90 บาท',
    definition: 'มุกป๊อป (ไข่มุกป๊อป) คือเม็ดท็อปปิ้งที่มีของเหลวด้านใน เมื่อกัดเม็ดจะแตกและปล่อยรสชาติออกมา ต่างจากไข่มุกทาปิโอกาที่เคี้ยวหนึบ บางคนเรียกเม็ดลักษณะนี้ว่าเม็ดป๊อปหรือมุกป๊อบ',
    lead: 'เบลสมีมีสต็อกมุกป๊อปข้าวบาร์เลย์ ข้าวโอ๊ต ถั่วแดง โมจิโยเกิร์ต และบุกหอมหมื่นลี้ในกรุงเทพฯ ราคา 90–120 บาทต่อแพ็ค ไม่มีขั้นต่ำ ส่งทั่วไทย',
    line: 'สั่งซื้อทาง LINE',
    shopee: 'สั่งปลีกทาง Shopee',
    samples: 'ขอตัวอย่างฟรี',
    tableTitle: 'รสที่ยังมีสต็อก',
    headers: ['สินค้า', 'ประเภท', 'แพ็ค', 'ราคาส่ง'],
    linksTitle: 'อ่านต่อ',
    pillar: 'มุกป๊อปคืออะไร',
    faqLink: 'คำถามที่พบบ่อยเรื่องมุกป๊อปขายส่ง',
    wholesale: 'ราคาส่งและวิธีสั่งซื้อ',
    faqTitle: 'คำตอบสั้น ๆ',
  },
};

function productType(product, lang) {
  if (product.id === 'osmanthus') {
    return lang === 'th' ? 'ท็อปปิ้งบุก ไม่ใช่มุกป๊อป' : 'Konjac topping, not popping boba';
  }
  if (product.containsGluten) {
    return lang === 'th' ? 'มุกป๊อป มีกลูเตน' : 'Popping boba, contains gluten';
  }
  return lang === 'th' ? 'มุกป๊อป' : 'Popping boba';
}

export default function ProductHubPage({ lang }) {
  const c = COPY[lang] || COPY.en;
  const faqs = lang === 'th' ? HUB_FAQS_TH : HUB_FAQS_EN;
  const prefix = lang === 'th' ? 'บาท / แพ็ค' : 'THB / pack';

  return (
    <div className="relative w-full bg-gradient-to-b from-[#FDFBF6] to-[#F1EADF] text-[#2B241E] font-['Inter']">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <Breadcrumbs items={pageCrumbs('Catalogue', lang)} />
        <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#3B6146] mb-4">
          <span className="w-4 h-px bg-[#4E7C59]"></span>{c.eyebrow}
        </div>
        <h1 className="font-['Fraunces'] text-4xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] mb-5">{c.h1}</h1>
        <p className="bm-answer">{c.definition}</p>
        <p className="text-lg text-[#5B5048] max-w-[680px] mb-8 leading-relaxed">{c.lead}</p>
        <div className="flex flex-wrap gap-4">
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer"
            className="px-7 py-3.5 bg-[#4E7C59] text-white font-semibold text-sm rounded-xl hover:bg-[#3B6146] transition-colors shadow-[0_6px_18px_rgba(59,97,70,0.22)]">
            {c.line}
          </a>
          <a href={SHOPEE_URL} target="_blank" rel="noopener noreferrer"
            className="px-7 py-3.5 bg-white/70 border border-[#E0D6C6] text-[#2B241E] font-semibold text-sm rounded-xl hover:bg-white hover:border-[#EE4D2D] transition-colors">
            {c.shopee}
          </a>
          <a href="mailto:Blessme.team@gmail.com?subject=Sample%20Request" data-contact-intent="sample"
            className="px-7 py-3.5 bg-white/70 border border-[#E0D6C6] text-[#2B241E] font-semibold text-sm rounded-xl hover:bg-white hover:border-[#4E7C59] transition-colors">
            {c.samples}
          </a>
        </div>

        <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold mt-20 mb-8">{c.tableTitle}</h2>
        <div className="overflow-x-auto bg-white/80 border border-[#EAE2D5] rounded-2xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#EAE2D5] text-[#7A6E63]">
                {c.headers.map(header => <th key={header} className="px-5 py-4 font-semibold">{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map(product => (
                <tr key={product.id} className="border-b border-[#EAE2D5] last:border-0">
                  <td className="px-5 py-4 font-semibold">
                    <a className="text-[#3B6146] underline" href={buildPath({ page: 'Products', productId: product.id, lang })}>
                      {productSearchName(product, lang)}
                    </a>
                  </td>
                  <td className="px-5 py-4 text-[#5B5048]">{productType(product, lang)}</td>
                  <td className="px-5 py-4 text-[#5B5048]">{product.packSize} / {product.drainedWeight}</td>
                  <td className="px-5 py-4 font-semibold">{product.price} {prefix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {PRODUCTS.map(product => (
            <a key={product.id} href={buildPath({ page: 'Products', productId: product.id, lang })}
              className="bg-white/70 border border-[#EAE2D5] rounded-xl overflow-hidden hover:border-[#4E7C59] transition-colors">
              <img src={product.img} alt={productSearchName(product, lang)} width="640" height="420" className="w-full aspect-[3/2] object-cover" />
              <div className="px-5 py-4">
                <div className="font-['Fraunces'] text-lg font-semibold">{productSearchName(product, lang)}</div>
                <div className="text-sm font-semibold text-[#3B6146] mt-2">{product.price} {prefix}</div>
              </div>
            </a>
          ))}
        </div>

        <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold mt-20 mb-6">{c.linksTitle}</h2>
        <ul className="flex flex-col gap-3 text-[#3B6146] underline">
          <li><a href={buildPath({ page: 'Blog', articleId: PILLAR, lang })}>{c.pillar}</a></li>
          <li><a href={buildPath({ page: 'FAQ', lang })}>{c.faqLink}</a></li>
          <li><a href={buildPath({ page: 'Wholesale', lang })}>{c.wholesale}</a></li>
        </ul>

        <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold mt-20 mb-8">{c.faqTitle}</h2>
        <div className="max-w-[760px]">
          {faqs.map(item => (
            <div key={item.q} className="border-b border-[#EAE2D5] py-5">
              <h3 className="font-semibold text-[#2B241E] mb-2">{item.q}</h3>
              <p className="text-[#5B5048] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
