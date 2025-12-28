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
    if (href.length > 1) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
    closeMenu()
  }

  return (
    <>
      <Link href="/" className="ui ui__logo">
        RM
      </Link>

      {/* Desktop Nav */}
      <nav className="ui ui__nav" aria-label="Primary navigation">
        <a href="#work" onClick={(e) => handleNavClick(e, '#case-studies')}>Work</a>
        <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
        <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className={`ui ui__menu-btn ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Overlay */}
      <nav
        className={`ui__mobile-menu ${isMenuOpen ? 'active' : ''}`}
        aria-label="Mobile navigation"
      >
        {['#case-studies', '#photography', '#visuals', '#about', '#services', '#contact'].map((href) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
          >
            {href === '#case-studies' ? 'Case Studies' : href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
          </a>
        ))}
      </nav>
    </>
  )
}
