import React from 'react';
import { PRODUCTS, productSearchName } from '../constants/products';
import { buildPath, handleLinkClick } from '../lib/routing';

const COPY = {
  en: { region: 'Products' },
  th: { region: 'สินค้า' },
};

export default function HeroShowroom({ lang, onOpen }) {
  const copy = COPY[lang] || COPY.en;

  return (
    <section className="bm-showroom" aria-label={copy.region}>
      <ul id="home-showroom-track" className="bm-showroom-track">
        {PRODUCTS.map((product) => {
          const name = productSearchName(product, lang);
          const href = buildPath({ page: 'Products', productId: product.id, lang });
          const taste = lang === 'th' ? product.flavorTh : product.flavor;
          const price = lang === 'th' ? `${product.price} บาท / ${product.packSize}` : `${product.price} THB / ${product.packSize}`;
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
                    />
                  </picture>
                </span>
                <span className="bm-showroom-name">{name}</span>
                <span className="bm-showroom-taste">{taste}</span>
                <span className="bm-showroom-price">{price}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
