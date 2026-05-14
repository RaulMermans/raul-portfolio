'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCaseStudySetup } from '@/hooks'
import { getCaseStudies } from '@/data/case-studies'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'

const githubUrl = 'https://github.com/RaulMermans/DataBrief-AI.git'
const demoUrl = 'https://data-brief-ai-sigma.vercel.app'

const tags = [
  'Bounded AI',
  'CSV/XLSX',
  'Python',
  'Report Export',
  'Evaluation Loop',
]

const navItems = [
  ['Overview', '#overview'],
  ['Workflow', '#workflow'],
  ['Output', '#output'],
  ['Architecture', '#architecture'],
  ['Result', '#result'],
] as const

const proofCards = [
  {
    title: 'Order Count / Average Order Value',
    reason: 'No order ID was detected.',
    outcome: 'The report switches to purchase-line analysis instead of inventing order metrics.',
  },
  {
    title: 'Return/cancel rate = 0%',
    reason: 'No return, refund, cancel, or status field was detected.',
    outcome: 'The report marks the metric unavailable instead of presenting a false zero.',
  },
] as const

const workflowPhases = [
  {
    title: 'Profile',
    description: 'Read rows, columns, types, missing values, duplicates, and semantic field roles.',
  },
  {
    title: 'Route + Plan',
    description: 'Classify the dataset domain and build a bounded KPI/chart plan from supported signals only.',
  },
  {
    title: 'Execute',
    description: 'Run controlled Python analysis to create metrics, charts, and structured artifacts.',
  },
  {
    title: 'Evaluate + Export',
    description: 'Classify execution results, repair only recoverable failures, ground the report, and package exports.',
  },
] as const

const outputPreviews = [
  {
    label: 'A',
    title: 'Supported metrics',
    caption: 'The report leads with metrics the uploaded file can actually support.',
  },
  {
    label: 'B',
    title: 'Grounded findings',
    caption: 'Findings and data quality checks are shown before interpretation.',
  },
  {
    label: 'C',
    title: 'Artifacts + exports',
    caption: 'Report Markdown, findings JSON, charts, and generated analysis code stay tied to the run.',
  },
]

const softwareLayers = [
  {
    title: 'HTTP boundary',
    description:
      'FastAPI accepts CSV/XLSX uploads, validates size and format, creates a run record, and exposes status, artifact, and export endpoints without leaking host paths.',
  },
  {
    title: 'Semantic profiling',
    description:
      'The backend profiles rows, columns, missing values, duplicates, inferred types, and semantic roles before deciding what analysis path is allowed.',
  },
  {
    title: 'Controlled execution',
    description:
      'Template-generated Python is checked with AST import rules and suspicious-pattern guards, then run in an isolated subprocess with time and resource limits.',
  },
  {
    title: 'Evaluation loop',
    description:
      'Execution results are classified as success, recoverable, or unrecoverable. Recoverable failures get at most two deterministic repair attempts.',
  },
  {
    title: 'Grounded report',
    description:
      'The report generator builds KPIs, findings, warnings, recommendations, and caveats from computed outputs only, then revises unsupported claims in one pass.',
  },
  {
    title: 'Run store',
    description:
      'SQLite tracks run status, route, plan, evaluation, retry count, generated code, report payload, expiry, and export metadata for each upload.',
  },
] as const

const stackItems = [
  'Next.js frontend',
  'FastAPI backend',
  'Python analysis runtime',
  'CSV/XLSX parsing',
  'Static code checks',
  'Controlled execution',
  'Report export',
  'Semantic quality tests',
]

const limitations = [
  'It is not positioned as production SaaS.',
  'It is not a fully autonomous AI agent.',
  'It does not implement OS-level sandbox isolation.',
  'It does not enrich uploads with external web sources.',
  'Output quality depends on detectable column roles and dataset structure.',
  'Dedicated campaign-performance routing is a future domain extension.',
]

const resultCards = [
  {
    title: 'Product decision',
    description:
      'A bounded workflow fits spreadsheet analysis better than a free-form agent because the task has a repeatable structure.',
  },
  {
    title: 'Reliability frame',
    description:
      'The system values explicit caveats, controlled execution, and supported outputs over broad autonomy.',
  },
  {
    title: 'Public boundary',
    description:
      'The case study shows architecture and behavior without positioning the prototype as production SaaS.',
  },
] as const

