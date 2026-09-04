# Relay

Marketing intelligence / Data product

## A performance workspace built around trustworthy numbers

Relay turns Meta Ads, Google Ads, and Shopify exports into validated performance intelligence and client-ready reporting. It keeps each metric tied to its source, checks whether the data is reliable enough to interpret, and separates store revenue from advertising-platform attribution.

## Project summary

| Role | Product concept, product strategy, UX and system design, full-stack implementation |
| --- | --- |
| Built with | Next.js, React, TypeScript, Zod, Vitest, Playwright, Vercel |
| Status | V1 complete, protected private beta |
| Repository | RaulMermans/Relay |

Performance marketers usually have plenty of data. The difficult part is getting from separate platform exports to a decision they can explain to a client or colleague.

A reporting cycle often means exporting files, cleaning fields, reconciling definitions, calculating KPIs, locating movement, writing commentary, and rebuilding a familiar report. The repetitive work was only one part of the problem. Meta, Google, and Shopify each describe performance differently. A dashboard can make those numbers look comparable when they are not.

Relay was designed to make reporting faster without making the numbers less defensible.

## The product decision

The central rule was simple: a metric should not become more certain as it moves further away from its source.

That rule shaped the product:

- Shopify remains the source for commerce revenue, orders, average order value, and MER.
- Meta and Google retain their own spend, conversions, attributed revenue, CPA, and ROAS.
- Provider-attributed revenue is never combined and labelled as ecommerce revenue.
- Missing values stay missing. The product does not turn them into zero to complete a chart.
- Relay assesses data health before it explains performance.
- Narrative is composed from validated facts, not generated as speculative commentary.

This distinction is what makes the dashboard useful. It shows business performance and platform attribution together without passing one off as the other.

## From exports to an analytical workspace

Relay moves source data through explicit stages:

1. Meta Ads, Google Ads, and Shopify exports enter the workspace.
2. Relay detects the source structure and maps fields.
3. The data is normalized into a canonical model.
4. Data Health checks coverage, compatibility, mapping integrity, provenance, duplicate evidence, and revenue semantics.
5. A deterministic KPI engine calculates performance measures.
6. Change Intelligence compares the current period with the previous one.
7. Narrative Intelligence turns supported observations into reporting copy.
8. The dashboard and report render the same analytical snapshot.

Each stage has a clear responsibility. The interface does not recalculate business logic, and the reporting layer does not re-interpret dashboard results. A narrative cannot overwrite the evidence beneath it.

## Start with data health

Most analytics products begin by showing a result. Relay begins by deciding whether that result is safe to show.

Data Health looks at reporting-period coverage, expected source completeness, currency compatibility, mapping integrity, provenance, duplicate evidence, and whether sources can be compared without changing their meaning. A workspace resolves to a clear state: healthy, review required, or blocked.

Blocking issues stop downstream interpretation. Warnings remain visible. The system does not quietly repair a problem to make the dashboard appear complete.

This made Data Health more than an implementation detail. It determines whether the product should interpret the data at all.

## Explain movement without inventing causes

The dashboard is organized around five practical questions:

1. How is performance doing?
2. What changed?
3. What needs attention?
4. How are individual channels performing?
5. Can I trust the underlying data?

Once the data is valid, Change Intelligence compares periods and identifies meaningful KPI movement, top movers, efficiency changes, spend contribution, target performance, and areas needing attention. Direction and interpretation stay separate. An increase can be important without automatically being good.

For V1, the narrative layer uses deterministic rules over structured facts. It can produce a performance headline, short summary, key developments, issues requiring attention, and supporting evidence. It does not infer causality that the data cannot establish.

That constraint was deliberate. Reporting needs repeatable, reviewable language more than impressive-sounding analysis.

## Make recurring reporting less repetitive

Relay keeps bounded browser-local memory for each client workspace. It can retain expected sources, safe field mappings, targets, reporting preferences, the latest compact analysis snapshot, and limited cycle history. A returning user can reopen the most recent dashboard instead of beginning with an upload screen.

The persistence boundary is intentionally narrow. Relay does not retain raw CSV files, provider payloads, credentials, or PDFs in browser-local memory. The product gains a smoother repeat workflow without pretending to be cloud infrastructure.

## One analysis, two reporting surfaces

Relay builds a structured report from the same validated analysis that powers the dashboard. It includes KPIs, Data Health findings, Change Intelligence, narrative, freshness information, and methodology. The report does not run an independent calculation path.

If analysis becomes stale, Relay disables export until the report is refreshed. The browser's native Print / Save-as-PDF flow produces the PDF, avoiding a separate document engine with its own business logic.

## Verification and production proof

Relay V1 closed with a formal verification gate:

- 304 Vitest tests: 209 unit tests and 95 integration tests.
- 48 Playwright checks across Chromium, WebKit, and Firefox.
- Linting, TypeScript type checking, production builds, dependency audit, deployment checks, health endpoint validation, responsive review, and report/PDF validation.

A controlled synthetic multi-source workflow verified the complete path in production. It produced EUR 225 in Shopify commerce revenue, EUR 55 in compatible paid-media spend, a 4.09x MER, two Shopify orders, and 2x ROAS for both Meta and Google. The workspace restored after reload, and the validated analysis produced a six-page tagged A4 report through Chrome's native print flow.

The values are synthetic. The workflow that processed them is real.

## V1 boundary

Relay is complete as a protected private beta, not presented as a finished SaaS. V1 uses manual CSV ingestion and device-specific browser memory. It does not include public accounts, cloud client persistence, live OAuth, scheduled refreshes or reports, email delivery, generative AI analysis, multi-user collaboration, encrypted local memory, or durable public abuse controls.

Provider adapters exist for Shopify, Meta Ads, and Google Ads, but live authorization, automatic sync, and credential persistence are outside the released product. Building an integration interface is different from operating customer credentials safely in production.

## What I learned

Relay began as a reporting-automation idea. The harder question was how to handle platforms that describe the same business differently. That question changed the architecture.

The work became less about adding metrics, connectors, or AI features and more about being precise about provenance, semantics, and uncertainty. The most important feature was deciding what the system should refuse to do.

Faster reporting matters when the answer remains trustworthy.

## Visuals still needed for the portfolio page

- Dashboard overview showing Data Health and primary KPIs.
- Mapping or Data Health exception state.
- Change Intelligence and reporting view.
- Browser-native PDF output.
- A thumbnail and hero image that follow the portfolio image requirements.
