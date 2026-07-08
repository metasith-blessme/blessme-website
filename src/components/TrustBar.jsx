import React, { useState, useEffect, useRef } from 'react';
import { T } from '../constants/translations';

function parseAndAnimate(element, targetText) {
  const numMatch = targetText.match(/\d+/);
  if (!numMatch) return;
  const numStr = numMatch[0];
  const targetNum = parseInt(numStr, 10);
  let startTimestamp = null;
  const duration = 2000;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = progress * (2 - progress);
    const currentNum = Math.floor(easeProgress * targetNum);
    element.innerText = targetText.replace(numStr, currentNum);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.innerText = targetText;
    }
  };
  window.requestAnimationFrame(step);
}

export default function TrustBar({ lang }) {
  const items = T[lang].trustItems;
  const barRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const numberNodes = barRef.current.querySelectorAll('.n');
        numberNodes.forEach((node, i) => {
          parseAndAnimate(node, items[i].n);
        });
      }
    }, { threshold: 0.5 });
    
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, items]);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:px-12 border-t border-[#0F172A]/10" ref={barRef}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
        {items.map((i, index) => (
          <div key={i.l} className="flex flex-col gap-2">
            <div className={`n text-5xl md:text-6xl font-['Playfair_Display'] font-bold tracking-tight leading-none ${index === 0 || index === items.length - 1 ? 'animate-shimmer' : 'text-[#0F172A]'}`}>
              {hasAnimated ? i.n : i.n.replace(/\d+/, '0')}
            </div>
            <div className="text-sm font-mono tracking-widest uppercase text-[#0F172A]/60 font-semibold">{i.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
