# UI consistency audit — home-page design language

**Baseline:** the home page is the governing visual system. Its editorial expression is most clearly visible in the OpsTwin problem section: mono index label, condensed all-caps display heading, generous cream canvas, Source Serif reading copy, restrained black rules, and purposeful whitespace.

**Audit scope:** all public landing and case-study route implementations as of 2026-08-11. Localized routes are aliases of the same implementation and inherit the same result; they are not separate visual systems.

## The system to preserve

| Element | Required contract |
| --- | --- |
| Surface | Warm cream page surface with black/ink type. Dark sections are editorial punctuation, not the default page theme. |
| Display hierarchy | A mono, uppercase label precedes the title. H1 and major H2s use the condensed display face, uppercase, tightly set. |
| Reading hierarchy | Long-form explanation uses Source Serif at a calm, generous measure. UI and metadata use the sans/mono roles only. |
| Colour | Use semantic palette tokens from `styles/design-system.css`; case-study accents may be scoped and subordinate to the shared cream/ink system. |
| Spacing | Use shared section gutters and vertical rhythm. A section title has room to establish a clear change of pace before prose or evidence. |
| Controls | Square or near-square controls, visible focus, high-contrast text, and no decorative pill language. |
| Evidence | Product screens are framed as evidence, with quiet borders/shadows. Cards use rules and layout before decoration. |

## Route-family findings

| Implementation family | Routes covered | Result | Evidence / required action |
| --- | --- | --- | --- |
| Home | `/`, `/en`, `/es` | **Reference** | Canonical palette, typography roles, hierarchy, and editorial rhythm. |
| Shared data-brief case studies | OpsTwin, Campaign Sandbox, Data Brief AI, Benchmark Dashboard and locale aliases | **Aligned** | The shared `case-study-new.css` data-brief composition preserves the home system while allowing project-specific evidence. |
| SearchSignal | `/case-studies/searchsignal` and locale aliases | **Aligning** | The current uncommitted refactor moves the hero from a one-off dark banner to the shared data-brief hero. Keep this direction; render-check its responsive product visual and metadata grid before merge. |
| Category case studies | Data Systems, Brand Systems, AI Sports, AI Systems & Agents and aliases | **Mostly aligned** | Shared category templates inherit the typography and surface system. Restrict any local accent treatment to labels, diagrams, and evidence—not page-level type or background replacements. |
| Commercial / image-led case studies | DemandOS, Remoria, Raul Portfolio, BlogAgent, Campaign Pulse, Website Auditor, TerritoryOps Spain and aliases | **Review per visual asset** | Their content shells use shared case-study components. Asset treatments and project modules may be distinctive, but headings, copy, controls, section gutters, and navigation must remain shared. |
| Services | `/services/[slug]` and locale aliases | **Aligned foundation** | Uses the service landing component and shared palette. Audit new service visuals against the no-dashboard/no-pill rules. |
| Apps listing and app detail | `/apps`, `/apps/[slug]`, `/apps/overflow`, TerritoryOps Spain and locale aliases | **Needs restraint pass** | `apps-coverflow.css` and `apps-grid.css` are intentionally more interactive, but must not introduce a competing card language. Keep the editorial title treatment; simplify decorative rounding and gradients where they obscure hierarchy. |
| About, photography, visuals | `/about`, `/photography`, `/visuals` and aliases | **Needs route-level review** | These are experience-led pages. Their media can vary, but their labels, headings, intro copy, controls, and footer must use the shared language. |
| Legal, support, loading, error, 404 | Privacy, terms, overflow support, loading/error routes and aliases | **Functional consistency required** | They may be quieter than editorial pages, but must retain shared tokens, accessible focus, readable measure, and header/footer alignment. |

## Highest-priority inconsistencies

1. **Do not retain the former SearchSignal dark product-banner hero.** The shared data-brief hero is the correct system-level correction; its product visual may remain distinctive.
2. **Avoid component-owned visual systems.** `SectionCards`, apps coverflow/grid, and project-specific case-study styles need token-first review when changed. Rounded glass panels, stacked gradients, or a new display scale are not acceptable substitutes for hierarchy.
3. **Protect heading contracts.** A major narrative section should not replace its mono label + condensed uppercase H2 with a small sans heading. H1 is unique per page; H2s mark editorial chapters; H3s label evidence.
4. **Keep personalisation local.** Project colours, diagrams, imagery, and evidence modules can vary. Page canvas, type roles, spacing, button shape, focus behaviour, and content rails cannot.

## Enforcement

All frontend work must use [Home Page Design Language](../.codex/skills/home-page-design-language/SKILL.md) before implementation. It converts the table above into build-time design guidance and requires desktop plus 390px visual verification for changed routes.

## Definition of done for a future route pass

- No local hard-coded palette or type scale where an existing semantic token applies.
- Every major title obeys the eyebrow → display heading → supporting copy order when content permits.
- All controls are keyboard-visible and meet the shared shape/contrast language.
- At 390px, no horizontal overflow, clipped heading, or collapsed evidence layout.
- A project’s distinct visual treatment is isolated to its evidence—not its basic reading and navigation system.
