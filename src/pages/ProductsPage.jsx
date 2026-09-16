import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { T } from '../constants/translations';
import { PRODUCTS } from '../constants/products';
import ProductCard from '../components/ProductCard';
import TrustBar from '../components/TrustBar';

export default function ProductsPage({ onOpen, setPage, lang }) {
  const t = T[lang];
  const isTh = lang === 'th';
  const [burstFlavor, setBurstFlavor] = useState(null);

  const handleBobaBurst = (flavorNameTh, flavorNameEn) => {
    const label = isTh ? flavorNameTh : flavorNameEn;
    setBurstFlavor(label);
    setTimeout(() => {
      setBurstFlavor(null);
    }, 1200);
  };

  const signatureRecipes = [
    {
      title: isTh ? 'กาแฟบาร์เลย์ ไอน์ชแปนเนอร์' : 'Roasted Barley Einspänner',
      category: isTh ? '☕ ซิกเนเจอร์คอฟฟี่' : '☕ Signature Coffee',
      pairingFlavor: isTh ? 'บาร์เลย์ (Barley)' : 'Roasted Barley',
      desc: isTh 
        ? 'ดับเบิ้ลเอสเพรสโซ่เข้มข้น ท็อปด้วยวิปครีมเกลือหิมาลายัน และมุกบาร์เลย์คั่วหอม แตกตัวเพิ่มมิติสัมผัส' 
        : 'Double espresso over chilled oat milk, crowned with sea salt cream and bursting roasted barley pearls.',
      toppingCost: '~4.50฿',
      suggestedPrice: '145฿',
      prepTime: '45s',
      tagColor: '#8C6A2E'
    },
    {
      title: isTh ? 'ชาหอมหมื่นลี้ สปาร์คกลิ้ง ยูซุ' : 'Osmanthus Blossom Yuzu Fizz',
      category: isTh ? '🌸 รีเฟรชเชอร์สปาร์คกลิ้ง' : '🌸 Craft Tea & Soda',
      pairingFlavor: isTh ? 'บุกหอมหมื่นลี้ (Osmanthus Konjac)' : 'Osmanthus Konjac',
      desc: isTh 
        ? 'โคลด์บริวชามะลิผสมไซรัปยูซุแท้ ซ่าสดชื่นด้วยโซดา พร้อมกลิ่นหอมดอกไม้จากบุกหอมหมื่นลี้'
        : 'Cold brew jasmine green tea with artisan yuzu soda, crowned with fragrant osmanthus konjac.',
      toppingCost: '~4.50฿',
      suggestedPrice: '125฿',
      prepTime: '30s',
      tagColor: '#3B6146'
    },
    {
      title: isTh ? 'มัทฉะ สตรอว์เบอร์รี โมจิโยเกิร์ต' : 'Moji Yogurt Strawberry Matcha',
      category: isTh ? '🍓 พรีเมียมเลเยอร์ลาเต้' : '🍓 Layered Latte & Dessert',
      pairingFlavor: isTh ? 'โมจิโยเกิร์ต (Moji Yogurt)' : 'Moji Yogurt',
      desc: isTh 
        ? 'ซอสสตรอว์เบอร์รีเคี่ยวสด เลเยอร์นมสดและมัทฉะอุจิแท้ ตัดรสชาติด้วยมุกโมจิโยเกิร์ตเปรี้ยวหวานเข้มข้น' 
        : 'Artisan strawberry compote layered with fresh milk, ceremonial matcha, and rich moji-yogurt pearls.',
      toppingCost: '~6.00฿',
      suggestedPrice: '165฿',
      prepTime: '60s',
      tagColor: '#A3283B'
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#FAF6EF] text-[#2B241E] overflow-hidden font-['Inter']">

      {/* Pop Sensory Notification Toast */}
      <AnimatePresence>
        {burstFlavor && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.8 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#243E2C] text-[#E5C378] text-sm font-semibold shadow-2xl border border-[#C5A869]/40 flex items-center gap-2 pointer-events-none"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A869] animate-ping" />
            <span>✨ {isTh ? `สัมผัสรสชาติแตกกระจาย: ${burstFlavor}!` : `Sensory Burst: ${burstFlavor}!`}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric Japanese Zen Fluid & 3D Boba Motion Canvas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Radiant Matcha & Amber Liquid Gradient Meshes */}
        <div className="bm-mesh-drift absolute top-[-120px] right-[-100px] w-[700px] h-[700px] rounded-full bg-[#3B6146]/16 blur-[120px]" />
        <div className="bm-mesh-drift absolute top-[160px] left-[-140px] w-[620px] h-[620px] rounded-full bg-[#C5A869]/20 blur-[110px]" style={{ animationDelay: '-4s' }} />
        <div className="bm-mesh-drift absolute bottom-[-80px] left-[30%] w-[680px] h-[480px] rounded-full bg-[#E9EFE4]/80 blur-[100px]" style={{ animationDelay: '-2s' }} />

        {/* 18+ High-Velocity 3D Specular Popping Boba Pearls (6 Menu Flavors) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          
          {/* 1. Barley Boba (Roasted Golden Amber) */}
          <span 
            onClick={() => handleBobaBurst('บาร์เลย์อบหอม', 'Roasted Barley')}
            className="bm-boba-3d bm-float-fast-1 pointer-events-auto active:scale-90" 
            title="Click to burst Barley Boba!"
            style={{ 
              top: '14%', left: '8%', width: 52, height: 52, 
              background: 'radial-gradient(circle at 28% 26%, #ffffff 12%, rgba(245,200,110,0.98) 40%, rgba(185,125,35,0.95) 75%, rgba(95,50,10,0.98) 100%)', 
              boxShadow: '0 14px 32px rgba(185,125,35,0.45), inset 0 3px 6px rgba(255,255,255,0.9), inset 0 -3px 6px rgba(0,0,0,0.2)' 
            }} 
          />

          {/* 2. Oat Boba (Silky Plant Cream Ivory) */}
          <span 
            onClick={() => handleBobaBurst('โอ๊ตนุ่มละมุน', 'Silky Oat')}
            className="bm-boba-3d bm-float-fast-2 pointer-events-auto active:scale-90" 
            title="Click to burst Oat Boba!"
            style={{ 
              top: '22%', right: '8%', width: 56, height: 56, 
              background: 'radial-gradient(circle at 28% 26%, #ffffff 14%, rgba(255,245,225,0.98) 42%, rgba(220,195,150,0.95) 76%, rgba(135,105,65,0.98) 100%)', 
              boxShadow: '0 14px 32px rgba(180,150,100,0.35), inset 0 3px 6px rgba(255,255,255,0.95), inset 0 -3px 6px rgba(0,0,0,0.15)' 
            }} 
          />

          {/* 3. Red Bean Boba (Ruby Adzuki) */}
          <span 
            onClick={() => handleBobaBurst('ถั่วแดงคลาสสิก', 'Heritage Red Bean')}
            className="bm-boba-3d bm-float-fast-3 pointer-events-auto active:scale-90" 
            title="Click to burst Red Bean Boba!"
            style={{ 
              top: '62%', left: '7%', width: 46, height: 46, 
              background: 'radial-gradient(circle at 28% 26%, #ffffff 10%, rgba(230,100,120,0.98) 38%, rgba(150,30,45,0.95) 74%, rgba(65,10,18,0.98) 100%)', 
              boxShadow: '0 12px 28px rgba(150,30,45,0.4), inset 0 3px 6px rgba(255,255,255,0.9), inset 0 -3px 6px rgba(0,0,0,0.25)' 
            }} 
          />

          {/* 4. Water Chestnut Boba (Crystalline Opal Glass) */}
          <span 
            onClick={() => handleBobaBurst('แห้วกรอบสดชื่น', 'Crisp Water Chestnut')}
            className="bm-boba-3d bm-float-fast-4 pointer-events-auto active:scale-90" 
            title="Click to burst Water Chestnut Boba!"
            style={{ 
              top: '68%', right: '8%', width: 48, height: 48, 
              background: 'radial-gradient(circle at 28% 26%, #ffffff 16%, rgba(235,248,252,0.98) 46%, rgba(175,220,230,0.92) 76%, rgba(80,135,150,0.95) 100%)', 
              boxShadow: '0 12px 28px rgba(80,135,150,0.35), inset 0 3px 6px rgba(255,255,255,0.95), inset 0 -3px 6px rgba(0,0,0,0.15)' 
            }} 
          />

          {/* 5. Moji Yogurt Boba (Velvet Cream Gold) */}
          <span 
            onClick={() => handleBobaBurst('โมจิโยเกิร์ตเข้มข้น', 'Rich Moji Yogurt')}
            className="bm-boba-3d bm-float-fast-1 pointer-events-auto active:scale-90" 
            title="Click to burst Moji Yogurt Boba!"
            style={{ 
              top: '32%', left: '16%', width: 38, height: 38, animationDelay: '-2s', 
              background: 'radial-gradient(circle at 28% 26%, #ffffff 14%, rgba(255,250,230,0.98) 42%, rgba(245,215,130,0.95) 76%, rgba(160,120,35,0.98) 100%)', 
              boxShadow: '0 10px 24px rgba(210,165,60,0.38), inset 0 2px 5px rgba(255,255,255,0.9)' 
            }} 
          />

          {/* 6. Osmanthus Boba (Gold Blossom Nectar) */}
          <span 
            onClick={() => handleBobaBurst('ดอกหอมหมื่นลี้สีทอง', 'Sweet Osmanthus')}
            className="bm-boba-3d bm-float-fast-2 pointer-events-auto active:scale-90" 
            title="Click to burst Osmanthus Boba!"
            style={{ 
              top: '38%', right: '15%', width: 42, height: 42, animationDelay: '-3.5s', 
              background: 'radial-gradient(circle at 28% 26%, #ffffff 12%, rgba(255,230,100,0.98) 40%, rgba(240,175,20,0.95) 74%, rgba(145,90,5,0.98) 100%)', 
              boxShadow: '0 10px 26px rgba(240,175,20,0.42), inset 0 2px 5px rgba(255,255,255,0.92)' 
            }} 
          />

          {/* Secondary Swarm of 3D Boba */}
          <span onClick={() => handleBobaBurst('บาร์เลย์', 'Barley')} className="bm-boba-3d bm-float-fast-3 pointer-events-auto" style={{ top: '8%', left: '32%', width: 26, height: 26, animationDelay: '-1s', background: 'radial-gradient(circle at 28% 26%, #ffffff 12%, #FAD790 40%, #D49838 75%, #7A4B12 100%)', boxShadow: '0 6px 16px rgba(185,125,35,0.35)' }} />
          <span onClick={() => handleBobaBurst('โอ๊ต', 'Oat')} className="bm-boba-3d bm-float-fast-4 pointer-events-auto" style={{ top: '16%', right: '28%', width: 28, height: 28, animationDelay: '-4s', background: 'radial-gradient(circle at 28% 26%, #ffffff 14%, #FFF3DC 42%, #E3CCA2 76%, #9E7D52 100%)', boxShadow: '0 6px 16px rgba(180,150,100,0.3)' }} />
          <span onClick={() => handleBobaBurst('ถั่วแดง', 'Red Bean')} className="bm-boba-3d bm-float-fast-1 pointer-events-auto" style={{ top: '80%', left: '22%', width: 32, height: 32, animationDelay: '-5s', background: 'radial-gradient(circle at 28% 26%, #ffffff 10%, #E57385 38%, #A3283B 74%, #540D18 100%)', boxShadow: '0 8px 18px rgba(150,30,45,0.35)' }} />
          <span onClick={() => handleBobaBurst('แห้ว', 'Water Chestnut')} className="bm-boba-3d bm-float-fast-2 pointer-events-auto" style={{ top: '84%', right: '20%', width: 30, height: 30, animationDelay: '-1.5s', background: 'radial-gradient(circle at 28% 26%, #ffffff 16%, #EAF5F8 46%, #B8DFE6 76%, #6A9EAA 100%)', boxShadow: '0 8px 18px rgba(80,135,150,0.3)' }} />
          <span onClick={() => handleBobaBurst('โมจิโยเกิร์ต', 'Moji Yogurt')} className="bm-boba-3d bm-float-fast-3 pointer-events-auto" style={{ top: '48%', left: '4%', width: 24, height: 24, animationDelay: '-3s', background: 'radial-gradient(circle at 28% 26%, #ffffff 14%, #FFF9E6 42%, #F5DFA0 76%, #B89035 100%)', boxShadow: '0 6px 14px rgba(210,165,60,0.3)' }} />
          <span onClick={() => handleBobaBurst('หอมหมื่นลี้', 'Osmanthus')} className="bm-boba-3d bm-float-fast-4 pointer-events-auto" style={{ top: '54%', right: '4%', width: 28, height: 28, animationDelay: '-6s', background: 'radial-gradient(circle at 28% 26%, #ffffff 12%, #FFE885 40%, #F5B82A 74%, #A86B08 100%)', boxShadow: '0 8px 18px rgba(240,175,20,0.35)' }} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-[1360px] mx-auto px-6 pt-12 pb-20 md:pt-20 md:pb-28 lg:px-12">
        <div className="flex flex-col items-center text-center max-w-[960px] mx-auto">
          
          {/* Eyebrow Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#E9EFE4] border border-[#3B6146]/20 text-[#243E2C] text-xs md:text-sm font-semibold tracking-wider uppercase mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#3B6146] animate-pulse"></span>
            <span>{isTh ? 'วัตถุดิบเครื่องดื่ม & ขนมหวาน ค้าส่งระดับพรีเมียม' : 'Premium Beverage & Dessert Wholesale'}</span>
          </motion.div>

          {/* Poetic Editorial Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Fraunces'] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.04] tracking-[-0.025em] text-[#2B241E] mb-6"
          >
            {t.heroTitle[0]}
            <span className="relative inline-block mx-2">
              <span className="relative z-10 italic font-normal text-[#3B6146] font-['Fraunces']">{t.heroTitle[1]}</span>
              {/* Organic brush underline */}
              <svg className="absolute -bottom-2 left-0 w-full h-[14px] text-[#C5A869]/60 -z-10" viewBox="0 0 200 14" preserveAspectRatio="none" fill="none">
                <path d="M4 10C60 3 140 3 196 10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
            {t.heroTitle[2]}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#5C5248] mb-10 font-normal leading-relaxed max-w-[680px]"
          >
            {t.heroSub}
          </motion.p>

          {/* Unit Economics Highlight Pills */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10"
          >
            <div className="px-4 py-2 rounded-full bg-white border border-[#2B241E]/10 shadow-sm text-xs md:text-sm font-semibold text-[#2B241E] flex items-center gap-2">
              <span className="text-[#3B6146] font-bold">~4.50 THB</span>
              <span className="text-[#7A6E63]">{isTh ? '/ ที่เสิร์ฟ' : '/ serving'}</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white border border-[#2B241E]/10 shadow-sm text-xs md:text-sm font-semibold text-[#2B241E] flex items-center gap-2">
              <span className="text-[#3B6146] font-bold">90–120 THB</span>
              <span className="text-[#7A6E63]">{isTh ? '/ แพ็ค (500g)' : '/ pack (500g)'}</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white border border-[#2B241E]/10 shadow-sm text-xs md:text-sm font-semibold text-[#2B241E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A869]"></span>
              <span className="text-[#7A6E63]">{isTh ? 'อายุ 12 เดือน ไม่ต้องแช่เย็น' : '12M Shelf Life · Ambient'}</span>
            </div>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button 
              onClick={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#3B6146] text-white font-semibold text-sm rounded-full transition-all hover:bg-[#243E2C] shadow-[0_8px_24px_rgba(59,97,70,0.28)] hover:shadow-[0_12px_32px_rgba(59,97,70,0.36)] hover:translate-y-[-1px] flex items-center gap-2"
            >
              <span>{t.heroCta1}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            
            <a 
              href="mailto:Blessme.team@gmail.com?subject=Sample%20Request"
              data-contact-intent="sample"
              className="px-8 py-4 bg-white border border-[#2B241E]/12 text-[#2B241E] font-semibold text-sm rounded-full hover:bg-white hover:border-[#3B6146] transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 6 9 7 9-7" />
              </svg>
              <span>{t.heroCta2} (Email)</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section id="catalog-section" className="relative z-10 max-w-[1360px] mx-auto px-6 py-20 lg:px-12 border-t border-[#2B241E]/8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#3B6146] mb-3">
              <span className="w-5 h-px bg-[#3B6146]"></span>
              <span>{t.productRange}</span>
            </div>
            <h2 className="font-['Fraunces'] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.02em] text-[#2B241E]">
              {t.sixFlavors}
            </h2>
          </div>
          <p className="font-['Fraunces'] text-base md:text-lg text-[#5C5248] italic max-w-[340px] md:text-right leading-relaxed">
            {t.productSub}
          </p>
        </div>

        {/* 6 Boba Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((p, i) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              blessed={i === 0} 
              onClick={() => onOpen(p)} 
              lang={lang} 
              index={i} 
            />
          ))}
        </div>
      </section>

      {/* Signature Beverage Recipe & Pairing Showcase for Cafés */}
      <section className="relative z-10 max-w-[1360px] mx-auto px-6 py-20 lg:px-12 border-t border-[#2B241E]/8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#8C6A2E] mb-3">
              <span className="w-5 h-px bg-[#8C6A2E]"></span>
              <span>{isTh ? 'ไอเดียเมนูเครื่องดื่มซิกเนเจอร์' : 'SIGNATURE PAIRING CONCEPTS'}</span>
            </div>
            <h2 className="font-['Fraunces'] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2B241E]">
              {isTh ? 'สร้างสรรค์เมนูซิกเนเจอร์ที่ไม่มีใครเหมือน' : 'Inspire Your Baristas. Captivate Your Guests.'}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5C5248] max-w-[400px] md:text-right leading-relaxed font-normal">
            {isTh 
              ? 'พร้อมตักเสิร์ฟทันทีโดยไม่ต้องต้ม ช่วยยกระดับเมนูกาแฟ ชา และขนมหวานให้พรีเมียม เพิ่มราคาขายได้ 20–35 บาท' 
              : 'Zero kitchen prep required. Turn ordinary lattes, teas, and bingsu into high-ticket signature items.'}
          </p>
        </div>

        {/* 3 Recipe Inspiration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {signatureRecipes.map((recipe, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-[24px] p-7 sm:p-8 border border-[#2B241E]/8 shadow-[0_4px_20px_rgba(43,36,30,0.04)] hover:shadow-[0_16px_36px_rgba(59,97,70,0.08)] hover:border-[#3B6146]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Pill */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#8C6A2E] bg-[#F8F4EA] px-3 py-1 rounded-full border border-[#C5A869]/30">
                    {recipe.category}
                  </span>
                  <span className="text-xs font-bold text-[#3B6146] bg-[#E9EFE4] px-2.5 py-0.5 rounded-full">
                    {recipe.prepTime} {isTh ? 'เสร็จ' : 'prep'}
                  </span>
                </div>

                {/* Recipe Title */}
                <h3 className="font-['Fraunces'] text-2xl font-semibold text-[#2B241E] mb-2 leading-snug">
                  {recipe.title}
                </h3>

                {/* Pairing Badge */}
                <div className="text-xs font-medium text-[#7A6E63] mb-4">
                  {isTh ? 'ใช้ท็อปปิ้ง:' : 'Paired with:'} <strong className="text-[#3B6146]">{recipe.pairingFlavor}</strong>
                </div>

                {/* Recipe Concept */}
                <p className="text-[14.5px] text-[#5C5248] leading-relaxed font-normal mb-6">
                  {recipe.desc}
                </p>
              </div>

              {/* Economics Summary */}
              <div className="pt-4 border-t border-[#2B241E]/6 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#7A6E63]">{isTh ? 'ต้นทุนท็อปปิ้ง:' : 'Topping cost:'} </span>
                  <strong className="text-[#3B6146] font-bold">{recipe.toppingCost}</strong>
                </div>
                <div>
                  <span className="text-[#7A6E63]">{isTh ? 'ราคาขายแนะนำ:' : 'Suggested retail:'} </span>
                  <strong className="text-[#2B241E] font-bold">{recipe.suggestedPrice}</strong>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* Trust & Certifications Bar (with ROI Calculator) */}
      <TrustBar lang={lang} />

    </div>
  );
}

