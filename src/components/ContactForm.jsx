import React, { useEffect, useRef, useState } from 'react';
import { trackLead } from '../lib/analytics';

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
  const [emailFallback, setEmailFallback] = useState('');
  const W3F_ACCESS_KEY = '6a29a76e-ace2-44da-8bc4-22c10901684e'; // get free key at web3forms.com

  const request = useRef(null);
  const completed = useRef(false);
  useEffect(() => () => {
    if (request.current) {
      clearTimeout(request.current.timeout);
      request.current.controller.abort();
      request.current = null;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (request.current || completed.current) return;
    const controller = new AbortController();
    const pending = { controller, timeout: setTimeout(() => controller.abort(), 10000) };
    request.current = pending;
    setStatus('sending');
    try {
      const data = new FormData(e.currentTarget);
      const subject = `BlessMe Wholesale Enquiry — ${data.get('business') || data.get('name')}`;
      const body = [['Name', 'name'], ['Business', 'business'], ['Email', 'email'], ['Phone', 'phone'],
        ['Product', 'product'], ['Quantity', 'qty'], ['Message', 'message']]
        .map(([label, field]) => `${label}: ${data.get(field) || ''}`).join('\n');
      setEmailFallback(`mailto:Blessme.team@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      data.append('access_key', W3F_ACCESS_KEY);
      data.append('subject', subject);
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, signal: controller.signal });
      const json = await res.json();
      if (request.current !== pending) return;
      if (!res.ok || json?.success !== true) throw new Error('Submission not confirmed');
      completed.current = true;
      setStatus('success');
      try { trackLead(lang); } catch { /* Tracking must not change submission status. */ }
    } catch {
      if (request.current === pending) setStatus('error');
    } finally {
      clearTimeout(pending.timeout);
      if (request.current === pending) request.current = null;
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
      <div className="flex flex-wrap items-center gap-4 mt-2">
        <button 
          type="submit" 
          className="px-8 py-4 bg-[#3B6146] text-white font-semibold text-sm rounded-full transition-all hover:bg-[#243E2C] shadow-[0_6px_20px_rgba(59,97,70,0.3)] disabled:opacity-60 cursor-pointer" 
          disabled={status==='sending'}
        >
          {status === 'sending' ? t.formSending : t.formCta}
        </button>

        <a 
          href="https://line.me/R/ti/p/@blessmethailand" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-4 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#06c755">
            <path d="M12 2C6.48 2 2 5.92 2 10.75c0 3.32 2.15 6.22 5.38 7.68-.24.88-.86 3.19-.99 3.69 0 0-.05.21.11.31.16.1.33.02.33.02.44-.06 5.1-3.34 5.86-3.88.44.06.87.09 1.31.09 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
          </svg>
          <span>{lang === 'th' ? 'สอบถามผ่าน LINE ทันที' : 'Chat on LINE directly'}</span>
        </a>
      </div>
      {status === 'error' && (
        <p role="alert" style={{ color: '#f2768a', fontSize: 14, marginTop: 12 }}>
          {isTh ? 'เกิดข้อผิดพลาด กรุณาลองใหม่หรือส่ง LINE โดยตรง หรือเปิดอีเมลด้านล่างแล้วกดส่งด้วยตนเอง' : 'Something went wrong. Please try again or contact us on LINE, or open the email below and send it yourself.'}
          {' '}
          <a href={emailFallback || 'mailto:Blessme.team@gmail.com'} className="underline">
            {isTh ? 'เปิดอีเมลถึง Blessme.team@gmail.com' : 'Open email to Blessme.team@gmail.com'}
          </a>
        </p>
      )}
    </form>
  );
}
