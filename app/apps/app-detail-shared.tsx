import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSiteCopy } from '@/data/site-copy'
import { getApps, getAppBySlug } from '@/data/apps'
import { type Locale, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppCard from '@/components/apps/AppCard'
import AppVisual from '@/components/apps/AppVisual'
import { buildPageMetadata } from '@/lib/metadata'
import styles from './AppsPages.module.css'

export interface AppPageProps {
  params: {
    slug: string
  }
}

export function getAppStaticParams() {
  const dedicatedRoutes = new Set(['overflow', 'territoryops-spain'])
  const slugs = getApps('en')
    .filter((app) => !dedicatedRoutes.has(app.slug))
    .map((app) => ({
      slug: app.slug,
    }))

  if (slugs.length === 0) {
    return [{ slug: '__placeholder__' }]
  }

  return slugs
}

export function getAppDetailMetadata(slug: string, locale: Locale = 'en'): Metadata {
  const app = getAppBySlug(slug, locale)

  if (!app) {
    return {
      title: locale === 'es' ? 'App no encontrada' : 'App not found',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return buildPageMetadata({
    title: `${app.name} App`,
    description: app.shortDescription,
    path: `/apps/${app.slug}`,
    locale,
    image: app.icon
      ? {
          url: app.icon,
          alt: `${app.name} app icon`,
        }
      : {
          url: '/images/sections/apps-bg-v2.webp',
          alt: `${app.name} app preview`,
        },
    keywords:
      locale === 'es'
        ? [app.name, 'concepto de app', 'prototipo de producto']
        : [app.name, 'app concept', 'product prototype'],
  })
}

interface AppDetailPageViewProps extends AppPageProps {
  locale?: Locale
}

export function AppDetailPageView({ params, locale = 'en' }: AppDetailPageViewProps) {
  const app = getAppBySlug(params.slug, locale)
  const copy = getSiteCopy(locale).appDetailUi

  if (!app) {
    notFound()
  }

  const relatedApps = getApps(locale).filter((entry) => entry.slug !== app.slug)

  return (
    <>
      <Header locale={locale} />
      <main className={styles.page}>
        <section className={styles.detailHero}>
          <div className={styles.container}>
            <Link
              href={localizePath('/apps', locale)}
              className={styles.breadcrumb}
            >
              <span>{copy.breadcrumbLabel}</span>
              <span>/</span>
              <span>{app.name}</span>
            </Link>

            <div className={styles.detailHeroGrid}>
              <div className={styles.detailCopy}>
                <div className={styles.detailTags}>
                  <span className={styles.tag}>{app.status}</span>
                  <span className={styles.tag}>{app.launchStage}</span>
                </div>

                <h1 className={styles.detailTitle}>{app.name}</h1>

                <p className={styles.detailStatement}>{app.heroStatement}</p>
                <p className={styles.detailDescription}>{app.shortDescription}</p>

                <div className={styles.actions}>
                  <Link
                    href={app.ctas.primary.href}
                    className="ui-button ui-button--primary"
                  >
                    {app.ctas.primary.label}
                  </Link>
                  {app.ctas.secondary ? (
                    <Link
                      href={app.ctas.secondary.href}
                      className="ui-button"
                    >
                      {app.ctas.secondary.label}
                    </Link>
                  ) : null}
                </div>

                <dl className={styles.detailStats}>
                  {app.metrics.map((metric) => (
                    <div key={metric.label} className={`ui-surface ${styles.metric}`}>
                      <dt>{metric.label}</dt>
                      <dd>{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <AppVisual app={app} />
            </div>
          </div>
        </section>

        <section className={styles.detailSection} aria-labelledby="key-flows-title">
          <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.keyFlows}</p>
            <h2 id="key-flows-title">{copy.keyFlowsTitle}</h2>
          </div>

          <div className={styles.featureGrid}>
            {app.features.map((feature) => (
              <article key={feature.title} className={styles.featureCard}>
                <p className={styles.eyebrow}>{feature.eyebrow}</p>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section className={styles.detailSection} aria-labelledby="selected-screens-title">
          <div className={styles.container}>
          <div className={styles.sectionHeaderWide}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>{copy.selectedScreens}</p>
              <h2 id="selected-screens-title">{copy.selectedScreensTitle}</h2>
            </div>
            <p>{copy.selectedScreensBody}</p>
          </div>

          <div className={styles.galleryGrid}>
            {app.gallery.map((item) => (
              <article key={item.title} className={styles.galleryCard}>
                <p className={styles.eyebrow}>{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className={styles.galleryStats}>
                  {item.stats.map((stat) => (
                    <span key={stat}>{stat}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section className={styles.detailSection} aria-labelledby="product-story-title">
          <div className={styles.container}>
          <div className={styles.narrativeGrid}>
            <article className={styles.narrativeCard}>
              <p className={styles.eyebrow}>{copy.productStory}</p>
              <h2 id="product-story-title" className={styles.narrativeTitle}>{app.narrative.title}</h2>
              <p className={styles.narrativeCopy}>{app.narrative.description}</p>
            </article>

            <div className={styles.bulletGrid}>
              {app.narrative.bullets.map((bullet) => (
                <article key={bullet} className={styles.bulletCard}>{bullet}</article>
              ))}
            </div>
          </div>
          </div>
        </section>

        <section className={styles.detailSection} aria-labelledby="apps-archive-title">
          <div className={styles.container}>
          <div className={styles.archivePanel}>
            <div className={styles.archiveHeader}>
              <div>
                <p className={styles.eyebrow}>{locale === 'es' ? 'Productos seleccionados' : 'Selected products'}</p>
                <h2 id="apps-archive-title" className={styles.archiveTitle}>{copy.archiveTitle}</h2>
              </div>
              <Link
                href={localizePath('/apps', locale)}
                className="ui-button"
              >
                {locale === 'es' ? 'Volver a apps' : 'Back to apps'}
              </Link>
            </div>

            <div className={styles.relatedGrid}>
              {relatedApps.length > 0 ? (
                relatedApps.map((relatedApp) => (
                  <AppCard
                    key={relatedApp.slug}
                    app={relatedApp}
                    label={locale === 'es' ? 'También en archivo' : 'Also in archive'}
                  />
                ))
              ) : (
                <>
                  <article className={styles.emptyCard}>
                    <p className={styles.eyebrow}>{locale === 'es' ? 'Resumen del archivo' : 'Archive overview'}</p>
                    <h3>{locale === 'es' ? 'La sección de apps ya está activa.' : 'The apps section is live.'}</h3>
                    <p>
                      {locale === 'es'
                        ? 'Overflow es la primera página viva de app, pero la estructura ya soporta un catálogo creciente de lanzamientos de producto, sistemas de interfaz y futuros experimentos.'
                        : 'Overflow is the first live app page, but the structure now supports a growing catalog of product launches, interface systems, and future app experiments.'}
                    </p>
                    <div className={styles.actions}>
                      <Link
                        href={localizePath('/apps', locale)}
                        className="ui-button"
                      >
                        {locale === 'es' ? 'Ver índice de apps' : 'View apps index'}
                      </Link>
                      <Link
                        href={localizePath('/#contact', locale)}
                        className="ui-button ui-button--primary"
                      >
                        {locale === 'es' ? 'Solicitar acceso' : 'Request access'}
                      </Link>
                    </div>
                  </article>

                  <article className={styles.emptyCard}>
                    <p className={styles.eyebrow}>{locale === 'es' ? 'En desarrollo' : 'In development'}</p>
                    <h3>{locale === 'es' ? 'Más productos llegarán a este archivo.' : 'More products will join this archive.'}</h3>
                    <p>
                      {locale === 'es'
                        ? 'Cuando la siguiente app esté lista, tendrá su ficha en el archivo y su propia landing de producto sin cambiar cómo navega la gente por el sitio.'
                        : 'When the next app is ready, it gets a tile in the archive and its own product landing without changing how visitors move through the site.'}
                    </p>
                  </article>
                </>
              )}
            </div>
          </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
