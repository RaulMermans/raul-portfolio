import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PortfolioIntro from '@/components/PortfolioIntro'
import { getCaseStudies } from '@/data/case-studies'
import { PHOTOGRAPHY_SERIES } from '@/data/photography-series'
import { CASE_STUDY_CATEGORIES, PROJECT_EXPERIENCE } from '@/data/portfolio-experience'
import { type Locale, localizePath } from '@/lib/i18n'
import styles from './PortfolioTracks.module.css'

const technicalCopy = {
  es: {
    title: 'Trabajo técnico',
    featured: 'Tres puntos de entrada', collection: 'El archivo técnico',
    featuredDeck: 'Priorizar compromisos, comparar cambios operativos y leer datos de campaña. En cada caso, la decisión define qué se construye y cómo se comprueba.',
    collectionDeck: 'Todos los sistemas, productos y experimentos técnicos reunidos por tipo de trabajo.',
    view: 'Abrir caso', other: 'Ver el portfolio creativo', back: 'Elegir otro recorrido',
    status: 'Estado', proof: 'Evidencia',
  },
  en: {
    title: 'Technical work',
    featured: 'Three ways in', collection: 'The technical archive',
    featuredDeck: 'Prioritising commitments, comparing operational changes, and reading campaign data. In each case, the decision shapes what gets built and how it is checked.',
    collectionDeck: 'Every technical system, product, and experiment, organised by kind of work.',
    view: 'Open case study', other: 'See the creative portfolio', back: 'Choose another route',
    status: 'Status', proof: 'Evidence',
  },
} as const

const featuredDecisions: Record<Locale, Record<string, string>> = {
  es: {
    iris: 'Priorizar compromisos y decidir qué trabajo puede delegarse.',
    opstwin: 'Comparar cambios de plantilla y flujo antes de un piloto real.',
    relay: 'Separar ingresos, atribución y calidad de datos antes de interpretar resultados.',
  },
  en: {
    iris: 'Prioritise commitments and decide which work can be delegated.',
    opstwin: 'Compare staffing and workflow changes before a live pilot.',
    relay: 'Separate revenue, attribution, and data quality before interpreting results.',
  },
}

const creativeCopy = {
  es: {
    title: 'Trabajo creativo',
    photography: 'Fotografía en series', photoDeck: 'Una colección se abre como un relato visual completo.',
    openSeries: 'Abrir serie', visual: 'Estudios visuales', visualDeck: 'Portadas, carteles y exploraciones de imagen y tipografía.',
    viewVisual: 'Explorar el archivo visual', brand: 'Identidades e ideas', brandDeck: 'Proyectos creativos explicados desde la idea hasta el sistema.',
    viewCase: 'Ver caso', other: 'Ver el portfolio técnico', back: 'Elegir otro recorrido',
  },
  en: {
    title: 'Creative work',
    photography: 'Photography in series', photoDeck: 'Each collection opens as a complete visual story.',
    openSeries: 'Open series', visual: 'Visual studies', visualDeck: 'Covers, posters, and explorations in image and type.',
    viewVisual: 'Explore the visual archive', brand: 'Identities and ideas', brandDeck: 'Creative projects followed from the first idea into a working system.',
    viewCase: 'View case study', other: 'See the technical portfolio', back: 'Choose another route',
  },
} as const

