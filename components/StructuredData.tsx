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
      jobTitle: 'Visual Storyteller & Creative Director',
      description: 'Visual Storyteller & Creative Director specializing in Photography, Brand Identity, and AI-Powered Creatives. Based in Spain.',
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
        'Photography',
        'Brand Identity',
        'Creative Direction',
        'AI-Powered Creatives',
        'Visual Storytelling',
        'Web Development',
      ],
      ...data,
    }
  } else if (type === 'WebSite') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Raúl Mermans Portfolio',
      url: baseUrl,
      description: 'Visual Storyteller & Creative Director — Photography, Brand Identity, AI-Powered Creatives. Based in Spain.',
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
          name: 'Photography',
          serviceType: 'Professional Photography',
          description: 'Visual narratives that capture the essence of brands and stories. Brand photography, visual storytelling, editorial shoots, and product photography.',
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
          name: 'Brand Identity',
          serviceType: 'Creative Direction & Brand Strategy',
          description: 'Strategic creative vision from concept to execution. Brand strategy, visual identity design, art direction, and campaign concepts.',
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
          name: 'AI-Powered Creatives',
          serviceType: 'AI Creative Solutions',
          description: 'Intelligent automation systems and AI-powered creative solutions. Custom AI solutions, automation workflows, prompt engineering, and AI integration.',
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
          name: 'Web Development',
          serviceType: 'Digital Systems & Web Development',
          description: 'Modern, performant web experiences crafted with precision. Custom web design, frontend development, performance optimization, and CMS integration.',
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

