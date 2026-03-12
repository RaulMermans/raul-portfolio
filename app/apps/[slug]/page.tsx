import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppCard from '@/components/apps/AppCard'
import AppCtaLink from '@/components/apps/AppCtaLink'
import AppVisual from '@/components/apps/AppVisual'
import { apps, getAppBySlug } from '@/data/apps'

interface AppPageProps {
  params: {
    slug: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  return apps.map((app) => ({
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

export default function AppDetailPage({ params }: AppPageProps) {
  const app = getAppBySlug(params.slug)

  if (!app) {
    notFound()
  }

  const relatedApps = apps.filter((entry) => entry.slug !== app.slug)

  return (
    <>
      <Header />
      <main className="bg-[#050505] text-[#f5f0eb]">
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at top left, ${app.theme.glow} 0%, transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 48%)`,
            }}
          />

          <div className="relative mx-auto max-w-[1400px] px-6 pb-20 pt-32 md:px-10 lg:pb-28 lg:pt-40">
            <Link
              href="/apps"
              className="mb-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/[0.42] transition duration-300 hover:text-white/[0.72]"
            >
              <span>Apps</span>
              <span>/</span>
              <span>{app.name}</span>
            </Link>

            <div className="grid gap-12 lg:grid-cols-[0.84fr,1.16fr] lg:items-end">
              <div className="max-w-2xl">
                <div className="mb-6 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/[0.12] bg-white/[0.05] px-4 py-2 text-[0.64rem] uppercase tracking-[0.26em] text-white/[0.54]">
                    {app.status}
                  </span>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-[0.64rem] uppercase tracking-[0.26em] text-white/[0.42]">
                    {app.launchStage}
                  </span>
                </div>

                <h1
                  className="text-[clamp(4rem,9vw,7.6rem)] uppercase leading-[0.88] text-[#f5f0eb]"
                  style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
                >
                  {app.name}
                </h1>

                <p className="mt-6 max-w-xl text-[1.15rem] leading-8 text-white/[0.74]">{app.heroStatement}</p>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/[0.62]">{app.shortDescription}</p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <AppCtaLink cta={app.ctas.primary} />
                  {app.ctas.secondary ? <AppCtaLink cta={app.ctas.secondary} variant="secondary" /> : null}
                  {app.ctas.caseStudy ? <AppCtaLink cta={app.ctas.caseStudy} variant="secondary" /> : null}
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-3">
                  {app.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4"
                    >
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-white/[0.42]">{metric.label}</p>
                      <p className="mt-2 text-sm font-medium text-white/[0.82]">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <AppVisual app={app} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 lg:py-24">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.32em] text-white/[0.42]">Key flows</p>
            <h2
              className="mt-3 text-[clamp(2.8rem,4.8vw,4.6rem)] uppercase leading-[0.92]"
              style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
            >
              Built as a real product surface, not a portfolio thumbnail.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {app.features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-[0.62rem] uppercase tracking-[0.26em] text-white/[0.42]">{feature.eyebrow}</p>
                <h3 className="mt-4 text-2xl leading-tight text-white">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/[0.66]">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 pb-20 md:px-10 lg:pb-24">
          <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.32em] text-white/[0.42]">Selected screens</p>
              <h2
                className="mt-3 text-[clamp(2.8rem,4.8vw,4.4rem)] uppercase leading-[0.92]"
                style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
              >
                Product moments shaped like a launch.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-white/[0.64]">
              Each module below is designed to read like a premium screenshot even before final captured UI is
              dropped in, so the landing page does not feel empty while the app is still evolving.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {app.gallery.map((item) => (
              <article
                key={item.title}
                className="rounded-[30px] border border-white/10 p-6"
                style={{
                  backgroundImage: `radial-gradient(circle at top right, ${app.theme.glow} 0%, transparent 48%), linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
                }}
              >
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/[0.44]">{item.eyebrow}</p>
                <h3 className="mt-4 text-[1.8rem] leading-tight text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/[0.66]">{item.description}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {item.stats.map((stat) => (
                    <span
                      key={stat}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-white/[0.48]"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 pb-20 md:px-10 lg:pb-24">
          <div className="grid gap-6 lg:grid-cols-[0.78fr,1.22fr]">
            <article className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-white/[0.42]">Product story</p>
              <h2
                className="mt-4 text-[clamp(2.4rem,4vw,3.6rem)] uppercase leading-[0.95]"
                style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
              >
                {app.narrative.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-white/[0.66]">{app.narrative.description}</p>
            </article>

            <div className="grid gap-4 sm:grid-cols-3">
              {app.narrative.bullets.map((bullet) => (
                <article
                  key={bullet}
                  className="rounded-[28px] border border-white/10 bg-black/20 p-6 text-sm leading-7 text-white/[0.68]"
                >
                  {bullet}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 lg:pb-28">
          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 lg:p-10">
            <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-white/[0.42]">Selected products</p>
                <h2
                  className="mt-3 text-[clamp(2.6rem,4.5vw,4.2rem)] uppercase leading-[0.94]"
                  style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
                >
                  Return to the archive or keep an eye on what&apos;s next.
                </h2>
              </div>
              <Link
                href="/apps"
                className="inline-flex items-center rounded-full border border-white/[0.14] bg-white/[0.05] px-5 py-3 text-sm text-white/[0.78] transition duration-300 hover:border-white/[0.22] hover:bg-white/[0.08]"
              >
                Back to apps
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedApps.length > 0 ? (
                relatedApps.map((relatedApp) => <AppCard key={relatedApp.slug} app={relatedApp} label="Also in archive" />)
              ) : (
                <>
                  <article className="rounded-[32px] border border-white/10 bg-black/20 p-8 text-white">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/[0.42]">Archive overview</p>
                    <h3
                      className="mt-4 text-[clamp(2.2rem,3.8vw,3.2rem)] uppercase leading-[0.95]"
                      style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
                    >
                      The apps branch is now live.
                    </h3>
                    <p className="mt-5 max-w-lg text-base leading-7 text-white/[0.66]">
                      Overflow is the first live app page, but the structure now supports a growing catalog of
                      product launches, interface systems, and future app experiments.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <AppCtaLink cta={{ label: 'View apps index', href: '/apps' }} variant="secondary" />
                      <AppCtaLink cta={{ label: 'Request access', href: '/#contact' }} />
                    </div>
                  </article>

                  <article className="rounded-[32px] border border-dashed border-white/[0.14] bg-white/[0.02] p-8 text-white">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/[0.42]">In development</p>
                    <h3
                      className="mt-4 text-[clamp(2.2rem,3.8vw,3.2rem)] uppercase leading-[0.95]"
                      style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
                    >
                      More products will slot into this system.
                    </h3>
                    <p className="mt-5 max-w-lg text-base leading-7 text-white/[0.66]">
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
