import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'OpsTwin | Operational simulation for service teams'
const description = 'OpsTwin compares staffing and workflow changes in a fictional service operation through matched simulation. It shows evidence, uncertainty, and workload without recommending an action.'
const image = '/images/case-studies/opstwin/proof/guided-setup.png'
const keywords = ['OpsTwin', 'operational simulation', 'decision support', 'discrete-event simulation', 'service operations', 'matched simulation', 'FastAPI', 'SimPy']

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/opstwin',
  locale: 'en',
  image: { url: image, alt: 'OpsTwin guided operational simulation workspace', width: 1440, height: 1200 },
  type: 'article',
  keywords,
  absoluteTitle: true,
})

export default function EnglishOpsTwinLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/en/case-studies/opstwin')
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/en` },
      { '@type': 'ListItem', position: 2, name: 'Case studies', item: `${siteConfig.url}/en/case-studies` },
      { '@type': 'ListItem', position: 3, name: 'OpsTwin', item: url },
    ],
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><StructuredData type="Article" data={{ '@id': `${siteConfig.url}/#opstwin-case-study-en`, headline: title, name: 'OpsTwin', description, url, mainEntityOfPage: url, image: absoluteUrl(image), articleSection: 'Case Studies', keywords }} />{children}</>
}
