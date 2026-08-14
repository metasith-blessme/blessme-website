import React from 'react';
import { T } from '../constants/translations';
import { buildPath } from '../lib/routing';

export default function Footer({ setPage, lang }) {
  const t = T[lang];
  const blessing = (t.footerBlessing || 'Crafting sensory wonder for modern menus.\nBangkok, Thailand.').split('\n');
  const navigate = (page, e) => {
    if (e.button || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setPage(page);
  };

  return (
    <footer className="w-full bg-[#F3ECE1] border-t border-[#2B241E]/10 mt-28 pt-16 pb-12 px-6 lg:px-12">
      <div className="max-w-[1360px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-[#2B241E]/10 gap-8">
          <div className="flex items-center gap-3">
            <img src="/assets/logo-full.png" alt="BlessMe Thailand" className="h-16 w-auto object-contain" />
          </div>
          <p className="font-['Fraunces'] text-xl sm:text-2xl text-[#3B6146] italic md:text-right leading-snug">
            {blessing[0]}<br/>{blessing[1]}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 border-b border-[#2B241E]/10 text-sm">
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold tracking-[0.16em] uppercase text-[#3B6146] mb-1">{t.footerCatalogue}</div>
            <a href={buildPath({ page: 'Products', lang })} onClick={(e) => navigate('Products', e)} className="text-[#5C5248] hover:text-[#2B241E] transition-colors">{t.nav[0]}</a>
            <a href={buildPath({ page: 'Wholesale', lang })} onClick={(e) => navigate('Wholesale', e)} className="text-[#5C5248] hover:text-[#2B241E] transition-colors">{lang === 'th' ? 'ขายส่งไข่มุกป๊อป' : 'Popping Boba Wholesale'}</a>
            <a href={buildPath({ page: 'Solutions', lang })} onClick={(e) => navigate('Solutions', e)} className="text-[#5C5248] hover:text-[#2B241E] transition-colors">{t.nav[1]}</a>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold tracking-[0.16em] uppercase text-[#3B6146] mb-1">{t.footerCompany}</div>
            <a href={buildPath({ page: 'About us', lang })} onClick={(e) => navigate('About us', e)} className="text-[#5C5248] hover:text-[#2B241E] transition-colors">{t.nav[2]}</a>
            <a href={buildPath({ page: 'Blog', lang })} onClick={(e) => navigate('Blog', e)} className="text-[#5C5248] hover:text-[#2B241E] transition-colors">{t.footerJournal}</a>
            <a href={buildPath({ page: 'FAQ', lang })} onClick={(e) => navigate('FAQ', e)} className="text-[#5C5248] hover:text-[#2B241E] transition-colors">{t.nav[4]}</a>
          </div>

          <div className="flex flex-col gap-3 col-span-2 md:col-span-2">
            <div className="text-xs font-bold tracking-[0.16em] uppercase text-[#3B6146] mb-1">{t.footerContact}</div>
            <a href="mailto:Blessme.team@gmail.com" className="text-[#5C5248] hover:text-[#2B241E] transition-colors">Blessme.team@gmail.com</a>
            <a href="tel:+66828965199" className="text-[#5C5248] hover:text-[#2B241E] transition-colors">+66 (0) 82-896-5199 (คุณจ้า)</a>
            <a href="https://line.me/R/ti/p/@blessmethailand" target="_blank" rel="noopener noreferrer" className="text-[#06c755] font-semibold hover:underline">LINE Official: @blessmethailand</a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6E63] gap-4">
          <div>© {new Date().getFullYear()} BlessMe (Thailand) Co., Ltd. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Bangkok, Thailand</span>
            <span>·</span>
            <span>Specialty Food Wholesale</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
