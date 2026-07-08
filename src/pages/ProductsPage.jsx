import React from 'react';
import { motion } from 'framer-motion';
import { T } from '../constants/translations';
import { PRODUCTS } from '../constants/products';
import ProductCard from '../components/ProductCard';
import TrustBar from '../components/TrustBar';

export default function ProductsPage({ onOpen, setPage, lang }) {
  const t = T[lang];
  return (
    <div className="relative w-full min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-hidden font-['Inter']">
      
      {/* Vibe-Coded Floating Blobs */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[#EFFF00] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 z-0"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] bg-[#E6F4FF] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-48 md:pb-32 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Content */}
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full border border-[#0F172A]/10 text-sm font-semibold tracking-widest uppercase mb-8 bg-white/50 backdrop-blur-md"
            >
              {t.heroEyebrow}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight font-['Playfair_Display'] text-[#0F172A] mb-8"
            >
              {t.heroTitle[0]}
              <span className="relative inline-block mx-2">
                <span className="relative z-10 italic font-medium">{t.heroTitle[1]}</span>
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="absolute bottom-2 left-0 h-4 bg-[#EFFF00] -z-10"
                />
              </span>
              <br/>{t.heroTitle[2]}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-[#1E293B] mb-12 font-light leading-relaxed max-w-xl"
            >
              {t.heroSub}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <button 
                onClick={() => setPage('Solutions')}
                className="group relative px-8 py-4 bg-[#EFFF00] text-[#0F172A] font-semibold text-lg rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_10px_40px_rgba(239,255,0,0.4)]"
              >
                <span className="relative z-10">{t.heroCta1}</span>
                <div className="absolute inset-0 h-full w-full bg-white/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0"></div>
              </button>
              
              <button 
                onClick={() => setPage('About us')}
                className="px-8 py-4 bg-transparent border border-[#0F172A]/20 text-[#0F172A] font-semibold text-lg rounded-xl hover:bg-[#0F172A]/5 transition-all"
              >
                {t.heroCta2}
              </button>
            </motion.div>
          </div>

          {/* Hero Image / 3D Mark */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#EFFF00]/20 to-transparent rounded-[3rem] transform rotate-3 scale-105 backdrop-blur-3xl"></div>
            <img src="/assets/logo-full.png" alt="BlessMe Thailand" className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl mix-blend-multiply" />
          </motion.div>

        </div>
      </div>

      <TrustBar lang={lang} />

      {/* Featured Products */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:px-12 border-t border-[#0F172A]/10">
        <div className="mb-20">
          <div className="text-sm font-semibold tracking-widest uppercase text-[#0F172A]/60 mb-4">{t.productRange}</div>
          <h2 className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] text-[#0F172A] mb-6">{t.sixFlavors}</h2>
          <p className="text-xl text-[#1E293B] italic font-serif max-w-2xl">{t.productSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 masonry-staggered">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} blessed={i === 0} onClick={() => onOpen(p)} lang={lang} index={i} />
          ))}
        </div>
      </section>

    </div>
  );
}
