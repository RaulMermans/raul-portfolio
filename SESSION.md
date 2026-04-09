# Session State

> Tracks current work context for AI assistants across sessions. Update this file during and after each coding session.

## Current Focus

**Status**: Idle
**Last Updated**: 2026-04-09

### Active Work
- None currently

### Pending Decisions
- Whether to convert the current Next.js app to full static export for IONOS or keep Railway for the server-side pieces
- Whether to capture additional Overflow proof assets later, specifically an active workout/session screen and a broader progress overview screen for the portfolio page
- Whether to approve canonical host redirects that consolidate `http`, apex, and bare-HTTPS variants to `https://www.raulmermans.com`
- Whether to approve a best-fit redirect map for legacy `/projects/*` URLs versus leaving unmatched URLs as proper 404 cleanup
- Whether the Spanish legal pages should be reviewed by a lawyer or native legal copy reviewer before being treated as official text
- Whether to keep the legacy `/es/*` Spanish alias routes as canonicalized fallback paths or replace them with hard redirects to the new base Spanish routes later

### Blockers
- IONOS Hosting Plus does not provide a Node.js runtime, and the repo still contains server-side features that may block a complete static export
- `NEXT_PUBLIC_SITE_URL=https://www.raulmermans.com npm run build` timed out locally after 60 seconds without producing `.next/` or `out/`
- `npm run type-check` and `npm run lint` both launched for the Overflow landing-page redesign on 2026-03-22 but did not finish in this environment after extended waits, so verification remained inconclusive
- `npm run type-check` and `npm run lint -- --file app/apps/overflow/OverflowLanding.tsx` also launched for the progressive-reveal Overflow UX reframe on 2026-03-22 but again did not return usable output in this environment after extended waits
- `npm run type-check` and `npm run lint -- --file components/SectionCards.tsx` again stalled in this environment on 2026-03-27 during the homepage carousel redesign, and `npm run dev -- --hostname 127.0.0.1` never reached a listening localhost URL for browser verification
- `npm run lint -- --file app/apps/overflow/OverflowLanding.tsx` was retried on 2026-03-28 for a small Overflow content removal and again did not return a usable result in this environment after roughly 60 seconds
- `npm run lint -- --file app/visuals/page.tsx` was run on 2026-03-28 for a visuals-page sizing tweak and again did not return a usable result in this environment after roughly 30 seconds
- `npm run lint -- --file app/photography/page.tsx` was run on 2026-03-28 for a photography gallery update and again did not return a usable result in this environment after roughly 30 seconds
- `npm run lint -- --file components/Services.tsx` was run on 2026-03-28 for a homepage services CTA alignment tweak and again did not return a usable result in this environment after roughly 30 seconds

### 2026-04-09 - Make Spanish the primary language
**Goal**: Make Spanish the default language on the portfolio while keeping English available as a secondary locale.
**Outcome**: Completed
**Changes Made**:
- `lib/i18n.ts`, `lib/metadata.ts`, `app/layout.tsx`, and `components/StructuredData.tsx` - switched the default locale to Spanish, generalized locale-prefix parsing for `/en/*`, updated site-wide metadata defaults, and aligned root structured data with a Spanish-primary website.
- `app/page.tsx`, `app/case-studies/page.tsx`, `app/apps/page.tsx`, `app/apps/[slug]/page.tsx`, `app/apps/overflow/page.tsx`, `app/apps/overflow/overflow-page-shared.tsx`, `app/about/layout.tsx`, `app/case-studies/layout.tsx`, `app/case-studies/ai-sports/layout.tsx`, `app/case-studies/remoria/layout.tsx`, `app/photography/layout.tsx`, `app/visuals/layout.tsx`, `app/privacy/layout.tsx`, and `app/terms/layout.tsx` - flipped the base route metadata and schema output to Spanish so `/`, `/about`, `/case-studies`, `/apps`, `/photography`, `/visuals`, `/privacy`, and `/terms` are now the Spanish-first canonical surfaces.
- `app/en/**` - added an English mirror route tree for the public site so English content now lives under `/en`, including the homepage, about, apps, case studies, photography, visuals, privacy, and terms routes.
- `app/sitemap.ts`, `app/es/case-studies/ai-sports/layout.tsx`, `app/es/case-studies/remoria/layout.tsx`, `app/es/photography/layout.tsx`, and `app/es/visuals/layout.tsx` - updated sitemap output to include Spanish base routes plus `/en/*`, and aligned the legacy `/es/*` alias metadata/schema URLs with the new canonical Spanish paths.
- `app/global-error.tsx`, `app/not-found.tsx`, and `components/NotFoundExperience.tsx` - localized the fallback error and 404 experiences so Spanish is the default UI language while `/en/*` still renders English copy.
**Notes**: `npm run type-check` completed successfully. `npm run lint -- --file app/layout.tsx --file app/page.tsx --file app/about/layout.tsx --file app/case-studies/page.tsx --file app/case-studies/layout.tsx --file app/case-studies/ai-sports/layout.tsx --file app/case-studies/remoria/layout.tsx --file app/apps/page.tsx --file app/apps/[slug]/page.tsx --file app/apps/overflow/page.tsx --file app/apps/overflow/overflow-page-shared.tsx --file app/photography/layout.tsx --file app/visuals/layout.tsx --file app/privacy/layout.tsx --file app/terms/layout.tsx --file app/not-found.tsx --file app/global-error.tsx --file components/NotFoundExperience.tsx --file components/StructuredData.tsx --file lib/i18n.ts --file lib/metadata.ts --file app/sitemap.ts --file app/en/page.tsx --file app/en/about/layout.tsx --file app/en/about/page.tsx --file app/en/apps/page.tsx --file app/en/apps/[slug]/page.tsx --file app/en/apps/overflow/page.tsx --file app/en/case-studies/layout.tsx --file app/en/case-studies/page.tsx --file app/en/case-studies/ai-sports/layout.tsx --file app/en/case-studies/ai-sports/page.tsx --file app/en/case-studies/remoria/layout.tsx --file app/en/case-studies/remoria/page.tsx --file app/en/photography/layout.tsx --file app/en/photography/page.tsx --file app/en/privacy/page.tsx --file app/en/terms/page.tsx --file app/en/visuals/layout.tsx --file app/en/visuals/page.tsx` also completed successfully with no warnings or errors. The unrelated deleted file `public/images/photography/Services_Photography.webp` was left untouched.
**Next Steps**: Review the new base Spanish routes and the `/en/*` mirrors in-browser, then decide whether to keep `/es/*` as canonicalized fallback aliases or replace them with hard redirects.

---

## Session Context Template

When starting work, update this section:

