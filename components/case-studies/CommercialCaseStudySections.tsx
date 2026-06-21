'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Locale, localizePath } from '@/lib/i18n'
import { getCaseStudyEditorial } from '@/data/case-study-editorial'

export type SnapshotItem = {
  label: string
  value: string
}

export type ProjectLink = {
  label: string
  href: string
  external?: boolean
}

type SystemItem = {
  title: string
  description: string
}

export type CommercialCaseStudyContent = {
  snapshot: SnapshotItem[]
  links?: ProjectLink[]
  businessContext: string
  systemSummary: string
  systemItems: SystemItem[]
  whyItMatters: string
  clientRelevance: string
  ctaCopy: string
}

function ProjectLinks({ links }: { links?: ProjectLink[] }) {
  if (!links?.length) return null

  return (
    <div className="data-brief-actions">
      {links.map(link => {
        if (link.external) {
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="data-brief-button"
            >
              {link.label}
            </a>
          )
        }

        return (
          <Link key={link.href} href={link.href} className="data-brief-button">
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}

const sectionCopy = {
  en: {
    snapshotEyebrow: 'Case Snapshot',
    snapshotTitle: 'The strategic brief',
    snapshotDescription:
      'The problem, the system response, the available proof, the strategic value, and the intentional boundary.',
    readingPath: 'Reading path',
    snapshotStep: 'Snapshot',
    contextStep: 'Problem',
    solutionStep: 'System',
    contextEyebrow: 'Business Context',
    contextTitle: 'The workflow problem behind the project',
    solutionEyebrow: 'System / Solution',
    solutionTitle: 'How the workflow is bounded',
    whyEyebrow: 'Why It Matters',
    whyTitle: 'Reliability beats novelty',
    relevanceEyebrow: 'Client Relevance',
    relevanceTitle: 'Where this becomes useful',
    ctaEyebrow: 'Discuss a Similar AI System',
    ctaTitle: 'Have a creative system worth extending?',
    ctaLabel: 'Start Creative Systems Brief',
  },
  es: {
    snapshotEyebrow: 'Resumen del caso',
    snapshotTitle: 'El brief estratégico',
    snapshotDescription:
      'El problema, la respuesta del sistema, la prueba disponible, el valor estratégico y el límite intencional.',
    readingPath: 'Ruta de lectura',
    snapshotStep: 'Resumen',
    contextStep: 'Problema',
    solutionStep: 'Sistema',
    contextEyebrow: 'Contexto de negocio',
    contextTitle: 'El problema de flujo del proyecto',
    solutionEyebrow: 'Sistema / Solución',
    solutionTitle: 'Cómo se acota el flujo',
    whyEyebrow: 'Por qué importa',
    whyTitle: 'La fiabilidad pesa más que la novedad',
    relevanceEyebrow: 'Uso para clientes',
    relevanceTitle: 'Dónde se vuelve útil',
    ctaEyebrow: 'Hablar de un sistema IA similar',
    ctaTitle: '¿Tienes un sistema creativo que merece desarrollarse?',
    ctaLabel: 'Enviar brief de sistema creativo',
  },
} as const

export function CaseStudySnapshot({
  items,
  links,
  locale = 'en',
  contextHref = '#business-context',
  solutionHref = '#system-solution',
}: {
  items?: SnapshotItem[]
  links?: ProjectLink[]
  locale?: Locale
  contextHref?: string
  solutionHref?: string
}) {
  const pathname = usePathname()
  const copy = sectionCopy[locale]
  const slug = pathname.split('/').filter(Boolean).at(-1) ?? ''
  const strategicSnapshot = getCaseStudyEditorial(slug)?.snapshot[locale]
  const snapshotItems = strategicSnapshot
    ? [
        {
          label: locale === 'es' ? 'Problema' : 'Problem',
          value: strategicSnapshot.problem,
        },
        {
          label: locale === 'es' ? 'Sistema' : 'System',
          value: strategicSnapshot.system,
        },
        {
          label: locale === 'es' ? 'Prueba' : 'Proof',
          value: strategicSnapshot.proof,
        },
        {
          label: locale === 'es' ? 'Valor' : 'Value',
          value: strategicSnapshot.value,
        },
        {
          label: locale === 'es' ? 'Límite' : 'Limitation',
          value: strategicSnapshot.limitation,
        },
      ]
    : (items ?? [])

  return (
    <section
      id="project-snapshot"
      className="data-brief-section data-brief-section--light ui-section case-study-snapshot"
      aria-labelledby="project-snapshot-heading"
    >
      <div className="data-brief-section__container ui-section__container">
        <div className="case-study-snapshot__layout">
          <header className="case-study-snapshot__intro">
            <p className="data-brief-eyebrow ui-eyebrow">
              {copy.snapshotEyebrow}
            </p>
            <h2 id="project-snapshot-heading">{copy.snapshotTitle}</h2>
            <p className="case-study-snapshot__description">
              {copy.snapshotDescription}
            </p>

            <nav
              className="case-study-snapshot__path"
              aria-label={copy.readingPath}
            >
              <span>{copy.readingPath}</span>
              <ol>
                <li aria-current="step">
                  <span>01</span>
                  {copy.snapshotStep}
                </li>
                <li>
                  <a href={contextHref}>
                    <span>02</span>
                    {copy.contextStep}
                  </a>
                </li>
                <li>
                  <a href={solutionHref}>
                    <span>03</span>
                    {copy.solutionStep}
                  </a>
                </li>
              </ol>
            </nav>
          </header>

          <div className="case-study-snapshot__content">
            <dl className="case-study-snapshot__facts">
              {snapshotItems.map((item, index) => (
                <div key={item.label}>
                  <dt>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {item.label}
                  </dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <ProjectLinks links={links} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function CommercialCaseStudyIntro({
  content,
  locale = 'en',
}: {
  content: CommercialCaseStudyContent
  locale?: Locale
}) {
  const copy = sectionCopy[locale]

  return (
    <>
      <CaseStudySnapshot
        items={content.snapshot}
        links={content.links}
        locale={locale}
      />

      <section
        id="business-context"
        className="data-brief-section data-brief-section--cream ui-section"
        aria-labelledby="business-context-heading"
      >
        <div className="data-brief-section__container ui-section__container">
          <div className="data-brief-refresh-heading ui-section-heading">
            <p className="data-brief-eyebrow ui-eyebrow">
              {copy.contextEyebrow}
            </p>
            <h2 id="business-context-heading">{copy.contextTitle}</h2>
            <p>{content.businessContext}</p>
          </div>
        </div>
      </section>

      <section
        id="system-solution"
        className="data-brief-section data-brief-section--light ui-section"
        aria-labelledby="system-solution-heading"
      >
        <div className="data-brief-section__container ui-section__container">
          <div className="data-brief-refresh-heading ui-section-heading">
            <p className="data-brief-eyebrow ui-eyebrow">
              {copy.solutionEyebrow}
            </p>
            <h2 id="system-solution-heading">{copy.solutionTitle}</h2>
            <p>{content.systemSummary}</p>
          </div>
          <div className="data-brief-card-grid data-brief-card-grid--architecture">
            {content.systemItems.map(item => (
              <article
                key={item.title}
                className="data-brief-card data-brief-card--architecture"
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function CommercialCaseStudyClosing({
  content,
  locale = 'en',
}: {
  content: CommercialCaseStudyContent
  locale?: Locale
}) {
  const copy = sectionCopy[locale]

  return (
    <>
      <section
        id="why-it-matters"
        className="data-brief-section data-brief-section--cream ui-section"
        aria-labelledby="why-it-matters-heading"
      >
        <div className="data-brief-section__container ui-section__container">
          <div className="data-brief-refresh-heading ui-section-heading">
            <p className="data-brief-eyebrow ui-eyebrow">{copy.whyEyebrow}</p>
            <h2 id="why-it-matters-heading">{copy.whyTitle}</h2>
            <p>{content.whyItMatters}</p>
          </div>
        </div>
      </section>

      <section
        id="client-relevance"
        className="data-brief-section data-brief-section--light ui-section"
        aria-labelledby="client-relevance-heading"
      >
        <div className="data-brief-section__container ui-section__container">
          <div className="data-brief-refresh-heading ui-section-heading">
            <p className="data-brief-eyebrow ui-eyebrow">
              {copy.relevanceEyebrow}
            </p>
            <h2 id="client-relevance-heading">{copy.relevanceTitle}</h2>
            <p>{content.clientRelevance}</p>
          </div>
        </div>
      </section>

      <section
        id="similar-system"
        className="data-brief-section data-brief-section--dark data-brief-section--result ui-section"
        aria-labelledby="similar-system-heading"
      >
        <div className="data-brief-section__container ui-section__container">
          <div className="data-brief-refresh-heading ui-section-heading">
            <p className="data-brief-eyebrow ui-eyebrow">{copy.ctaEyebrow}</p>
            <h2 id="similar-system-heading">{copy.ctaTitle}</h2>
            <p>{content.ctaCopy}</p>
          </div>
          <div className="data-brief-actions">
            <Link
              href={localizePath('/#contact', locale)}
              className="data-brief-button data-brief-button--primary"
            >
              {copy.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
