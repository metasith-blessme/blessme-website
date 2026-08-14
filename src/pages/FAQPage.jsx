import React, { useState } from 'react';
import { T } from '../constants/translations';
import { FAQS_EN, FAQS_TH } from '../constants/faq';

export default function FAQPage({ lang }) {
  const t = T[lang];
  const faqs = lang === 'th' ? FAQS_TH : FAQS_EN;
  const [open, setOpen] = useState(0);

  return (
    <section className="bm-content-page max-w-[1100px] mx-auto px-6 py-16 lg:px-12">
      <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#3B6146] mb-3">
        <span className="w-5 h-px bg-[#3B6146]"></span>
        <span>{t.faqEyebrow}</span>
      </div>
      <h1 className="bm-h1 text-4xl sm:text-5xl md:text-6xl font-semibold font-['Fraunces'] text-[#2B241E] mb-12">{t.faqTitle}</h1>
      
      <div className="flex flex-col gap-4" role="list">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          const answerId = `faq-answer-${i}`;
          return (
            <div 
              key={i} 
              className={`rounded-[20px] transition-all duration-200 border ${isOpen ? 'bg-white border-[#3B6146]/30 shadow-md' : 'bg-white/70 border-[#2B241E]/8 hover:bg-white hover:border-[#2B241E]/15'}`} 
              role="listitem"
            >
              <button
                className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className="font-['Fraunces'] text-lg sm:text-xl md:text-2xl font-semibold text-[#2B241E] pr-6">{f.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${isOpen ? 'bg-[#3B6146] text-white' : 'bg-[#F1EADF] text-[#2B241E]'}`}>
                  {isOpen ? '−' : '+'}
                </div>
              </button>
              {isOpen && (
                <div id={answerId} className="px-6 pb-6 sm:px-8 sm:pb-8 text-[#5C5248] text-base leading-relaxed border-t border-[#2B241E]/6 pt-4 font-normal">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
