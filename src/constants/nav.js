export const LINE_URL = 'https://line.me/R/ti/p/@blessmethailand';
export const PHONE_HREF = 'tel:+66828965199';

export const HEADER_NAV = [
  { page: 'Catalogue', th: 'สินค้า', en: 'Products' },
  { page: 'Wholesale', th: 'ราคาส่ง & วิธีสั่ง', en: 'Wholesale & ordering' },
  { page: 'Blog', th: 'ไอเดียเมนู', en: 'Menu ideas' },
  { page: 'About us', th: 'เกี่ยวกับเรา', en: 'About' },
];

export const FOOTER_NAV = {
  catalogue: [
    { page: 'Catalogue', th: 'สินค้า', en: 'Products' },
    { page: 'Wholesale', th: 'ราคาส่ง & วิธีสั่ง', en: 'Wholesale & ordering' },
    { page: 'Solutions', th: 'วิธีทำงานกับเรา', en: 'How we work' },
  ],
  company: [
    { page: 'About us', th: 'เกี่ยวกับเรา', en: 'About' },
    { page: 'Blog', th: 'ไอเดียเมนู', en: 'Menu ideas' },
    { page: 'FAQ', th: 'คำถามที่พบบ่อย', en: 'FAQ' },
  ],
};

export const HEADER_CTA = {
  th: 'ทัก LINE สั่งของ',
  en: 'Order on LINE',
};

export function navLabel(item, lang) {
  return lang === 'th' ? item.th : item.en;
}
