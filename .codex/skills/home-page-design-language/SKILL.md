---
name: home-page-design-language
description: Use the Raúl Mermans home page as the canonical visual reference when implementing or reviewing its components, or when a routed portfolio experience task needs to validate shared typography, surface, hierarchy, and rhythm against the live home page.
---

# Home page design language

## Place in the system

`$portfolio-experience-system` is the public-route entrypoint. It routes landing pages, case studies, media, and interface review to their dedicated contracts. Use this skill as the live visual reference, not as a competing page-architecture system. The home page shows the foundation in practice; it does not require every other route to copy its layout.

Treat the home page as the canonical visual reference. Use `styles/design-system.css` for tokens and `components/Hero.module.css`, `components/HomeNarrative.module.css`, and the rendered home page for the visual baseline.

## Visual grammar

- Use warm cream as the default canvas and ink as the default reading color. Use inverse ink sections as deliberate punctuation, not a second page identity.
- Use `--font-heading` for display headings. Set it in uppercase with tight tracking and compact line-height. Do not introduce another display font.
- Use `--font-code` for eyebrows, labels, metadata, controls, counters, and technical notation. Keep it compact and letter-spaced.
- Use `--font-prose` for editorial reading copy and `--font-ui` for utility or interface copy.
- Use `--section-inline-padding`, `--section-block-padding`, and `--section-content-max` for page geometry. Do not introduce competing containers or arbitrary side padding.
- Use square controls (`--radius-button`) and restrained borders. Pill controls are reserved for compact tags and filters where an existing pattern already calls for them.
- Use `--accent` for the portfolio signal. A case study may add one scoped project accent, but it must not replace the portfolio foundation.
- Prefer a strong type-led statement, an evidence surface, then breathing room. Do not combine dense dashboards, floating cards, gradients, shadows, and decorative chrome in one section.

## Hierarchy contracts

### Page hero

- Use one semantic H1.
- Make the first viewport state the page subject immediately. Keep the title, proposition, and primary action readable without an interface mockup dominating the view.
- Follow the home hero order: mono eyebrow, display title, concise supporting copy, clear actions. A case study can use product evidence beside this content only when it proves a real state.

### Editorial sections

- Start with a mono eyebrow and a large uppercase H2. Keep the H2 on the same reading axis as the section content.
- Use `--text-3xl` or a bounded case-study display scale for major H2s. H3s use the next lower display scale. Do not make every heading the same size.
- Keep prose in a readable column. Editorial paragraphs use `--font-prose`, a 1.45 to 1.65 line-height, and a restrained measure.
- Use sequential H1, H2, and H3 semantics. Never use heading levels for visual size alone.

### Evidence and grids

- Use borders, cream surfaces, restrained contrast, and clear labels to make evidence inspectable.
- Repeated cards use a shared heading allowance on desktop and natural height in a mobile single column. Do not clip valid content.
- Alternate light and inverse sections only when the change clarifies the narrative. Do not alternate merely for visual variety.
- Give every visual a job: prove a product state, explain a system, compare records, or orient the reader. Remove ornamental interface simulations that duplicate surrounding text.

## Allowed personalization

Case studies may have one local mood through imagery, one project accent, and evidence-specific components. They still inherit the type families, core palette, heading hierarchy, section rhythm, button geometry, accessibility behavior, and mobile rules above.

Do not use a local theme to justify a different typography system, soft rounded dashboard language, excessive glass effects, a dark hero by default, or raw colors that duplicate existing tokens.

## Required workflow

1. Read the home page, `styles/design-system.css`, adjacent route styles, and one comparable case study before editing.
2. State the route, mobile behavior, and visual acceptance criteria.
3. Reuse tokens and shared primitives first. If a recurring need is missing, add it to the design system instead of creating a one-off value.
4. Audit the route for hierarchy, font role, palette, spacing, radius, card density, focus states, contrast, and overflow.
5. Use `$author-section-headings` for deliberate display-heading geometry, `$align-card-grids` for repeated cards, `$mobile-first-ui` for responsive changes, and `$verify-rendered-ui` before declaring visual completion.

## Mandatory audit gates

Before finishing any frontend change, verify:

- H1 and H2 use the display system, labels use mono, and long-form copy uses serif or UI text intentionally.
- The default surface, text, border, spacing, and button geometry come from portfolio tokens.
- A route-specific accent is scoped and has a documented role.
- Desktop and 390px layouts have no horizontal overflow, clipped text, inaccessible controls, or header collisions.
- Every readable text treatment passes its contrast requirement on the rendered surface.
- The changed route remains recognizably part of raulmermans.com beside the home page and a representative case study.

If an existing route breaks these rules, log it as an audit finding. Fix it in a consistency pass rather than creating a local exception.
