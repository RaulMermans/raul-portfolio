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
  if (path === '/en/case-studies/' || path === '/case-studies/') {
    // Case-study index thumbnails below the fold are lazy in the live page.
    // Load them before capturing a full-page baseline so the gallery is visible.
    const thumbnails = page.locator('#case-study-grid img')
    if (await thumbnails.count()) {
      await thumbnails.evaluateAll((images) => {
        for (const image of images) (image as HTMLImageElement).loading = 'eager'
      })
      await expect.poll(() => thumbnails.evaluateAll((images) => images.every((image) => {
        const element = image as HTMLImageElement
        return element.complete && element.naturalWidth > 0
      }))).toBe(true)
    }
  }
  if (path.includes('/bi-notebook-lab/')) {
    const proofImages = page.locator('.independent-system-proof img')
    await proofImages.evaluateAll((images) => {
      for (const image of images) (image as HTMLImageElement).loading = 'eager'
    })
    await expect.poll(() => proofImages.evaluateAll((images) => images.every((image) => {
      const element = image as HTMLImageElement
      return element.complete && element.naturalWidth > 0
    }))).toBe(true)
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
  ['halo-control', '/en/case-studies/halo-control/'],
  ['bi-notebook-lab', '/en/case-studies/bi-notebook-lab/'],
  ['apps', '/en/apps/'],
  ['photography', '/en/photography/'],
  ['home-es', '/'],
  ['about-es', '/about/'],
  ['case-studies-es', '/case-studies/'],
  ['halo-control-es', '/case-studies/halo-control/'],
  ['bi-notebook-lab-es', '/case-studies/bi-notebook-lab/'],
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
