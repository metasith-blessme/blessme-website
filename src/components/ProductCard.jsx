import { useState } from 'react';
export default function ProductCard({ product, blessed, onClick, lang }) {
  const t = T[lang];
  const displayName = lang === 'th' ? product.nameTh : product.name;
  const displayNote = lang === 'th' ? product.noteTh : product.note;
  return (
    <article className="bm-recipe" onClick={onClick} role="button" tabIndex={0}
      aria-label={`View details for ${displayName} popping boba`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}>
      <div className="bm-recipe-img">
        {blessed && <span className="bm-corner">SIGNATURE</span>}
        <picture>
          <source srcSet={product.img} type="image/webp" />
          <img src={product.imgFallback} alt={`${displayName} popping boba`} loading="lazy" width="400" height="260" />
        </picture>
      </div>
      <div className="bm-recipe-body">
        <div className="bm-meta">{product.tag.toUpperCase()}</div>
        <h3 className="bm-recipe-title">{displayName}</h3>
        <p className="bm-product-flavor">{product.flavor}</p>
        <p className="bm-product-note">{displayNote}</p>
        <div className="bm-card-cta" aria-hidden="true">{t.viewDetails}</div>
      </div>
    </article>
  );
}
