'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { trapFocus } from '@/lib/accessibility'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const scrollLockRef = useRef<{ scrollY: number; bodyOverflow: string; bodyPosition: string; bodyTop: string; bodyWidth: string; htmlOverflow: string } | null>(null)
  const menuDialogId = useId()
  const menuTitleId = useId()

  const closeMenu = useCallback((restoreFocus = true) => {
    setIsMenuOpen(false)
    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        menuBtnRef.current?.focus()
      })
    }
  }, [])

  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return

    const cleanupFocusTrap = trapFocus(menuRef.current)
    const { body, documentElement } = document
    const scrollY = window.scrollY

    scrollLockRef.current = {
      scrollY,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      htmlOverflow: documentElement.style.overflow,
    }

    documentElement.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEsc)

    return () => {
      cleanupFocusTrap()
      document.removeEventListener('keydown', handleEsc)

      if (scrollLockRef.current) {
        const lock = scrollLockRef.current
        documentElement.style.overflow = lock.htmlOverflow
        body.style.overflow = lock.bodyOverflow
        body.style.position = lock.bodyPosition
        body.style.top = lock.bodyTop
        body.style.width = lock.bodyWidth
        window.scrollTo({ top: lock.scrollY, behavior: 'auto' })
      }
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    // Only intercept hash scrolling when already on the homepage
    if (hash.length > 1 && hash.startsWith('#') && window.location.pathname === '/') {
      e.preventDefault()
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        target.setAttribute('tabindex', '-1')
        ;(target as HTMLElement).focus()
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
      }
    }
    closeMenu(false)
  }

  const menuItems = [
    { label: 'Work', href: '/case-studies' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/#services', hash: '#services' },
    { label: 'Contact', href: '/#contact', hash: '#contact' },
  ]

  return (
    <>
      <Link href="/" className={styles.logo}>
        RM
      </Link>

      {/* Desktop Nav */}
      <nav className={styles.desktopNav} aria-label="Primary navigation">
        <Link href="/case-studies">Case Studies</Link>
        <Link href="/about">About</Link>
        <Link href="/#services" onClick={(e) => handleNavClick(e, '#services')}>Services</Link>
        <Link href="/#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        ref={menuBtnRef}
        type="button"
        className={styles.menuButton}
        data-state={isMenuOpen ? 'open' : 'closed'}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls={menuDialogId}
        aria-haspopup="dialog"
      >
        <span className={styles.menuButtonInner} aria-hidden="true">
          <span className={styles.menuButtonLine}></span>
          <span className={styles.menuButtonLine}></span>
          <span className={styles.menuButtonLine}></span>
        </span>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.menuOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => closeMenu()}
          >
            <motion.div
              id={menuDialogId}
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={menuTitleId}
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 36 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className={styles.menuPanel}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.menuHeader}>
                <p id={menuTitleId} className={styles.menuEyebrow}>
                  Navigation
                </p>
                <button
                  type="button"
                  className={styles.menuClose}
                  onClick={() => closeMenu()}
                  aria-label="Close menu"
                >
                  <span aria-hidden="true">✕</span>
                </button>
              </div>

              <nav className={styles.menuNav} aria-label="Mobile navigation">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.32 }}
                  >
                    <Link
                      href={item.href}
                      className={styles.menuLink}
                      onClick={(e) => item.hash ? handleNavClick(e, item.hash) : closeMenu(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className={styles.menuFooter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.32 }}
              >
                <p className={styles.menuMeta}>
                  Brand systems, photography, and AI-powered creative work built to feel calm and precise on any screen.
                </p>
                <Link
                  href="/#contact"
                  className={styles.menuCta}
                  onClick={(e) => handleNavClick(e, '#contact')}
                >
                  Start a Project
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
