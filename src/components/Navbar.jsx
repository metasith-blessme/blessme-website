import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { T } from '../constants/translations';
import { buildPath } from '../lib/routing';

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
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-[#2B241E]/5 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between" role="navigation" aria-label="Main navigation">
          
          {/* Brand */}
          <a className="flex items-center gap-3 cursor-pointer select-none" href={buildPath({ page: 'Products', lang })} aria-label="BlessMe — go to homepage" onClick={(e) => navigate('Products', e)}>
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
                  href={buildPath({ page: key, lang })}
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
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-[#4E7C59] text-white font-semibold text-sm tracking-wide rounded-full hover:bg-[#3B6146] transition-colors shadow-[0_4px_14px_rgba(59,97,70,0.25)] hover:shadow-[0_6px_20px_rgba(59,97,70,0.35)]"
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
            className="fixed inset-0 z-40 bg-[#FAF6EF]/98 backdrop-blur-3xl pt-28 px-6 pb-10 flex flex-col justify-between overflow-y-auto"
            role="dialog" aria-modal="true" aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-5">
              {t.nav.map((l, i) => {
                const key = NAV_KEYS[i];
                return (
                  <a 
                    key={key} 
                    href={buildPath({ page: key, lang })} 
                    onClick={(e) => navigate(key, e)} 
                    className={`text-3xl font-['Fraunces'] font-semibold transition-colors ${page === key ? 'text-[#3B6146]' : 'text-[#2B241E]/60'}`}
                    aria-current={page===key ? 'page' : undefined}
                  >
                    {l}
                  </a>
                );
              })}
            </div>
            
            <div className="mt-8 flex flex-col gap-4 border-t border-[#2B241E]/10 pt-6">
              <div className="flex bg-[#F1EADF] p-1 rounded-full" role="group" aria-label="Language">
                <button 
                  className={`flex-1 py-2.5 text-xs font-bold font-mono rounded-full transition-colors ${lang==='en' ? 'bg-white shadow-sm text-[#2B241E]' : 'text-[#2B241E]/50'}`}
                  onClick={() => setLang('en')}
                >
                  English (EN)
                </button>
                <button 
                  className={`flex-1 py-2.5 text-xs font-bold font-mono rounded-full transition-colors ${lang==='th' ? 'bg-white shadow-sm text-[#2B241E]' : 'text-[#2B241E]/50'}`}
                  onClick={() => setLang('th')}
                >
                  ภาษาไทย (TH)
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-2">
                <a 
                  href="tel:+66828965199" 
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white border border-[#2B241E]/10 text-xs font-semibold text-[#2B241E]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Call +66 82-896-5199
                </a>
                <a 
                  href="https://line.me/R/ti/p/@blessmethailand" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#06c755]/10 border border-[#06c755]/30 text-xs font-semibold text-[#06c755]"
                >
                  LINE @blessmethailand
                </a>
              </div>

              <button 
                className="w-full py-4 bg-[#4E7C59] text-white font-semibold text-sm tracking-wide rounded-full shadow-[0_4px_16px_rgba(59,97,70,0.25)] mt-2"
                onClick={() => navigate('Solutions')}
              >
                {t.wholesale}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
