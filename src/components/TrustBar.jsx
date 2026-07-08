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
    <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-20 lg:px-16" ref={barRef}>
      <div className="flex flex-col md:flex-row items-center justify-between border-t border-b border-[#0F172A]/10 py-12">
        {items.map((i, index) => (
          <React.Fragment key={i.l}>
            <div className="flex flex-col items-center justify-center text-center flex-1">
              <div className="n text-5xl md:text-[56px] font-['Playfair_Display'] font-bold tracking-tight mb-2 bg-gradient-to-r from-[#FFD194] via-[#F6B3CD] to-[#70C1B3] inline-block text-transparent bg-clip-text drop-shadow-sm">
                {hasAnimated ? i.n : i.n.replace(/\d+/, '0')}
              </div>
              <div className="text-sm font-bold tracking-[0.15em] uppercase text-[#0F172A]">{i.l}</div>
            </div>
            {index < items.length - 1 && (
              <div className="hidden md:block w-px h-16 bg-[#0F172A]/10 mx-4"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
