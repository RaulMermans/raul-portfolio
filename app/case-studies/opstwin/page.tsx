'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyMiniNav from '@/components/case-studies/CaseStudyMiniNav'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import { CaseStudySnapshot } from '@/components/case-studies/CommercialCaseStudySections'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

const stack = ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Python', 'SimPy', 'Pydantic', 'Vercel Services']

const evidenceSurfaces = [
  ['Flow', 'Maps stages, routes, and resource pools while overlaying scenario changes and returned pressure evidence.'],
  ['Risk', 'Surfaces the risk classification attached to a comparison instead of hiding uncertainty in a technical table.'],
  ['Resources', 'Shows where a scenario changes queue pressure or resource utilization across the workflow.'],
  ['Sensitivity', 'Sweeps one explicit factor across defined tested values, without interpolation, extrapolation, or an implied optimum.'],
  ['Economics', 'Calculates recurring and one-time cost evidence using only assumptions entered by the user.'],
  ['Playback', 'Reconstructs one sampled run as an illustration, explicitly separate from aggregate evidence across all runs.'],
]

const whatIBuilt = [
  ['Guided comparison', 'One fixed baseline, two candidate changes, one simulation action, and an immediate plain-language result.'],
  ['Advanced scenario lab', 'A full editing environment for baseline assumptions, up to three scenarios, execution settings, guardrails, and detailed evidence.'],
  ['Paired simulation engine', 'Repeated baseline and scenario runs use matching random seeds so comparisons are made under equivalent simulated conditions.'],
  ['Operational evidence layer', 'Flow, risk, and resource views connect the headline result to queue behavior, utilization, and workflow structure.'],
  ['Integrity validation', 'Contract, deterministic, and mathematical checks validate simulation responses before evidence reaches the interface.'],
  ['Export system', 'Comparison results and supporting evidence export as structured JSON or CSV artifacts.'],
]

const limitations = [
  'The canonical model represents support operations rather than arbitrary workflows.',
  'No real-user or real-company data has been processed.',
  'There is no database, authentication, persistence, or multi-user state.',
  'Results are simulation evidence, not causal proof or a production-outcome guarantee.',
  'The product does not autonomously recommend an action or guarantee an optimal configuration.',
  'Sensitivity analysis tests one factor at a time, and representative playback shows one sampled run rather than an aggregate outcome.',
  'Human participant usability testing remains pending.',
]

const objectives = [
  'Represent an explicit operational baseline.',
  'Compare several bounded changes against that baseline.',
  'Hold simulated conditions constant across comparisons.',
  'Show observed impact and uncertainty in plain language.',
  'Expose the operational evidence behind the headline result.',
  'Keep assumptions inspectable and editable.',
  'Separate aggregate evidence from illustrative examples.',
  'Avoid turning statistical output into an automatic recommendation.',
]

const usabilityChanges = [
  'Guided mode became the default entry point.',
  'The decision moved ahead of the mechanics.',
  'Results appeared immediately after execution.',
  'Statistical language received plain-language interpretation.',
  'Evidence moved into one accessible tab system.',
  'Advanced controls remained available in a separate mode.',
  'A first-run orientation and terminology glossary were added.',
]

function OpsTwinConsole() {
  return (
    <div className="opstwin-console" aria-label="Illustrative OpsTwin simulation comparison">
      <div className="opstwin-console__bar">
        <span>OPSTWIN / DECISION LAB</span>
        <span>50 PAIRED RUNS</span>
      </div>
      <div className="opstwin-console__decision">
        <span>Decision under test</span>
        <strong>Add one Level 1 agent vs. reduce triage time by 25%</strong>
      </div>
      <div className="opstwin-console__results">
        <article>
          <span>Baseline</span>
          <strong>42.8h</strong>
          <p>Median cycle time</p>
        </article>
        <article className="opstwin-console__result--selected">
          <span>Add one agent</span>
          <strong>−6.2h</strong>
          <p>Observed difference</p>
          <small>Improved in 43 / 50 runs</small>
        </article>
        <article>
          <span>Accelerate triage</span>
          <strong>−3.4h</strong>
          <p>Observed difference</p>
          <small>Improved in 35 / 50 runs</small>
        </article>
      </div>
      <p className="opstwin-console__note">Illustrative comparison surface — not a production prediction.</p>
    </div>
  )
}

