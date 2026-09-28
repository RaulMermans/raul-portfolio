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
          jobTitle: 'Creator and builder of AI systems, products, and ventures',
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
            'Digital products',
            'Business intelligence',
            'Brand strategy',
            'Creative systems',
            'Cultural strategy',
            'Product thinking',
            'Creative direction',
            'Research and data',
            'Technology and AI-assisted systems',
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
      jobTitle: 'Creator and builder of AI systems, products, and ventures',
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
        'Business intelligence',
        'Entrepreneurship',
        'Brand Strategy',
        'Product Development',
        'Storytelling',
        'Creative Direction',
        'Cultural Research',
        'Technology and Experimentation',
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
    jsonLd = {
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
          provider: {
            '@type': 'Person',
            '@id': `${siteConfig.url}/#person`,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Spain',
          },
        },
        {
          '@type': 'Service',
          position: 2,
          name: 'Brand Systems and Creative Direction',
          serviceType: 'Brand systems and creative direction',
          description:
            'Brand and creative systems that make ideas recognisable, coherent, and culturally relevant across campaigns, content, and digital experiences.',
          provider: {
            '@type': 'Person',
            '@id': `${siteConfig.url}/#person`,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Spain',
          },
        },
        {
          '@type': 'Service',
          position: 3,
          name: 'Data and Business Intelligence',
          serviceType: 'Business intelligence, analytics and decision support',
          description:
            'Data workflows, reporting and decision-support tools for commercial and operational questions.',
          provider: {
            '@type': 'Person',
            '@id': `${siteConfig.url}/#person`,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Spain',
          },
        },
        {
          '@type': 'Service',
          position: 4,
          name: 'AI Systems and Digital Products',
          serviceType: 'AI agents, intelligent workflows and digital products',
          description:
            'AI agents, internal tools and product prototypes with explicit evaluation and human oversight.',
          provider: {
            '@type': 'Person',
            '@id': `${siteConfig.url}/#person`,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Spain',
          },
        },
        {
          '@type': 'Service',
          position: 5,
        name: 'Photography and Visual Direction',
          serviceType: 'Photography, Image Systems, and Visual Research',
          description:
            'Photography and image-making as a supporting visual practice for composition, cultural reading, and brand judgment.',
          provider: {
            '@type': 'Person',
            '@id': `${siteConfig.url}/#person`,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Spain',
          },
        },
      ],
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