```markdown
## Current Focus

**Status**: In Progress | Paused | Blocked | Idle
**Last Updated**: YYYY-MM-DD

### Active Work
- What you're currently implementing
- Files being modified
- The specific goal for this session

### Pending Decisions
- Questions that need user input
- Design choices not yet finalized
- Dependencies on external factors

### Blockers
- Issues preventing progress
- Missing information or access
- Technical problems encountered
```

---

## Recent Sessions

### 2026-04-09 - Add Spanish site variant and language toggle
**Goal**: Add a Spanish version of the portfolio with locale-aware copy, `/es/*` routes, and a language toggle while keeping English on the existing URLs.
**Outcome**: Completed
**Changes Made**:
- `lib/i18n.ts`, `lib/metadata.ts`, `components/LocaleDocument.tsx`, `components/Header.tsx`, `components/Header.module.css`, `components/Footer.tsx`, `components/Hero.tsx`, `components/About.tsx`, `components/Services.tsx`, `components/Contact.tsx`, `components/ContactForm.tsx`, `components/Socials.tsx`, and `components/SectionCards.tsx` - added shared locale helpers, localized skip-link/html language behavior, and a reusable EN/ES header toggle with locale-aware links and shared copy.
- `data/site-copy.ts`, `data/apps.ts`, `data/case-studies.ts`, and `data/case-studies-content.ts` - centralized bilingual marketing/app/case-study copy and localized long-form case-study/app content.
- `app/page.tsx`, `app/about/page.tsx`, `app/case-studies/page.tsx`, `app/case-studies/ai-sports/page.tsx`, `app/case-studies/remoria/page.tsx`, `app/photography/page.tsx`, `app/visuals/page.tsx`, `app/privacy/page.tsx`, and `app/terms/page.tsx` - made public pages locale-aware, including the translated visuals gallery, legal pages, and case-study surfaces.
- `app/apps/apps-page-shared.tsx`, `app/apps/app-detail-shared.tsx`, `app/apps/overflow/overflow-page-shared.tsx`, `app/apps/page.tsx`, `app/apps/[slug]/page.tsx`, `app/apps/overflow/page.tsx`, and the new `app/es/**` route tree - added shared app-page helpers plus Spanish route wrappers/layouts and localized metadata/structured data for `/es/*`.
- `app/sitemap.ts` - expanded the sitemap to include Spanish public routes.
**Notes**: `npm run type-check` completed successfully. `npm run lint -- --file app/page.tsx --file app/about/page.tsx --file app/apps/page.tsx --file app/apps/[slug]/page.tsx --file app/apps/app-detail-shared.tsx --file app/apps/overflow/page.tsx --file app/apps/overflow/overflow-page-shared.tsx --file app/visuals/page.tsx --file app/privacy/page.tsx --file app/terms/page.tsx --file app/es/page.tsx` also completed successfully with no warnings or errors. The unrelated deleted file `public/images/photography/Services_Photography.webp` was left untouched.
**Next Steps**: Review the Spanish routes in-browser, especially the language-toggle path switching and the translated legal pages, and decide whether Spanish should remain additive under `/es/*` or become the default locale later.

### 2026-04-03 - Restore scrolling inside visuals exhibition detail view
**Goal**: Fix the `/visuals` exhibition detail overlay so opened artwork pages can scroll again, especially in the split desktop view shown from the visuals landing page, tighten the base `/visuals` swipe behavior so vertical page scrolling wins over accidental diagonal card swipes, and explicitly constrain the desktop exhibition grid row so the right panel cannot stretch beyond the viewport.
**Outcome**: Completed
**Changes Made**:
- `app/visuals/VisualsPage.module.css` - bounded the exhibition grid/flex stack with `min-height: 0`, `height: 100%`, `overflow: hidden`, scroll-container touch/overscroll rules, and an explicit single-row viewport-constrained exhibition grid so the right-hand detail pane can become the active vertical scroller instead of stretching past the viewport on desktop.
- `app/visuals/page.tsx` - added a stable `data-mobile-audit` hook to the exhibition scroll region for targeted regression coverage and tightened swipe-intent detection so diagonal/downward gestures on the card surface stop resetting the current visual as easily.
- `tests/playwright/mobile-regression.spec.ts` - added focused regression checks for the exhibition detail scroll region, for diagonal swipe behavior on the base `/visuals` surface, and for the desktop split-layout exhibition scroll behavior.
- `SESSION.md` - recorded the session for continuity.
**Notes**: `npm run lint -- --file app/visuals/page.tsx --file tests/playwright/mobile-regression.spec.ts` completed successfully with no warnings or errors, and `npm run type-check` completed successfully. The targeted Playwright commands for the exhibition scroll region and the diagonal-swipe regression both failed to return a result in this environment after extended waiting, so browser verification remains inconclusive here.
**Next Steps**: Re-open `/visuals` locally and confirm two things: the desktop split view now scrolls through the curatorial note and bottom action bar, and the base page no longer changes cards from slight diagonal/downward swipes while you are trying to scroll.

### 2026-03-30 - Implement safe SEO fixes from the live audit
**Goal**: Apply the low-risk SEO improvements from the live/site code audit without changing URLs or deploying approval-gated redirect behavior.
**Outcome**: Completed
**Changes Made**:
- `lib/metadata.ts`, `app/layout.tsx`, and `app/sitemap.ts` - normalized route URL generation for canonical/sitemap output, added explicit absolute-title support for the article case-study pages, and tightened root canonical handling around the canonical `www` host.
- `components/StructuredData.tsx`, `app/page.tsx`, `app/case-studies/ai-sports/layout.tsx`, `app/case-studies/remoria/layout.tsx`, `app/apps/overflow/page.tsx`, `app/photography/layout.tsx`, and `app/visuals/layout.tsx` - scoped the services schema to the homepage, added article/software-application/collection-page JSON-LD where confidence was high, and removed duplicate breadcrumb output on nested case-study pages.
- `app/case-studies/page.tsx`, `app/photography/page.tsx`, `app/visuals/page.tsx`, and `app/about/page.tsx` - fixed the missing/duplicated heading issues, strengthened the case-study hub for AI-systems intent, improved crawlable internal linking from About to proof pages, and removed the hidden duplicate exhibition heading from the visuals page by mounting the dialog only when open.
- `app/not-found.tsx` and `components/NotFoundExperience.tsx` - preserved the existing 404 visual treatment while moving SEO metadata into the route layer so legacy URLs no longer inherit homepage SEO signals.
- `TASKS.md` and `SESSION.md` - recorded the shipped fixes and left the redirect work approval-gated.
**Notes**: `npm run lint -- --file ...` completed successfully for every touched file, and `npm run type-check` completed successfully. `npm run build` was started as a final validation pass but did not return any usable output in this environment after extended waiting, so build verification remains inconclusive here. The live audit also confirmed that `http://raulmermans.com`, `http://www.raulmermans.com`, and `https://raulmermans.com` still return `200`, and that old `/projects/*` URLs are indexed externally but now resolve to `404`, so both redirect tasks remain pending approval.
**Next Steps**: After approval, implement canonical host redirects in `public/.htaccess` or Cloudflare and add a reviewed redirect map for clear legacy `/projects/*` matches.

