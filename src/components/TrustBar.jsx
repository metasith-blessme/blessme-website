import { useState } from 'react';
import { T } from '../data/translations';
export default function TrustBar({ lang }) {
  const items = T[lang].trustItems;
  return (
    <div className="bm-trustbar">
      {items.map(i => (
        <div key={i.l} className="bm-trustbar-item">
          <div className="n">{i.n}</div>
          <div className="l">{i.l}</div>
        </div>
      ))}
    </div>
  );
}
