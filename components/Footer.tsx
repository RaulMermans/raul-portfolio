import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__logo">Raúl Mermans</p>
            <p className="footer__tagline">Applied AI systems builder designing agents, automation, and creative infrastructure for modern brands.</p>
            <a 
              href="mailto:raulmermans@gmail.com" 
              className="footer__email"
              aria-label="Send email to Raúl Mermans"
            >
              raulmermans@gmail.com
            </a>
            
            <div className="footer__social">
              <a href="https://www.instagram.com/raulmeermans/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
              <a href="https://linkedin.com/in/raulmermans" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LI</a>
              <a href="https://unsplash.com/@raulmermans" target="_blank" rel="noopener noreferrer" aria-label="Unsplash">UN</a>
              <a href="https://twitter.com/raulmermans" target="_blank" rel="noopener noreferrer" aria-label="Twitter">X</a>
            </div>
          </div>

          <div className="footer__column">
            <h4>Work</h4>
            <ul>
              <li>
                <Link href="/case-studies">Case Studies</Link>
              </li>
              <li>
                <Link href="/photography">Photography</Link>
              </li>
              <li>
                <Link href="/visuals">Visuals</Link>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <h4>Services</h4>
            <ul>
              <li>
                <Link href="/#services">AI Systems</Link>
              </li>
              <li>
                <Link href="/#services">Automation</Link>
              </li>
              <li>
                <Link href="/#services">Prototypes</Link>
              </li>
              <li>
                <Link href="/#services">Brand Systems</Link>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <h4>Resources</h4>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <a 
                  href="https://promptbase.com/profile/mangerm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="View PromptBase profile (opens in new tab)"
                >
                  PromptBase Profile
                </a>
              </li>
              <li>
                <a 
                  href="https://raulmermans.gumroad.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit Gumroad Store (opens in new tab)"
                >
                  Gumroad Store
                </a>
              </li>
              <li>
                <Link href="/#contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {currentYear} Raúl Mermans. All rights reserved.</p>
          <div className="footer__legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>

        <div className="footer__vibe">
          <p className="footer__vibe-text">Designed and built by Raúl Mermans.</p>
        </div>
      </div>
    </footer>
  )
}
