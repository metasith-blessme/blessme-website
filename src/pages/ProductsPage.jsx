import React from 'react';
import { motion } from 'framer-motion';
import { T } from '../constants/translations';
import { PRODUCTS } from '../constants/products';
import ProductCard from '../components/ProductCard';
import TrustBar from '../components/TrustBar';

export default function ProductsPage({ onOpen, setPage, lang }) {
  const t = T[lang];
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#FDFBF6] to-[#F1EADF] text-[#2B241E] overflow-hidden font-['Inter']">

      {/* Soft warm atmosphere behind hero (slow drifting) */}
      <div className="bm-hero-drift absolute top-[-160px] right-[-120px] w-[560px] h-[560px] rounded-full bg-[#4E7C59]/12 blur-[90px] pointer-events-none"></div>
      <div className="bm-hero-drift--2 absolute top-[120px] left-[-140px] w-[420px] h-[420px] rounded-full bg-[#C9B893]/15 blur-[90px] pointer-events-none"></div>

      {/* Ambient floating boba pearls across the hero (subtle, behind content) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <span className="bm-hero-float" style={{ top: '22%', left: '30%', width: 18, height: 18, animationDuration: '17s', background: 'radial-gradient(circle at 30% 30%, #fff, #4E7C59)', opacity: 0.16 }} />
        <span className="bm-hero-float" style={{ top: '68%', left: '18%', width: 12, height: 12, animationDuration: '21s', animationDelay: '-4s', background: 'radial-gradient(circle at 30% 30%, #fff, #C9B893)', opacity: 0.18 }} />
        <span className="bm-hero-float" style={{ top: '40%', left: '58%', width: 10, height: 10, animationDuration: '19s', animationDelay: '-8s', background: 'radial-gradient(circle at 30% 30%, #fff, #7FAE8F)', opacity: 0.14 }} />
        <span className="bm-hero-float" style={{ top: '80%', left: '46%', width: 22, height: 22, animationDuration: '24s', animationDelay: '-2s', background: 'radial-gradient(circle at 30% 30%, #fff, #B7CDA9)', opacity: 0.13 }} />
        <span className="bm-hero-float" style={{ top: '14%', left: '64%', width: 8, height: 8, animationDuration: '15s', animationDelay: '-6s', background: 'radial-gradient(circle at 30% 30%, #fff, #4E7C59)', opacity: 0.15 }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-12 pb-16 md:pt-20 md:pb-24 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Hero Content */}
          <div className="max-w-[600px] flex-1">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-['Fraunces'] text-6xl md:text-7xl lg:text-[5.25rem] font-semibold leading-[1.02] tracking-[-0.02em] text-[#2B241E] mb-6"
            >
              {t.heroTitle[0]}<br/>
              <span className="relative inline-block mt-2 mb-2">
                <span className="relative z-10 italic font-normal text-[#3B6146]">{t.heroTitle[1]}</span>
                {/* Hand-drawn highlighter */}
                <motion.svg 
                  initial={{ strokeDashoffset: 1000 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  className="absolute -bottom-1 -left-2 w-[110%] h-[20px] -z-10"
                  viewBox="0 0 200 20" preserveAspectRatio="none"
                >
                  <path d="M5,15 Q100,5 195,15" fill="none" stroke="#B7CDA9" strokeWidth="10" strokeLinecap="round" strokeDasharray="1000" />
                </motion.svg>
              </span>
              <br/>{t.heroTitle[2]}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[17px] md:text-lg text-[#5B5048] mb-10 font-normal leading-relaxed max-w-[500px]"
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
                className="px-7 py-3.5 bg-[#4E7C59] text-white font-semibold text-sm rounded-xl transition-colors hover:bg-[#3B6146] shadow-[0_6px_18px_rgba(59,97,70,0.22)]"
              >
                {t.heroCta1}
              </button>
              
              <button 
                onClick={() => setPage('About us')}
                className="px-7 py-3.5 bg-white/70 backdrop-blur border border-[#E0D6C6] text-[#2B241E] font-semibold text-sm rounded-xl hover:bg-white hover:border-[#4E7C59] transition-colors"
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
            className="relative flex-1 h-[520px] flex items-center justify-center pointer-events-none"
          >
            {/* Animated background orb (swap in a <video className="bm-hero-orb-media" muted autoPlay loop playsInline poster="..."/> here later) */}
            <div className="bm-hero-orb">
              <div className="bm-hero-sheen" />
              <div className="bm-hero-ring" />
              <div className="bm-hero-ring" />
              <div className="bm-hero-ring" />
              <div className="bm-hero-orbit">
                <span className="bm-hero-pearl" style={{ top: '7%', left: 'calc(50% - 7px)', width: 14, height: 14, background: 'radial-gradient(circle at 30% 30%, #fff, #4E7C59)' }} />
                <span className="bm-hero-pearl" style={{ top: 'calc(50% - 5px)', left: '90%', width: 10, height: 10, background: 'radial-gradient(circle at 30% 30%, #fff, #C9B893)' }} />
              </div>
              <div className="bm-hero-orbit bm-hero-orbit--rev">
                <span className="bm-hero-pearl" style={{ top: '85%', left: '38%', width: 12, height: 12, background: 'radial-gradient(circle at 30% 30%, #fff, #7FAE8F)' }} />
                <span className="bm-hero-pearl" style={{ top: '28%', left: '9%', width: 8, height: 8, background: 'radial-gradient(circle at 30% 30%, #fff, #B7CDA9)' }} />
              </div>
            </div>
            <div className="absolute w-[300px] h-[300px] rounded-full border border-[#4E7C59]/15"></div>
            <img src="/assets/logo-full.png" alt="BlessMe Thailand" className="bm-hero-mark-float relative z-20 w-full max-w-[300px] object-contain drop-shadow-[0_12px_28px_rgba(59,97,70,0.18)]" />
          </motion.div>

        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-[1px] h-12 bg-[#B3A793]"></div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#B3A793] mt-2">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Featured Products */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 py-20 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#3B6146] mb-3"><span className="w-4 h-px bg-[#4E7C59]"></span>{t.productRange}</div>
            <h2 className="font-['Fraunces'] text-5xl md:text-6xl font-semibold tracking-[-0.02em] text-[#2B241E]">{t.sixFlavors}</h2>
          </div>
          <p className="font-['Fraunces'] text-lg text-[#5B5048] italic max-w-[300px] md:text-right">
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
