import React, { useState } from 'react';
import { T } from '../constants/translations';
import { FAQS_EN, FAQS_TH } from '../constants/faq';

export default function FAQPage({ lang }) {
  const t = T[lang];
  const faqs = lang === 'th' ? FAQS_TH : FAQS_EN;
  const [open, setOpen] = useState(0);
  return (
    <section className="bm-content-page">
      <div className="bm-eyebrow">{t.faqEyebrow}</div>
      <h1 className="bm-h1">{t.faqTitle}</h1>
      <div className="bm-faq-list" role="list">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          const answerId = `faq-answer-${i}`;
          return (
            <div key={i} className={`bm-faq${isOpen ? ' is-open' : ''}`} role="listitem">
              <button
                className="bm-faq-q"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span>{f.q}</span>
                <span className="bm-faq-ico" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              <div id={answerId} className="bm-faq-a" role="region" aria-label={f.q}
                hidden={!isOpen} style={isOpen ? { display: 'block' } : { display: 'none' }}>
                {f.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
