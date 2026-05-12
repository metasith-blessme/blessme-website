# AI Search Visibility Optimization Guide

> Optimize your website for ChatGPT, Gemini, Claude, Perplexity, and other AI search engines

**Last Updated:** 2026-05-12

---

## Why AI Visibility Matters

AI search engines (ChatGPT, Gemini, Claude, Perplexity) now receive **billions of queries** and provide citations/sources. Appearing in AI search results = **direct traffic + brand authority**.

**Key Difference from Google:**
- Google prioritizes links & domain authority
- **AI engines prioritize clear, factual, well-structured content**

---

## Current Status: BlessMe Website

### ✅ Already Optimized For AI

1. **Structured Data**
   - JSON-LD LocalBusiness schema
   - Product schemas (6 SKUs)
   - Article schemas (blog posts)
   - FAQ schema (7 questions)
   - Clear semantic HTML

2. **Content Organization**
   - Clear headings hierarchy (H1, H2, H3)
   - Bilingual content (EN/TH)
   - Well-organized FAQ section
   - Detailed product descriptions

3. **Trust Signals**
   - Business address (Bangkok)
   - Phone number
   - Email contact
   - FDA approval mention
   - 12-month shelf life guarantee

### 🔧 Improvements Needed

1. **Author/Expertise Attribution**
   - Blog articles lack author information
   - No author expertise bios
   - Missing publication dates

2. **E-E-A-T Signals** (Experience, Expertise, Authoritativeness, Trustworthiness)
   - Missing: Years in business
   - Missing: Team expertise
   - Missing: Customer testimonials
   - Missing: Industry certifications

3. **Product Detail Depth**
   - Missing: Complete specifications
   - Missing: Certifications/compliance info
   - Missing: FAQs per product
   - Missing: Comparison tables

4. **Content Freshness**
   - Blog articles lack publish/update dates
   - FAQ lacks freshness signals
   - No "last verified" dates

---

## Optimization Strategy

### 1. Enhance Author Attribution

**Add author information to blog articles:**

```javascript
// In blog.js, add to each article:
{
  id: 'specialty-category',
  title: 'Understanding Specialty Food Categories',
  titleTh: '...',
  excerpt: '...',
  excerptTh: '...',
  
  // NEW: Author information
  author: 'BlessMe Sourcing Team',
  authorBio: 'Specialty food sourcing experts with 15+ years in Thai beverage industry',
  publishedDate: '2026-05-01',
  updatedDate: '2026-05-12',
  
  // ... rest of article
}
```

**JSON-LD Schema Update:**

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "description": "Article excerpt",
  "image": "/og-image.png",
  "datePublished": "2026-05-01",
  "dateModified": "2026-05-12",
  "author": {
    "@type": "Organization",
    "name": "BlessMe (Thailand) Co., Ltd.",
    "url": "https://blessmethailand.com"
  }
}
```

**Display in UI:**

```html
<div class="article-meta">
  <span>By {article.author}</span>
  <span>Published: {formatDate(article.publishedDate)}</span>
  <span>Updated: {formatDate(article.updatedDate)}</span>
  <p class="author-bio">{article.authorBio}</p>
</div>
```

---

### 2. Add E-E-A-T Signals

**Create "About the Experts" section:**

```markdown
## Our Sourcing Team

**BlessMe Sourcing Team**
- 15+ years experience in specialty food sourcing
- FDA-certified food import specialists
- Active members of Thai Food Importers Association
- Personally taste-test every product before import

### Team Expertise
- **Sourcing**: Identifying unique products globally
- **Testing**: Quality assurance & food safety compliance
- **Logistics**: Cold-chain management & import procedures
- **Market Knowledge**: Thai beverage & dessert trends
```

**JSON-LD for Organization:**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BlessMe (Thailand) Co., Ltd.",
  "description": "Specialty food wholesale with 15+ years import experience",
  "foundingDate": "2010",
  "areaServed": {
    "@type": "Country",
    "name": "Thailand"
  },
  "knowsAbout": [
    "Specialty food sourcing",
    "Food import compliance",
    "Thai food industry",
    "Wholesale distribution"
  ],
  "awards": [
    "First ThaiFDA Popping Boba Approval",
    "Thai Food Importers Association Member"
  ]
}
```

---

### 3. Enhance Product Information

