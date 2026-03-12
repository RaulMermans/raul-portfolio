import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { AppEntry } from '@/data/apps'
import AppVisual from './AppVisual'

interface AppCardProps {
  app: AppEntry
  label?: string
  showVisual?: boolean
}

export default function AppCard({
  app,
  label = 'Select app',
  showVisual = true,
}: AppCardProps) {
  const hoverGlow: CSSProperties = {
    backgroundImage: `radial-gradient(circle at top right, ${app.theme.glow} 0%, transparent 46%)`,
  }

  return (
    <Link
      href={app.href}
      className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6 text-white transition duration-500 ease-out hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.05] hover:shadow-[0_26px_90px_rgba(0,0,0,0.22)] sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={hoverGlow} />

      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/[0.52]">
            {label}
          </span>
          <span className="text-lg text-white/[0.34] transition duration-300 group-hover:translate-x-1 group-hover:text-white/[0.62]">
            →
          </span>
        </div>

        <div className="space-y-3">
          <h3
            className="text-4xl uppercase leading-[0.92] text-[#f5f0eb]"
            style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
          >
            {app.name}
          </h3>
          <p className="max-w-xl text-sm uppercase tracking-[0.24em] text-white/[0.46]">
            {app.launchStage}
          </p>
          <p className="max-w-xl text-base leading-7 text-white/[0.72]">{app.cardDescription}</p>
        </div>

        {showVisual ? (
          <div className="mt-8">
            <AppVisual app={app} compact />
          </div>
        ) : null}
      </div>
    </Link>
  )
}
