import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { apps } from '@/data/apps'

export const metadata: Metadata = {
  title: 'Apps | Raul M.',
  description:
    'A curated gallery of digital products, interfaces, and launch-ready app experiences.',
}

const AppCoverflowCarousel = dynamic(
  () => import('@/components/apps/AppCoverflowCarousel'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-32">
        <div className="h-[400px] w-[380px] max-w-[80vw] animate-pulse rounded-[24px] bg-white/[0.04]" />
      </div>
    ),
  }
)

export default function AppsPage() {
  return (
    <>
      <Header />
      <main className="bg-[#060606] text-[#f5f0eb]">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at top left, rgba(154, 216, 202, 0.14), transparent 32%), linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, transparent 46%)',
            }}
          />
          <div className="relative mx-auto max-w-[1400px] px-6 pb-8 pt-32 text-center md:px-10 lg:pb-12 lg:pt-40">
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/[0.45]">Apps</p>
            <h1
              className="mx-auto max-w-4xl text-[clamp(3.5rem,8vw,7rem)] uppercase leading-[0.88] text-[#f5f0eb]"
              style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
            >
              Product worlds with launch energy.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/60">
              A curated space for the apps I design and build — interfaces, launch surfaces, and product systems.
            </p>
          </div>
        </section>

        {/* Coverflow carousel — full bleed */}
        <section className="pb-16 lg:pb-24">
          <AppCoverflowCarousel apps={apps} />
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-white/10 py-16 text-center lg:py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/[0.38]">Want to build something?</p>
          <h2
            className="mt-4 text-[clamp(2.2rem,4vw,3.6rem)] uppercase leading-[0.94]"
            style={{ fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif' }}
          >
            Let&apos;s discuss a product.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-full bg-[#f5f0eb] px-6 py-3 text-sm font-medium text-[#171411] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Get in touch
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-white/[0.14] bg-white/[0.04] px-6 py-3 text-sm text-white/70 transition duration-300 hover:border-white/[0.22] hover:text-white/90"
            >
              Back to portfolio
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
