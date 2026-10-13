---
name: Sovereign Treasury
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#404942'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707971'
  outline-variant: '#c0c9c0'
  surface-tint: '#2d6a48'
  primary: '#003820'
  on-primary: '#ffffff'
  primary-container: '#0f5132'
  on-primary-container: '#84c39b'
  inverse-primary: '#95d4ac'
  secondary: '#49607e'
  on-secondary: '#ffffff'
  secondary-container: '#c4dcff'
  on-secondary-container: '#49617f'
  tertiary: '#4d2600'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e3900'
  on-tertiary-container: '#ff9e47'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f1c7'
  primary-fixed-dim: '#95d4ac'
  on-primary-fixed: '#002111'
  on-primary-fixed-variant: '#0f5132'
  secondary-fixed: '#d2e4ff'
  secondary-fixed-dim: '#b0c8eb'
  on-secondary-fixed: '#001c37'
  on-secondary-fixed-variant: '#314865'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-numeric-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  label-numeric-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
  label-tag:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system targets institutional traders, wealth managers, and cross-border enterprise operators requiring immediate clarity and uncompromising precision. The visual aesthetic fuses classical financial stability—derived from banknote intaglio printing and sovereign bullion reserves—with modern digital fintech ergonomics.

The overall design aesthetic combines **Corporate / Modern** discipline with **Tactile / Crisp Surface** refinement:
- High-density information architecture arranged with mathematical rigor.
- Polished, micro-bordered surface modules simulating crisp security paper and engraved metallic finishes.
- Emotional impact: sovereign authority, deep liquidity, zero-latency trust, and architectural composure.

## Colors

The palette directly references worldwide monetary instruments: banknote chlorophyll, reserve treasury blue, and uncirculated gold bullion.

- **Primary (`#0F5132`) — Sovereign Emerald**: Anchor color for verified transactions, positive liquidity deltas, and primary actions. Secondary operational variant: `#198754`.
- **Secondary (`#0A2540`) — Reserve Navy**: Represents sovereign trust, systemic permanence, primary navigation chrome, and institutional headers. High-emphasis variant: `#1E3A8A`.
- **Tertiary (`#D97706`) — Bullion Gold**: Reserved for high-value alerts, yield states, execution status, and premier asset tiers. Accents: `#EAB308` and `#F59E0B`.
- **Neutrals — Banknote White & Graphite Slate**:
  - Background Canvas: `#F8FAFC` (crisp paper parchment) stepping to `#FFFFFF` for elevated data cards.
  - Border & Dividers: `#E2E8F0` and `#CBD5E1` for micro-stroke line work.
  - Text Hierarchy: `#0F172A` (deep graphite) for high-contrast legible figures, stepping to `#334155` for analytical subtitles, and `#64748B` for metadata.

## Typography

Typography balances architectural stability, narrative legibility, and tabular accuracy:
- **Headlines (`Space Grotesk`)**: Technical yet elevated proportions that give macro figures and module headers an institutional edge.
- **Body (`Hanken Grotesk`)**: Impeccable kerning and balanced aperture designed for high-density transactional logs and regulatory disclosures.
- **Data & Numeric Labels (`JetBrains Mono`)**: Strict monospaced layout for cross-currency rates, balance sheets, tickers, and ISO currency identifiers to eliminate horizontal visual drift across real-time balance feeds.

## Layout & Spacing

A modular 12-column responsive fluid grid structured for dense information panels, trading monitors, and summary statements:

- **Desktop (1280px+)**: 12 columns, `margin` of 2.5rem (40px), and `gutter` of 1.5rem (24px). Split 4-column metrics feeds / 8-column ledger visualizations.
- **Tablet (768px - 1279px)**: 8 columns, `margin` of 1.5rem (24px), `gutter` of 1rem (16px). Secondary modules collapse into contextual sub-tabs.
- **Mobile (<768px)**: 4 columns, `margin-mobile` of 1rem (16px), `gutter-mobile` of 0.75rem (12px). Data grids convert to single-column card stacks with horizontal scrolling for monospaced numerical tables.
- **Internal Spacing**: Component margins adhere strictly to multiples of 4px/8px, maintaining alignment across ledger tables, currency tickers, and modal dialogs.

