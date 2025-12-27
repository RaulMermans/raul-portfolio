'use client'

import Reveal from './Reveal'

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact flex flex-col justify-center items-center text-center bg-cream p-9 md:p-6 min-h-screen relative"
      aria-labelledby="contact-title"
    >
      <div
        className="contact__glow absolute w-[60vmax] h-[60vmax] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-20 z-0"
        style={{
          background: 'radial-gradient(circle, var(--gradient-rose) 0%, var(--gradient-soft) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="contact__content relative z-[2] flex flex-col items-center max-w-[600px] w-full">
        <Reveal>
          <p className="contact__label font-mono text-xs tracking-[0.4em] uppercase text-ink-faint mb-4">Get in Touch</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 id="contact-title" className="contact__headline font-display text-[clamp(4rem,14vw,10rem)] leading-[0.85] tracking-[-0.02em] uppercase mb-12">
            Let&apos;s Work
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <a
            href="mailto:raulmermans@gmail.com"
            className="btn contact__email min-w-[280px] md:min-w-auto md:w-full md:max-w-[300px]"
          >
            raulmermans@gmail.com
          </a>
        </Reveal>
        <Reveal delay={2}>
          <div className="contact__links flex flex-wrap justify-center gap-4 mt-6">
            <a
              href="https://instagram.com/raulmermans"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/in/raulmermans"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://unsplash.com/@raulmermans"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
          </div>
        </Reveal>
        <Reveal delay={3}>
          <div className="contact__divider w-full max-w-[400px] h-px bg-cream-dark my-12 md:max-w-[280px]" />
        </Reveal>
        <Reveal delay={3}>
          <div className="ai-products flex flex-col items-center">
            <p className="label ai-products__label mb-6">AI Products</p>
            <div className="ai-products__links flex flex-wrap justify-center gap-4">
              <a href="https://promptbase.com/profile/mangerm" className="btn" target="_blank" rel="noopener noreferrer">
                Image Prompts
              </a>
              <a href="https://raulmermans.gumroad.com/" className="btn" target="_blank" rel="noopener noreferrer">
                Gumroad Store
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={3}>
          <p className="contact__location mt-12 font-mono text-xs tracking-[0.2em] uppercase text-ink-faint">Spain — Available Worldwide</p>
        </Reveal>
      </div>
    </section>
  )
}

