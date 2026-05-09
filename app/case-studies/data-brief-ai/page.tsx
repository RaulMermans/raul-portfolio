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
const amazonDatasetUrl = '/assets/case-studies/data-brief-ai/amazon-purchases-sample.csv'
const marketingDatasetUrl = '/assets/case-studies/data-brief-ai/Marketing.csv'

const tags = [
  'AI Workflow',
  'Data Analysis',
  'FastAPI',
  'Next.js',
  'Python',
  'Controlled Execution',
  'Evaluation Loop',
  'Technical Case Study',
]

const navItems = [
  ['Overview', '#overview'],
  ['Proof', '#proof'],
  ['Workflow', '#workflow'],
  ['Output', '#output'],
  ['Datasets', '#datasets'],
  ['Limits', '#limits'],
  ['Links', '#links'],
] as const

const workflowSteps = [
  ['Upload', 'User submits CSV/XLSX file.'],
  ['Validate', 'File format and structure are checked.'],
  ['Profile', 'Rows, columns, types, missing values, and duplicates are detected.'],
  ['Route', 'Dataset signals determine the analysis path.'],
  ['Plan', 'A bounded KPI and chart plan is generated.'],
  ['Execute', 'Controlled Python analysis creates metrics and artifacts.'],
  ['Evaluate + Repair', 'Output is checked and recoverable failures are repaired.'],
  ['Report', 'KPIs, findings, charts, recommendations, and caveats are rendered.'],
  ['Export', 'Report, findings JSON, and analysis script are downloadable.'],
] as const

const architectureCards = [
  {
    title: 'Semantic Layer',
    description:
      'Detects column roles such as dates, prices, quantities, identifiers, categories, and unsupported fields.',
  },
  {
    title: 'Execution Layer',
    description:
      'Generates and runs controlled Python analysis to produce KPIs, charts, and structured artifacts.',
  },
  {
    title: 'Evaluation Layer',
    description:
      'Checks whether findings are grounded, repairs recoverable issues, and exposes caveats.',
  },
  {
    title: 'Export Layer',
    description:
      'Packages the report, findings JSON, and generated analysis script for review.',
  },
]

