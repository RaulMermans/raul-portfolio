# Portfolio positioning sprint

The portfolio leads with independent systems while retaining the existing creative universe, navigation, typography, photography, visuals, and brand work.

## Route classification

Home (`home`), About (`about`), Apps (`apps-index`), Services (`service-detail`), and Case Studies (`case-studies-index`) retain their registered page families. Local AI Coding Agent and IRIS are `case-study` routes with the canonical `ai-automation` discipline and derived `technical-product` presentation. No foundation tokens or shared shell geometry change.

## Canonical hierarchy and locale parity

`data/independent-systems.ts` owns the four selected slugs and the three editorial tiers. The discipline registry remains authoritative for filters and presentation. Both languages use the same home, About, Apps, services renderer, case-study index, and new case-study renderer. Localized data retains equivalent fields, section IDs, and route relationships. Tests guard these structures and ensure every case belongs to exactly one tier.

Selected systems: Local AI Coding Agent, Website Audit Agent, IRIS, DemandOS.

Experiments and explorations: DataBrief AI, SearchSignal, Campaign Pulse, OpsTwin, Relay, Blog Agent.

Archive and practice: Remoria, AI Sports Campaign, Campaign Sandbox, Benchmark Dashboard, TerritoryOps Spain, the portfolio itself. This is editorial hierarchy, not a replacement discipline taxonomy or a claim that creative work is obsolete.

## Evidence and assumptions

Local AI Coding Agent is based on the local `Open_VS_Code` project's README, model card, 24-task evaluation corpus, and `evals/coding-agent/results/sprint-1k1-baseline.md`. The project describes itself as private. No repository link is exposed. Its 24 read-only model tasks and 30 deterministic coding cases are explicitly separate. The README, model card, and generated reports conflict on success, tool-selection, syntax, context, and latency results. The portfolio publishes scope and implemented mechanisms, not an aggregate performance claim. IDE integration is planned. The contextual thumbnail is a simplified module index, not a product screenshot or benchmark visualization.

IRIS is the public portfolio name requested by Raul for the project currently published at https://github.com/RaulMermans/JARVIS-OS. Its public README identifies the repository as an architecture showcase with re-authored docs, illustrative TypeScript contracts, and synthetic examples; the full system lives in a private monorepo. The case study reflects those boundaries and does not expose private integrations, policies, or data. It makes no pass-rate or deployment-maturity claim. The separate repository has not been renamed.

Website Audit Agent, DemandOS, and DataBrief AI retain their existing project evidence and boundaries. DemandOS continues to label synthetic data and exclude autonomous purchasing. No capabilities are added simply because they appear in the sprint's suggested stack. The About tools are grouped around technologies already documented in portfolio projects and Local AI Coding Agent.

## Intentionally preserved

Hero headline, fonts, palette, navigation, transitions, section carousel, photography and visual archives, brand cases, historical context, contact behavior, auth, database schema, dependencies, and localized service URLs. Professional context stays secondary. Apps remain small tools rather than flagship startup claims.

## Files and ownership

- `components/HomePage.tsx`, both canonical home entry points, `Hero.tsx`, `About.tsx`, `SelectedSystems.tsx`, and its CSS module: shared home structure, project proof, and supporting positioning.
- `data/site-copy.ts`: bilingual hero, navigation context, availability, building areas, Apps context, and service summaries.
- `data/independent-systems.ts`: two public-safe cases and the shared editorial hierarchy.
- `data/case-studies.ts`, `case-study-editorial.ts`, and `portfolio-experience.ts`: cards, evidence snapshots, related work, and route/discipline registration.
- `components/case-studies/IndependentSystemCaseStudy.tsx`, four new localized route entry points, and `public/images/case-studies/{iris,local-ai-coding-agent}/architecture.{svg,png}`: shared case renderer, short hero taglines, documentary module indexes, and PNG social-preview images.
- Canonical About, Apps, and case-index pages/layouts: builder-led narrative, context, tiers, and matching metadata.
- `data/service-landings.ts`: coherent AI/product and data/BI services in both languages, preserving service URLs.
- `lib/metadata.ts` and `components/StructuredData.tsx`: multidisciplinary positioning in metadata and schema.
- `styles/globals.css`: one route-scoped adjustment to the case-index reading gap, using an existing spacing token.
- Legacy `app/es/**` wrappers are preserved under Next's private `app/_legacy-es/**` folder with corrected canonical imports. They generated duplicate routes despite the documented canonical architecture. Hosting redirects remain in `public/.htaccess`; no public navigation points at the private folder.
- `scripts/verify-route-registry.mjs`: ignore Next private folders when checking public routes.
- `scripts/verify-canonical-output.mjs` and `verify-export.sh`: current titles, service labels, availability, new routes, and editorial order.
- Playwright positioning, layout-shift, parity, canonicalization, mobile, services, and visual-regression tests: localized structure, filters, evidence, alignment, responsive behavior, and current labels. Full-page screenshots allow 15 seconds to stabilize without changing pixel tolerances. Isolated section captures omit fixed shell overlays; full-page baselines cover the shell.
- `eslint.config.mjs` and `tsconfig.json`: exclude the pre-existing untracked `.codex-linux-closure` checkout from source discovery; its files are untouched.

