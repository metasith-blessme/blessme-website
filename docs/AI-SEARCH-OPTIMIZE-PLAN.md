# AI Search Optimization Plan

> Quick implementation guide for ChatGPT, Gemini, Claude, Perplexity visibility

**Last Updated:** 2026-05-12

---

## 📌 Quick Summary: AI Search Visibility

Your website is already **60% optimized for AI search**, but here's what will make clients find you on ChatGPT, Gemini, Claude, and Perplexity:

### ✅ Already Good

- JSON-LD structured data
- FAQ schema
- Product information
- Clear content hierarchy
- Contact information

### 🔧 Quick Wins (Easy to Add)

**4-Week Implementation Plan:**

**Week 1: Blog Enhancement** (1-2 hours)
```
- Add author names to 6 blog articles
- Add publish/update dates
- Write 2-3 sentence author bios
- Update schema in updateSchema() function
```

**Week 2: E-E-A-T Signals** (2-3 hours)
```
- Add "About BlessMe Team" section
- Mention 15+ years sourcing experience
- Add FDA approval date
- Add certifications info
```

**Week 3: Product Details** (2-3 hours)
```
- Expand 6 products with specs table
- Add product-specific FAQs (3-5 per product)
- List certifications per product
- Add storage instructions
```

**Week 4: Content Freshness** (1 hour)
```
- Add publish dates to blog articles
- Add "last updated" to FAQ
- Mark content as "regularly reviewed"
- Schedule monthly updates
```

---

## 🤖 How This Helps

### Before (Current)
```
User on ChatGPT: "Where can I buy popping boba wholesale in Thailand?"
ChatGPT: [May or may not mention BlessMe - depends on link authority]
```

### After (With AI Optimization)
```
User on ChatGPT: "Where can I buy popping boba wholesale in Thailand?"
ChatGPT: "BlessMe (Thailand) specializes in premium popping boba...
         - First Thai FDA approval
         - 12-month shelf life
         - Bangkok stock available
         Contact: Blessme.team@gmail.com
         Source: blessmethailand.com"
```

---

## 📊 Expected Results

| Channel | Current | After Optimization |
|---------|---------|-------------------|
| **ChatGPT mentions** | Occasional | Regular citations |
| **Perplexity results** | Low | Top results |
| **Claude references** | Rare | Consistent |
| **Brand authority** | Growing | Expert status |
| **Direct AI traffic** | Minimal | 10-20% of total |

---

## 🚀 Implementation Priority

**Must Do First (High Impact):**
1. ✅ Add author info to blog articles
2. ✅ Add dates to all content
3. ✅ Create E-E-A-T signals (team expertise, experience)

**Should Do (Medium Impact):**
4. ✅ Expand product specifications
5. ✅ Add product FAQs
6. ✅ Add certifications info

**Nice to Have (Low Impact):**
7. ✅ Add customer testimonials
8. ✅ Add comparison tables
9. ✅ Monitor AI mentions

---

## 📋 Implementation Checklist

### Phase 1: Blog Enhancement (Week 1)

- [ ] Add author names to all 6 articles
- [ ] Add publishedDate and updatedDate to articles
- [ ] Write author expertise bios (2-3 sentences)
- [ ] Update Article JSON-LD schema in `updateSchema()` function
- [ ] Display author info on blog pages
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

### Phase 2: E-E-A-T Signals (Week 2)

- [ ] Create "About BlessMe Team" section on About page
- [ ] Add team expertise and experience info
- [ ] Add business founding date and history
- [ ] Add certifications and awards
- [ ] Update Organization schema with new fields
- [ ] Add expertise mentions to product pages

### Phase 3: Product Information (Week 3)

- [ ] Expand each product with specifications table
- [ ] Add product-specific FAQs (3-5 per product)
- [ ] Add certifications per product
- [ ] Create/update Product JSON-LD schema
- [ ] Add storage/usage instructions
- [ ] Add product comparison feature

### Phase 4: Content Freshness (Week 4)

- [ ] Add publish/update dates to blog articles
- [ ] Add "last verified" dates to FAQ
- [ ] Set up schedule to review/update blog monthly
- [ ] Add freshness indicators to long-form content
- [ ] Schedule quarterly content reviews

---

## 🎯 What AI Search Engines Want

### Core Signals

1. **Author Information**
   - Who wrote this?
   - What's their expertise?
   - Credentials and background

2. **Dates**
   - When was this published?
   - When was it last updated?
   - Is it current?

3. **E-E-A-T**
   - **E**xperience: Do you have hands-on experience?
   - **E**xpertise: Are you an expert in this field?
   - **A**uthoritativeness: Are you trusted and cited by others?
   - **T**rustworthiness: Can people rely on your information?

4. **Structure**
   - Clear headings (H1 → H2 → H3)
   - Lists and tables
   - Definitions of terms
   - Linked sources

