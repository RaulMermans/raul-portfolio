'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, A11y } from 'swiper/modules'
import Link from 'next/link'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { AppEntry } from '@/data/apps'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import '@/styles/apps-coverflow.css'

interface AppCoverflowCarouselProps {
  apps: AppEntry[]
}

export default function AppCoverflowCarousel({ apps }: AppCoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const placeholders = Math.max(0, 3 - apps.length)

  return (
    <div className="apps-coverflow-wrapper">
      <Swiper
        modules={[EffectCoverflow, Pagination, A11y]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        initialSlide={0}
        loop={apps.length + placeholders >= 3}
        coverflowEffect={{
          rotate: 4,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="apps-coverflow"
      >
        {apps.map((app, idx) => (
          <SwiperSlide key={app.slug}>
            <AppTileSlide app={app} isActive={activeIndex === idx} />
          </SwiperSlide>
        ))}

        {/* Placeholder slides */}
        {Array.from({ length: placeholders }).map((_, i) => (
          <SwiperSlide key={`placeholder-${i}`}>
            <div
              className="flex h-full flex-col items-center justify-center rounded-[24px] border border-dashed p-8 text-center"
              style={{ borderColor: 'var(--cream-dark)', background: 'var(--cream-light)' }}
            >
              <div
                className="flex h-[100px] w-[100px] items-center justify-center rounded-[24px] border border-dashed text-3xl"
                style={{ borderColor: 'var(--cream-dark)', color: 'var(--cream-darker)' }}
              >
                +
              </div>
              <p
                className="mt-6 text-2xl uppercase leading-[0.95]"
                style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif', color: 'var(--cream-dark)' }}
              >
                Coming soon
              </p>
              <p className="mt-2 text-[0.68rem] uppercase tracking-[0.22em]" style={{ color: 'var(--cream-darker)' }}>
                In development
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

/* ── Tile slide (light theme card) ── */

function AppTileSlide({ app, isActive }: { app: AppEntry; isActive: boolean }) {
  const glowStyle: CSSProperties = {
    backgroundImage: `radial-gradient(circle at center, ${app.theme.glow}, transparent 70%)`,
  }

  return (
    <Link
      href={app.href}
      className="group relative flex h-full flex-col items-center overflow-hidden rounded-[24px] border p-8 text-center transition-all duration-500"
      style={{
        '--tile-accent': app.theme.accent,
        background: 'var(--ink)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
      } as CSSProperties}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          ...glowStyle,
          opacity: isActive ? 0.7 : 0.3,
        }}
      />

      {/* Icon */}
      <div className="relative z-10 flex flex-1 items-center justify-center py-8">
        {app.icon ? (
          <Image
            src={app.icon}
            alt={`${app.name} icon`}
            width={160}
            height={160}
            className="h-auto w-[140px] object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="h-[120px] w-[120px] rounded-[28px] transition-transform duration-500 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${app.theme.accent}, ${app.theme.accentSoft})`,
              boxShadow: `0 16px 50px rgba(0,0,0,0.4), 0 0 80px ${app.theme.glow}`,
            }}
          />
        )}
      </div>

      {/* Text */}
      <div className="relative z-10 w-full">
        <h3
          className="text-3xl uppercase leading-[0.95] sm:text-4xl"
          style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif', color: 'var(--cream)' }}
        >
          {app.name}
        </h3>
        <p className="mt-2 text-[0.7rem] uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.42)' }}>
          {app.launchStage}
        </p>
        <p
          className="mx-auto mt-3 max-w-xs text-sm leading-6 transition-all duration-500"
          style={{
            color: 'rgba(255,255,255,0.5)',
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(6px)',
          }}
        >
          {app.tagline}
        </p>
      </div>
    </Link>
  )
}