### 2026-03-30 - Overhaul metadata and technical SEO layer
**Goal**: Improve search visibility and metadata quality across the site by tightening root metadata, route-level metadata, structured data, and technical SEO routes.
**Outcome**: Completed
**Changes Made**:
- `lib/metadata.ts` - added a shared SEO helper for canonical URLs, Open Graph, Twitter cards, robots directives, shared site config, and route-level metadata generation.
- `app/layout.tsx`, `components/StructuredData.tsx`, `app/about/layout.tsx`, `app/photography/layout.tsx`, `app/visuals/layout.tsx`, `app/case-studies/layout.tsx`, `app/case-studies/ai-sports/layout.tsx`, `app/case-studies/remoria/layout.tsx`, `app/apps/page.tsx`, `app/apps/overflow/page.tsx`, `app/apps/[slug]/page.tsx`, `app/privacy/layout.tsx`, and `app/terms/layout.tsx` - aligned page titles, descriptions, canonical URLs, OG/Twitter previews, robots rules, and schema data around one consistent SEO pattern.
- `app/sitemap.ts`, `app/robots.ts`, and `app/manifest.ts` - improved the technical SEO layer by expanding the sitemap to include public app routes, removing low-value legal pages from the sitemap, adding an explicit manifest, and centralizing the canonical host.
- `app/privacy/page.tsx` and `app/terms/page.tsx` - updated hardcoded internal site links to the canonical `www` host.
- `AGENTS.md` - documented the new shared metadata pattern for future sessions.
- `SESSION.md` - recorded the SEO pass for continuity.
**Notes**: The previous root metadata referenced a non-existent OG image path and the shared schema included an invalid `SearchAction`; both were corrected in this pass. `npm run lint -- --file ...` across the touched SEO files completed successfully with no ESLint warnings or errors. `npm run type-check` started but did not return a completion result in this environment after extended waiting, so type-check remains inconclusive.
**Next Steps**: Review the live HTML head on the homepage, `/about`, `/apps`, `/case-studies`, and `/visuals` after deploy to confirm the new title, description, canonical, OG, Twitter, sitemap, and robots output match expectations.

### 2026-03-30 - Restore earlier homepage services mix
**Goal**: Bring the homepage services section back toward its earlier multi-disciplinary mix instead of the fully AI-ops-heavy structure from the last repositioning pass.
**Outcome**: Completed
**Changes Made**:
- `components/Services.tsx` - restored the older service structure for the last three cards and the `Services` section heading, resulting in `AI Systems`, `Web Development`, `Photography`, and `Creative Direction`.
- `SESSION.md` - recorded the services-section revert for continuity.
**Notes**: I kept the first card labeled `AI Systems` instead of restoring the exact older `AI Agents` wording so the lead service still aligns better with the current positioning. `npm run lint -- --file components/Services.tsx` completed successfully with no ESLint warnings or errors.
**Next Steps**: Review the homepage and confirm whether you want the first service card to stay as `AI Systems` or be reverted all the way back to the exact older `AI Agents` phrasing.

### 2026-03-30 - Tighten homepage hero copy
**Goal**: Reduce the homepage hero copy so the positioning lands faster and rename the secondary hero CTA to feel lighter and more open.
**Outcome**: Completed
**Changes Made**:
- `components/Hero.tsx` - shortened the hero summary to `Designing AI systems for modern brands.` and changed the secondary CTA label from `Discuss a Project` to `Connect`.
- `SESSION.md` - recorded the homepage hero copy pass for continuity.
**Notes**: This was a minimal homepage copy refinement layered on top of the broader AI-systems repositioning. `npm run lint -- --file components/Hero.tsx` completed successfully with no ESLint warnings or errors.
**Next Steps**: Review the live homepage hero spacing and button balance to confirm the shorter line reads cleanly across desktop and mobile.

### 2026-03-29 - Reposition homepage around applied AI systems
**Goal**: Reframe the site so the homepage and shared metadata lead with AI systems, agents, automation, and creative infrastructure rather than visual storyteller / photography-led positioning.
**Outcome**: Completed
**Changes Made**:
- `app/layout.tsx` and `components/StructuredData.tsx` - rewrote root SEO, Open Graph, Twitter, keywords, and schema descriptions around applied AI systems, agents, automation, and creative infrastructure.
- `components/Hero.tsx`, `components/Hero.module.css`, `components/About.tsx`, `components/Services.tsx`, `components/Contact.tsx`, `components/ContactForm.tsx`, `components/Footer.tsx`, `components/SectionCards.tsx`, `components/Socials.tsx`, and `components/Header.tsx` - repositioned the homepage and shared chrome around AI systems, automation infrastructure, AI prototypes/tools, and brand systems, while reducing photography and prompt-led language to supporting craft.
- `app/about/page.tsx`, `app/about/layout.tsx`, `data/case-studies.ts`, `data/case-studies-content.ts`, `app/case-studies/layout.tsx`, `app/case-studies/ai-sports/layout.tsx`, `app/case-studies/remoria/layout.tsx`, `app/apps/page.tsx`, `app/apps/overflow/page.tsx`, `app/photography/layout.tsx`, and `app/visuals/layout.tsx` - aligned route-level copy and metadata with the new positioning so supporting pages and previews reinforce the same story.
- `SESSION.md` - recorded the repositioning pass and the verification limitation.
**Notes**: The targeted lint command for the touched homepage/metadata files started correctly but did not return a completion result in this environment after roughly 45 seconds, consistent with prior lint stalls recorded in this repo. The site structure still keeps `/photography` and `/visuals` as first-class routes, so the new positioning demotes them in framing without removing them from the information architecture.
**Next Steps**: Review the homepage, `/about`, `/apps`, and `/case-studies` locally to decide whether photography and visuals should stay in the primary work carousel or move to a more clearly secondary/archive surface in a later pass.

### 2026-03-29 - Add shared footer to visuals landing page
**Goal**: Make `/visuals` render the shared site footer so the landing page matches the rest of the portfolio.
**Outcome**: Completed
**Changes Made**:
- `app/visuals/page.tsx` - imported the shared `Footer` component and rendered it directly after the main visuals content, keeping the exhibition modal mounted last so its overlay behavior remains unchanged.
- `SESSION.md` - recorded the visuals footer pass and the targeted lint limitation for continuity.
**Notes**: This was a minimal composition fix aligned with the pattern already used by the homepage, photography page, about page, app pages, and case-study pages. The targeted verification command `npm run lint -- --file app/visuals/page.tsx` started but did not return a completion result in this environment after roughly 60 seconds.
**Next Steps**: Review `/visuals` locally or after deploy to confirm the footer spacing feels correct beneath the current full-screen artwork stage.

