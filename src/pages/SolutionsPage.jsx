import React from 'react';
import { T } from '../constants/translations';

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
