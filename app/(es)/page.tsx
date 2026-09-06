import type { Metadata } from 'next'
import { type Locale, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import CreativeInfrastructure from '@/components/CreativeInfrastructure'
import SectionCards from '@/components/SectionCards'
import About from '@/components/About'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import ErrorBoundary from '@/components/ErrorBoundary'
import BackToTop from '@/components/BackToTop'
import HomeEffects from '@/components/HomeEffects'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Raúl Mermans | Estrategia de marca, sistemas creativos y producto',
  description:
    'Raúl Mermans construye marcas, productos y sistemas creativos entre negocio, cultura, investigación y tecnología.',
  path: '/',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans',
  },
  keywords: ['estrategia de marca', 'dirección creativa', 'productos digitales', 'sistemas creativos'],
  absoluteTitle: true,
})

const homeCopy = {
  es: {
    name: 'Raúl Mermans | Estrategia de marca, sistemas creativos y producto',
    description:
      'Raúl Mermans construye marcas, productos y sistemas creativos entre negocio, cultura, investigación y tecnología.',
    inLanguage: 'es-ES',
  },
  en: {
    name: 'Raul Mermans | Brand strategy, creative systems, and products',
    description:
      'Raul Mermans builds brands, products, and creative systems where business, culture, research, and technology meet.',
    inLanguage: 'en-US',
  },
} satisfies Record<Locale, { name: string; description: string; inLanguage: string }>

export default function Home({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale]

  return (
    <ErrorBoundary>
      <main id="main-content">
        <StructuredData
          type="WebPage"
          data={{
            '@id': `${absoluteRouteUrl(localizePath('/', locale))}#webpage`,
            name: copy.name,
            description: copy.description,
            url: absoluteRouteUrl(localizePath('/', locale)),
            inLanguage: copy.inLanguage,
          }}
        />
        <Header locale={locale} />
        <Hero locale={locale} />
        <SectionCards locale={locale} />
        <CreativeInfrastructure locale={locale} />
        <About locale={locale} />
        <Services locale={locale} />
        <Contact locale={locale} />
        <Footer locale={locale} />
        <BackToTop />
        <HomeEffects />
      </main>
    </ErrorBoundary>
  )
}
