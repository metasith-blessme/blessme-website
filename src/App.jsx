import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import TrustBar from './components/TrustBar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import ProductsPage from './components/ProductsPage';
import AboutPage from './components/AboutPage';
import SolutionsPage from './components/SolutionsPage';
import BlogPage from './components/BlogPage';
import ArticlePage from './components/ArticlePage';
import FAQPage from './components/FAQPage';
import Footer from './components/Footer';
import { T } from './data/translations';
import { PRODUCTS } from './data/products';
import { ARTICLES } from './data/articles';

export default function App() {
  const [page, setPage] = useState('Products');
  const [detail, setDetail] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [lang, setLang] = useState('en');

  const VALID_PAGES = ['Products', 'Solutions', 'About us', 'Blog', 'FAQ'];
  useEffect(() => {
    const storedPage = localStorage.getItem('bm-page');
    const storedLang = localStorage.getItem('bm-lang');
    if (storedPage && VALID_PAGES.includes(storedPage)) setPage(storedPage);
    if (storedLang === 'th' || storedLang === 'en') setLang(storedLang);
  }, []);
  useEffect(() => { localStorage.setItem('bm-page', page); }, [page]);
  useEffect(() => { localStorage.setItem('bm-lang', lang); }, [lang]);

  const goToPage = (p) => {
    setArticleId(null);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openArticle = (id) => {
    setArticleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const closeArticle = () => {
    setArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bm-page">
      <a href="#main-content" className="bm-skip-link">Skip to content</a>
      <Nav page={page} setPage={goToPage} lang={lang} setLang={setLang} />
      <main id="main-content">
        {articleId ? (
          <ArticlePage articleId={articleId} onBack={closeArticle} onOpenArticle={openArticle} />
        ) : (
          <>
            {page === 'Products'  && <ProductsPage onOpen={setDetail} setPage={goToPage} lang={lang} />}
            {page === 'About us'  && <AboutPage lang={lang} />}
            {page === 'Blog'      && <BlogPage onOpenArticle={openArticle} lang={lang} />}
            {page === 'Solutions' && <SolutionsPage setPage={goToPage} lang={lang} />}
            {page === 'FAQ'       && <FAQPage lang={lang} />}
          </>
        )}
      </main>
      <Footer setPage={goToPage} lang={lang} />
      {detail && <ProductDetail product={detail} onClose={() => setDetail(null)} lang={lang} />}

      {/* LINE floating action button */}
      <a href="https://line.me/R/ti/p/@591dzhsr" target="_blank" rel="noopener noreferrer"
        className="bm-line-fab" aria-label="Contact us on LINE">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M24 4C13 4 4 11.8 4 21.4c0 6.6 4.4 12.4 11 15.6-.5 1.7-1.6 6.1-1.8 7 0 0-.1.4.2.6.3.2.6 0 .6 0 .8-.1 9.3-6.1 10.7-7.1.8.1 1.5.1 2.3.1 11 0 20-7.8 20-17.4C44 11.8 35 4 24 4z" fill="white"/>
        </svg>
      </a>
    </div>
  );
}
