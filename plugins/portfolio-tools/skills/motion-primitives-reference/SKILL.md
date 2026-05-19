---
name: motion-primitives-reference
description: Use this skill when adding refined React motion patterns, layout transitions, text reveals, hover interactions, scroll effects, or reusable animation primitives using the locally installed Motion Primitives reference repository.
---

# Motion Primitives Reference

Use this skill when the UI needs motion that clarifies state, hierarchy, or transition continuity.

## Local Reference

- Repository: `vendor/ui-references/motion-primitives`
- Docs entry: `vendor/ui-references/motion-primitives/README.md`
- Useful areas: `components`, `app`

## How To Use

1. Search for the desired primitive:
   - `rg -n "transition|layout|text|scroll|hover|presence" vendor/ui-references/motion-primitives`
2. Read the smallest relevant component.
3. Adapt the behavior to existing project motion conventions.
4. Keep animation implementation close to the component that owns the interaction.

## Guardrails

- Do not add `motion` or other animation dependencies unless the user approves dependencies for the task.
- Prefer CSS transitions and the existing animation system when they are enough.
- Use React motion patterns only when they improve state continuity or interaction clarity.
- Always include a reduced-motion path.
- Avoid bounce, spin, or decorative motion that competes with content.
