---
name: portfolio-art-direction
description: Direct, select, crop, sequence, caption, and implement imagery, screenshots, motion, mockups, diagrams, galleries, and visual evidence for Raúl Mermans portfolio pages. Use when a public route adds or materially changes visual media or its presentation.
---

# Portfolio art direction

Visual personality comes from the work and the sequence of evidence, not from a competing UI theme. Start by naming the role of each asset: **atmosphere**, **proof**, **process**, **context**, or **navigation**. Remove or replace an asset that has no role.

Read `$portfolio-experience-system` first. Use `$portfolio-case-study-system` for a case study and `$portfolio-page-architecture` for another landing page. Use `$impeccable-interface` to prevent the presentation layer from becoming decorative interface noise.

## Asset selection and order

- Lead with the most informative image, screen, or object. A hero may establish mood, but it must still make the subject more legible.
- Sequence visual evidence like an argument: establish context, show the key decision or state, then reveal details only where they add information.
- Alternate scale deliberately: a contextual frame, a usable or material detail, then a result in context. Do not repeat near-identical crop after near-identical crop.
- Keep distinct media types distinct. A product interface, campaign mockup, archival photograph, and generated visual should not be dressed with the same generic browser chrome.
- Use a project accent in annotations, diagram keys, or visual dividers only. Do not wash every image, surface, or heading in it.

## Presentation rules

- Use `.ui-media` as the base frame. Product screens use `.ui-media--contained`; photographic or campaign evidence may use a deliberate crop; full-width media is reserved for a narrative break that earns it.
- Preserve a product screen's usable frame, readable UI, and aspect ratio. Do not crop a product screen into an aesthetic rectangle or float it inside a fake dashboard.
- Frames, borders, and shadows establish inspectability. Use them quietly. Do not stack a frame, gradient, blur, glass effect, device mockup, and shadow around one asset.
- Captions tell the reader what the visual demonstrates. They are not filenames, repeated alt text, or decorative prose.
- Meaningful media has concise, factual alt text. Decorative media uses empty alt text. Never repeat a nearby caption word-for-word.
- Essential text does not sit over a variable image unless contrast passes over the actual pixels at every target width. Prefer separate text and media layers.

## Motion and interaction

- Motion may reveal a state change, a sequence, or an interactive artifact. It must not be the only means of understanding an image or case-study chapter.
- Respect reduced motion. Avoid scroll-linked parallax on case-study heroes unless it has a clear reading benefit and a static equivalent.
- Galleries and lightboxes need keyboard operation, focus return, Escape dismissal, labelled controls, and usable phone-sized targets.

## Review gate

At desktop and 390px, check crop, subject, caption, alt text, loading behaviour, contrast, and overflow. Ask whether each asset makes an evidence claim more credible. If not, remove it or demote it to optional atmosphere.
