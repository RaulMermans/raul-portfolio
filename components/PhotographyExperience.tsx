import Link from 'next/link'
import Header from '@/components/Header'
import BackLink from '@/components/BackLink'
import Footer from '@/components/Footer'
import { getPhotoDerivatives, type PhotographyPhoto } from '@/data/photography'
import { PHOTOGRAPHY_SERIES, type PhotographySeries } from '@/data/photography-series'
import { type Locale, localizePath } from '@/lib/i18n'
import styles from './PhotographyExperience.module.css'

function seriesHref(series: PhotographySeries, locale: Locale) {
  return localizePath(`/photography/${series.slug}`, locale)
}

function SeriesImage({ photo, alt, sizes, eager = false, seriesImage = false }: {
  photo: PhotographyPhoto
  alt: string
  sizes: string
  eager?: boolean
  seriesImage?: boolean
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={getPhotoDerivatives(photo, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={getPhotoDerivatives(photo, 'webp')} sizes={sizes} />
      <img
        src={photo.src}
        alt={alt}
        width={photo.width}
        height={photo.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
        data-series-image={seriesImage ? '' : undefined}
      />
    </picture>
  )
}

export function PhotographyIndex({ locale }: { locale: Locale }) {
  const isSpanish = locale === 'es'

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className={styles.page} data-photography-index>
        <header className={styles.indexIntro}>
          <p className={styles.eyebrow}>{isSpanish ? 'Archivo fotográfico / 001' : 'Photographic archive / 001'}</p>
          <h1>{isSpanish ? 'Fotografía, en series.' : 'Photography, in series.'}</h1>
          <p className={styles.introDeck}>{isSpanish
            ? 'Recorridos por lugares y momentos, editados como historias visuales. Abre una serie para verla completa.'
            : 'Places and moments edited into visual stories. Open a series to see every frame.'}</p>
          <span className={styles.indexCount}>{String(PHOTOGRAPHY_SERIES.length).padStart(2, '0')} {isSpanish ? 'series' : 'series'}</span>
        </header>

        <section className={styles.seriesSection} aria-labelledby="series-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>01 / {isSpanish ? 'Colección' : 'Collection'}</p>
            <h2 id="series-heading">{isSpanish ? 'Series seleccionadas' : 'Selected series'}</h2>
          </div>
          <div className={styles.seriesList} data-series-list>
            {PHOTOGRAPHY_SERIES.map((series, index) => {
              const cover = series.photos[0]
              return (
                <Link className={styles.seriesCard} href={seriesHref(series, locale)} key={series.slug}>
                  <div className={styles.cardMedia}>
                    <SeriesImage
                      photo={cover}
                      alt=""
                      sizes="(max-width: 767px) 100vw, (max-width: 1200px) 58vw, 54vw"
                      eager={index === 0}
                    />
                    <span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')} / {String(PHOTOGRAPHY_SERIES.length).padStart(2, '0')}</span>
                  </div>
                  <div className={styles.cardText}>
                    <p className={styles.eyebrow}>{isSpanish ? 'Serie fotográfica' : 'Photo series'} · {String(series.photos.length).padStart(2, '0')} {isSpanish ? 'imágenes' : 'images'}</p>
                    <h3>{series.title[locale]}</h3>
                    <p>{series.deck[locale]}</p>
                    <span className={styles.cardAction}>{isSpanish ? 'Abrir serie' : 'Open series'}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}

type PhotoFrame = { photo: PhotographyPhoto; number: number }
type PhotoSpread = { kind: 'pair' | 'single' | 'wide'; frames: PhotoFrame[] }

function makeSpreads(photos: PhotographyPhoto[]): PhotoSpread[] {
  const spreads: PhotoSpread[] = []
  for (let index = 1; index < photos.length;) {
    const current = photos[index]
    const next = photos[index + 1]
    if (current.width > current.height) {
      spreads.push({ kind: 'wide', frames: [{ photo: current, number: index + 1 }] })
      index += 1
    } else if (next && next.height > next.width) {
      spreads.push({ kind: 'pair', frames: [
        { photo: current, number: index + 1 },
        { photo: next, number: index + 2 },
      ] })
      index += 2
    } else {
      spreads.push({ kind: 'single', frames: [{ photo: current, number: index + 1 }] })
      index += 1
    }
  }
  return spreads
}

function EssayFrame({ frame, locale, eager, sizes }: {
  frame: PhotoFrame
  locale: Locale
  eager: boolean
  sizes: string
}) {
  return (
    <figure className={styles.photoFigure}>
      <div className={styles.photoMedia} style={{ aspectRatio: `${frame.photo.width} / ${frame.photo.height}` }}>
        <SeriesImage photo={frame.photo} alt={frame.photo.alt[locale]} sizes={sizes} eager={eager} seriesImage />
      </div>
    </figure>
  )
}

export function PhotographyEssay({ locale, series }: { locale: Locale; series: PhotographySeries }) {
  const isSpanish = locale === 'es'
  const currentIndex = PHOTOGRAPHY_SERIES.findIndex((item) => item.slug === series.slug)
  const next = PHOTOGRAPHY_SERIES[(currentIndex + 1) % PHOTOGRAPHY_SERIES.length]
  const cover = series.photos[0]
  const spreads = makeSpreads(series.photos)

  return (
    <>
      <main id="main-content" className={styles.page} data-photography-essay={series.slug}>
        <article>
          <div className={styles.essayOpening} data-cover-layout={series.coverLayout}>
            <header className={styles.essayIntro}>
              <BackLink href="/photography" locale={locale} label={isSpanish ? 'Todas las series' : 'All series'} />
              <div className={styles.essayTitleBlock}>
                <p className={styles.eyebrow}>{isSpanish ? 'Serie fotográfica' : 'Photo series'} / {String(currentIndex + 1).padStart(2, '0')}</p>
                <h1>{series.title[locale]}</h1>
                <p className={styles.essayDeck}>{series.deck[locale]}</p>
              </div>
              <p className={styles.essayByline}>Raúl Mermans <span aria-hidden="true">/</span> {String(series.photos.length).padStart(2, '0')} {isSpanish ? 'fotografías' : 'photographs'}</p>
            </header>
            <figure className={styles.coverFigure}>
              <SeriesImage photo={cover} alt={cover.alt[locale]} sizes={series.coverLayout === 'panorama' ? '100vw' : '(max-width: 767px) 100vw, 50vw'} eager seriesImage />
            </figure>
          </div>

          <section className={styles.essaySection} aria-labelledby="essay-sequence-title">
            <h2 id="essay-sequence-title" className={styles.visuallyHidden}>{isSpanish ? 'Secuencia' : 'Sequence'}</h2>
            <div className={styles.sequence}>
              {spreads.map((spread, index) => (
                <div className={styles.sequencePart} key={spread.frames[0].photo.src}>
                  <div className={styles.spread} data-spread={spread.kind}>
                    {spread.frames.map((frame) => (
                      <EssayFrame
                        key={frame.photo.src}
                        frame={frame}
                        locale={locale}
                        eager={index === 0}
                        sizes={spread.kind === 'pair' ? '(max-width: 767px) 100vw, 46vw' : '(max-width: 767px) 100vw, 86vw'}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <nav className={styles.essayEnd} aria-label={isSpanish ? 'Seguir explorando' : 'Continue exploring'}>
            <Link href={localizePath('/photography', locale)}>← {isSpanish ? 'Todas las series' : 'All series'}</Link>
            <Link className={styles.nextSeries} href={seriesHref(next, locale)}>
              <span className={styles.nextLabel}>{isSpanish ? 'Siguiente serie' : 'Next series'}</span>
              <span className={styles.nextTitle}>{next.title[locale]}</span>
              <span className={styles.nextImage}><SeriesImage photo={next.photos[0]} alt="" sizes="(max-width: 767px) 100vw, 38vw" /></span>
            </Link>
          </nav>
        </article>
      </main>
    </>
  )
}
