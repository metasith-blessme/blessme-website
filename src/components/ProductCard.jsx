import React from 'react';
import { motion } from 'framer-motion';
import { T } from '../constants/translations';
import { productSearchName } from '../constants/products';
import { buildPath, handleLinkClick } from '../lib/routing';

const ProductCard = React.memo(function ProductCard({ product, blessed, onClick, lang, index }) {
  const t = T[lang];
  const displayName = lang === 'th' ? product.nameTh : product.name;
  const displayNote = lang === 'th' ? product.noteTh : product.note;
  const displayFlavor = lang === 'th' && product.flavorTh ? product.flavorTh : product.flavor;
  const displayTag = lang === 'th' ? 'รสชาติซิกเนเจอร์' : product.tag;

  return (
    <motion.a
      href={buildPath({ page: 'Products', productId: product.id, lang })}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group cursor-pointer bg-white rounded-[28px] p-6 sm:p-7 border border-[#2B241E]/8 shadow-[0_4px_24px_rgba(43,36,30,0.04)] hover:shadow-[0_20px_48px_rgba(59,97,70,0.12)] hover:border-[#3B6146]/35 transition-all duration-300 flex flex-col h-full relative"
      onClick={(e) => handleLinkClick(e, onClick)}
      aria-label={`${lang === 'th' ? 'ดูรายละเอียด' : 'View details for'} ${productSearchName(product, lang)}`}

    >
      {/* Image Container with Price Badge and Gold Seal */}
      <div className="relative w-full aspect-[4/3] mb-6 bg-[#F5EFE6] rounded-[20px] overflow-hidden flex items-center justify-center border border-[#2B241E]/4">
        
        {/* Gold Seal Icon */}
        <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur border border-[#C5A869]/30 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#C5A869]"></span>
          <span className="text-[11px] font-bold text-[#8C6A2E] tracking-wider uppercase">{displayTag}</span>
        </div>

        {/* Wholesale Price Tag */}
        <div className="absolute top-3.5 right-3.5 z-10 px-3 py-1 rounded-full bg-[#2E4F38] text-white shadow-sm flex flex-col items-center leading-none">
          <span className="text-[12px] font-bold tracking-tight">฿{product.price || 90}</span>
          <span className="text-[9px] opacity-80 mt-0.5">{lang === 'th' ? 'ราคาส่ง/แพ็ค' : 'per pack'}</span>
        </div>

        {/* Product Photo */}
        <picture className="w-full h-full p-6 flex items-center justify-center">
          <source srcSet={product.img} type="image/webp" />
          <img 
            src={product.imgFallback} 
            alt={productSearchName(product, lang)}
            loading="lazy" 
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-md" 
          />
        </picture>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow">
        
        <div className="flex items-baseline justify-between mb-1.5">
          <h3 className="text-[28px] font-semibold text-[#2B241E] font-['Fraunces'] tracking-tight group-hover:text-[#3B6146] transition-colors">
            {displayName}
          </h3>
          <span className="text-xs font-semibold text-[#3B6146] bg-[#E9EFE4] px-2.5 py-0.5 rounded-full">
            500g
          </span>
        </div>
        
        {/* Tasting Notes */}
        <div className="text-[13.5px] font-medium text-[#7A6E63] italic mb-3">
          {displayFlavor}
        </div>

        {/* Note */}
        <p className="text-[14.5px] font-normal text-[#5C5248] mb-4 leading-relaxed">
          {displayNote}
        </p>

        {/* Café Menu Application Badges */}
        {product.pairings && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(lang === 'th' ? (product.pairingsTh || product.pairings) : product.pairings).map((pairing, idx) => (
              <span 
                key={idx} 
                className="text-[11.5px] font-medium text-[#4A4036] bg-[#F4EDE2] hover:bg-[#EAE0D1] px-2.5 py-0.5 rounded-md border border-[#2B241E]/6 transition-colors"
              >
                {pairing}
              </span>
            ))}
          </div>
        )}

        {/* Card Footer with Unit Metric & CTA */}
        <div className="mt-auto pt-4 border-t border-[#2B241E]/6 flex items-center justify-between">
          <div className="text-xs text-[#7A6E63]">
            <span className="font-semibold text-[#2B241E]">~20</span> {lang === 'th' ? `ที่เสิร์ฟ (${((product.price || 90)/20).toFixed(1)}฿/แก้ว)` : `servings (${((product.price || 90)/20).toFixed(1)}฿/cup)`}
          </div>

          <div className="text-[13px] font-semibold tracking-wider uppercase text-[#3B6146] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
            <span>{t.viewDetails}</span>
            <div className="w-6 h-6 rounded-full bg-[#3B6146] text-white flex items-center justify-center group-hover:bg-[#243E2C] transition-colors shadow-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </motion.a>
  );
});

export default ProductCard;
