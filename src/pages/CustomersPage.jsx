import React from 'react';
import { CUSTOMERS } from '../constants/customers';
import { HOME } from '../constants/home';
import { LINE_URL } from '../constants/nav';
import { PRODUCTS, productSearchName } from '../constants/products';
import { SHOPEE_URL } from '../lib/analytics';
import { buildPath, handleLinkClick } from '../lib/routing';
import { pageCrumbs } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';

const COPY = {
  th: {
    eyebrow: 'ร้านค้า',
    h1: 'ลูกค้าของเรา',
    lead: 'ร้านที่ใส่ท็อปปิ้งในเมนู ส่งรูปเมนูมาที่ LINE @blessmethailand ได้ เราลงรูปเมื่อร้านอนุญาต',
    shopee: 'ดูรีวิวที่ Shopee',
    line: 'ส่งรูปเมนูทาง LINE',
  },
  en: {
    eyebrow: 'Shops',
    h1: 'Our customers',
    lead: 'Cafés can send a photo of the menu on LINE @blessmethailand. A shop is shown here after they allow it.',
    shopee: 'See the Shopee reviews',
    line: 'Send a menu photo on LINE',
  },
};

export default function CustomersPage({ lang, onOpen }) {
  const copy = COPY[lang] || COPY.en;
  const proof = (HOME[lang] || HOME.en).why.slice(0, 2);

  return (
    <section className="bm-content-page bm-customers max-w-[1100px] mx-auto px-6 py-16 lg:px-12">
      <Breadcrumbs items={pageCrumbs('Customers', lang)} />
      <p className="bm-home-eyebrow">{copy.eyebrow}</p>
      <h1 className="bm-home-h1">{copy.h1}</h1>
      <p className="bm-home-note">{copy.lead}</p>
      <ul className="bm-customer-proof">
        {proof.map(([title, detail]) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      <div className="bm-home-actions">
        <a className="bm-home-btn bm-home-btn--line" href={LINE_URL} target="_blank" rel="noopener noreferrer">{copy.line}</a>
        <a className="bm-home-textlink" href={SHOPEE_URL} target="_blank" rel="noopener noreferrer">{copy.shopee}</a>
      </div>
      {CUSTOMERS.length > 0 && (
        <ul className="bm-customer-grid">
          {CUSTOMERS.map((shop) => {
            const product = PRODUCTS.find((item) => item.id === shop.product);
            return (
              <li key={`${shop.shopName}-${shop.location}`}>
                {shop.photo ? <img src={shop.photo} alt={shop.shopName} /> : null}
                <strong>{shop.shopName}</strong>
                {shop.location ? <span>{shop.location}</span> : null}
                {shop.quote ? <q>{shop.quote}</q> : null}
                {product ? (
                  <a href={buildPath({ page: 'Products', productId: product.id, lang })} onClick={(event) => handleLinkClick(event, () => onOpen(product))}>
                    {productSearchName(product, lang)}
                  </a>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
