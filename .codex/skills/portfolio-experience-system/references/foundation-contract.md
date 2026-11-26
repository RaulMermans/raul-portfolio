# Foundation contract

Use this reference after `$portfolio-experience-system` has routed a public route. The canonical values live in `styles/design-system.css`; names below are the contract future code must consume.

## Brand grammar

| Role | Token and treatment | Use |
| --- | --- | --- |
| Canvas | `--surface-page` (off-white paper) | Default page canvas. |
| Inverse punctuation | `--surface-inverse` (ink) | A deliberate change of pace, result, quote, or evidence moment. Never a second default theme. |
| Primary reading | `--text-primary` | Headings, body copy, controls, and essential information. |
| Secondary reading | `--text-secondary` | Supporting copy only when contrast passes on the rendered surface. |
| Signal | `--accent` for accessible text and focus; `--accent-visual` for large copper marks | Limited portfolio signal. A case study may add one scoped local accent. |
| Page title | `--font-title`, regular, natural casing | H1 only. |
| Section heading | `--font-section`, regular, natural casing | H2. |
| Smaller heading | `--font-heading`, restrained sans serif | H3 and supporting display. |
| Utility | `--font-ui` | Interface text, short descriptions, navigation. |
| Label | `--font-code`, `--text-xs`, `--tracking-wider`, uppercase | Eyebrows, metadata labels, counters, controls. |
| Reading prose | `--font-prose`, `--text-base`, `--prose-line-height`, `--prose-measure` | Explanatory paragraphs and editorial narrative. |

The bounded scale is `--text-xs`, `--text-sm`, `--text-base`, `--text-md`, `--text-lg`, `--text-xl`, `--text-2xl`, `--text-3xl`, and `--text-hero`. Do not synthesize intermediate one-off scales. Use `--text-hero` for a page H1, `--case-study-section-heading` for a full case study's primary chapter H2s, `--text-3xl` for other major H2s, and `--text-xl` or `--text-2xl` for H3s according to importance. Reserve the smaller scale for interface content.

The current type and section scale is deliberately more compact than the original archive mockup. Keep display titles and opening screens within the bounded tokens, with enough first-viewport space to reveal the next chapter on a phone.

On paper, use `--accent` for readable copper text and text selection. Reserve `--accent-visual` for large marks that meet the display contrast threshold. Use `--text-muted` for secondary labels instead of reducing the opacity of essential text.

The user chose Instrument Serif for H1 and H2 display headings, replacing the previous Source Serif 4 H1 and Arial H2. Source Serif 4 remains for reading copy, Arial for interface and H3 headings, and Courier New for labels. `styles/design-system.css` is the active font source and `components/SiteDocument.tsx` serves the local serif assets. Essential first-viewport content must render readable before any motion begins.

## Page and section geometry

- A standard page intro uses `.ui-page-intro` and its container. Technical, creative, and About instead share `.portfolio-intro`: a centered H1 alone on the primary paper surface, with context and evidence directly below. Both words use the regular Instrument Serif display face, with the second word larger. Keep the complete words visible at phone widths. A local image in other intros is optional only when it proves the subject.
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
- The fixed editorial masthead uses the full name Raúl Mermans as its serif home link, a compact text Back link on interior routes, and language choices. It uses the primary paper surface on every route, hides on a meaningful downward scroll, and returns on upward scroll or keyboard focus. Back returns to the nearest portfolio index, and the masthead keeps the same geometry across locales. Photo essays retain the same compact Back link in their opening spread and a return link at the end. The former four-link navigation and mobile menu must not return.
- The shared footer name and reading copy align at the top of the same desktop row, then stack without overlap on a phone. Keep its text and adjacent footer metadata fully visible without horizontal clipping.
- Visual Studies keeps its carousel arrows inside the image frame and its caption below the image. Small metadata remains readable at the shared `--text-xs` size or larger, including on phones. An opened visual work must still display the work itself on a phone.
- Action labels name the destination without decorative arrow glyphs. Retain arrows only for directional controls and explanatory diagrams.

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
