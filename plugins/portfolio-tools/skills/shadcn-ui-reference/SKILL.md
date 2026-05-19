---
name: shadcn-ui-reference
description: Use this skill when building or improving accessible React UI primitives, forms, dialogs, tabs, accordions, menus, cards, tables, and component architecture using the locally installed shadcn/ui reference repository.
---

# shadcn/ui Reference

Use this skill when a UI task needs strong component structure or accessible interaction patterns.

## Local Reference

- Repository: `vendor/ui-references/shadcn-ui`
- Docs entry: `vendor/ui-references/shadcn-ui/README.md`
- Useful areas: `apps/v4/registry`, `templates`, `packages`

## How To Use

1. Search the local repo for the needed primitive:
   - `rg -n "dialog|accordion|tabs|form|table|command" vendor/ui-references/shadcn-ui`
2. Read only the matching component/registry files.
3. Adapt the structure into this portfolio's own components and CSS.
4. Keep server components by default; add `'use client'` only for hooks, browser APIs, or event handlers.

## Guardrails

- Do not run `npx shadcn` or add Radix/class-variance dependencies unless the user explicitly approves dependencies for the task.
- Do not copy shadcn theme tokens over Raul's design system.
- Preserve project conventions: BEM class names, `styles/globals.css` or scoped existing CSS files, and existing Tailwind usage.
- Treat shadcn as a reference for behavior and accessibility, not as a new app-wide design system.
