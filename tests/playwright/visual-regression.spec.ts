import { expect, test, type Page } from '@playwright/test'

const FIXED_DATE_ISO = '2026-03-16T10:00:00.000Z'

async function prepare(page: Page, path: string) {
  await page.addInitScript((date) => {
    const nativeNow = Date.now
    Date.now = () => new Date(date).valueOf()
    window.Math.random = () => 0.5
    void nativeNow
  }, FIXED_DATE_ISO)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(path, { waitUntil: 'networkidle' })
  const isPhotography = path.includes('/photography/')
  if (isPhotography) {
    const images = page.locator('.gallery__item img')
    const count = await images.count()
    expect(count).toBeGreaterThan(0)
    await images.evaluateAll((elements) => {
      for (const element of elements) (element as HTMLImageElement).loading = 'eager'
    })
    await expect.poll(() => images.evaluateAll((elements) => elements.every((element) => {
      const image = element as HTMLImageElement
      return image.complete && image.naturalWidth > 0
    }))).toBe(true)
    await expect(page.locator('.gallery__item.loaded')).toHaveCount(count)
  }
  await page.addStyleTag({
    // Screenshot capture finishes finite reveal animations. Resetting them to
    // `none` returns gallery cards to their authored initial opacity of zero.
    content: `*, *::before, *::after { ${isPhotography ? '' : 'animation: none !important;'} transition: none !important; caret-color: transparent !important; }`,
  })
  await page.evaluate(async () => document.fonts?.ready)
}

const routes = [
  ['home', '/en/'],
  ['services', '/en/services/web-development/'],
  ['about', '/en/about/'],
  ['case-studies', '/en/case-studies/'],
  ['creative-case-study', '/en/case-studies/remoria/'],
  ['bi-case-study', '/en/case-studies/opstwin/'],
  ['apps', '/en/apps/'],
  ['photography', '/en/photography/'],
  ['home-es', '/'],
  ['about-es', '/about/'],
  ['case-studies-es', '/case-studies/'],
  ['apps-es', '/apps/'],
  ['data-service', '/en/services/creative-automation/'],
  ['data-service-es', '/services/automatizacion-creativa/'],
  ['ai-product-service', '/en/services/product-prototypes/'],
  ['ai-product-service-es', '/services/prototipos-producto-ia/'],
] as const

test.describe('Portfolio visual regression', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Visual baselines are owned by Chromium.')

  for (const [name, path] of routes) {
    test(`${name} is visually stable`, async ({ page }, testInfo) => {
      await prepare(page, path)
      const viewport = testInfo.project.name.includes('mobile') ? '390' : '1440'
      await expect(page).toHaveScreenshot(`${name}-${viewport}.png`, {
        animations: 'disabled',
        fullPage: true,
        caret: 'hide',
        timeout: 20_000,
        maxDiffPixelRatio: 0.01,
      })
    })
  }
})
