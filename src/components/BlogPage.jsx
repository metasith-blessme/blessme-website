import { useState } from 'react';
export default function BlogPage({ onOpenArticle }) {
  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);
  return (
    <section className="bm-content-page">
      <div className="bm-eyebrow">JOURNAL</div>
      <h1 className="bm-h1">Notes from our team.</h1>
      <p className="bm-lead" style={{ maxWidth: '60ch', marginTop: 18 }}>
        Insights for partners and customers — on the category, our process, and the products we bring to market.
      </p>
      <article className="bm-feature-article" onClick={() => onOpenArticle(featured.id)}>
        <div className="bm-feature-cover" style={{ background: featured.cover }}>
          <span className="bm-blog-cat">{featured.cat}</span>
        </div>
        <div className="bm-feature-body">
          <div className="bm-meta">FEATURED · {featured.date.toUpperCase()} · {featured.read.toUpperCase()}</div>
          <h2 className="bm-feature-title">{featured.title}</h2>
          <p className="bm-feature-excerpt">{featured.excerpt}</p>
          <div className="bm-card-cta">Read article →</div>
        </div>
      </article>
      <div className="bm-blog-grid">
        {rest.map((a) => (
          <article key={a.id} className="bm-blog-card" onClick={() => onOpenArticle(a.id)}>
            <div className="bm-blog-img" style={{ background: a.cover }}>
              <span className="bm-blog-cat">{a.cat}</span>
            </div>
            <div className="bm-blog-body">
              <div className="bm-meta">{a.date.toUpperCase()} · {a.read.toUpperCase()}</div>
              <h3 className="bm-blog-title">{a.title}</h3>
              <p className="bm-blog-excerpt">{a.excerpt}</p>
              <div className="bm-card-cta">Read article →</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
