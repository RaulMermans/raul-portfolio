import { expect, test, type Locator, type Page } from '@playwright/test'

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

async function expectStableScreenshot(locator: Locator, name: string) {
  await expect(locator).toHaveScreenshot(name, {
    animations: 'disabled',
    caret: 'hide',
    scale: 'device',
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
    await preparePage(page, '/')

    const hero = page.locator('[data-home-section="hero"]')
    await expect(hero.getByRole('link', { name: 'View Work' })).toBeVisible()
    await expect(hero.getByRole('link', { name: 'Get in Touch' })).toBeVisible()

    await expectStableScreenshot(hero, 'home-hero.png')
  })

  test('mobile menu opens as a modal and restores focus when closed', async ({ page }) => {
    await preparePage(page, '/')

    const trigger = page.getByRole('button', { name: 'Open menu' })
    await trigger.click()

    const dialog = page.getByRole('dialog', { name: 'Navigation' })
    await expect(dialog).toBeVisible()
    await expect.poll(async () => {
      return page.evaluate(() => getComputedStyle(document.body).position)
    }).toBe('fixed')

    await expectStableScreenshot(page.locator('body'), 'mobile-nav-open.png')

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })

  test('homepage work rail keeps explicit affordance on mobile', async ({ page }) => {
    await preparePage(page, '/')

    const workSection = page.locator('[data-home-section="work"]')
    await workSection.scrollIntoViewIfNeeded()
    await expect(page.getByRole('button', { name: 'Next card' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Previous card' })).toBeVisible()

    await expectStableScreenshot(workSection, 'home-work-rail.png')
  })

  test('visuals surface only navigates on horizontal intent', async ({ page }) => {
    await preparePage(page, '/visuals')

    const readTitle = async () => page.locator('[data-mobile-audit="visual-card"] h2').innerText()

    const firstTitle = await readTitle()

    await swipeSurface(page, 0, 120)
    await expect.poll(readTitle).toBe(firstTitle)

    await swipeSurface(page, -120, 12)
    await expect.poll(readTitle).not.toBe(firstTitle)
  })

  test('visuals surface ignores diagonal downward swipes so page scroll can win', async ({ page }) => {
    await preparePage(page, '/visuals')

    const readTitle = async () => page.locator('[data-mobile-audit="visual-card"] h2').innerText()
    const firstTitle = await readTitle()

    await swipeSurface(page, -96, 84)
    await expect.poll(readTitle).toBe(firstTitle)
  })

  test('visuals gallery and exhibition remain stable on mobile', async ({ page }) => {
    await preparePage(page, '/visuals')

    const surface = page.locator('[data-mobile-audit="visuals-surface"]')
    await expectStableScreenshot(surface, 'visuals-surface.png')

    await page.locator('[data-mobile-audit="visual-card"]').click()
    const exhibition = page.locator('#exhibition')
    await expect(exhibition).toBeVisible()

    await expectStableScreenshot(exhibition, 'visuals-exhibition.png')
  })

  test('visuals exhibition details stay scrollable once opened', async ({ page }) => {
    await preparePage(page, '/visuals')

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
    await preparePage(page, '/visuals')

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
    await preparePage(page, '/')

    const contact = page.locator('#contact')
    await contact.scrollIntoViewIfNeeded()
    await expect(contact.getByRole('heading', { name: "Let's Work Together" })).toBeVisible()

    await expectStableScreenshot(contact, 'home-contact.png')
  })
})
