import Link from 'next/link'
import Image from 'next/image'
import { getCaseStudies } from '@/data/case-studies'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale, localizePath } from '@/lib/i18n'
import styles from './SelectedSystems.module.css'

const selectedSlugs = [
  'iris',
  'local-ai-coding-agent',
  'halo-control',
  'demandos',
  'opstwin',
  'searchsignal',
] as const

const previews = {
  iris: { src: '/images/case-studies/iris/overview.svg', width: 1200, height: 720, diagram: true },
  'local-ai-coding-agent': { src: '/images/case-studies/local-ai-coding-agent/overview.svg', width: 1200, height: 720, diagram: true },
  'halo-control': { src: '/images/case-studies/halo-control/proof/control-room.png', width: 1440, height: 940, diagram: false },
  demandos: { src: '/images/case-studies/demandos/05-inventory-risk.png', width: 1440, height: 900, diagram: false },
  opstwin: { src: '/images/case-studies/opstwin/proof/guided-result.png', width: 1168, height: 680, diagram: false },
  searchsignal: { src: '/images/case-studies/searchsignal/thumb.svg', width: 1200, height: 800, diagram: true },
} as const

export default function SelectedSystems({ locale = 'en' }: { locale?: Locale }) {
  const copy = getSiteCopy(locale).home.selectedSystems
  const studies = getCaseStudies(locale)
  const bySlug = new Map(studies.map((study) => [study.slug, study]))

  return (
    <section id="work" className={styles.section} data-home-section="work" aria-labelledby="selected-systems-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="selected-systems-title">{copy.title}</h2>
          <p className={styles.support}>{copy.support}</p>
        </header>
        <div className={styles.grid}>
          {selectedSlugs.map((slug, index) => {
            const study = bySlug.get(slug)
            if (!study) return null
            const detail = copy.projects[slug]
            const preview = previews[slug]

            return (
              <Link key={slug} href={study.href} className={styles.card} aria-label={`${copy.cta}: ${study.title}`}>
                <span className={styles.topline}>
                  <span>{String(index + 1).padStart(2, '0')} / 06</span>
                  <span>{detail.discipline}</span>
                </span>
                <span className={styles.name}>{study.title}</span>
                <span className={`${styles.preview}${preview.diagram ? ` ${styles.previewDiagram}` : ''}`} aria-hidden="true">
                  <Image src={preview.src} alt="" width={preview.width} height={preview.height} sizes="(max-width: 649px) 100vw, (max-width: 999px) 50vw, 33vw" loading="lazy" />
                </span>
                <span className={styles.description}>{detail.description}</span>
                <span className={styles.bottomline}>
                  <span>{detail.proof}</span>
                  <span>{copy.cta} ↗</span>
                </span>
              </Link>
            )
          })}
        </div>
        <Link className={styles.all} href={localizePath('/case-studies', locale)}>{copy.all} ↗</Link>
      </div>
    </section>
  )
}
