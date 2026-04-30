import { useState } from 'react';
import { T } from '../data/translations';
export default function Footer({ setPage, lang }) {
  const t = T[lang];
  const navKeys = ['Products','Solutions','About us','Blog','FAQ'];
  const blessing = t.footerBlessing.split('\n');
  return (
    <footer className="bm-footer">
      <div className="bm-footer-main">
        <div className="bm-brand bm-brand--lg">
          <img src="assets/logo-full.png" alt="BlessMe" />
        </div>
        <p className="bm-footer-blessing">
          {blessing[0]}<br/>{blessing[1]}
        </p>
      </div>
      <div className="bm-footer-cols">
        <div>
          <div className="bm-eyebrow">{t.footerCatalogue}</div>
          <a onClick={() => setPage('Products')}>{t.nav[0]}</a>
          <a onClick={() => setPage('Solutions')}>{t.nav[1]}</a>
        </div>
        <div>
          <div className="bm-eyebrow">{t.footerCompany}</div>
          <a onClick={() => setPage('About us')}>{t.nav[2]}</a>
          <a onClick={() => setPage('Blog')}>{t.footerJournal}</a>
          <a onClick={() => setPage('FAQ')}>{t.nav[4]}</a>
        </div>
        <div>
          <div className="bm-eyebrow">{t.footerContact}</div>
          <a href="mailto:Blessme.team@gmail.com">Blessme.team@gmail.com</a>
          <a href="tel:+66828965199">+66 (0) 82-896-5199</a>
          <a href="https://line.me/R/ti/p/@591dzhsr" target="_blank" rel="noopener noreferrer">LINE @591dzhsr</a>
        </div>
      </div>
      <div className="bm-footer-fine">© {new Date().getFullYear()} BlessMe (Thailand) Co., Ltd. · Bangkok</div>
    </footer>
  );
}
