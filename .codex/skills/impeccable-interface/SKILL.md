---
name: impeccable-interface
description: Audit and improve public portfolio UI so it feels authored, specific, restrained, accessible, and credible rather than generically AI-generated, template-led, or Dribbble-styled. Use for any landing page, case study, shared UI component, responsive layout, or visual review in this repository.
---

# Impeccable interface

An impeccable interface makes the work easier to understand and act on. It does not advertise that someone added design to it.

Read `$portfolio-experience-system` for a public route. Use `$editorial-language`, `$no-ai-slop`, and `$humanizer` when changing reader-facing copy. This skill governs interface behaviour and visual judgement; it does not invent a new brand direction.

## Diagnose before styling

Identify the reader's primary task, the one claim the section needs to make, the evidence that supports it, and the least visual machinery needed to show it. If the design cannot explain why an element exists, remove it before adding decoration.

## Reject generic interface tells

Do not introduce these as default styling moves:

- stacks of softly rounded cards, nested cards, pill CTAs, glass panes, ambient gradients, floating blobs, or shadow-only grouping;
- a dashboard-like metrics strip without a real comparison, source, unit, or reader decision;
- fake browser/device chrome around a screenshot that already proves the product;
- status chips, badges, arrows, and labels that duplicate the nearby heading or link;
- oversized hero space that hides the page subject and first useful evidence on a phone;
- motion that exists only to make a static composition feel busy;
- icon-only interactions without visible names where a reader needs to understand the action;
- arbitrary asymmetry, colour shifts, or typography variants used as a substitute for information hierarchy.

These are not absolute bans on the visual forms themselves. Use one only when it carries a real state, comparison, interaction, or project-specific reason, and make that reason legible in the result.

## Build with authored restraint

- Establish subject, hierarchy, and reading order before art direction.
- Use one dominant visual idea per section: typographic statement, evidence surface, image sequence, comparison, or a dark pause. Do not combine all of them.
- Let whitespace expose a hierarchy; do not fill it with labels, decorative rules, or cards.
- Make density a decision. Product and data evidence may be dense when it is readable. Introductory copy and navigation should remain calm.
- Make states obvious. Focus, hover, current selection, loading, failure, and success communicate through more than colour.
- Prefer real labels, direct verbs, and factual captions to clever microcopy or faux-confidence.
- Preserve meaningful imperfections in source material. Do not polish a candid visual, a rough prototype, or an honest limitation into generic luxury advertising.

## Interface quality gate

Before completion, inspect the rendered route and answer:

1. What is the visitor trying to understand or do here, and is that action apparent without scrolling through decoration?
2. Does every card, label, image treatment, animation, and control earn its place?
3. Could the page be mistaken for a generic SaaS, agency, or AI landing page? If yes, locate the generic pattern and replace it with evidence or simpler hierarchy.
4. Are content hierarchy, contrast, focus, semantics, touch targets, and reduced-motion behaviour complete?
5. At 390px, does the page preserve the same reading path instead of merely shrinking a desktop composition?

Report concrete findings and their fixes. Do not call a page "premium", "clean", or "modern" without naming the observed evidence.
