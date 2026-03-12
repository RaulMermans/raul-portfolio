import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppCard from '@/components/apps/AppCard'
import AppVisual from '@/components/apps/AppVisual'
import { apps, getAppBySlug } from '@/data/apps'

interface AppPageProps {
  params: {
    slug: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  // Overflow has a dedicated route at /apps/overflow
  return apps.filter((app) => app.slug !== 'overflow').map((app) => ({
    slug: app.slug,
  }))
}

export function generateMetadata({ params }: AppPageProps): Metadata {
  const app = getAppBySlug(params.slug)

  if (!app) {
    return {
      title: 'App not found | Raul M.',
    }
  }

  return {
    title: `${app.name} | Apps | Raul M.`,
    description: app.shortDescription,
  }
}

/* Shared muted color for labels */
const muted = 'rgba(26, 23, 20, 0.45)'
const bodyColor = 'rgba(26, 23, 20, 0.65)'
const displayFont = 'var(--font-display), "Bebas Neue", Impact, sans-serif'

export default function AppDetailPage({ params }: AppPageProps) {
  const app = getAppBySlug(params.slug)

  if (!app) {
    notFound()
  }

  const relatedApps = apps.filter((entry) => entry.slug !== app.slug)

  return (
    <>
      <Header />
      <main style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ borderBottom: '1px solid var(--cream-dark)' }}>
          <div className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-32 md:px-10 lg:pb-28 lg:pt-40">
            <Link
              href="/apps"
              className="mb-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] transition duration-300 hover:opacity-70"
              style={{ color: muted }}
            >
              <span>Apps</span>
              <span>/</span>
              <span>{app.name}</span>
            </Link>

            <div className="grid gap-12 lg:grid-cols-[0.84fr,1.16fr] lg:items-end">
              <div className="max-w-2xl">
                <div className="mb-6 flex flex-wrap gap-3">
                  <span
                    className="rounded-full px-4 py-2 text-[0.64rem] uppercase tracking-[0.26em]"
                    style={{ border: '1px solid var(--cream-dark)', background: 'var(--cream-light)', color: muted }}
                  >
                    {app.status}
                  </span>
                  <span
                    className="rounded-full px-4 py-2 text-[0.64rem] uppercase tracking-[0.26em]"
                    style={{ border: '1px solid var(--cream-dark)', color: muted }}
                  >
                    {app.launchStage}
                  </span>
                </div>

                <h1
                  className="text-[clamp(4rem,9vw,7.6rem)] uppercase leading-[0.88]"
                  style={{ fontFamily: displayFont, color: 'var(--ink)' }}
                >
                  {app.name}
                </h1>

