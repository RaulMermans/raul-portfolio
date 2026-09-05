---
name: portfolio-case-study-system
description: Create, refactor, or review Raúl Mermans case-study indexes and individual case studies with a shared narrative, UX, evidence, and accessibility structure while choosing an appropriate technical-product or creative-marketing expression. Use for any case-study route, content model, shared case-study component, or project-specific case-study styling.
---

# Portfolio case-study system

Case studies share a reading system. They do not share the same project aesthetic. Classify the work before choosing a composition:

- **Technical/product:** The evidence is a workflow, product state, data model, automation, prototype, or evaluation.
- **Creative/marketing:** The evidence is a brief, campaign, brand system, art direction, cultural position, production, or market-facing work.
- **Hybrid:** Choose one lead narrative and use the other only where it proves the decision. Do not build two parallel case studies.

Read [references/case-study-contracts.md](references/case-study-contracts.md), then use `$portfolio-experience-system`, `$portfolio-art-direction`, `$impeccable-interface`, `$mobile-first-ui`, and `$verify-rendered-ui`. Use `$align-card-grids` for repeated proof panels and `$author-section-headings` for authored chapter titles.

## Shared rules

- The first viewport identifies the project, its purpose, the work performed, and the case-study context before a reader has to interpret an image.
- Keep a consistent case-study spine: context, decision/problem, evidence/process, value or outcome, limitation/boundary, and next work. Name each chapter in the project’s own language.
- Make claimed results traceable. Label prototype work, directional evidence, simulated data, and unmeasured outcomes honestly. Do not manufacture metrics, testimonials, user counts, or adoption claims.
- A project may use one accent, one evidence-specific module family, and a restrained image mood. It inherits the portfolio typography, gutters, buttons, chapter rhythm, navigation, focus, and mobile treatment.
- Store an internal `presentationFamily` (`technical-product`, `creative-marketing`, or `hybrid`) for every full case study. It may guide evidence composition and image treatment, but never changes the shared hero navigation, case-study label, H1, tagline, metadata rhythm, or accessibility behavior.
- Use `CaseStudyMiniNav` for chapter navigation. It is one horizontal reading line on desktop and a deliberately horizontally scrollable line on small viewports; project variants may change its surface treatment, never wrap or stack its chapter links.
- Technical screenshots retain readable detail and explain the task, state, and implication. Creative work shows the system in use, not only moodboards or isolated beauty shots.
- Metadata is compact and factual: role, scope, year or status, collaborators when relevant, and tools only where tools clarify the work. It is not the primary narrative.

## Do not do this

- Do not lead with an unexplained full-bleed image, a fake dashboard, or a generic metrics strip.
- Do not make every chapter a card or every claim a large number.
- Do not turn project colour into page colour, or use a local typeface for basic reading/navigation.
- Do not make an unbuilt prototype read as a launched product.
- Do not substitute a visual gallery for a decision trail.

## Completion gate

Check that a visitor can identify the project, problem, role, proof, result, and limitation; that the selected family expresses the evidence; and that the route still looks native beside a second case study and the home page.
