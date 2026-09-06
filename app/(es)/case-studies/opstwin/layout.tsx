import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'OpsTwin | Simulación operativa para equipos de servicio'
const description = 'OpsTwin compara cambios de plantilla y de flujo en una operación de servicio ficticia mediante simulación emparejada. Muestra evidencia, incertidumbre y carga de trabajo sin recomendar una acción.'
const image = '/images/case-studies/opstwin/proof/guided-setup.png'
const keywords = ['OpsTwin', 'simulación operativa', 'apoyo a decisiones', 'simulación de eventos discretos', 'operaciones de servicio', 'simulación emparejada', 'FastAPI', 'SimPy']

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/opstwin',
  locale: 'es',
  image: { url: image, alt: 'Espacio guiado de simulación operativa de OpsTwin', width: 1440, height: 1200 },
  type: 'article',
  keywords,
  absoluteTitle: true,
})

export default function OpsTwinLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/case-studies/opstwin')
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Casos de estudio', item: `${siteConfig.url}/case-studies` },
      { '@type': 'ListItem', position: 3, name: 'OpsTwin', item: url },
    ],
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><StructuredData type="Article" data={{ '@id': `${siteConfig.url}/#opstwin-case-study`, headline: title, name: 'OpsTwin', description, url, mainEntityOfPage: url, image: absoluteUrl(image), articleSection: 'Case Studies', keywords }} />{children}</>
}
