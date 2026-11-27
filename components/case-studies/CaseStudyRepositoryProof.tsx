import Image from 'next/image'
import type { Locale } from '@/lib/i18n'

type Props = {
  src: string
  width: number
  height: number
  alt: string
  caption: string
  source: string
  locale: Locale
}

/** A product screen published by the project's own repository, with its evidence boundary visible. */
export default function CaseStudyRepositoryProof({ src, width, height, alt, caption, source, locale }: Props) {
  return (
    <figure className="ui-media ui-media--contained case-study-repository-proof">
      <Image src={src} width={width} height={height} alt={alt} sizes="(max-width: 900px) 100vw, 86rem" loading="lazy" />
      <figcaption>
        <span>{caption}</span>{' '}
        <a href={source} target="_blank" rel="noreferrer">
          {locale === 'es' ? 'Captura del repositorio' : 'Repository screenshot'}
        </a>
      </figcaption>
    </figure>
  )
}
