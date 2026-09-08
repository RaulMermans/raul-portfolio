# Experience system audit

## Canonical authority

`styles/design-system.css` owns the portfolio foundation. `data/portfolio-experience.ts` owns public route contracts, disciplines, project metadata, service relationships, and the visual-regression matrix. Project-specific colors remain scoped accents and evidence treatments.

## Current inventory

The App Router contains 92 `page.tsx` source entries: Spanish root and English `/en` implementations, plus Spanish compatibility routes. They resolve to 12 canonical public-route patterns across home, about, service detail, case-studies index, case study, apps index/detail, photography, visual work, and utility. `scripts/verify-route-registry.mjs` rejects any new public route outside that registry.

The substantial case studies are registered with one primary discipline, optional secondary capabilities, a presentation family, and relevant services. This prevents duplicate taxonomy ownership while allowing an index or service page to retrieve related work.

## Known, intentional exception

`app/(es)/apps/overflow/OverflowLanding.tsx` is a project-native product evidence surface. It is exempted only when it declares `@design-override reason: project-native evidence treatment`. The exception does not authorize shared navigation, footer, or page-foundation changes.

The legacy global and case-study CSS files are content-hash locked migration boundaries. Any edit breaks the design lint until the foundation values are migrated and the audited lock is deliberately updated. The Remoria file remains a scoped project-evidence exception. New source outside those narrowly named boundaries is checked by the design lint.

## Findings repaired in this pass

- **Foundation violation:** error boundaries used a system/fallback font stack, raw cream/ink palette values, and rounded button corners. They now reference the semantic font, surface, text, border, and square-button tokens.
- **Foundation violation:** app CTAs and legacy app tiles recreated rounded controls, raw foundation colors, and display-font stacks. The reusable CTA now composes `ui-button`; the retained legacy tiles use approved radius and heading tokens.
- **Visual-regression risk:** screenshot capture did not assert baselines. The representative desktop and 390px matrix now has native Playwright `toHaveScreenshot` tests.
- **Documentation/skill divergence:** the root routing contract was previously ignored by Git. The root `AGENTS.md` is now explicitly included and points contributors to the existing experience-system skill chain.

## Enforcement

- `npm run verify:route-registry` detects unregistered App Router pages from the canonical route registry.
- `npm run verify:project-taxonomy` requires every substantial case study to have one approved discipline, a presentation family, and at least one relevant service.
- `npm run lint:design-system` rejects raw cream/ink/accent palette values, inline non-system font families, and arbitrary Tailwind radii. It permits the one registered project-evidence exception above.
- `npm run test:experience-guards` proves that raw foundation color, inline custom font, arbitrary rounded control, and unregistered route fixtures fail, while the registered project-evidence exception passes.
- `npm run verify:experience-system` protects the existing foundation and case-study contracts.
- `tests/playwright/experience-invariants.spec.ts` verifies rendered route invariants.
- `tests/playwright/visual-regression.spec.ts` owns deterministic screenshot baselines for the representative matrix.

Run these together with type-check, ESLint, build/export validation, Axe coverage, and the Playwright suite before a frontend change ships.
