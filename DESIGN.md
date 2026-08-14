---
name: BlessMe Thailand
description: Artisanal editorial food design system for B2B popping boba wholesaling
colors:
  primary: "#4E7C59"
  primary-deep: "#3B6146"
  primary-soft: "#E9EFE4"
  neutral-bg: "#FAF6EF"
  neutral-bg-deep: "#F1EADF"
  neutral-card: "#FFFFFF"
  text-main: "#2B241E"
  text-soft: "#5B5048"
  line: "rgba(43, 36, 30, 0.10)"
  line-soft: "rgba(43, 36, 30, 0.06)"
typography:
  display:
    fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(40px, 5.2vw, 72px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Inter', ui-sans-serif, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.01em"
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "20px"
  xl: "28px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  card-product:
    backgroundColor: "{colors.neutral-card}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: BlessMe Thailand

## Overview

**Creative North Star: "The Editorial Tea House"**

BlessMe's visual system evokes a serene, tactile, and high-end culinary publication. The identity marries classical typography with contemporary minimalist spacing, conveying trust, culinary precision, and premium wholesale quality.

Surfaces feel organic and warm rather than sterile or synthetic, utilizing cream paper tones, roasted brown ink, and herbal tea-green accents.

**Key Characteristics:**
- Warm paper & roasted ink contrast (no pure `#000000` text).
- Refined editorial serif headlines with clean, modern sans-serif body copy.
- Tactile pill buttons, soft border separations, and gentle spring micro-interactions.
- Seamless dual-language typography harmony between English and Thai (`DB Ozone X Med`).

## Colors

A warm editorial food palette rooted in natural culinary materials: cream paper, roasted earth ink, and matcha-green botanical accents.

### Primary
- **Tea Green** (`#4E7C59`): Primary brand accent used for call-to-action buttons, active navigation markers, and trust accents.
- **Deep Tea Green** (`#3B6146`): Hover states, active pressed states, and high-contrast badges.
- **Soft Green Wash** (`#E9EFE4`): Flavor badge backgrounds, subtle highlight containers, and secondary interactive backdrops.

### Neutral
- **Cream Paper** (`#FAF6EF`): Primary page canvas tone providing warmth and reducing visual glare.
- **Deep Parchment** (`#F1EADF`): Alternating section backgrounds, table headers, and secondary panel fills.
- **Pure White** (`#FFFFFF`): Elevated cards, modals, and input fields.
- **Roasted Brown Ink** (`#2B241E`): High-contrast primary text and icons.
- **Soft Earth Ink** (`#5B5048`): Secondary body copy, meta tags, and subtitles.
- **Separator Line** (`rgba(43, 36, 30, 0.10)`): Delicate hairline borders and section dividers.

### Named Rules
**The Organic Harmony Rule.** Black text is forbidden; all high-contrast typography uses roasted earth ink (`#2B241E`) to harmonize with paper canvases (`#FAF6EF`).

## Typography

**Display Font:** `Fraunces` (with Georgia fallback; overridden by `DB Ozone X` under Thai `[lang="th"]`)
**Body Font:** `Inter` (with sans-serif fallback; overridden by `DB Ozone X` under Thai `[lang="th"]`)
**Thai Local Font:** `DB Ozone X Med` with calibrated size scaling to match Latin visual optical weight.

### Hierarchy
- **Display / Hero** (Weight 500, `clamp(56px, 8vw, 120px)`, line-height 1.05): Homepage hero statement.
- **Headline (H1)** (Weight 500, `clamp(40px, 5.2vw, 72px)`, line-height 1.15): Page titles and primary section headers.
- **Headline (H2)** (Weight 500, `clamp(32px, 3.6vw, 48px)`, line-height 1.25): Feature callouts and modal titles.
- **Body** (Weight 400, `16px`, line-height 1.6): Standard descriptive paragraphs and list items.
- **Label / Tag** (Weight 600, `12px`, letter-spacing `0.08em`, uppercase): Flavor badges, eyebrow banners, and SKU specs.

### Named Rules
**The Dual-Language Optical Match Rule.** Thai text in `DB Ozone X` must render at ~110-120% font size compared to English `Inter/Fraunces` equivalents to maintain optical weight balance across language switches.

## Layout

- **Spatial Grid**: Fluid 12-column layout with 1280px max-width container (`--container-max`).
- **Section Spacing**: Generous vertical breathing room (`clamp(64px, 8vw, 128px)`).
- **Responsive Breakpoints**: 640px (mobile), 768px (tablet), 1024px (desktop), 1280px (wide).

## Elevation & Depth

Surfaces rely on tonal layering and delicate hair-lines rather than heavy drop shadows. Depth is flat-by-default, elevating with diffuse ambient shadows only on hover or modal presentation.

### Shadow Vocabulary
- **Soft Ambient** (`0 2px 8px rgba(18, 18, 18, 0.08)`): Product card rest state and subtle floating elements.
- **Lifted Modal** (`0 12px 32px rgba(18, 18, 18, 0.12)`): Modal overlays and active drawer sheets.

## Shapes

- **Corner Radii**: Soft, pill-driven aesthetic (`20px` for cards, `999px` for buttons/badges, `8px` for inputs).
- **Borders**: 1px subtle boundary strokes (`rgba(43, 36, 30, 0.10)`) framing elevated white cards on paper backgrounds.

## Components

### Buttons
- **Primary Pill**: Background `#4E7C59`, Text `#FFFFFF`, Padding `14px 28px`, Radius `999px`. Hover scales gently and shifts to `#3B6146`.
- **Secondary Outline**: Border `1.5px solid #2B241E`, Text `#2B241E`, Background transparent. Hover fills with `#FAF6EF`.

### Product Cards
- **Structure**: White card background (`#FFFFFF`), `20px` border radius, subtle hairline border, centered product image with soft shadow, tag badge, flavor attributes, and "View details →" link.

### Modal Overlays
- **Structure**: Blurred backdrop overlay (`backdrop-filter: blur(8px)`), rounded white dialog box (`28px` radius), dual-column product specs with B2B quote quantity selector.

## Do's and Don'ts

### Do:
- **Do** maintain the cream paper canvas (`#FAF6EF`) across all marketing pages.
- **Do** ensure every interactive element provides clear hover and focus feedback.
- **Do** test Thai translation switching to verify typography size overrides.
- **Do** keep unit economics and wholesale margins prominent for B2B clarity.

### Don't:
- **Don't** use pure `#000000` black or generic saturated blue hyperlinks.
- **Don't** use harsh box shadows or neon border glows.
- **Don't** introduce generic placeholder iconography or cluttered bento boxes.
