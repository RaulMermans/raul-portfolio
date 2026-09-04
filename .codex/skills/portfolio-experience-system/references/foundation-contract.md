# Foundation contract

Use this reference after `$portfolio-experience-system` has routed a public route. The canonical values live in `styles/design-system.css`; names below are the contract future code must consume.

## Brand grammar

| Role | Token and treatment | Use |
| --- | --- | --- |
| Canvas | `--surface-page` (warm cream) | Default page canvas. |
| Inverse punctuation | `--surface-inverse` (ink) | A deliberate change of pace, result, quote, or evidence moment. Never a second default theme. |
| Primary reading | `--text-primary` | Headings, body copy, controls, and essential information. |
| Secondary reading | `--text-secondary` | Supporting copy only when contrast passes on the rendered surface. |
| Signal | `--accent` | Focus, key action, and limited portfolio signal. A case study may add one scoped local accent. |
| Display | `--font-heading`, uppercase, `--heading-line-height`, `--tracking-tight` | H1 to H3 only. |
| Utility | `--font-ui` | Interface text, short descriptions, navigation. |
| Label | `--font-code`, `--text-xs`, `--tracking-wider`, uppercase | Eyebrows, metadata labels, counters, controls. |
| Reading prose | `--font-prose`, `--text-base`, `--prose-line-height`, `--prose-measure` | Explanatory paragraphs and editorial narrative. |

The bounded scale is `--text-xs`, `--text-sm`, `--text-base`, `--text-md`, `--text-lg`, `--text-xl`, `--text-2xl`, `--text-3xl`, and `--text-hero`. Do not synthesize intermediate one-off scales. Use `--text-hero` for a page H1, `--text-3xl` for major H2s, `--text-xl` or `--text-2xl` for H3s according to importance, and reserve the smaller scale for interface content.

## Page and section geometry

- A page intro uses `.ui-page-intro` and its container. It contains an eyebrow, a visible H1, and one compact supporting paragraph. A local image is optional only when it proves the subject.
- A normal chapter uses `.ui-section > .ui-section__container`. Its heading block uses `.ui-section-heading`: eyebrow, H2, then supporting copy when the next content needs orientation.
- Use `--section-inline-padding`, `--section-block-padding`, `--section-block-padding-compact`, `--section-content-max`, `--section-copy-max`, `--section-heading-gap`, and `--section-content-gap`. Do not add competing route-wide gutters or containers.
- Use the spacing scale `--space-1` through `--space-12`. `--space-3` to `--space-5` handles local label, title, and copy relationships. `--space-6` to `--space-8` separates content groups. Section changes use the section tokens, not improvised margins.
- Prose uses `.ui-prose`. Paragraphs are separated with `--prose-paragraph-gap`; do not put a blank visual block between every sentence.

## Hierarchy and reading order

1. Header and page context.
2. One H1 that names the page's subject in direct language.
3. A short lede that says why this subject is worth the reader's time.
4. Chapters with H2s that advance a narrative or decision, not generic labels such as "Overview" when a more specific subject is available.
5. H3s only for supporting evidence, a decision, a module, or an outcome inside the H2 chapter.
6. A final next step: related work, contact, or a next case study, according to the page's purpose.

Title wrapping is intentional. Use `$author-section-headings` when exact visual lines matter; otherwise use balanced wrapping and a meaningful maximum measure. Never use narrow columns, arbitrary `<br>`, clipped text, or reduced phone font sizes to manufacture a line break.

## Controls, cards, and interaction

- Use `.ui-button` and the shared button states. Primary and secondary actions must say what happens next. There is normally one primary action per decision group.
- All buttons, including link-styled buttons, use `--radius-button`. Do not reintroduce rounded CTA pills.
- Surfaces use `.ui-surface`, semantic surface tokens, `--border-light`, and the documented radius/shadow tokens. A border must separate real content or state, not decorate an otherwise empty container.
- Use cards only for comparable units a reader may compare, select, or revisit. Do not place every paragraph in a card, nest cards, or use cards as the only way to create hierarchy.
- Required states: default, hover when hover exists, focus-visible, active where useful, disabled/loading/error when the component supports it. State must remain distinguishable without colour alone.
- Motion may clarify a change of state or reveal evidence. It must be optional under reduced motion, short, and never required to read or operate the page.

## Media contract

- Wrap a meaningful standalone visual in `.ui-media`; use `.ui-media--contained` for product screens whose whole frame is evidence and `.ui-media--full` for a justified full-width visual break.
- Product evidence keeps its natural proportions and does not get cropped into a generic 16:9 marketing rectangle. Atmospheric photography may crop only when the crop preserves the subject.
- Give explanatory visuals captions that identify what the reader should notice. Decorative media has empty alt text and no redundant caption. Informative media has concise, specific alt text.
- Do not place essential text over an image unless contrast is measured on the actual composition at every breakpoint. Prefer a separate reading surface.

## Responsive and accessibility floor

- Design and inspect 390px first. Check 360px when copy, metadata, or controls are dense.
- The document must satisfy `documentElement.scrollWidth <= innerWidth`.
- Body copy stays at least 16px. Touch targets are at least `--touch-min` (44px).
- Normal text needs 4.5:1 contrast on its rendered surface. Large display text, meaningful borders, icons, and focus indicators need 3:1 where applicable.
- Keep semantic landmarks and sequential heading levels. Captions, labels, and metadata supplement rather than replace readable narrative context.
