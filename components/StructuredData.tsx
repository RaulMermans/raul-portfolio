/**
 * Server Component for structured data (JSON-LD)
 * Renders directly in HTML for better SEO crawler visibility
 */

interface StructuredDataProps {
  type: 'Person' | 'WebSite' | 'Portfolio' | 'Article' | 'CreativeWork' | 'Service'
  data?: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'
  
  let jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
  }

  if (type === 'Person') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Raúl Mermans',
      jobTitle: 'Applied AI Systems Builder',
      description: 'Applied AI systems builder designing agents, automation, and creative infrastructure for modern brands. Based in Spain.',
      url: baseUrl,
      sameAs: [
        'https://www.instagram.com/raulmeermans/',
        'https://linkedin.com/in/raulmermans',
        'https://unsplash.com/@raulmermans',
      ],
      email: 'raulmermans@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'ES',
        addressLocality: 'Spain',
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
      name: 'Raúl Mermans Portfolio',
      url: baseUrl,
      description: 'Applied AI systems, agents, and automation for modern brands across marketing, CRM, content, and creative execution.',
      author: {
        '@type': 'Person',
        name: 'Raúl Mermans',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/case-studies?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
      ...data,
    }
  } else if (type === 'Service') {
    // Service offerings structured data
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'Service',
          position: 1,
          name: 'AI Systems & Agentic Workflows',
          serviceType: 'Applied AI Systems Design',
          description: 'Applied AI systems, agentic workflows, and orchestration logic built to make judgment-heavy execution more reliable and usable.',
          provider: {
            '@type': 'Person',
            name: 'Raúl Mermans',
            url: baseUrl,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Spain',
          },
        },
        {
          '@type': 'Service',
          position: 2,
          name: 'Automation Infrastructure',
          serviceType: 'Automation Infrastructure Design',
          description: 'Automation infrastructure for marketing, CRM, content, and internal operations, built around tool integration, routing, and operational visibility.',
          provider: {
            '@type': 'Person',
            name: 'Raúl Mermans',
            url: baseUrl,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Spain',
          },
        },
        {
          '@type': 'Service',
          position: 3,
          name: 'AI-Powered Prototypes & Tools',
          serviceType: 'AI Prototype and Tool Development',
          description: 'AI-powered prototypes, internal tools, and operator interfaces used to validate workflows, expose new operating models, and ship smarter product surfaces.',
          provider: {
            '@type': 'Person',
            name: 'Raúl Mermans',
            url: baseUrl,
          },
          areaServed: {
            '@type': 'Country',
            name: 'Spain',
          },
        },
        {
          '@type': 'Service',
          position: 4,
          name: 'Brand & Creative Systems',
          serviceType: 'Brand and Creative Systems Design',
          description: 'Brand and creative systems that keep AI-assisted execution coherent, commercially credible, and aligned with the quality bar of the brand.',
          provider: {
            '@type': 'Person',
            name: 'Raúl Mermans',
            url: baseUrl,
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
      '@id': `${baseUrl}/#portfolio`,
      name: 'Raúl Mermans Portfolio',
      creator: {
        '@type': 'Person',
        name: 'Raúl Mermans',
      },
      ...data,
    }
  } else if (type === 'Article') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: 'Raúl Mermans',
        url: baseUrl,
      },
      publisher: {
        '@type': 'Person',
        name: 'Raúl Mermans',
      },
      ...data,
    }
  } else if (type === 'CreativeWork') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      creator: {
        '@type': 'Person',
        name: 'Raúl Mermans',
        url: baseUrl,
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
