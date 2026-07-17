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
  data?: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
  }

  if (type === 'Person') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.name,
      jobTitle: 'AI, Product, Data and Brand Systems Practitioner',
      description: siteConfig.defaultDescription,
      url: siteConfig.url,
      image: absoluteUrl('/images/about/profile.webp'),
      sameAs: [
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
        'Applied AI',
        'Product Development',
        'Data and Business Intelligence',
        'CRM and Marketing Systems',
        'Brand Strategy',
        'Creative Direction',
        'Automation',
        'Human-centered Decision Systems',
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
          name: 'Data, Research and Intelligence',
          serviceType: 'Data, research and decision support',
          description:
            'Research and data tools that make complex information easier to understand and act on.',
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
          name: 'Digital Products, AI and Prototyping',
          serviceType: 'Digital products, AI and prototyping',
          description:
            'Digital products and prototypes that make strategies, workflows, and ideas easier to test and use, with AI where it helps.',
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
