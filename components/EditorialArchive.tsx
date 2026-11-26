'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCaseStudies } from '@/data/case-studies'
import { PHOTOGRAPHY_IMAGES } from '@/data/photography'
import { PUBLIC_CONTACT_MAILTO } from '@/lib/contact'
import { type Locale, localizePath } from '@/lib/i18n'
import styles from './EditorialArchive.module.css'

const openingPhoto = PHOTOGRAPHY_IMAGES.landscape[17]
const photoSeriesImage = PHOTOGRAPHY_IMAGES.landscape[13]
const featuredSlugs = ['relay', 'searchsignal', 'opstwin', 'remoria'] as const

const copy = {
  en: {
    eyebrow: 'Raúl Mermans / selected work',
    lineOne: 'THINGS I',
    lineTwo: 'BUILD.',
    lineThree: 'Things I see.',
    summary: 'I build software and AI systems. My photographs unfold in series, from Morocco to the waterline.',
    explore: 'Scroll through the projects',
    indexAction: 'Browse the project index',
    project: 'Project',
    view: 'Explore the project',
    irisBody: 'A personal environment for coordinating specialist agents, memory, and recovery.',
    irisProof: 'Public architecture study',
    demandBody: 'A forecasting prototype that makes inventory risk inspectable with synthetic data.',
    demandProof: 'Public MVP / synthetic data',
    photoTitle: 'Things I see.',
    photoBody: 'Personal photographs arranged in visual series, each with its own rhythm and point of view.',
    photoLink: 'Explore the series',
    haloBody: 'A local AI control room for model routing, agent coordination, and activity history.',
    haloProof: 'Public architecture / simulated state',
    archive: 'An ongoing archive.',
    archiveBody: 'Choose a project or continue into the full collection.',
    work: 'Selected work',
    photography: 'Photography',
    caseStudy: 'Case study',
    allProjects: 'All case studies',
    contact: 'Get in touch',
    next: 'Next project',
  },
  es: {
    eyebrow: 'Raúl Mermans / trabajos seleccionados',
    lineOne: 'COSAS QUE',
    lineTwo: 'CONSTRUYO.',
    lineThree: 'Cosas que veo.',
    summary: 'Construyo software y sistemas de IA. Mis fotografías se despliegan en series, de Marruecos a la costa.',
    explore: 'Desplázate por los proyectos',
    indexAction: 'Ver índice de proyectos',
    project: 'Proyecto',
    view: 'Explorar el proyecto',
    irisBody: 'Un entorno personal que coordina agentes especializados, memoria y recuperación.',
    irisProof: 'Estudio público de arquitectura',
    demandBody: 'Un prototipo de previsión que muestra el riesgo de inventario con datos sintéticos.',
    demandProof: 'MVP público / datos sintéticos',
    photoTitle: 'Cosas que veo.',
    photoBody: 'Fotografías personales reunidas en series visuales, cada una con su propio ritmo y mirada.',
    photoLink: 'Explorar las series',
    haloBody: 'Una sala de control de IA local para enrutar modelos, coordinar agentes y consultar la actividad.',
    haloProof: 'Arquitectura pública / estado simulado',
    archive: 'Un archivo abierto.',
    archiveBody: 'Elige un proyecto o continúa hacia la colección completa.',
    work: 'Trabajo seleccionado',
    photography: 'Fotografía',
    caseStudy: 'Caso de estudio',
    allProjects: 'Todos los casos de estudio',
    contact: 'Contactar',
    next: 'Siguiente proyecto',
  },
} as const

type Chapter = {
  id: string
  title: string
  category: string
  body: string
  image: string
  imageAlt: string
  href: string
  action: string
  contain?: boolean
}

