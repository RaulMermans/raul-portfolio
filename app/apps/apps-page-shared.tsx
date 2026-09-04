import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteCopy } from '@/data/site-copy'
import { getApps } from '@/data/apps'
import { type Locale } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { buildPageMetadata } from '@/lib/metadata'
import styles from './AppsPages.module.css'

export function getAppsPageMetadata(locale: Locale = 'en'): Metadata {
  const isSpanish = locale === 'es'

  return buildPageMetadata({
    title: isSpanish ? 'Apps y Prototipos' : 'Apps & Prototypes',
    description: isSpanish
      ? 'Apps y prototipos de Raúl Mermans: TerritoryOps Spain y Overflow.'
      : 'Apps and prototypes by Raúl Mermans: TerritoryOps Spain and Overflow.',
    path: '/apps',
    locale,
    image: {
      url: '/images/sections/apps-bg-v2.webp',
      alt: isSpanish ? 'Apps y prototipos de Raúl Mermans' : 'Apps and prototypes by Raúl Mermans',
    },
    keywords: isSpanish
      ? ['apps', 'prototipos de producto', 'TerritoryOps Spain', 'Overflow']
      : ['apps', 'product prototypes', 'TerritoryOps Spain', 'Overflow'],
  })
}

interface AppsPageProps {
  locale?: Locale
}

export function AppsPageView({ locale = 'en' }: AppsPageProps) {
  const apps = getApps(locale)
  const copy = getSiteCopy(locale).appsPage
  const isSpanish = locale === 'es'

  return (
    <>
      <Header locale={locale} />
      <main className={styles.page}>
        <section className={`ui-page-intro ${styles.indexIntro}`} aria-labelledby="apps-title">
          <div className={`ui-page-intro__container ${styles.indexIntroContent}`}>
            <div className="ui-page-intro__content">
              <h1 id="apps-title">{copy.title}</h1>
              <p>{copy.intro}</p>
            </div>

            <div className={styles.appsGrid}>
            {apps.map((app) => {
              return (
                <Link key={app.slug} href={app.href} className={styles.appCard}>
                  <span className={styles.appCardMeta}>
                    <span>{app.slug === 'territoryops-spain' ? (isSpanish ? 'Herramienta de workflow' : 'Workflow tool') : (isSpanish ? 'Prototipo móvil' : 'Mobile prototype')}</span>
                    <span>→</span>
                  </span>
                  {app.icon && (
                    <span className={styles.appIcon}>
                      <Image src={app.icon} alt="" width={56} height={56} />
                    </span>
                  )}
                  <span className={styles.appCardContent}>
                    <h2 className={styles.appCardTitle}>{app.name}</h2>
                    <span className={styles.appCardDescription}>{app.cardDescription}</span>
                  </span>
                  <span className={styles.appCardStage}>{app.launchStage}</span>
                </Link>
              )
            })}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
