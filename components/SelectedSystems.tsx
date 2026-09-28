import Link from 'next/link'
import { getCaseStudies } from '@/data/case-studies'
import { getCaseStudyEditorial } from '@/data/case-study-editorial'
import { SELECTED_SYSTEM_SLUGS } from '@/data/independent-systems'
import { getSiteCopy } from '@/data/site-copy'
import { localizePath, type Locale } from '@/lib/i18n'
import styles from './SelectedSystems.module.css'

export default function SelectedSystems({ locale }: { locale: Locale }) {
  const copy = getSiteCopy(locale).home.selectedAiSystems
  const studies = getCaseStudies(locale)
  return (
    <section id="selected-systems" className="ui-section" aria-labelledby="selected-systems-title" data-home-section="selected-systems">
      <div className="ui-section__container">
        <header className="ui-section-heading">
          <p className="ui-eyebrow">{copy.eyebrow}</p>
          <h2 id="selected-systems-title">{copy.title}</h2>
          <p>{copy.description}</p>
        </header>
        <div className={styles.grid}>
          {SELECTED_SYSTEM_SLUGS.map((slug, index) => {
            const study = studies.find((item) => item.slug === slug)!
            const editorial = getCaseStudyEditorial(slug)!
            return (
              <article key={slug} className={styles.project} data-selected-system={slug}>
                <p className="ui-eyebrow">{String(index + 1).padStart(2, '0')} / {editorial.category[locale]}</p>
                <h3>{study.title}</h3>
                <p>{study.description}</p>
                <p className={styles.proof}>{editorial.snapshot[locale].proof}</p>
                <Link className="ui-button" href={study.href}>{copy.viewCase}</Link>
              </article>
            )
          })}
        </div>
        <div className={styles.actions}>
          <Link className="ui-button" href={localizePath('/case-studies', locale)}>{copy.viewAll}</Link>
          <a className="ui-button" href="https://github.com/RaulMermans" target="_blank" rel="noreferrer">{copy.githubCta}</a>
        </div>
      </div>
    </section>
  )
}
