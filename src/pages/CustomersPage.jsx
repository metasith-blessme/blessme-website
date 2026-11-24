import React from 'react';
import { CUSTOMERS } from '../constants/customers';
import { HOME } from '../constants/home';
import { LINE_URL } from '../constants/nav';
import { SHOPEE_URL } from '../lib/analytics';
import { pageCrumbs } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';

const COPY = {
  th: {
    eyebrow: 'ลูกค้า',
    h1: 'ลูกค้าของเรา',
    lead: 'ร้านที่เอาท็อปปิ้งของเราไปใช้และขายต่อ ร้านคุณใช้อยู่แล้วอยากมาอยู่ตรงนี้ ส่งรูปเมนูมาทาง LINE @blessmethailand ได้เลย เราจะลงให้เมื่อร้านโอเค',
    shopee: 'ดูรีวิวที่ Shopee',
    line: 'ส่งรูปเมนูทาง LINE',
    map: 'ดูแผนที่',
    facebook: 'Facebook',
    website: 'เว็บไซต์',
    shop: 'ร้านออนไลน์',
  },
  en: {
    eyebrow: 'Shops',
    h1: 'Our customers',
    lead: 'Cafés can send a photo of the menu on LINE @blessmethailand. A shop is shown here after they allow it.',
    shopee: 'See the Shopee reviews',
    line: 'Send a menu photo on LINE',
    map: 'View map',
    facebook: 'Facebook',
    website: 'Website',
    shop: 'Online shop',
  },
};

function shopName(shop, lang) {
  return lang === 'th' ? shop.nameTh : shop.nameEn;
}

export default function CustomersPage({ lang }) {
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
            const name = shopName(shop, lang);
            const province = lang === 'th' ? shop.provinceTh : shop.provinceEn;
            return (
              <li key={shop.id}>
                <picture>
                  <source srcSet={shop.logo} type="image/webp" />
                  <img
                    src={shop.logoFallback}
                    alt={name}
                    width={shop.logoWidth}
                    height={shop.logoHeight}
                    loading="lazy"
                  />
                </picture>
                <strong>{name}</strong>
                <span>{province}</span>
                <span className="bm-customer-address">{shop.address}</span>
                <div className="bm-customer-links">
                  <a href={shop.mapsUrl} target="_blank" rel="noopener noreferrer">{copy.map}</a>
                  {shop.links.map((link) => (
                    <a key={link.kind} href={link.href} target="_blank" rel="noopener noreferrer">{copy[link.kind]}</a>
                  ))}
                </div>
                <iframe
                  className="bm-customer-map"
                  loading="lazy"
                  title={lang === 'th' ? `แผนที่ ${shop.nameTh}` : `Map of ${shop.nameEn}`}
                  src={`https://maps.google.com/maps?q=${shop.lat},${shop.lng}&z=15&output=embed`}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
