import { useState } from 'react';
export default function FAQPage() {
  const faqs = [
    { q: 'What products does BlessMe supply?', a: 'BlessMe is a specialty food wholesaler bringing new categories to the Thai market. Our current range features six signature flavors, with new specialty product lines in development.' },
    { q: 'Are the products vegan?', a: 'Yes. All six flavors in our current range are vegan and vegetarian. We use seaweed-derived alginate, not gelatin.' },
    { q: 'What is the minimum wholesale order?', a: 'Minimum order quantities depend on the partner profile and shipping arrangement. Please contact our team — we tailor each agreement to the client.' },
    { q: 'Do you provide samples before purchase?', a: 'Yes. We send sample tubs to qualified wholesale prospects so your team can taste and evaluate before committing.' },
    { q: 'How long is the shelf life?', a: 'Twelve months unopened, stored cool and dry. Once opened, refrigerate and use within 14 days for best texture.' },
    { q: 'Do you ship outside Bangkok?', a: 'Yes. We ship nationwide across Thailand from our Bangkok warehouse, and we are open to international wholesale enquiries.' },
    { q: 'How is BlessMe different from other suppliers?', a: 'We curate. Every product we carry is researched, sourced from trusted factories, tested with our partners, and supported by marketing that builds end-consumer demand. We help our partners launch categories that do not yet exist in the Thai market.' },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="bm-content-page">
      <div className="bm-eyebrow">FREQUENTLY ASKED QUESTIONS</div>
      <h1 className="bm-h1">Questions, answered.</h1>
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
