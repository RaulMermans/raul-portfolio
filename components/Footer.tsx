import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="footer"
      className="footer min-h-screen min-h-[100svh] scroll-snap-start bg-ink text-cream flex flex-col justify-center p-8 md:p-6"
    >
      <div className="footer__inner max-w-[1200px] mx-auto w-full">
        <div className="footer__top grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 md:gap-14 pb-8 border-b border-white/10">
          <div className="footer__brand max-w-[300px] md:max-w-none md:col-span-1">
            <p className="footer__logo font-display text-[clamp(1.5rem,3vw,2rem)] tracking-[0.1em] uppercase mb-4">
              Raúl Mermans
            </p>
            <p className="footer__tagline text-sm text-white/50 leading-[1.6] mb-6">
              Visual Storyteller crafting photography, brand identity, and AI-powered creatives from Spain.
            </p>
            <a
              href="mailto:raulmermans@gmail.com"
              className="footer__email font-mono text-xs tracking-[0.1em] text-cream transition-colors duration-300 hover:text-accent"
            >
              raulmermans@gmail.com
            </a>

            <div className="footer__social flex gap-3 mt-6">
              <a
                href="https://instagram.com/raulmermans"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 border border-white/15 rounded-full flex items-center justify-center font-mono text-xs text-white/50 transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/10"
              >
                IG
              </a>
              <a
                href="https://linkedin.com/in/raulmermans"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 border border-white/15 rounded-full flex items-center justify-center font-mono text-xs text-white/50 transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/10"
              >
                LI
              </a>
              <a
                href="https://unsplash.com/@raulmermans"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Unsplash"
                className="w-11 h-11 border border-white/15 rounded-full flex items-center justify-center font-mono text-xs text-white/50 transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/10"
              >
                UN
              </a>
              <a
                href="https://twitter.com/raulmermans"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-11 h-11 border border-white/15 rounded-full flex items-center justify-center font-mono text-xs text-white/50 transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/10"
              >
                X
              </a>
            </div>
          </div>

          <div className="footer__column">
            <h4 className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Projects</h4>
            <ul className="list-none">
              <li className="mb-3">
                <Link href="/projects/ai-sports-campaign" className="text-sm text-white/60 transition-colors duration-300 hover:text-cream">
                  AI Sports Campaign
                </Link>
              </li>
              <li className="mb-3">
                <Link href="/projects/morocco" className="text-sm text-white/60 transition-colors duration-300 hover:text-cream">
                  Morocco Journey
                </Link>
              </li>
              <li className="mb-3">
                <Link href="/projects/photography" className="text-sm text-white/60 transition-colors duration-300 hover:text-cream">
                  Photography
                </Link>
              </li>
              <li className="mb-3">
                <Link href="/archive" className="text-sm text-white/40 italic transition-colors duration-300 hover:text-white/70">
                  View Archive →
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Services</h4>
            <ul className="list-none">
              <li className="mb-3">
                <Link href="#services" className="text-sm text-white/60 transition-colors duration-300 hover:text-cream">
                  AI Agents
                </Link>
              </li>
              <li className="mb-3">
                <Link href="#services" className="text-sm text-white/60 transition-colors duration-300 hover:text-cream">
                  Web Development
                </Link>
              </li>
              <li className="mb-3">
                <Link href="#services" className="text-sm text-white/60 transition-colors duration-300 hover:text-cream">
                  Photography
                </Link>
              </li>
              <li className="mb-3">
                <Link href="#services" className="text-sm text-white/60 transition-colors duration-300 hover:text-cream">
                  Creative Direction
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Resources</h4>
            <ul className="list-none">
              <li className="mb-3">
                <Link href="/about" className="text-sm text-white/60 transition-colors duration-300 hover:text-cream">
                  About
                </Link>
              </li>
              <li className="mb-3">
                <a
                  href="https://promptbase.com/profile/mangerm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 transition-colors duration-300 hover:text-cream"
                >
                  AI Prompts
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="https://raulmermans.gumroad.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 transition-colors duration-300 hover:text-cream"
                >
                  Gumroad Store
                </a>
              </li>
              <li className="mb-3">
                <Link href="#contact" className="text-sm text-white/60 transition-colors duration-300 hover:text-cream">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom flex justify-between items-center pt-6 flex-wrap gap-4">
          <p className="footer__copy font-mono text-xs text-white/40 tracking-[0.1em]">
            © {currentYear} Raúl Mermans. All rights reserved.
          </p>
          <div className="footer__legal flex gap-5 flex-wrap">
            <Link href="/privacy" className="font-mono text-xs text-white/40 tracking-[0.1em] transition-colors duration-300 hover:text-cream">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-mono text-xs text-white/40 tracking-[0.1em] transition-colors duration-300 hover:text-cream">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
