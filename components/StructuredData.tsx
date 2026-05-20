/**
 * Server Component for structured data (JSON-LD)
 * Renders directly in HTML for better SEO crawler visibility
 */

import { absoluteRouteUrl, absoluteUrl, siteConfig } from '@/lib/metadata'

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
      jobTitle: 'Arquitecto de Sistemas de IA Aplicada',
      description: siteConfig.defaultDescription,
      url: siteConfig.url,
      image: absoluteUrl('/images/about/profile.webp'),
      sameAs: [
        'https://www.instagram.com/raulmeermans/',
        'https://linkedin.com/in/raulmermans',
        'https://unsplash.com/@raulmermans',
      ],
      email: 'raulmermans@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'ES',
      },
      knowsAbout: [
        'AI Systems Design',
        'Agentic Workflows',
        'Automation Infrastructure',
        'Marketing Automation',
        'CRM Automation',
        'Content Systems',
        'Creative Infrastructure',
        'Product Prototyping',
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
          name: 'AI Systems',
          serviceType: 'Applied AI Systems Design',
          description:
            'Applied AI systems that turn repetitive, judgment-heavy work into reliable execution through automation logic, orchestration, and AI-enabled workflows.',
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
          name: 'Automation and Internal Tools',
          serviceType: 'Operational Automation and Internal Interfaces',
          description:
            'Automation systems and internal tools for marketing, CRM, content, and creative operations with human review where it matters.',
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
          name: 'Web and Product Prototypes',
          serviceType: 'Web Design and Product Prototyping',
          description:
            'Product-minded web experiences and prototypes built to make workflows, offers, and technical ideas usable, credible, and ready for iteration.',
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
          name: 'Brand Systems and Creative Direction',
          serviceType: 'Creative Direction and Brand Systems',
          description:
            'Creative direction connecting brand intelligence, visual systems, and campaign thinking so every tool feels coherent, adoptable, and commercially credible.',
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
          name: 'Creative Practice',
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
