# BlessMe AI Content System — Quick Start Guide 🚀 (THAI PRIMARY)

**Created for**: ป่าน (Parn) @ BlessMe Group  
**Version**: 2.0 (Thai-Primary Edition)  
**Date**: May 2025

---

## 📦 What You've Got

You now have a complete **multi-agent AI system** for creating Thai-language, SEO-optimized, fact-checked articles for blessmethailand.com.

**Key Features:**
- ✅ **THAI Language First** - All articles written in Thai (ภาษาไทย)
- ✅ **English Metadata** - SEO keywords/titles in English for Google
- ✅ **Multiple Content Types** - Health & Wellness, Trends & Toppings, Business

**Files created:**
1. `orchestrator.txt` — Main coordinator prompt (UPDATED FOR THAI)
2. `skill1-brand-content-specialist.txt` — Content expert (Health, Trends, Business) ⭐ NEW
3. `skill2-seo-optimizer.txt` — SEO & readability optimizer
4. `skill3-factchecker.txt` — Fact-checker & source researcher
5. `QUICKSTART.md` — This guide (you are here)

---

## ⚡ Quick Start (5 Minutes)

### Option 1: Super Simple (Copy-Paste into Claude CLI)

**Step 1:** Open your Claude CLI (or terminal with `claude` installed)

```bash
# Check if Claude CLI is installed
which claude
```

**Step 2:** Use the Orchestrator prompt directly:

```bash
claude --system "$(cat orchestrator.txt)" --input "
Please generate an article for BlessMe's blog:

Topic: Mangosteen Health Benefits & Nutrition
Keywords: mangosteen nutrition, antioxidants, tropical fruit benefits
Article Type: blog
Target Audience: Bangkok health-conscious consumers

Please follow the complete workflow and return publication-ready JSON.
"
```

**Step 3:** Copy the JSON output and save it:

```bash
# Save the output
cat > article.json << 'EOF'
[paste the JSON response here]
EOF

# Extract just the article body
jq -r '.article_body' article.json > article.txt

# Extract metadata for CMS
jq '.article_metadata' article.json
```

---

### Option 2: Using Sequential Agents (More Control)

If you want to see each step and control the process:

```bash
# AGENT 1: Research & Draft
echo "🤖 Agent 1: Researching and drafting..."
claude --system "$(cat skill1-brand-nutrition.txt)" --input "
Topic: Mangosteen Health Benefits

Please research this topic and create a draft article (800-1200 words) in BlessMe voice.
Include hook angles, key sections, and flag claims to verify.
Return as JSON with draft_article, keywords_identified, facts_to_verify.
" > agent1_output.json

# AGENT 2: SEO Optimize
echo "🤖 Agent 2: Optimizing for SEO..."
DRAFT=$(jq -r '.draft_article' agent1_output.json)

claude --system "$(cat skill2-seo-optimizer.txt)" --input "
Please optimize this article for SEO:

$DRAFT

Return JSON with optimized_article, meta_description, internal_links, seo_score.
" > agent2_output.json

# AGENT 3: Fact-Check
echo "🤖 Agent 3: Fact-checking and adding citations..."
OPTIMIZED=$(jq -r '.optimized_article' agent2_output.json)
FACTS=$(jq -r '.facts_to_verify | join("; ")' agent1_output.json)

claude --system "$(cat skill3-factchecker.txt)" --input "
Please fact-check this article and add citations:

$OPTIMIZED

Key claims to verify: $FACTS

Return JSON with final_article_with_citations, sources, credibility_score.
" > agent3_output.json

# View final output
echo "✅ Final Article:"
jq -r '.final_article_with_citations' agent3_output.json
```

---

## 📝 Simple Content Brief Format

When you have a topic ready, use this format:

```json
{
  "topic": "Mangosteen Health Benefits & Nutrition",
  "target_keywords": "mangosteen nutrition, antioxidants, tropical fruits",
  "article_type": "blog",
  "target_audience": "Bangkok health-conscious consumers, ages 18-45"
}
```

