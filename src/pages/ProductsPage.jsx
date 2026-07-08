import React from 'react';
import { motion } from 'framer-motion';
import { T } from '../constants/translations';
import { PRODUCTS } from '../constants/products';
import ProductCard from '../components/ProductCard';
import TrustBar from '../components/TrustBar';

export default function ProductsPage({ onOpen, setPage, lang }) {
  const t = T[lang];
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-white to-[#F0F7FA] text-[#0F172A] overflow-hidden font-['Inter']">
      
      {/* Organic Blobs & Pearls in Hero */}
      <div className="absolute top-0 right-0 w-[50%] h-[800px] pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-[10%] right-[10%] w-[600px] h-[600px] text-[#EFFF00] opacity-80 z-0">
          <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.4,-46.2C91,-33.3,97.3,-17.7,96.6,-2.4C95.9,12.9,88.2,27.8,78.2,40.6C68.2,53.4,55.9,64.1,41.9,71.1C27.9,78.1,12.2,81.4,-2.7,85.2C-17.6,89,-31.7,93.4,-44.6,88.8C-57.5,84.2,-69.2,70.6,-77.9,55.1C-86.6,39.6,-92.3,22.2,-91.3,5.4C-90.3,-11.4,-82.6,-27.6,-72.1,-41C-61.6,-54.4,-48.3,-65,-34.5,-72.1C-20.7,-79.2,-6.4,-82.8,7.9,-84.6C22.2,-86.4,44.4,-86.4,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      {/* Decorative Pearls */}
      <div className="absolute top-[15%] left-[45%] w-12 h-12 rounded-full bg-gradient-to-br from-white to-pink-100 shadow-xl opacity-90 z-10 blur-[1px]"></div>
      <div className="absolute top-[8%] right-[30%] w-8 h-8 rounded-full bg-gradient-to-br from-white to-gray-200 shadow-xl opacity-90 z-10 blur-[2px]"></div>
      <div className="absolute bottom-[25%] right-[5%] w-24 h-24 rounded-full bg-gradient-to-br from-white to-pink-100 shadow-2xl opacity-90 z-10"></div>
      <div className="absolute top-[50%] left-[55%] w-6 h-6 rounded-full bg-gradient-to-br from-white to-gray-100 shadow-md opacity-80 z-10"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Hero Content */}
          <div className="max-w-[600px] flex-1">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight font-['Playfair_Display'] text-[#0F172A] mb-6"
            >
              {t.heroTitle[0]}<br/>
              <span className="relative inline-block mt-2 mb-2">
                <span className="relative z-10 italic font-medium">{t.heroTitle[1]}</span>
                {/* Hand-drawn highlighter */}
                <motion.svg 
                  initial={{ strokeDashoffset: 1000 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  className="absolute -bottom-1 -left-2 w-[110%] h-[20px] -z-10"
                  viewBox="0 0 200 20" preserveAspectRatio="none"
                >
                  <path d="M5,15 Q100,5 195,15" fill="none" stroke="#EFFF00" strokeWidth="12" strokeLinecap="round" strokeDasharray="1000" />
                </motion.svg>
              </span>
              <br/>{t.heroTitle[2]}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[17px] md:text-lg text-[#1E293B] mb-10 font-normal leading-relaxed max-w-[500px]"
            >
              We Think, discover, source, and supply specialty food products that give our partners a true point of difference — products customers cannot find elsewhere in the market.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button 
                onClick={() => setPage('Solutions')}
                className="px-7 py-3.5 bg-[#EFFF00] text-[#0F172A] font-bold text-sm rounded-xl transition-all hover:scale-105 shadow-sm hover:shadow-md"
              >
                {t.heroCta1}
              </button>
              
              <button 
                onClick={() => setPage('About us')}
                className="px-7 py-3.5 bg-white/80 backdrop-blur border border-gray-200 text-[#0F172A] font-bold text-sm rounded-xl hover:bg-white transition-all shadow-sm hover:shadow-md"
              >
                {t.heroCta2}
              </button>
            </motion.div>
          </div>

          {/* Hero Image Group */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex-1 h-[600px] flex items-center justify-center pointer-events-none"
          >
            <img src="/assets/logo-full.png" alt="BlessMe Thailand" className="relative z-20 w-full max-w-[320px] object-contain drop-shadow-2xl mix-blend-multiply" />
            
            {/* Fake boba/ingredients floating (represented by colored dots) */}
            <div className="absolute w-full h-full z-10">
              <div className="absolute top-[20%] left-[15%] w-4 h-4 rounded-full bg-red-600/80 shadow-md blur-[0.5px]"></div>
              <div className="absolute top-[10%] right-[30%] w-5 h-5 rounded-full bg-red-500/90 shadow-md"></div>
              <div className="absolute top-[30%] right-[15%] w-4 h-4 rounded-full bg-green-500/80 shadow-md blur-[1px]"></div>
              <div className="absolute bottom-[35%] left-[20%] w-6 h-6 rounded-full bg-yellow-600/90 shadow-md"></div>
              <div className="absolute bottom-[15%] right-[25%] w-5 h-5 rounded-full bg-[#38b6ff]/90 shadow-md blur-[0.5px]"></div>
              <div className="absolute bottom-[40%] right-[5%] w-8 h-8 bg-amber-100 rounded shadow-md transform rotate-12"></div>
            </div>
          </motion.div>

        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-[1px] h-12 bg-gray-400"></div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400 mt-2">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Featured Products */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 py-20 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#0F172A] mb-3">{t.productRange}</div>
            <h2 className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] text-[#0F172A]">{t.sixFlavors}</h2>
          </div>
          <p className="text-lg text-[#1E293B] italic font-serif max-w-[300px] text-right">
            Curated for the Thai market. Selected for cafés, restaurants, retailers, and dessert brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} blessed={i === 0} onClick={() => onOpen(p)} lang={lang} index={i} />
          ))}
        </div>
      </section>

      <TrustBar lang={lang} />

    </div>
  );
}
