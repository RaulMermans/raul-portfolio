import type { CSSProperties } from 'react'
import Link from 'next/link'
import type { AppEntry } from '@/data/apps'
import AppVisual from './AppVisual'

interface AppCoverflowSlideProps {
  app: AppEntry
  isActive: boolean
}

export default function AppCoverflowSlide({ app, isActive }: AppCoverflowSlideProps) {
  const cardStyle: CSSProperties = {
    backgroundImage: `radial-gradient(circle at top left, ${app.theme.glow} 0%, transparent 38%), linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 50%)`,
  }

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0a0a] text-white"
      style={cardStyle}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
        <span className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1 text-[0.6rem] uppercase tracking-[0.26em] text-white/[0.52]">
          {app.status}
        </span>
        <span className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1 text-[0.6rem] uppercase tracking-[0.26em]" style={{ color: app.theme.accent }}>
          {app.launchStage}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-2 pt-5 sm:px-8">
        <h3
          className="text-[clamp(2.8rem,6vw,4.2rem)] uppercase leading-[0.9]"
          style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
        >
          {app.name}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-white/[0.62]">
          {app.tagline}
        </p>

        {/* Metrics row — visible on active slide */}
        <div
          className="mt-5 grid grid-cols-3 gap-2 transition-all duration-500"
          style={{ opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(8px)' }}
        >
          {app.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[16px] border border-white/10 bg-white/[0.03] px-3 py-3"
            >
              <p className="text-[0.56rem] uppercase tracking-[0.22em] text-white/[0.38]">{metric.label}</p>
              <p className="mt-1 text-xs font-medium text-white/75">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product visual */}
      <div className="px-4 sm:px-6">
        <AppVisual app={app} compact />
      </div>

      {/* CTA */}
      <div className="flex gap-3 px-6 py-5 sm:px-8 sm:py-6">
        <Link
          href={app.href}
          className="inline-flex items-center rounded-full bg-[#f5f0eb] px-5 py-2.5 text-sm font-medium text-[#171411] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
          Explore {app.name}
        </Link>
        {app.ctas.secondary ? (
          <Link
            href={app.ctas.secondary.href}
            className="inline-flex items-center rounded-full border border-white/[0.14] bg-white/[0.04] px-5 py-2.5 text-sm text-white/70 transition duration-300 hover:border-white/[0.22] hover:text-white/90"
          >
            {app.ctas.secondary.label}
          </Link>
        ) : null}
      </div>
    </div>
  )
}
