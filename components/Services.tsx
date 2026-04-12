import Link from 'next/link'
import { getSupportingCapabilities } from '@/data/services'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale } from '@/lib/i18n'
import styles from './HomeSections.module.css'

interface ServicesProps {
  locale?: Locale
}

export default function Services({ locale = 'en' }: ServicesProps) {
  const copy = getSiteCopy(locale).home.supportingCapabilities
  const capabilities = getSupportingCapabilities(locale)

  return (
    <section
      id="capabilities"
      className={styles.section}
      data-home-section="capabilities"
      aria-labelledby="supporting-capabilities-title"
    >
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <p className="label">{copy.label}</p>
          <h2 id="supporting-capabilities-title" className={styles.headerTitle}>
            {copy.title}
          </h2>
          <p className={styles.headerBody}>{copy.subtitle}</p>
        </div>

        <div className={styles.supportGrid}>
          {capabilities.map((capability, index) => (
            <article
              key={capability.title}
              className={`${styles.supportCard} reveal ${index === 1 ? 'reveal-delay-1' : ''}`}
            >
              <p className={styles.cardEyebrow}>{capability.eyebrow}</p>
              <h3 className={styles.supportTitle}>{capability.title}</h3>
              <p className={styles.supportDescription}>{capability.description}</p>
              <Link href={capability.href} className={styles.supportLink}>
                {capability.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
