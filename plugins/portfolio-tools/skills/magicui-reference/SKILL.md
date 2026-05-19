---
name: magicui-reference
description: Use this skill when creating polished landing-page sections, animated bento grids, marquees, hero proof, showcase visuals, or premium portfolio moments using the locally installed Magic UI reference repository.
---

# Magic UI Reference

Use this skill when a page needs a stronger visual moment without becoming generic or over-animated.

## Local Reference

- Repository: `vendor/ui-references/magicui`
- Docs entry: `vendor/ui-references/magicui/README.md`
- Useful areas: `apps/www/registry`, `apps/www/components`, `apps/www/content`

## How To Use

1. Search for a specific pattern:
   - `rg -n "bento|marquee|hero|beam|border|text" vendor/ui-references/magicui/apps/www`
2. Read the component and any nearby CSS/config it depends on.
3. Rebuild the idea in this portfolio's visual language.
4. Use fewer effects than the reference when the page already has a strong hierarchy.

## Guardrails

- Do not make generic AI-gradient hero sections.
- Do not add heavy animated backgrounds just because a reference exists.
- Do not import directly from the submodule.
- Keep motion restrained, respect `prefers-reduced-motion`, and avoid decorative clutter.
- Maintain Raul's palette and typography unless the task explicitly changes the brand system.
