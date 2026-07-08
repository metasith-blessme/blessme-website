import React from 'react';
import { T } from '../constants/translations';
import { PRODUCTS } from '../constants/products';
import ProductCard from '../components/ProductCard';
import TrustBar from '../components/TrustBar';

export default function ProductsPage({ onOpen, setPage, lang }) {
  const t = T[lang];
  return (
    <>
      <section className="bm-hero bm-hero--sky" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="bm-blob bm-blob--primary"></div>
        <div className="bm-blob bm-blob--secondary"></div>
        <div className="bm-hero-content" style={{ zIndex: 1, position: 'relative' }}>
          <div className="bm-eyebrow">{t.heroEyebrow}</div>
          <h1 className="bm-hero-title">
            {t.heroTitle[0]}<span className="bm-highlight-sky">{t.heroTitle[1]}</span>{t.heroTitle[2]}
          </h1>
          <p className="bm-hero-sub">{t.heroSub}</p>
          <div className="bm-hero-actions">
            <button className="bm-btn bm-btn--primary" onClick={() => setPage('Solutions')}>{t.heroCta1}</button>
            <button className="bm-btn bm-btn--ghost" onClick={() => setPage('About us')}>{t.heroCta2}</button>
          </div>
          <div className="bm-hero-meta">
            <span className="bm-checks">✓ ✓ ✓</span>
            <span>{t.heroMeta}</span>
          </div>
        </div>
        <div className="bm-hero-deco">
          <div className="bm-hero-mark"><img src="/assets/logo-full.png" alt="BlessMe Thailand" width="360" height="360" /></div>
        </div>
      </section>

      <section className="bm-featured">
        <div className="bm-featured-head">
          <div>
            <div className="bm-eyebrow">{t.productRange}</div>
            <h2 className="bm-h1">{t.sixFlavors}</h2>
          </div>
          <p className="bm-lead-sub">{t.productSub}</p>
        </div>
        <div className="bm-recipe-grid bm-grid-staggered">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} blessed={i === 0} onClick={() => onOpen(p)} lang={lang} />
          ))}
        </div>
      </section>

      <TrustBar lang={lang} />
    </>
  );
}
