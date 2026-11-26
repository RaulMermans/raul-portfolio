/**
 * Server Component for structured data (JSON-LD)
 * Renders directly in HTML for better SEO crawler visibility
 */

import { absoluteRouteUrl, absoluteUrl, siteConfig } from '@/lib/metadata'
import { PUBLIC_CONTACT_EMAIL } from '@/lib/contact'

interface StructuredDataProps {
  type:
    | 'Person'
    | 'WebSite'
    | 'Portfolio'
    | 'Article'
    | 'CreativeWork'
    | 'Service'
    | 'SoftwareApplication'
    | 'CollectionPage'
    | 'WebPage'
    | 'SiteGraph'
  data?: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
  }

  if (type === 'SiteGraph') {
    const inLanguage = typeof data?.inLanguage === 'string' ? data.inLanguage : 'es-ES'
    jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${siteConfig.url}/#person`,
          name: siteConfig.name,
          jobTitle: 'AI systems and product builder',
          description: siteConfig.defaultDescription,
          url: siteConfig.url,
          image: absoluteUrl('/images/about/profile.webp'),
          sameAs: [
            'https://github.com/RaulMermans',
            'https://www.instagram.com/raulmeermans/',
            'https://linkedin.com/in/raulmermans',
            'https://unsplash.com/@raulmermans',
          ],
          email: PUBLIC_CONTACT_EMAIL,
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'ES',
          },
          knowsAbout: [
            'AI agents and local inference',
            'Agentic systems and evaluation',
            'Data products and decision intelligence',
            'Brand strategy',
            'Creative systems',
            'Product development',
            'Creative direction',
            'Machine learning and forecasting',
            'Simulation and workflow architecture',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${siteConfig.url}/#website`,
          name: `${siteConfig.name} Portfolio`,
          url: absoluteRouteUrl('/'),
          description: siteConfig.defaultDescription,
          inLanguage,
          availableLanguage: ['es', 'en'],
          author: { '@id': `${siteConfig.url}/#person` },
        },
      ],
    }
  } else if (type === 'Person') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.name,
      jobTitle: 'AI systems and product builder',
      description: siteConfig.defaultDescription,
      url: siteConfig.url,
      image: absoluteUrl('/images/about/profile.webp'),
      sameAs: [
        'https://github.com/RaulMermans',
        'https://www.instagram.com/raulmeermans/',
        'https://linkedin.com/in/raulmermans',
        'https://unsplash.com/@raulmermans',
      ],
      email: PUBLIC_CONTACT_EMAIL,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'ES',
      },
      knowsAbout: [
        'AI agents and local inference',
        'Agentic systems and evaluation',
        'Data products and decision intelligence',
        'Brand Strategy',
        'Product Development',
        'Machine learning and forecasting',
        'Creative Direction',
        'Local AI and workflow architecture',
      ],
      ...data,
    }
  } else if (type === 'WebSite') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      name: `${siteConfig.name} Portfolio`,
      url: absoluteRouteUrl('/'),
      description: siteConfig.defaultDescription,
      inLanguage: 'es',
      availableLanguage: ['es', 'en'],
      author: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      ...data,
    }
  } else if (type === 'Service') {
    const isSpanish = data?.inLanguage === 'es-ES'
    const capabilities = isSpanish ? [
      ['Sistemas de IA y producto', 'Sistemas agénticos, herramientas internas y prototipos con evaluación y revisión humana.'],
      ['Datos e inteligencia para la decisión', 'Previsión, simulación y analítica operativa para decisiones revisables.'],
      ['Sistemas de marca y creatividad', 'Estrategia, narrativa y dirección visual para productos e ideas coherentes.'],
    ] : [
      ['AI Systems & Product', 'Agentic systems, internal tools and prototypes with evaluation and human review.'],
      ['Data & Decision Intelligence', 'Forecasting, simulation and operational analytics for inspectable decisions.'],
      ['Brand & Creative Systems', 'Strategy, narrative and visual direction for coherent products and ideas.'],
    ]
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${siteConfig.url}/#capabilities`,
      name: isSpanish ? 'Capacidades de Raúl Mermans' : 'Capabilities of Raúl Mermans',
      itemListElement: capabilities.map(([name, description], index) => ({
        '@type': 'Service',
        position: index + 1,
        name,
        description,
        provider: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
        areaServed: { '@type': 'Country', name: 'Spain' },
      })),
      ...data,
    }
  } else if (type === 'Portfolio') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${siteConfig.url}/#portfolio`,
      name: 'Raúl Mermans Portfolio',
      creator: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      ...data,
    }
  } else if (type === 'Article') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      publisher: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      ...data,
    }
  } else if (type === 'CreativeWork') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      creator: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      ...data,
    }
  } else if (type === 'SoftwareApplication') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${siteConfig.url}/#software-application`,
      name: 'Overflow',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'iOS',
      url: absoluteRouteUrl('/apps/overflow'),
      author: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      creator: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      ...data,
    }
  } else if (type === 'CollectionPage') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${siteConfig.url}/#collection-page`,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
      },
      about: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      ...data,
    }
  } else if (type === 'WebPage') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': data?.['@id'] ?? `${siteConfig.url}/#webpage`,
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      about: { '@id': `${siteConfig.url}/#person` },
      ...data,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  )
}
