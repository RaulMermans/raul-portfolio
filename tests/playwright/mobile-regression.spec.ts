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
  test('homepage hero remains readable on mobile', async ({ page }) => {
    await preparePage(page, '/en/')

    const hero = page.locator('[data-home-section="hero"]')
    const heroCtas = hero.locator('[data-mobile-audit="hero-cta"]')
    await expect(heroCtas).toHaveCount(2)
    await expect(hero.getByRole('link', { name: 'Explore what I’m building' })).toBeVisible()
    await expect(hero.getByRole('link', { name: 'Work with me' })).toBeVisible()
    await expect(hero.getByRole('link', { name: /GitHub/i })).toHaveCount(0)

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

  test('the Building now section is prominent and localized', async ({ page }) => {
    await preparePage(page, '/en/')

    const buildingNow = page.locator('#building-now')
    await buildingNow.scrollIntoViewIfNeeded()
    await expect(buildingNow.getByRole('heading', { name: 'An independent practice with room to grow.' })).toBeVisible()
    await expect(buildingNow.getByText('Selected founder collaborations')).toBeVisible()

    await preparePage(page, '/es/')
    const spanishBuildingNow = page.locator('#building-now')
    await spanishBuildingNow.scrollIntoViewIfNeeded()
    await expect(spanishBuildingNow.getByRole('heading', { name: 'Una práctica independiente con espacio para crecer.' })).toBeVisible()
    await expect(spanishBuildingNow.getByText('Colaboraciones seleccionadas con fundadores')).toBeVisible()
  })

  test('mobile menu opens as a modal and restores focus when closed', async ({ page }) => {
    await preparePage(page, '/en/')

    const trigger = page.getByRole('button', { name: 'Open menu' })
    await trigger.click()

    const dialog = page.getByRole('dialog', { name: 'Navigation' })
    await expect(dialog).toBeVisible()
    await expect.poll(async () => {
      return page.evaluate(() => getComputedStyle(document.body).position)
    }).toBe('fixed')

    const dialogBounds = await dialog.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      return { left: rect.left, right: rect.right, viewportWidth: window.innerWidth }
    })
    expect(dialogBounds.left).toBeGreaterThanOrEqual(0)
    expect(dialogBounds.right).toBeLessThanOrEqual(dialogBounds.viewportWidth)
    expect(dialogBounds.right - dialogBounds.left).toBeGreaterThanOrEqual(dialogBounds.viewportWidth * 0.8)

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })

  test('homepage section cards are direct, aligned links on mobile', async ({ page }) => {
    await preparePage(page, '/en/')

    const workSection = page.locator('[data-home-section="work"]')
    await workSection.scrollIntoViewIfNeeded()
    const cardList = workSection.locator('[data-mobile-audit="section-card-list"]')
    const cards = cardList.getByRole('link')

    await expect(cardList).toBeVisible()
    await expect(cards).toHaveCount(4)
    const overflow = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    }))
    expect(overflow.documentWidth).toBeLessThanOrEqual(overflow.viewportWidth)

    await cards.first().focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/en\/case-studies\/?$/)
  })

  test('homepage section carousel remains available on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await preparePage(page, '/en/')

    const workSection = page.locator('[data-home-section="work"]')
    await workSection.scrollIntoViewIfNeeded()

    await expect(workSection.getByRole('button', { name: /Next section:/ })).toBeVisible()
    await expect(workSection.getByRole('button', { name: /Previous section:/ })).toBeVisible()
    await expect(workSection.locator('[data-mobile-audit="section-card-list"]')).toBeHidden()
  })

  test('case studies landing is a thumbnail-led gallery on mobile', async ({ page }) => {
    await preparePage(page, '/en/case-studies/')

    const grid = page.locator('[data-mobile-audit="case-study-grid"]')
    const firstCard = grid.locator('[data-mobile-audit="case-study-card"]').first()

    await expect(firstCard).toBeVisible()
    await expect(firstCard.locator('.case-study-project-tile__title')).toBeVisible()
    await expect(firstCard.locator('.case-study-project-tile__description')).toHaveCount(0)
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
    expect(initialLayout.frameRatio).toBeCloseTo(1672 / 941, 2)
    expect(initialLayout.documentWidth).toBeLessThanOrEqual(initialLayout.viewportWidth)
  })

  test('visuals surface only navigates on horizontal intent', async ({ page }) => {
    await preparePage(page, '/en/visuals/')

    const readTitle = async () => page.locator('[data-mobile-audit="visual-card"] h2').innerText()

    const firstTitle = await readTitle()

    await swipeSurface(page, 0, 120)
    await expect.poll(readTitle).toBe(firstTitle)

    await swipeSurface(page, -120, 12)
    await expect.poll(readTitle).not.toBe(firstTitle)
  })

  test('visuals surface ignores diagonal downward swipes so page scroll can win', async ({ page }) => {
    await preparePage(page, '/en/visuals/')

    const readTitle = async () => page.locator('[data-mobile-audit="visual-card"] h2').innerText()
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

    expect(metrics.scrollHeight).toBeGreaterThan(metrics.clientHeight)

    await scrollRegion.evaluate((element) => {
      element.scrollTo({ top: 320, behavior: 'auto' })
    })

    await expect.poll(() => scrollRegion.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
    await expect(backToGallery).toBeVisible()
  })

  test('contact section stays visible and usable on mobile', async ({ page }) => {
    await preparePage(page, '/en/')

    const contact = page.locator('#contact')
    await contact.scrollIntoViewIfNeeded()
    await expect(contact).toBeVisible()
    await expect(contact.getByRole('link', { name: /email/i })).toBeVisible()
  })
})
