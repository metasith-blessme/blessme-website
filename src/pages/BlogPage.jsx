import React, { useState, useMemo } from 'react';
import { T } from '../constants/translations';
import { ARTICLES, getBlogCategories } from '../content/blog';

export function BlogCard({ article, onOpenArticle, lang, compact = false }) {
  const title = lang === 'th' ? article.titleTh : article.title;
  const excerpt = lang === 'th' ? article.excerptTh : article.excerpt;
  const category = lang === 'th' ? article.catTh || article.cat : article.cat;
  const meta = `${(lang === 'th' ? article.dateTh : article.date).toUpperCase()} · ${(lang === 'th' ? article.readTh : article.read).toUpperCase()}`;
  const cta = lang === 'th' ? 'อ่านบทความ' : 'Read article';

  return (
    <article className={`bm-blog-card${compact ? ' bm-blog-card--compact' : ''}`}>
      <button
        type="button"
        className="bm-blog-card-hit"
        onClick={() => onOpenArticle(article.id)}
        aria-label={`${cta}: ${title}`}
      >
        <div className="bm-blog-img">
          {article.img ? (
            <img src={article.img} alt={title} loading="lazy" />
          ) : (
            <div className="bm-blog-fill" style={{ background: article.cover }} />
          )}
          <span className="bm-blog-cat">{category}</span>
        </div>
        <div className="bm-blog-body">
          <div className="bm-meta">{meta}</div>
          <h3 className="bm-blog-title">{title}</h3>
          {!compact && <p className="bm-blog-excerpt">{excerpt}</p>}
          <div className="bm-card-cta">{cta} →</div>
        </div>
      </button>
    </article>
  );
}

export default function BlogPage({ onOpenArticle, lang }) {
  const t = T[lang];
  const labels = lang === 'th'
    ? {
        allTopics: 'ทุกหัวข้อ',
        search: 'ค้นหาบทความ',
        searchPlaceholder: 'ค้นหาจากหัวข้อ คำอธิบาย หรือหมวดหมู่',
        articleCollection: 'บทความทั้งหมด',
        results: 'ผลลัพธ์',
        emptyTitle: 'ยังไม่พบบทความที่ตรงกัน',
        emptyBody: 'ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น',
      }
    : {
        allTopics: 'All topics',
        search: 'Search articles',
        searchPlaceholder: 'Search by title, summary, or topic',
        articleCollection: 'All articles',
        results: 'Results',
        emptyTitle: 'No articles match that search yet.',
        emptyBody: 'Try a different keyword or switch topics.',
      };
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  
  const categories = useMemo(
    () => [{ id: 'all', label: labels.allTopics }, ...getBlogCategories(lang)],
    [lang, labels.allTopics]
  );
  
  const normalizedQuery = query.trim().toLowerCase();
  
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory = activeCategory === 'all' || article.cat === activeCategory;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      const haystack = [
        article.title,
        article.titleTh,
        article.excerpt,
        article.excerptTh,
        article.cat,
        article.catTh,
      ].join(' ').toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [activeCategory, normalizedQuery]);
  
  const featured = filteredArticles[0] || null;
  const rest = filteredArticles.slice(1);

  return (
    <section className="bm-content-page bm-blog-page">
      <div className="bm-blog-shell">
        <div className="bm-blog-intro">
          <div className="bm-eyebrow">{t.blogEyebrow}</div>
          <h1 className="bm-h1">{t.blogTitle}</h1>
          <p className="bm-lead bm-blog-lead">{t.blogLead}</p>
        </div>

        <section className="bm-blog-tools" aria-label={labels.search}>
          <label className="bm-blog-search">
            <span className="bm-blog-search-label">{labels.search}</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
            />
          </label>
          <div className="bm-blog-filters" aria-label={labels.allTopics}>
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`bm-filter-pill${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={isActive}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </section>

        <div className="bm-blog-results-head">
          <div className="bm-eyebrow">{normalizedQuery || activeCategory !== 'all' ? labels.results : labels.articleCollection}</div>
          <div className="bm-blog-count">{filteredArticles.length} {lang === 'th' ? 'บทความ' : 'articles'}</div>
        </div>

        {featured ? (
          <>
            <article className="bm-feature-article">
              <button
                type="button"
                className="bm-feature-link"
                onClick={() => onOpenArticle(featured.id)}
                aria-label={`${t.readMore} ${lang === 'th' ? featured.titleTh : featured.title}`}
              >
                <div className="bm-feature-cover">
                  {featured.img ? (
                    <img src={featured.img} alt={lang === 'th' ? featured.titleTh : featured.title} loading="lazy" />
                  ) : (
                    <div className="bm-blog-fill" style={{ background: featured.cover }} />
                  )}
                  <span className="bm-blog-cat">{lang === 'th' ? featured.catTh || featured.cat : featured.cat}</span>
                </div>
                <div className="bm-feature-body">
                  <div className="bm-meta">{t.featured} · {(lang === 'th' ? featured.dateTh : featured.date).toUpperCase()} · {(lang === 'th' ? featured.readTh : featured.read).toUpperCase()}</div>
                  <h2 className="bm-feature-title">{lang === 'th' ? featured.titleTh : featured.title}</h2>
                  <p className="bm-feature-excerpt">{lang === 'th' ? featured.excerptTh : featured.excerpt}</p>
                  <div className="bm-card-cta">{t.readMore}</div>
                </div>
              </button>
            </article>

            {rest.length > 0 && (
              <div className="bm-blog-grid">
                {rest.map((article) => (
                  <BlogCard key={article.id} article={article} onOpenArticle={onOpenArticle} lang={lang} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="bm-blog-empty">
            <h2>{labels.emptyTitle}</h2>
            <p>{labels.emptyBody}</p>
          </div>
        )}
      </div>
    </section>
  );
}
