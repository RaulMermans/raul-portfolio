---
name: raul-mermans-design
description: Use this skill to generate well-branded interfaces and assets for Raúl Mermans (raulmermans.com) — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.

## Fast orientation

- **Brand:** Raúl Mermans — independent applied-AI builder, web developer, photographer and creative director. Spain-based, bilingual ES/EN, available worldwide.
- **Four services** (by emphasis): AI Systems → Web Development → Photography → Creative Direction.
- **Voice:** operator-builder, not designer-aesthete. *"Built for real teams, not demo theatre."* Outcome before feature. No emoji, no exclamation marks, no SaaS-speak.
- **Palette:** cream paper (`#F5F0EB`) on ink (`#1A1714`), with a single signature crimson (`#C41E3A`) as the only accent. Warm peach/rose only in background glows. Four per-section accents for the work carousel (crimson, green, gold, orange).
- **Type:** Bebas Neue (display, always UPPERCASE), DM Sans (body), Space Mono (eyebrows + UI mono), Source Serif 4 (long-form reading).
- **Visual defaults:** hard corners (radius 0 except inputs and glass cards), hairline 1px borders, near-zero shadows at rest, a fixed fractal-noise grain overlay everywhere, warm radial blurred glows behind hero + contact sections.
- **Motion:** `cubic-bezier(0.16, 1, 0.3, 1)` ease, 0.3s default. Fade + lift + slide-up only. No bounces or rotates.
- **Iconography:** no icon font. Unicode glyphs (→ ↗ · // ✕) for UI, 2-letter monospace labels inside 44px circles for social. Lucide is acceptable as a flagged fallback.

## Files in this skill

- `README.md` — full brand book (content fundamentals, visual foundations, iconography, caveats)
- `colors_and_type.css` — all CSS custom properties + semantic classes (`.ds-h1`, `.ds-eyebrow`, etc). Import this into any new artifact.
- `assets/` — logo SVGs, grain overlay, Unicode-style SVG glyphs (arrow, chevron, close)
- `preview/` — small specimen cards demonstrating tokens + components
- `ui_kits/portfolio/` — JSX recreations of the live site: Header, Hero, SectionCards (Work carousel), Services accordion, About, Contact form, Footer. `index.html` assembles them into an interactive single-page view.

## When making new work

1. Always `@import` `colors_and_type.css` and use the semantic classes / CSS vars — never invent new colors or font sizes.
2. Start from the nearest UI-kit component. Lifting Header + Footer is usually correct; the body is where you tailor.
3. If you need imagery, use full-bleed photography with a dark linear scrim — not illustrations or gradients on their own.
4. If you need an icon, try a Unicode glyph or a 2-letter mono label first. If you must use a CDN icon set, link Lucide at `stroke-width="1.5"` and flag the substitution.
5. If adding copy, follow the voice guide in `README.md` under **Content fundamentals**. Rewrite between ES and EN — do not translate.
