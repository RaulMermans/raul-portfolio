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
      ? 'Apps y prototipos de producto de Raúl Mermans, pensados para explorar flujos de trabajo, interfaces y nuevos modelos operativos con una experiencia de usuario (UX) fluida y orientada a producto.'
      : 'Apps and product prototypes by Raúl Mermans, built to test workflows, interfaces, and new operating models with calm, product-minded execution.',
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
  const copy = getSiteCopy(locale).appsPage
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
            justifyContent: 'center',
            padding: 'var(--header-height) 24px 48px',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              textTransform: 'uppercase',
              lineHeight: 0.88,
              color: 'var(--ink)',
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            {copy.title}
          </h1>

          <div
            style={{
              display: 'flex',
              gap: '40px',
              alignItems: 'flex-start',
              justifyContent: 'center',
              overflowX: 'auto',
              maxWidth: '100%',
              paddingBottom: '8px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            } as CSSProperties}
          >
            {apps.map((app) => (
              <Link
                key={app.slug}
                href={app.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  flexShrink: 0,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.3s var(--ease)',
                }}
                className="group"
              >
                <div
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: '26.6%',
                    overflow: 'hidden',
                    background: app.icon
                      ? 'transparent'
                      : `linear-gradient(135deg, ${app.theme.accent}, ${app.theme.accentSoft})`,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                    transition: 'transform 0.3s var(--ease), box-shadow 0.3s var(--ease)',
                  }}
                  className="group-hover:scale-105"
                >
                  {app.icon ? (
                    <Image
                      src={app.icon}
                      alt={`${app.name} icon`}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                      style={{ borderRadius: '26.6%' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '4rem',
                        fontWeight: 700,
                      }}
                    >
                      {app.name.charAt(0)}
                    </div>
                  )}
                </div>

                <span
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--ink-soft)',
                    textAlign: 'center',
                    letterSpacing: '0.04em',
                  }}
                >
                  {app.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
