import React from 'react';
import { motion } from 'framer-motion';
import { T } from '../constants/translations';

const ProductCard = React.memo(function ProductCard({ product, blessed, onClick, lang, index }) {
  const t = T[lang];
  const displayName = lang === 'th' ? product.nameTh : product.name;
  const displayNote = lang === 'th' ? product.noteTh : product.note;

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group cursor-pointer bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full"
      onClick={onClick} role="button" tabIndex={0}
      aria-label={`View details for ${displayName} popping boba`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <div className="relative w-full aspect-[4/3] mb-5 bg-[#F1EADF] rounded-[16px] overflow-hidden flex items-center justify-center">
        <picture className="w-full h-full p-6 flex items-center justify-center">
          <source srcSet={product.img} type="image/webp" />
          <img src={product.imgFallback} alt={`${displayName} popping boba`} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-lg" />
        </picture>
      </div>

      <div className="flex flex-col flex-grow px-1">
        <div className="inline-flex">
          <span className="bg-[#E9EFE4] text-[#3B6146] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3">
            {product.tag}
          </span>
        </div>
        
        <h3 className="text-[28px] font-bold text-[#2B241E] mb-1">{displayName}</h3>
        
        <p className="text-[15px] font-medium text-[#5B5048] mb-2 leading-snug">
          {displayNote}
        </p>

        <div className="text-[13px] font-bold tracking-widest uppercase text-[#3B6146] mt-auto inline-flex items-center gap-1.5 pt-4 group-hover:gap-2.5 transition-all">
          {t.viewDetails}
          <div className="w-5 h-5 rounded-full bg-[#4E7C59] text-white flex items-center justify-center ml-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

export default ProductCard;
