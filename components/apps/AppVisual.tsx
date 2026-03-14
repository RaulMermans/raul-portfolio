import type { CSSProperties } from 'react'
import type { AppEntry } from '@/data/apps'

interface AppVisualProps {
  app: AppEntry
  compact?: boolean
}

export default function AppVisual({ app, compact = false }: AppVisualProps) {
  const wrapperStyle: CSSProperties = {
    backgroundImage: `radial-gradient(circle at top right, ${app.theme.glow} 0%, transparent 42%), linear-gradient(160deg, ${app.theme.background} 0%, #090909 72%, #040404 100%)`,
  }

  const panelStyle: CSSProperties = {
    backgroundColor: app.theme.surface,
    borderColor: app.theme.accentSoft,
  }

  const primaryPanelStyle: CSSProperties = {
    backgroundImage: `radial-gradient(circle at top right, ${app.theme.glow} 0%, transparent 46%), linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)`,
    borderColor: app.theme.accentSoft,
  }

  return (
    <div
      className={`relative isolate overflow-hidden rounded-[32px] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.28)] ${
        compact ? 'p-3 sm:p-4' : 'p-4 sm:p-6'
      }`}
      style={wrapperStyle}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 45%, rgba(255, 255, 255, 0.02) 100%)',
        }}
      />
      <div className="relative mx-auto max-w-[660px] rounded-[28px] border border-white/10 bg-black/30 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-4">
        <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-[0.64rem] uppercase tracking-[0.28em] text-white/50">
          <span>{app.name}</span>
          <span>{app.launchStage}</span>
        </div>

        <div className={`grid gap-3 pt-3 ${compact ? 'sm:grid-cols-[1.06fr,0.94fr]' : 'md:grid-cols-[1.08fr,0.92fr] md:gap-4 md:pt-4'}`}>
          <article
            className={`flex h-full flex-col justify-between rounded-[24px] border p-5 text-white ${
              compact ? 'min-h-[200px]' : 'min-h-[280px]'
            }`}
            style={primaryPanelStyle}
          >
            <div className="space-y-3">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/[0.48]">
                {app.gallery[0]?.eyebrow}
              </p>
              <h3 className={`${compact ? 'text-xl' : 'text-[1.75rem]'} font-medium leading-[1.05]`}>
                {app.gallery[0]?.title}
              </h3>
              <p className="max-w-sm text-sm leading-6 text-white/70">
                {app.gallery[0]?.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6">
              {app.gallery[0]?.stats.map((stat) => (
                <span
                  key={stat}
                  className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-white/[0.56]"
                >
                  {stat}
                </span>
              ))}
            </div>
          </article>

          <div className="grid gap-3">
            {app.gallery.slice(1).map((item) => (
              <article
                key={item.title}
                className="flex min-h-[132px] flex-col justify-between rounded-[22px] border p-4 text-white"
                style={panelStyle}
              >
                <div className="space-y-2">
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-white/[0.45]">{item.eyebrow}</p>
                  <h4 className="text-base font-medium leading-tight">{item.title}</h4>
                  <p className="text-sm leading-6 text-white/[0.65]">{item.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {item.stats.map((stat) => (
                    <span
                      key={stat}
                      className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-white/[0.48]"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {!compact ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {app.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-4"
              >
                <p className="text-[0.62rem] uppercase tracking-[0.22em] text-white/[0.42]">{metric.label}</p>
                <p className="mt-2 text-sm font-medium text-white/[0.82]">{metric.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