function ReportMockup({ variant = 'hero' }: { variant?: 'hero' | 'findings' | 'charts' | 'exports' }) {
  if (variant === 'findings') {
    return (
      <div className="data-brief-report data-brief-report--compact">
        <div className="data-brief-report__topline">
          <span>Top findings</span>
          <strong>Grounded</strong>
        </div>
        <div className="data-brief-report__findings">
          <p>Highest spend appears in household and grocery categories.</p>
          <p>Missing values and duplicate rows are surfaced before interpretation.</p>
          <p className="data-brief-report__caveat">Unavailable: true order-level metrics.</p>
        </div>
      </div>
    )
  }

  if (variant === 'charts') {
    return (
      <div className="data-brief-report data-brief-report--compact">
        <div className="data-brief-report__topline">
          <span>Charts</span>
          <strong>Generated</strong>
        </div>
        <div className="data-brief-chart" aria-hidden="true">
          <span style={{ height: '54%' }} />
          <span style={{ height: '78%' }} />
          <span style={{ height: '42%' }} />
          <span style={{ height: '66%' }} />
          <span style={{ height: '88%' }} />
        </div>
      </div>
    )
  }

  if (variant === 'exports') {
    return (
      <div className="data-brief-report data-brief-report--compact">
        <div className="data-brief-report__topline">
          <span>Exports</span>
          <strong>Ready</strong>
        </div>
        <div className="data-brief-export-list">
          <span>report.md</span>
          <span>findings.json</span>
          <span>analysis.py</span>
        </div>
      </div>
    )
  }

  return (
    <div className="data-brief-report">
      <div className="data-brief-report__topline">
        <span>Analysis Report</span>
        <strong>Data confidence: High</strong>
      </div>
      <div className="data-brief-report__status">
        <span>Execution complete</span>
        <span>Unsupported metrics flagged</span>
      </div>
      <div className="data-brief-report__metrics">
        <article>
          <span>Primary metric</span>
          <strong>$10,482</strong>
          <em>Total spend detected</em>
        </article>
        <article>
          <span>Purchase line count</span>
          <strong>1,248</strong>
          <em>Rows with purchase signal</em>
        </article>
        <article>
          <span>Average spend per row</span>
          <strong>$8.40</strong>
          <em>Supported by row-level data</em>
        </article>
      </div>
      <div className="data-brief-report__note">
        Order Count and Average Order Value are unavailable because no order ID was detected.
      </div>
    </div>
  )
}

