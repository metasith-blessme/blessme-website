import React from 'react';
import { T } from '../constants/translations';
import { pageCrumbs } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SolutionsPage({ setPage, lang }) {
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
    { n: '01', t: 'ร้านต้องการอะไร', d: 'ร้านอยากได้ของที่ยังไม่ค่อยมีในเมนู เราเริ่มจากฟังว่าต้องการอะไร' },
    { n: '02', t: 'ดูตลาด', d: 'สินค้านี้ยังไม่เคยถูกใช้ในไทยมาก่อน เราดูหมวดสินค้า พฤติกรรมคนกิน และช่องที่ร้านจะใส่เมนูได้' },
    { n: '03', t: 'หาโรงงาน', d: 'เราเลือกโรงงานจากราคา คุณภาพ และมาตรฐานอาหาร ไปดูที่โรงงานเอง และตรวจต่อเนื่อง' },
    { n: '04', t: 'ให้ลองก่อน', d: 'ให้ร้านคู่ค้าและคนกินลองก่อน เก็บความเห็นหลายรอบ พอผ่านแล้วค่อยใส่รายการขายส่ง' },
    { n: '05', t: 'เก็บสต็อก', d: 'เก็บของที่คลังกรุงเทพฯ ให้ร้านมีของสั่งซ้ำ ปริมาณดูจากยอดที่คาดว่าจะขาย เพื่อไม่ให้รอบเปิดเมนูและรอบสั่งซ้ำขาดของ' },
    { n: '06', t: 'ช่วยให้คนกินรู้จัก', d: 'ช่วยให้คนกินรู้จักสินค้า ทำเนื้อหา และช่วยร้านปลีก เพื่อให้ลูกค้าที่เข้าร้านพอรู้ว่าของนี้คืออะไร' },
  ];
  const steps = lang === 'th' ? stepsTh : stepsEn;

  return (
    <section className="bm-content-page max-w-[1360px] mx-auto px-6 py-16 lg:px-12">
      <Breadcrumbs items={pageCrumbs('Solutions', lang)} />
      <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#3B6146] mb-3">
        <span className="w-5 h-px bg-[#3B6146]"></span>
        <span>{t.solEyebrow}</span>
      </div>
      <h1 className="bm-h1 text-4xl sm:text-5xl md:text-6xl font-semibold font-['Fraunces'] text-[#2B241E] max-w-[20ch]">{t.solTitle}</h1>
      <p className="bm-lead text-lg md:text-xl text-[#5C5248] font-normal leading-relaxed" style={{ maxWidth: '64ch', marginTop: 20 }}>
        {t.solLead}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-14">
        {steps.map(s => (
          <div key={s.n} className="bg-white rounded-[24px] p-8 border border-[#2B241E]/8 shadow-[0_4px_20px_rgba(43,36,30,0.03)] hover:shadow-[0_16px_36px_rgba(59,97,70,0.08)] hover:border-[#3B6146]/30 transition-all duration-300 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-['Fraunces'] text-4xl font-bold text-[#3B6146]">{s.n}</span>
              <span className="w-8 h-px bg-[#2B241E]/10"></span>
            </div>
            <h3 className="font-['Fraunces'] text-2xl font-semibold text-[#2B241E]">{s.t}</h3>
            <p className="text-[15px] font-normal text-[#5C5248] leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-[32px] bg-gradient-to-br from-[#2E4F38] to-[#1E3324] p-10 md:p-14 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-[0_20px_50px_rgba(43,36,30,0.18)]">
        <div>
          <div className="text-xs font-bold tracking-[0.18em] uppercase text-[#C5A869] mb-2">{t.solCtaEyebrow}</div>
          <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold text-white mb-3">{t.solCtaTitle}</h2>
          <p className="text-sm md:text-base text-white/80 max-w-[50ch] leading-relaxed">
            {t.solCtaBody}
          </p>
        </div>
        <button 
          className="px-8 py-4 bg-white text-[#243E2C] font-bold text-sm tracking-wide rounded-full hover:bg-[#FAF6EF] transition-all shadow-md hover:shadow-lg hover:scale-102 flex-shrink-0" 
          onClick={() => setPage('About us')}
        >
          {t.solCtaBtn}
        </button>
      </div>
    </section>
  );
}
