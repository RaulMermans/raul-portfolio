import Link from 'next/link'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { AppEntry } from '@/data/apps'

interface AppGridTileProps {
  app: AppEntry
}

export default function AppGridTile({ app }: AppGridTileProps) {
  const glowStyle: CSSProperties = {
    backgroundImage: `radial-gradient(circle at center, ${app.theme.glow}, transparent 70%)`,
  }

  const hoverShadowColor = app.theme.accent

  return (
    <Link
      href={app.href}
      className="app-grid-tile group relative flex flex-col items-center overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-6 text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/[0.16]"
      style={
        {
          '--tile-accent': hoverShadowColor,
        } as CSSProperties
      }
    >
      {/* Glow layer */}
      <div
        className="app-grid-tile__glow pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-80"
        style={glowStyle}
      />

      {/* Icon / Visual zone */}
      <div className="relative z-10 flex aspect-square w-full max-w-[160px] items-center justify-center py-6">
        {app.icon ? (
          <Image
            src={app.icon}
            alt={`${app.name} icon`}
            width={120}
            height={120}
            className="h-auto w-[120px] object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="h-[100px] w-[100px] rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${app.theme.accent}, ${app.theme.accentSoft})`,
              boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 60px ${app.theme.glow}`,
            }}
          />
        )}
      </div>

      {/* Text zone */}
      <div className="relative z-10 mt-2 w-full">
        <h3
          className="min-h-[2lh] text-2xl uppercase leading-[0.95] text-[#f5f0eb]"
          style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
        >
          {app.name}
        </h3>
        <p className="mt-2 text-[0.68rem] uppercase tracking-[0.22em] text-white/[0.42]">
          {app.launchStage}
        </p>
      </div>
    </Link>
  )
}
