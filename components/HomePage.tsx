import { type Locale, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import SelectedSystems from '@/components/SelectedSystems'
import CreativeInfrastructure from '@/components/CreativeInfrastructure'
import SectionCards from '@/components/SectionCards'
import About from '@/components/About'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import ErrorBoundary from '@/components/ErrorBoundary'
import BackToTop from '@/components/BackToTop'
import HomeEffects from '@/components/HomeEffects'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl } from '@/lib/metadata'


const homeCopy = {
  es: {
    name: 'Raúl Mermans | Sistemas de IA, productos y estrategia creativa',
    description:
      'Raúl Mermans construye sistemas de IA, productos digitales y herramientas de inteligencia de negocio junto con marcas, proyectos propios y trabajo creativo.',
    inLanguage: 'es-ES',
  },
  en: {
    name: 'Raul Mermans | AI systems, products, and creative strategy',
    description:
      'Raul Mermans builds independent AI systems, digital products, and business intelligence tools alongside brands, ventures, and creative work.',
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
        <SelectedSystems locale={locale} />
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