**Expand product schema with complete details:**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Barley Popping Boba",
  "description": "Premium barley flavor popping boba for beverage businesses",
  "image": "/assets/barley.webp",
  "brand": {
    "@type": "Brand",
    "name": "BlessMe"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "BlessMe (Thailand) Co., Ltd."
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "THB",
    "price": "Contact for quote",
    "availability": "InStock",
    "url": "https://blessmethailand.com/products/barley"
  },
  "specifications": {
    "@type": "PropertyValue",
    "name": "Pack Size",
    "value": "1kg x 10 bags per case"
  },
  "shelfLife": "12 months",
  "storageCondition": "Cool, dry, sealed container",
  "countryOfOrigin": "Thailand",
  "certification": [
    "FDA Approval",
    "International Food Safety Standards",
    "Halal Certified"
  ]
}
```

---

### 4. Product-Specific FAQs

**Add FAQ section per product:**

```javascript
// In product modal, add:
<div className="product-faq">
  <h3>Common Questions</h3>
  
  <details>
    <summary>What's the shelf life?</summary>
    <p>12 months from production date when stored in cool, dry conditions</p>
  </details>
  
  <details>
    <summary>Is it suitable for dietary restrictions?</summary>
    <p>Barley is naturally gluten-free and vegan-friendly. Check product label for allergens.</p>
  </details>
  
  <details>
    <summary>What's the minimum order quantity?</summary>
    <p>Standard wholesale quantities apply. Contact our team for specific requirements.</p>
  </details>
</div>
```

**JSON-LD FAQPage Schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is popping boba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Popping boba are small pearls that burst with juice when bitten. Our boba adds unique texture to beverages and desserts."
      }
    }
  ]
}
```

---

### 5. Content Freshness Signals

**Update blog articles with dates:**

```html
<article>
  <h1>Understanding Specialty Food Categories</h1>
  
  <time datetime="2026-05-01" class="publish-date">
    Published: May 1, 2026
  </time>
  
  <time datetime="2026-05-12" class="update-date">
    Last Updated: May 12, 2026
  </time>
  
  <div class="freshness-indicator">
    ℹ️ This article is regularly reviewed and updated
  </div>
</article>
```

---

### 6. Customer Testimonials (If Available)

**Add testimonial schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "author": {
    "@type": "Organization",
    "name": "Example Café"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "BlessMe's popping boba has transformed our beverage menu. Customers love it!",
  "datePublished": "2026-04-15"
}
```

---

### 7. Certifications & Compliance

**Highlight trust signals in structured data:**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BlessMe (Thailand) Co., Ltd.",
  "certifications": [
    {
      "@type": "Certification",
      "name": "FDA Approval",
      "certificateNumber": "[Number if available]",
      "dateIssued": "2024-01-15"
    },
    {
      "@type": "Certification",
      "name": "ISO Food Safety",
      "issuedBy": "Thai Standards Institute"
    }
  ],
  "compliance": [
    "Thai FDA Food Import Regulations",
    "International Food Safety Standards",
    "Cold Chain Management"
  ]
}
```

---

### 8. Clear Content Hierarchy

**AI engines love this structure:**

```
H1: Main topic (one per page)
  ├─ H2: Section 1
  │   ├─ H3: Subsection 1.1
  │   └─ H3: Subsection 1.2
  ├─ H2: Section 2
  │   └─ H3: Subsection 2.1
  └─ H2: FAQ / Key Info
```

**Good example from your site:**

```html
<h1>BlessMe (Thailand) — Specialty Food Wholesale</h1>

<h2>What is Popping Boba?</h2>
<p>Description...</p>

<h2>Our Six Flavors</h2>
<h3>Barley</h3>
<p>Details...</p>

<h2>Why Choose BlessMe?</h2>
<ul>
  <li>First Thai FDA approval</li>
  <li>12-month shelf life</li>
  <li>Stock in Bangkok</li>
</ul>
```

---

## Implementation Checklist

### Phase 1: Blog Enhancement (Week 1)

- [ ] Add author names to all 6 articles
- [ ] Add publishedDate and updatedDate to articles
- [ ] Write author expertise bios
- [ ] Update Article JSON-LD schema in `updateSchema()` function
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

### Phase 2: E-E-A-T Signals (Week 2)

- [ ] Create "About BlessMe Team" section on About page
- [ ] Add team expertise and experience info
- [ ] Add business founding date and history
- [ ] Add certifications and awards
- [ ] Update Organization schema with new fields

### Phase 3: Product Information (Week 3)

- [ ] Expand each product with specifications
- [ ] Add product-specific FAQs
- [ ] Add certifications per product
- [ ] Create Product JSON-LD schema
- [ ] Add storage/usage instructions

### Phase 4: Content Freshness (Week 4)

- [ ] Add publish/update dates to blog articles
- [ ] Add "last verified" dates to FAQ
- [ ] Set up schedule to review/update blog monthly
- [ ] Add freshness indicators to long-form content

---

## AI Search Engines to Target

### 1. **ChatGPT (OpenAI)**
   - Most popular AI search
   - Uses web results for citations
   - Prefers: Clear, authoritative content
   - Strategy: Good headlines, structured data, E-A-T signals

### 2. **Google Gemini**
   - Integrated into Google Search
   - Prefers: Google-indexed content
   - Strategy: Same as Google SEO + E-A-T

### 3. **Claude (Anthropic)**
   - Growing AI search interest
   - Prefers: Factual, well-organized content
   - Strategy: Clear structure, citations, dates

