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
const bodyColor = 'rgba(26, 23, 20, 0.65)'
const displayFont = 'var(--font-display), "Bebas Neue", Impact, sans-serif'

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
      <main id="main-content" style={{ background: 'var(--cream)', color: 'var(--ink)', minHeight: '100vh' }}>
        <section style={{ borderBottom: '1px solid var(--cream-dark)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(7rem, 12vw, 10rem) 2.5rem 4rem' }}>
            <Link
              href={localizePath('/case-studies', locale)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: muted, marginBottom: '2rem', textDecoration: 'none' }}
            >
              {backLabel}
            </Link>

            <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.32em', color: muted, marginBottom: '1rem' }}>
              {category.eyebrow}
            </p>
            <h1
              style={{ fontFamily: displayFont, fontSize: 'clamp(3.5rem, 8vw, 7rem)', textTransform: 'uppercase', lineHeight: 0.9, color: 'var(--ink)', marginBottom: '1.5rem' }}
            >
              {category.title}
            </h1>
            <p style={{ maxWidth: '56ch', fontSize: '1.1rem', lineHeight: 1.7, color: bodyColor }}>
              {category.description}
            </p>
          </div>
        </section>

        <section style={{ maxWidth: 1400, margin: '0 auto', padding: '4rem 2.5rem 6rem' }}>
          <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.32em', color: muted, marginBottom: '2rem' }}>
            {projectsLabel}
          </p>

          {category.projects.length > 0 ? (
            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))' }}>
              {category.projects.map((project) => (
                <article
                  key={project.title}
                  style={{ border: '1px solid var(--cream-dark)', background: 'var(--cream-light)', borderRadius: 0 }}
                >
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      quality={80}
                    />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.28em', color: muted, marginBottom: '0.75rem' }}>
                      {project.label}
                    </p>
                    <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', textTransform: 'uppercase', lineHeight: 0.95, color: 'var(--ink)', marginBottom: '1rem' }}>
                      {project.title}
                    </h2>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: bodyColor, marginBottom: '1.5rem' }}>
                      {project.description}
                    </p>
                    {project.href ? (
                      <Link
                        href={project.href}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '0.25rem' }}
                      >
                        {locale === 'es' ? 'Ver caso →' : 'View case →'}
                      </Link>
                    ) : (
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: muted }}>
                        {locale === 'es' ? 'Próximamente' : 'Coming soon'}
                      </span>
                    )}
                  </div>
                </article>
              ))}
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
