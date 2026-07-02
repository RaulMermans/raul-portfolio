import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteCopy } from '@/data/site-copy'
import { getApps } from '@/data/apps'
import { getCaseStudies, type CaseStudy } from '@/data/case-studies'
import { type Locale } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { buildPageMetadata } from '@/lib/metadata'

export function getAppsPageMetadata(locale: Locale = 'en'): Metadata {
  const isSpanish = locale === 'es'

  return buildPageMetadata({
    title: isSpanish ? 'Herramientas y Prototipos' : 'Tools and Prototypes',
    description: isSpanish
      ? 'Herramientas, prototipos y demos de Raúl Mermans para probar lógica de workflow, estructura de datos y comportamiento de interfaz.'
      : 'Tools, prototypes, and demos by Raúl Mermans for testing workflow logic, data structure, and interface behavior.',
    path: '/apps',
    locale,
    image: {
      url: '/images/sections/apps-bg-v2.webp',
      alt: isSpanish ? 'Apps y prototipos de Raúl Mermans' : 'Apps and prototypes by Raúl Mermans',
    },
    keywords: isSpanish
      ? ['apps', 'prototipos de producto', 'herramientas con IA', 'conceptos de interfaz']
      : ['apps', 'product prototypes', 'AI tools', 'interface concepts'],
  })
}

interface AppsPageProps {
  locale?: Locale
}

export function AppsPageView({ locale = 'en' }: AppsPageProps) {
  const apps = getApps(locale)
  const studies = getCaseStudies(locale)
  const copy = getSiteCopy(locale).appsPage
  const isSpanish = locale === 'es'
  const appBySlug = new Map(apps.map(app => [app.slug, app]))
  const studyBySlug = new Map(studies.map(study => [study.slug, study]))
  const launcherItems = [
    {
      title: 'TerritoryOps Spain',
      use: appBySlug.get('territoryops-spain')?.cardDescription ?? '',
      status: appBySlug.get('territoryops-spain')?.launchStage ?? '',
      href: appBySlug.get('territoryops-spain')?.href ?? '/apps/territoryops-spain',
      category: isSpanish ? 'Herramienta de workflow' : 'Workflow tool',
      external: false,
      icon: appBySlug.get('territoryops-spain')?.icon,
    },
    {
      title: 'Overflow',
      use: appBySlug.get('overflow')?.cardDescription ?? '',
      status: appBySlug.get('overflow')?.launchStage ?? '',
      href: appBySlug.get('overflow')?.href ?? '/apps/overflow',
      category: isSpanish ? 'Prototipo móvil' : 'Mobile prototype',
      external: false,
      icon: appBySlug.get('overflow')?.icon,
    },
    ...['demandos', 'campaign-pulse', 'data-brief-ai']
      .map(slug => studyBySlug.get(slug))
      .filter((study): study is CaseStudy & { liveUrl: string } => Boolean(study?.liveUrl))
      .map(study => ({
        title: `${study.title} ${isSpanish ? 'demo' : 'live demo'}`,
        use: study.description,
        status: study.status ?? (isSpanish ? 'Demo público' : 'Public demo'),
        href: study.liveUrl as string,
        category: study.category ?? (isSpanish ? 'Producto' : 'Product surface'),
        external: true,
        icon: undefined,
      })),
  ]

  return (
    <>
      <Header locale={locale} />
      <main
        style={{
          background: 'var(--cream)',
          color: 'var(--ink)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <section
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 'calc(var(--header-height) + 72px) 24px 72px',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              textTransform: 'uppercase',
              lineHeight: 0.88,
              color: 'var(--ink)',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            {copy.title}
          </h1>
          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto 44px',
              color: 'rgba(26, 23, 20, 0.68)',
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.7,
              textAlign: 'center',
            }}
          >
            {copy.intro}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1px',
              width: 'min(100%, 1120px)',
              background: 'rgba(26, 23, 20, 0.14)',
            } as CSSProperties}
          >
            {launcherItems.map((item) => {
              const content = (
                <>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      color: 'rgba(26, 23, 20, 0.5)',
                      fontFamily: 'var(--font-mono), "Space Mono", monospace',
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      lineHeight: 1.5,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{item.category}</span>
                    <span>{item.external ? '↗' : '→'}</span>
                  </span>
                  {item.icon && (
                    <span
                      style={{
                        display: 'block',
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                      }}
                    >
                      <Image src={item.icon} alt="" width={56} height={56} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </span>
                  )}
                  <span style={{ display: 'grid', gap: '10px' }}>
                    <strong
                      style={{
                        color: 'var(--ink)',
                        fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif',
                        fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                        fontWeight: 400,
                        letterSpacing: 'var(--tracking-tight)',
                        lineHeight: 0.9,
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.title}
                    </strong>
                    <span style={{ color: 'rgba(26, 23, 20, 0.72)', lineHeight: 1.6 }}>
                      {item.use}
                    </span>
                  </span>
                  <span
                    style={{
                      marginTop: 'auto',
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-mono), "Space Mono", monospace',
                      fontSize: '0.76rem',
                      letterSpacing: '0.1em',
                      lineHeight: 1.5,
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.status}
                  </span>
                </>
              )

              const style = {
                display: 'grid',
                minHeight: '290px',
                gap: '24px',
                alignContent: 'start',
                padding: 'clamp(22px, 3vw, 32px)',
                background: 'var(--cream-light)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'background 0.3s var(--ease), transform 0.3s var(--ease)',
              }

              return item.external ? (
                <a
                  key={`${item.title}-${item.href}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={style}
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={`${item.title}-${item.href}`}
                  href={item.href}
                  style={style}
                >
                  {content}
                </Link>
              )
            })}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
