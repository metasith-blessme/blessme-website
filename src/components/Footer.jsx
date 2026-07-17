import React from 'react';
import { T } from '../constants/translations';
import { PAGE_TO_PATH } from '../lib/routing';

export default function Footer({ setPage, lang }) {
  const t = T[lang];
  const blessing = t.footerBlessing.split('\n');
  const navigate = (page, e) => {
    if (e.button || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setPage(page);
  };
  return (
    <footer className="bm-footer">
      <div className="bm-footer-main">
        <div className="bm-brand bm-brand--lg">
          <img src="/assets/logo-full.png" alt="BlessMe" />
        </div>
        <p className="bm-footer-blessing">
          {blessing[0]}<br/>{blessing[1]}
        </p>
      </div>
      <div className="bm-footer-cols">
        <div>
          <div className="bm-eyebrow">{t.footerCatalogue}</div>
          <a href={PAGE_TO_PATH.Products} onClick={(e) => navigate('Products', e)}>{t.nav[0]}</a>
          <a href={PAGE_TO_PATH.Solutions} onClick={(e) => navigate('Solutions', e)}>{t.nav[1]}</a>
        </div>
        <div>
          <div className="bm-eyebrow">{t.footerCompany}</div>
          <a href={PAGE_TO_PATH['About us']} onClick={(e) => navigate('About us', e)}>{t.nav[2]}</a>
          <a href={PAGE_TO_PATH.Blog} onClick={(e) => navigate('Blog', e)}>{t.footerJournal}</a>
          <a href={PAGE_TO_PATH.FAQ} onClick={(e) => navigate('FAQ', e)}>{t.nav[4]}</a>
        </div>
        <div>
          <div className="bm-eyebrow">{t.footerContact}</div>
          <a href="mailto:Blessme.team@gmail.com">Blessme.team@gmail.com</a>
          <a href="tel:+66828965199">+66 (0) 82-896-5199</a>
          <a href="https://line.me/R/ti/p/@blessmethailand" target="_blank" rel="noopener noreferrer">LINE @blessmethailand</a>
        </div>
      </div>
      <div className="bm-footer-fine">© {new Date().getFullYear()} BlessMe (Thailand) Co., Ltd. · Bangkok</div>
    </footer>
  );
}
