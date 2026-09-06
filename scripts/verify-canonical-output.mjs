import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const failures = []

function read(relativePath) {
  const fullPath = resolve(root, relativePath)
  if (!existsSync(fullPath)) {
    failures.push(`Missing exported file: ${relativePath}`)
    return ''
  }
  return readFileSync(fullPath, 'utf8')
}

function requireText(file, text) {
  if (!read(file).includes(text)) failures.push(`${file} is missing: ${text}`)
}

function forbidText(file, text) {
  if (read(file).includes(text)) failures.push(`${file} must not include: ${text}`)
}

function requireHtmlLang(file, lang) {
  const htmlTag = read(file).match(/<html\b[^>]*>/i)?.[0] ?? ''
  if (!new RegExp(`\\blang="${lang}"`).test(htmlTag)) {
    failures.push(`${file} is missing html lang="${lang}"`)
  }
}

const routes = [
  ['out/index.html', 'es', 'https://www.raulmermans.com/'],
  ['out/about/index.html', 'es', 'https://www.raulmermans.com/about/'],
  ['out/case-studies/index.html', 'es', 'https://www.raulmermans.com/case-studies/'],
  ['out/en/index.html', 'en', 'https://www.raulmermans.com/en/'],
  ['out/en/about/index.html', 'en', 'https://www.raulmermans.com/en/about/'],
  ['out/en/case-studies/index.html', 'en', 'https://www.raulmermans.com/en/case-studies/'],
]

for (const [file, lang, canonical] of routes) {
  requireHtmlLang(file, lang)
  requireText(file, `<link rel="canonical" href="${canonical}"`)
  requireText(file, 'hrefLang="en-US"')
  requireText(file, 'hrefLang="es-ES"')
  requireText(file, 'hrefLang="x-default" href="https://www.raulmermans.com/')
}

requireText('out/index.html', '<title>Raúl Mermans | Estrategia de marca, sistemas creativos y producto</title>')
requireText('out/index.html', 'Raúl Mermans construye marcas, productos y sistemas creativos')
requireText('out/en/index.html', '<title>Raul Mermans | Brand strategy, creative systems, and products</title>')
requireText('out/en/index.html', 'Raul Mermans builds brands, products, and creative systems')

forbidText('out/index.html', 'href="/es/')
forbidText('out/en/index.html', 'href="/es/')
forbidText('out/about/index.html', 'Primor')
forbidText('out/en/about/index.html', 'Primor')

requireText('components/case-studies/BoldText.tsx', 'keyword.replace(/[.*+?^${}()|[\\]\\\\]/g')
forbidText('components/case-studies/BoldText.tsx', 'dangerouslySetInnerHTML')
requireText('components/SectionCards.tsx', 'inert={!isActiveSlide || undefined}')
requireText('components/StructuredData.tsx', "'SiteGraph'")
requireText('components/StructuredData.tsx', '`${siteConfig.url}/#person`')
forbidText('app/sitemap.ts', 'new Date()')
forbidText('data/photography.ts', 'photography ${index}')
requireText('out/photography/index.html', 'type="image/avif"')
requireText('out/photography/index.html', '/images/derived/photography/')

if (existsSync(resolve(root, 'out/es'))) {
  failures.push('The static export contains a duplicate /es route tree.')
}

if (failures.length > 0) {
  console.error('Canonical output verification failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('Canonical output verification passed.')
