import React, { useState } from 'react';

export function ContactItem({ k, v, sub, href }) {
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

export function ContactForm({ lang, t }) {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const W3F_ACCESS_KEY = '6a29a76e-ace2-44da-8bc4-22c10901684e'; // get free key at web3forms.com

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.target);
    data.append('access_key', W3F_ACCESS_KEY);
    data.append('subject', `BlessMe Wholesale Enquiry — ${data.get('business') || data.get('name')}`);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, signal: controller.signal });
      clearTimeout(timeout);
      const json = await res.json();
      setStatus(json.success ? 'success' : 'error');
    } catch (err) {
      clearTimeout(timeout);
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
    <form className="bm-form" onSubmit={handleSubmit}>
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
          <input id="f-qty" name="qty" type="text" placeholder={isTh ? 'เช่น 10 ห่อ/เดือน' : 'e.g. 10 packs/month'} />
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