const outputPreviews = [
  {
    label: 'A',
    title: 'Report header + primary metrics',
    caption: 'Supported metrics are surfaced first, with confidence and execution status visible.',
  },
  {
    label: 'B',
    title: 'Top findings + data quality checks',
    caption: 'Unsupported metrics are shown as caveats instead of being silently calculated.',
  },
  {
    label: 'C',
    title: 'Charts',
    caption: 'Charts are generated from the uploaded file and tied to report artifacts.',
  },
  {
    label: 'D',
    title: 'Exports',
    caption: 'Each run can export a Markdown report, findings JSON, and generated analysis script.',
  },
]

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
            <Link href={localizePath('/case-studies/ai-systems-agents', locale)} className="data-brief-back">
              Back to AI Systems
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
              <a href="#datasets" className="data-brief-button">
                View Example Datasets
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
            <figcaption>Representative report preview based on the ecommerce sample.</figcaption>
          </figure>
        </section>

        <nav className="data-brief-mini-nav" aria-label="DataBrief AI page sections">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <section id="overview" className="data-brief-section data-brief-section--light" aria-labelledby="data-brief-problem">
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Overview</p>
              <h2 id="data-brief-problem">The problem: AI reports often overclaim</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                Spreadsheets often contain valuable business signals, but AI-generated reports can become misleading
                when they calculate metrics the dataset does not actually support. A file may contain purchase lines but
                no order IDs, revenue but no margin, or activity records with no customer-level fields.
              </p>
              <p className="data-brief-question">
                DataBrief AI was built around a stricter question: What can this dataset support — and what should the
                system refuse to infer?
              </p>
            </div>
          </div>
        </section>

        <section id="proof" className="data-brief-section data-brief-section--proof" aria-labelledby="data-brief-proof">
          <div className="data-brief-section__container">
            <div className="data-brief-section__header">
              <p className="data-brief-eyebrow">Proof</p>
              <h2 id="data-brief-proof">The important part: it does not fake confidence</h2>
              <p>
                In the ecommerce sample, the file contains purchase lines but no true order ID. Instead of inventing
                “Order Count” or “Average Order Value,” DataBrief AI reports “Purchase Line Count” and marks true
                order-level metrics as unavailable.
              </p>
              <p>
                When no return, refund, cancel, or status field exists, the workflow marks return/cancel rate as
                unavailable instead of showing a misleading 0%.
              </p>
            </div>
            <div className="data-brief-proof-grid">
              <article className="data-brief-proof-card">
                <span>Unsupported claim avoided</span>
                <h3>“Order Count” / “Average Order Value”</h3>
                <div className="data-brief-proof-card__details">
                  <p>
                    <strong>Reason:</strong> No order ID detected.
                  </p>
                  <p>
                    <strong>Outcome:</strong> Reported as purchase-line analysis instead.
                  </p>
                </div>
              </article>
              <article className="data-brief-proof-card">
                <span>Unsupported claim avoided</span>
                <h3>“Return/cancel rate = 0%”</h3>
                <div className="data-brief-proof-card__details">
                  <p>
                    <strong>Reason:</strong> No return, refund, cancel, or status field detected.
                  </p>
                  <p>
                    <strong>Outcome:</strong> Marked unavailable instead of inferred.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="workflow" className="data-brief-section data-brief-section--cream" aria-labelledby="data-brief-workflow">
          <div className="data-brief-section__container">
            <div className="data-brief-section__header">
              <p className="data-brief-eyebrow">Workflow</p>
              <h2 id="data-brief-workflow">How the workflow stays grounded</h2>
            </div>
            <div className="data-brief-flow" aria-label="DataBrief AI workflow">
              {workflowSteps.map(([title]) => (
                <span key={title}>{title}</span>
              ))}
            </div>
            <div className="data-brief-card-grid data-brief-card-grid--workflow">
              {workflowSteps.map(([title, description]) => (
                <article key={title} className="data-brief-card">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light" aria-labelledby="data-brief-architecture">
          <div className="data-brief-section__container">
            <div className="data-brief-section__header">
              <p className="data-brief-eyebrow">Architecture</p>
              <h2 id="data-brief-architecture">Small pieces, clear boundaries</h2>
            </div>
            <div className="data-brief-card-grid data-brief-card-grid--architecture">
              {architectureCards.map((card) => (
                <article key={card.title} className="data-brief-card data-brief-card--architecture">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="output" className="data-brief-section data-brief-section--cream" aria-labelledby="data-brief-output">
          <div className="data-brief-section__container">
            <div className="data-brief-section__header">
              <p className="data-brief-eyebrow">Output</p>
              <h2 id="data-brief-output">Report output</h2>
              <p>Representative UI preview.</p>
            </div>
            <div className="data-brief-preview-grid">
              {outputPreviews.map((preview) => (
                <figure key={preview.label} className="data-brief-preview">
                  <div className="data-brief-preview__frame">
                    <ReportMockup
                      variant={
                        preview.label === 'B'
                          ? 'findings'
                          : preview.label === 'C'
                            ? 'charts'
                            : preview.label === 'D'
                              ? 'exports'
                              : 'hero'
                      }
                    />
                  </div>
                  <figcaption>
                    <span>{preview.title}</span>
                    {preview.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="datasets" className="data-brief-section data-brief-section--light" aria-labelledby="data-brief-datasets">
          <div className="data-brief-section__container">
            <div className="data-brief-section__header">
              <p className="data-brief-eyebrow">Example datasets</p>
              <h2 id="data-brief-datasets">Example datasets</h2>
            </div>
            <div className="data-brief-card-grid data-brief-card-grid--datasets">
              <article className="data-brief-card data-brief-card--dataset">
                <p className="data-brief-card__file">amazon-purchases-sample.csv</p>
                <h3>Amazon Purchases Sample</h3>
                <p>A messy ecommerce-style file used to test semantic safeguards.</p>
                <h4>What it demonstrates</h4>
                <ul className="data-brief-list data-brief-list--light">
                  <li>avoids fake order count</li>
                  <li>avoids fake AOV</li>
                  <li>marks return/cancel rate unavailable</li>
                  <li>surfaces missing values and duplicates</li>
                </ul>
                <div className="data-brief-card__actions">
                  <a href={amazonDatasetUrl} download className="data-brief-text-link">
                    Download Amazon sample
                  </a>
                  <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-text-link">
                    View GitHub
                  </a>
                </div>
              </article>
              <article className="data-brief-card data-brief-card--dataset">
                <p className="data-brief-card__file">Marketing.csv</p>
                <h3>Marketing Campaign Sample</h3>
                <p>A campaign-performance file used to test broader business reporting.</p>
                <h4>What it demonstrates</h4>
                <ul className="data-brief-list data-brief-list--light">
                  <li>revenue and spend analysis</li>
                  <li>campaign-level charting</li>
                  <li>identified an expansion path for campaign-performance analysis</li>
                </ul>
                <div className="data-brief-card__actions">
                  <a href={marketingDatasetUrl} download className="data-brief-text-link">
                    Download Marketing sample
                  </a>
                  <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-text-link">
                    View GitHub
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--dark" aria-labelledby="data-brief-decision">
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Design decision</p>
              <h2 id="data-brief-decision">Why a bounded workflow, not a full agent?</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                Spreadsheet analysis has a known structure: inspect the file, profile it, identify fields, run analysis,
                validate outputs, and generate a report. A fully autonomous agent would add flexibility, but also more
                unpredictability.
              </p>
              <p>
                DataBrief AI uses agentic patterns — routing, evaluation, bounded repair, and grounded generation —
                inside a deterministic workflow shell.
              </p>
              <aside className="data-brief-callout">
                <span>Design principle</span>
                <strong>Reliability over autonomy.</strong>
              </aside>
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream" aria-labelledby="data-brief-stack">
          <div className="data-brief-section__container">
            <div className="data-brief-section__header">
              <p className="data-brief-eyebrow">Tech stack</p>
              <h2 id="data-brief-stack">Built with</h2>
            </div>
            <div className="data-brief-stack" aria-label="DataBrief AI technology stack">
              {stackItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="limits" className="data-brief-section data-brief-section--dark" aria-labelledby="data-brief-limits">
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Limits</p>
              <h2 id="data-brief-limits">System boundaries</h2>
            </div>
            <ul className="data-brief-list">
              {limitations.map((limitation) => (
                <li key={limitation}>{limitation}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light" aria-labelledby="data-brief-learning">
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Design lesson</p>
              <h2 id="data-brief-learning">The design lesson</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                The value of the project is its restraint: it shows how an AI system can be useful by staying inside
                clear boundaries instead of pretending to do everything.
              </p>
              <p>
                DataBrief AI clarified a simple AI product principle: autonomy is not always the highest-value feature.
                For structured tasks like spreadsheet analysis, a bounded workflow with clear validation, execution
                limits, and explicit refusal of unsupported claims can create a more trustworthy experience than a
                free-form agent.
              </p>
            </div>
          </div>
        </section>

        <section id="links" className="data-brief-section data-brief-section--closing" aria-labelledby="data-brief-closing">
          <div className="data-brief-section__container">
            <p className="data-brief-eyebrow">Links</p>
            <h2 id="data-brief-closing">Explore the project</h2>
            <p>
              DataBrief AI is a technical case study in reliable AI workflow architecture for spreadsheet analysis.
            </p>
            <div className="data-brief-actions">
              <a href={demoUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                Open Live Demo →
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                View GitHub →
              </a>
              <a href="#datasets" className="data-brief-button">
                View Example Datasets
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
