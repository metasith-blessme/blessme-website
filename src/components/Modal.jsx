import React, { useState, useEffect, useRef } from 'react';
import { T } from '../constants/translations';
import { productSearchName } from '../constants/products';
import { ARTICLES } from '../content/blog';
import { buildPath, handleLinkClick } from '../lib/routing';

export default function ProductDetail({ product, onClose, lang }) {
  const [qty, setQty] = useState(12);
  const titleRef = useRef(null);
  const t = T[lang];
  const displayNote = lang === 'th' ? product.noteTh : product.note;
  const displayFlavor = lang === 'th' && product.flavorTh ? product.flavorTh : product.flavor;
  const displayTag = lang === 'th' ? 'รสชาติซิกเนเจอร์' : product.tag;
  const articles = ARTICLES.filter(article => product.articleIds?.includes(article.id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    titleRef.current?.focus({ preventScroll: true });
  }, [product.id, lang]);

  if (!product) return null;

  const quoteSubject = encodeURIComponent(`Wholesale Quote Request — ${product.name} (x${qty} tubs)`);
  const quoteBody = encodeURIComponent(
    `Hello BlessMe Team,\n\nI would like to request a wholesale quote for:\n\nProduct: ${product.name}\nQuantity: ${qty} tubs\n\nPlease let me know pricing and minimum order details.\n\nThank you.`
  );
  const quoteHref = `mailto:Blessme.team@gmail.com?subject=${quoteSubject}&body=${quoteBody}`;
  const lineHref = `https://line.me/R/ti/p/@blessmethailand`;

  return (
    <section className="bm-product-page" aria-labelledby="product-title">
      <a className="bm-back-link" href={buildPath({ page: 'Products', lang })} onClick={(e) => handleLinkClick(e, onClose)}>
        {lang === 'th' ? '← สินค้าทั้งหมด' : '← All products'}
      </a>
      <div className="bm-modal">
        <div className="bm-modal-img">
          <picture>
            <source srcSet={product.img} type="image/webp" />
            <img src={product.imgFallback} alt={productSearchName(product, lang)} width="600" height="400" style={{aspectRatio:'3/2'}} />
          </picture>
        </div>
        <div className="bm-modal-body">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-[#E9EFE4] text-[#3B6146] text-[11px] font-bold tracking-wider uppercase">
              {displayTag}
            </span>
            <span className="text-xs font-semibold text-[#8C6A2E] bg-[#F8F4EA] px-2.5 py-0.5 rounded-full border border-[#C5A869]/30">
              ฿{product.price || 90} / pack
            </span>
          </div>

          <h1 className="bm-h1" id="product-title" ref={titleRef} tabIndex={-1} style={{ marginTop: 0 }}>{productSearchName(product, lang)}</h1>
          <p className="bm-product-flavor" style={{ marginTop: 4, fontStyle: 'italic', color: '#7A6E63' }}>{displayFlavor}</p>
          <p className="bm-body" style={{ marginTop: 14 }}>{displayNote}</p>
          <a className="inline-block mt-4 text-[#3B6146] underline" href={buildPath({ page: 'Wholesale', lang })}>
            {lang === 'th' ? 'เปรียบเทียบสินค้าและราคาขายส่ง' : 'Compare products & wholesale pricing'}
          </a>
          
          {product.pairings && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#7A6E63', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {lang === 'th' ? 'เมนูแนะนำสำหรับร้าน:' : 'Recommended Menu Pairings:'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {(lang === 'th' ? (product.pairingsTh || product.pairings) : product.pairings).map((p, i) => (
                  <span key={i} style={{ fontSize: 12.5, fontWeight: 500, color: '#243E2C', background: '#E9EFE4', padding: '4px 10px', borderRadius: 6 }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bm-spec-grid" role="list" aria-label="Product specifications" style={{ marginTop: 20 }}>
            <div role="listitem"><div className="k">{t.modalPack}</div><div className="v">{product.packSize} ({lang === 'th' ? 'น้ำหนักเนื้อ' : 'drained'} {product.drainedWeight}; ~20 × 15g)</div></div>
            <div role="listitem"><div className="k">{t.modalShelf}</div><div className="v">{t.storageUnopened}</div></div>
            <div role="listitem"><div className="k">{t.modalStorage}</div><div className="v">{t.storageOpened}</div></div>
            <div role="listitem"><div className="k">{t.modalOrigin}</div><div className="v">{t.factoryOrigin}</div></div>
          </div>
          
          <section aria-labelledby="serving-guidance" style={{ marginTop: 20 }}>
            <h2 id="serving-guidance" className="text-lg font-semibold">{t.servingTitle}</h2>
            <p className="bm-body" style={{ marginTop: 8 }}>{t.syrupGuidance}</p>
            <p className="bm-body" style={{ marginTop: 8 }}>{t.childWarning}</p>
            {product.containsGluten && <p className="bm-body" style={{ marginTop: 8 }}><strong>{t.allergenWarning}</strong></p>}
          </section>

          {product.id === 'osmanthus' && (
            <section id="product-faq" aria-labelledby="product-faq-title" style={{ marginTop: 20 }}>
              <h2 id="product-faq-title" className="text-lg font-semibold">{lang === 'th' ? 'บุกหอมหมื่นลี้เป็นมุกป๊อปหรือไม่?' : 'Is Osmanthus Konjac popping boba?'}</h2>
              <p className="bm-body" style={{ marginTop: 8 }}>{lang === 'th' ? 'บุกหอมหมื่นลี้เป็นท็อปปิ้งบุก ไม่ใช่มุกป๊อป' : 'Osmanthus Konjac is a konjac topping, not popping boba.'}</p>
            </section>
          )}

          {articles.length > 0 && (
            <section id="related-articles" aria-labelledby="related-articles-title" style={{ marginTop: 20 }}>
              <h2 id="related-articles-title" className="text-lg font-semibold">{lang === 'th' ? 'บทความที่เกี่ยวข้อง' : 'Related reading'}</h2>
              <ul className="bm-article-list">
                {articles.map(article => (
                  <li key={article.id}><a className="bm-inline-link" href={buildPath({ page: 'Blog', articleId: article.id, lang })}>{lang === 'th' ? article.titleTh : article.title}</a></li>
                ))}
              </ul>
            </section>
          )}

          <div className="bm-buy-row" style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F5EFE6] text-xs text-[#5C5248]">
              <span>{lang === 'th' ? 'จำนวนที่เลือก:' : 'Selected Quantity:'} <strong>{qty} {lang === 'th' ? 'แพ็ค' : 'packs'} (฿{(product.price || 90) * qty})</strong></span>
              <span>{lang === 'th' ? 'ประมาณ' : 'Estimated:'} <strong>~{qty * 20} {lang === 'th' ? 'แก้ว' : 'servings'}</strong></span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <div className="bm-stepper" role="group" aria-label="Order quantity" style={{ borderRadius: 999 }}>
                <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span aria-live="polite" aria-atomic="true" style={{ fontWeight: 600 }}>{qty}</span>
                <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <a data-contact-intent="quote" className="bm-btn bm-btn--primary" style={{ flex: 1, justifyContent: 'center', textAlign: 'center', borderRadius: 999 }} href={quoteHref}>
                {t.modalCta} ({qty} {lang === 'th' ? 'แพ็ค' : 'packs'})
              </a>
            </div>
            
            <a 
              href={lineHref} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bm-btn bm-btn--ghost" 
              style={{ justifyContent: 'center', borderColor: '#06c755', color: '#06c755', borderRadius: 999, background: 'rgba(6,199,85,0.06)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6 }}>
                <path d="M12 2C6.48 2 2 5.92 2 10.75c0 3.32 2.15 6.22 5.38 7.68-.24.88-.86 3.19-.99 3.69 0 0-.05.21.11.31.16.1.33.02.33.02.44-.06 5.1-3.34 5.86-3.88.44.06.87.09 1.31.09 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
              </svg>
              {lang === 'th' ? 'สั่งซื้อ & สอบถามทาง LINE ทันที' : 'Order & Inquire via LINE'}
            </a>
          </div>

          <p className="bm-small" style={{ marginTop: 10, textAlign: 'center' }}>{t.modalSmall}</p>
        </div>
      </div>
    </section>
  );
}
