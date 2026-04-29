'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getSiteCopy } from '@/data/site-copy'
import { getCaseStudies, type CaseStudy } from '@/data/case-studies'
import { type Locale, getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { absoluteRouteUrl, siteConfig } from '@/lib/metadata'

type CategoryProject = {
  title: string
  description: string
  label: string
  image: string
  href?: string
}

type CaseStudyCategory = {
  id: string
  title: string
  eyebrow: string
  description: string
  projects: CategoryProject[]
}

const placeholderImage = '/images/case-studies/case-studies-thumbnail.webp'

function getSchemas(locale: Locale) {
  const isSpanish = locale === 'es'
  const localizedHome = localizePath('/', locale)
  const localizedCaseStudies = localizePath('/case-studies', locale)

  return {
    collection: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${siteConfig.url}/#case-studies-page`,
      name: isSpanish ? 'Casos de estudio' : 'Case Studies',
      description: isSpanish
        ? 'Casos de estudio de Raúl Mermans sobre sistemas de IA, flujos de automatización, sistemas de marca y ejecución creativa con criterio de producto.'
        : 'Case studies by Raúl Mermans covering AI systems, automation workflows, brand systems, and product-minded creative execution.',
      url: absoluteRouteUrl(localizedCaseStudies),
      isPartOf: { '@type': 'WebSite', '@id': `${siteConfig.url}/#website` },
      about: { '@type': 'Person', '@id': `${siteConfig.url}/#person` },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isSpanish ? 'Inicio' : 'Home',
          item: absoluteRouteUrl(localizedHome),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isSpanish ? 'Casos de estudio' : 'Case Studies',
          item: absoluteRouteUrl(localizedCaseStudies),
        },
      ],
    },
  }
}

function findStudy(caseStudies: CaseStudy[], hrefPart: string) {
  return caseStudies.find((study) => study.href.includes(hrefPart))
}

function getCategories(locale: Locale, caseStudies: CaseStudy[]): CaseStudyCategory[] {
  const isSpanish = locale === 'es'
  const aiSports = findStudy(caseStudies, 'ai-sports')
  const remoria = findStudy(caseStudies, 'remoria')

  return [
    {
      id: 'ai-systems-agents',
      title: isSpanish ? 'Sistemas de IA y agentes' : 'AI Systems & Agents',
      eyebrow: isSpanish ? 'Nueva categoría' : 'New category',
      description: isSpanish
        ? 'Agentes y sistemas aplicados que convierten análisis, auditoría y decisiones repetibles en flujos utilizables.'
        : 'Applied agents and systems that turn analysis, audits, and repeatable decisions into usable workflows.',
      projects: [
        {
          title: 'Data Brief AI',
          label: isSpanish ? 'Agente de investigación' : 'Research agent',
          description: isSpanish
            ? 'Sistema para transformar entradas dispersas en briefs estructurados, accionables y listos para decisión.'
            : 'A system for turning scattered inputs into structured, actionable briefs ready for decision-making.',
          image: placeholderImage,
        },
        {
          title: 'Website Auditor',
          label: isSpanish ? 'Agente de auditoría' : 'Audit agent',
          description: isSpanish
            ? 'Flujo de auditoría para detectar oportunidades de UX, SEO, rendimiento y contenido en una web.'
            : 'An audit workflow for surfacing UX, SEO, performance, and content opportunities across a website.',
          image: placeholderImage,
        },
      ],
    },
    {
      id: 'campaign-systems',
      title: isSpanish ? 'Sistemas de campaña' : 'Campaign Systems',
      eyebrow: isSpanish ? 'Ejecución creativa' : 'Creative execution',
      description: isSpanish
        ? 'Infraestructura para mantener consistencia visual, narrativa y operativa en campañas de ritmo rápido.'
        : 'Infrastructure for keeping visual, narrative, and operational consistency inside fast-moving campaigns.',
      projects: aiSports
        ? [
            {
              title: aiSports.title,
              label: aiSports.subtitle ?? (isSpanish ? 'Sistema de campaña con IA' : 'AI campaign system'),
              description: aiSports.description,
              image: aiSports.image,
              href: aiSports.href,
            },
          ]
        : [],
    },
    {
      id: 'brand-systems',
      title: isSpanish ? 'Sistemas de marca' : 'Brand Systems',
      eyebrow: isSpanish ? 'Identidad escalable' : 'Scalable identity',
      description: isSpanish
        ? 'Identidades, reglas visuales y lógica de marca pensadas para escalar sin perder precisión.'
        : 'Identities, visual rules, and brand logic designed to scale without losing precision.',
      projects: remoria
        ? [
            {
              title: remoria.title,
              label: remoria.subtitle ?? (isSpanish ? 'Sistema de marca' : 'Brand system'),
              description: remoria.description,
              image: remoria.image,
              href: remoria.href,
            },
          ]
        : [],
    },
  ]
}

