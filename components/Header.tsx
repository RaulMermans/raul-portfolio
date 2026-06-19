'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getSiteCopy } from '@/data/site-copy'
import { trapFocus } from '@/lib/accessibility'
import { type Locale, localizePath, switchLocalePath } from '@/lib/i18n'
import styles from './Header.module.css'

interface HeaderProps {
  locale?: Locale
}

export default function Header({ locale = 'en' }: HeaderProps) {
  const pathname = usePathname()
  const copy = getSiteCopy(locale).header
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
  }, [isMenuOpen, closeMenu])

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    // Only intercept hash scrolling when already on the homepage
    if (
      hash.length > 1 &&
      hash.startsWith('#') &&
      window.location.pathname === localizePath('/', locale)
    ) {
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

  const menuItems = copy.nav.map((item) => ({
    ...item,
    href: localizePath(item.href, locale),
  }))
  const desktopItemOrder = ['Case Studies', 'About', 'Services', 'Contact', 'Casos', 'Sobre mí', 'Servicios', 'Contacto']
  const desktopMenuItems = [...menuItems].sort((a, b) => {
    const aIndex = desktopItemOrder.indexOf(a.label)
    const bIndex = desktopItemOrder.indexOf(b.label)

    return (aIndex === -1 ? desktopItemOrder.length : aIndex) - (bIndex === -1 ? desktopItemOrder.length : bIndex)
  })
  const activePath = pathname || localizePath('/', locale)
  const isCaseStudiesRoute = activePath.includes('/case-studies')
  const hasDarkCaseStudyHero =
    activePath.includes('/case-studies/ai-sports') ||
    activePath.includes('/case-studies/remoria')
  const isAboutRoute = activePath.includes('/about')
  const surface = hasDarkCaseStudyHero ? 'dark' : isCaseStudiesRoute ? 'case-studies' : isAboutRoute ? 'dark' : undefined
  const isSpanish = locale === 'es'
  const englishPath = switchLocalePath(activePath, 'en')
  const spanishPath = switchLocalePath(activePath, 'es')
  const isActiveItem = (href: string) => {
    const normalizedHref = href.split('#')[0] || localizePath('/', locale)
    if (normalizedHref === localizePath('/', locale)) {
      return activePath === normalizedHref
    }
    return activePath === normalizedHref || activePath.startsWith(`${normalizedHref}/`)
  }

  return (
    <>
      <header className={styles.headerBar} data-surface={surface} data-transparent={isCaseStudiesRoute || undefined}>
        <Link href={localizePath('/', locale)} className={styles.logo} aria-label={copy.logoLabel}>
          RM
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label={isSpanish ? 'Navegación principal' : 'Primary navigation'}>
          {desktopMenuItems.map((item) => {
            const hash = 'hash' in item ? item.hash : undefined
            const isActive = isActiveItem(item.href)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={isActive ? styles.desktopNavActive : undefined}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => (hash ? handleNavClick(e, hash) : undefined)}
              >
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className={styles.headerMeta}>
          <div className={styles.languageToggle} role="group" aria-label={copy.toggleLabel}>
            <Link
              href={englishPath}
              className={locale === 'en' ? styles.languageToggleActive : undefined}
              aria-current={locale === 'en' ? 'page' : undefined}
            >
              {copy.languageShort.en}
            </Link>
            <Link
              href={spanishPath}
              className={locale === 'es' ? styles.languageToggleActive : undefined}
              aria-current={locale === 'es' ? 'page' : undefined}
            >
              {copy.languageShort.es}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuBtnRef}
          type="button"
          className={styles.menuButton}
          data-state={isMenuOpen ? 'open' : 'closed'}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? copy.closeMenu : copy.openMenu}
          aria-expanded={isMenuOpen}
          aria-controls={menuDialogId}
          aria-haspopup="dialog"
        >
          <span className={styles.menuButtonInner} aria-hidden="true">
            <span className={styles.menuButtonLine}></span>
            <span className={styles.menuButtonLine}></span>
          </span>
        </button>
      </header>

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
                  {copy.mobileEyebrow}
                </p>
                <button
                  type="button"
                  className={styles.menuClose}
                  onClick={() => closeMenu()}
                  aria-label={copy.closeMenu}
                >
                  <span aria-hidden="true">✕</span>
                </button>
              </div>

              <nav className={styles.menuNav} aria-label="Mobile navigation">
                {menuItems.map((item, i) => {
                  const hash = 'hash' in item ? item.hash : undefined
                  return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.32 }}
                  >
                    <Link
                      href={item.href}
                      className={styles.menuLink}
                      onClick={(e) => hash ? handleNavClick(e, hash) : closeMenu(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                  )
                })}
              </nav>

              <motion.div
                className={styles.menuFooter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.32 }}
              >
                <div className={styles.mobileLanguageToggle} role="group" aria-label={copy.toggleLabel}>
                  <Link
                    href={englishPath}
                    className={locale === 'en' ? styles.mobileLanguageToggleActive : undefined}
                    aria-current={locale === 'en' ? 'page' : undefined}
                    onClick={() => closeMenu(false)}
                  >
                    {copy.languageShort.en}
                  </Link>
                  <Link
                    href={spanishPath}
                    className={locale === 'es' ? styles.mobileLanguageToggleActive : undefined}
                    aria-current={locale === 'es' ? 'page' : undefined}
                    onClick={() => closeMenu(false)}
                  >
                    {copy.languageShort.es}
                  </Link>
                </div>
                <p className={styles.menuMeta}>
                  {copy.menuMeta}
                </p>
                <Link
                  href={localizePath('/#contact', locale)}
                  className={styles.menuCta}
                  onClick={(e) => handleNavClick(e, '#contact')}
                >
                  {copy.menuCta}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
