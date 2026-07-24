import { expect, test, type Page } from '@playwright/test'

async function preparePage(page: Page, path: string) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(path, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
  await page.evaluate(async () => {
    if ('fonts' in document) await document.fonts.ready
  })
}

test('Building now keeps the bold display font clear of adjacent copy on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 980 })
  await preparePage(page, '/en/')

  const metrics = await page.locator('#building-now').evaluate((section) => {
    const title = section.querySelector('h2')
    const body = section.querySelector('p:not([class*=eyebrow])')

    if (!(title instanceof HTMLElement) || !(body instanceof HTMLElement)) {
      throw new Error('Building now title or body is missing')
    }

    const titleRect = title.getBoundingClientRect()
    const bodyRect = body.getBoundingClientRect()

    return {
      documentWidth: document.documentElement.scrollWidth,
      headingFont: getComputedStyle(title).fontFamily,
      intersects: titleRect.right > bodyRect.left && titleRect.bottom > bodyRect.top,
      viewportWidth: window.innerWidth,
    }
  })

  expect(metrics.headingFont).toContain('Bebas Neue')
  expect(metrics.intersects).toBe(false)
  expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth)
})

for (const [locale, path] of [
  ['English', '/en/'],
  ['Spanish', '/es/'],
] as const) {
  test(`Building now anchor clears the fixed header on mobile in ${locale}`, async ({ page }) => {
    await preparePage(page, path)

    const metrics = await page.locator('#building-now').evaluate((section) => {
      section.scrollIntoView({ block: 'start' })

      const header = document.querySelector('header')
      const eyebrow = section.querySelector('p')
      const title = section.querySelector('h2')
      const body = section.querySelector('p:not([class*=eyebrow])')

      if (
        !(header instanceof HTMLElement) ||
        !(eyebrow instanceof HTMLElement) ||
        !(title instanceof HTMLElement) ||
        !(body instanceof HTMLElement)
      ) {
        throw new Error('Building now mobile audit elements are missing')
      }

      const headerRect = header.getBoundingClientRect()
      const eyebrowRect = eyebrow.getBoundingClientRect()
      const titleRect = title.getBoundingClientRect()
      const bodyRect = body.getBoundingClientRect()

      return {
        documentWidth: document.documentElement.scrollWidth,
        eyebrowTop: eyebrowRect.top,
        headerBottom: headerRect.bottom,
        titleBottom: titleRect.bottom,
        bodyTop: bodyRect.top,
        viewportWidth: window.innerWidth,
      }
    })

    expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth)
    expect(metrics.eyebrowTop).toBeGreaterThanOrEqual(metrics.headerBottom)
    expect(metrics.titleBottom).toBeLessThanOrEqual(metrics.bodyTop)
  })
}