## Elevation & Depth

Visual hierarchy rejects exaggerated drop shadows in favor of monetary-grade precision:

- **Surface Tiers**:
  - `Base`: `#F8FAFC` parchment background.
  - `Card / Sheet`: Pure `#FFFFFF` resting atop Base with a crisp 1px perimeter border (`#E2E8F0`).
  - `Floating Overlays`: `#FFFFFF` with a dual-layer ambient shadow: `0px 4px 12px rgba(10, 37, 64, 0.05), 0px 1px 3px rgba(10, 37, 64, 0.08)`.
- **Low-Contrast Outlines**: Every container boundary uses micro-borders (`1px solid #E2E8F0`). When a card is active or hovered, the border shifts to `#0A2540` at 30% opacity or `#0F5132` at 40% opacity.
- **Data Highlights**: Key metric cards utilize a 2px top accent line colored in Sovereign Emerald or Bullion Gold to indicate transaction classes.

## Shapes

The design system enforces a **Soft (`1`)** shape language, conveying structural integrity and corporate discipline without harshness:
- Primary containers, metric tiles, and inputs use `0.25rem` (4px) radii.
- Overlays, slide-out panels, and modal shells scale to `rounded-lg` (`0.5rem` / 8px).
- Status badges, currency pills, and ledger verification tokens leverage `rounded-xl` (`0.75rem` / 12px) to softly distinguish metadata from actionable structural frames.
- Pure circular buttons and pill shapes are reserved exclusively for avatar nodes and quick currency toggle tags.

## Components

### Buttons
- **Primary**: Solid Sovereign Emerald (`#0F5132`) background, crisp white typography (`#FFFFFF`), 1px subtle inset border (`#198754`). Hover state darkens to `#0A3622`.
- **Secondary**: Deep Reserve Navy (`#0A2540`) background with `#FFFFFF` text for operational, administrative actions.
- **Outline / Tertiary**: Transparent background, 1px perimeter border in `#CBD5E1`, text in `#0F172A`. Hover transitions background to `#F1F5F9`.
- **Destructive**: Crisp crimson outline (`#DC2626`) with soft tint fill (`#FEF2F2`).

### Input Fields
- Background: Pure `#FFFFFF` surrounded by a 1px border (`#CBD5E1`).
- Typography: Currency denominations and active numeric inputs render in `JetBrains Mono` (`#0F172A`).
- Focus State: Border transitions to Sovereign Emerald (`#0F5132`) with an ambient 2px outer ring tinted at 15% opacity (`rgba(15, 81, 50, 0.15)`).

### Cards & Ledger Tiles
- Pure `#FFFFFF` surfaces with 1px border (`#E2E8F0`).
- Header regions feature a subtle bottom border (`1px solid #F1F5F9`) separating high-level metadata from the data body.
- Metric values are displayed in `Space Grotesk` Bold with currency code affixes anchored in `JetBrains Mono`.

### Chips & Currency Badges
- Pill containers with `0.75rem` radius.
- Positive delta chip: `#ECFDF5` fill, `#0F5132` text, 1px `#A7F3D0` border.
- Pending/Reserve chip: `#FFFBEB` fill, `#D97706` text, 1px `#FDE68A` border.
- Neutral asset tag: `#F1F5F9` fill, `#334155` text, 1px `#E2E8F0` border.

### Checkboxes & Radios
- Square 16px footprint with `0.125rem` (2px) corner rounding.
- Checked state: Filled with `#0F5132`, displaying a crisp white micro-check icon.
- Unchecked state: `#FFFFFF` fill with 1.5px border (`#94A3B8`).

### Data Tables & Ledgers
- Fixed header with `#F8FAFC` background and micro-uppercase labels (`label-tag`).
- Zebra striping is avoided; alternate rows use 1px bottom border dividers (`#F1F5F9`).
- Numeric columns right-align using `JetBrains Mono` for tabular figure scanning.

### Currency Conversion Matrix
- Dual-input stack with synchronized middle node anchor in Bullion Gold (`#D97706`).
- Live rate indicators refresh with micro-animations highlighting updated ticks in Emerald or Navy.