**Pass this to Claude via:**

```bash
claude --system "$(cat orchestrator.txt)" --input "[paste your brief above]"
```

---

## 🎯 Content Types & Examples

### Type 1: HEALTH & WELLNESS (สุขภาพและสุขอนามัย)
Health tips, wellness trends, lifestyle advice - NOT just nutrition science

```bash
claude --system "$(cat orchestrator.txt)" --input "
Topic: ประโยชน์ของการดื่มน้ำผลไม้ต่อสุขภาพจิต (Benefits of fruit juice for mental health)
Content Type: health_wellness
Keywords: mental health, fruit benefits, wellness trends
Type: blog
"
```

### Type 2: TRENDS & TOPPINGS (เทรนด์และเครื่องประดับ)
New products, seasonal items, trendy decorative sweets - what's hot right now

```bash
claude --system "$(cat orchestrator.txt)" --input "
Topic: เทรนด์เครื่องประดับเครื่องดื่มที่ฮิตปี 2025 (Trending beverage toppings 2025)
Content Type: trends_toppings
Keywords: trendy toppings, beverage decoration, sweet trends
Type: blog
"
```

### Type 3: BUSINESS (ธุรกิจ)
Business insights, entrepreneurship, industry trends - NO franchise content

```bash
claude --system "$(cat orchestrator.txt)" --input "
Topic: เคล็ดลับความสำเร็จของธุรกิจเครื่องดื่มสุขภาพ (Success tips for health beverage business)
Content Type: business
Keywords: beverage business, entrepreneurship, industry trends
Type: blog
"
```

---

## 📊 Understanding the Output JSON

The system returns a JSON with these main sections:

```json
{
  "article_metadata": {
    "title": "For your CMS title field",
    "meta_description": "For SEO meta description (Google SERP preview)",
    "url_slug": "for-your-cms-slug-field",
    "primary_keyword": "main target keyword",
    "secondary_keywords": ["supporting keywords"]
  },
  "article_body": "Complete article text with citations — copy this to CMS",
  "sources": "Reference list — include at end of article",
  "internal_links": [
    {
      "anchor_text": "text to hyperlink",
      "target_url": "/path/to/blessme/page"
    }
  ],
  "quality_checks": {
    "credibility_score": "85+ is required",
    "seo_score": "75+ is good",
    "publishing_ready": "true/false"
  }
}
```

**How to use it:**
1. Copy `article_body` → CMS article content field
2. Copy `title` → CMS SEO title field  
3. Copy `meta_description` → CMS meta description field
4. Copy `url_slug` → CMS slug/permalink field
5. Add `internal_links` as hyperlinks in the article
6. Copy `sources` to end of article
7. Check `credibility_score` (must be 85+) and `publishing_ready` (must be true)

---

## 🛠️ Troubleshooting

### Problem: "Claude not found" error
**Solution**: Install Claude CLI first
```bash
npm install -g @anthropic-ai/cli
claude configure  # Add your API key
```

### Problem: Article quality is low
**Solution**: Your brief wasn't specific enough. Try:
```bash
# Bad brief
"Write about mangosteen"

# Good brief  
"Write about why mangosteen is healthy, including antioxidants and how it relates to BlessMe smoothies. Target Bangkok health-conscious readers."
```

### Problem: SEO score too low
**Solution**: The article needs better keyword integration. Try:
```bash
"Generate article about: [topic]. MUST include these keywords naturally: [keywords]. 
Focus on: strong headings, good paragraph breaks, keyword in title and first 100 words."
```

### Problem: Credibility score below 85
**Solution**: Claims need better sourcing. This is GOOD — don't publish below 85. 
Either revise the article or ask Agent 3 to suggest specific fixes.

---

## 📚 Using Individual Skills (Advanced)

If you want to use just one skill for a specific task:

