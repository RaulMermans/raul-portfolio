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
import SectionCards from '@/components/SectionCards'
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
          name: 'Sistemas de IA',
          serviceType: 'Diseño de sistemas de IA aplicados',
          description:
            'Sistemas creativos asistidos por IA, herramientas internas y flujos con agentes para equipos que necesitan ejecución estructurada, resultados revisables y coherencia de marca.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(servicePaths.ai),
        },
        {
          '@type': 'Service',
          position: 2,
          name: 'Automatización y herramientas internas',
          serviceType: 'Automatización creativa e interfaces internas',
          description:
            'Capas de automatización y herramientas internas para flujos creativos, producción de contenido, investigación, gestión de assets y coordinación de equipos, construidas para apoyar el criterio, no sustituirlo.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(servicePaths.automation),
        },
        {
          '@type': 'Service',
          position: 3,
          name: 'Web y prototipos de producto',
          serviceType: 'Diseño web y prototipos de producto',
          description:
            'Experiencias web y prototipos de producto construidos para hacer utilizables e iterables los flujos, ofertas e ideas técnicas.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(servicePaths.prototypes),
        },
        {
          '@type': 'Service',
          position: 4,
          name: 'Sistemas de marca y dirección creativa',
          serviceType: 'Dirección creativa y sistemas de marca',
          description:
            'Dirección creativa que conecta inteligencia de marca, sistemas visuales y pensamiento de campaña para que cada herramienta sea coherente y adoptable.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(servicePaths.brand),
        },
        {
          '@type': 'Service',
          position: 5,
          name: 'Práctica creativa',
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
        name: 'AI Systems',
        serviceType: 'AI workflow architecture and internal AI tools',
        description:
          'AI-assisted creative systems, internal tools, and agentic workflows for teams that need structured execution, reviewable outputs, and brand-aware reliability.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(servicePaths.ai),
      },
      {
        '@type': 'Service',
        position: 2,
        name: 'Automation and Internal Tools',
        serviceType: 'Creative Automation and Internal Interfaces',
        description:
          'Automation layers and internal tools for creative workflows, content production, research, asset handling, and team coordination — built to support judgment, not replace it.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(servicePaths.automation),
      },
      {
        '@type': 'Service',
        position: 3,
        name: 'Web and Product Prototypes',
        serviceType: 'Web Design and Product Prototyping',
        description:
          'Product-minded web experiences and prototypes built to make workflows, offers, and technical ideas usable, credible, and ready for iteration.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(servicePaths.prototypes),
      },
      {
        '@type': 'Service',
        position: 4,
        name: 'Brand Systems and Creative Direction',
        serviceType: 'Creative Direction and Brand Systems',
        description:
          'Brand intelligence systems, prompt structures, and review criteria that help teams keep AI-assisted content and creative outputs coherent.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(servicePaths.brand),
      },
      {
        '@type': 'Service',
        position: 5,
        name: 'Creative Practice',
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
    const sectionSelectors = '[data-home-section="hero"], [data-home-section="positioning"], [data-home-section="work"], .selected-ai-systems, .about, .services, .contact, .socials'
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
        <CreativeInfrastructure locale={locale} />
        <SectionCards locale={locale} />

        {/* Social Proof Section - Placeholder for future content
        * Suggested location for "Trusted By" logos or testimonial quotes
        * Uncomment and populate when client logos/testimonials are available
        *
        * <section className="social-proof" aria-label="Client testimonials">
        *   <div className="social-proof__inner">
        *     <p className="social-proof__label">Trusted By</p>
        *     <div className="social-proof__logos">
        *       {/* Add client logos here - recommended: 4-6 logos *}
        *       {/* <Image src="/images/clients/logo1.svg" alt="Client Name" width={120} height={40} /> *}
        *     </div>
        *     <blockquote className="social-proof__testimonial">
        *       <p className="social-proof__quote">
        *         "Quote from a satisfied client about the quality of work and results achieved."
        *       </p>
        *       <cite className="social-proof__cite">
        *         — Client Name, Company
        *       </cite>
        *     </blockquote>
        *   </div>
        * </section>
        */}

        <About locale={locale} />
        <Services locale={locale} />
        <Contact locale={locale} />
        <Socials locale={locale} />
        <Footer locale={locale} />
        <BackToTop />
      </main>
    </ErrorBoundary>
  )
}
