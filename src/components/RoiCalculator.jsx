import React, { useState } from 'react';
import { PRODUCTS } from '../constants/products';

export function calculateUplift(product, portionGrams, dailyCups, upcharge) {
  const drainedGrams = Number.parseFloat(product.drainedWeight);
  if (![product.price, drainedGrams, portionGrams, dailyCups, upcharge].every(Number.isFinite) || product.price <= 0 || drainedGrams <= 0 || portionGrams <= 0 || portionGrams > drainedGrams || dailyCups < 0 || upcharge < 0) throw new RangeError('Invalid calculator inputs');
  const servingsPerPack = drainedGrams / portionGrams;
  const costPerServing = product.price / servingsPerPack;
  const contributionPerCup = upcharge - costPerServing;
  const monthlyCups = dailyCups * 30;
  return { costPerServing, contributionPerCup, monthlyCups, monthlyProfit: Math.round(monthlyCups * contributionPerCup), annualProfit: Math.round(dailyCups * 365 * contributionPerCup), packsNeeded: Math.ceil(monthlyCups / servingsPerPack), marginPercent: upcharge ? Math.round(contributionPerCup / upcharge * 100) : 0 };
}

export default function RoiCalculator({ lang }) {
  const isTh = lang === 'th';
  const [dailyCups, setDailyCups] = useState(50);
  const [upcharge, setUpcharge] = useState(20);

  const [productId, setProductId] = useState('barley');
  const [portionGrams, setPortionGrams] = useState(15);
  const product = PRODUCTS.find(p => p.id === productId);
  const { costPerServing, contributionPerCup, monthlyCups, monthlyProfit, annualProfit, packsNeeded, marginPercent } = calculateUplift(product, portionGrams, dailyCups, upcharge);

  const lineQuoteMsg = isTh
    ? `สวัสดีครับ สนใจสั่งซื้อ BlessMe ${product.nameTh} ประมาณเดือนละ ${packsNeeded} แพ็ค (สำหรับเสิร์ฟ ${monthlyCups} แก้ว/เดือน) รบกวนขอใบเสนอราคาพิเศษครับ`
    : `Hello, I would like to enquire about wholesale pricing for ~${packsNeeded} packs/month of BlessMe ${product.name} (~${monthlyCups} cups/month).`;

  const lineUrl = `https://line.me/R/ti/p/@blessmethailand?text=${encodeURIComponent(lineQuoteMsg)}`;

  return (
    <div className="w-full bg-[#243E2C] text-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 md:p-14 border border-[#3B6146]/40 shadow-2xl relative overflow-hidden my-10 sm:my-14">
      
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-[#C5A869]/20 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 bg-[#3B6146]/40 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Sliders & Controls */}
        <div className="lg:col-span-7 flex flex-col">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3B6146]/60 border border-[#C5A869]/30 text-[#E5C378] text-xs font-semibold tracking-wider uppercase mb-4 w-fit">
            <span>{isTh ? 'เครื่องคำนวณกำไรสำหรับร้านคาเฟ่' : 'B2B Profit Uplift Calculator'}</span>
          </div>

          <h2 className="font-['Fraunces'] text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight text-white mb-3">
            {isTh ? 'คำนวณกำไรส่วนเพิ่มต่อเดือน' : 'Calculate Your Monthly Menu Uplift'}
          </h2>
          <p className="text-white/70 text-sm sm:text-lg mb-6 sm:mb-8 font-normal leading-relaxed">
            {isTh 
              ? `ตัวอย่างคำนวณจากราคา ${product.price} บาท/แพ็ค น้ำหนักรวม ${product.packSize} น้ำหนักเนื้อ ${product.drainedWeight} เสิร์ฟละ ${portionGrams}g ไม่ใช่กำไรสุทธิ: ยังไม่หักค่าแรง ขนส่ง ภาษี ของเสีย และค่าใช้จ่ายอื่น สมมติขายทุกวัน`
              : `Illustration: ${product.price} THB per ${product.packSize} pack, ${product.drainedWeight} drained, ${portionGrams}g per serving. Contribution before labour, shipping, tax, waste and other expenses — not net profit. Assumes sales every day.`}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <label>{isTh ? 'สินค้า' : 'Product'}
              <select className="block w-full bg-[#1C3223] text-white p-3 rounded-lg mt-2" value={productId} onChange={e => setProductId(e.target.value)}>
                {PRODUCTS.map(p => <option key={p.id} value={p.id}>{isTh ? p.nameTh : p.name} · ฿{p.price}</option>)}
              </select>
            </label>
            <label>{isTh ? 'น้ำหนักเนื้อต่อเสิร์ฟ' : 'Drained portion'}
              <select className="block w-full bg-[#1C3223] text-white p-3 rounded-lg mt-2" value={portionGrams} onChange={e => setPortionGrams(Number(e.target.value))}>
                {[15, 20, 25].map(g => <option key={g} value={g}>{g}g</option>)}
              </select>
            </label>
          </div>

          {/* Slider 1: Daily Cups */}
          <div className="mb-5 sm:mb-7 bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-baseline mb-3">
              <label htmlFor="daily-cups" className="text-xs sm:text-base font-semibold text-white/90">
                {isTh ? 'จำนวนแก้วที่ขายท็อปปิ้งต่อวัน:' : 'Daily Boba Cups Sold:'}
              </label>
              <span className="text-xl sm:text-3xl font-bold text-[#E5C378] font-['Fraunces']">
                {dailyCups} <span className="text-xs sm:text-sm font-normal text-white/70">{isTh ? 'แก้ว/วัน' : 'cups/day'}</span>
              </span>
            </div>
            <input 
              id="daily-cups"
              type="range" 
              min="10" 
              max="300" 
              step="5"
              value={dailyCups} 
              onChange={(e) => setDailyCups(Number(e.target.value))}
              className="w-full h-3 sm:h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C5A869] touch-pan-x"
            />
            <div className="flex justify-between text-[11px] sm:text-xs text-white/50 mt-2">
              <span>10 {isTh ? 'แก้ว' : 'cups'}</span>
              <span>150 {isTh ? 'แก้ว' : 'cups'}</span>
              <span>300 {isTh ? 'แก้ว' : 'cups'}</span>
            </div>
          </div>

          {/* Control 2: Menu Upcharge */}
          <div className="bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-baseline mb-3">
              <div className="text-xs sm:text-base font-semibold text-white/90">
                {isTh ? 'ราคาบวกเพิ่มท็อปปิ้งบนเมนู:' : 'Menu Upcharge Price:'}
              </div>
              <span className="text-xl sm:text-3xl font-bold text-[#E5C378] font-['Fraunces']">
                +{upcharge} <span className="text-xs sm:text-sm font-normal text-white/70">฿ / {isTh ? 'แก้ว' : 'cup'}</span>
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[15, 20, 25, 30].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setUpcharge(val)}
                  className={`min-h-[44px] py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    upcharge === val 
                      ? 'bg-[#C5A869] text-[#243E2C] shadow-lg scale-[1.02]' 
                      : 'bg-white/10 text-white/80 hover:bg-white/15'
                  }`}
                >
                  +{val} THB
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: ROI Results Display Card */}
        <div className="lg:col-span-5 bg-[#1C3223] rounded-[24px] sm:rounded-[28px] p-6 sm:p-9 border border-[#3B6146] shadow-xl flex flex-col justify-between">
          
          <div>
            <div className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1">
              {isTh ? 'ประมาณการส่วนต่างก่อนค่าใช้จ่ายอื่น' : 'Estimated Contribution'}
            </div>
            
            {/* Big Monthly Number */}
            <div className="my-3">
              <div className="text-xs text-[#E5C378] font-medium">{isTh ? 'ส่วนต่างต่อเดือน (30 วัน)' : 'Monthly Contribution (30 Days)'}</div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['Fraunces'] tracking-tight">
                +฿{monthlyProfit.toLocaleString(isTh ? 'th-TH' : 'en-US')}
              </div>
            </div>

            {/* Annual Uplift */}
            <div className="pb-4 mb-5 border-b border-white/10">
              <span className="text-xs text-white/60">{isTh ? 'ส่วนต่างต่อปี (365 วัน): ' : 'Annual Contribution (365 Days): '}</span>
              <strong className="text-sm text-[#E5C378] font-semibold">+฿{annualProfit.toLocaleString(isTh ? 'th-TH' : 'en-US')} / {isTh ? 'ปี' : 'yr'}</strong>
            </div>

            {/* Breakdown Metrics */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-white/80">
                <span>{isTh ? `ต้นทุนต่อเสิร์ฟ (${portionGrams}g):` : `Portion Cost (${portionGrams}g):`}</span>
                <span className="font-semibold text-white">~฿{costPerServing.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>{isTh ? 'ส่วนต่างต่อแก้ว:' : 'Contribution per Cup:'}</span>
                <span className="font-semibold text-[#E5C378]">+฿{contributionPerCup.toFixed(2)} ({marginPercent}% Margin)</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>{isTh ? 'ปริมาณสั่งต่อเดือน:' : 'Estimated Order/Mo:'}</span>
                <span className="font-semibold text-white">~{packsNeeded} {isTh ? 'แพ็ค (500g)' : 'packs (500g)'}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
            <a 
              href={lineUrl}
              data-contact-intent="quote"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-[#06c755] hover:bg-[#05b34c] text-white font-semibold text-center text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 5.92 2 10.75c0 3.32 2.15 6.22 5.38 7.68-.24.88-.86 3.19-.99 3.69 0 0-.05.21.11.31.16.1.33.02.33.02.44-.06 5.1-3.34 5.86-3.88.44.06.87.09 1.31.09 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
              </svg>
              <span>{isTh ? `ขอใบเสนอราคาส่ง (${packsNeeded} แพ็ค/เดือน)` : `Enquire Wholesale (${packsNeeded} packs/mo)`}</span>
            </a>

            <a 
              href="#contact"
              className="w-full py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-center text-xs sm:text-sm transition-colors"
            >
              {isTh ? 'หรือส่งข้อความผ่านแบบฟอร์ม' : 'Or send enquiry form'}
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
