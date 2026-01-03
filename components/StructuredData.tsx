'use client'

import { useEffect } from 'react'

interface StructuredDataProps {
  type: 'Person' | 'WebSite' | 'Portfolio' | 'Article' | 'CreativeWork'
  data?: Record<string, any>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
    
    let jsonLd: Record<string, any> = {
      '@context': 'https://schema.org',
    }

    if (type === 'Person') {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Raúl Mermans',
        jobTitle: 'Visual Storyteller',
        description: 'Visual Storyteller — Photography, Brand Identity, AI-Powered Creatives. Based in Spain.',
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
        ...data,
      }
    } else if (type === 'WebSite') {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Raúl Mermans Portfolio',
        url: baseUrl,
        description: 'Visual Storyteller — Photography, Brand Identity, AI-Powered Creatives. Based in Spain.',
        author: {
          '@type': 'Person',
          name: 'Raúl Mermans',
        },
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

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = `structured-data-${type.toLowerCase()}`
    script.text = JSON.stringify(jsonLd)
    document.head.appendChild(script)

    return () => {
      const existingScript = document.getElementById(`structured-data-${type.toLowerCase()}`)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [type, data])

  return null
}

