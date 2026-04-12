'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { type Locale, getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FlagshipOffer from '@/components/FlagshipOffer'
import HomeProofs from '@/components/HomeProofs'
import HowIWork from '@/components/HowIWork'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import ErrorBoundary from '@/components/ErrorBoundary'
import { absoluteRouteUrl, siteConfig } from '@/lib/metadata'

// Dynamic import for non-critical component - improves INP
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false })

function getHomeServiceSchema(locale: Locale) {
  if (locale === 'es') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${siteConfig.url}/#services`,
      name: 'Servicios de Raúl Mermans',
      itemListElement: [
        {
          '@type': 'Service',
          position: 1,
          name: 'Sistemas de IA',
          serviceType: 'Diseño de sistemas de IA aplicados',
          description:
            'Sistemas de IA aplicada que transforman el trabajo repetitivo y de alta carga cognitiva en una ejecución fiable. Agentes, orquestación y flujos de decisión construidos para equipos reales, no solo para demostraciones.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(localizePath('/services/ai-systems', locale)),
        },
        {
          '@type': 'Service',
          position: 2,
          name: 'Automatización',
          serviceType: 'Automatización operativa',
          description:
            'Capas de automatización diseñadas para reducir coordinación manual, mejorar handoffs y mantener visibles los puntos de revisión importantes.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(localizePath('/services/automation', locale)),
        },
        {
          '@type': 'Service',
          position: 3,
          name: 'Prototipos',
          serviceType: 'Prototipos y herramientas internas',
          description:
            'Prototipos e interfaces internas que convierten la lógica del sistema en una superficie usable para operadores y equipos reales.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(localizePath('/services/prototypes', locale)),
        },
        {
          '@type': 'Service',
          position: 4,
          name: 'Sistemas de marca',
          serviceType: 'Sistemas de marca y dirección creativa',
          description:
            'Dirección creativa que conecta identidad de marca, sistemas visuales y pensamiento de campaña para que cada punto de contacto se sienta coherente e intencional.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(localizePath('/services/brand-systems', locale)),
        },
      ],
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.url}/#services`,
    name: 'Services by Raúl Mermans',
    itemListElement: [
      {
        '@type': 'Service',
        position: 1,
        name: 'AI Systems',
        serviceType: 'Applied AI Systems Design',
        description:
          'Applied AI systems that turn repetitive, judgment-heavy work into reliable execution through automation logic, orchestration, and AI-enabled workflows.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(localizePath('/services/ai-systems', locale)),
      },
      {
        '@type': 'Service',
        position: 2,
        name: 'Automation',
        serviceType: 'Operational Automation Design',
        description:
          'Automation layers designed to reduce manual coordination, improve handoffs, and keep the important review points visible.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(localizePath('/services/automation', locale)),
      },
      {
        '@type': 'Service',
        position: 3,
        name: 'Prototypes',
        serviceType: 'Prototypes and Internal Tools',
        description:
          'Prototypes and internal interfaces that turn system logic into something teams can actually use, review, and trust.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(localizePath('/services/prototypes', locale)),
      },
      {
        '@type': 'Service',
        position: 4,
        name: 'Brand Systems',
        serviceType: 'Brand Systems and Creative Direction',
        description:
          'Creative direction spanning brand identity, visual systems, and campaign thinking so every touchpoint feels coherent, intentional, and commercially credible.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(localizePath('/services/brand-systems', locale)),
      },
    ],
  }
}

export default function Home() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const homeServiceSchema = getHomeServiceSchema(locale)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    const body = document.body
    root.classList.add('homepage')
    body.style.overflowY = 'auto'
    root.style.scrollSnapType = 'none'
    body.style.scrollSnapType = 'none'

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let revealObserver: IntersectionObserver | null = null

    const revealElement = (element: Element) => {
      element.classList.add('visible')
      revealObserver?.unobserve(element)
    }

    const isNearViewport = (element: Element) => {
      const rect = element.getBoundingClientRect()
      return rect.top < window.innerHeight + 160 && rect.bottom > -120
    }

    const setupRevealObserver = () => {
      const revealElements = Array.from(document.querySelectorAll('.reveal:not(.visible)'))
      if (revealElements.length === 0) return

      if (prefersReducedMotion) {
        revealElements.forEach((element) => element.classList.add('visible'))
        return
      }

      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealElement(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '120px 0px -60px 0px' }
      )

      revealElements.forEach((element) => {
        if (isNearViewport(element)) {
          revealElement(element)
        } else {
          revealObserver?.observe(element)
        }
      })
    }

    requestAnimationFrame(setupRevealObserver)

    const sectionElements = document.querySelectorAll('[data-home-section]')
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    sectionElements.forEach((el) => {
      el.classList.add('section-transition')
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('section-visible')
      }
      sectionObserver.observe(el)
    })

    return () => {
      revealObserver?.disconnect()
      sectionObserver.disconnect()
      root.classList.remove('homepage')
      root.style.scrollSnapType = 'none'
      body.style.scrollSnapType = 'none'
    }
  }, [])

  return (
    <ErrorBoundary>
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeServiceSchema) }}
        />
        <Header locale={locale} />
        <Hero locale={locale} />
        <FlagshipOffer locale={locale} />
        <HomeProofs locale={locale} />
        <HowIWork locale={locale} />
        <Contact locale={locale} />
        <Services locale={locale} />
        <Footer locale={locale} />
        <BackToTop />
      </main>
    </ErrorBoundary>
  )
}
