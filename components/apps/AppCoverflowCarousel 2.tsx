'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, A11y } from 'swiper/modules'
import type { AppEntry } from '@/data/apps'
import AppCoverflowSlide from './AppCoverflowSlide'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import '@/styles/apps-coverflow.css'

interface AppCoverflowCarouselProps {
  apps: AppEntry[]
}

export default function AppCoverflowCarousel({ apps }: AppCoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasEnoughForLoop = apps.length >= 3

  return (
    <div className="apps-coverflow-wrapper">
      <Swiper
        modules={[EffectCoverflow, Pagination, A11y]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        initialSlide={0}
        loop={hasEnoughForLoop}
        coverflowEffect={{
          rotate: 6,
          stretch: 0,
          depth: 220,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="apps-coverflow"
      >
        {apps.map((app, idx) => (
          <SwiperSlide key={app.slug}>
            <AppCoverflowSlide app={app} isActive={activeIndex === idx} />
          </SwiperSlide>
        ))}

        {/* Placeholder slide when fewer than 3 apps */}
        {apps.length < 3 ? (
          <SwiperSlide>
            <div className="flex h-full flex-col items-center justify-center rounded-[32px] border border-dashed border-white/[0.14] bg-white/[0.02] px-8 py-16 text-center text-white">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/[0.38]">Coming soon</p>
              <h3
                className="mt-4 max-w-sm text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.94]"
                style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
              >
                More products in development.
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/[0.52]">
                Future apps will drop into this carousel as they reach launch readiness.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center rounded-full border border-white/[0.14] bg-white/[0.05] px-5 py-2.5 text-sm text-white/70 transition duration-300 hover:border-white/[0.22] hover:text-white/90"
              >
                Discuss a product
              </Link>
            </div>
          </SwiperSlide>
        ) : null}
      </Swiper>
    </div>
  )
}
