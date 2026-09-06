---
name: portfolio-experience-system
description: Route any Raúl Mermans portfolio landing-page, case-study, visual-system, or content change through the shared brand, UX, art-direction, and quality contracts. Use before creating or materially changing a public route, shared visual primitive, or user-facing portfolio copy.
---

# Portfolio experience system

This is the entrypoint for public portfolio work. It keeps every route recognisably part of the same site while allowing the work itself to supply the personality.

`styles/design-system.css` is the implementation source of truth. [references/foundation-contract.md](references/foundation-contract.md) explains how to use it. If the reference and CSS differ, update the reference or CSS in the same change. Do not create a third interpretation in route CSS.

## Start with classification

State the route, audience, primary reader action, page family, and whether the work changes shared foundations or only local evidence. Then use this routing table.

| If the work is... | Read and apply... |
| --- | --- |
| Any public visual route or shared frontend primitive | `$portfolio-design-system`, `$impeccable-interface`, `$verify-rendered-ui` |
| A landing, index, service, about, app, photography, or visuals page | `$portfolio-page-architecture` |
| A case-study index or individual case study | `$portfolio-case-study-system` |
| New, replaced, or materially reframed imagery, motion, video, mockups, or gallery work | `$portfolio-art-direction` |
| Repeated cards, proof panels, or feature grids | `$align-card-grids` |
| Exact visual heading lines or centred editorial headings | `$author-section-headings` |
| Responsive work, or any full route | `$mobile-first-ui` |
| User-facing copy or metadata | `$editorial-language`, then `$no-ai-slop` and `$humanizer` in embedded mode |

Do not skip a routed skill because a route has local CSS. Local CSS is an implementation detail, not a separate art direction.

## Non-negotiable foundation

- The portfolio owns the reading system: warm cream or deliberate ink punctuation, Bebas Neue display type, DM Sans utility text, Space Mono labels, and Source Serif editorial copy.
- The font foundation is locked to the local assets loaded by `components/SiteDocument.tsx`; a change to family, source, or fallback order requires the user's explicit decision plus rendered desktop and mobile checks. Motion may never make the first viewport's name, H1, summary, or primary actions temporarily unreadable.
- Every page has one visible, semantic H1. A page announces its subject before presenting a dense gallery, product visual, or navigation choice.
- Every major section has an orienting H2, followed by the smallest amount of context needed to understand its content. H3s name evidence within that chapter.
- Use shared section, content-width, type, border, surface, spacing, and control tokens. A raw value is acceptable only for a genuinely local, evidence-specific need that cannot be expressed semantically.
- Controls are square. Pills are reserved for compact tags or filters, never primary navigation or CTA language.
- A project gets one scoped accent and its own evidence treatment. It does not get a new page canvas, display type, button language, spacing scale, or interaction model.
- An image, chart, or product screen must prove something, orient the reader, or establish an intentional visual pause. Decorative interface simulacra do not count as evidence.

## Delivery gate

Before declaring a page complete, answer all of these from the rendered route:

1. Can a first-time visitor name the page's subject and next sensible action in the first viewport?
2. Does the page follow the foundation contract without a local type, control, surface, or spacing system?
3. Does the project-specific treatment live in evidence and art direction, rather than reading/navigation infrastructure?
4. Are the H1, H2, H3, labels, body copy, media, captions, controls, focus states, and motion deliberate?
5. At 390px and a representative desktop width, does the route remain readable, reachable, and free of horizontal overflow?

If a durable decision changes, update the relevant skill, its referenced contract, and `styles/design-system.css` together. Record a pre-existing divergence as an audit finding instead of silently declaring it a new standard.
