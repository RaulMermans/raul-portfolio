import Image from 'next/image'
import Link from 'next/link'
import { getCaseStudies, type CaseStudy } from '@/data/case-studies'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale, localizePath } from '@/lib/i18n'

interface SelectedAISystemsProps {
  locale?: Locale
}

const selectedSlugs = ['data-brief-ai', 'website-auditor', 'benchmark-dashboard'] as const
const githubUrl = 'https://github.com/RaulMermans'

export default function SelectedAISystems({ locale = 'en' }: SelectedAISystemsProps) {
  const copy = getSiteCopy(locale).home.selectedAiSystems
  const studies = getCaseStudies(locale)
  const selectedStudies = selectedSlugs
    .map((slug) => studies.find((study) => study.slug === slug))
    .filter((study): study is CaseStudy => Boolean(study))

  return (
    <section id="selected-ai-systems" className="selected-ai-systems" aria-labelledby="selected-ai-systems-title">
      <div className="selected-ai-systems__inner">
        <div className="selected-ai-systems__header reveal">
          <p className="selected-ai-systems__eyebrow">{copy.eyebrow}</p>
          <h2 id="selected-ai-systems-title">{copy.title}</h2>
          <p>{copy.description}</p>
          <div className="selected-ai-systems__actions">
            <Link href={localizePath('/case-studies', locale)} className="selected-ai-systems__link selected-ai-systems__link--primary">
              {copy.viewAll}
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="selected-ai-systems__link"
            >
              {copy.githubCta}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="selected-ai-systems__grid">
          {selectedStudies.map((study, index) => {
            const cardCopy = copy.cards[study.slug as keyof typeof copy.cards]

            return (
              <Link
                key={study.slug}
                href={study.href}
                className={`selected-ai-card selected-ai-card--${index + 1} reveal reveal-delay-${Math.min(index + 1, 2)}`}
                aria-label={locale === 'es' ? `Ver caso: ${study.title}` : `View case: ${study.title}`}
              >
                <span className="selected-ai-card__media">
                  <Image
                    src={study.image}
                    alt=""
                    width={study.imageWidth}
                    height={study.imageHeight}
                    sizes="(max-width: 760px) 100vw, 33vw"
                    className="selected-ai-card__image"
                  />
                </span>
                <span className="selected-ai-card__body">
                  <span className="selected-ai-card__meta">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{cardCopy.label}</span>
                  </span>
                  <span className="selected-ai-card__title">{study.title}</span>
                  <span className="selected-ai-card__description">{cardCopy.proof}</span>
                  <span className="selected-ai-card__cta">
                    {copy.viewCase}
                    <span aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
