# Experience system audit

## Canonical authority

`styles/design-system.css` is the sole portfolio foundation authority. It owns the palette, semantic surfaces, type roles, spacing, radii, controls, and shared alpha/surface treatment. CSS outside that file must consume canonical variables; RGBA values derived from portfolio colors use the corresponding CSS variable rather than repeat a foundation literal.

`tailwind.config.js` is an adapter only. Its portfolio aliases reference canonical CSS variables and may not define portfolio colors, font stacks, or competing values. `--ink-faint` is `#6B635A` in the foundation and through the Tailwind alias.

`data/portfolio-experience.ts` is the canonical project relationship authority. It owns primary disciplines, secondary capabilities, project-to-service relationships, scoped accents, public route contracts, and the protected visual-regression matrix.

## Taxonomy and presentation

Every project has one `primaryDiscipline`: Creative, Data & Research, Business Intelligence, AI & Automation, Digital Products, or Photography / Visual Work. The Work index filters and groups directly from that field; secondary capabilities remain contextual tags rather than duplicate entries.

The former category URLs remain available as **curated collections**. Their membership is derived from discipline and secondary-capability criteria in `data/case-study-categories.ts`; they no longer hold project records or define a competing primary taxonomy.

`presentationFamily` is no longer stored per project or case-study payload. Evidence composition derives from primary discipline through `PRESENTATION_FAMILY_BY_DISCIPLINE`: creative and photography use the expressive evidence treatment; the data, intelligence, automation, and product disciplines use the product/system treatment. This is a rendering decision, not a second taxonomy.

## Service/project relationship authority

Projects define `relatedServices` once in `PROJECT_EXPERIENCE`. Service landing pages resolve their related work with `getProjectsForService`, using the locale-independent English service slug supplied by `getCanonicalServiceSlug`. `ServiceLanding` no longer contains `relatedCaseStudies`.

`scripts/verify-project-taxonomy.mjs` verifies that every substantial case study is registered once, every relation points to a real canonical service, every canonical service resolves at least one project, and service data cannot restore a manual related-case list.

## Intentional exceptions

There are no `legacyMigrationHashes`. Shared navigation, heroes, service UI, home UI, visuals, and common chrome are linted directly.

The only source-level exceptions are deliberately narrow evidence or runtime boundaries:

- `app/(es)/apps/overflow/OverflowLanding.tsx` for product-native Overflow evidence.
- `styles/remoria-brand-system.css` for the Remoria brand-system evidence, including its displayed project type specimen.
- `app/global-error.tsx` for a self-contained error fallback that must remain legible when the normal stylesheet cannot load.

Each must declare its exact `@design-override` reason. No route or shared component can borrow an evidence exception to alter navigation, the portfolio canvas, or shared controls.

## Shared primitives and visual coverage

The implementation reuses the canonical page intro, section heading, button, surface, media, typography, and control contracts from `styles/design-system.css`. Shared header controls use `--radius-button`; portfolio surfaces use the shared radius scale. Project-native evidence retains its own geometry only inside the intentional evidence boundary.

`tests/playwright/visual-regression.spec.ts` owns the protected desktop and 390px screenshot matrix declared by `VISUAL_REGRESSION_MATRIX`. Snapshots are reviewed, never regenerated automatically. `tests/playwright/experience-invariants.spec.ts` owns the rendered accessibility, mobile, and shared-route invariants.

## Enforcement

- `npm run lint:design-system` rejects raw foundation color values, unsupported font ownership, arbitrary Tailwind colors/radii, noncanonical Tailwind aliases, and non-token shared control radii.
- `npm run test:experience-guards` proves those rejections, proves correctly scoped product evidence may retain its own color/radius/type treatment, and proves a project route cannot modify global navigation styling through an evidence marker.
- `npm run verify:route-registry`, `npm run verify:project-taxonomy`, and `npm run verify:experience-system` protect route, relationship, and shared foundation ownership.
