'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { type CaseStudyCategorySlug, getCaseStudyCategory } from '@/data/case-study-categories'
import { type Locale, getLocaleFromPath, localizePath } from '@/lib/i18n'

interface CaseStudyCategoryPageProps {
  categorySlug: CaseStudyCategorySlug
}

const muted = 'rgba(26, 23, 20, 0.45)'
const bodyColor = 'rgba(26, 23, 20, 0.72)'

export default function CaseStudyCategoryPage({ categorySlug }: CaseStudyCategoryPageProps) {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const category = getCaseStudyCategory(locale, categorySlug)

  if (!category) {
    return null
  }

  const backLabel = locale === 'es' ? '← Todos los casos' : '← All case studies'
  const projectsLabel = locale === 'es' ? 'Proyectos en esta categoría' : 'Projects in this category'

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="case-study-category-detail">
        <header className="case-study-category-detail__header">
          <Link href={localizePath('/case-studies', locale)} className="case-study-category-detail__back">
            {backLabel}
          </Link>

          <p className="case-study-category-detail__eyebrow">{category.eyebrow}</p>
          <h1 className="case-study-category-detail__title">{category.title}</h1>
          <p className="case-study-category-detail__description">{category.description}</p>
        </header>

        <section aria-labelledby="case-study-category-projects">
          <p id="case-study-category-projects" className="case-study-category-detail__eyebrow">
            {projectsLabel}
          </p>

          {category.projects.length > 0 ? (
            <div className="case-study-category-detail__grid">
              {category.projects.map((project) => {
                const cardContent = (
                  <>
                    <span className="case-study-category-card__media">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="case-study-category-card__image"
                        quality={80}
                      />
                    </span>
                    <div className="case-study-category-card__body">
                      <p className="case-study-category-card__label">{project.label}</p>
                      <h2 className="case-study-category-card__title">{project.title}</h2>
                      <p className="case-study-category-card__description">{project.description}</p>
                      <span className="case-study-category-card__cta">
                        {project.href
                          ? locale === 'es'
                            ? 'Ver caso'
                            : 'View System Logic'
                          : locale === 'es'
                            ? 'Próximamente'
                            : 'Coming soon'}
                        {project.href ? <span aria-hidden="true">→</span> : null}
                      </span>
                    </div>
                  </>
                )

                if (!project.href) {
                  return (
                    <article key={project.title} className="case-study-category-card case-study-category-card--soon">
                      {cardContent}
                    </article>
                  )
                }

                return (
                  <Link key={project.title} href={project.href} className="case-study-category-card">
                    {cardContent}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div style={{ border: '1px dashed var(--cream-dark)', padding: '3rem', maxWidth: 600 }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.28em', color: muted, marginBottom: '1rem' }}>
                {locale === 'es' ? 'En desarrollo' : 'In development'}
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: bodyColor }}>
                {locale === 'es'
                  ? 'Los proyectos de esta categoría se añadirán próximamente.'
                  : 'Projects in this category will be added soon.'}
              </p>
              <Link
                href={localizePath('/case-studies', locale)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '0.25rem' }}
              >
                {locale === 'es' ? 'Ver todos los casos →' : 'View all case studies →'}
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