function ProjectCard({
  project,
  viewProject,
  comingSoon,
  priority,
}: {
  project: CategoryProject
  viewProject: string
  comingSoon: string
  priority?: boolean
}) {
  const content = (
    <>
      <div className="case-study-category-card__media">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={82}
          className="case-study-category-card__image"
          priority={priority}
        />
      </div>
      <div className="case-study-category-card__body">
        <p className="case-study-category-card__label">{project.label}</p>
        <h3 className="case-study-category-card__title">{project.title}</h3>
        <p className="case-study-category-card__description">{project.description}</p>
        <span className="case-study-category-card__cta">
          {project.href ? viewProject : comingSoon}
          {project.href ? <span aria-hidden="true">→</span> : null}
        </span>
      </div>
    </>
  )

  if (project.href) {
    return (
      <Link href={project.href} className="case-study-category-card">
        {content}
      </Link>
    )
  }

  return (
    <article className="case-study-category-card case-study-category-card--soon" aria-label={`${project.title} — ${comingSoon}`}>
      {content}
    </article>
  )
}

export default function CaseStudiesPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const copy = getSiteCopy(locale).caseStudiesUi
  const caseStudies = getCaseStudies(locale)
  const categories = getCategories(locale, caseStudies)
  const schemas = getSchemas(locale)
  const isSpanish = locale === 'es'

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" role="main" className="case-studies-index">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.collection) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
        />
        <section className="case-studies-index__hero" aria-labelledby="case-studies-heading">
          <div className="case-studies-index__hero-copy">
            <p className="case-studies-index__eyebrow">{copy.pageEyebrow}</p>
            <h1 id="case-studies-heading" className="case-studies-index__title">
              {copy.pageTitle}
            </h1>
            <p className="case-studies-index__description">{copy.pageDescription}</p>
          </div>
          <nav className="case-studies-index__nav" aria-label={isSpanish ? 'Categorías de casos' : 'Case study categories'}>
            {categories.map((category) => (
              <a key={category.id} href={`#${category.id}`} className="case-studies-index__nav-link">
                {category.title}
              </a>
            ))}
          </nav>
        </section>

        <div className="case-study-categories" aria-label={isSpanish ? 'Categorías de casos de estudio' : 'Case study categories'}>
          {categories.map((category, categoryIndex) => (
            <section
              key={category.id}
              id={category.id}
              className="case-study-category"
              aria-labelledby={`${category.id}-heading`}
            >
              <div className="case-study-category__header">
                <p className="case-study-category__eyebrow">{category.eyebrow}</p>
                <h2 id={`${category.id}-heading`} className="case-study-category__title">
                  {category.title}
                </h2>
                <p className="case-study-category__description">{category.description}</p>
              </div>
              <div className="case-study-category__grid">
                {category.projects.map((project, projectIndex) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    viewProject={copy.viewProject}
                    comingSoon={isSpanish ? 'Próximamente' : 'Coming soon'}
                    priority={categoryIndex === 0 && projectIndex === 0}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  )
}
