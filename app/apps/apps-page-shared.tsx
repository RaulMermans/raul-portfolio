import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteCopy } from '@/data/site-copy'
import { getApps } from '@/data/apps'
import { type Locale } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { buildPageMetadata } from '@/lib/metadata'

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
            {apps.map((app) => {
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
                    <span>{app.slug === 'territoryops-spain' ? (isSpanish ? 'Herramienta de workflow' : 'Workflow tool') : (isSpanish ? 'Prototipo móvil' : 'Mobile prototype')}</span>
                    <span>→</span>
                  </span>
                  {app.icon && (
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
                      <Image src={app.icon} alt="" width={56} height={56} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                      {app.name}
                    </strong>
                    <span style={{ color: 'rgba(26, 23, 20, 0.72)', lineHeight: 1.6 }}>
                      {app.cardDescription}
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
                    {app.launchStage}
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

              return (
                <Link
                  key={app.slug}
                  href={app.href}
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
