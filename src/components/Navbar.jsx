import React, { useState } from 'react';
import { T } from '../constants/translations';

const NAV_KEYS = ['Products', 'Solutions', 'About us', 'Blog', 'FAQ'];

export default function Navbar({ page, setPage, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];
  const navigate = (p) => { setMenuOpen(false); setPage(p); };
  return (
    <>
      <header className="bm-nav-shell">
        <nav className="bm-nav" role="navigation" aria-label="Main navigation">
          <a className="bm-brand" href="#" aria-label="BlessMe — go to homepage" onClick={(e) => { e.preventDefault(); navigate('Products'); }}>
            <img src="/assets/logo-full.png" alt="BlessMe Thailand" />
          </a>
          <div className="bm-links" role="menubar">
            {t.nav.map((l, i) => {
              const key = NAV_KEYS[i];
              return (
                <a key={key} role="menuitem" className={page === key ? 'active' : ''} onClick={() => navigate(key)}
                  aria-current={page === key ? 'page' : undefined}>{l}</a>
              );
            })}
          </div>
          <div className="bm-nav-right">
            <span className="bm-nav-contact-line">+66 (0) 82-896-5199</span>
            <div className="bm-lang-toggle" role="group" aria-label="Language">
              <button className={`bm-lang-btn${lang==='en'?' active':''}`} onClick={() => setLang('en')} aria-pressed={lang==='en'}>EN</button>
              <button className={`bm-lang-btn${lang==='th'?' active':''}`} onClick={() => setLang('th')} aria-pressed={lang==='th'}>TH</button>
            </div>
            <button className="bm-btn bm-btn--primary bm-btn--sm" onClick={() => navigate('Solutions')}>{t.wholesale}</button>
            <button className={`bm-hamburger${menuOpen?' is-open':''}`} aria-label={menuOpen?'Close menu':'Open menu'}
              aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
              <span/><span/><span/>
            </button>
          </div>
        </nav>
      </header>
      <div id="mobile-menu" className={`bm-mobile-menu${menuOpen?' is-open':''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        {t.nav.map((l, i) => {
          const key = NAV_KEYS[i];
          return <a key={key} onClick={() => navigate(key)} aria-current={page===key?'page':undefined}>{l}</a>;
        })}
        <div className="bm-lang-toggle" role="group" aria-label="Language" style={{marginTop:8}}>
          <button className={`bm-lang-btn${lang==='en'?' active':''}`} onClick={() => setLang('en')}>EN</button>
          <button className={`bm-lang-btn${lang==='th'?' active':''}`} onClick={() => setLang('th')}>TH</button>
        </div>
        <button className="bm-btn bm-btn--primary" onClick={() => navigate('Solutions')}>{t.wholesale}</button>
      </div>
    </>
  );
}
