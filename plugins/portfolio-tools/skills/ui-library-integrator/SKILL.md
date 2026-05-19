---
name: ui-library-integrator
description: Use this skill during UI, frontend, component, landing-page, dashboard, or animation work when external UI references may help. It routes between the local shadcn/ui, Magic UI, and Motion Primitives reference repositories while preserving Raul Mermans' portfolio design system and avoiding unapproved runtime dependencies.
---

# UI Library Integrator

Use this after `ui-ux-lead`, `design-system`, and `visual-hierarchy` when a UI task could benefit from richer component or motion references.

## Installed References

- `vendor/ui-references/shadcn-ui` - component architecture, accessible primitives, registry patterns.
- `vendor/ui-references/magicui` - premium marketing sections, animated hero patterns, bento/showcase surfaces.
- `vendor/ui-references/motion-primitives` - focused React motion components and interaction patterns.

## Selection Rule

- Use `shadcn-ui-reference` for component primitives, forms, dialogs, tabs, accordions, menus, tables, and accessible interaction structure.
- Use `magicui-reference` for high-polish landing sections, bento grids, marquee/reveal effects, hero proof, and portfolio-safe visual moments.
- Use `motion-primitives-reference` for page transitions, layout transitions, scroll/hover motion, text reveal, and reusable motion behavior.

## Guardrails

- Do not import directly from `vendor/ui-references/*` into production app code.
- Do not add packages or change `package.json` without explicit user approval for that task.
- Translate patterns into the repo's existing Next.js, TypeScript, CSS, Tailwind, and BEM conventions.
- Keep Raul's design system primary: cream/ink/crimson palette, restrained typography, hairline borders, hard corners by default, and subtle motion.
- Prefer one strong borrowed pattern per screen over stacking multiple animated libraries.
- Always preserve accessibility: semantic HTML, keyboard support, visible focus, reduced-motion behavior, and contrast.

## Workflow

1. Identify the UI need: primitive component, marketing visual, or motion pattern.
2. Read the relevant focused skill.
3. Inspect only the specific files needed inside `vendor/ui-references/*`.
4. Rebuild the pattern in project-owned files.
5. Verify no direct vendor imports were added unless the user approved a dependency/install step.