export function TechnicalPortfolio({ locale }: { locale: Locale }) {
  const c = technicalCopy[locale]
  const allStudies = getCaseStudies(locale)
  const technicalSlugs = new Set(PROJECT_EXPERIENCE.filter((project) => project.caseStudyCategory !== 'creative-work').map((project) => project.slug))
  const studies = allStudies.filter((study) => technicalSlugs.has(study.slug))
  const featured = ['iris', 'opstwin', 'relay'].map((slug) => studies.find((study) => study.slug === slug)).filter((study): study is (typeof studies)[number] => Boolean(study))
  const categories = CASE_STUDY_CATEGORIES.filter((category) => category.id !== 'creative-work')
  const categoryBySlug = new Map(PROJECT_EXPERIENCE.map((project) => [project.slug, project.caseStudyCategory]))

  return <>
    <Header locale={locale} />
    <main id="main-content" className={styles.technical} data-portfolio-track="technical">
      <PortfolioIntro title={c.title} />
      <section className={styles.techFeatured} aria-labelledby="technical-featured">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>01 / {c.featured}</p><h2 id="technical-featured">{c.featured}</h2><p>{c.featuredDeck}</p></div>
        <div className={styles.featuredGrid} tabIndex={0} aria-label={c.featured} aria-describedby="technical-scroll-hint">{featured.map((study, index) => <Link className={styles.featuredCard} href={study.href} key={study.slug}>
          <div className={styles.featuredImage}><Image src={study.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" /></div>
          <div className={styles.featuredText}><span className={styles.eyebrow}>0{index + 1} / {study.category}</span><h3>{study.title}</h3><p className={styles.featuredDecision}>{featuredDecisions[locale][study.slug]}</p><p className={styles.featuredDescription}>{study.description}</p><span>{c.view}</span></div>
        </Link>)}</div>
        <p id="technical-scroll-hint" className={styles.railHint}>{locale === 'es' ? 'Desliza para ver los casos' : 'Swipe through the case studies'} <span aria-hidden="true">↔</span></p>
      </section>
      <section id="technical-work" className={styles.techArchive} aria-labelledby="technical-archive-title">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>02 / {c.collection}</p><h2 id="technical-archive-title">{c.collection}</h2><p>{c.collectionDeck}</p></div>
        {categories.map((category) => {
          const group = studies.filter((study) => categoryBySlug.get(study.slug) === category.id)
          if (!group.length) return null
          return <div className={styles.techGroup} key={category.id}><div className={styles.groupHeading}><h3>{category.label[locale]}</h3><span>{String(group.length).padStart(2, '0')}</span></div><div className={styles.techList} tabIndex={0} aria-label={category.label[locale]}>
            {group.map((study) => <Link href={study.href} className={styles.techRow} key={study.slug}>
              <div className={styles.rowImage}><Image src={study.image} alt="" fill sizes="(max-width: 767px) 28vw, 11vw" /></div>
              <div className={styles.rowCopy}><h4>{study.title}</h4><p>{study.description}</p><div><span>{c.status}: {study.status ?? '—'}</span>{study.proofTags?.[0] && <span>{c.proof}: {study.proofTags[0]}</span>}</div></div>
            </Link>)}
          </div></div>
        })}
      </section>
      <nav className={styles.trackExit} aria-label={locale === 'es' ? 'Otros recorridos' : 'Other routes'}><Link href={localizePath('/creative', locale)}>{c.other}</Link><Link href={localizePath('/', locale)}>{c.back}</Link></nav>
    </main>
    <Footer locale={locale} />
  </>
}

export function CreativePortfolio({ locale }: { locale: Locale }) {
  const c = creativeCopy[locale]
  const creativeSlugs = new Set(PROJECT_EXPERIENCE.filter((project) => project.caseStudyCategory === 'creative-work').map((project) => project.slug))
  const studies = getCaseStudies(locale).filter((study) => creativeSlugs.has(study.slug))
  return <>
    <Header locale={locale} />
    <main id="main-content" className={styles.creative} data-portfolio-track="creative">
      <PortfolioIntro title={c.title} />
      <section id="creative-series" className={styles.seriesSection} aria-labelledby="creative-series-title"><div className={styles.magazineHeading}><p className={styles.eyebrow}>01 / {c.photography}</p><h2 id="creative-series-title">{c.photography}</h2><p>{c.photoDeck}</p></div><div className={styles.seriesGrid} tabIndex={0} aria-label={c.photography} aria-describedby="creative-scroll-hint">
        {PHOTOGRAPHY_SERIES.map((series, index) => <Link href={localizePath(`/photography/${series.slug}`, locale)} className={styles.seriesCard} key={series.slug}>
          <div className={styles.seriesImage}><Image src={series.photos[0].src} alt="" fill sizes="(max-width: 767px) 100vw, 40vw" /></div><div className={styles.seriesCaption}><span className={styles.eyebrow}>0{index + 1} / {String(series.photos.length).padStart(2, '0')} {locale === 'es' ? 'imágenes' : 'images'}</span><h3>{series.title[locale]}</h3><p>{series.deck[locale]}</p><span>{c.openSeries}</span></div>
        </Link>)}
      </div><p id="creative-scroll-hint" className={styles.railHint}>{locale === 'es' ? 'Desliza para ver las series' : 'Swipe through the series'} <span aria-hidden="true">↔</span></p></section>
      <section id="creative-visuals" className={styles.visualSection} aria-labelledby="creative-visuals-title"><div className={styles.visualImage}><Image src="/images/visuals/album-covers/Astralis_Cover.webp" alt={locale === 'es' ? 'Portada Astralis en rojo y negro' : 'Astralis cover in red and black'} width={3000} height={3000} sizes="(max-width: 900px) 100vw, 50vw" /></div><div className={styles.visualText}><p className={styles.eyebrow}>02 / {c.visual}</p><h2 id="creative-visuals-title">{c.visual}</h2><p>{c.visualDeck}</p><Link href={localizePath('/visuals', locale)}>{c.viewVisual}</Link></div></section>
      <section id="creative-identities" className={styles.identitySection} aria-labelledby="creative-identities-title"><div className={styles.magazineHeading}><p className={styles.eyebrow}>03 / {c.brand}</p><h2 id="creative-identities-title">{c.brand}</h2><p>{c.brandDeck}</p></div><div className={styles.identityGrid} tabIndex={0} aria-label={c.brand}>{studies.map((study) => <Link href={study.href} key={study.slug} className={styles.identityCard}><div className={styles.identityImage}><Image src={study.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" /></div><div><span className={styles.eyebrow}>{study.category}</span><h3>{study.title}</h3><p>{study.description}</p><span>{c.viewCase}</span></div></Link>)}</div></section>
      <nav className={styles.trackExit} aria-label={locale === 'es' ? 'Otros recorridos' : 'Other routes'}><Link href={localizePath('/technical', locale)}>{c.other}</Link><Link href={localizePath('/', locale)}>{c.back}</Link></nav>
    </main>
    <Footer locale={locale} />
  </>
}
