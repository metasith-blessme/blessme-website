import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import './styles/index.css';
import { initWebVitals } from './lib/web-vitals';
import { initContactTracking } from './lib/analytics';

// Constants
import { PRODUCTS } from './constants/products';

// Libs / Utilities
import { getInitialState, buildPath } from './lib/routing';
import { updateMeta, updateSchema } from './lib/seo';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetail from './components/Modal';

// Pages
import ProductsPage from './pages/ProductsPage';
import WholesalePage from './pages/WholesalePage';
import SolutionsPage from './pages/SolutionsPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import FAQPage from './pages/FAQPage';
import ArticlePage from './pages/ArticlePage';

function App({ ssrPath }) {
  const [initial] = useState(() => getInitialState(ssrPath)); // ponytail: lazy init — runs once; ssrPath feeds the prerenderer
  const [page, setPage] = useState(initial.page);
  const [detail, setDetail] = useState(initial.productId ? PRODUCTS.find(p => p.id === initial.productId) || null : null);
  const [articleId, setArticleId] = useState(initial.articleId);
  // Language is derived from the URL (EN at /…, Thai at /th/…). Server and client both
  // read the same URL, so first-render markup matches — no hydration mismatch.
  const [lang, setLang] = useState(initial.lang);

  // Initialize Web Vitals monitoring on component mount
  useEffect(() => {
    const stopVitals = initWebVitals({ sendBeacon: true, verbose: false });
    const stopContacts = initContactTracking();
    return () => { stopVitals(); stopContacts(); };
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPop = () => {
      const { page: p, articleId: aid, productId: pid, lang: lng } = getInitialState();
      setPage(p);
      setArticleId(aid);
      setLang(lng);
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

  const goToPage = (p) => {
    window.history.pushState({}, '', buildPath({ page: p, lang }));
    setDetail(null);
    setArticleId(null);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticle = (id) => {
    window.history.pushState({}, '', buildPath({ page: 'Blog', articleId: id, lang }));
    setDetail(null);
    setPage('Blog');
    setArticleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => goToPage('Blog');

  const openProduct = (product) => {
    window.history.pushState({}, '', buildPath({ page: 'Products', productId: product.id, lang }));
    setPage('Products');
    setArticleId(null);
    setDetail(product);
  };

  const closeProduct = () => goToPage('Products');

  // Switching language navigates to the equivalent URL in the other language (keeps EN/TH on distinct URLs).
  const switchLang = (newLang) => {
    if (newLang === lang) return;
    const productId = detail ? detail.id : null;
    const nextPath = page === 'NotFound'
      ? `${newLang === 'th' ? '/th' : ''}${window.location.pathname.replace(/^\/th(?=\/|$)/, '')}`
      : buildPath({ page, productId, articleId, lang: newLang });
    window.history.pushState({}, '', nextPath);
    setLang(newLang);
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen">
      <a href="#main-content" className="bm-skip-link">Skip to content</a>
      <Navbar page={page} setPage={goToPage} lang={lang} setLang={switchLang} />
      <main id="main-content">
        {page === 'NotFound' ? (
          <section className="max-w-3xl mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl font-bold">404 — {lang === 'th' ? 'ไม่พบหน้าที่คุณต้องการ' : 'Page not found'}</h1>
            <p className="mt-6">{lang === 'th' ? 'หน้านี้อาจถูกย้ายหรือไม่มีอยู่แล้ว' : 'This page may have moved or no longer exists.'}</p>
            <a className="inline-block mt-8 underline" href={buildPath({ page: 'Products', lang })}>
              {lang === 'th' ? 'กลับหน้าหลัก' : 'Back to home'}
            </a>
          </section>
        ) : articleId ? (
          <ArticlePage articleId={articleId} onBack={closeArticle} onOpenArticle={openArticle} lang={lang} />
        ) : detail ? (
          <ProductDetail key={detail.id} product={detail} onClose={closeProduct} lang={lang} />
        ) : (
          <>
            {page === 'Products'  && <ProductsPage onOpen={openProduct} setPage={goToPage} lang={lang} />}
            {page === 'Wholesale' && <WholesalePage setPage={goToPage} lang={lang} />}
            {page === 'About us'  && <AboutPage lang={lang} />}
            {page === 'Blog'      && <BlogPage onOpenArticle={openArticle} lang={lang} />}
            {page === 'Solutions' && <SolutionsPage setPage={goToPage} lang={lang} />}
            {page === 'FAQ'       && <FAQPage lang={lang} />}
          </>
        )}
      </main>
      <Footer setPage={goToPage} lang={lang} />


      {/* LINE floating action button */}
      <a href="https://line.me/R/ti/p/@blessmethailand" target="_blank" rel="noopener noreferrer"
        className="bm-line-fab" aria-label="Contact us on LINE">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M24 4C13 4 4 11.8 4 21.4c0 6.6 4.4 12.4 11 15.6-.5 1.7-1.6 6.1-1.8 7 0 0-.1.4.2.6.3.2.6 0 .6 0 .8-.1 9.3-6.1 10.7-7.1.8.1 1.5.1 2.3.1 11 0 20-7.8 20-17.4C44 11.8 35 4 24 4z" fill="white"/>
        </svg>
      </a>
    </div>
    </MotionConfig>
  );
}

export default App;
