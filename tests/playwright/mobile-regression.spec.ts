import { expect, test, type Page } from '@playwright/test'

const FIXED_DATE_ISO = '2026-03-16T10:00:00.000Z'

async function freezeClock(page: Page) {
  await page.addInitScript(`
    (() => {
      const fixed = new Date('${FIXED_DATE_ISO}').valueOf();
      const NativeDate = Date;

      class FixedDate extends NativeDate {
        constructor(...args) {
          if (args.length === 0) {
            super(fixed);
            return;
          }

          super(...args);
        }

        static now() {
          return fixed;
        }
      }

      FixedDate.parse = NativeDate.parse;
      FixedDate.UTC = NativeDate.UTC;
      window.Date = FixedDate;
    })();
  `)
}

async function preparePage(page: Page, path: string) {
  await freezeClock(page)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(path, { waitUntil: 'networkidle' })
  await page.addStyleTag({
    content: `
      html { scroll-behavior: auto !important; }
      *, *::before, *::after { caret-color: transparent !important; }
    `,
  })
  await page.evaluate(async () => {
    if ('fonts' in document) {
      await document.fonts.ready
    }
  })
}

async function swipeSurface(page: Page, deltaX: number, deltaY: number) {
  await page.locator('[data-mobile-audit="visuals-surface"]').evaluate((element, delta) => {
    const rect = element.getBoundingClientRect()
    const startX = rect.left + rect.width / 2
    const startY = rect.top + rect.height / 2
    const endX = startX + delta.deltaX
    const endY = startY + delta.deltaY

    const eventInit = (clientX: number, clientY: number) => ({
      bubbles: true,
      cancelable: true,
      composed: true,
      pointerId: 1,
      pointerType: 'touch',
      isPrimary: true,
      clientX,
      clientY,
    })

    element.dispatchEvent(new PointerEvent('pointerdown', eventInit(startX, startY)))
    element.dispatchEvent(new PointerEvent('pointermove', eventInit(endX, endY)))
    element.dispatchEvent(new PointerEvent('pointerup', eventInit(endX, endY)))
  }, { deltaX, deltaY })
}

