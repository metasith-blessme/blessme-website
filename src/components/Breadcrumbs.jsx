import React from 'react';

export default function Breadcrumbs({ items }) {
  if (!items?.length) return null;
  return (
    <nav className="bm-breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const path = new URL(item.url).pathname;
          const last = index === items.length - 1;
          return (
            <li key={item.url}>
              {last ? <span aria-current="page">{item.name}</span> : <a href={path}>{item.name}</a>}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
