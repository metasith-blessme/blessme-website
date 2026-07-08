import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { T } from '../constants/translations';

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const ProductCard = React.memo(function ProductCard({ product, blessed, onClick, lang, index }) {
  const t = T[lang];
  const displayName = lang === 'th' ? product.nameTh : product.name;
  const displayNote = lang === 'th' ? product.noteTh : product.note;

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group cursor-pointer bg-white rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
      onClick={onClick} role="button" tabIndex={0}
      aria-label={`View details for ${displayName} popping boba`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative w-full aspect-[4/3] mb-8 bg-[#F8FAFC] rounded-2xl overflow-hidden flex items-center justify-center"
      >
        {blessed && (
          <div className="absolute top-4 right-4 z-20 bg-[#0F172A] text-[#EFFF00] text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg font-mono font-bold">
            Signature
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <picture className="w-full h-full p-4 flex items-center justify-center">
          <source srcSet={product.img} type="image/webp" />
          <img src={product.imgFallback} alt={`${displayName} popping boba`} loading="lazy" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out" />
        </picture>
      </div>

      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col">
        <div className="text-xs font-mono tracking-[0.2em] text-[#0F172A]/50 uppercase mb-3">{product.tag}</div>
        <h3 className="text-3xl font-['Playfair_Display'] font-bold text-[#0F172A] mb-2">{displayName}</h3>
        <p className="text-lg font-serif italic text-[#1E293B] mb-6">{lang === 'th' && product.flavorTh ? product.flavorTh : product.flavor}</p>
        
        {/* Reveal on hover */}
        <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mb-6 transition-all duration-300 overflow-hidden">
          <p className="text-sm text-[#0F172A]/70 leading-relaxed">{displayNote}</p>
        </div>

        <div className="text-sm font-mono tracking-widest uppercase text-[#0F172A] font-semibold mt-auto inline-flex items-center gap-2 group-hover:text-blue-600 transition-colors">
          {t.viewDetails}
          <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">→</span>
        </div>
      </div>
    </motion.article>
  );
});

export default ProductCard;
