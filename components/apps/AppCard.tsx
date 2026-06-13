import Link from 'next/link'
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
  return (
    <Link
      href={app.href}
      className="group relative overflow-hidden rounded-[32px] p-6 transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_26px_90px_rgba(0,0,0,0.08)] sm:p-8"
      style={{ border: '1px solid var(--cream-dark)', background: 'var(--cream-warm)' }}
    >
      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-4">
          <span
            className="rounded-full px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em]"
            style={{ border: '1px solid var(--cream-dark)', color: 'rgba(26, 23, 20, 0.45)' }}
          >
            {label}
          </span>
          <span className="text-lg transition duration-300 group-hover:translate-x-1" style={{ color: 'rgba(26, 23, 20, 0.3)' }}>
            →
          </span>
        </div>

        <div className="space-y-3">
          <h3
            className="min-h-[2lh] text-4xl uppercase leading-[0.92]"
            style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif', color: 'var(--ink)' }}
          >
            {app.name}
          </h3>
          <p className="max-w-xl text-sm uppercase tracking-[0.24em]" style={{ color: 'rgba(26, 23, 20, 0.4)' }}>
            {app.launchStage}
          </p>
          <p className="max-w-xl text-base leading-7" style={{ color: 'rgba(26, 23, 20, 0.65)' }}>{app.cardDescription}</p>
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
