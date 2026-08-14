# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Café owners, dessert shop operators, franchise buyers, and beverage brands in Thailand evaluating, sampling, and ordering specialty popping boba wholesale.

## Product Purpose
Position BlessMe (Thailand) Co., Ltd. as the premier B2B supplier of popping boba in Thailand, driving sample requests and wholesale inquiries.

## Positioning
First ThaiFDA-approved popping boba wholesaler in Thailand with local Bangkok stock (80–115 THB/pack), 12-month shelf life, seaweed-derived alginate shells (vegan/vegetarian), and unique Asian-inspired flavors (Barley, Oat, Red Bean, Water Chestnut, Moji Yogurt, Osmanthus) unavailable from generic importers.

## Operating Context
B2B procurement evaluation: Café owners browsing on mobile or desktop, comparing unit costs per cup (~4 THB/serving), requesting free sample packs, submitting wholesale inquiry forms via Web3Forms or connecting instantly via LINE (@blessmethailand).

## Capabilities and Constraints
- Bilingual EN & TH with instant toggle and synced `html[lang]`.
- 6 signature SKUs (Barley, Oat, Red Bean, Water Chestnut, Moji Yogurt, Osmanthus).
- Fixed integrations: Web3Forms API gateway (`6a29a76e-ace2-44da-8bc4-22c10901684e`), Google Analytics GA4 (`G-M2HGM3SM29`), LINE official contact.
- Static SPA architecture deployed on Cloudflare Workers & Pages.

## Brand Commitments
- Warm, high-end editorial food aesthetic (cream paper `#FAF6EF`, roasted brown ink `#2B241E`, tea green `#4E7C59`).
- Typography: Fraunces (English display serif), Inter (body/sans), DB Ozone X Med (Thai local font with custom sizing).
- Trust markers: ThaiFDA first, local Bangkok stock, 12-month shelf life, 100% seaweed-derived shells.

## Evidence on Hand
- High-res product imagery in `/assets/products/` (.webp + fallback .png).
- Thai font file `/assets/DB-Ozone-X-Med.ttf`.
- Dual-language translation dictionary in `src/constants/translations.js`.
- B2B profit calculation models and case studies in `src/content/blog.js`.

## Product Principles
1. **Clarity & Unit Economics**: Clear B2B pricing, margin advantages, and low barrier sample request.
2. **Dual-Language Elegance**: Flawless English and Thai typography hierarchy with zero layout breakage.
3. **Credibility & Speed**: Local warehouse stock, ThaiFDA certification prominence, zero placeholder slop.
4. **Frictionless Conversion**: Direct LINE contact FAB and Web3Forms quotation builder.

## Accessibility & Inclusion
- High contrast on cream paper backgrounds.
- Minimum 48px touch targets for mobile nav drawer and floating action button.
- Clean semantic HTML structure with synchronized JSON-LD structured schemas.
