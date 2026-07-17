import React from 'react';
import { T } from '../constants/translations';
import { ContactForm, ContactItem } from '../components/ContactForm';

export default function AboutPage({ lang }) {
  const t = T[lang];
  return (
    <section className="bm-content-page">
      <div className="bm-eyebrow">{t.aboutEyebrow}</div>
      <h2 className="bm-h1">{t.aboutTitle}</h2>
      <div className="bm-two-col">
        <div>
          <p className="bm-lead">{t.aboutLead}</p>
          <p className="bm-body" style={{ marginTop: 20 }}>{t.aboutBody1}</p>
          <p className="bm-body" style={{ marginTop: 16 }}>{t.aboutBody2}</p>
        </div>
        <div className="bm-stat-stack">
          <div className="bm-stat bm-stat--sky"><div className="n">1<sup>st</sup></div><div className="l">{lang==='th'?'แรกในไทย':'In Thailand'}</div></div>
          <div className="bm-stat"><div className="n">6</div><div className="l">{lang==='th'?'รสชาติคัดสรร':'Curated flavors'}</div></div>
          <div className="bm-stat"><div className="n">100%</div><div className="l">{lang==='th'?'สต็อกในกรุงเทพฯ':'Stock in Bangkok'}</div></div>
          <div className="bm-stat bm-stat--lime"><div className="n">B2B</div><div className="l">{lang==='th'?'ค้าส่งเท่านั้น':'Wholesale focus'}</div></div>
        </div>
      </div>

      <div className="bm-contact-block">
        <div className="bm-contact-head">
          <div className="bm-eyebrow" style={{ color: 'var(--ci-sky)' }}>{t.contactEyebrow}</div>
          <h2 className="bm-h2-cta">{t.contactTitle}</h2>
        </div>
        <div className="bm-contact-grid">
          <ContactItem k="EMAIL"      v="Blessme.team@gmail.com" href="mailto:Blessme.team@gmail.com" />
          <ContactItem k="PHONE"      v="+66 (0) 82-896-5199" sub="คุณจ้า" href="tel:+66828965199" />
          <ContactItem k="LINE"       v="@blessmethailand" href="https://line.me/R/ti/p/@blessmethailand" />
          <ContactItem k="INSTAGRAM"  v="blessme_thailand" href="https://instagram.com/blessme_thailand" />
          <ContactItem k="FACEBOOK"   v="@BlessMe Thailand" href="https://facebook.com/BlessMeThailand" />
          <ContactItem k="WAREHOUSE"  v="Bangkok, Thailand" />
        </div>

        {/* ===== CONTACT FORM (Web3Forms) ===== */}
        <ContactForm lang={lang} t={t} />
      </div>
    </section>
  );
}
