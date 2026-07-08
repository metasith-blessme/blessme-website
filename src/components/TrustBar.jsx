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
    // ease out quad
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
    <div className="bm-trustbar" ref={barRef}>
      {items.map(i => (
        <div key={i.l} className="bm-trustbar-item">
          <div className="n">{hasAnimated ? i.n : i.n.replace(/\d+/, '0')}</div>
          <div className="l">{i.l}</div>
        </div>
      ))}
    </div>
  );
}