### Use ONLY Skill 1 (Draft articles faster):
```bash
claude --system "$(cat skill1-brand-nutrition.txt)" --input "
Topic: [your topic]
Just give me a quick draft, don't worry about SEO yet.
"
```

### Use ONLY Skill 2 (Optimize existing content):
```bash
claude --system "$(cat skill2-seo-optimizer.txt)" --input "
I have this article: [paste article text]
Please optimize it for SEO. I'm targeting: [keywords]
"
```

### Use ONLY Skill 3 (Fact-check anything):
```bash
claude --system "$(cat skill3-factchecker.txt)" --input "
Please fact-check this health claim: [claim]
Find credible sources and tell me if it's accurate.
"
```

---

## 🎬 Production Workflow (Recommended)

**Every time you want to create an article:**

1. **Prepare brief** (5 min)
   ```
   Topic: [clear topic]
   Keywords: [3-5 keywords]
   Type: [blog/tip/guide]
   ```

2. **Run orchestrator** (60-90 sec)
   ```bash
   claude --system "$(cat orchestrator.txt)" --input "[your brief]" > output.json
   ```

3. **Review output** (10 min)
   - Check `credibility_score` (must be 85+)
   - Check `publishing_ready` (must be true)
   - Read through `article_body` for any edits

4. **Copy to CMS** (5 min)
   - Title → CMS title field
   - Meta description → CMS SEO field
   - Article body → CMS content field
   - Add internal links
   - Add sources section

5. **Publish** (2 min)
   - Set featured image
   - Review preview
   - Publish/schedule

**Total time: ~20-25 minutes per article**

---

## 📈 What to Expect

### Quality Standards
- ✅ **Credibility Score**: 85+ (fact-checked, sourced)
- ✅ **SEO Score**: 75+ (optimized for search)
- ✅ **Word Count**: 800-1200 words (blogs), 300-500 (tips)
- ✅ **Citations**: 8-12 credible sources per article
- ✅ **Internal Links**: 2-4 links to BlessMe pages
- ✅ **BlessMe Voice**: Friendly, authentic, not corporate

### Expected Output
- 📰 **Article**: Publication-ready, optimized, cited
- 📊 **Metadata**: SEO title, description, keywords, slug
- 🔗 **Internal Links**: Suggestions for linking to BlessMe products
- 📚 **Sources**: Full reference list in Harvard format
- ✅ **Checklist**: Step-by-step publishing guide

---

## 🔄 Iteration & Feedback Loop

If you want to **improve an article after generation**:

```bash
# Run it through Agent 2 again with new instructions
claude --system "$(cat skill2-seo-optimizer.txt)" --input "
Article to improve:
[paste article]

Please improve: [specific area - e.g., 'add more internal links', 'strengthen the conclusion']
"
```

Or re-fact-check with Agent 3 if you found issues:

```bash
claude --system "$(cat skill3-factchecker.txt)" --input "
I'm concerned about this claim: [claim]
Please fact-check it and suggest a better version.
"
```

---

## 💡 Pro Tips

1. **Specific keywords matter**: More detailed keywords = better optimization
2. **Keep briefs simple**: 3-4 key details is enough, system will fill the rest
3. **Save JSON outputs**: Keep all output JSONs for tracking and iteration
4. **Monitor performance**: After publishing, track which articles get traffic
5. **Iterate prompts**: After 5-10 articles, you'll know what tweaks work best for your audience

---

## 🚀 Next Steps

1. **Install Claude CLI** (if not already done)
2. **Save the 4 prompt files** in your working directory
3. **Test with 1 article** using Option 1 above
4. **Share the output** with ป่าน for feedback
5. **Refine based on feedback** (adjust prompts if needed)
6. **Start publishing** (2-3 articles/week target)

---

## 📞 Questions?

Refer back to:
- `blessme-ai-content-system.md` for full documentation
- Individual skill files for detailed prompts
- This guide for quick answers

You've got everything you need. **Let's create great content!** 🍓✨

---

**Happy content creation!**  
*- Claude*
