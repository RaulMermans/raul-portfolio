import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getServicePageData, type ServiceSlug } from '@/data/services'
import { type Locale, localizePath } from '@/lib/i18n'
import styles from '@/components/ServicePage.module.css'

interface ServicePageSharedProps {
  locale: Locale
  slug: ServiceSlug
}

export default function ServicePageShared({ locale, slug }: ServicePageSharedProps) {
  const service = getServicePageData(locale, slug)

  return (
    <div className={styles.page}>
      <Header locale={locale} />
      <main id="main-content" className={styles.section}>
        <div className={styles.inner}>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>{service.eyebrow}</p>
            <h1 className={styles.title}>{service.title}</h1>
            <p className={styles.intro}>{service.intro}</p>
            <p className={styles.summary}>{service.summary}</p>
          </header>

          <section className={styles.grid} aria-label={service.title}>
            <article className={styles.panel}>
              <h2 className={styles.panelTitle}>{service.outcomesTitle}</h2>
              <ul className={styles.panelList}>
                {service.outcomes.map((item) => (
                  <li key={item} className={styles.panelItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className={styles.panel}>
              <h2 className={styles.panelTitle}>{service.deliverablesTitle}</h2>
              <ul className={styles.panelList}>
                {service.deliverables.map((item) => (
                  <li key={item} className={styles.panelItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className={styles.panel}>
              <h2 className={styles.panelTitle}>{service.bestFitTitle}</h2>
              <ul className={styles.panelList}>
                {service.bestFit.map((item) => (
                  <li key={item} className={styles.panelItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <div className={styles.actions}>
            <Link href={localizePath('/#contact', locale)} className="btn btn--arrow">
              {service.primaryCta}
            </Link>
            <Link href={localizePath(service.secondaryHref, locale)} className={styles.secondaryLink}>
              {service.secondaryCta}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  )
}
