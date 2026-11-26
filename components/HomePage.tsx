import { type Locale, localizePath } from '@/lib/i18n'
import PortfolioGateway from '@/components/PortfolioGateway'
import ErrorBoundary from '@/components/ErrorBoundary'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl } from '@/lib/metadata'


const homeCopy = {
  es: {
    name: 'Raúl Mermans | Portfolio técnico y creativo',
    description:
      'Conoce a Raúl Mermans y explora dos recorridos: sistemas, software y datos; fotografía, identidad y trabajo visual.',
    inLanguage: 'es-ES',
  },
  en: {
    name: 'Raúl Mermans | Technical and Creative Portfolio',
    description:
      'Meet Raúl Mermans and choose between technical work in software, AI and data, or creative work in photography and visual identity.',
    inLanguage: 'en-US',
  },
} satisfies Record<Locale, { name: string; description: string; inLanguage: string }>

export default function Home({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale]

  return (
    <ErrorBoundary>
      <main id="main-content" className="home-editorial">
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
        <PortfolioGateway locale={locale} />
      </main>
    </ErrorBoundary>
  )
}
