---
name: ui-ux-lead
description: High-level UX/UI orchestration skill for this portfolio. Use this as the default entry point for any UI, UX, frontend layout, landing page, product page, case study, dashboard, or design-system task. It orchestrates ai-skills/ui-ux-pro-max with the project's design-system, visual-hierarchy, accessibility, animation, performance, and Next.js skills so UI work is executed at the highest level instead of as isolated styling changes.
---

# UI UX Lead

Use this skill first for any UI- or UX-heavy task in this repo.

This is the repo's design orchestration skill. It does not replace `ui-ux-pro-max`; it makes sure that `ui-ux-pro-max` is used consistently with the project's own design, hierarchy, accessibility, motion, performance, and App Router conventions.

## When To Use

Use this skill whenever the task affects:
- landing pages or product pages
- case studies or portfolio presentation
- page layout, hierarchy, or narrative flow
- components, styling, responsive behavior, or interaction design
- visual polish, decluttering, or premium feel
- screenshots, product storytelling, or UI proof presentation

If the request changes how something looks, reads, feels, or is navigated, start here.

## Required Workflow

1. Read these sources first:
   - `ai-skills/ui-ux-pro-max/.claude/skills/ui-ux-pro-max/SKILL.md`
   - `plugins/portfolio-tools/skills/design-system/SKILL.md`
   - `plugins/portfolio-tools/skills/visual-hierarchy/SKILL.md`
2. For substantial page or layout work, run the UI-UX Pro Max search script before designing:
   - `python3 ai-skills/ui-ux-pro-max/.claude/skills/ui-ux-pro-max/scripts/search.py --design-system "<task summary>"`
3. Pull in supporting project skills as needed:
   - `plugins/portfolio-tools/skills/case-study-builder/SKILL.md` for case-study storytelling
   - `plugins/portfolio-tools/skills/nextjs-app-router/SKILL.md` for route/page structure
   - `plugins/portfolio-tools/skills/accessibility-enforcer/SKILL.md` for contrast, semantics, and reduced motion
   - `plugins/portfolio-tools/skills/animation-system/SKILL.md` when motion matters
   - `plugins/portfolio-tools/skills/performance-guardian/SKILL.md` for image-heavy or animation-heavy pages
4. State the consulted skills at the start of the work.
5. Before shipping, explicitly check:
   - hierarchy and scanability
   - mobile behavior
   - reduced default text density
   - proof vs. fluff
   - motion restraint

## Operating Standard

The default bar is not "looks nicer." The bar is:
- clear information hierarchy
- minimal redundancy
- premium visual rhythm
- product logic made visible
- responsive behavior that feels intentional
- calm interfaces that still feel distinctive

## Non-Negotiables

- Do not rely on `ui-ux-pro-max` alone; pair it with `design-system` and `visual-hierarchy`.
- Keep the shared `components/Header.tsx` and `components/Footer.tsx` as the universal site chrome on public pages. Supplied HTML/mockup headers, navs, language switchers, footers, and footer CTAs are reference only unless the task explicitly asks to edit the global components.
- Prefer fewer, stronger sections over many medium-strength sections.
- Prefer progressive disclosure over dumping all rationale at once.
- Prefer one strong visual system per page over multiple competing patterns.
- For app pages, use real product proof before abstract positioning.
- Keep motion subtle and structural unless the user explicitly asks for something more theatrical.

## Deliverable Expectations

For substantial UI work, the result should usually include:
- a clear page or component hierarchy
- a visual system that matches the product and brand
- concise copy scaffolding
- a rationale for what was removed or simplified
- verification notes for mobile, accessibility, and motion

## Quick Checklist

- [ ] `ui-ux-pro-max` consulted
- [ ] `design-system` consulted
- [ ] `visual-hierarchy` consulted
- [ ] supporting skills consulted where relevant
- [ ] top of page answers the core user questions quickly
- [ ] no repeated explanation blocks
- [ ] no decorative clutter competing with the main message
- [ ] mobile layout remains legible and compact
- [ ] reduced-motion experience remains understandable