### 2026-03-28 - Make visuals artwork stage square on desktop
**Goal**: Reduce the height of the main artwork stage on `/visuals` and make the image container square so more of the artwork composition is visible.
**Outcome**: Completed
**Changes Made**:
- `app/visuals/VisualsPage.module.css` - changed the desktop artwork stage and card to a 1:1 aspect ratio, set the inner stage wrapper to fill that square, and kept the previous responsive stage behavior from `1024px` downward.
- `SESSION.md` - recorded the square-stage pass and the successful targeted lint result.
**Notes**: This was a focused visuals-layout adjustment layered on top of the earlier sizing pass. `npm run lint -- --file app/visuals/page.tsx` completed successfully with no ESLint warnings or errors.
**Next Steps**: Review `/visuals` locally and decide whether the current `42rem` square cap feels right or should come down slightly more.

### 2026-03-28 - Add newly uploaded photography assets to gallery inventory
**Goal**: Commit the latest uploaded photography files and ensure they are included in the photography gallery inventory.
**Outcome**: Completed
**Changes Made**:
- `data/photography.ts` - added metadata entries for `Arquitecture14`, `Landscape16` through `Landscape18`, and `Street19` through `Street24` so the uploaded files are part of the rendered photography set.
- `public/images/photography/architecture/Arquitecture14.webp`, `public/images/photography/landscape/Landscape16.webp`, `public/images/photography/landscape/Landscape17.webp`, `public/images/photography/landscape/Landscape18.webp`, and `public/images/photography/street/Street19.webp` through `Street24.webp` - added new uploaded photography assets.
- `SESSION.md` - recorded the asset upload pass for continuity.
**Notes**: An unrelated deleted file at `public/images/photography/Services_Photography.webp` was left out of the commit because the actual services asset in use remains `public/images/services/Services_Photography.webp`.
**Next Steps**: Review `/photography` after deploy to confirm the newly uploaded images appear in their respective categories.

### 2026-03-28 - Tighten homepage services CTA corner alignment
**Goal**: Make the “Start a project” button in the homepage services section sit cleanly on the bracket corner without the visible offset.
**Outcome**: Completed
**Changes Made**:
- `styles/globals.css` - replaced the service bracket’s manual positive bottom offset with a border-overlap alignment so the corner detail now meets the CTA border cleanly on desktop.
- `SESSION.md` - recorded the CTA alignment pass and the targeted lint limitation for continuity.
**Notes**: This was a one-line CSS fix focused on the desktop service-card CTA corner. The targeted lint command `npm run lint -- --file components/Services.tsx` launched but did not produce a completion result in this environment after roughly 30 seconds.
**Next Steps**: Review the homepage services section locally and confirm the bracket/button junction now reads flush at your preferred viewport width.

### 2026-03-28 - Show full photography category sets and remove parenthetical counts
**Goal**: Make `/photography` show every image available for each category instead of stopping at 12, and remove the parenthetical category counts from the UI.
**Outcome**: Completed
**Changes Made**:
- `app/photography/page.tsx` - removed the 12-image random-selection logic, switched each category to use its full image array from `PHOTOGRAPHY_IMAGES`, kept the mobile header count tied to the real category length, and removed the parenthetical counts from the mobile select options and the large category overlay title.
- `SESSION.md` - recorded the gallery update and the targeted lint limitation for continuity.
**Notes**: The on-disk photography folders still match the existing metadata inventory for numbered image files, so this pass only needed page-logic changes. The targeted lint command `npm run lint -- --file app/photography/page.tsx` launched but did not produce a completion result in this environment after roughly 30 seconds.
**Next Steps**: Review `/photography` locally and confirm the full category sets still feel balanced, especially the longer street category now that it renders all available images.

### 2026-03-28 - Reduce visuals artwork stage footprint
**Goal**: Make the main artwork container on `/visuals` smaller so it no longer occupies so much of the screen.
**Outcome**: Completed
**Changes Made**:
- `app/visuals/VisualsPage.module.css` - reduced the desktop artwork stage footprint by capping the card display width, lowering its vertical stage height, centering the stage within the right column, and preserving full-width behavior again below `1024px`.
- `SESSION.md` - recorded the sizing pass and the targeted lint limitation for continuity.
**Notes**: This was a small layout-tuning pass, not a redesign of the visuals page. The target was to keep the current composition but make the artwork feel less screen-dominant on desktop. The targeted lint command `npm run lint -- --file app/visuals/page.tsx` launched but did not produce a completion result in this environment after roughly 30 seconds.
**Next Steps**: Review `/visuals` locally and decide whether the stage should come down one more step from `42rem` or stay at this smaller editorial size.

### 2026-03-28 - Align Overflow decision-rationale table copy
**Goal**: Make the text in the decision-rationale table on `/apps/overflow` align more cleanly across headers and body cells.
**Outcome**: Completed
**Changes Made**:
- `app/apps/overflow/OverflowLanding.tsx` - added explicit left/top alignment classes to the decision-rationale header row and each body cell so the table no longer relies on implicit grid alignment behavior.
- `SESSION.md` - recorded the UI alignment pass for continuity.
**Notes**: This was a presentational-only adjustment layered on top of the same-day Overflow cleanup. The targeted lint command `npm run lint -- --file app/apps/overflow/OverflowLanding.tsx` was retried and again did not produce a completion result in this environment after roughly 30 seconds.
**Next Steps**: Check `/apps/overflow` locally and confirm the decision-rationale table now reads as consistently aligned at your target desktop width.

### 2026-03-28 - Remove Overflow case study notes section
**Goal**: Remove the “Open case study notes” accordion from the `/apps/overflow` landing page.
**Outcome**: Completed
**Changes Made**:
- `app/apps/overflow/OverflowLanding.tsx` - removed the case-study notes section entirely and deleted the now-unused `PRACTICAL_QUESTIONS` constant that only fed that accordion.
- `SESSION.md` - recorded the removal and the repeated targeted lint limitation for continuity.
**Notes**: This was a minimal content-removal pass only; the surrounding page structure was left intact. The targeted repo verification command `npm run lint -- --file app/apps/overflow/OverflowLanding.tsx` launched but did not produce a completion result in this environment after roughly a minute.
**Next Steps**: Review `/apps/overflow` locally and confirm the transition from “Decision rationale” straight into the private-beta close still feels intentional on desktop and mobile.

