import { useState } from 'react';
export default function SolutionsPage({ setPage }) {
  const steps = [
    { n: '01', t: 'Client Request',
      d: 'Our clients are looking for a new experience — a true point of difference from existing products in the market. We start every engagement by listening.' },
    { n: '02', t: 'Research',
      d: 'There is currently no prior use of this product in Thailand. We map the category, study consumer behavior, and identify the gap our partners can own.' },
    { n: '03', t: 'Sourcing',
      d: 'We identify and partner with a trusted factory delivering the best balance of price, quality, and food-safety standards — vetted in person, audited continuously.' },
    { n: '04', t: 'Testing',
      d: 'We test products with our partners and end consumers. Every product goes through rounds of feedback before it is approved for the wholesale catalogue.' },
    { n: '05', t: 'Stock',
      d: 'We hold consistent stock in our Bangkok warehouse so our partners never face downtime. Forecast-driven inventory protects launch schedules and reorders.' },
    { n: '06', t: 'Marketing',
      d: 'We educate the market — building consumer awareness and demand through brand storytelling, retail support, and content — so our partners receive ready-to-buy customers.' },
  ];
  return (
    <section className="bm-content-page">
      <div className="bm-eyebrow">OUR SOLUTION</div>
      <h1 className="bm-h1">A six-step framework for<br/>bringing something new to market.</h1>
      <p className="bm-lead" style={{ maxWidth: '64ch', marginTop: 22 }}>
        BlessMe is more than a supplier. We help our wholesale partners discover, validate,
        and launch a category that does not yet exist in Thailand — end-to-end.
      </p>
      <div className="bm-solution-grid">
        {steps.map(s => (
          <div key={s.n} className="bm-solution">
            <div className="bm-solution-head">
              <span className="bm-solution-num">{s.n}</span>
              <div className="bm-solution-line"/>
            </div>
            <h3 className="bm-solution-title">{s.t}</h3>
            <p className="bm-solution-desc">{s.d}</p>
          </div>
        ))}
      </div>
      <div className="bm-solution-cta">
        <div>
          <div className="bm-eyebrow" style={{ color: 'var(--ci-sky)' }}>READY TO TALK?</div>
          <h2 className="bm-h2-cta">Bring a true point of difference<br/>to your menu.</h2>
          <p className="bm-body bm-body--inv" style={{ marginTop: 14, maxWidth: '52ch' }}>
            Wholesale enquiries, sample requests, and partnership conversations welcome.
          </p>
        </div>
        <button className="bm-btn bm-btn--sky" onClick={() => setPage('About us')}>Contact our team</button>
      </div>
    </section>
  );
}
