'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import { CaseStudySnapshot } from '@/components/case-studies/CommercialCaseStudySections'
import { useCaseStudySetup } from '@/hooks'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

const githubUrl = 'https://github.com/RaulMermans/campaign-sandbox'
const imageBase = '/images/case-studies/campaign-sandbox'

const workflowStages = [
  'Brief intake',
  'Brief normalization',
  'Strategic tension extraction',
  'Campaign route generation',
  'Persona generation',
  'Synthetic audience reactions',
  'Deterministic scoring',
  'Pre-mortem risk review',
  'Deterministic comparison',
  'Creative Director Review',
  'Human route selection',
  'Execution plan',
  'Deterministic export',
]

const objectiveItems = [
  'Accept pasted or uploaded brief material.',
  'Structure the brief into usable campaign inputs.',
  'Generate differentiated route territories.',
  'Simulate synthetic audience reactions for planning only.',
  'Score and compare routes deterministically.',
  'Add a Creative Director Review layer.',
  'Preserve human route selection.',
  'Generate a practical execution plan.',
  'Export Markdown, HTML, and PPTX reports.',
  'Keep access password-protected when deployed.',
]

const featureGroups = [
  {
    title: 'Structured brief intake',
    description:
      'Users can paste a campaign brief or upload supported files. Extracted text is shown in an editable preview before the workflow runs. TXT and PPTX are supported reliably; PDF extraction is labeled honestly because results can vary by file and environment.',
  },
  {
    title: 'Strategic tension',
    description:
      'The system identifies audience desire, audience resistance, the brand proof challenge, the creative trap, the creative opportunity, and a campaign tension statement.',
  },
  {
    title: 'Synthetic audience signals',
    description:
      'Synthetic personas react to each route as planning hypotheses only. They are never presented as research, survey data, focus-group findings, or performance predictions.',
  },
  {
    title: 'Deterministic comparison',
    description:
      'Rules provide route tradeoffs, feasibility estimates, risk categories, close-score warnings, and recommendation logic without claiming predictive accuracy.',
  },
  {
    title: 'Human route selection',
    description:
      'The workflow stops before final execution so the user, not the model, chooses which strategic territory should move forward.',
  },
  {
    title: 'Local run library',
    description:
      'Saved runs support internal reuse and comparison while remaining in browser storage rather than a server database.',
  },
]

const safetyItems = [
  'Server-side LLM calls only',
  'OpenAI structured outputs',
  'Zod schema validation',
  'Deterministic route scoring and comparison',
  'Route quality validation',
  'Proof integrity guardrails',
  'Retry-once repair for quality failures',
  'Synthetic research caveats',
  'Human route selection',
  'Deterministic export',
  'Password-gated deployment',
  'No raw prompt or provider-output exposure',
  'No client-side API key exposure',
]

const verificationItems = [
  '854 tests passing across 47 files',
  'Clean typecheck and lint',
  'Production build passing',
  'Password gate tested',
  'Campaign APIs blocked without access',
  'Markdown, HTML, and PPTX exports working',
  'GitHub repository reviewed for public safety',
]

const limitations = [
  'Synthetic audience reactions are not real market research.',
  'PDF extraction may vary by file and environment.',
  'Saved runs are browser-local.',
  'The deployed app uses a shared password gate, not user accounts.',
  'There is no rate limiting yet.',
  'Outputs should be reviewed before external or client use.',
  'The tool is built for internal work, not SaaS.',
]

type ScreenshotProps = {
  src: string
  alt: string
  caption: string
  priority?: boolean
}