export default function DataBriefAiPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const caseStudies = getCaseStudies(locale)
  const nextCaseStudy = caseStudies.find((caseStudy) => caseStudy.href.includes('ai-sports'))

  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="case-study-page-new case-study-page-new--data-brief">
        <section className="data-brief-hero" aria-labelledby="data-brief-title">
          <div className="data-brief-hero__content">
            <Link href={localizePath('/case-studies', locale)} className="data-brief-back">
              {locale === 'es' ? 'Volver a casos' : 'Back to Case Studies'}
            </Link>
            <p className="data-brief-eyebrow">AI Systems / Analytics Workflow</p>
            <h1 id="data-brief-title" className="data-brief-hero__title">
              DataBrief AI
            </h1>
            <p className="data-brief-hero__subtitle">
              A bounded AI workflow that turns spreadsheet uploads into grounded business reports — without inventing
              unsupported metrics.
            </p>
            <p className="data-brief-hero__description">
              DataBrief AI analyzes CSV/XLSX files through semantic role detection, controlled Python execution, bounded
              repair, and report export. The system is designed to surface what the data supports and make unsupported
              metrics explicit.
            </p>
            <div className="data-brief-actions" aria-label="Project links">
              <a href={demoUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                Live Demo →
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                GitHub →
              </a>
              <a href="#workflow" className="data-brief-button">
                How It Works
              </a>
            </div>
            <div className="data-brief-tags" aria-label="Project tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <figure className="data-brief-hero__visual" aria-label="Report output preview">
            <ReportMockup />
            <figcaption>Representative report preview showing supported metrics and explicit caveats.</figcaption>
          </figure>
        </section>

        <nav className="data-brief-mini-nav" aria-label="DataBrief AI page sections">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <section id="overview" className="data-brief-section data-brief-section--light data-brief-section--overview" aria-labelledby="data-brief-problem">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Overview</p>
              <h2 id="data-brief-problem">The product promise is restraint</h2>
              <p>
                Spreadsheets often contain useful business signals, but AI reports become misleading when they calculate
                metrics the dataset cannot support. DataBrief AI is built around a stricter question: what can this file
                prove, and what should the system refuse to infer?
              </p>
            </div>
            <div className="data-brief-refusal-grid">
              {proofCards.map((card) => (
                <article key={card.title} className="data-brief-refusal-card">
                  <span>Unsupported claim avoided</span>
                  <h3>{card.title}</h3>
                  <dl>
                    <div>
                      <dt>Reason</dt>
                      <dd>{card.reason}</dd>
                    </div>
                    <div>
                      <dt>Outcome</dt>
                      <dd>{card.outcome}</dd>
                    </div>
                  </dl>
                </article>
              ))}
              <article className="data-brief-principle-card">
                <span>Design principle</span>
                <strong>Reliability over autonomy.</strong>
                <p>
                  The value of the workflow is not that it tries to answer everything. It is that it makes unsupported
                  claims visible before they become business reporting.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="workflow" className="data-brief-section data-brief-section--cream" aria-labelledby="data-brief-workflow">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Workflow</p>
              <h2 id="data-brief-workflow">Four phases, clear boundaries</h2>
              <p>
                The software keeps a strict pipeline behind the simplified presentation: validate the upload, profile
                the dataset, route the domain, plan supported analysis, execute generated Python, evaluate the result,
                repair only recoverable failures, then package the report and exports.
              </p>
            </div>
            <div className="data-brief-flow" aria-label="DataBrief AI workflow">
              {workflowPhases.map((phase) => (
                <span key={phase.title}>{phase.title}</span>
              ))}
            </div>
            <div className="data-brief-phase-grid">
              {workflowPhases.map((phase) => (
                <article key={phase.title} className="data-brief-phase-card">
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="output" className="data-brief-section data-brief-section--cream" aria-labelledby="data-brief-output">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Output</p>
              <h2 id="data-brief-output">A report surface that separates signal from caveat</h2>
              <p>
                The page keeps one strong report preview and three supporting output cards, instead of repeating the
                same mockup across every section.
              </p>
            </div>
            <div className="data-brief-output-showcase">
              <figure className="data-brief-output-main">
                <ReportMockup />
                <figcaption>Representative run preview. Unsupported order-level metrics are explicitly flagged.</figcaption>
              </figure>
              <div className="data-brief-output-list">
                {outputPreviews.map((preview) => (
                  <article key={preview.label}>
                    <span>{preview.label}</span>
                    <h3>{preview.title}</h3>
                    <p>{preview.caption}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="architecture" className="data-brief-section data-brief-section--light" aria-labelledby="data-brief-architecture">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Architecture</p>
              <h2 id="data-brief-architecture">The software is a bounded pipeline, not a chatbot wrapper</h2>
              <p>
                The system is organized around explicit service boundaries: profile first, route from detectable
                signals, generate analysis code from templates, run it under guardrails, evaluate the result, and
                expose artifacts through stable export endpoints.
              </p>
            </div>
            <div className="data-brief-card-grid data-brief-card-grid--architecture data-brief-card-grid--software">
              {softwareLayers.map((layer) => (
                <article key={layer.title} className="data-brief-card data-brief-card--architecture">
                  <h3>{layer.title}</h3>
                  <p>{layer.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="result" className="data-brief-section data-brief-section--dark data-brief-section--result" aria-labelledby="data-brief-result">
          <div className="data-brief-section__container">
            <div className="data-brief-refresh-heading">
              <p className="data-brief-eyebrow">Result</p>
              <h2 id="data-brief-result">A useful AI system because it stays inside its lane</h2>
              <p>
                DataBrief AI uses agentic patterns — routing, evaluation, bounded repair, and grounded generation —
                inside a deterministic workflow shell.
              </p>
            </div>
            <div className="data-brief-result-grid">
              {resultCards.map((card) => (
                <article key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
            <div className="data-brief-boundary-panel">
              <div>
                <p className="data-brief-eyebrow">Built with</p>
                <div className="data-brief-stack" aria-label="DataBrief AI technology stack">
                  {stackItems.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="data-brief-eyebrow">Boundaries</p>
                <ul className="data-brief-list">
                  {limitations.map((limitation) => (
                    <li key={limitation}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="data-brief-actions">
              <a href={demoUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                Open Live Demo →
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                View GitHub →
              </a>
              <a href="#architecture" className="data-brief-button">
                View Architecture
              </a>
            </div>
          </div>
        </section>

        <CaseStudyNext
          nextCaseStudy={nextCaseStudy}
          accentColor="var(--accent)"
          locale={locale}
        />
      </main>
      <Footer locale={locale} />
    </>
  )
}
