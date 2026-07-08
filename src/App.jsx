import React, { useState, useEffect } from 'react';
import './styles/index.css';
import { initWebVitals } from './lib/web-vitals';

// Constants
import { PRODUCTS } from './constants/products';

// Libs / Utilities
import { getInitialState, PAGE_TO_PATH } from './lib/routing';
import { updateMeta, updateSchema } from './lib/seo';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetail from './components/Modal';

// Pages
import ProductsPage from './pages/ProductsPage';
import SolutionsPage from './pages/SolutionsPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import FAQPage from './pages/FAQPage';
import ArticlePage from './pages/ArticlePage';

function App() {
  const [initial] = useState(getInitialState); // ponytail: lazy init — runs once, not every render
  const [page, setPage] = useState(initial.page);
  const [detail, setDetail] = useState(initial.productId ? PRODUCTS.find(p => p.id === initial.productId) || null : null);
  const [articleId, setArticleId] = useState(initial.articleId);
  const [lang, setLang] = useState(() => localStorage.getItem('bm-lang') || 'en');

  // Save language preference to localStorage
  useEffect(() => { localStorage.setItem('bm-lang', lang); }, [lang]);

  // Initialize Web Vitals monitoring on component mount
  useEffect(() => {
    initWebVitals({ analyticsId: 'G-M2HGM3SM29', sendBeacon: true, verbose: false });
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPop = () => {
      const { page: p, articleId: aid, productId: pid } = getInitialState();
      setPage(p);
      setArticleId(aid);
      setDetail(pid ? PRODUCTS.find(pr => pr.id === pid) || null : null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Update language attribute on html element
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Update meta tags on every route change
  useEffect(() => {
    const pid = detail ? detail.id : null;
    const aid = articleId;
    updateMeta(page, pid, aid, lang);
    updateSchema(page, pid, aid, lang);
  }, [page, detail, articleId, lang]);

  // Custom Cursor Logic
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    const moveCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'button' || tag === 'a' || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const goToPage = (p) => {
    const path = PAGE_TO_PATH[p] || '/';
    window.history.pushState({}, '', path);
    setArticleId(null);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const openArticle = (id) => {
    window.history.pushState({}, '', `/blog/${id}`);
    setPage('Blog');
    setArticleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const closeArticle = () => {
    window.history.pushState({}, '', '/blog');
    setPage('Blog');
    setArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const openProduct = (product) => {
    window.history.pushState({}, '', `/products/${product.id}`);
    setDetail(product);
  };
  
  const closeProduct = () => {
    window.history.pushState({}, '', '/');
    setDetail(null);
  };

  return (
    <div className="bm-app-shell">
      <div 
        className={`bm-cursor ${isHovering ? 'hovering' : ''}`} 
        style={{ left: cursorPos.x, top: cursorPos.y }}
      ></div>
      <a href="#main-content" className="bm-skip-link">Skip to content</a>
      <Navbar page={page} setPage={goToPage} lang={lang} setLang={setLang} />
      <main id="main-content">
        {articleId ? (
          <ArticlePage articleId={articleId} onBack={closeArticle} onOpenArticle={openArticle} lang={lang} />
        ) : (
          <>
            {page === 'Products'  && <ProductsPage onOpen={openProduct} setPage={goToPage} lang={lang} />}
            {page === 'About us'  && <AboutPage lang={lang} />}
            {page === 'Blog'      && <BlogPage onOpenArticle={openArticle} lang={lang} />}
            {page === 'Solutions' && <SolutionsPage setPage={goToPage} lang={lang} />}
            {page === 'FAQ'       && <FAQPage lang={lang} />}
          </>
        )}
      </main>
      <Footer setPage={goToPage} lang={lang} />
      {detail && <ProductDetail product={detail} onClose={closeProduct} lang={lang} />}

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

export default App;
