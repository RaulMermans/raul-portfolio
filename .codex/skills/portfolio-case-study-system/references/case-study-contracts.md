# Case-study contracts

## Common spine

Every full case study uses this sequence, combining adjacent chapters only when the evidence is genuinely small:

1. **Project introduction:** Project name, direct purpose, case-study label, role/scope/status, and an optional hero visual that immediately relates to the work.
2. **Context:** The situation, audience, material, or operational environment. State the relevant constraints early.
3. **Problem or decision:** The job to solve, the decision that mattered, and what success would look like. A generic "challenge" heading is acceptable only if it names a real challenge beneath it.
4. **Method and evidence:** The decisions, iterations, system, artifacts, or product states that demonstrate the work. Put the evidence next to the claim it supports.
5. **Value:** What changed, what the work made possible, or what was delivered. Separate observed results from intended outcomes.
6. **Limitation or boundary:** What remains manual, unvalidated, out of scope, simulated, or dependent on a client/team. This is a credibility device, not an apology.
7. **Next work:** A compact route to a related case study. Keep the standard next-work component and back navigation consistent.

Metadata may sit after the hero or beside the introduction. It must not displace the project purpose or become an oversized dashboard.

## Chapter navigation

When a full case study needs in-page chapter links, render them with `CaseStudyMiniNav`. The chapter path is a single horizontal sequence at desktop widths. At smaller widths it remains a single, touch-scrollable row instead of wrapping into multiple lines or a vertical stack. Visual families may vary color, border, and background only; they do not change this navigation geometry.

## Internal presentation family

Record one internal presentation family for every full case study: `technical-product`, `creative-marketing`, or `hybrid`. This classification chooses the evidence treatment, not the navigation or reading foundation. All families keep the return link in the same hero position, then the case-study label, H1, tagline, and compact metadata in the same order. The family may vary the proof sequence, media treatment, and image mood only when that difference helps the reader understand the work. A technical case may place an evidence model beside this shared introduction, but it must not replace it with a local hero system.

## Technical and product case study

Use this when the reader needs to understand how something works.

1. **Context and decision:** User or operator, job, operational constraint, input quality, risk, and success condition.
2. **System model:** A concise explanation of inputs, transformations or workflow, review points, and outputs. Diagram only the parts a reader must understand.
3. **Product evidence:** Screens in the order a user encounters them. Each screen is paired with a short caption that names the task, state, and decision it supports.
4. **Guardrails and evaluation:** Source boundaries, human review, error handling, assumptions, or test evidence. Do not imply autonomous reliability where it was not demonstrated.
5. **Value and limitation:** Concrete delivery or observed result, followed by an explicit boundary.

Avoid a generic startup layout of hero dashboard, feature grid, three metrics, and quote. The interface has to be explained by the workflow it makes possible.

## Creative and marketing case study

Use this when the reader needs to understand the creative judgement and the work in context.

1. **Brief and context:** Audience, channel, market/cultural condition, business or communication task, and role.
2. **Creative premise:** The organising idea in direct language. Name the visual/verbal principles and what they were intended to achieve.
3. **System or development:** The decision trail: references, constraints, concept selection, production choices, and the rules that maintain consistency across deliverables.
4. **Work in context:** Show the identity, campaign, art direction, or deliverable where people encounter it. Pair overview shots with detail only when both reveal something different.
5. **Effect and boundary:** Measured outcome where available; otherwise state the delivered scope or the intended effect without dressing it up as performance.

Avoid a moodboard-only narrative. Beauty is evidence only when the reader can see what it decided, structured, or changed.

## Hybrid case study

Pick a lead question:

- If the important question is "How did this make a workflow usable?", use the technical spine and introduce brand/creative decisions where they affect use.
- If the important question is "How did this become a coherent expression across touchpoints?", use the creative spine and introduce technical mechanisms where they made that expression possible.

Never repeat the same project background, claim, or screenshot under both frameworks.

## Case-study index

The index is a collection page, not a miniature case study. It needs a visible introduction, predictable card labels, images that preserve the character of each project, keyboard-visible focus, and a clear first card. Metadata stays minimal so users can scan and choose a project.
