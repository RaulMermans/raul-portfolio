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
        <Link href="/#work" onClick={(e) => handleNavClick(e, '#work')}>Work</Link>
        <Link href="/about" onClick={(e) => { e.preventDefault(); window.location.href = '/about'; }}>About</Link>
        <Link href="/#services" onClick={(e) => handleNavClick(e, '#services')}>Services</Link>
        <Link href="/#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</Link>
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
        <Link href="/#work" onClick={(e) => handleNavClick(e, '#work')}>Work</Link>
        <Link href="/about" onClick={(e) => { e.preventDefault(); window.location.href = '/about'; closeMenu(); }}>About</Link>
        <Link href="/#services" onClick={(e) => handleNavClick(e, '#services')}>Services</Link>
        <Link href="/#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</Link>
      </nav>
    </>
  )
}
