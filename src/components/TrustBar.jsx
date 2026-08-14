import React from 'react';
import { motion } from 'framer-motion';
import RoiCalculator from './RoiCalculator';

export default function TrustBar({ lang }) {
  const isTh = lang === 'th';

  const cards = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#3B6146]">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      title: isTh ? 'เพิ่มกำไรต่อแก้ว (ต้นทุนเพียง ~4.50–6.00฿)' : 'High Profit Margin (~4.50–6.00฿ / Serving)',
      desc: isTh 
        ? '1 แพ็ค (น้ำหนักเนื้อ 300g) เสิร์ฟได้ถึง ~15–20 แก้ว ช่วยคุมต้นทุนต่อเสิร์ฟให้อยู่ในระดับต่ำ พร้อมเพิ่มราคาขายเมนูซิกเนเจอร์ได้ 15–25 บาท' 
        : 'Each pack (300g drained weight) delivers ~15–20 portions, keeping portion cost at ~4.50–6.00฿ while supporting a 15–25 THB drink upcharge.',
      tag: isTh ? 'กำไรสูง' : 'High Margin'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#3B6146]">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: isTh ? 'พร้อมตักเสิร์ฟทันที (ไม่ต้องต้ม)' : 'Scoop & Serve (Zero Kitchen Prep)',
      desc: isTh 
        ? 'ไม่ต้องต้ม ไม่ต้องแช่ ไม่ต้องใช้อุปกรณ์พิเศษ เก็บอุณหภูมิห้องได้ 12 เดือน เปิดถุงตักเสิร์ฟได้ทันที ลดเวลาบาริสต้า 20 นาที/กะ' 
        : 'No boiling or soaking required. Stored ambient for 12 months — open and serve instantly to cut prep time during peak rushes.',
      tag: isTh ? 'สะดวกเร็ว' : 'Zero Prep'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#3B6146]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: isTh ? 'สาหร่ายธรรมชาติ 100% วีแกน' : '100% Plant-Based Seaweed Alginate',
      desc: isTh 
        ? 'ผลิตจากสารสกัดสาหร่ายธรรมชาติ ไร้เจลาติน เม็ดบีดบางนุ่มแตกในปาก ไม่ทิ้งคราบฟิล์มเหนียว เครื่องดื่มใสสวยงาม' 
        : 'Natural vegan seaweed shell with no gelatin. Delivers a clean burst with zero film residue, preserving pristine drink aesthetics.',
      tag: isTh ? 'วีแกน 100%' : '100% Vegan'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#3B6146]">
          <rect x="1" y="3" width="15" height="13"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      title: isTh ? 'สต็อกในกรุงเทพฯ จัดส่งทั่วประเทศ' : 'Bangkok Warehouse & Nationwide Delivery',
      desc: isTh 
        ? 'สต็อกสินค้าพร้อมส่งตลอดทั้งปีจากคลังสินค้ากรุงเทพฯ จัดส่งรวดเร็ว มีรอบสั่งซื้อยืดหยุ่น เริ่มต้นทดลองสั่งซื้อได้ทันที' 
        : 'Central stock maintained year-round in Bangkok with fast dispatch across Thailand. Flexible MOQs for pilot testing.',
      tag: isTh ? 'ส่งไว' : 'Fast Dispatch'
    }
  ];

  return (
    <section className="relative z-10 max-w-[1360px] mx-auto px-6 py-20 lg:px-12 border-t border-[#2B241E]/8">
      
      {/* Header */}
      <div className="max-w-[780px] mb-14">
        <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#3B6146] mb-3">
          <span className="w-5 h-px bg-[#3B6146]"></span>
          <span>{isTh ? 'จุดเด่นสำหรับธุรกิจค้าส่ง & คาเฟ่' : 'B2B Wholesale Advantage'}</span>
        </div>
        <h2 className="font-['Fraunces'] text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2B241E] tracking-tight mb-4">
          {isTh ? 'ทำไมคาเฟ่และแบรนด์เครื่องดื่มชั้นนำจึงเลือก BlessMe' : 'Why Leading Beverage & Dessert Brands Partner with BlessMe'}
        </h2>
        <p className="text-base sm:text-lg text-[#5C5248] leading-relaxed">
          {isTh 
            ? 'ออกแบบมาเพื่อเพิ่มกำไรต่อแก้ว ลดเวลาการเตรียมงานของบาริสต้า และสร้างสรรค์เมนูซิกเนเจอร์ที่โดดเด่นไม่ซ้ำใคร'
            : 'Formulated to elevate drink margins, simplify kitchen operations, and help your brand introduce viral, one-of-a-kind toppings.'}
        </p>
      </div>

      {/* 4 Advantage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
        {cards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white rounded-[24px] p-7 sm:p-8 border border-[#2B241E]/8 shadow-[0_4px_20px_rgba(43,36,30,0.03)] hover:shadow-[0_16px_36px_rgba(59,97,70,0.08)] hover:border-[#3B6146]/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#E9EFE4] flex items-center justify-center">
                  {card.icon}
                </div>
                <span className="text-[11px] font-bold text-[#8C6A2E] bg-[#F8F4EA] px-3 py-1 rounded-full border border-[#C5A869]/30 uppercase tracking-wider">
                  {card.tag}
                </span>
              </div>
              <h3 className="font-['Fraunces'] text-2xl font-semibold text-[#2B241E] mb-3">
                {card.title}
              </h3>
              <p className="text-[15px] text-[#5C5248] leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive B2B Profit Margin ROI Calculator */}
      <RoiCalculator lang={lang} />

      {/* Tasting Sample Kit Callout Banner */}
      <div className="rounded-[32px] bg-gradient-to-r from-[#243E2C] via-[#2E4F38] to-[#1E3324] p-8 sm:p-12 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-[0_20px_50px_rgba(43,36,30,0.16)]">
        <div className="max-w-[620px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-[#E9EFE4] text-xs font-bold tracking-wider uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C5A869]"></span>
            <span>{isTh ? 'ชุดทดลองสำหรับร้านค้า' : 'Tasting Sample Kit for Cafés'}</span>
          </div>
          <h3 className="font-['Fraunces'] text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3">
            {isTh ? 'สั่งชุดตัวอย่าง 6 รสชาติเพื่อทดลองเมนูก่อนเปิดตัว' : 'Request a 6-Flavor Tasting Sample Box for Your Menu'}
          </h3>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            {isTh 
              ? 'สัมผัสรสชาติ ความกรุบกรอบ และการแตกตัวจริงกับทีมบาริสต้าของคุณก่อนสั่งซื้อล็อตใหญ่ จัดส่งถึงหน้าร้านทั่วไทย'
              : 'Taste, evaluate texture, and develop signature pairings with your baristas before ordering bulk batches.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
          <a 
            href="https://line.me/R/ti/p/@blessmethailand" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#06c755] text-white font-bold text-sm rounded-full shadow-lg hover:bg-[#05b34c] transition-all hover:scale-102 flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 5.92 2 10.75c0 3.32 2.15 6.22 5.38 7.68-.24.88-.86 3.19-.99 3.69 0 0-.05.21.11.31.16.1.33.02.33.02.44-.06 5.1-3.34 5.86-3.88.44.06.87.09 1.31.09 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
            </svg>
            <span>{isTh ? 'ขอรับชุดตัวอย่าง (LINE)' : 'Request Sample via LINE'}</span>
          </a>

          <a 
            href="mailto:Blessme.team@gmail.com?subject=Wholesale%20Sample%20Kit%20Request"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm rounded-full transition-all flex items-center gap-2"
          >
            <span>{isTh ? 'ส่งอีเมลสอบถาม' : 'Email Wholesale Team'}</span>
          </a>
        </div>
      </div>

    </section>
  );
}
