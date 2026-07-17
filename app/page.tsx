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
import HomeNarrative from '@/components/HomeNarrative'
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
          automation: '/services/automatizacion-creativa',
          prototypes: '/services/prototipos-producto-ia',
          brand: '/services/sistemas-de-marca',
        }
      : {
          ai: '/en/services/ai-integrations',
          automation: '/en/services/creative-automation',
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
          name: 'Estrategia Creativa y Marketing',
          serviceType: 'Estrategia creativa y de marketing',
          description:
            'Estrategia que conecta objetivos de negocio, insight de audiencia, contexto cultural y ejecución creativa.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(servicePaths.ai),
        },
        {
          '@type': 'Service',
          position: 2,
          name: 'Sistemas de Marca y Dirección Creativa',
          serviceType: 'Sistemas de marca y dirección creativa',
          description:
            'Sistemas de marca y creatividad que hacen las ideas reconocibles, coherentes y culturalmente relevantes en campañas, contenido y experiencias digitales.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(servicePaths.automation),
        },
        {
          '@type': 'Service',
          position: 3,
          name: 'Datos, Investigación e Inteligencia',
          serviceType: 'Datos, investigación y apoyo a decisiones',
          description:
            'Herramientas de investigación y datos que hacen la información compleja más fácil de entender y convertir en acción.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(servicePaths.prototypes),
        },
        {
          '@type': 'Service',
          position: 4,
          name: 'Productos Digitales, IA y Prototipado',
          serviceType: 'Productos digitales, IA y prototipado',
          description:
            'Productos digitales y prototipos que vuelven tangibles estrategias, flujos e ideas, usando IA donde aporta valor real.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(servicePaths.brand),
        },
        {
          '@type': 'Service',
          position: 5,
          name: 'Fotografía y Dirección Visual',
          serviceType: 'Fotografía, sistemas de imagen e investigación visual',
          description:
            'Fotografía e imagen como práctica visual de apoyo para reforzar composición, lectura cultural y criterio de marca.',
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
        name: 'Creative Strategy and Marketing',
        serviceType: 'Creative and marketing strategy',
        description:
          'Strategy connecting business objectives, audience insight, cultural context, and creative execution.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(servicePaths.ai),
      },
      {
        '@type': 'Service',
        position: 2,
        name: 'Brand Systems and Creative Direction',
        serviceType: 'Brand systems and creative direction',
        description:
          'Brand and creative systems that make ideas recognisable, coherent, and culturally relevant across campaigns, content, and digital experiences.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(servicePaths.automation),
      },
      {
        '@type': 'Service',
        position: 3,
        name: 'Data, Research and Intelligence',
        serviceType: 'Data, research and decision support',
        description:
          'Research and data tools that make complex information easier to understand and act on.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(servicePaths.prototypes),
      },
      {
        '@type': 'Service',
        position: 4,
        name: 'Digital Products, AI and Prototyping',
        serviceType: 'Digital products, AI and prototyping',
        description:
          'Digital products and prototypes that make strategies, workflows, and ideas tangible, using AI where it creates meaningful value.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(servicePaths.brand),
      },
      {
        '@type': 'Service',
        position: 5,
        name: 'Photography and Visual Direction',
        serviceType: 'Photography, Image Systems, and Visual Research',
        description:
          'Photography and image-making as a supporting visual practice for composition, cultural reading, and brand judgment.',
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
    const sectionSelectors = '[data-home-section="hero"], [data-home-section="positioning"], .selected-ai-systems, .contact, .socials'
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
        <Header locale={locale} />
        <Hero locale={locale} />
        <SelectedAISystems locale={locale} />
        <CreativeInfrastructure locale={locale} />
        <HomeNarrative locale={locale} />
        <Contact locale={locale} />
        <Socials locale={locale} />
        <Footer locale={locale} />
        <BackToTop />
      </main>
    </ErrorBoundary>
  )
}
