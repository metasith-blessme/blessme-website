import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { T } from '../constants/translations';
import { PAGE_TO_PATH } from '../lib/routing';

const NAV_KEYS = ['Products', 'Solutions', 'About us', 'Blog', 'FAQ'];

export default function Navbar({ page, setPage, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];
  const navigate = (p, e) => {
    if (e) {
      if (e.button || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
    }
    setMenuOpen(false);
    setPage(p);
  };
  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/60 border-b border-[#2B241E]/5 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between" role="navigation" aria-label="Main navigation">
          
          {/* Brand */}
          <a className="flex items-center gap-3 cursor-pointer select-none" href="/" aria-label="BlessMe — go to homepage" onClick={(e) => navigate('Products', e)}>
            <img src="/assets/logo-full.png" alt="BlessMe Thailand" className="h-16 w-auto object-contain drop-shadow-sm" />
          </a>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-2 bg-white/70 p-1.5 rounded-full border border-[#EAE2D5]">
            {t.nav.map((l, i) => {
              const key = NAV_KEYS[i];
              const isActive = page === key;
              return (
                <a
                  key={key}
                  href={PAGE_TO_PATH[key]}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-[#3B6146]' : 'text-[#2B241E]/60 hover:text-[#2B241E]'}`}
                  onClick={(e) => navigate(key, e)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-white rounded-full shadow-sm z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{l}</span>
                </a>
              );
            })}
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <span className="hidden xl:block font-mono text-sm tracking-widest text-[#2B241E]/80 font-semibold">+66 (0) 82-896-5199</span>
            
            <div className="hidden md:flex bg-[#F1EADF] p-1 rounded-lg" role="group" aria-label="Language">
              <button 
                className={`px-3 py-1 text-xs font-bold font-mono rounded-md transition-colors ${lang==='en' ? 'bg-white shadow-sm text-[#2B241E]' : 'text-[#2B241E]/50 hover:text-[#2B241E]'}`}
                onClick={() => setLang('en')} aria-pressed={lang==='en'}
              >
                EN
              </button>
              <button 
                className={`px-3 py-1 text-xs font-bold font-mono rounded-md transition-colors ${lang==='th' ? 'bg-white shadow-sm text-[#2B241E]' : 'text-[#2B241E]/50 hover:text-[#2B241E]'}`}
                onClick={() => setLang('th')} aria-pressed={lang==='th'}
              >
                TH
              </button>
            </div>
            
            <button 
              className="hidden md:inline-flex items-center justify-center px-6 py-3 bg-[#4E7C59] text-white font-semibold text-sm tracking-wide rounded-xl hover:bg-[#3B6146] transition-colors hover:shadow-[0_6px_20px_rgba(59,97,70,0.35)]"
              onClick={() => navigate('Solutions')}
            >
              {t.wholesale}
            </button>
            
            {/* Hamburger */}
            <button 
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none z-50 relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`block w-6 h-0.5 bg-[#2B241E] rounded-full transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#2B241E] rounded-full transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#2B241E] rounded-full transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-32 px-6 flex flex-col gap-6"
            role="dialog" aria-modal="true" aria-label="Mobile navigation"
          >
            {t.nav.map((l, i) => {
              const key = NAV_KEYS[i];
              return (
                <a 
                  key={key} 
                  href={PAGE_TO_PATH[key]} 
                  onClick={(e) => navigate(key, e)} 
                  className={`text-4xl font-['Fraunces'] font-bold ${page === key ? 'text-[#2B241E]' : 'text-[#2B241E]/40'}`}
                  aria-current={page===key ? 'page' : undefined}
                >
                  {l}
                </a>
              );
            })}
            
            <div className="mt-8 flex gap-4">
              <button 
                className={`flex-1 py-4 text-sm font-bold font-mono rounded-xl transition-colors border ${lang==='en' ? 'bg-[#2B241E] text-white border-[#2B241E]' : 'border-[#2B241E]/20 text-[#2B241E]'}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button 
                className={`flex-1 py-4 text-sm font-bold font-mono rounded-xl transition-colors border ${lang==='th' ? 'bg-[#2B241E] text-white border-[#2B241E]' : 'border-[#2B241E]/20 text-[#2B241E]'}`}
                onClick={() => setLang('th')}
              >
                TH
              </button>
            </div>
            
            <button 
              className="w-full py-5 bg-[#4E7C59] text-white font-semibold text-sm tracking-wide rounded-xl mt-4"
              onClick={() => navigate('Solutions')}
            >
              {t.wholesale}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
