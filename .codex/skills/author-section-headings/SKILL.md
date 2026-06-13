---
name: author-section-headings
description: Design, implement, and review large editorial section headings whose line count, line breaks, centering, eyebrow placement, body relationship, localization, or responsive behavior must be deliberate. Use for landing pages, service pages, portfolios, and case studies when titles must stay on an exact number of lines, remain visually centered, align consistently across sections, or avoid translation-driven wrapping changes.
---

# Author Section Headings

Treat large section headings as authored typography with explicit geometry.

## Define the heading contract

Before editing, state:

- required visual line count;
- alignment target: page, section container, column, or adjacent content;
- eyebrow position;
- relationship to introductory body copy;
- desktop, tablet, and mobile behavior;
- locale-specific wording.

Do not interpret "centered" as centered inside an offset grid column unless that is explicitly
the design target.

## Author exact line counts

When the user requires an exact line count, do not rely on `max-width`, `text-wrap: balance`,
or browser wrapping alone.

1. Store each visual line as structured content.
2. Author the break independently for every locale.
3. Render each line as a block.
4. Give the heading one accessible full-sentence name.

Preferred React pattern:

```tsx
const title = ["Where the system", "usually breaks"] as const;

<h2 aria-label={title.join(" ")}>
  {title.map((line) => (
    <span key={line} aria-hidden="true">{line}</span>
  ))}
</h2>
```

Never split a word, reuse English line divisions for another language, or insert `<br>` into
unstructured translation strings.

## Center the geometry

- Center the heading against its intended container with `margin-inline: auto`,
  `place-items`, or a dedicated full-width layer.
- Keep side labels or eyebrows from changing the heading center. Position them independently
  or use a layout with a true centered track.
- Use `text-align: center` only after the heading box itself is centered.
- Align accompanying body copy to the same axis when the design calls for a centered section.

## Protect responsive behavior

- Preserve the authored line count when explicitly required and both lines fit safely.
- Use bounded font sizing and a wider heading box before reducing readability.
- At narrow widths, verify every locale without horizontal overflow.
- If an exact line count cannot fit at the minimum supported width, surface the conflict
  instead of silently clipping, scaling excessively, or breaking words.

## Verify the result

For each representative section and locale, measure:

- exactly the requested number of visual line boxes;
- heading center matches the target container center within 1 CSS pixel;
- eyebrow placement does not offset the heading;
- title-to-body spacing is consistent;
- no overflow at supported breakpoints.

Inspect at least one longest translated heading. Source-level line arrays do not replace
rendered verification.
