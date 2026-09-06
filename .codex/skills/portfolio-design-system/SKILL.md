---
name: portfolio-design-system
description: Enforce the Raúl Mermans portfolio design system when creating, editing, reviewing, or refactoring React, Next.js, CSS, CSS Modules, or Tailwind UI. Use for any change affecting color, typography, headings, spacing, cards, buttons, navigation, responsive behavior, accessibility states, or mobile layouts in this repository.
---

# Portfolio Design System

Use `styles/design-system.css` as the source of truth. Keep changes small, semantic, and reusable; do not introduce a new visual direction from one page or case study.

For public routes, start with `$portfolio-experience-system`. It selects the applicable page, case-study, art-direction, and interface-quality contracts before this skill governs token-level implementation.

## Start every UI task

1. Read `styles/design-system.css`, the affected component, and its adjacent styles.
2. State the UI goal and acceptance criteria, including mobile behavior where relevant.
3. Reuse existing tokens and shared classes before adding a raw value or one-off variant.
4. Treat case-study brand colors as scoped exceptions; do not let them replace the portfolio foundation.

## Required system rules

### Color and surfaces

- Use semantic tokens: `--surface-*`, `--text-*`, `--border-*`, and `--accent`.
- Use the core palette tokens (`--cream*`, `--ink*`, `--gold`, `--warm`, `--rose`) only when a semantic token does not express the intent.
- Do not add raw hex, RGB, or RGBA values when a matching token exists. Add a token only when it has at least two meaningful consumers.
- Measure contrast against the rendered surface, including gradients, imagery, overlays, transparency, and texture—not token values in isolation. Normal text must reach WCAG AA 4.5:1; large display text may use 3:1 only when it genuinely qualifies as large text. Interactive boundaries, icons, and focus indicators need at least 3:1 against their adjacent surface.
- Treat low-opacity, muted, and accent text as decorative only until it passes the appropriate threshold. Never use it for headings, body copy, labels, controls, or other information users need to read.

### Type and hierarchy

- Use `--font-heading` for display headings, `--font-ui` for interface/body text, `--font-code` for labels and controls, and `--font-prose` for editorial reading copy.
- The portfolio display direction is bold, condensed Bebas Neue in uppercase. Keep Source Serif for editorial reading copy only. Do not replace the display face with a serif without an explicit request.
- Typography is a locked shared foundation: `components/SiteDocument.tsx` must load the approved local Bebas Neue, DM Sans, Space Mono, and Source Serif 4 assets. Do not substitute a web font, fallback, or new family without an explicit user decision and a rendered desktop-and-mobile verification.
- Preserve semantic order: one page H1, then sequential H2/H3 sections. Do not use heading tags for visual size alone.
- Use the shared type scale: `--text-xs`, `--text-sm`, `--text-base`, `--text-md`, `--text-lg`, `--text-xl`, `--text-2xl`, `--text-3xl`, and `--text-hero`.
- Full case-study chapter H2s use `--case-study-section-heading`, a deliberately smaller shared scale than a page-level major H2. Keep body copy at `--text-base` or larger on mobile.
- Use `--heading-line-height`, `--tracking-tight`, and uppercase display treatment for portfolio headings unless the component has an intentional local contract.
- Keep headings readable: use `text-wrap: balance`; author visual lines per locale when an exact line count is required. Do not force breaks with viewport-dependent hacks.

### Meaning and reading flow

- Give every section a clear topic, an orienting heading, and supporting context before secondary elements such as tags, numbers, or decorative type.
- Cards must communicate their purpose with a readable heading and supporting copy. Labels, numerals, pills, and visual treatment are supplementary; they cannot be the only meaningful content.
- A vocabulary, tag, or taxonomy treatment must render as distinct, scannable groups. Do not let it collapse into a concatenated text row or leave it as unexplained words on an otherwise empty surface.
- Decorative layers must reinforce hierarchy, never compete with or obscure readable content. Reduce or remove any treatment that makes a section harder to scan.

### Spacing, layout, and components

- Use `--space-*`, `--section-*`, and content-width tokens for rhythm and page geometry.
- Reuse `.ui-section`, `.ui-section__container`, `.ui-section-heading`, `.ui-eyebrow`, `.ui-heading`, `.ui-button`, and `.ui-surface` when their semantics fit.
- Use `--border-light`, `--shadow-raised`, and the radius scale for surfaces. Native buttons and link-based button controls must use `--radius-button` (square corners).
- For comparable cards, reserve equal heading space with `lh` units and let valid copy remain visible. Do not compensate with title-specific margins, hardcoded heights, or clipping.

### Interaction and accessibility

- Keep every interactive target at least `--touch-min` (44px) on mobile.
- Retain visible `:focus-visible` feedback, keyboard behavior, accessible names, and state feedback beyond color alone.
- Respect reduced motion. Do not add motion that blocks reading, scrolling, or input.
- The shared fixed header stays visible at the page top, hides only after an intentional downward scroll, and returns on upward scroll. It remains available while its mobile menu is open or keyboard focus is inside it.

## Mobile contract

Check 390px first, plus 360px or 320px when content is dense.

- Keep the document width at or below the viewport width; do not mask overflow as the only fix.
- Keep body text at least 16px; never reduce the root size to make a layout fit.
- Prefer a single column, natural card height, wrapped copy, `minmax(0, 1fr)`, and `min-width: 0` over fixed widths.
- Ensure fixed headers, menus, filters, and scroll targets account for the header and safe-area insets.
- Make modal menus scrollable, focus-contained, dismissible with Escape, and safe from background scrolling.

## Change gate

Before finishing, inspect the diff and answer:

1. Did this add a raw style where a token or shared primitive exists?
2. Are H1/H2/H3 roles, font families, scale, line-height, and wrapping deliberate?
3. Are colors, borders, spacing, button geometry, focus states, and motion consistent with adjacent UI?
4. Do long English and Spanish strings remain visible and aligned?
5. At mobile width, are there no clipped controls, horizontal overflow, header collisions, or inaccessible touch targets?
6. When a lasting UX or UI preference changes, did the relevant local design guidance change with the implementation?
7. Has every readable text treatment passed its WCAG contrast threshold against its actual rendered background, including states and overlays?
8. Does each section still communicate a topic and a reading path without relying on isolated labels, numbers, pills, or decorative text?

## Verification

For every visual change, use `$verify-rendered-ui`; add `$mobile-first-ui` for responsive work, `$align-card-grids` for repeated cards, and `$author-section-headings` for authored heading lines.

Run the smallest relevant repository scripts. For mobile, exercise navigation, primary CTAs, filters/forms, modal behavior, and a representative case-study route. Capture screenshots and measure overflow with `documentElement.scrollWidth <= innerWidth`. If runtime verification is blocked, report the exact blocker and do not claim visual completion.
