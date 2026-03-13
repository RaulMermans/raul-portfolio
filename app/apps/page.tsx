import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { apps } from '@/data/apps'

export const metadata: Metadata = {
  title: 'Apps | Raul M.',
  description:
    'A curated gallery of digital products, interfaces, and launch-ready app experiences.',
}

export default function AppsPage() {
  return (
    <>
      <Header />
      <main style={{ background: 'var(--cream)', color: 'var(--ink)', minHeight: '100vh' }}>
        {/* Title */}
        <section className="mx-auto max-w-[1400px] px-6 pt-32 md:px-10 lg:pt-40">
          <h1
            className="text-[clamp(3.5rem,8vw,7rem)] uppercase leading-[0.88]"
            style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif', color: 'var(--ink)' }}
          >
            My Apps
          </h1>
        </section>

        {/* Horizontal app icon scroller */}
        <section className="px-6 py-16 md:px-10 lg:py-24">
          <div
            className="mx-auto max-w-[1400px] overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-8 pb-4" style={{ WebkitOverflowScrolling: 'touch' }}>
              {apps.map((app) => (
                <Link
                  key={app.slug}
                  href={app.href}
                  className="group flex flex-col items-center gap-3 flex-shrink-0"
                >
                  {/* iOS-style icon */}
                  <div
                    className="relative overflow-hidden transition-transform duration-300 group-hover:scale-105"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: '26.6%',
                      background: app.icon
                        ? 'transparent'
                        : `linear-gradient(135deg, ${app.theme.accent}, ${app.theme.accentSoft})`,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                    }}
                  >
                    {app.icon ? (
                      <Image
                        src={app.icon}
                        alt={`${app.name} icon`}
                        width={120}
                        height={120}
                        className="h-full w-full object-cover"
                        style={{ borderRadius: '26.6%' }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-white text-3xl font-bold">
                        {app.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* App name */}
                  <span
                    className="text-xs tracking-wide text-center"
                    style={{ color: 'var(--ink-soft)', maxWidth: 120 }}
                  >
                    {app.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