function Section({
  id,
  eyebrow,
  title,
  children,
  dark = false,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <section
      id={id}
      className={`data-brief-section ui-section ${dark ? 'data-brief-section--dark' : 'data-brief-section--light'}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="data-brief-section__container ui-section__container">
        <header className="data-brief-refresh-heading ui-section-heading">
          <p className="data-brief-eyebrow ui-eyebrow">{eyebrow}</p>
          <h2 id={`${id}-heading`}>{title}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}

export default function OpsTwinPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="case-study-page-new case-study-page-new--data-brief case-study-page-new--opstwin">
        <section className="data-brief-hero opstwin-hero" aria-labelledby="opstwin-title">
          <div className="data-brief-hero__content">
            <Link href={localizePath('/case-studies', locale)} className="data-brief-back">
              ← Case studies
            </Link>
            <p className="data-brief-eyebrow">Operational simulation / Decision-support product</p>
            <h1 id="opstwin-title" className="data-brief-hero__title">OpsTwin</h1>
            <p className="data-brief-hero__subtitle">Test an operating change before the queue feels it.</p>
            <p className="data-brief-hero__description">
              OpsTwin compares staffing and workflow changes under matched simulated conditions, then surfaces observed impact, uncertainty, risk, resource pressure, and economic tradeoffs—without presenting simulation evidence as operational certainty.
            </p>
            <p className="opstwin-status">Deployed product prototype</p>
            <div className="data-brief-actions" aria-label="Project links">
              <span className="data-brief-button data-brief-button--primary" aria-disabled="true">View live demo → <small>Link pending</small></span>
              <span className="data-brief-button" aria-disabled="true">View GitHub → <small>Link pending</small></span>
            </div>
            <div className="data-brief-tags" aria-label="Technology stack">
              {stack.map(item => <span key={item}>{item}</span>)}
            </div>
          </div>
          <figure className="data-brief-hero__visual">
            <OpsTwinConsole />
            <figcaption>OpsTwin frames operational simulation around a specific decision rather than a generic analytics dashboard.</figcaption>
          </figure>
        </section>

        <CaseStudyMiniNav
          ariaLabel="OpsTwin case study sections"
          items={[
            ['Problem', '#problem'], ['Solution', '#solution'], ['Experience', '#experience'],
            ['Method', '#method'], ['Evidence', '#evidence'], ['Outcome', '#outcome'],
          ]}
        />

        <CaseStudySnapshot locale={locale} contextHref="#problem" solutionHref="#solution" />

        <Section id="problem" eyebrow="01 / Problem" title="Dashboards describe the queue after it forms.">
          <div className="opstwin-prose">
            <p>Operations teams can usually see historical cycle time, service-level attainment, ticket volume, and resource utilization. The harder question is counterfactual: <strong>what changes if we add one Level 1 agent instead of reducing triage time by 25%?</strong></p>
            <p>Staffing, processing speed, escalation, rework, and downstream resource contention interact. A change that appears straightforward in a spreadsheet can produce less obvious effects once it moves through the full workflow.</p>
          </div>
          <div className="data-brief-card-grid data-brief-card-grid--software opstwin-card-grid">
            {['Reason from historical averages.', 'Build a bespoke analytical model.', 'Test the change directly in production.'].map((item, index) => (
              <article key={item} className="data-brief-card data-brief-card--architecture">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
          <p className="opstwin-prose opstwin-prose--closing">OpsTwin creates a narrower fourth option: bounded comparative evidence before intervening in the live operation.</p>
        </Section>

        <Section id="objective" eyebrow="02 / Objective" title="Make operational tradeoffs testable without overstating certainty.">
          <p className="opstwin-prose">The central principle was simple: <strong>comparative evidence, not prescriptive certainty.</strong></p>
          <div className="opstwin-objective-grid">
            {objectives.map((objective, index) => <p key={objective}><span>{String(index + 1).padStart(2, '0')}</span>{objective}</p>)}
          </div>
        </Section>

        <Section id="solution" eyebrow="03 / Solution" title="Compare candidate changes under matched simulated conditions.">
          <div className="opstwin-prose">
            <p>OpsTwin starts with a support-operation baseline with explicit assumptions about staffing, arrival rates, processing times, escalation, rework, and service-level targets. A user can define up to three intervention scenarios, such as adding one Level 1 agent, reducing triage time by 25%, or changing an escalation threshold.</p>
            <p>The system runs the baseline and each scenario repeatedly using the same random-seed schedule. Each scenario therefore experiences matched simulated conditions, making the comparison less vulnerable to random variation between unrelated runs.</p>
          </div>
          <div className="data-brief-result-grid opstwin-result-grid">
            {[
              ['Observed impact', 'Cycle-time change, framed as a measured simulation difference.'],
              ['Consistency', 'How frequently a scenario improved on the baseline.'],
              ['Uncertainty', 'A confidence interval around the estimated difference.'],
              ['Operational pressure', 'Comparative risk, resource, queue, and workflow evidence.'],
              ['Economics', 'Cost implications only when the user configures assumptions.'],
              ['Decision boundary', 'The stronger tested result is identified; the product does not decide implementation.'],
            ].map(([title, description]) => (
              <article key={title}><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </Section>

        <Section id="built" eyebrow="04 / What I built" title="A complete operational comparison loop." dark>
          <div className="data-brief-card-grid data-brief-card-grid--architecture opstwin-built-grid">
            {whatIBuilt.map(([title, description], index) => (
              <article key={title} className="data-brief-card data-brief-card--architecture">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="experience" eyebrow="05 / Product experience" title="Two levels of complexity, one analytical system.">
          <div className="opstwin-experience-grid">
            <article>
              <p className="data-brief-eyebrow">Guided mode / default</p>
              <h3>Understand the decision before interacting with the model.</h3>
              <p>Guided mode presents the current operation, two candidate interventions, one comparison action, and an immediate factual result. Supporting evidence then appears one panel at a time.</p>
              <ol>
                <li>The current operation.</li><li>Two candidate interventions.</li><li>One comparison action.</li><li>An immediate factual result.</li><li>Supporting evidence one panel at a time.</li>
              </ol>
            </article>
            <article>
              <p className="data-brief-eyebrow">Advanced mode</p>
              <h3>Expose the full analytical workspace when it is needed.</h3>
              <p>Advanced mode makes baseline assumptions, scenario overrides, execution settings, guardrails, and detailed evidence inspectable and editable.</p>
              <p>The guided interface does not create a simplified analytical path. Both modes use the same simulation engine, contracts, and comparison logic.</p>
            </article>
          </div>
        </Section>

        <Section id="usability" eyebrow="06 / Usability iteration" title="Analytical correctness did not guarantee clarity.">
          <div className="opstwin-prose"><p>An early version exposed the entire simulation workspace immediately. It was analytically complete but difficult for a first-time visitor to understand: mechanics appeared before the decision, statistical terminology appeared before interpretation, and the central result was buried behind evidence sections.</p></div>
          <div className="opstwin-objective-grid">
            {usabilityChanges.map((change, index) => <p key={change}><span>{String(index + 1).padStart(2, '0')}</span>{change}</p>)}
          </div>
          <div className="opstwin-prose opstwin-prose--closing"><p>Frontend coverage increased from 142 to 172 tests during this work, with no existing test removed. The iteration is supported by automated regression, expert review, owner walkthrough, and browser quality assurance; a five-participant human usability study has not yet been completed.</p></div>
        </Section>

        <Section id="method" eyebrow="07 / Methodological decision" title="Paired evidence is stronger than unrelated simulation runs.">
          <div className="opstwin-prose">
            <p>Running a baseline once and a scenario once would create a weak comparison: a difference could come from the intervention, or simply because each run received different random conditions.</p>
            <p>OpsTwin instead applies <strong>common random numbers</strong>. Run 1 of the baseline and run 1 of every scenario use the same random-seed conditions; the same applies to every repeated run. Differences are calculated within these matched pairs.</p>
            <p>Fifty paired runs are used by default, exposing how consistently an intervention improves on the baseline and how much the estimated effect varies.</p>
          </div>
          <div className="opstwin-boundary-list">
            <p>Improvement frequency is not a production success probability.</p>
            <p>A confidence interval is not a guaranteed outcome range.</p>
            <p>Comparative ranking is not an operational recommendation.</p>
            <p>Simulation evidence is not causal proof.</p>
          </div>
        </Section>

        <Section id="evidence" eyebrow="08 / Evidence surfaces" title="The headline result is only the beginning of the analysis." dark>
          <div className="data-brief-card-grid data-brief-card-grid--architecture opstwin-evidence-grid">
            {evidenceSurfaces.map(([title, description]) => (
              <article key={title} className="data-brief-card data-brief-card--architecture"><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </Section>

        <Section id="reliability" eyebrow="09 / Engineering and reliability" title="Evidence should fail safely rather than render convincingly.">
          <div className="opstwin-prose"><p>OpsTwin uses deterministic and contract-driven boundaries throughout the system. SimPy provides discrete-event execution; FastAPI validates versioned Pydantic contracts; deterministic child-seed generation preserves matched baseline and scenario schedules; and structured integrity checks run before evidence reaches the interface.</p><p>The project was developed through an AI-assisted software workflow, while product scope, system architecture, acceptance criteria, verification, and final decisions remained human-directed.</p></div>
          <div className="data-brief-flow opstwin-flow" aria-label="OpsTwin architecture">
            {['Next.js interface', 'Versioned request contract', 'FastAPI simulation service', 'SimPy execution engine', 'Integrity validation', 'Structured evidence and export'].map(step => <span key={step}>{step}</span>)}
          </div>
          <p className="opstwin-prose opstwin-prose--closing">The system is intentionally stateless: no database, authentication, user accounts, persisted simulation history, or external operational data source. This keeps the prototype focused on analytical architecture and product interaction rather than infrastructure the use case does not yet require.</p>
        </Section>

        <Section id="deployment" eyebrow="10 / Deployment recovery" title="Deployment boundaries are architectural boundaries.">
          <div className="opstwin-prose"><p>The first production deployment failed during the Next.js build. A frontend module imported a baseline fixture from the repository’s <code>examples</code> directory. The directory was excluded from the deployed bundle, so the file was available locally but unreachable inside the production build boundary.</p><p>The symptom was a missing module; the underlying problem was architectural: the web service depended on a runtime asset it did not own.</p></div>
          <div className="opstwin-deployment-grid"><article><span>01</span><h3>Own the runtime asset</h3><p>Package a runtime-owned copy inside the web service.</p></article><article><span>02</span><h3>Protect the source of truth</h3><p>Add regression verification that fails if the runtime copy diverges from the canonical example.</p></article></div>
          <p className="opstwin-prose opstwin-prose--closing">The incident became part of the case study rather than being removed from the narrative: packaging rules, deployment configuration, and ignored directories form part of the system architecture.</p>
        </Section>

        <Section id="outcome" eyebrow="11 / Outcome" title="A deployed decision-support product with inspectable boundaries." dark>
          <div className="data-brief-result-grid opstwin-verification-grid">
            <article><h3>247</h3><p>backend tests passing</p></article>
            <article><h3>172</h3><p>frontend tests across 22 files</p></article>
            <article><h3>50</h3><p>paired runs used by default</p></article>
          </div>
          <div className="opstwin-prose opstwin-prose--inverse">
            <p>ESLint, Ruff, TypeScript, strict mypy, the Next.js production build, FastAPI build, source-package verification, and Guided and Advanced production routes all passed documented verification.</p>
            <p>These measurements describe engineering scope and verification depth. They are not business-impact claims: no real-company operational outcome has been measured.</p>
          </div>
          <div className="opstwin-product-questions"><p>Which intervention produced the stronger observed improvement?</p><p>How consistent was that improvement, and how uncertain is the estimate?</p><p>Where did pressure move inside the operation?</p><p>What happens economically under explicitly configured costs?</p></div>
        </Section>

        <Section id="limitations" eyebrow="12 / Honest limitations" title="A bounded operational model, not a production optimization platform.">
          <ul className="opstwin-limitations">
            {limitations.map(item => <li key={item}>{item}</li>)}
          </ul>
          <div className="opstwin-prose opstwin-prose--closing"><p>Production use would require model calibration, data integration, security, observability, and validation against organization-specific operating definitions.</p></div>
        </Section>

        <Section id="learning" eyebrow="13 / What I learned" title="The strongest analytical product is not the one that claims the most." dark>
          <div className="opstwin-prose opstwin-prose--inverse"><p>A mathematically correct model can still fail as a product when users cannot understand what decision it supports. OpsTwin reinforced that analytical correctness and usability are separate requirements; uncertainty needs interpretation, not decoration; and aggregate and representative evidence answer different questions.</p><p>The central design decision was not adding another simulation feature. It was controlling where the system’s evidence ends.</p></div>
        </Section>

        <section id="final-cta" className="data-brief-section data-brief-section--cream ui-section opstwin-final" aria-labelledby="opstwin-final-heading">
          <div className="data-brief-section__container ui-section__container">
            <div className="data-brief-refresh-heading ui-section-heading"><p className="data-brief-eyebrow ui-eyebrow">OpsTwin</p><h2 id="opstwin-final-heading">Test an operating change before implementing it.</h2><p>Explore the guided comparison, inspect the advanced workspace, or review the architecture and verification evidence.</p></div>
            <div className="data-brief-actions"><span className="data-brief-button data-brief-button--primary" aria-disabled="true">Open the live product → <small>Link pending</small></span><span className="data-brief-button" aria-disabled="true">View the GitHub repository → <small>Link pending</small></span><Link href={localizePath('/case-studies', locale)} className="data-brief-button">Back to case studies →</Link></div>
          </div>
        </section>
      </main>
      <CaseStudyNext currentHref="/case-studies/opstwin" locale={locale} accentColor="var(--accent)" />
      <Footer locale={locale} />
    </>
  )
}
