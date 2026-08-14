import React from 'react';
import { T } from '../constants/translations';
import { ContactForm, ContactItem } from '../components/ContactForm';

export default function AboutPage({ lang }) {
  const t = T[lang];
  return (
    <section className="bm-content-page max-w-[1360px] mx-auto px-6 py-16 lg:px-12">
      <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#3B6146] mb-3">
        <span className="w-5 h-px bg-[#3B6146]"></span>
        <span>{t.aboutEyebrow}</span>
      </div>
      <h1 className="bm-h1 text-4xl sm:text-5xl md:text-6xl font-semibold font-['Fraunces'] text-[#2B241E] max-w-[22ch]">{t.aboutTitle}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12 mb-20">
        <div className="lg:col-span-7">
          <p className="bm-lead text-xl md:text-2xl text-[#2B241E] font-medium leading-relaxed">{t.aboutLead}</p>
          <p className="bm-body text-base md:text-lg text-[#5C5248] leading-relaxed mt-6">{t.aboutBody1}</p>
          <p className="bm-body text-base md:text-lg text-[#5C5248] leading-relaxed mt-4">{t.aboutBody2}</p>
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="bg-[#2E4F38] text-white p-7 rounded-[24px] shadow-sm flex flex-col justify-between h-[160px]">
            <div className="font-['Fraunces'] text-4xl font-bold">12M</div>
            <div className="text-xs font-semibold tracking-wider uppercase text-white/80">{lang==='th'?'อายุสินค้า 12 เดือน (ไม่ต้องแช่เย็น)':'12-Month Shelf Life (Ambient)'}</div>
          </div>
          <div className="bg-white border border-[#2B241E]/8 p-7 rounded-[24px] shadow-sm flex flex-col justify-between h-[160px]">
            <div className="font-['Fraunces'] text-4xl font-bold text-[#3B6146]">6</div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#7A6E63]">{lang==='th'?'รสชาติคัดสรร':'Signature Flavors'}</div>
          </div>
          <div className="bg-white border border-[#2B241E]/8 p-7 rounded-[24px] shadow-sm flex flex-col justify-between h-[160px]">
            <div className="font-['Fraunces'] text-4xl font-bold text-[#3B6146]">100%</div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#7A6E63]">{lang==='th'?'สต็อกในกรุงเทพฯ':'Bangkok Stock'}</div>
          </div>
          <div className="bg-[#F8F4EA] border border-[#C5A869]/30 p-7 rounded-[24px] shadow-sm flex flex-col justify-between h-[160px]">
            <div className="font-['Fraunces'] text-4xl font-bold text-[#8C6A2E]">B2B</div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#8C6A2E]">{lang==='th'?'ค้าส่งคาเฟ่ & ขนมหวาน':'Wholesale Specialist'}</div>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] bg-[#1E3324] p-8 md:p-14 text-white shadow-[0_24px_60px_rgba(43,36,30,0.18)]">
        <div className="bm-contact-head mb-10">
          <div className="text-xs font-bold tracking-[0.18em] uppercase text-[#C5A869] mb-2">{t.contactEyebrow}</div>
          <h2 className="font-['Fraunces'] text-3xl md:text-5xl font-semibold text-white">{t.contactTitle}</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 border-t border-white/10 pt-8">
          <ContactItem k="EMAIL"      v="Blessme.team@gmail.com" href="mailto:Blessme.team@gmail.com" />
          <ContactItem k="PHONE"      v="+66 (0) 82-896-5199" sub="คุณจ้า" href="tel:+66828965199" />
          <ContactItem k="LINE"       v="@blessmethailand" href="https://line.me/R/ti/p/@blessmethailand" />
          <ContactItem k="INSTAGRAM"  v="blessme_thailand" href="https://instagram.com/blessme_thailand" />
          <ContactItem k="FACEBOOK"   v="@BlessMe Thailand" href="https://facebook.com/BlessMeThailand" />
          <ContactItem k="WAREHOUSE"  v="Bangkok, Thailand" />
        </div>

        {/* ===== CONTACT FORM (Web3Forms) ===== */}
        <div className="border-t border-white/10 pt-10">
          <ContactForm lang={lang} t={t} />
        </div>
      </div>
    </section>
  );
}