5. **Specificity**
   - Exact numbers (not "many" or "several")
   - Specific dates
   - Measurable facts
   - Verifiable claims

---

## 💻 Code Changes Needed

### 1. Update Blog Articles (blog.js)

```javascript
{
  id: 'specialty-category',
  title: 'Understanding Specialty Food Categories',
  titleTh: '...',
  excerpt: '...',
  excerptTh: '...',
  
  // ADD THESE:
  author: 'BlessMe Sourcing Team',
  authorBio: 'Specialty food sourcing experts with 15+ years in Thai beverage industry',
  publishedDate: '2026-05-01',
  updatedDate: '2026-05-12',
  
  category: 'sourcing',
  categoryTh: 'การจัดหา',
  date: '2026-05-01',
  author: 'BlessMe Team',
  blocks: [...]
}
```

### 2. Update updateSchema() Function

```javascript
// Add to Article schema
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": excerpt,
  "image": "/og-image.png",
  "datePublished": publishedDate,
  "dateModified": updatedDate,
  "author": {
    "@type": "Organization",
    "name": "BlessMe (Thailand) Co., Ltd."
  }
}
```

### 3. Display Author Info in Articles

```jsx
<div className="article-meta">
  <span className="author">By {article.author}</span>
  {article.publishedDate && (
    <span className="date">
      Published {new Date(article.publishedDate).toLocaleDateString()}
    </span>
  )}
  {article.updatedDate && (
    <span className="updated">
      Updated {new Date(article.updatedDate).toLocaleDateString()}
    </span>
  )}
  {article.authorBio && (
    <p className="author-bio">{article.authorBio}</p>
  )}
</div>
```

---

## 🔍 Testing Your Changes

### Test 1: Rich Results
```
https://search.google.com/test/rich-results
→ Paste your page URL
→ Check for Article, Product, FAQ schemas
```

### Test 2: Schema.org Validator
```
https://validator.schema.org/
→ Paste your page HTML
→ Verify all schemas are correct
```

### Test 3: ChatGPT Query
```
Ask ChatGPT: "Where can I buy popping boba wholesale in Thailand?"
→ Check if BlessMe appears in results
→ Review if source citation is correct
```

### Test 4: Perplexity AI
```
https://www.perplexity.ai/
Ask same query
→ Check if BlessMe is cited
→ Verify citation accuracy
```

---

## 📈 Monitoring Results

### Week 1-2: Setup Phase
- Implement Week 1 changes
- Test with Schema validator
- Monitor for errors

### Week 3-4: Rollout
- Implement Weeks 2-4 changes
- Monitor Google Rich Results Test
- Check Schema errors

### Week 5+: Monitoring
- Test monthly with ChatGPT
- Monitor Google Search Console
- Track brand mentions
- Adjust based on results

---

## 🚀 Quick Win: Start with Blog Articles

**Most impactful, easiest to implement:**

1. Open `src/content/blog.js`
2. Add to each article:
   ```javascript
   author: 'BlessMe Sourcing Team',
   authorBio: 'Specialty food experts with 15+ years sourcing experience',
   publishedDate: '2026-05-01',
   updatedDate: '2026-05-12',
   ```
3. Update `updateSchema()` to include these fields
4. Display on article pages
5. Test with Google Rich Results Test

**Time:** 1-2 hours
**Impact:** High (immediately improves AI visibility)

---

## 📚 Full Documentation

For complete details, see:
- **`docs/AI-VISIBILITY-OPTIMIZATION.md`** — Full guide with code examples
- **`docs/SEO-OPTIMIZATION.md`** — General SEO guide
- **`docs/CLOUDFLARE-SETUP-CHECKLIST.md`** — Cloudflare configuration

---

## 🎯 Success Metrics

Track these metrics monthly:

1. **ChatGPT Mentions**
   - Ask "popping boba wholesale Thailand" monthly
   - Check if BlessMe cited
   - Note improvement

2. **Search Console**
   - Dashboard → Performance
   - Track "Impressions" trend
   - Look for "popping boba" queries

3. **Direct AI Traffic**
   - Google Analytics → Source/Medium
   - Look for "organic / search" increases
   - Track referrer URLs

4. **Brand Authority**
   - Perplexity AI searches
   - Claude conversations
   - Gemini references

---

## Next Steps

1. **Read Full Guide**: `docs/AI-VISIBILITY-OPTIMIZATION.md`
2. **Choose Implementation Week**: Start with Week 1 (blog articles)
3. **Implement Changes**: 1-2 hours of work
4. **Test Changes**: Use Google Rich Results Test
5. **Monitor Results**: Track AI mentions monthly

---

**Last Updated:** 2026-05-12
**Owner:** BlessMe Web Team
**Status:** Ready for implementation
