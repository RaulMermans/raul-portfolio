---
name: verify-rendered-ui
description: Perform the required rendered verification gate after creating, redesigning, or modifying frontend UI, CSS, responsive layouts, typography, cards, headings, interactions, or screenshot-led implementations. Use before declaring visual work complete, especially when acceptance depends on alignment, spacing, line count, centering, overflow, interaction state, localization, or parity with a reference screenshot or live page.
---

# Verify Rendered UI

Do not infer rendered correctness from source code.

## Build the verification matrix

Choose the smallest representative matrix that covers the changed ownership boundary:

- affected route plus one sibling route using the shared pattern;
- every changed locale;
- desktop, tablet, and mobile widths;
- shortest and longest relevant content;
- default, hover/focus, selected, open, loading, or error states that changed.

For shared styles, verify more than the page that prompted the change.

## Run the rendered gate

1. Start the repository-native preview or use the known local target.
2. Open the changed route with the Browser plugin when available.
3. Capture a screenshot when visual composition matters.
4. Use DOM measurements for claims about alignment, line count, centering, size, or overflow.
5. Exercise changed controls with keyboard and pointer interaction.
6. Check browser console errors.
7. Run repository-native lint, typecheck, tests, and build checks proportional to the change.

Never substitute a production page for post-change local verification. A production page may
provide a baseline only.

## Measure visual claims

Use quantitative checks:

- alignment: compare `getBoundingClientRect()` coordinates;
- centering: compare element center with target container center;
- exact lines: count rendered client rects or authored visual-line elements;
- overflow: compare `documentElement.scrollWidth` with `innerWidth`;
- sticky/header collisions: compare element rectangles at relevant scroll positions;
- synchronized UI: verify selected/pressed state plus dependent content.

Use a 1 CSS pixel tolerance for intended shared coordinates unless subpixel rendering requires
a documented exception.

## Compare with the reference

When a screenshot or live page is supplied:

- record spacing, palette, typography, hierarchy, and responsive clues before editing;
- identify which properties are requirements versus inspiration;
- compare the final local render, not only the source;
- avoid placeholders when the user requested a finished experience;
- inspect the full affected section, not only the first viewport.

## Handle blocked verification

If dependencies, browser access, credentials, network, or the runtime block verification:

1. attempt proportionate recovery without changing dependencies or external state unexpectedly;
2. complete available static checks;
3. state exactly which rendered checks did not run;
4. do not say "verified", "pixel-perfect", "aligned", or "responsive" for unrendered behavior;
5. leave a concrete command or condition for completing the gate.

Static CSS balance, grep checks, and code review are useful fallbacks but are never visual
verification.

## Completion gate

Do not finish until:

- changed routes and representative shared consumers were inspected;
- required breakpoints and locales were checked;
- measurable acceptance claims passed;
- automated checks passed or blockers were reported precisely;
- no verification process remains running.
