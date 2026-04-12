import Link from 'next/link'
import { getFlagshipOffer } from '@/data/services'
import { type Locale, localizePath } from '@/lib/i18n'
import styles from './HomeSections.module.css'

interface FlagshipOfferProps {
  locale?: Locale
}

export default function FlagshipOffer({ locale = 'en' }: FlagshipOfferProps) {
  const copy = getFlagshipOffer(locale)
  const outcomesLabel = locale === 'es' ? 'Qué cambia' : 'What this changes'

  return (
    <section
      id="services"
      className={styles.section}
      data-home-section="flagship"
      aria-labelledby="flagship-title"
    >
      <div className={styles.inner}>
        <div className={styles.flagshipGrid}>
          <div className={`${styles.flagshipIntro} reveal`}>
            <div>
              <p className="label">{copy.label}</p>
              <h2 id="flagship-title" className={styles.flagshipTitle}>
                {copy.title}
              </h2>
              <p className={styles.flagshipDescription}>{copy.description}</p>
            </div>

            <Link href={localizePath('/services/ai-systems', locale)} className={styles.flagshipLink}>
              {copy.linkLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={`${styles.flagshipCard} reveal reveal-delay-1`}>
            <p className={styles.cardEyebrow}>{outcomesLabel}</p>
            <ul className={styles.outcomeList}>
              {copy.outcomes.map((item) => (
                <li key={item} className={styles.outcomeItem}>
                  {item}
                </li>
              ))}
            </ul>

            <div className={styles.focusBlock}>
              <p className={styles.focusTitle}>{copy.focusTitle}</p>
              <div className={styles.focusAreas}>
                {copy.focusAreas.map((area) => (
                  <span key={area} className={styles.focusArea}>
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
