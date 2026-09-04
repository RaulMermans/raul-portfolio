# Portfolio experience system

This document is the human-readable counterpart to `$portfolio-experience-system`. It defines the durable brand and experience decisions that every public route inherits.

## The system in one sentence

The portfolio is an editorial reading environment for systems, creative work, products, and visual practice: warm, direct, typographic, evidence-led, and restrained.

## Source of truth

- **Implementation tokens and shared primitives:** `styles/design-system.css`
- **Routing entrypoint:** `.codex/skills/portfolio-experience-system/SKILL.md`
- **Landing-page structures:** `.codex/skills/portfolio-page-architecture/references/page-contracts.md`
- **Case-study structures:** `.codex/skills/portfolio-case-study-system/references/case-study-contracts.md`
- **Media rules:** `.codex/skills/portfolio-art-direction/SKILL.md`
- **Anti-generic-interface gate:** `.codex/skills/impeccable-interface/SKILL.md`

When a lasting visual decision changes, change its source of truth and this document in the same pull request. A route-specific stylesheet cannot redefine the system.

## Immutable foundation

| Decision | Contract |
| --- | --- |
| Canvas | Warm cream is the default. Ink sections punctuate the page rather than become a competing default. |
| Display type | Bebas Neue, uppercase, tight tracking, compact line-height. Used for semantic H1, H2, and H3 headings. |
| Editorial type | Source Serif for explanatory reading copy. |
| Utility type | DM Sans for UI and Space Mono for labels, metadata, controls, counters, and notation. |
| Type scale | Use named tokens only: `--text-xs` through `--text-hero`. |
| Geometry | Use section and content tokens. The shared content maximum is 86rem; editorial prose uses the 42rem prose measure. |
| Controls | Square corners, clear text labels, visible focus, 44px minimum touch targets. |
| Surface | Borders and quiet tonal contrast establish hierarchy. Cards are reserved for comparable/selectable units, not every paragraph. |
| Colour | Semantic palette tokens first. A case study gets one scoped accent only for local evidence and annotation. |
| Motion | Brief, purposeful, optional under reduced motion. It may clarify state but never carry required meaning. |

## Page language

Every public landing begins with a visible H1 and direct page subject. The normal sequence is eyebrow, display heading, short lede, evidence, and a relevant continuation. Major narrative changes get a mono eyebrow and an H2. H3s name evidence within a chapter.

Every route does not need the same number of sections or the same media treatment. It does need the same reading grammar: subject before spectacle, claim before proof, evidence near the decision it supports, and a clear next path.

## Page families

| Family | Required reading path |
| --- | --- |
| Home | Position, selected work, operating perspective, services/collaboration, contact. |
| Case-study index | Intro, accessible thumbnail collection, optional filter, continuation. |
| Service | Direct answer, context, deliverables, applications, process, related proof, contact. |
| About | Identity, evidence of practice, relevant context, operating model, routes into work, contact. |
| Product/app | Job, real product proof, workflow, boundary, action. |
| Photography/visuals | Practice statement, work selection, useful context, continuation. |
| Utility pages | Direct explanation, readable body, clear recovery path. |

## Case studies

All case studies share a spine: introduction, context, problem/decision, method and evidence, value, limitation, next work. Technical/product cases explain the workflow and guardrails. Creative/marketing cases explain the brief, premise, system, work in context, and effect. Hybrid cases choose one lead narrative rather than duplicating both.

The project can change its image mood, scoped accent, diagrams, proof modules, crop, and visual sequence. It cannot replace the typography system, default canvas, button language, chapter rhythm, navigation, focus states, or mobile behaviour.

## Media

Every asset has a job: atmosphere, proof, process, context, or navigation. Product screens keep their usable proportions; campaign and photographic material may crop deliberately. Captions say what a reader should notice. Meaningful visuals receive specific alt text; decorative visuals receive empty alt text. Essential text stays off variable image backgrounds unless measured contrast passes at each target width.

## Quality gates

A completed visual change must pass both a source and rendered review:

1. Reuse the named type, spacing, colour, surface, and control tokens.
2. Preserve semantic headings, meaningful labels, visible focus, keyboard access, reduced motion, and contrast.
3. Test the route and a related shared consumer at desktop and 390px. Check 360px for dense pages.
4. Verify no horizontal overflow, clipped content, header collision, inaccessible control, or unjustified local visual system.
5. Run `$impeccable-interface` and, for reader-facing copy, `$editorial-language`, `$no-ai-slop`, and `$humanizer`.

## Existing work to migrate

The shared primitives and case-study index now use this system. Older page-specific styles may still need route-by-route migration. Treat the following as an intentional audit queue, not permission to introduce exceptions:

- about, photography, visuals, and app detail pages;
- commercial/image-led case-study shells;
- legacy project-specific styles that hard-code typography, spacing, colour, rounded controls, or decorative UI treatment.

Migrate one page family at a time after rendering its current state and defining its relevant contract. Do not perform a blind global search-and-replace across project styles.
