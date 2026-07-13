'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { type Locale, getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import SelectedAISystems from '@/components/SelectedAISystems'
import CreativeInfrastructure from '@/components/CreativeInfrastructure'
import CreativeAISystemsSprint from '@/components/CreativeAISystemsSprint'
import About from '@/components/About'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Socials from '@/components/Socials'
import ErrorBoundary from '@/components/ErrorBoundary'
import { absoluteRouteUrl, siteConfig } from '@/lib/metadata'

// Dynamic import for non-critical component - improves INP
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false })

function getHomeServiceSchema(locale: Locale) {
  const localizedPhotography = localizePath('/photography', locale)
  const servicePaths =
    locale === 'es'
      ? {
          ai: '/services/integraciones-ia',
          prototypes: '/services/prototipos-producto-ia',
          brand: '/services/sistemas-de-marca',
        }
      : {
          ai: '/en/services/ai-integrations',
          prototypes: '/en/services/product-prototypes',
          brand: '/en/services/brand-systems',
        }

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
            'Sistemas asistidos por IA y herramientas internas que ayudan a equipos de marca y creatividad a investigar, desarrollar, revisar y producir trabajo con más consistencia.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(servicePaths.ai),
        },
        {
          '@type': 'Service',
          position: 2,
          name: 'Prototipos de producto y web',
          serviceType: 'Diseño de interfaces y prototipos de producto',
          description:
            'Interfaces y prototipos funcionales para hacer comprobables sistemas, servicios e ideas técnicas antes del desarrollo completo.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(servicePaths.prototypes),
        },
        {
          '@type': 'Service',
          position: 3,
          name: 'Sistemas de marca y dirección creativa',
          serviceType: 'Dirección creativa y sistemas de marca',
          description:
            'Criterios de marca, tono, dirección visual y revisión que mantienen herramientas y resultados coherentes y apropiados.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(servicePaths.brand),
        },
        {
          '@type': 'Service',
          position: 4,
          name: 'Fotografía e investigación visual',
          serviceType: 'Práctica visual de apoyo',
          description:
            'Fotografía e investigación visual como práctica de apoyo para la composición, la observación cultural y el criterio de imagen.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(localizedPhotography),
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
        serviceType: 'AI workflow architecture and internal AI tools',
        description:
          'AI-assisted systems and internal tools that help brand and creative teams research, develop, review, and produce work more consistently.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(servicePaths.ai),
      },
      {
        '@type': 'Service',
        position: 2,
        name: 'Product and Web Prototypes',
        serviceType: 'Interface Design and Product Prototyping',
        description:
          'Working interfaces and prototypes that make systems, services, and technical ideas testable before full development.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(servicePaths.prototypes),
      },
      {
        '@type': 'Service',
        position: 3,
        name: 'Brand Systems and Creative Direction',
        serviceType: 'Creative Direction and Brand Systems',
        description:
          'Brand criteria, tone, visual direction, and review logic that keep tools and outputs coherent and appropriate.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(servicePaths.brand),
      },
      {
        '@type': 'Service',
        position: 4,
        name: 'Photography and Visual Research',
        serviceType: 'Supporting Visual Practice',
        description:
          'Photography and visual research as a supporting practice for composition, cultural observation, and image judgment.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(localizedPhotography),
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

    // Section transitions - fade/slide when sections enter viewport
    const sectionSelectors = '[data-home-section="hero"], [data-home-section="positioning"], .selected-ai-systems, .about, .services, .contact, .socials'
    const sectionElements = document.querySelectorAll(sectionSelectors)
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
        <SelectedAISystems locale={locale} />
        <CreativeAISystemsSprint locale={locale} />
        <Services locale={locale} />
        <CreativeInfrastructure locale={locale} />
        <About locale={locale} />
        <Contact locale={locale} />
        <Socials locale={locale} />
        <Footer locale={locale} />
        <BackToTop />
      </main>
    </ErrorBoundary>
  )
}