### 2026-03-27 - Redesign homepage selected projects carousel into a coverflow split card
**Goal**: Make the homepage selected-projects carousel feel less bland by removing the boxed text panel, enlarging the imagery, and turning the strip into a more polished looping carousel with peeking side cards and circular motion.
**Outcome**: Completed
**Changes Made**:
- `components/SectionCards.tsx` - replaced the scroll-snap strip with a looped index-driven carousel, added keyboard and swipe navigation, made inactive side cards advance into focus before navigation, tightened the project copy, and rewired the cards into a split editorial text/image layout.
- `components/SectionCards.module.css` - rebuilt the section-card styling into a larger cream-toned split card with direct text-on-surface layout, stronger typography, full-height imagery, coverflow-style depth/rotation, side peeks, calmer controls, and reduced-motion-safe transitions.
- `SESSION.md` - recorded the carousel redesign and the verification limitations for continuity.
**Notes**: This pass intentionally moved away from the previous dark overlay card treatment because the boxed glass panel was making the component feel generic. The new carousel is designed to read like a looping coverflow rather than a simple linear slider, but it still needs an in-browser visual pass because local script checks and localhost boot both stalled again in this environment.
**Next Steps**: Review the homepage locally on desktop and mobile, focusing on side-card peek amount, title sizing, swipe feel, and whether the new cream/editorial treatment fits the rest of the homepage.

### 2026-03-22 - Add repo-level UI UX Lead agent workflow
**Goal**: Create a durable repo-level UX/UI agent entry point so future design work consistently routes through the strongest design skill stack.
**Outcome**: Completed
**Changes Made**:
- `plugins/portfolio-tools/skills/ui-ux-lead/SKILL.md` - added a new orchestration skill that makes `ui-ux-pro-max` the required core of UI work and pairs it with the project design skills.
- `plugins/portfolio-tools/agents/ui-ux-lead.md` - added a reusable UX/UI lead agent prompt describing when and how to invoke the workflow.
- `AGENTS.md`, `.cursor/rules/ui-ux-design.mdc`, `.cursor/rules/general.mdc` - wired the new `ui-ux-lead` workflow into the repo's default UI instructions so future agents treat it as the first stop for design-heavy tasks.
**Notes**: This creates the strongest repo-supported default trigger path available in the current setup. It does not guarantee that every external client will auto-spawn a separate sub-agent, but it does make the high-level UX/UI workflow the documented default for future AI work.
**Next Steps**: Use `ui-ux-lead` as the first entry point for the next substantial UI task and refine the skill if any friction shows up in real use.

### 2026-03-22 - Reframe Overflow landing page into a progressive-reveal product story
**Goal**: Reduce text density on the Overflow portfolio page and turn the case study into a more visual, sticky-device-led product story without losing clarity.
**Outcome**: Completed
**Changes Made**:
- `app/apps/overflow/OverflowLanding.tsx` - replaced the evenly weighted long-form chapter layout with a lighter structure: tighter hero, snapshot strip, sticky desktop walkthrough, tap-based mobile beat switcher, compact week-flow section, terse decision rationale table, optional case-study notes accordion, and a simpler beta close.
- `SESSION.md` - recorded the new UX reframe pass and noted that the repo-level checks still did not return in this environment.
**Notes**: The redesign now uses one persistent phone stage as the primary storytelling device and moves deeper rationale into collapsible notes so the default reading path feels curated rather than dumped. Existing screenshots were reused, so the strongest remaining proof gap is still the lack of an active in-workout screen and a broader progress-overview screen.
**Next Steps**: Review `/apps/overflow` locally on desktop and mobile, paying special attention to sticky scroll behavior, tap switching on mobile, and whether the screenshot balance now feels strong enough without additional assets.

### 2026-03-22 - Redesign Overflow landing page into a product case study
**Goal**: Replace the mood-led Overflow teaser page with a clearer, more explanatory product case study that explains what the app is, how it works, and why the product decisions matter.
**Outcome**: Completed
**Changes Made**:
- `app/apps/overflow/OverflowLanding.tsx` - rewrote the page architecture into a case-study flow with a clearer hero, product rationale, system map, five core product chapters, a weekly-flow narrative, concrete decision rationale, and a stronger beta close using the existing screenshot set.
- `app/apps/overflow/page.tsx` - updated metadata so the route now reads as a case study rather than a generic app teaser in search/social surfaces.
**Notes**: The new page now uses Overflow-aligned warm product tokens and sentence-case editorial hierarchy instead of the old all-caps teaser style. The best available screenshots in the repo cover Today, Create, Schedule, Calendar, and Milestones, but there is still no dedicated active-session or broader progress-overview screenshot in this workspace.
**Next Steps**: Review `/apps/overflow` locally on desktop and mobile, then decide whether to capture one active workout/session screenshot and one progress-overview screenshot to deepen the proof layer further.

### 2026-03-15 - Recover missing Remoria case study images
**Goal**: Restore the missing Remoria case-study images if they were still recoverable from the local workspace or git history.
**Outcome**: Completed
**Changes Made**:
- `public/images/case-studies/remoria/hero/hero.webp` - restored from local git history so the Remoria hero image resolves again.
- `public/images/case-studies/remoria/approach/approach-1.webp` and `public/images/case-studies/remoria/approach/approach-2.webp` - restored the missing approach images used in the case study narrative.
- `public/images/case-studies/remoria/gallery/gallery-1.webp` through `public/images/case-studies/remoria/gallery/gallery-4.webp` - restored the missing gallery assets used by the Remoria gallery rows.
**Notes**: The missing files had been removed from the current tree but were still present in local git history, so they were recoverable without changing the Remoria content definitions. The currently referenced Remoria image set now resolves fully on disk.
**Next Steps**: Open the Remoria case study locally and confirm the restored hero, approach, and gallery images render as expected.

### 2026-03-15 - Remove film strip squares from case study detail pages
**Goal**: Remove the decorative side squares showing on the individual film/case-study landing pages.
**Outcome**: Completed
**Changes Made**:
- `app/case-studies/ai-sports/page.tsx` - removed the `FilmStrip` render so the left/right sprocket-square decorations no longer appear on the AI Sports case study page.
- `app/case-studies/remoria/page.tsx` - removed the `FilmStrip` render so the same side decorations no longer appear on the Remoria case study page.
**Notes**: The square markers came from the shared `FilmStrip` decorative component, but the smallest coherent fix was to stop rendering it on the affected individual pages rather than altering broader case-study styling.
**Next Steps**: Review the two case-study pages locally to confirm the page edges now feel cleaner without those fixed-position decorations.

