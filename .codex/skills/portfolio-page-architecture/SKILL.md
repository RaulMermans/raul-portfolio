---
name: portfolio-page-architecture
description: Define or review the information architecture, hierarchy, section sequence, and shared UX of Raúl Mermans portfolio landing pages, including home, about, services, indexes, app pages, photography, and visuals. Use after the portfolio experience system has classified a non-case-study public route.
---

# Portfolio page architecture

Use this skill for a page that introduces a body of work, a service, a practice, or a collection. It gives landing pages a repeatable reading path without turning them into duplicate templates.

First read `$portfolio-experience-system` and [references/page-contracts.md](references/page-contracts.md). Use the exact contract for the page family. Then apply `$impeccable-interface` before implementation and `$verify-rendered-ui` before completion.

## Shared landing contract

Every public landing answers these questions in this order, with the lightest credible structure:

1. What is this page about?
2. Why should this visitor keep reading or inspect this collection?
3. What proof, work, or material answers that claim?
4. What is the next useful path?

Use a visible intro: eyebrow, H1, and compact lede. Do not hide the only H1 just because the page leads with imagery. A gallery may be the primary evidence, but not the page's only introduction.

The page can be visually calm or image-led. It still uses the shared type roles, gutters, chapter rhythm, control geometry, focus state, and mobile rules. A different composition is not permission for a different visual system.

## Section rules

- A section exists to move the reader from one question to the next. Combine sections that merely repeat a generic title and paragraph.
- Each major section has an H2 and sufficient orienting copy before cards, a gallery, or a dense interface.
- Put the strongest evidence immediately after the claim it proves. Do not collect all screenshots at the bottom as decoration.
- Keep a collection index scannable: title, a small amount of context, then clearly labelled entries. Filters appear only when the collection is large enough to need them.
- End with one clear continuation: a related collection, a relevant case study, an inquiry route, or a return to the home page.

## Completion gate

Confirm that the page family contract fits the route, its H1 is visible, its sections advance a reading path, and shared interfaces are reused rather than recreated. Inspect desktop plus 390px and a longest locale string.
