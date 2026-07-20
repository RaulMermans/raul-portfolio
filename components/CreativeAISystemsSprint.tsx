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
    <section id="creative-strategy-sprint" className={styles.section} aria-labelledby="sprint-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="sprint-title" className={styles.title}>{copy.title}</h2>
          <p className={styles.introCopy}>{copy.intro}</p>
        </div>

        <div className={styles.details}>
          <div>
            <h3>{copy.includedLabel}</h3>
            <ul>
              {copy.included.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <Link href={localizePath('/#contact', locale)} className={styles.cta}>
            {copy.cta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