### 2026-03-14 - Refresh page-level SEO metadata
**Goal**: Improve search result snippets by adding stronger English meta descriptions for public pages and fixing page titles that could inherit the site suffix twice.
**Outcome**: Completed
**Changes Made**:
- `app/layout.tsx` - rewrote the homepage metadata description and aligned the root Open Graph/Twitter descriptions with the new SEO copy.
- `app/about/layout.tsx`, `app/photography/layout.tsx`, `app/visuals/layout.tsx`, `app/case-studies/layout.tsx`, `app/privacy/layout.tsx`, `app/terms/layout.tsx` - replaced generic descriptions with unique page-level snippets written for search results.
- `app/apps/page.tsx`, `app/apps/overflow/page.tsx`, `app/apps/[slug]/page.tsx`, `app/case-studies/ai-sports/layout.tsx`, `app/case-studies/remoria/layout.tsx` - improved descriptions, added canonical/Open Graph/Twitter metadata where missing, and normalized page titles so they work cleanly with the root title template.
**Notes**: The `seo-optimizer` and `nextjs-app-router` skills referenced in repo guidance were not available on disk, so the work followed the existing Next.js metadata pattern directly. Public-page descriptions were kept in English and tuned to roughly 140-180 characters.
**Next Steps**: Redeploy and inspect a few live pages with browser devtools or Search Console to confirm the updated descriptions and titles are present in the rendered HTML.

### 2026-03-14 - Reduce platform fingerprints in public site output
**Goal**: Confirm whether the live site still exposed Webflow traces and remove any remaining platform-identifying output that made the site feel less custom-built.
**Outcome**: Completed
**Changes Made**:
- `app/layout.tsx` - moved viewport settings into Next's typed `viewport` export and removed the manual `<meta name="viewport">` to avoid duplicate viewport tags in production HTML.
- `next.config.js` - disabled the `x-powered-by` header so production no longer advertises Next.js directly.
- `app/about/layout.tsx` - replaced the stale `https://yourdomain.com` fallback with the real production domain.
**Notes**: Live inspection of `https://www.raulmermans.com` showed no Webflow traces at all. The public site is clearly serving Next.js markup and headers, so the “Webflow” read appears to be inference rather than an explicit fingerprint. `npm run type-check` and `npm run lint` were launched but did not return a result in this environment.
**Next Steps**: Redeploy and recheck the live headers/source. If an external LLM still says “Webflow,” treat that as heuristic misclassification unless it can point to a concrete Webflow marker.

### 2026-03-14 - Prepare IONOS deployment workflow
**Goal**: Add a GitHub Actions workflow that can deploy the site to IONOS Hosting Plus over SFTP and document the migration risk from Railway.
**Outcome**: Partial
**Changes Made**:
- `.github/workflows/deploy.yml` - added a push-to-main deployment workflow that installs dependencies, builds the app, preserves `.htaccess`, and deploys `out/` over SFTP using delta sync.
- `TASKS.md` - added follow-up work to convert the app to static export for IONOS Hosting Plus.
**Notes**: The workflow is ready for the SFTP side, but the repo still is not compatible with static export because it uses `middleware.ts`, route handlers in `app/api/*`, and default `next/image` optimization.
**Next Steps**: Convert the app to static export or keep the server-side features on Railway and use IONOS only for a truly static version.

### 2026-03-14 - Correct IONOS static deploy output
**Goal**: Make the GitHub Actions deploy upload the built static export instead of the repository source and add basic static-hosting support for IONOS.
**Outcome**: Partial
**Changes Made**:
- `.github/workflows/deploy.yml` - now checks out the repo, sets up Node.js 20, runs `npm ci`, runs `npm run build`, verifies `out/`, and uploads `./out/` to IONOS over SFTP.
- `next.config.js` - added `trailingSlash: true` and enabled `images.unoptimized` for static export hosting.
- `public/.htaccess` - added Apache-friendly static hosting defaults for index resolution, 404 handling, and asset caching.
**Notes**: Local verification still did not complete cleanly. `NEXT_PUBLIC_SITE_URL=https://www.raulmermans.com npm run build` timed out after 60 seconds in this environment without creating `.next/` or `out/`.
**Next Steps**: Isolate why `next build` stalls before output generation and remove or adapt any remaining static-export blockers.

### 2026-03-13 - Preserve full-frame photography images in editorial columns
**Goal**: Keep the photography landing in a strong two-column editorial layout while showing the full image instead of cropping it.
**Outcome**: Completed
**Changes Made**:
- `data/photography.ts` - added explicit width/height metadata for every photography asset so the gallery can render true image ratios with better layout stability.
- `app/photography/page.tsx` - switched the gallery from `fill`/crop rendering to intrinsic image sizing, reordered selections into a more editorial sequence based on natural aspect ratios, and delayed adjacent-category prefetching so the initial page load gets bandwidth first.
- `styles/globals.css` - replaced ratio-forcing card classes with lighter editorial frame treatments so images stay fully visible while the two-column layout still feels designed.
**Notes**: This pass prioritizes full-image visibility and faster perceived load over the previous crop-heavy cover treatment. `npm run type-check` and `npm run lint` both launched but remained running without returning a result in this environment.
**Next Steps**: Review `/photography` locally and decide whether mobile should stay single-column or also move to a two-column variant.

### 2026-03-13 - Optimize photography landing gallery flow
**Goal**: Make the photography landing load images faster, remove awkward gaps between images, and keep the gallery feeling editorial instead of random.
**Outcome**: Completed
**Changes Made**:
- `app/photography/page.tsx` - replaced the old featured-image/nth-child sizing logic with a deterministic editorial pattern, switched gallery images to `fill`, added blur placeholders, tuned `sizes`/quality/priority, and reduced adjacent-category prefetching work.
- `styles/globals.css` - removed the old span-all featured masonry behavior, mapped the photography gallery to explicit aspect-ratio classes, tightened vertical spacing, sped up reveal/loading states, and simplified the mobile stack to a cleaner single-column editorial flow.
**Notes**: `npm run type-check` completed successfully. `npm run lint` launched `next lint` but did not return a usable result in this environment, consistent with earlier sandbox behavior.
**Next Steps**: Review the photography page locally on desktop and mobile to confirm the new cadence feels right and that the first few images load noticeably faster.

### 2026-03-13 - Optimize homepage interaction fluidity
**Goal**: Improve perceived smoothness across the homepage without redesigning the site.
**Outcome**: Completed
**Changes Made**:
- `app/page.tsx` - simplified homepage reveal handling to a single observer-based pass, removing repeated timeout setup and scroll-based reveal scanning.
- `components/HeroBackground.tsx` - paused the hero animation when offscreen, reused cached bounds for pointer math, and avoided unnecessary work every frame.
- `components/MagneticButton.tsx` - replaced mousemove-driven React state updates with Framer Motion values/springs so CTA motion stays smooth without re-rendering on each pointer move.
**Notes**: `npm run type-check` completed. `npm run lint` did not complete in the sandboxed environment and should be rerun locally.
**Next Steps**: Validate the homepage locally for smoother scroll/hover feel, especially around the hero and the first screen-to-content transition.

