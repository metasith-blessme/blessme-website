import React from 'react';
import { T } from '../constants/translations';
import { ContactForm, ContactItem } from '../components/ContactForm';
import { pageCrumbs } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { SOCIAL_LINKS } from '../constants/social';

const socialHref = (id) => SOCIAL_LINKS.find((link) => link.id === id).href;

// Owner-confirmed storefronts (Nov 2026).
const STORES = [
  { th: 'Blessme', en: 'Blessme', placeTh: 'จุฬาฯ ซอย 14 ต้นซอย', placeEn: 'Chula Soi 14, front of the soi', href: 'https://maps.app.goo.gl/EZ8pK9AqpmCUnxTY6' },
  { th: 'ส้มใส่ใจ', en: 'Som Sai Jai', placeTh: 'จุฬาฯ ซอย 14 กลางซอย', placeEn: 'Chula Soi 14, middle of the soi', href: 'https://maps.app.goo.gl/xWGgMgNxKPVQHccG9' },
  { th: 'Blessme & ส้มใส่ใจ', en: 'Blessme & Som Sai Jai', placeTh: 'ชั้น M แพลทินัม ป๊อป', placeEn: 'M Floor, Platinum Pop', href: 'https://maps.app.goo.gl/5Z1aqRtPFK77JPjJA' },
];

export default function AboutPage({ lang }) {
  const t = T[lang];
  return (
    <section className="bm-content-page max-w-[1360px] mx-auto px-6 py-16 lg:px-12">
      <Breadcrumbs items={pageCrumbs('About us', lang)} />
      <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#3B6146] mb-3">
        <span className="w-5 h-px bg-[#3B6146]"></span>
        <span>{t.aboutEyebrow}</span>
      </div>
      <h1 className="bm-h1 text-4xl sm:text-5xl md:text-6xl font-semibold font-['Fraunces'] text-[#2B241E] max-w-[36ch]">{t.aboutTitle}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12 mb-20">
        <div className="lg:col-span-7">
          <p className="bm-lead text-xl md:text-2xl text-[#2B241E] font-medium leading-relaxed">{t.aboutLead}</p>
          <p className="bm-body text-base md:text-lg text-[#5C5248] leading-relaxed mt-6">{t.aboutBody1}</p>
          <p className="bm-body text-base md:text-lg text-[#5C5248] leading-relaxed mt-4">{t.aboutBody2}</p>
          <h2 className="text-lg font-semibold text-[#2B241E] mt-8">{lang === 'th' ? 'แวะมาชิมที่ร้านเราได้' : 'Visit our own shops'}</h2>
          <ul className="mt-3 space-y-2">
            {STORES.map(store => (
              <li key={store.href} className="bm-body text-base text-[#5C5248]">
                <a className="text-[#3B6146] underline font-semibold" href={store.href} target="_blank" rel="noopener noreferrer">{lang === 'th' ? store.th : store.en}</a>
                {' · '}{lang === 'th' ? store.placeTh : store.placeEn}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="bg-[#2E4F38] text-white p-7 rounded-[24px] shadow-sm flex flex-col justify-between h-[160px]">
            <div className="font-['Fraunces'] text-4xl font-bold">{lang==='th'?'12':'12M'}</div>
            <div className="text-xs font-semibold tracking-wider uppercase text-white/80">{lang==='th'?'เดือน ไม่ต้องแช่เย็น (ก่อนเปิด)':'Unopened: 12 months from manufacture at room temperature'}</div>
          </div>
          <div className="bg-white border border-[#2B241E]/8 p-7 rounded-[24px] shadow-sm flex flex-col justify-between h-[160px]">
            <div className="font-['Fraunces'] text-4xl font-bold text-[#3B6146]">6</div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#7A6E63]">{lang==='th'?'รสให้เลือก':'Signature Flavors'}</div>
          </div>
          <div className="bg-white border border-[#2B241E]/8 p-7 rounded-[24px] shadow-sm flex flex-col justify-between h-[160px]">
            <div className="font-['Fraunces'] text-4xl font-bold text-[#3B6146]">100%</div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#7A6E63]">{lang==='th'?'ของพร้อมที่กรุงเทพฯ':'Bangkok Stock'}</div>
          </div>
          <div className="bg-[#F8F4EA] border border-[#C5A869]/30 p-7 rounded-[24px] shadow-sm flex flex-col justify-between h-[160px]">
            <div className="font-['Fraunces'] text-4xl font-bold text-[#8C6A2E]">B2B</div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#8C6A2E]">{lang==='th'?'ขายส่งให้ร้าน':'Wholesale Specialist'}</div>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] bg-[#1E3324] p-8 md:p-14 text-white shadow-[0_24px_60px_rgba(43,36,30,0.18)]">
        <div className="bm-contact-head mb-10">
          <div className="text-xs font-bold tracking-[0.18em] uppercase text-[#C5A869] mb-2">{t.contactEyebrow}</div>
          <h2 className="font-['Fraunces'] text-3xl md:text-5xl font-semibold text-white">{t.contactTitle}</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 border-t border-white/10 pt-8">
          <ContactItem k={lang==='th'?'อีเมล':'EMAIL'}      v="Blessme.team@gmail.com" href="mailto:Blessme.team@gmail.com" />
          <ContactItem k={lang==='th'?'โทร':'PHONE'}      v="+66 (0) 82-896-5199" sub="คุณจ้า" href="tel:+66828965199" />
          <ContactItem k="LINE"       v="@blessmethailand" href="https://line.me/R/ti/p/@blessmethailand" />
          <ContactItem k="INSTAGRAM"  v="blessme_thailand" href={socialHref('instagram')} />
          <ContactItem k="FACEBOOK"   v="BlessMe Thailand" href={socialHref('facebook')} />
          <ContactItem k="TIKTOK"     v="@blessme_thailand" href={socialHref('tiktok')} />
          <ContactItem k={lang==='th'?'คลังสินค้า':'WAREHOUSE'}  v={lang==='th'?'กรุงเทพฯ':'Bangkok, Thailand'} />
        </div>

        {/* ===== CONTACT FORM (Web3Forms) ===== */}
        <div className="border-t border-white/10 pt-10">
          <ContactForm lang={lang} t={t} />
        </div>
      </div>
    </section>
  );
}
