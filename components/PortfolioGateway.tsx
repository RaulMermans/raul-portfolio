'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { PointerEvent } from 'react'
import { type Locale, localizePath } from '@/lib/i18n'
import styles from './PortfolioGateway.module.css'

const copy = {
  es: { selection: 'Explorar el portfolio', technical: 'Técnico', creative: 'Creativo', about: 'Sobre mí' },
  en: { selection: 'Explore the portfolio', technical: 'Technical', creative: 'Creative', about: 'About me' },
} as const

function moveCard(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType !== 'mouse') return
  const card = event.currentTarget
  const bounds = card.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width - 0.5
  const y = (event.clientY - bounds.top) / bounds.height - 0.5
  card.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`)
  card.style.setProperty('--tilt-y', `${(x * 4).toFixed(2)}deg`)
  card.style.setProperty('--image-x', `${(-x * 12).toFixed(1)}px`)
  card.style.setProperty('--image-y', `${(-y * 12).toFixed(1)}px`)
}

function resetCard(event: PointerEvent<HTMLAnchorElement>) {
  const card = event.currentTarget
  for (const property of ['--tilt-x', '--tilt-y', '--image-x', '--image-y']) card.style.removeProperty(property)
}

export default function PortfolioGateway({ locale }: { locale: Locale }) {
  const c = copy[locale]

  return (
    <div className={styles.gateway}>
      <h1 className={styles.name}>Raúl Mermans</h1>

      <section id="work" className={styles.selection} aria-label={c.selection} aria-describedby="gateway-scroll-hint">
        <Link className={`${styles.choiceCard} ${styles.technical}`} href={localizePath('/technical', locale)} onPointerMove={moveCard} onPointerLeave={resetCard}>
          <h2>{c.technical}</h2>
        </Link>
        <Link className={`${styles.choiceCard} ${styles.creative}`} href={localizePath('/creative', locale)} onPointerMove={moveCard} onPointerLeave={resetCard}>
          <h2>{c.creative}</h2>
        </Link>
        <Link className={`${styles.choiceCard} ${styles.about}`} href={localizePath('/about', locale)} onPointerMove={moveCard} onPointerLeave={resetCard}>
          <span className={styles.aboutImage}><Image src="/images/about/profile.webp" alt="" fill sizes="(max-width: 767px) 78vw, (max-width: 1023px) 70vw, 30vw" priority /></span>
          <h2>{c.about}</h2>
        </Link>
      </section>
      <p id="gateway-scroll-hint" className={styles.scrollHint}>{locale === 'es' ? 'Desliza para explorar' : 'Swipe to explore'} <span aria-hidden="true">↔</span></p>
    </div>
  )
}
