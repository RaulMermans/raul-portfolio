'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getSiteCopy } from '@/data/site-copy'
import {
  getCaseStudyCategory,
  type CaseStudyCategorySlug,
  type CategoryProject,
} from '@/data/case-study-categories'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
          sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 44vw"
          quality={84}
          className="case-study-category-card__image"
          priority={priority}
        />
      </div>
      <div className="case-study-category-card__body">
        <p className="case-study-category-card__label">{project.label}</p>
        <h2 className="case-study-category-card__title">{project.title}</h2>
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
    <article className="case-study-category-card case-study-category-card--soon" aria-label={`${project.title} - ${comingSoon}`}>
      {content}
    </article>
  )
}

export default function CaseStudyCategoryPage({ categorySlug }: { categorySlug: CaseStudyCategorySlug }) {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const copy = getSiteCopy(locale).caseStudiesUi
  const category = getCaseStudyCategory(locale, categorySlug)
  const isSpanish = locale === 'es'

  if (!category) {
    return null
  }

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" role="main" className="case-study-category-detail">
        <header className="case-study-category-detail__header">
          <Link href={localizePath('/case-studies', locale)} className="case-study-category-detail__back">
            ← {isSpanish ? 'Categorías' : 'Categories'}
          </Link>
          <p className="case-study-category-detail__eyebrow">{category.eyebrow}</p>
          <h1 className="case-study-category-detail__title">{category.title}</h1>
          <p className="case-study-category-detail__description">{category.description}</p>
        </header>
        <section className="case-study-category-detail__grid" aria-label={isSpanish ? 'Casos de estudio' : 'Case studies'}>
          {category.projects.map((project, projectIndex) => (
            <ProjectCard
              key={project.title}
              project={project}
              viewProject={copy.viewProject}
              comingSoon={isSpanish ? 'Próximamente' : 'Coming soon'}
              priority={projectIndex === 0}
            />
          ))}
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
