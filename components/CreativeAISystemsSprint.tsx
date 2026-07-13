import Link from 'next/link'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale, localizePath } from '@/lib/i18n'
import styles from './CreativeAISystemsSprint.module.css'

type CreativeAISystemsSprintProps = {
  locale?: Locale
}

export default function CreativeAISystemsSprint({
  locale = 'en',
}: CreativeAISystemsSprintProps) {
  const copy = getSiteCopy(locale).home.sprint

  return (
    <section id="creative-ai-systems-sprint" className={styles.section} aria-labelledby="sprint-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="sprint-title" className={styles.title}>{copy.title}</h2>
          <dl className={styles.facts}>
            <div>
              <dt>{copy.forLabel}</dt>
              <dd>{copy.for}</dd>
            </div>
            <div>
              <dt>{copy.durationLabel}</dt>
              <dd>{copy.duration}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.details}>
          <div>
            <h3>{copy.includedLabel}</h3>
            <ul>
              {copy.included.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className={styles.outcome}>
            <p>{copy.outcomeLabel}</p>
            <strong>{copy.outcome}</strong>
          </div>
          <p className={styles.followUp}>{copy.followUp}</p>
          <Link href={localizePath('/#contact', locale)} className={styles.cta}>
            {copy.cta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
