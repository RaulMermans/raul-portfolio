'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = !isMenuOpen ? 'hidden' : ''
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    closeMenu()
  }

  return (
    <>
      <Link
        href="/"
        className="fixed top-6 left-6 z-[100] font-mono text-sm tracking-[0.2em] uppercase p-2 min-h-[44px] flex items-center opacity-0 animate-[fadeIn_0.8s_ease-out_1.2s_forwards] hover:text-accent transition-colors"
      >
        RM
      </Link>

      {/* Desktop Nav */}
      <nav
        className="fixed top-6 right-6 z-[100] flex gap-6 opacity-0 animate-[fadeIn_0.8s_ease-out_1.3s_forwards] hidden md:flex"
        aria-label="Primary navigation"
      >
        {['#work', '#about', '#services', '#contact'].map((href) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className="font-mono text-xs tracking-[0.12em] uppercase text-ink-muted px-3 py-2 min-h-[44px] flex items-center relative transition-colors hover:text-ink group"
          >
            {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
            <span className="absolute bottom-1.5 left-3 right-3 h-px bg-ink scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </a>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-[101] w-[44px] h-[44px] flex flex-col justify-center items-center gap-1.5 bg-transparent border-none cursor-pointer opacity-0 animate-[fadeIn_0.8s_ease-out_1.3s_forwards] md:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-x-1 translate-y-1' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${
            isMenuOpen ? '-rotate-45 translate-x-1 -translate-y-1' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <nav
        className={`fixed inset-0 bg-cream z-[99] flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-out md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Mobile navigation"
      >
        {['#work', '#about', '#services', '#contact'].map((href, index) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className={`font-display text-[clamp(2rem,8vw,3.5rem)] uppercase text-ink transition-all duration-400 ${
              isMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isMenuOpen ? `${0.1 + index * 0.05}s` : '0s' }}
          >
            {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
          </a>
        ))}
      </nav>
    </>
  )
}