                <p className="mt-6 max-w-xl text-[1.15rem] leading-8" style={{ color: 'var(--ink)', opacity: 0.78 }}>{app.heroStatement}</p>
                <p className="mt-6 max-w-xl text-base leading-7" style={{ color: bodyColor }}>{app.shortDescription}</p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href={app.ctas.primary.href}
                    className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
                    style={{ background: 'var(--ink)', color: 'var(--cream)' }}
                  >
                    {app.ctas.primary.label}
                  </Link>
                  {app.ctas.secondary ? (
                    <Link
                      href={app.ctas.secondary.href}
                      className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
                      style={{ border: '1px solid var(--cream-dark)', color: 'var(--ink)' }}
                    >
                      {app.ctas.secondary.label}
                    </Link>
                  ) : null}
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-3">
                  {app.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[22px] px-4 py-4"
                      style={{ border: '1px solid var(--cream-dark)', background: 'var(--cream-light)' }}
                    >
                      <p className="text-[0.62rem] uppercase tracking-[0.22em]" style={{ color: muted }}>{metric.label}</p>
                      <p className="mt-2 text-sm font-medium" style={{ color: 'var(--ink)' }}>{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <AppVisual app={app} />
            </div>
          </div>
        </section>

        {/* Key flows */}
        <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 lg:py-24">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.32em]" style={{ color: muted }}>Key flows</p>
            <h2
              className="mt-3 text-[clamp(2.8rem,4.8vw,4.6rem)] uppercase leading-[0.92]"
              style={{ fontFamily: displayFont, color: 'var(--ink)' }}
            >
              Built as a real product surface, not a portfolio thumbnail.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {app.features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[28px] p-6"
                style={{ border: '1px solid var(--cream-dark)', background: 'var(--cream-light)' }}
              >
                <p className="text-[0.62rem] uppercase tracking-[0.26em]" style={{ color: muted }}>{feature.eyebrow}</p>
                <h3 className="mt-4 text-2xl leading-tight" style={{ color: 'var(--ink)' }}>{feature.title}</h3>
                <p className="mt-4 text-sm leading-7" style={{ color: bodyColor }}>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Selected screens */}
        <section className="mx-auto max-w-[1400px] px-6 pb-20 md:px-10 lg:pb-24">
          <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.32em]" style={{ color: muted }}>Selected screens</p>
              <h2
                className="mt-3 text-[clamp(2.8rem,4.8vw,4.4rem)] uppercase leading-[0.92]"
                style={{ fontFamily: displayFont, color: 'var(--ink)' }}
              >
                Product moments shaped like a launch.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7" style={{ color: bodyColor }}>
              Each module below is designed to read like a premium screenshot even before final captured UI is
              dropped in, so the landing page does not feel empty while the app is still evolving.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {app.gallery.map((item) => (
              <article
                key={item.title}
                className="rounded-[30px] p-6"
                style={{ border: '1px solid var(--cream-dark)', background: 'var(--cream-light)' }}
              >
                <p className="text-[0.62rem] uppercase tracking-[0.28em]" style={{ color: muted }}>{item.eyebrow}</p>
                <h3 className="mt-4 text-[1.8rem] leading-tight" style={{ color: 'var(--ink)' }}>{item.title}</h3>
                <p className="mt-4 text-sm leading-7" style={{ color: bodyColor }}>{item.description}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {item.stats.map((stat) => (
                    <span
                      key={stat}
                      className="rounded-full px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em]"
                      style={{ border: '1px solid var(--cream-dark)', background: 'var(--cream-warm)', color: muted }}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Product story */}
        <section className="mx-auto max-w-[1400px] px-6 pb-20 md:px-10 lg:pb-24">
          <div className="grid gap-6 lg:grid-cols-[0.78fr,1.22fr]">
            <article className="rounded-[32px] p-8" style={{ border: '1px solid var(--cream-dark)', background: 'var(--cream-light)' }}>
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: muted }}>Product story</p>
              <h2
                className="mt-4 text-[clamp(2.4rem,4vw,3.6rem)] uppercase leading-[0.95]"
                style={{ fontFamily: displayFont, color: 'var(--ink)' }}
              >
                {app.narrative.title}
              </h2>
              <p className="mt-5 text-base leading-7" style={{ color: bodyColor }}>{app.narrative.description}</p>
            </article>

            <div className="grid gap-4 sm:grid-cols-3">
              {app.narrative.bullets.map((bullet) => (
                <article
                  key={bullet}
                  className="rounded-[28px] p-6 text-sm leading-7"
                  style={{ border: '1px solid var(--cream-dark)', background: 'var(--cream-warm)', color: bodyColor }}
                >
                  {bullet}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Related / archive */}
        <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 lg:pb-28">
          <div className="rounded-[36px] p-8 lg:p-10" style={{ border: '1px solid var(--cream-dark)', background: 'var(--cream-light)' }}>
            <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.32em]" style={{ color: muted }}>Selected products</p>
                <h2
                  className="mt-3 text-[clamp(2.6rem,4.5vw,4.2rem)] uppercase leading-[0.94]"
                  style={{ fontFamily: displayFont, color: 'var(--ink)' }}
                >
                  Return to the archive or keep an eye on what&apos;s next.
                </h2>
              </div>
              <Link
                href="/apps"
                className="inline-flex items-center rounded-full px-5 py-3 text-sm transition duration-300 hover:-translate-y-0.5"
                style={{ border: '1px solid var(--cream-dark)', color: 'var(--ink)' }}
              >
                Back to apps
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedApps.length > 0 ? (
                relatedApps.map((relatedApp) => <AppCard key={relatedApp.slug} app={relatedApp} label="Also in archive" />)
              ) : (
                <>
                  <article className="rounded-[32px] p-8" style={{ border: '1px solid var(--cream-dark)', background: 'var(--cream-warm)' }}>
                    <p className="text-xs uppercase tracking-[0.3em]" style={{ color: muted }}>Archive overview</p>
                    <h3
                      className="mt-4 text-[clamp(2.2rem,3.8vw,3.2rem)] uppercase leading-[0.95]"
                      style={{ fontFamily: displayFont, color: 'var(--ink)' }}
                    >
                      The apps branch is now live.
                    </h3>
                    <p className="mt-5 max-w-lg text-base leading-7" style={{ color: bodyColor }}>
                      Overflow is the first live app page, but the structure now supports a growing catalog of
                      product launches, interface systems, and future app experiments.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href="/apps"
                        className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
                        style={{ border: '1px solid var(--cream-dark)', color: 'var(--ink)' }}
                      >
                        View apps index
                      </Link>
                      <Link
                        href="/#contact"
                        className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
                        style={{ background: 'var(--ink)', color: 'var(--cream)' }}
                      >
                        Request access
                      </Link>
                    </div>
                  </article>

                  <article className="rounded-[32px] p-8" style={{ border: '1px dashed var(--cream-dark)', background: 'var(--cream-light)' }}>
                    <p className="text-xs uppercase tracking-[0.3em]" style={{ color: muted }}>In development</p>
                    <h3
                      className="mt-4 text-[clamp(2.2rem,3.8vw,3.2rem)] uppercase leading-[0.95]"
                      style={{ fontFamily: displayFont, color: 'var(--ink)' }}
                    >
                      More products will slot into this system.
                    </h3>
                    <p className="mt-5 max-w-lg text-base leading-7" style={{ color: bodyColor }}>
                      When the next app is ready, it gets a tile in the archive and its own product landing without
                      changing how visitors move through the site.
                    </p>
                  </article>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