function CaseStudyScreenshot({ src, alt, caption, priority = false }: ScreenshotProps) {
  return (
    <figure className="campaign-sandbox-shot">
      <div className="campaign-sandbox-shot__frame">
        <Image
          src={`${imageBase}/${src}`}
          alt={alt}
          width={1440}
          height={900}
          sizes="(max-width: 720px) 100vw, (max-width: 1200px) 92vw, 1400px"
          quality={90}
          priority={priority}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default function CampaignSandboxPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const backLabel = locale === 'es' ? 'Volver a casos' : 'Back to case studies'

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main
        id="main-content"
        className="case-study-page-new case-study-page-new--data-brief case-study-page-new--campaign-sandbox"
      >
        <section className="data-brief-hero campaign-sandbox-hero" aria-labelledby="campaign-sandbox-title">
          <div className="data-brief-hero__content">
            <Link href={localizePath('/case-studies', locale)} className="data-brief-back">
              {backLabel}
            </Link>
            <p className="data-brief-eyebrow">Internal AI Strategy Workspace</p>
            <h1 id="campaign-sandbox-title" className="data-brief-hero__title">
              Campaign Sandbox
            </h1>
            <p className="data-brief-hero__subtitle">
              A bounded AI workflow for moving from messy campaign briefs to structured strategy.
            </p>
            <p className="data-brief-hero__description">
              Campaign Sandbox turns messy campaign briefs into structured creative routes, synthetic audience
              simulations, risk reviews, execution plans, and exportable strategy reports.
            </p>
            <div className="data-brief-actions" aria-label="Project links">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                GitHub repository
              </a>
              <a href="#architecture" className="data-brief-button">
                View workflow
              </a>
            </div>
            <div className="data-brief-tags" aria-label="Project tags">
              {['AI Workflows', 'Creative Strategy', 'Next.js', 'TypeScript', 'OpenAI', 'Evaluation & Guardrails'].map(
                (tag) => (
                  <span key={tag}>{tag}</span>
                ),
              )}
            </div>
          </div>
          <div className="campaign-sandbox-hero__visual">
            <CaseStudyScreenshot
              src="01-intake.webp"
              alt="Campaign Sandbox brief intake screen"
              caption="Campaign Sandbox intake and strategy workspace."
              priority
            />
          </div>
        </section>

        <nav className="data-brief-mini-nav campaign-sandbox-mini-nav" aria-label="Campaign Sandbox page sections">
          {[
            ['Problem', '#problem'],
            ['Architecture', '#architecture'],
            ['Routes', '#routes'],
            ['Review', '#creative-review'],
            ['Execution', '#execution'],
            ['Reliability', '#reliability'],
            ['Outcome', '#outcome'],
          ].map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <CaseStudySnapshot
          locale={locale}
          contextHref="#problem"
          solutionHref="#architecture"
          items={[
            { label: locale === 'es' ? 'Tipo' : 'Type', value: locale === 'es' ? 'Herramienta interna de IA' : 'Internal AI tool' },
            {
              label: locale === 'es' ? 'Uso' : 'Use case',
              value:
                locale === 'es'
                  ? 'Estrategia de campaña, comparación de rutas y planificación de ejecución'
                  : 'Campaign strategy, route comparison, and execution planning',
            },
            {
              label: locale === 'es' ? 'Rol' : 'Role',
              value:
                locale === 'es'
                  ? 'Diseño de producto, arquitectura de flujo con IA e implementación full-stack'
                  : 'Product design, AI workflow architecture, and full-stack implementation',
            },
            {
              label: 'Stack',
              value: 'Next.js, TypeScript, React, Zod, OpenAI structured outputs, deterministic validation',
            },
            {
              label: locale === 'es' ? 'Estado' : 'Status',
              value: locale === 'es' ? 'v1 interna finalizada' : 'Finished internal v1',
            },
          ]}
        />

        <section
          id="problem"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="campaign-sandbox-problem"
        >
          <div className="data-brief-section__container">
            <div className="campaign-sandbox-two-column">
              <div className="data-brief-refresh-heading">
                <p className="data-brief-eyebrow">Problem</p>
                <h2 id="campaign-sandbox-problem">Strategy starts with fragmented inputs.</h2>
              </div>
              <div className="campaign-sandbox-copy">
                <p>
                  Early campaign strategy work often starts with client notes, product claims, creative mandatories,
                  audience assumptions, launch constraints, and unclear positioning.
                </p>
                <p>
                  The challenge was to turn those inputs into structured campaign thinking without pretending to
                  replace strategy, market research, or creative judgment.
                </p>
                <p>
                  The core design constraint was reliability: the system had to be useful without becoming an
                  uncontrolled autonomous agent.
                </p>
              </div>
            </div>
            <blockquote className="campaign-sandbox-callout">
              Not an autonomous agent. A bounded strategy workflow.
            </blockquote>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light" aria-labelledby="objective-heading">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Objective</p>
              <h2 id="objective-heading">Move from brief to strategy faster while keeping judgment human.</h2>
            </div>
            <ul className="campaign-sandbox-check-grid">
              {objectiveItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="architecture"
          className="data-brief-section data-brief-section--dark data-brief-section--result"
          aria-labelledby="architecture-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Architecture decision</p>
              <h2 id="architecture-heading">A hybrid workflow-agent architecture.</h2>
              <p>
                Bounded LLM stages handle interpretation, synthesis, and critique. Deterministic code handles routing,
                schemas, validation, scoring, access control, proof checks, exports, and safety boundaries.
              </p>
            </div>
            <div className="campaign-sandbox-workflow" aria-label="Campaign Sandbox workflow">
              {workflowStages.map((stage, index) => (
                <span key={stage}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  {stage}
                </span>
              ))}
            </div>
            <div className="campaign-sandbox-reasons">
              <p>Campaign strategy requires judgment and synthesis.</p>
              <p>Reliability requires deterministic boundaries.</p>
              <p>Route selection should remain human-controlled.</p>
              <p>Synthetic reactions must not be treated as research.</p>
              <p>Exports should be deterministic and auditable.</p>
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light" aria-labelledby="cockpit-heading">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Workflow / Decision cockpit</p>
              <h2 id="cockpit-heading">Make route tradeoffs visible before selection.</h2>
              <p>
                The Decision Cockpit summarizes the recommended route, runner-up strength, biggest tradeoff, primary
                risk, close-score warnings, and selection or export status.
              </p>
            </div>
            <CaseStudyScreenshot
              src="02-decision-cockpit.webp"
              alt="Campaign Sandbox decision cockpit"
              caption="Decision cockpit summarizing the recommended route, tradeoffs, risk, and route status."
            />
          </div>
        </section>

        <section
          id="routes"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="routes-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Route development</p>
              <h2 id="routes-heading">Three territories, each with a strategic job and failure mode.</h2>
              <p>
                Every route includes a name, strategic role, killer line, enemy, proof mechanism, visual world,
                channel fit, failure mode, and strategic estimate.
              </p>
            </div>
            <CaseStudyScreenshot
              src="03-route-cards.webp"
              alt="Campaign Sandbox generated campaign route cards"
              caption="Generated campaign territories with scoring, positioning, proof mechanism, and route risks."
            />
            <blockquote className="campaign-sandbox-callout campaign-sandbox-callout--compact">
              Synthetic audience reactions are planning hypotheses, not market research.
            </blockquote>
          </div>
        </section>

        <section
          id="creative-review"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="creative-review-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Creative review</p>
              <h2 id="creative-review-heading">A critique layer focused on distinctiveness, not approval.</h2>
              <p>
                Creative Director Review examines originality, ownability, cultural sharpness, visual potential,
                conversion clarity, and genericity risk. It also proposes sharper route names, killer lines, and
                route-level notes.
              </p>
            </div>
            <CaseStudyScreenshot
              src="04-creative-director-review.webp"
              alt="Campaign Sandbox Creative Director Review"
              caption="Creative Director Review critiques originality, ownability, cultural sharpness, and genericity risk."
            />
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream" aria-labelledby="features-heading">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Key features</p>
              <h2 id="features-heading">Each stage narrows uncertainty without hiding it.</h2>
            </div>
            <div className="data-brief-card-grid data-brief-card-grid--architecture campaign-sandbox-feature-grid">
              {featureGroups.map((feature) => (
                <article key={feature.title} className="data-brief-card data-brief-card--architecture">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="execution"
          className="data-brief-section data-brief-section--light"
          aria-labelledby="execution-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Execution</p>
              <h2 id="execution-heading">Turn the selected route into a practical campaign system.</h2>
              <p>
                After manual route selection, the workflow generates a campaign spine, launch plan, channel system,
                production system, copy system, measurement system, claims and legal review, and next actions.
              </p>
            </div>
            <CaseStudyScreenshot
              src="05-execution-plan.webp"
              alt="Campaign Sandbox execution plan"
              caption="Selected route expanded into an execution plan, channel system, production system, copy, measurement, and legal review notes."
            />
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream" aria-labelledby="export-heading">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Export system</p>
              <h2 id="export-heading">Structured output becomes a deterministic artifact.</h2>
              <p>
                Markdown reports, HTML reports, and PPTX route decks are generated directly from validated workflow
                output. No LLM is used during export generation.
              </p>
            </div>
            <CaseStudyScreenshot
              src="06-export-panel.webp"
              alt="Campaign Sandbox export panel"
              caption="Deterministic export to Markdown, HTML, and PPTX route deck."
            />
          </div>
        </section>

        <section
          id="reliability"
          className="data-brief-section data-brief-section--dark data-brief-section--result"
          aria-labelledby="reliability-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Reliability and safety design</p>
              <h2 id="reliability-heading">Controlled AI use instead of uncontrolled autonomy.</h2>
              <p>
                Proof integrity guardrails block unsupported testimonials, fake user-generated content, and
                unsubstantiated performance claims unless the source brief provides support.
              </p>
            </div>
            <div className="campaign-sandbox-safety-grid">
              {safetyItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="campaign-sandbox-access-note">
              <h3>Password-protected deployment</h3>
              <p>
                The repository is public, but a deployed operating surface should remain behind an internal password
                gate because using the app can trigger server-side LLM calls.
              </p>
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light" aria-labelledby="stack-heading">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Technical stack</p>
              <h2 id="stack-heading">A typed application with deterministic boundaries.</h2>
            </div>
            <div className="data-brief-stack campaign-sandbox-stack" aria-label="Campaign Sandbox technology stack">
              {[
                'Next.js',
                'TypeScript',
                'React',
                'Zod',
                'OpenAI structured outputs',
                'Local browser storage',
                'Markdown export',
                'HTML export',
                'PPTX export',
                'Vitest',
                'Middleware password gate',
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="outcome"
          className="data-brief-section data-brief-section--cream"
          aria-labelledby="outcome-heading"
        >
          <div className="data-brief-section__container">
            <div className="campaign-sandbox-two-column">
              <div className="data-brief-refresh-heading">
                <p className="data-brief-eyebrow">Outcome</p>
                <h2 id="outcome-heading">Finished internal v1.</h2>
                <p>
                  Campaign Sandbox is suitable as an internal strategy accelerator and a portfolio case study in
                  reliable AI workflow design.
                </p>
              </div>
              <ul className="campaign-sandbox-verification-list">
                {verificationItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light" aria-labelledby="learning-heading">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">What I learned</p>
              <h2 id="learning-heading">The most important decision was making the system more bounded.</h2>
              <p>
                Useful AI systems need deterministic routing, schema validation, explicit safety boundaries, human
                approval points, quality gates, traceable stages, clear caveats, and controlled access.
              </p>
              <p>
                The strongest version is not an autonomous marketing agent. It is a structured workspace that
                accelerates strategy while keeping the human responsible for judgment.
              </p>
            </div>
          </div>
        </section>

        <section
          className="data-brief-section data-brief-section--dark data-brief-section--result"
          aria-labelledby="limitations-heading"
        >
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Limitations / Final status</p>
              <h2 id="limitations-heading">Built for internal work, not SaaS.</h2>
            </div>
            <ul className="data-brief-list campaign-sandbox-limitations">
              {limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="data-brief-actions">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="data-brief-button data-brief-button--primary"
              >
                View GitHub repository
              </a>
              <Link href={localizePath('/case-studies', locale)} className="data-brief-button">
                {backLabel}
              </Link>
            </div>
          </div>
        </section>

        <CaseStudyNext currentHref={pathname} accentColor="var(--accent)" locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
