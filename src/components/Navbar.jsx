import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buildPath } from '../lib/routing';
import { HEADER_CTA, HEADER_NAV, LINE_URL, navLabel } from '../constants/nav';

export default function Navbar({ page, setPage, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
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
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-[#2B241E]/5">
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-4" role="navigation" aria-label="Main navigation">
          <a className="flex items-center gap-3 cursor-pointer select-none shrink-0" href={buildPath({ page: 'Products', lang })} aria-label="BlessMe — go to homepage" onClick={(e) => navigate('Products', e)}>
            <picture>
              <source srcSet="/assets/logo-full.webp" type="image/webp" />
              <img src="/assets/logo-full.png" alt="BlessMe Thailand" className="h-14 w-auto object-contain" width="256" height="256" />
            </picture>
          </a>

          <div className="hidden lg:flex items-center gap-1 bg-white/70 p-1 rounded-full border border-[#EAE2D5] min-w-0">
            {HEADER_NAV.map((item) => {
              const isActive = page === item.page;
              return (
                <a
                  key={item.page}
                  href={buildPath({ page: item.page, lang })}
                  className={`relative px-3 xl:px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${isActive ? 'text-[#3B6146]' : 'text-[#2B241E]/70 hover:text-[#2B241E]'}`}
                  onClick={(e) => navigate(item.page, e)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-white rounded-full shadow-sm z-0"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{navLabel(item, lang)}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden xl:block font-mono text-sm tracking-widest text-[#2B241E]/80 font-semibold">+66 (0) 82-896-5199</span>

            <div className="hidden md:flex bg-[#F1EADF] p-1 rounded-lg" role="group" aria-label="Language">
              <button
                className={`px-3 py-1 text-xs font-bold font-mono rounded-md transition-colors ${lang === 'en' ? 'bg-white shadow-sm text-[#2B241E]' : 'text-[#2B241E]/50 hover:text-[#2B241E]'}`}
                onClick={() => setLang('en')} aria-pressed={lang === 'en'}
              >
                EN
              </button>
              <button
                className={`px-3 py-1 text-xs font-bold font-mono rounded-md transition-colors ${lang === 'th' ? 'bg-white shadow-sm text-[#2B241E]' : 'text-[#2B241E]/50 hover:text-[#2B241E]'}`}
                onClick={() => setLang('th')} aria-pressed={lang === 'th'}
              >
                TH
              </button>
            </div>

            <a
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-[#06c755] text-white font-semibold text-sm tracking-wide rounded-full hover:bg-[#05b34c] transition-colors"
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {HEADER_CTA[lang] || HEADER_CTA.en}
            </a>

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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FAF6EF]/98 backdrop-blur-3xl pt-28 px-6 pb-28 flex flex-col justify-between overflow-y-auto"
            role="dialog" aria-modal="true" aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-5">
              {HEADER_NAV.map((item) => (
                <a
                  key={item.page}
                  href={buildPath({ page: item.page, lang })}
                  onClick={(e) => navigate(item.page, e)}
                  className={`text-3xl font-semibold transition-colors ${page === item.page ? 'text-[#3B6146]' : 'text-[#2B241E]/70'}`}
                  aria-current={page === item.page ? 'page' : undefined}
                >
                  {navLabel(item, lang)}
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-[#2B241E]/10 pt-6">
              <div className="flex bg-[#F1EADF] p-1 rounded-full" role="group" aria-label="Language">
                <button
                  className={`flex-1 py-2.5 text-xs font-bold font-mono rounded-full transition-colors ${lang === 'en' ? 'bg-white shadow-sm text-[#2B241E]' : 'text-[#2B241E]/50'}`}
                  onClick={() => setLang('en')}
                >
                  English (EN)
                </button>
                <button
                  className={`flex-1 py-2.5 text-xs font-bold font-mono rounded-full transition-colors ${lang === 'th' ? 'bg-white shadow-sm text-[#2B241E]' : 'text-[#2B241E]/50'}`}
                  onClick={() => setLang('th')}
                >
                  ภาษาไทย (TH)
                </button>
              </div>
              <a
                className="w-full py-4 bg-[#06c755] text-white font-semibold text-sm tracking-wide rounded-full text-center"
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {HEADER_CTA[lang] || HEADER_CTA.en}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
