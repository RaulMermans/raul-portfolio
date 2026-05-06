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
  'AI Workflow',
  'Data Analysis',
  'FastAPI',
  'Next.js',
  'Python Sandbox',
  'Evaluation Loop',
  'Portfolio Prototype',
]

const workflowSteps = [
  {
    title: 'Validate',
    description: 'Checks file format and structure.',
  },
  {
    title: 'Profile',
    description: 'Detects rows, columns, missing values, duplicates, and field types.',
  },
  {
    title: 'Semantic role detection',
    description: 'Identifies dates, prices, quantities, identifiers, categories, and unsupported fields.',
  },
  {
    title: 'Plan',
    description: 'Creates a dataset-specific analysis plan.',
  },
  {
    title: 'Execute',
    description: 'Runs generated Python in a constrained environment.',
  },
  {
    title: 'Evaluate + Repair',
    description: 'Checks execution and retries bounded recoverable failures.',
  },
  {
    title: 'Report',
    description: 'Generates grounded KPIs, findings, recommendations, limitations, and charts.',
  },
  {
    title: 'Export',
    description: 'Provides Markdown report, JSON findings, and analysis script.',
  },
]

const features = [
  'CSV/XLSX upload',
  'Dataset profiling',
  'Semantic column-role detection',
  'Domain-aware routing',
  'Controlled Python analysis',
  'Bounded repair loop',
  'Grounded KPI/report generation',
  'Exportable report, findings JSON, and analysis script',
  'Synthetic and public demo datasets',
  'Honest limitations for unsupported metrics',
]

const datasets = [
  {
    title: 'Amazon purchases sample',
    description:
      'A messy ecommerce-style dataset used to test semantic safeguards. The workflow correctly avoids unsupported order-level metrics when no order ID exists and marks return/cancel rate as unavailable when no status field exists.',
    file: 'amazon-purchases-sample.csv',
    href: '/assets/case-studies/data-brief-ai/amazon-purchases-sample.csv',
    label: 'Download Amazon sample',
  },
  {
    title: 'Marketing campaign sample',
    description:
      'A campaign-performance dataset used to explore how the workflow handles marketing-style metrics such as revenue, spend, clicks, leads, orders, and campaign categories. This also revealed a future improvement area: adding a dedicated marketing-campaign route.',
    file: 'Marketing.csv',
    href: '/assets/case-studies/data-brief-ai/Marketing.csv',
    label: 'Download Marketing sample',
  },
]

const outputPlaceholders = [
  {
    title: 'Report header',
    caption: 'Grounded report header with dataset type, execution status, and confidence label.',
  },
  {
    title: 'Primary metrics',
    caption: 'Primary metrics filtered to avoid unsupported order-level claims.',
  },
  {
    title: 'Top findings',
    caption: 'Top findings with explicit source references.',
  },
  {
    title: 'Charts',
    caption: 'Charts generated from the uploaded file.',
  },
  {
    title: 'Exports',
    caption: 'Export options for report, findings JSON, and generated analysis script.',
  },
]

const limitations = [
  'No OS-level network/filesystem sandbox isolation.',
  'Not a fully autonomous AI agent.',
  'No external web enrichment.',
  'Marketing campaign routing is a future improvement.',
  'Output quality depends on column naming and dataset structure.',
  'Designed for portfolio demonstration, not production deployment.',
]

