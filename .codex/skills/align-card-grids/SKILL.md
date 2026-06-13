---
name: align-card-grids
description: Implement and audit repeated card, tile, feature, process, proof, result, or metric grids so comparable titles and body copy share stable horizontal alignment across different content lengths, rows, locales, and breakpoints. Use whenever frontend work creates or changes multi-card layouts, when a screenshot shows drifting title/body baselines, or when cards use bottom alignment, space-between, fixed heights, line clamping, or variable-length translated copy.
---

# Align Card Grids

Make alignment a content contract, not an accidental result of equal sample text.

## Establish the comparison group

1. Identify cards that are visually comparable within the same grid or row.
2. Exclude intentionally asymmetric editorial compositions.
3. Inspect the shortest, longest, and translated title/body combinations before choosing CSS.
4. Record the required title-line allowance for that component family.

Do not apply one global card height or heading allowance to unrelated card families.

## Implement the alignment contract

- Top-align comparable card content. Treat `align-content: end`, `justify-content:
  space-between`, and bottom-pinned copy as suspect when text lengths vary.
- Reserve a shared heading block with grid rows or `min-block-size` expressed in line units.
- Start body copy after the reserved heading block with one shared gap.
- Reuse a semantic token when multiple component families need the same allowance.
- Keep cards equal-height through the grid, not through clipped copy or arbitrary per-card padding.
- Preserve natural height on narrow mobile layouts unless the design explicitly requires aligned rows.

Preferred pattern:

```css
.card {
  display: grid;
  align-content: start;
}

.card__title {
  min-block-size: 2lh;
}

.card__body {
  margin-top: var(--card-copy-gap);
}
```

Use the actual required line count instead of assuming `2lh`.

## Reject fragile fixes

Do not:

- add individual margins to visually low cards;
- hardcode different padding for specific titles;
- use `line-clamp` or fixed block height to hide valid copy;
- tune against only one locale or one viewport;
- align body copy while allowing title origins to drift;
- declare success because the cards have equal outer heights.

## Verify rendered coordinates

Measure every comparable card in at least one full desktop row:

- title top coordinates match;
- body top coordinates match;
- no title or body clips;
- card bottoms remain coherent with the longest content.

Use a bounded browser evaluation when available:

```js
[...document.querySelectorAll(".card")].map((card) => {
  const title = card.querySelector("h2, h3");
  const body = card.querySelector("p");
  return {
    title: title?.textContent?.trim(),
    titleTop: Math.round(title?.getBoundingClientRect().top ?? 0),
    bodyTop: Math.round(body?.getBoundingClientRect().top ?? 0),
  };
});
```

Within a row, target a difference of at most 1 CSS pixel for each required coordinate.

## Stress-test content and breakpoints

Check:

1. shortest and longest titles;
2. one-line and multi-line titles;
3. shortest and longest body copy;
4. every supported locale;
5. desktop multi-column rows;
6. tablet reflow;
7. mobile single-column behavior.

If rendered verification is blocked, report the blocker and do not claim the grid is visually
verified.
