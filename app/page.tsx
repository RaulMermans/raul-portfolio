'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { type Locale, getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
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
  const localizedRoot = localizePath('/', locale)
  const localizedPhotography = localizePath('/photography', locale)

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
          url: absoluteRouteUrl(localizedRoot),
        },
        {
          '@type': 'Service',
          position: 2,
          name: 'Desarrollo web',
          serviceType: 'Diseño y desarrollo web',
          description:
            'Sitios y experiencias digitales modernos, rápidos y pensados para narrativa clara, conversión y una ejecución premium.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(localizedRoot),
        },
        {
          '@type': 'Service',
          position: 3,
          name: 'Fotografía',
          serviceType: 'Fotografía editorial y de marca',
          description:
            'Fotografía que apoya el relato de marca mediante composición, contención visual e imágenes pensadas para uso editorial y comercial.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(localizedPhotography),
        },
        {
          '@type': 'Service',
          position: 4,
          name: 'Dirección creativa',
          serviceType: 'Dirección creativa y sistemas de marca',
          description:
            'Dirección creativa que conecta identidad de marca, sistemas visuales y pensamiento de campaña para que cada punto de contacto se sienta coherente e intencional.',
          provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
          areaServed: { '@type': 'Country', name: 'Spain' },
          url: absoluteRouteUrl(localizedRoot),
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
        url: absoluteRouteUrl(localizedRoot),
      },
      {
        '@type': 'Service',
        position: 2,
        name: 'Web Development',
        serviceType: 'Web Design and Development',
        description:
          'Modern, performance-minded websites and digital experiences designed for clear storytelling, conversion, and premium execution.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(localizedRoot),
      },
      {
        '@type': 'Service',
        position: 3,
        name: 'Photography',
        serviceType: 'Brand and Editorial Photography',
        description:
          'Photography that supports brand storytelling through composition, visual restraint, and imagery shaped for editorial and commercial use.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(localizedPhotography),
      },
      {
        '@type': 'Service',
        position: 4,
        name: 'Creative Direction',
        serviceType: 'Creative Direction and Brand Systems',
        description:
          'Creative direction spanning brand identity, visual systems, and campaign thinking so every touchpoint feels coherent, intentional, and commercially credible.',
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
        url: absoluteRouteUrl(localizedRoot),
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
    const sectionSelectors = '[data-home-section="hero"], [data-home-section="work"], .about, .services, .contact, .socials'
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