### 2026-03-13 - Refine homepage section carousel controls
**Goal**: Fix the oversized homepage section carousel nav, keep arrows visible on both sides, make the carousel start on card 1, and remove wheel-driven horizontal scrolling.
**Outcome**: Completed
**Changes Made**:
- `components/SectionCards.tsx` - reset the carousel to the first card on mount, computed the scroll step from the live card width/gap, and renamed the nav modifiers to avoid a global `.next` class collision.
- `styles/globals.css` - reduced the carousel controls to simple side arrows, increased arrow contrast/size, kept disabled arrows visible, and centered the first/last cards with dynamic edge padding.
**Notes**: The giant black pill came from the carousel button using the generic `next` class, which inherited the global “Next Project” section styles. The wheel-to-horizontal-scroll handler was removed for better vertical page scrolling. `npm run lint` failed in this environment with `ERR_INVALID_PACKAGE_CONFIG` from `next` under Node.js `v24.13.0`, and `npm run type-check` did not complete in the sandbox.
**Next Steps**: Reopen the homepage locally and confirm vertical page scroll feels normal, card 1 is centered on load, and the side arrows are easier to see.

### 2026-03-22 - Tighten Overflow product story copy and interaction
**Goal**: Make the `/apps/overflow` product story feel less choppy, improve keyboard access to the screen selector, and cut redundant copy so the page reads more like a sharp portfolio case study.
**Outcome**: Completed
**Changes Made**:
- `app/apps/overflow/OverflowLanding.tsx` - converted the story screen selector into a real tab interface with keyboard navigation, added a lighter screen-swap transition, removed redundant labels, and compressed hero/story/week/decision/CTA copy.
- `SESSION.md` - recorded the interaction and copy-tightening pass for continuity.
**Notes**: This pass was guided by current live references rather than a structural rewrite. Useful reference patterns came from Seif Radwane and Lindi Wheaton for scannable case-study structure, Not Boring Weather for short media-first feature storytelling, Gentler Streak for calm product framing, and Sharon Lee’s Candid case study as a reminder to avoid long undifferentiated text blocks.
**Next Steps**: Review `/apps/overflow` in a browser and decide whether the next pass should focus on stronger proof assets or one more visual polish pass.

### 2026-03-22 - Replace sticky Overflow story device with per-beat screens
**Goal**: Stop using a desktop sticky phone that swaps screens while the copy scrolls, and instead pair each product beat with its own screenshot directly beside the text.
**Outcome**: Completed
**Changes Made**:
- `app/apps/overflow/OverflowLanding.tsx` - removed the desktop sticky-phone/scrollytelling pattern from the product story section and replaced it with stacked beat rows, each showing its own screen and accompanying copy side by side.
- `SESSION.md` - recorded the layout simplification for continuity.
**Notes**: This is a calmer, more literal presentation model. Mobile still uses the compact tabbed selector; desktop now behaves more like a straightforward product case study where proof and explanation stay attached.
**Next Steps**: Review the desktop product story in-browser and check whether the phone width, row spacing, and screenshot annotation density still need tuning.

### 2026-03-22 - Make shared header readable across all pages
**Goal**: Ensure the shared header remains visible against varying page backgrounds, especially light hero sections where the logo/nav were getting lost.
**Outcome**: Completed
**Changes Made**:
- `components/Header.module.css` - added a shared translucent contrast surface behind the desktop logo and nav, tightened nav spacing into a pill container, and reduced the long fade-in delay so the header appears quickly.
- `SESSION.md` - recorded the header visibility pass for continuity.
**Notes**: This is a shared-header fix, not a per-page override. The header now reads as a consistent floating navigation layer instead of inheriting contrast problems from individual page backgrounds.
**Next Steps**: Check the header on both light pages and darker gallery/case-study pages to confirm the new surface feels visible without feeling too heavy.

### 2026-03-22 - Restore depth to homepage section cards
**Goal**: Bring the homepage section cards back to a richer, less-flat presentation closer to the earlier dimensional treatment.
**Outcome**: Completed
**Changes Made**:
- `components/SectionCards.module.css` - strengthened card shadow stacks, added a subtle highlight shell, deepened the image-to-content transition, and restored a darker raised content panel so each card reads as a layered object again.
- `SESSION.md` - recorded the section-card styling pass for continuity.
**Notes**: This was a localized CSS-only adjustment to the shared homepage carousel. No structure or interaction logic changed.
**Next Steps**: Review the homepage carousel in-browser and tune panel opacity or hover lift if the restored depth feels too heavy on smaller screens.

### 2026-03-22 - Make header immediately visible with stronger contrast
**Goal**: Ensure the shared header is visibly readable on all pages by removing the hidden-by-default fade treatment and increasing contrast against light backgrounds.
**Outcome**: Completed
**Changes Made**:
- `components/Header.module.css` - removed the initial hidden/fade-in behavior from the fixed header elements, raised the shared header z-index, and increased the opacity, border strength, and text contrast of the logo/nav/menu button surfaces.
- `SESSION.md` - recorded the visibility-focused header pass for continuity.
**Notes**: This is a shared-header styling fix, not a page-specific override. The nav should now appear immediately and stay legible regardless of the hero/background tone behind it.
**Next Steps**: Check the homepage and one darker page in-browser to confirm the stronger contrast feels visible without looking overly heavy.

### 2026-03-22 - Remove optional-depth label from Overflow notes card
**Goal**: Simplify the case-study notes accordion header by removing the extra `Optional depth` eyebrow label.
**Outcome**: Completed
**Changes Made**:
- `app/apps/overflow/OverflowLanding.tsx` - removed the eyebrow label above `Open case study notes` and tightened the heading spacing so the accordion header stays balanced.
- `SESSION.md` - recorded the small cleanup for continuity.
**Notes**: This is a presentation-only cleanup. The notes accordion content and behavior are unchanged.
**Next Steps**: Review the Overflow notes section in-browser and decide if the button label should also be shortened further.

### 2026-03-22 - Make Overflow week-flow cards symmetrical
**Goal**: Even out the four week-flow cards so they share the same visual height and bottom alignment.
**Outcome**: Completed
**Changes Made**:
- `app/apps/overflow/OverflowLanding.tsx` - made each reveal wrapper stretch to full grid height, turned the week-flow cards into full-height flex columns, and pinned the bottom tag row with `mt-auto` so all four cards align.
- `SESSION.md` - recorded the week-flow symmetry pass for continuity.
**Notes**: This is a layout-only adjustment to the week-flow section. Copy and interaction remain unchanged.
**Next Steps**: Review the week-flow row in-browser and decide whether the card minimum height should be trimmed slightly once the final content is locked.

