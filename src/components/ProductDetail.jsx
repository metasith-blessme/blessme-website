import { useState, useEffect } from 'react';
export default function ProductDetail({ product, onClose, lang }) {
  const [qty, setQty] = useState(12);
  const t = T[lang];
  const displayName = lang === 'th' ? product.nameTh : product.name;
  const displayNote = lang === 'th' ? product.noteTh : product.note;

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product) return null;

  const quoteSubject = encodeURIComponent(`Wholesale Quote Request — ${product.name} (x${qty} tubs)`);
  const quoteBody = encodeURIComponent(
    `Hello BlessMe Team,\n\nI would like to request a wholesale quote for:\n\nProduct: ${product.name}\nQuantity: ${qty} tubs\n\nPlease let me know pricing and minimum order details.\n\nThank you.`
  );
  const quoteHref = `mailto:Blessme.team@gmail.com?subject=${quoteSubject}&body=${quoteBody}`;

  return (
    <div className="bm-modal-scrim" onClick={onClose} role="presentation">
      <div className="bm-modal" onClick={(e) => e.stopPropagation()}
        role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="bm-modal-close" onClick={onClose} aria-label="Close product details">×</button>
        <div className="bm-modal-img">
          <picture>
            <source srcSet={product.img} type="image/webp" />
            <img src={product.imgFallback} alt={`${displayName} popping boba`} />
          </picture>
        </div>
        <div className="bm-modal-body">
          <div className="bm-eyebrow">{product.tag.toUpperCase()}</div>
          <h2 className="bm-h1" id="modal-title">{displayName}</h2>
          <p className="bm-product-flavor" style={{ marginTop: 4 }}>{product.flavor}</p>
          <p className="bm-body" style={{ marginTop: 16 }}>{displayNote}</p>
          <div className="bm-spec-grid" role="list" aria-label="Product specifications">
            <div role="listitem"><div className="k">PACK</div><div className="v">500 g</div></div>
            <div role="listitem"><div className="k">SHELF LIFE</div><div className="v">12 months</div></div>
            <div role="listitem"><div className="k">STORAGE</div><div className="v">Room temp, dry</div></div>
            <div role="listitem"><div className="k">{t.modalOrigin}</div><div className="v">Asia · trusted factory</div></div>
          </div>
          <div className="bm-buy-row">
            <div className="bm-stepper" role="group" aria-label="Order quantity">
              <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span aria-live="polite" aria-atomic="true">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <a className="bm-btn bm-btn--primary" style={{ flex: 1, justifyContent: 'center' }} href={quoteHref}>
              {t.modalCta}
            </a>
          </div>
          <p className="bm-small" style={{ marginTop: 10 }}>{t.modalSmall}</p>
        </div>
      </div>
    </div>
  );
}
