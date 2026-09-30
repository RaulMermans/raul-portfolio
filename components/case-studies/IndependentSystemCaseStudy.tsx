'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getIndependentSystem, type IndependentSystemSlug } from '@/data/independent-systems'
import { getPresentationFamilyForProject } from '@/data/portfolio-experience'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'
import { useCaseStudySetup } from '@/hooks'
import CaseStudyMiniNav from './CaseStudyMiniNav'
import CaseStudyNext from './CaseStudyNext'
import { CaseStudyHeroLabel, CaseStudySnapshot } from './CommercialCaseStudySections'

export default function IndependentSystemCaseStudy({ slug }: { slug: IndependentSystemSlug }) {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const system = getIndependentSystem(slug, locale)
  const spanish = locale === 'es'
  useCaseStudySetup()

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="case-study-page-new case-study-page-new--data-brief">
        <section className="data-brief-hero" data-case-study-hero data-presentation-family={getPresentationFamilyForProject(slug)} aria-labelledby="system-title">
          <div className="data-brief-hero__content">
            <Link className="data-brief-back" href={localizePath('/case-studies', locale)}>{spanish ? 'Volver a casos de estudio' : 'Back to case studies'}</Link>
            <CaseStudyHeroLabel locale={locale} />
            <h1 id="system-title" className="data-brief-hero__title">{system.title}</h1>
            <p className="data-brief-hero__subtitle">{system.tagline}</p>
            <p className="data-brief-hero__description">{system.summary}</p>
            <p className="data-brief-hero__description">{system.status}</p>
            <p className="data-brief-hero__description">{system.role}</p>
            {'repository' in system && (
              <div className="data-brief-actions">
                <a className="data-brief-button" href={system.repository} target="_blank" rel="noreferrer">{spanish ? 'Explorar arquitectura pública' : 'Explore public architecture'}</a>
              </div>
            )}
          </div>
          <figure className="ui-media ui-media--contained">
            <Image
              src={system.image}
              alt={'heroAlt' in system ? system.heroAlt : spanish ? 'Índice simplificado de los módulos del sistema' : 'Simplified index of system modules'}
              width={'imageWidth' in system ? system.imageWidth : 1200}
              height={'imageHeight' in system ? system.imageHeight : 800}
              sizes="(max-width: 900px) 100vw, 50vw"
              loading="eager"
            />
            <figcaption>{'heroCaption' in system ? system.heroCaption : spanish ? 'Módulos de arquitectura. No representa una ejecución real.' : 'Architecture modules. This does not represent a live run.'}</figcaption>
          </figure>
        </section>
        <CaseStudyMiniNav items={system.chapters.map((chapter) => [chapter.title, `#${chapter.id}`])} ariaLabel={spanish ? 'Secciones del caso' : 'Case study sections'} />
        <CaseStudySnapshot locale={locale} contextHref="#problem" solutionHref="#architecture" />
        {system.chapters.map((chapter, index) => (
          <section key={chapter.id} id={chapter.id} className={`data-brief-section ${index % 2 ? 'data-brief-section--light' : 'data-brief-section--cream'}`} aria-labelledby={`${chapter.id}-title`}>
            <div className="data-brief-section__container">
              <div className="data-brief-refresh-heading">
                <p className="ui-eyebrow">{String(index + 1).padStart(2, '0')}</p>
                <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
                <p>{chapter.body}</p>
              </div>
              {'media' in chapter && (
                <figure className="ui-media ui-media--contained independent-system-proof">
                  <Image src={chapter.media.src} alt={chapter.media.alt} width={chapter.media.width} height={chapter.media.height} sizes="(max-width: 900px) 100vw, 86rem" />
                  <figcaption>{chapter.media.caption}</figcaption>
                </figure>
              )}
            </div>
          </section>
        ))}
        <CaseStudyNext currentHref={pathname} accentColor="var(--accent)" locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
