---
name: mobile-first-ui
description: Mobile-first UI/UX workflow for creating, modifying, or reviewing any website, web app, product screen, landing page, dashboard, component, navigation, form, card layout, case study, portfolio page, or other visual interface. Use whenever Codex designs new UI, changes frontend layout/styling, performs responsive fixes, audits mobile UX, or builds pages/components where phone usability matters; treat the mobile version as the primary experience before tablet or desktop.
---

# Mobile-First UI

## Principle

Treat the phone viewport as the canonical product experience. Design the smallest practical viewport first, then scale up. Do not make a desktop design and patch it down afterward.

Use this skill alongside the repo's normal engineering instructions and design system. Prefer existing components, tokens, and patterns; improve the mobile behavior with the smallest coherent diff.

## Workflow

1. Restate the mobile-first goal and acceptance criteria before coding.
2. Identify the primary mobile workflows: navigation, first viewport, reading path, CTA/form use, media inspection, and return paths.
3. Audit the current or planned UI at phone width first. Use 360-390px wide as the default check; include 320px when text is long or controls are dense.
4. Design mobile layout first:
   - Single-column by default.
   - Keep key actions visible and reachable.
   - Use readable text sizes without viewport-scaling tricks that make long words overflow.
   - Prefer wrapping/changing layout over horizontal scrolling, except for deliberate carousels, tabs, data tables, or code blocks.
   - Make touch targets at least 44px high/wide.
   - Keep page sections compact enough that mobile users can scan without excessive hero or card height.
5. Scale up to tablet and desktop only after the mobile layout is coherent.
6. Verify the mobile version before finishing, using browser screenshots or DOM checks when a runnable target exists.

## Mobile UX Checklist

Before finalizing UI work, check:

- No horizontal document overflow at 360-390px.
- First viewport communicates the page purpose without hiding all following content behind oversized hero spacing.
- Header/menu does not cover content, trap scrolling, or lose focus management.
- CTAs, form fields, filters, tabs, and carousel controls are reachable and not cramped.
- Text wraps cleanly; labels, pills, cards, and buttons do not clip or overlap.
- Authored multi-line headings preserve their required line count without clipping, broken
  words, or horizontal overflow in every supported locale.
- Reserved desktop card-heading blocks collapse on mobile unless row alignment is explicitly
  required.
- Media and mockups fit the viewport and do not force desktop-sized frames on mobile.
- Cards are not nested in other cards unless the existing design system requires it.
- Sticky elements are useful on mobile; disable or simplify sticky navs that consume too much vertical space.
- Dense grids collapse to one column or an intentional mobile pattern.
- Horizontal scrolling is explicitly intentional and has visible affordance.

## Implementation Rules

- Start CSS with mobile defaults, then add `min-width` enhancements when creating new styles.
- When editing an existing desktop-first codebase, add narrowly scoped mobile overrides at the latest effective point in the cascade.
- Use `minmax(0, 1fr)`, `min-width: 0`, `max-width: 100%`, and `overflow-wrap: anywhere` where long content can break layout.
- Avoid fixed pixel widths on mobile. Use `clamp()`, percentages, container-relative sizing, or aspect ratios.
- Prefer `min-height: auto` on mobile for cards, mockups, and proof panels that were given desktop presentation heights.
- Avoid viewport-width font scaling that can explode on phones; use bounded `clamp()` values with sane minimums and maximums.
- Respect `env(safe-area-inset-*)` for fixed headers, bottom controls, and full-height mobile views.
- Do not add dependencies for responsive fixes unless the user explicitly approves.

## Verification

Run the smallest relevant checks available in the repo. For UI work, prefer:

- A mobile browser pass at 390x844 and, when feasible, 360x800 or 320x568.
- A horizontal overflow check comparing `documentElement.scrollWidth` to `window.innerWidth`.
- Screenshots for first viewport and any complex interaction state.
- Existing lint/typecheck/build scripts after code changes.

If browser or build verification is blocked, state that plainly and report the fallback checks completed.

Use `$author-section-headings` when a heading has an exact line-count or centering contract.
Use `$align-card-grids` when repeated cards must align across variable copy. Finish visual work
with `$verify-rendered-ui`.

## Final Response

Always report mobile-specific changes and verification. Mention any route or component that still needs manual mobile inspection.
