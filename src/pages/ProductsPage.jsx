import React from 'react';
import { T } from '../constants/translations';
import { HOME, MENU_IDEAS } from '../constants/home';
import { HEADER_CTA, LINE_URL, PHONE_HREF } from '../constants/nav';
import { HOME_FAQS_EN, HOME_FAQS_TH } from '../constants/faq';
import { PRODUCTS, productSearchName } from '../constants/products';
import { getArticleById } from '../content/blog';
import { SHOPEE_URL } from '../lib/analytics';
import { buildPath, handleLinkClick } from '../lib/routing';
import HeroShowroom from '../components/HeroShowroom';

const WHAT_ARTICLE = 'what-is-popping-boba-khai-muk-pop';
const SAMPLE_MAIL = 'mailto:Blessme.team@gmail.com?subject=Sample%20Request';

export default function ProductsPage({ onOpen, onOpenArticle, setPage, lang }) {
  const t = T[lang];
  const copy = HOME[lang] || HOME.en;
  const isTh = lang === 'th';
  const faqs = isTh ? HOME_FAQS_TH : HOME_FAQS_EN;
  const ideas = MENU_IDEAS.map((item) => ({ ...item, article: getArticleById(item.id) })).filter((item) => item.article);

  const go = (page, event) => handleLinkClick(event, () => setPage(page));

  return (
    <div className="bm-home">
      <section className="bm-home-hero">
        <div className="bm-home-wrap">
          <p className="bm-home-eyebrow">{copy.eyebrow}</p>
          <h1 className="bm-home-h1">
            {t.heroTitle[0]}
            <span className="bm-home-h1-em">{t.heroTitle[1]}</span>
            {t.heroTitle[2]}
          </h1>
          <p className="bm-hero-tagline">{t.heroSub}</p>
          <div className="bm-home-actions">
            <a className="bm-home-btn bm-home-btn--line" href={LINE_URL} target="_blank" rel="noopener noreferrer">
              {copy.line}
            </a>
            <a className="bm-home-btn bm-home-btn--call" href={PHONE_HREF}>
              {copy.call}
            </a>
          </div>
        </div>
      </section>

      <section className="bm-home-section" id="catalog-section" aria-labelledby="home-products-title">
        <div className="bm-home-wrap">
          <div className="bm-home-head">
            <h2 id="home-products-title" className="bm-home-h2">{copy.productsTitle}</h2>
            <a href={buildPath({ page: 'Catalogue', lang })} onClick={(event) => go('Catalogue', event)}>
              {copy.productsLink}
            </a>
          </div>
          <HeroShowroom lang={lang} onOpen={onOpen} />
        </div>
      </section>

      <section className="bm-home-section" aria-labelledby="home-why-title">
        <div className="bm-home-wrap">
          <h2 id="home-why-title" className="bm-home-h2">{copy.whyTitle}</h2>
          <ul className="bm-home-facts">
            {copy.why.map(([title, detail]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bm-home-section" aria-labelledby="home-what-title">
        <div className="bm-home-wrap bm-home-prose">
          <h2 id="home-what-title" className="bm-home-h2">{copy.whatTitle}</h2>
          <p>{t.poppingDefinition}</p>
          <p>{copy.whatMore}</p>
          <a href={buildPath({ page: 'Blog', articleId: WHAT_ARTICLE, lang })} onClick={(event) => handleLinkClick(event, () => onOpenArticle(WHAT_ARTICLE))}>
            {copy.whatLink}
          </a>
        </div>
      </section>

      <section className="bm-home-section" aria-labelledby="home-menu-title">
        <div className="bm-home-wrap">
          <h2 id="home-menu-title" className="bm-home-h2">{copy.menuTitle}</h2>
          <p className="bm-home-note">{copy.menuCost}</p>
          <ul className="bm-home-ideas">
            {ideas.map((item) => {
              const article = item.article;
              const title = isTh ? article.titleTh : article.title;
              const note = (isTh ? item.noteTh : item.noteEn) || (isTh ? article.excerptTh : article.excerpt);
              const href = buildPath({ page: 'Blog', articleId: article.id, lang });
              return (
                <li key={article.id}>
                    <a href={href} onClick={(event) => handleLinkClick(event, () => onOpenArticle(article.id))}>
                    <strong>{title}</strong>
                    <span>{note}</span>
                    <em>{copy.menuRead}</em>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bm-home-section" aria-labelledby="home-price-title">
        <div className="bm-home-wrap">
          <h2 id="home-price-title" className="bm-home-h2">{copy.priceTitle}</h2>
          <ul className="bm-home-prices">
            {PRODUCTS.map((product) => (
              <li key={product.id}>
                <a href={buildPath({ page: 'Products', productId: product.id, lang })} onClick={(event) => handleLinkClick(event, () => onOpen(product))}>
                  <span>{productSearchName(product, lang)}</span>
                  <strong>{product.price} {copy.perPack}</strong>
                </a>
              </li>
            ))}
          </ul>
          <h3 className="bm-home-h3">{copy.stepsTitle}</h3>
          <ol className="bm-home-steps">
            {copy.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <div className="bm-home-actions">
            <a className="bm-home-btn bm-home-btn--line" href={LINE_URL} target="_blank" rel="noopener noreferrer">{copy.line}</a>
            <a className="bm-home-btn bm-home-btn--call" href={buildPath({ page: 'Wholesale', lang })} onClick={(event) => go('Wholesale', event)}>
              {copy.priceLink}
            </a>
            <a className="bm-home-textlink" href={SAMPLE_MAIL} data-contact-intent="sample">{copy.sample}</a>
          </div>
        </div>
      </section>

      <section className="bm-home-section" aria-labelledby="home-faq-title">
        <div className="bm-home-wrap bm-home-prose">
          <h2 id="home-faq-title" className="bm-home-h2">{copy.faqTitle}</h2>
          {faqs.map((item) => (
            <div key={item.q} className="bm-home-faq">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bm-home-final" aria-labelledby="home-final-title">
        <div className="bm-home-wrap">
          <h2 id="home-final-title" className="bm-home-h2">{copy.finalTitle}</h2>
          <div className="bm-home-actions">
            <a className="bm-home-btn bm-home-btn--line" href={LINE_URL} target="_blank" rel="noopener noreferrer">{HEADER_CTA[lang] || HEADER_CTA.en}</a>
            <a className="bm-home-btn bm-home-btn--call" href={PHONE_HREF}>{copy.call}</a>
            <a className="bm-home-textlink" href={SHOPEE_URL} target="_blank" rel="noopener noreferrer">{copy.shopee}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