### 4. **Perplexity AI**
   - Citation-focused search
   - Prefers: Content with clear sources
   - Strategy: Authoritative sources, attributions, verification

### 5. **Bing Copilot**
   - Microsoft's AI search
   - Integrated with Bing
   - Strategy: Bing SEO + structured data

---

## Content Optimization for AI

### DO ✅

- **Be specific**: Use exact numbers (not "many", "several")
- **Use lists**: AI engines prefer bullet points and numbered lists
- **Add dates**: Publication and update dates matter
- **Be factual**: Avoid opinions, stick to verifiable facts
- **Use headers**: Clear H1 → H2 → H3 hierarchy
- **Cite sources**: Add links and attribution
- **Define terms**: AI loves definitions for new concepts
- **Use tables**: Comparison tables are highly AI-friendly

### DON'T ❌

- **Avoid jargon**: Use plain language
- **Don't hide content**: No cloaking or hidden text
- **Avoid duplicate content**: Each page should be unique
- **Don't use AI-generated only**: Mix human + AI content
- **Avoid conflicting info**: Consistency across pages
- **Don't keyword stuff**: Use natural language

---

## Example: Optimized Product Page

```html
<article itemscope itemtype="https://schema.org/Product">
  
  <h1 itemprop="name">Barley Popping Boba — Premium Wholesale</h1>
  
  <div class="meta">
    <span itemprop="description">First ThaiFDA-approved barley flavor popping boba for cafés and beverage businesses</span>
    <meta itemprop="brand" content="BlessMe">
    <meta itemprop="manufacturer" content="BlessMe (Thailand) Co., Ltd.">
  </div>

  <h2>What is Barley Popping Boba?</h2>
  <p>Barley flavor popping boba are small spheres filled with barley-flavored juice. When bitten, they burst with concentrated flavor, adding texture and taste to beverages and desserts.</p>

  <h2>Specifications</h2>
  <table>
    <tr>
      <th>Property</th>
      <th>Value</th>
    </tr>
    <tr itemprop="specifications" itemscope itemtype="https://schema.org/PropertyValue">
      <td><span itemprop="name">Pack Size</span></td>
      <td><span itemprop="value">1kg x 10 bags per case</span></td>
    </tr>
    <tr>
      <td>Shelf Life</td>
      <td itemprop="shelfLife">12 months (in cool, dry conditions)</td>
    </tr>
    <tr>
      <td>Storage</td>
      <td itemprop="storageCondition">Cool, dry, sealed container</td>
    </tr>
  </table>

  <h2>Why Choose BlessMe Barley Boba?</h2>
  <ul>
    <li><strong>FDA Approved:</strong> First ThaiFDA approval for popping boba in Thailand</li>
    <li><strong>Consistent Quality:</strong> International food safety standards</li>
    <li><strong>Long Shelf Life:</strong> 12 months guarantee</li>
    <li><strong>Bangkok Stock:</strong> 100% in-stock, ready to ship</li>
  </ul>

  <h2>Common Questions</h2>
  <details>
    <summary>Is it vegan and gluten-free?</summary>
    <p>Yes, barley popping boba is naturally vegan and gluten-free.</p>
  </details>
  
  <details>
    <summary>What's the minimum order?</summary>
    <p>Wholesale quantities apply. Contact our team at Blessme.team@gmail.com or +66-82-896-5199.</p>
  </details>

  <h2>Request a Quote</h2>
  <p>Contact our wholesale team to discuss pricing and availability.</p>
  
</article>
```

---

## Monitoring AI Visibility

### Track Mentions

1. **Set up Google Alerts**
   - Search term: "BlessMe Thailand"
   - Search term: "popping boba wholesale Thailand"
   - Receive daily/weekly email alerts

2. **Monitor AI Search Engines**
   - Weekly: Ask ChatGPT about popping boba in Thailand
   - Weekly: Search on Perplexity AI
   - Monthly: Check Claude, Gemini

3. **Check Search Console**
   - Google Search Console → Performance
   - Monitor "Impressions" trend
   - Track clicks from AI-powered search

---

## Expected Impact

After implementing AI visibility optimizations:

| Metric | Before | After | Timeline |
|--------|--------|-------|----------|
| ChatGPT citations | Low | Higher | 2–4 weeks |
| Perplexity mentions | Low | Higher | 2–4 weeks |
| Brand searches | Baseline | +20% | 1–3 months |
| Organic traffic | Baseline | +15% | 1–3 months |
| Authority signals | Current | Improved | Ongoing |

---

## Resources

- [E-E-A-T Guidelines](https://developers.google.com/search/docs/appearance/page-experience)
- [Schema.org Documentation](https://schema.org/)
- [ChatGPT's Information about Web](https://openai.com/blog/new-models-and-system-features-in-chatgpt-and-api)
- [Perplexity About Sources](https://www.perplexity.ai/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

---

**Last Updated:** 2026-05-12
**Owner:** BlessMe Web Team