test.describe('Mobile Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
  })

  test('portfolio gateway introduces both routes on mobile', async ({ page }) => {
    await preparePage(page, '/en/')

    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toHaveCSS('font-family', /instrumentSerif/i)
    await expect(page.locator('#work a[href="/en/technical/"]')).toHaveCount(1)
    await expect(page.locator('#work a[href="/en/creative/"]')).toHaveCount(1)
  })

  test('desktop gateway keeps its title and both choices visible', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/en/', { waitUntil: 'domcontentloaded' })

    const heading = page.getByRole('heading', { level: 1 })

    await expect(heading).toBeVisible()
    await expect(heading).toHaveCSS('font-family', /instrumentSerif/i)
    await expect(page.locator('#work a[href="/en/technical/"]')).toBeVisible()
    await expect(page.locator('#work a[href="/en/creative/"]')).toBeVisible()
  })

  test('long archive headings fit on mobile without clipping', async ({ page }) => {
    for (const path of ['/en/photography/', '/photography/', '/en/apps/territoryops-spain/', '/apps/territoryops-spain/']) {
      await page.goto(path, { waitUntil: 'domcontentloaded' })
      const heading = page.getByRole('heading', { level: 1 })
      await expect(heading).toBeVisible()

      const metrics = await heading.evaluate((element) => {
        const styles = getComputedStyle(element)
        return {
          headingHeight: element.getBoundingClientRect().height,
          lineHeight: Number.parseFloat(styles.lineHeight),
          headingScrollWidth: element.scrollWidth,
          headingClientWidth: element.clientWidth,
          contentScrollWidth: element.parentElement?.scrollWidth ?? 0,
          contentClientWidth: element.parentElement?.clientWidth ?? 0,
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
        }
      })

      expect(metrics.headingHeight).toBeLessThanOrEqual(metrics.lineHeight * 3 + 2)
      expect(metrics.headingScrollWidth).toBeLessThanOrEqual(metrics.headingClientWidth)
      expect(metrics.contentScrollWidth).toBeLessThanOrEqual(metrics.contentClientWidth)
      expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth)
    }
  })

  test('shared mobile defaults keep body copy readable and the document within the viewport', async ({ page }) => {
    await preparePage(page, '/en/')

    const metrics = await page.evaluate(() => ({
      bodyFontSize: Number.parseFloat(getComputedStyle(document.body).fontSize),
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    }))

    expect(metrics.bodyFontSize).toBeGreaterThanOrEqual(16)
    expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth)
  })

  test('the home page keeps its horizontal selector within the viewport in both locales', async ({ page }) => {
    for (const path of ['/', '/en/']) {
      await preparePage(page, path)

      const scrolling = await page.evaluate(() => ({
        scroller: document.scrollingElement?.tagName,
        bodyOverflowY: getComputedStyle(document.body).overflowY,
        documentHeight: document.documentElement.scrollHeight,
        documentWidth: document.documentElement.scrollWidth,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        stripScrollable: document.querySelector('#work')!.scrollWidth > document.querySelector('#work')!.clientWidth,
      }))

      expect(scrolling.scroller).toBe('HTML')
      expect(scrolling.bodyOverflowY).toBe('visible')
      expect(scrolling.documentHeight).toBeLessThanOrEqual(scrolling.viewportHeight + 1)
      expect(scrolling.documentWidth).toBeLessThanOrEqual(scrolling.viewportWidth)
      expect(scrolling.stripScrollable).toBe(true)
      await expect(page.getByTestId('site-header')).toHaveCount(0)
      await expect(page.locator('footer')).toHaveCount(0)
    }
  })

  test('the name fits and the third card is reachable at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 })
    for (const path of ['/', '/en/']) {
      await preparePage(page, path)
      const layout = await page.evaluate(() => {
        const name = document.querySelector('main h1')!
        const strip = document.querySelector('#work')!
        strip.scrollLeft = strip.scrollWidth
        const about = strip.querySelector('a[href$="/about/"]')!.getBoundingClientRect()
        const frame = strip.getBoundingClientRect()
        return {
          nameFits: name.scrollWidth <= name.clientWidth,
          pageFits: document.documentElement.scrollWidth <= innerWidth,
          aboutVisible: about.left >= frame.left - 1 && about.right <= frame.right + 1,
        }
      })
      expect(layout).toEqual({ nameFits: true, pageFits: true, aboutVisible: true })
    }
  })

  test('the portfolio gateway is localized', async ({ page }) => {
    await preparePage(page, '/en/')
    await expect(page.getByRole('heading', { level: 1, name: /Raúl Mermans/i })).toBeVisible()

    await preparePage(page, '/')
    await expect(page.getByRole('heading', { level: 1, name: /Raúl Mermans/i })).toBeVisible()
  })

  test('mobile masthead keeps home, back, and language links', async ({ page }) => {
    await preparePage(page, '/en/technical/')
    const header = page.getByTestId('site-header')
    await expect(header.locator('a')).toHaveCount(4)
    await expect(header.getByRole('button')).toHaveCount(0)
    await expect(header.getByRole('navigation')).toHaveCount(0)
    await header.getByRole('link', { name: 'Home' }).click()
    await expect(page).toHaveURL(/\/en\/?$/)
  })

  test('gateway routes directly to the technical portfolio on mobile', async ({ page }) => {
    await preparePage(page, '/en/')
    await page.locator('#work a[href="/en/technical/"]').click()
    await expect(page).toHaveURL(/\/en\/technical\/?$/)
    await expect(page.getByRole('heading', { level: 1, name: /Technical work/i })).toBeVisible()
    const overflow = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    }))
    expect(overflow.documentWidth).toBeLessThanOrEqual(overflow.viewportWidth)

    const iris = page.locator('a[href="/en/case-studies/iris/"]').first()
    await iris.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/en\/case-studies\/iris\/?$/)
  })

  test('both portfolio routes return to the gateway on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await preparePage(page, '/en/')

    await page.locator('#work a[href="/en/creative/"]').click()
    await expect(page.getByRole('heading', { level: 1, name: /Creative work/i })).toBeVisible()
    await page.getByRole('link', { name: /Choose another route/i }).click()
    await expect(page.getByRole('heading', { level: 1, name: /Raúl Mermans/i })).toBeVisible()
  })

  test('case studies landing is a thumbnail-led gallery on mobile', async ({ page }) => {
    await preparePage(page, '/en/case-studies/')

    await expect(page.getByRole('heading', { level: 1, name: 'Case Studies' })).toHaveCSS(
      'font-family',
      /instrumentSerif/i
    )

    const grid = page.locator('[data-mobile-audit="case-study-grid"]')
    const firstCard = grid.locator('[data-mobile-audit="case-study-card"]').first()

    await expect(firstCard).toBeVisible()
    await expect(firstCard.locator('.case-study-project-tile__title')).toBeVisible()
    await expect(firstCard.locator('.case-study-project-tile__description')).toBeVisible()
    await expect(firstCard.locator('.case-study-project-tile__meta')).toHaveCount(0)

    const initialLayout = await page.evaluate(() => {
      const card = document.querySelector('[data-mobile-audit="case-study-grid"] [data-mobile-audit="case-study-card"]')

      if (!(card instanceof HTMLElement)) {
        throw new Error('Case study mobile audit elements are missing')
      }

      const cardRect = card.getBoundingClientRect()
      const frame = card.querySelector('.case-study-project-tile__frame')

      if (!(frame instanceof HTMLElement)) {
        throw new Error('Case study thumbnail frame is missing')
      }

      const frameRect = frame.getBoundingClientRect()

      return {
        cardTop: cardRect.top,
        cardLeft: cardRect.left,
        cardRight: cardRect.right,
        frameRatio: frameRect.width / frameRect.height,
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
      }
    })

    expect(initialLayout.cardTop).toBeGreaterThanOrEqual(0)
    expect(initialLayout.cardLeft).toBeGreaterThanOrEqual(0)
    expect(initialLayout.cardRight).toBeLessThanOrEqual(initialLayout.viewportWidth)
    expect(initialLayout.frameRatio).toBeCloseTo(1.6, 1)
    expect(initialLayout.documentWidth).toBeLessThanOrEqual(initialLayout.viewportWidth)
  })

  test('visuals surface only navigates on horizontal intent', async ({ page }) => {
    await preparePage(page, '/en/visuals/')

    const readTitle = async () => page.locator('[data-mobile-audit="visual-caption"] h2').innerText()

    const firstTitle = await readTitle()

    await swipeSurface(page, 0, 120)
    await expect.poll(readTitle).toBe(firstTitle)

    await swipeSurface(page, -120, 12)
    await expect.poll(readTitle).not.toBe(firstTitle)
  })

  test('visuals surface ignores diagonal downward swipes so page scroll can win', async ({ page }) => {
    await preparePage(page, '/en/visuals/')

    const readTitle = async () => page.locator('[data-mobile-audit="visual-caption"] h2').innerText()
    const firstTitle = await readTitle()

    await swipeSurface(page, -96, 84)
    await expect.poll(readTitle).toBe(firstTitle)
  })

  test('visuals gallery and exhibition remain stable on mobile', async ({ page }) => {
    await preparePage(page, '/en/visuals/')

    const surface = page.locator('[data-mobile-audit="visuals-surface"]')
    const surfaceBounds = await surface.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      return { left: rect.left, right: rect.right, viewportWidth: window.innerWidth }
    })
    expect(surfaceBounds.left).toBeGreaterThanOrEqual(0)
    expect(surfaceBounds.right).toBeLessThanOrEqual(surfaceBounds.viewportWidth)

    await page.locator('[data-mobile-audit="visual-card"]').click()
    const exhibition = page.locator('#exhibition')
    await expect(exhibition).toBeVisible()

    const exhibitionBounds = await exhibition.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      return { left: rect.left, right: rect.right, viewportWidth: window.innerWidth }
    })
    expect(exhibitionBounds.left).toBeGreaterThanOrEqual(0)
    expect(exhibitionBounds.right).toBeLessThanOrEqual(exhibitionBounds.viewportWidth)
  })

  test('visuals exhibition details stay scrollable once opened', async ({ page }) => {
    await preparePage(page, '/en/visuals/')

    await page.locator('[data-mobile-audit="visual-card"]').click()
    const scrollRegion = page.locator('[data-mobile-audit="visuals-exhibition-scroll"]')

    await expect(scrollRegion).toBeVisible()

    const metrics = await scrollRegion.evaluate((element) => ({
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
    }))

    expect(metrics.scrollHeight).toBeGreaterThan(metrics.clientHeight)

    await scrollRegion.evaluate((element) => {
      element.scrollTo({ top: 240, behavior: 'auto' })
    })

    await expect.poll(() => scrollRegion.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
  })

  test('visuals exhibition details stay scrollable on desktop split layout', async ({ page }) => {
    await page.setViewportSize({ width: 1512, height: 864 })
    await preparePage(page, '/en/visuals/')

    await page.locator('[data-mobile-audit="visual-card"]').click()
    const exhibition = page.locator('#exhibition')
    const scrollRegion = page.locator('[data-mobile-audit="visuals-exhibition-scroll"]')
    const backToGallery = page.getByRole('button', { name: 'Back to Gallery' })

    await expect(exhibition).toBeVisible()
    await expect(scrollRegion).toBeVisible()

    const metrics = await scrollRegion.evaluate((element) => ({
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
    }))

    expect(metrics.scrollHeight).toBeGreaterThanOrEqual(metrics.clientHeight)
    if (metrics.scrollHeight > metrics.clientHeight) {
      await scrollRegion.evaluate((element) => {
        element.scrollTo({ top: 320, behavior: 'auto' })
      })
      await expect.poll(() => scrollRegion.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
    }
    await expect(backToGallery).toBeVisible()
  })

})