### 2026-03-22 - Soften Overflow screen annotation boxes
**Goal**: Make the callout boxes around the product-story screens less invasive while keeping them useful.
**Outcome**: Completed
**Changes Made**:
- `app/apps/overflow/OverflowLanding.tsx` - reduced the callout box width, padding, blur, shadow, border strength, and text scale inside `AnnotatedPhone` so the annotations compete less with the screens.
- `SESSION.md` - recorded the annotation softening pass for continuity.
**Notes**: This is a presentation-only refinement to the story annotations. Screen content and callout copy remain unchanged.
**Next Steps**: Review the story screens in-browser and decide whether the callouts should stay visible at `xl` only or be pushed to `2xl` if they still feel too strong.

### 2026-03-22 - Clean up Overflow hero balance and clipping
**Goal**: Fix visible hero issues in the Overflow case-study screenshot, especially the clipped floating pills behind the phone and the oversized left column.
**Outcome**: Completed
**Changes Made**:
- `app/apps/overflow/OverflowLanding.tsx` - removed the two floating hero pills around the phone, tightened the hero grid proportions, reduced the hero copy width, slightly reduced the heading scale, and narrowed the phone column so the layout reads cleaner.
- `SESSION.md` - recorded the hero cleanup pass for continuity.
**Notes**: This is a presentation-focused hero refinement. The core hero content and CTA structure remain unchanged.
**Next Steps**: Review the hero in-browser and decide whether the phone should shift slightly higher or the headline should be tightened one step further.

### 2026-03-22 - Refine homepage section cards with stronger depth
**Goal**: Give the homepage section cards more presence and refinement through stronger layering, clearer panel separation, and working depth behavior.
**Outcome**: Completed
**Changes Made**:
- `components/SectionCards.tsx` - added the literal hook classes needed by the existing depth and reveal logic so the carousel can actually apply its transforms and visibility behavior.
- `components/SectionCards.module.css` - increased the card scale and elevation, turned the lower content area into an inset floating panel, strengthened shadows and internal highlights, refined typography, and upgraded the CTA treatment for a more premium feel.
- `SESSION.md` - recorded the section-card refinement pass for continuity.
**Notes**: This remains a shared-component change. The carousel structure is unchanged, but the cards now read as more deliberate objects and the 3D/depth logic finally has matching DOM hooks.
**Next Steps**: Review the homepage carousel in-browser and decide whether the new depth should be pushed slightly further or held here to avoid over-styling.

### 2026-03-22 - Make photography category switching obvious on mobile
**Goal**: Make the photography category selector clearly discoverable and usable on mobile where the fixed bottom category bar was easy to miss.
**Outcome**: Completed
**Changes Made**:
- `app/photography/page.tsx` - added a mobile-only photography header with a native category select for `Landscape`, `Architecture`, and `Street`.
- `styles/globals.css` - styled the new mobile select control, expanded the mobile photography header, adjusted gallery top padding, and hid the old mobile bottom category bar so there is one clear selector on small screens.
- `SESSION.md` - recorded the mobile photography selector pass for continuity.
**Notes**: Desktop category navigation remains unchanged. On mobile there is now a single obvious control near the top of the page instead of relying on a bottom bar.
**Next Steps**: Review `/photography` on a real phone viewport and decide whether the mobile header should stay compact or become sticky with a slightly stronger surface.

### 2026-03-22 - Restore mobile photography context and reduce header friction
**Goal**: Bring the mobile photography page closer to the desktop experience by keeping the category control visible without creating a dead fixed band at the top.
**Outcome**: Completed
**Changes Made**:
- `app/photography/page.tsx` - replaced the generic mobile `Gallery` title with the active category name and photo count, and made the select options more explicit.
- `styles/globals.css` - converted the photography mobile header from a fixed strip into a sticky in-flow control card, tightened the gallery top offset, and added better category/count hierarchy for mobile.
- `SESSION.md` - recorded the mobile parity follow-up.
**Notes**: The highest-value mobile issues were the missing active-category context and the risk of the new selector competing with the shared top header. The mobile filter now behaves more like a sticky control surface under the RM/menu chrome.
**Next Steps**: Check `/photography` in a real mobile viewport and tune the sticky offset if the RM/menu pills feel too close to the photography control card.

### 2026-03-28 - Polish visuals landing, services CTA, and Overflow showcase details
**Goal**: Clean up several presentation issues across the site: tighten the visuals landing intro, remove its dot pagination, fit the Services CTA into its corner treatment, and refine the Overflow case-study reveal/table behavior.
**Outcome**: Completed
**Changes Made**:
- `app/visuals/VisualsPage.module.css` - narrowed the desktop intro column on `/visuals`, reduced its text measure, and removed the carousel dot indicator styles.
- `app/visuals/page.tsx` - removed the dot/pill pagination UI from the visuals landing card display.
- `styles/globals.css` - adjusted the homepage Services corner CTA so the bracket and button sit together more cleanly.
- `app/apps/overflow/OverflowLanding.tsx` - triggered reveal blocks earlier to avoid blank-looking showcase gaps and aligned the decision-rationale table text and column rhythm.
- `SESSION.md` - recorded this multi-surface polish pass for continuity.
**Notes**: The Overflow brand-guidance skill was also rewritten locally in `~/.codex` so it is repo-specific and no longer references outside repositories, but that change is not versioned in this repo.
**Next Steps**: Review `/visuals`, the homepage Services section, and `/apps/overflow` in-browser to confirm the spacing and alignment feel right in practice.

### Session Template
```markdown
### YYYY-MM-DD - Brief Description
**Goal**: What was attempted
**Outcome**: Completed | Partial | Blocked
**Changes Made**:
- file1.ts - what changed
- file2.tsx - what changed
**Notes**: Important context for future sessions
**Next Steps**: What to do next
```

---

## How to Use This File

### At Session Start
1. Read this file to understand current state
2. Check `TASKS.md` for the task list
3. Update "Current Focus" with what you're working on

### During Session
1. Update "Pending Decisions" when you need user input
2. Update "Blockers" if you hit issues
3. Note important context that shouldn't be lost

### At Session End
1. Update "Status" (Idle, Paused, etc.)
2. Add a session entry under "Recent Sessions"
3. Clear completed items from "Active Work"
4. Update `TASKS.md` with completed/new tasks

### Key Principle
**Write what your future self (or another AI) needs to know to continue seamlessly.**