const futureImprovements = [
  'Add dedicated marketing-campaign route.',
  'Improve chart title semantics.',
  'Add stronger OS-level sandboxing.',
  'Add more domain recipes.',
  'Add richer evaluation fixtures.',
  'Add optional analysis-strategy planner.',
]

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
          <div className="data-brief-hero__grid" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="data-brief-hero__content">
            <Link href={localizePath('/case-studies/ai-systems-agents', locale)} className="data-brief-back">
              Back to AI Systems
            </Link>
            <p className="data-brief-eyebrow">Bounded AI Analytics Workflow</p>
            <h1 id="data-brief-title" className="data-brief-hero__title">
              DataBrief AI
            </h1>
            <p className="data-brief-hero__subtitle">
              Turning messy spreadsheets into grounded business reports through controlled AI orchestration.
            </p>
            <p className="data-brief-hero__description">
              DataBrief AI transforms CSV/XLSX uploads into structured business reports using deterministic profiling,
              semantic role detection, controlled Python execution, bounded repair, and grounded report generation.
            </p>
            <div className="data-brief-tags" aria-label="Project tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="data-brief-actions" aria-label="Project links">
              <a href={githubUrl} target="_blank" rel="noreferrer" className="data-brief-button data-brief-button--primary">
                View GitHub
              </a>
              <a href={demoUrl} target="_blank" rel="noreferrer" className="data-brief-button">
                Open Live Demo
              </a>
              <a href="#example-datasets" className="data-brief-button">
                Download Example Datasets
              </a>
            </div>
          </div>
          <div className="data-brief-hero__panel" aria-label="Workflow summary">
            <div className="data-brief-terminal">
              <div className="data-brief-terminal__bar">
                <span />
                <span />
                <span />
              </div>
              <div className="data-brief-terminal__body">
                <p>upload.csv → profile.json</p>
                <p>roles: date · revenue · category</p>
                <p>status: executed · repaired: 1</p>
                <p>exports: report.md · findings.json · analysis.py</p>
              </div>
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light" aria-labelledby="data-brief-context">
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Context / Problem</p>
              <h2 id="data-brief-context">Useful reports without unsupported claims.</h2>
            </div>
            <p>
              Spreadsheets often contain valuable business signals, but lightweight AI tools tend to either summarize
              them generically or overclaim insights the dataset cannot actually support. DataBrief AI explores a more
              constrained approach: using AI workflow patterns to generate useful reports while keeping the system
              bounded, inspectable, and grounded in the uploaded file.
            </p>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--dark" aria-labelledby="data-brief-core">
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Core idea</p>
              <h2 id="data-brief-core">Workflow over autonomous agent.</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                Instead of building a free-form AI analyst, DataBrief AI uses a bounded workflow. The system profiles
                the file, detects semantic column roles, generates a safe analysis plan, executes controlled Python,
                evaluates the output, repairs common failures, and produces a grounded report with exports.
              </p>
              <p>
                The design decision was intentional: workflow over autonomous agent. For spreadsheet analysis,
                reliability and reproducibility matter more than open-ended autonomy.
              </p>
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--light" aria-labelledby="data-brief-architecture">
          <div className="data-brief-section__container">
            <p className="data-brief-eyebrow">Workflow / Architecture</p>
            <h2 id="data-brief-architecture">A bounded path from upload to export.</h2>
            <div className="data-brief-flow" aria-label="DataBrief AI workflow">
              {['Upload CSV/XLSX', 'Validate', 'Profile', 'Route', 'Plan', 'Controlled Python Execution', 'Evaluate + Repair', 'Grounded Report', 'Export'].map((step) => (
                <span key={step}>{step}</span>
              ))}
            </div>
            <div className="data-brief-card-grid data-brief-card-grid--workflow">
              {workflowSteps.map((step) => (
                <article key={step.title} className="data-brief-card">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream" aria-labelledby="data-brief-features">
          <div className="data-brief-section__container">
            <p className="data-brief-eyebrow">Key features</p>
            <h2 id="data-brief-features">Small pieces, clear boundaries.</h2>
            <div className="data-brief-feature-grid">
              {features.map((feature) => (
                <div key={feature} className="data-brief-feature">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--dark" aria-labelledby="data-brief-decision">
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Design decision</p>
              <h2 id="data-brief-decision">Workflow, not agent.</h2>
            </div>
            <div className="data-brief-copy-stack">
              <p>
                A full autonomous agent was intentionally avoided. DataBrief AI uses agentic patterns — routing,
                evaluation, bounded repair, and grounded generation — without giving the system open-ended tool use or
                arbitrary autonomy. This keeps the experience more predictable and easier to evaluate.
              </p>
              <p>
                This distinction became central to the project: not every AI system needs to become an agent. In this
                case, the stronger architecture was a workflow with controlled decision points.
              </p>
            </div>
          </div>
        </section>

        <section id="example-datasets" className="data-brief-section data-brief-section--light" aria-labelledby="data-brief-datasets">
          <div className="data-brief-section__container">
            <p className="data-brief-eyebrow">Example datasets</p>
            <h2 id="data-brief-datasets">Demo files for grounded behavior.</h2>
            <div className="data-brief-card-grid data-brief-card-grid--datasets">
              {datasets.map((dataset) => (
                <article key={dataset.file} className="data-brief-card data-brief-card--dataset">
                  <p className="data-brief-card__file">{dataset.file}</p>
                  <h3>{dataset.title}</h3>
                  <p>{dataset.description}</p>
                  <a href={dataset.href} download className="data-brief-text-link">
                    {dataset.label}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream" aria-labelledby="data-brief-output">
          <div className="data-brief-section__container">
            <p className="data-brief-eyebrow">Output preview</p>
            <h2 id="data-brief-output">Screenshot slots for the report experience.</h2>
            <div className="data-brief-preview-grid">
              {outputPlaceholders.map((preview) => (
                <figure key={preview.title} className="data-brief-preview">
                  <div className="data-brief-preview__placeholder">
                    <span>{preview.title}</span>
                  </div>
                  <figcaption>{preview.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--dark" aria-labelledby="data-brief-limitations">
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Limitations</p>
              <h2 id="data-brief-limitations">Bounded by design.</h2>
              <p className="data-brief-section__lede">
                This is a portfolio prototype, not production SaaS. The sandbox uses static checks and resource limits
                but does not implement OS-level isolation. Analysis quality depends on detectable column roles, and
                unsupported metrics are intentionally marked as unavailable rather than invented.
              </p>
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
              <p className="data-brief-eyebrow">What I learned</p>
              <h2 id="data-brief-learning">Autonomy is not always the highest-value feature.</h2>
            </div>
            <p>
              The project clarified a key AI product design principle: autonomy is not always the highest-value
              feature. For structured tasks like spreadsheet analysis, a bounded workflow can produce a more trustworthy
              user experience than a free-form agent. The strongest part of the system is not that it does everything,
              but that it knows what the data does and does not support.
            </p>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--cream" aria-labelledby="data-brief-future">
          <div className="data-brief-section__container data-brief-two-column">
            <div>
              <p className="data-brief-eyebrow">Future improvements</p>
              <h2 id="data-brief-future">Where the prototype goes next.</h2>
            </div>
            <ul className="data-brief-list data-brief-list--light">
              {futureImprovements.map((improvement) => (
                <li key={improvement}>{improvement}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="data-brief-section data-brief-section--closing" aria-labelledby="data-brief-closing">
          <div className="data-brief-section__container">
            <h2 id="data-brief-closing">
              DataBrief AI demonstrates how AI workflow architecture can make spreadsheet analysis more useful,
              constrained, and transparent.
            </h2>
            <p>
              It is a technical case study in designing with boundaries: enough intelligence to adapt to a file, enough
              structure to avoid unsupported claims.
            </p>
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
