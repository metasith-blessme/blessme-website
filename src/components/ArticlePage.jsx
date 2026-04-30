import { useState } from 'react';
export default function ArticlePage({ articleId, onBack, onOpenArticle }) {
  const a = ARTICLES.find(x => x.id === articleId) || ARTICLES[0];
  const others = ARTICLES.filter(x => x.id !== a.id).slice(0, 3);
  return (
    <article className="bm-article-page">
      <button className="bm-back-link" onClick={onBack}>← All articles</button>
      <header className="bm-article-head">
        <div className="bm-eyebrow">{a.cat.toUpperCase()}</div>
        <h1 className="bm-article-title">{a.title}</h1>
        <p className="bm-article-excerpt">{a.excerpt}</p>
        <div className="bm-article-meta">
          <span>{a.author}</span>
          <span className="dot">·</span>
          <span>{a.date}</span>
          <span className="dot">·</span>
          <span>{a.read}</span>
        </div>
      </header>
      <div className="bm-article-cover" style={{ background: a.cover }} />
      <div className="bm-article-body">
        {a.body.map(([tag, text], i) => {
          if (tag === 'h2') return <h2 key={i} className="bm-article-h2">{text}</h2>;
          return <p key={i} className="bm-article-p">{text}</p>;
        })}
      </div>
      <div className="bm-article-footer">
        <div className="bm-eyebrow">— END —</div>
        <p className="bm-article-signoff">
          Have a question about anything you read here? Reach out at <strong>Blessme.team@gmail.com</strong>.
        </p>
      </div>
      <section className="bm-related">
        <div className="bm-eyebrow">CONTINUE READING</div>
        <div className="bm-related-grid">
          {others.map(o => (
            <article key={o.id} className="bm-blog-card" onClick={() => onOpenArticle(o.id)}>
              <div className="bm-blog-img" style={{ background: o.cover }}>
                <span className="bm-blog-cat">{o.cat}</span>
              </div>
              <div className="bm-blog-body">
                <div className="bm-meta">{o.date.toUpperCase()} · {o.read.toUpperCase()}</div>
                <h3 className="bm-blog-title">{o.title}</h3>
                <div className="bm-card-cta">Read article →</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
