'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = !prev ? 'hidden' : ''
      }
      return !prev
    })
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
    // Return focus to the hamburger button when menu closes
    menuBtnRef.current?.focus()
  }

  // Escape key closes the mobile menu
  useEffect(() => {
    if (!isMenuOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen])

  // Focus trap inside mobile menu when open
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return
    const menu = menuRef.current
    const focusableEls = Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    )
    const first = focusableEls[0]
    const last = focusableEls[focusableEls.length - 1]
    if (!first) return

    const handleTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTrap)
    first.focus()
    return () => document.removeEventListener('keydown', handleTrap)
  }, [isMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    // Only intercept hash scrolling when already on the homepage
    if (hash.length > 1 && hash.startsWith('#') && window.location.pathname === '/') {
      e.preventDefault()
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        // tabindex="-1" lets programmatic focus move to a non-interactive element;
        // the blur listener removes it so it never persists in the tab order.
        target.setAttribute('tabindex', '-1')
        ;(target as HTMLElement).focus()
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
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
        <Link href="/case-studies">Case Studies</Link>
        <Link href="/about">About</Link>
        <Link href="/#services" onClick={(e) => handleNavClick(e, '#services')}>Services</Link>
        <Link href="/#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        ref={menuBtnRef}
        className={`ui ui__menu-btn ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Overlay */}
      <nav
        id="mobile-menu"
        ref={menuRef}
        className={`ui__mobile-menu ${isMenuOpen ? 'active' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <Link href="/case-studies" onClick={closeMenu}>Work</Link>
        <Link href="/about" onClick={closeMenu}>About</Link>
        <Link href="/#services" onClick={(e) => handleNavClick(e, '#services')}>Services</Link>
        <Link href="/#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</Link>
        <Link
          href="/#contact"
          className="ui__mobile-cta"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Start a Project
        </Link>
      </nav>
    </>
  )
}
