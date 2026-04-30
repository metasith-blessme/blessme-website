import { useState } from 'react';
import { T } from '../data/translations';
function ContactItem({ k, v, sub, href }) {
  return (
    <div className="bm-contact-item">
      <div className="bm-contact-k">{k}</div>
      {href
        ? <a className="bm-contact-v" href={href} target={href.startsWith('http')?'_blank':undefined}
            rel={href.startsWith('http')?'noopener noreferrer':undefined} style={{textDecoration:'none'}}>{v}</a>
        : <div className="bm-contact-v">{v}</div>
      }
      {sub && <div className="bm-contact-sub">{sub}</div>}
    </div>
  );
}

function ContactForm({ lang, t }) {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const W3F_ACCESS_KEY = '6a29a76e-ace2-44da-8bc4-22c10901684e';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.target);
    data.append('access_key', W3F_ACCESS_KEY);
    data.append('subject', `BlessMe Wholesale Enquiry — ${data.get('business') || data.get('name')}`);
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      setStatus(json.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bm-form-success">
        <span>✓</span>
        {t.formSuccess}
      </div>
    );
  }

  const isTh = lang === 'th';
  return (
    <form className="bm-form" onSubmit={handleSubmit} noValidate>
      <div className="bm-form-row">
        <div className="bm-field">
          <label htmlFor="f-name">{t.formName}</label>
          <input id="f-name" name="name" type="text" placeholder={t.formName} required />
        </div>
        <div className="bm-field">
          <label htmlFor="f-biz">{t.formBusiness}</label>
          <input id="f-biz" name="business" type="text" placeholder={t.formBusiness} required />
        </div>
      </div>
      <div className="bm-form-row">
        <div className="bm-field">
          <label htmlFor="f-email">{t.formEmail}</label>
          <input id="f-email" name="email" type="email" placeholder={t.formEmail} required />
        </div>
        <div className="bm-field">
          <label htmlFor="f-phone">{t.formPhone}</label>
          <input id="f-phone" name="phone" type="tel" placeholder={t.formPhone} />
        </div>
      </div>
      <div className="bm-form-row">
        <div className="bm-field">
          <label htmlFor="f-product">{t.formProduct}</label>
          <select id="f-product" name="product">
            {t.formProducts.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="bm-field">
          <label htmlFor="f-qty">{t.formQty}</label>
          <input id="f-qty" name="qty" type="text" placeholder={isTh ? 'เช่น 10 ถัง/เดือน' : 'e.g. 10 tubs/month'} />
        </div>
      </div>
      <div className="bm-field">
        <label htmlFor="f-msg">{t.formMsg}</label>
        <textarea id="f-msg" name="message" placeholder={t.formMsg} />
      </div>
      <button type="submit" className="bm-btn bm-btn--sky" disabled={status==='sending'}
        style={{ alignSelf: 'flex-start', opacity: status==='sending'?0.7:1 }}>
        {status === 'sending' ? t.formSending : t.formCta}
      </button>
      {status === 'error' && (
        <p style={{ color: '#f2768a', fontSize: 14, marginTop: 8 }}>
          {isTh ? 'เกิดข้อผิดพลาด กรุณาลองใหม่หรือส่ง LINE โดยตรง' : 'Something went wrong. Please try again or contact us on LINE.'}
        </p>
      )}
    </form>
  );
}

export default function AboutPage({ lang }) {
  const t = T[lang];
  return (
    <section className="bm-content-page">
      <div className="bm-eyebrow">{t.aboutEyebrow}</div>
      <h1 className="bm-h1">{t.aboutTitle}</h1>
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
          <ContactItem k="LINE"       v="@591dzhsr" href="https://line.me/R/ti/p/@591dzhsr" />
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