export default function EditorialArchive({ locale }: { locale: Locale }) {
  const c = copy[locale]
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const studies = getCaseStudies(locale)
  const featured = featuredSlugs.map((slug) => {
    const study = studies.find((item) => item.slug === slug)
    if (!study) throw new Error(`Missing homepage project: ${slug}`)
    return study
  })
  const chapters: Chapter[] = [
    {
      id: 'iris', title: 'IRIS OS', category: c.irisProof, body: c.irisBody,
      image: '/images/case-studies/iris/architecture.png',
      imageAlt: locale === 'es' ? 'Diagrama de la arquitectura pública de agentes de IRIS' : 'Diagram of the public IRIS agent architecture',
      href: localizePath('/case-studies/iris', locale), action: c.view, contain: true,
    },
    {
      id: 'demandos', title: 'DemandOS', category: c.demandProof, body: c.demandBody,
      image: '/images/case-studies/demandos/05-inventory-risk.png',
      imageAlt: locale === 'es' ? 'Pantalla de riesgo de inventario de DemandOS' : 'DemandOS inventory risk screen',
      href: localizePath('/case-studies/demandos', locale), action: c.view, contain: true,
    },
    ...featured.map((study) => ({
      id: study.slug, title: study.title, category: study.subtitle ?? c.project,
      body: study.description, image: study.image,
      imageAlt: `${study.title}: ${study.subtitle ?? study.description}`,
      href: study.href, action: c.view,
    })),
    {
      id: 'photography', title: c.photoTitle, category: c.photography, body: c.photoBody,
      image: photoSeriesImage.src, imageAlt: photoSeriesImage.alt[locale],
      href: localizePath('/photography', locale), action: c.photoLink,
    },
    {
      id: 'halo', title: 'HALO Control', category: c.haloProof, body: c.haloBody,
      image: '/images/case-studies/halo-control/proof/control-room.png',
      imageAlt: locale === 'es' ? 'Sala de control de IA local de HALO' : 'HALO local AI control room',
      href: localizePath('/case-studies/halo-control', locale), action: c.view, contain: true,
    },
  ]

  const sceneCount = chapters.length + 2
  const currentChapter = active > 0 && active <= chapters.length ? chapters[active - 1] : null

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = track.getBoundingClientRect()
      const travel = Math.max(1, rect.height - window.innerHeight)
      const progress = Math.max(0, Math.min(1, -rect.top / travel))
      const position = progress * (sceneCount - 1)
      const next = Math.min(sceneCount - 1, Math.round(position))
      setActive((previous) => previous === next ? previous : next)
      stage.style.setProperty('--archive-progress', String(progress))
      stage.style.setProperty('--image-pan', `${Math.max(-1, Math.min(1, position - next)) * -24}px`)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [sceneCount])

  return (
    <section ref={trackRef} className={styles.archive} id="work" aria-label={c.work}>
      {chapters.map((chapter, index) => <span key={chapter.id} id={`project-${chapter.id}`} className={styles.marker} style={{ top: `${(index + 1) * 100}svh` }} tabIndex={-1} aria-hidden="true" />)}
      <span id="archive-index" className={styles.marker} style={{ top: `${(sceneCount - 1) * 100}svh` }} tabIndex={-1} aria-hidden="true" />
      <span id="contact" className={styles.marker} style={{ top: `${(sceneCount - 1) * 100}svh` }} tabIndex={-1} aria-hidden="true" />
      <div ref={stageRef} className={styles.stage} data-tone={currentChapter && (active === 1 || active === 4 || active === 7) ? 'dark' : 'paper'}>
        {active === 0 && <div className={styles.opening} data-scene="opening">
          <div className={styles.openingText}>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h1><span>{c.lineOne}</span><strong>{c.lineTwo}</strong><em>{c.lineThree}</em></h1>
            <p className={styles.openingSummary}>{c.summary}</p>
            <div className={styles.openingActions}>
              <a href="#project-iris">{c.explore} ↓</a>
              <a href="#archive-index">{c.indexAction}</a>
            </div>
          </div>
          <figure className={styles.openingMedia}>
            <Image src={openingPhoto.src} alt={openingPhoto.alt[locale]} fill priority sizes="(max-width: 767px) 100vw, 52vw" />
            <figcaption>RM / 001 — {c.photography}</figcaption>
          </figure>
        </div>}

        {currentChapter && <div key={currentChapter.id} className={styles.chapter} data-scene={currentChapter.id} data-layout={active % 2 === 0 ? 'image-first' : 'text-first'}>
          <div className={styles.chapterText}>
            <div className={styles.chapterKicker}><span>{String(active).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}</span><span>{currentChapter.category}</span></div>
            <div className={styles.chapterBody}>
              <p className={styles.eyebrow}>{currentChapter.id === 'photography' ? c.photography : c.project}</p>
              <h2>{currentChapter.title}</h2>
              <p>{currentChapter.body}</p>
              <Link href={currentChapter.href}>{currentChapter.action}</Link>
            </div>
            <a className={styles.nextLink} href={active === chapters.length ? '#archive-index' : `#project-${chapters[active].id}`}>
              {c.next} <span aria-hidden="true">↓</span>
            </a>
          </div>
          <figure className={styles.chapterMedia} data-fit={currentChapter.contain ? 'contain' : 'cover'}>
            <Image src={currentChapter.image} alt={currentChapter.imageAlt} fill sizes="(max-width: 767px) 100vw, 54vw" loading="eager" />
            <figcaption>{String(active).padStart(2, '0')} / {currentChapter.category}</figcaption>
          </figure>
        </div>}

        {active === sceneCount - 1 && <div className={styles.index} data-scene="index">
          <div className={styles.indexIntro}><p className={styles.eyebrow}>09 / {c.work}</p><h2>{c.archive}</h2><p>{c.archiveBody}</p></div>
          <nav aria-label={c.work}>
            {chapters.map((chapter, index) => <Link key={chapter.id} href={chapter.href}><span>{String(index + 1).padStart(2, '0')}</span><strong>{chapter.title}</strong></Link>)}
          </nav>
          <div className={styles.indexActions}><Link href={localizePath('/case-studies', locale)}>{c.allProjects}</Link><a href={PUBLIC_CONTACT_MAILTO}>{c.contact}</a></div>
        </div>}
        <div className={styles.progress} aria-hidden="true"><span>RM / {c.work}</span><div><i /></div><span>{String(active).padStart(2, '0')} / {String(sceneCount - 1).padStart(2, '0')}</span></div>
      </div>
    </section>
  )
}
