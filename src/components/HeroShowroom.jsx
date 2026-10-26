import React, { useEffect, useRef, useState } from 'react';
import { PRODUCTS, productSearchName } from '../constants/products';
import { buildPath, handleLinkClick } from '../lib/routing';

// Grain popping boba that already has a product page and photo.
// Black sticky rice is not in the catalogue. Water chestnut is discontinued.
const GRAIN_SHOWROOM_IDS = ['barley', 'oat', 'redbean'];

const COPY = {
  en: {
    region: 'Grain popping boba',
    prev: 'Previous products',
    next: 'Next products',
  },
  th: {
    region: 'มุกป๊อปธัญพืช',
    prev: 'สินค้าก่อนหน้า',
    next: 'สินค้าถัดไป',
  },
};

export default function HeroShowroom({ lang, onOpen }) {
  const copy = COPY[lang] || COPY.en;
  const products = GRAIN_SHOWROOM_IDS
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter(Boolean);
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const prev = el.scrollLeft > 8;
      const next = max > 8 && el.scrollLeft < max - 8;
      setCanPrev((value) => (value === prev ? value : prev));
      setCanNext((value) => (value === next ? value : next));
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    observer?.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      observer?.disconnect();
    };
  }, [lang]);

  const scrollByCard = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.bm-showroom-card');
    const styles = window.getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap) || 14;
    const amount = (card?.getBoundingClientRect().width || el.clientWidth * 0.8) + gap;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * amount, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section className="bm-showroom" aria-label={copy.region}>
      <button
        type="button"
        className="bm-showroom-btn bm-showroom-btn--prev"
        aria-label={copy.prev}
        aria-controls="home-showroom-track"
        disabled={!canPrev}
        onClick={() => scrollByCard(-1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul id="home-showroom-track" className="bm-showroom-track" ref={trackRef}>
        {products.map((product) => {
          const name = productSearchName(product, lang);
          const href = buildPath({ page: 'Products', productId: product.id, lang });
          return (
            <li key={product.id} className="bm-showroom-card">
              <a
                className="bm-showroom-link"
                href={href}
                onClick={(event) => handleLinkClick(event, () => onOpen(product))}
              >
                <span className="bm-showroom-photo">
                  <picture>
                    <source srcSet={product.img} type="image/webp" />
                    <img
                      src={product.imgFallback}
                      alt={name}
                      width="1000"
                      height="1000"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                    />
                  </picture>
                </span>
                <span className="bm-showroom-name">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="bm-showroom-btn bm-showroom-btn--next"
        aria-label={copy.next}
        aria-controls="home-showroom-track"
        disabled={!canNext}
        onClick={() => scrollByCard(1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
