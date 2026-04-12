import { getSiteCopy } from '@/data/site-copy'
import { type Locale } from '@/lib/i18n'
import styles from './HomeSections.module.css'

interface HowIWorkProps {
  locale?: Locale
}

export default function HowIWork({ locale = 'en' }: HowIWorkProps) {
  const copy = getSiteCopy(locale).home.howIWork

  return (
    <section className={styles.section} data-home-section="process" aria-labelledby="how-i-work-title">
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <p className="label">{copy.label}</p>
          <h2 id="how-i-work-title" className={styles.headerTitle}>
            {copy.title}
          </h2>
          <p className={styles.headerBody}>{copy.subtitle}</p>
        </div>

        <div className={styles.processGrid}>
          {copy.steps.map((step, index) => (
            <article
              key={step.number}
              className={`${styles.processCard} reveal ${index % 2 === 1 ? 'reveal-delay-1' : ''}`}
            >
              <span className={styles.processNumber}>{step.number}</span>
              <h3 className={styles.processTitle}>{step.title}</h3>
              <p className={styles.processDescription}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
