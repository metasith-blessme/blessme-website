import React, { useState } from 'react';
import { BASE_URL } from '../lib/seo';
import {
  ARTICLES,
  getArticleById,
  getRelatedArticles,
  getAdjacentArticles,
  getArticleBlocks,
} from '../content/blog';
import { BlogCard } from './BlogPage';

export function renderArticleBlock(block, index) {
  const [tag, content] = block;

  if (tag === 'h2') return <h2 key={index} className="bm-article-h2">{content}</h2>;
  if (tag === 'h3') return <h3 key={index} className="bm-article-h3">{content}</h3>;
  if (tag === 'quote') return <blockquote key={index} className="bm-article-quote">{content}</blockquote>;
  if (tag === 'ul') {
    return (
      <ul key={index} className="bm-article-list">
        {content.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  if (tag === 'image') {
    return (
      <figure key={index} className="bm-article-figure">
        <img src={content.src} alt={content.alt} className="bm-article-inline-img" loading="lazy" />
        {content.caption && <figcaption className="bm-article-caption">{content.caption}</figcaption>}
      </figure>
    );
  }

  return <p key={index} className="bm-article-p">{content}</p>;
}

export default function ArticlePage({ articleId, onBack, onOpenArticle, lang }) {
  const article = getArticleById(articleId) || ARTICLES[0];
  const others = getRelatedArticles(article.id, 3);
  const { previous, next } = getAdjacentArticles(article.id);
  const shareUrl = `${BASE_URL}/blog/${article.id}`;
  const title = lang === 'th' ? article.titleTh : article.title;
  const excerpt = lang === 'th' ? article.excerptTh : article.excerpt;
  const category = lang === 'th' ? article.catTh || article.cat : article.cat;
  const authorRole = lang === 'th' ? article.authorRoleTh || article.authorRole : article.authorRole;
  const blocks = getArticleBlocks(article, lang);
  const heroCaption = lang === 'th'
    ? article.imgCaptionTh || article.imgAlt
    : article.imgCaption || article.imgAlt;
  const [copied, setCopied] = useState(false);
  const copyLinkLabel = copied
    ? (lang === 'th' ? 'คัดลอกแล้ว' : 'Copied')
    : (lang === 'th' ? 'คัดลอกลิงก์' : 'Copy link');

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        window.prompt('Copy this link', shareUrl);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      window.prompt('Copy this link', shareUrl);
    }
  };

  return (
    <article className="bm-article-page">
      <button className="bm-back-link" onClick={onBack}>
        {lang === 'th' ? '← บทความทั้งหมด' : '← All articles'}
      </button>

      <div className="bm-article-main">
        <header className="bm-article-head">
          <div className="bm-eyebrow">{category.toUpperCase()}</div>
          <h1 className="bm-article-title">{title}</h1>
          <div className="bm-article-meta">
            <span>{lang === 'th' ? article.dateTh : article.date}</span>
            <span className="dot">·</span>
            <span>{lang === 'th' ? article.readTh : article.read}</span>
          </div>
          <p className="bm-article-excerpt">{excerpt}</p>
        </header>

        {article.img ? (
          <figure className="bm-article-figure bm-article-figure--hero">
            <img src={article.img} alt={article.imgAlt} className="bm-article-hero-img" width="1080" height="608" fetchpriority="high" />
            {heroCaption && <figcaption className="bm-article-caption">{heroCaption}</figcaption>}
          </figure>
        ) : (
          <div className="bm-article-cover" style={{ background: article.cover }} />
        )}

        <div className="bm-article-body">
          {blocks.map((block, index) => renderArticleBlock(block, index))}
        </div>

        <div className="bm-article-support">
          <div className="bm-article-panel">
            <div className="bm-eyebrow">{lang === 'th' ? 'เขียนโดย' : 'Written by'}</div>
            <h2>{article.author}</h2>
            <p>{authorRole}</p>
          </div>
          <div className="bm-article-panel">
            <div className="bm-eyebrow">{lang === 'th' ? 'แบ่งปัน' : 'Share'}</div>
            <div className="bm-article-actions">
              <button type="button" className="bm-article-action" onClick={handleCopyLink}>{copyLinkLabel}</button>
              <a className="bm-article-action" href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${shareUrl}`)}`}>
                {lang === 'th' ? 'ส่งอีเมล' : 'Email article'}
              </a>
            </div>
          </div>
          <div className="bm-article-panel">
            <div className="bm-eyebrow">{lang === 'th' ? 'คุยกับเรา' : 'Talk to us'}</div>
            <p>{lang === 'th' ? 'หากคุณต้องการนำสินค้าหมวดหมู่นี้ไปใช้กับเมนูของคุณ ทีมงานของเราพร้อมช่วยประเมินการเปิดตัว' : 'If you are considering this category for your menu, our team can help evaluate launch fit and sample timing.'}</p>
            <a className="bm-inline-link" href="mailto:Blessme.team@gmail.com">Blessme.team@gmail.com</a>
          </div>
        </div>

        <div className="bm-article-footer">
          <div className="bm-eyebrow">{lang === 'th' ? '— จบ —' : '— END —'}</div>
          <p className="bm-article-signoff">
            {lang === 'th'
              ? <>มีคำถามเกี่ยวกับสิ่งที่คุณได้อ่านที่นี่ใช่ไหม? ติดต่อเราได้ที่ <strong>Blessme.team@gmail.com</strong></>
              : <>Have a question about anything you read here? Reach out at <strong>Blessme.team@gmail.com</strong>.</>}
          </p>
        </div>

        {(previous || next) && (
          <nav className="bm-article-nav" aria-label={lang === 'th' ? 'การนำทางบทความ' : 'Article navigation'}>
            {previous ? (
              <button type="button" className="bm-article-nav-card" onClick={() => onOpenArticle(previous.id)}>
                <span className="bm-eyebrow">{lang === 'th' ? 'เก่ากว่า' : 'Older'}</span>
                <strong>{lang === 'th' ? previous.titleTh : previous.title}</strong>
              </button>
            ) : <div />}
            {next ? (
              <button type="button" className="bm-article-nav-card bm-article-nav-card--next" onClick={() => onOpenArticle(next.id)}>
                <span className="bm-eyebrow">{lang === 'th' ? 'ใหม่กว่า' : 'Newer'}</span>
                <strong>{lang === 'th' ? next.titleTh : next.title}</strong>
              </button>
            ) : <div />}
          </nav>
        )}
      </div>

      <section className="bm-related">
        <div className="bm-eyebrow">{lang === 'th' ? 'อ่านต่อ' : 'CONTINUE READING'}</div>
        <div className="bm-related-grid">
          {others.map((other) => (
            <BlogCard key={other.id} article={other} onOpenArticle={onOpenArticle} lang={lang} compact />
          ))}
        </div>
      </section>
    </article>
  );
}
