# Portfolio experience work

Changes touching `app/**`, `components/**`, or `styles/**` are frontend experience work.

Before changing a public route or shared visual primitive:

1. Classify the route with `data/portfolio-experience.ts` (`pageFamily`, and `discipline` where applicable).
2. Use `$portfolio-experience-system` and follow `styles/design-system.css` as the implementation source of truth.
3. Reuse canonical primitives and tokens before adding route-local styles.
4. Keep project-specific accents and evidence treatment scoped to the project. They must not replace portfolio typography, navigation, controls, gutters, or responsive rules.
5. Run `npm run verify:experience-system`, `npm run lint:design-system`, and `npm run verify:route-registry`.
6. Run the relevant Playwright rendered and visual-regression checks at desktop and mobile widths.

A frontend task is not complete based on source inspection alone. It needs rendered verification, mobile verification, UX/UI guard execution, and visual-regression execution appropriate to the affected route.

Foundation changes (fonts, palette, controls, navigation, spacing, gutters, responsive model, or shared shell) also require updates to the canonical CSS, the relevant skill/reference, tests, and visual baselines.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