## Main updated route matrix

| Surface | Spanish | English |
| --- | --- | --- |
| Home | `/` | `/en/` |
| About | `/about/` | `/en/about/` |
| Case index | `/case-studies/` | `/en/case-studies/` |
| Apps | `/apps/` | `/en/apps/` |
| Local AI Coding Agent | `/case-studies/local-ai-coding-agent/` | `/en/case-studies/local-ai-coding-agent/` |
| IRIS | `/case-studies/iris/` | `/en/case-studies/iris/` |
| Data & BI | `/services/automatizacion-creativa/` | `/en/services/creative-automation/` |
| AI systems/products | `/services/prototipos-producto-ia/` | `/en/services/product-prototypes/` |

## Verification notes

The stale `.next` cache was preserved outside the repository and rebuilt. Cloud-only ignored photography derivatives were regenerated from the unchanged local originals using the existing Sharp settings; no tracked photography asset was changed. Production export and verification now run from the actual repository. Temporary test artifacts and one browser worker avoid the intermittent local filesystem/recording stalls observed during the initial full run.

`npm run build -- --webpack`, `type-check`, `lint`, `verify:experience-system`, `lint:design-system`, `verify:route-registry`, `verify:project-taxonomy`, `test:experience-guards`, `verify:export`, and `verify:canonical` pass. All 312 unique internal route/asset targets across 79 exported HTML pages exist. Thirteen public GitHub repository links return HTTP 200.

Rendered verification covers both locales at desktop and mobile widths, with explicit tablet checks for the new surfaces. Baselines are newly established and visually reviewed; no usable pre-sprint baseline set was present, so these cannot establish a historical pixel comparison. The complete 250-test run passed, including Chromium desktop/mobile and WebKit smoke checks. The additional positioning/tablet run passed 20 checks with two intentional mobile skips. The ordinary-config run compared saved screenshots with updates disabled: 250 passed, two desktop hero-action assertions read an intermediate scroll position, and two duplicate mobile tablet checks were intentionally skipped. The wait now checks visibility and header clearance together; all four affected EN/ES desktop/mobile checks pass. The ordinary `--last-failed` rerun also passes. Four additional layout-shift tests pass across the two locales and viewport families. This covers 256 distinct browser checks with two intentional skips across the completed runs.

### Closing commands and results

| Check | Result |
| --- | --- |
| `npm run build -- --webpack` | Pass; canonical static export |
| `npm run type-check` / `npm run lint` | Pass |
| `npm run verify:experience-system` / `npm run lint:design-system` | Pass |
| `npm run verify:route-registry` / `npm run verify:project-taxonomy` | Pass; 16 cases, five services |
| `npm run test:experience-guards` | Pass |
| `npm run verify:export` / `npm run verify:canonical` | Pass |
| `npm run test:e2e -- --workers=1 --reporter=list --output=/private/tmp/portfolio-ordinary-final-results` | Full comparison run completed; the two timing failures passed after correction and targeted rerun |
| `npm run test:e2e -- --last-failed --workers=1 --reporter=list --output=/private/tmp/portfolio-ordinary-final-results` | Pass |
| `positioning-layout-shift.spec.ts` | Four tests pass; initial-load shifts stay at or below 0.1 across Home and both new cases |

Forty-six reviewed PNG baselines are saved under `tests/playwright/positioning-parity.spec.ts-snapshots/` and `tests/playwright/visual-regression.spec.ts-snapshots/`. They cover desktop/mobile routes, both locales, and tablet positioning captures. Browser inspection also confirmed language switching, pointer and keyboard hero navigation, readable compact phone heroes, and no console errors on the inspected routes.

No deployment or changes to the separate IRIS/JARVIS-OS repository were made. Local rollback is a revert of the sprint files; the legacy aliases remain preserved in their private folder.
