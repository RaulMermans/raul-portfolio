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
  const isPhotoEssay = /\/photography\/[^/]+\/$/.test(path)
  await page.goto(path, { waitUntil: 'networkidle' })
  if (path.includes('/photography/')) {
    const images = page.locator(isPhotoEssay ? '[data-series-image]' : '[data-series-list] img')
    expect(await images.count()).toBeGreaterThan(0)
    if (!isPhotoEssay) {
      await images.evaluateAll((elements) => {
        for (const element of elements) (element as HTMLImageElement).loading = 'eager'
      })
      await expect.poll(() => images.evaluateAll((elements) => elements.every((element) => {
        const image = element as HTMLImageElement
        return image.complete && image.naturalWidth > 0
      })), { timeout: 30_000 }).toBe(true)
    } else {
      await expect.poll(() => images.first().evaluate((element) => {
        const image = element as HTMLImageElement
        return image.complete && image.naturalWidth > 0
      }), { timeout: 30_000 }).toBe(true)
    }
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
  if (path === '/en/about/' || path === '/about/') {
    const images = page.locator('main img')
    await images.evaluateAll((elements) => {
      for (const element of elements) (element as HTMLImageElement).loading = 'eager'
    })
    await expect.poll(() => images.evaluateAll((elements) => elements.every((element) => {
      const image = element as HTMLImageElement
      return image.complete && image.naturalWidth > 0
    }))).toBe(true)
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
  const repositoryProofs = page.locator('.case-study-repository-proof img')
  if (await repositoryProofs.count()) {
    await repositoryProofs.evaluateAll((images) => {
      for (const image of images) (image as HTMLImageElement).loading = 'eager'
    })
    await expect.poll(() => repositoryProofs.evaluateAll((images) => images.every((image) => {
      const element = image as HTMLImageElement
      return element.complete && element.naturalWidth > 0
    }))).toBe(true)
  }
  await page.addStyleTag({
    content: '*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }',
  })
  await page.evaluate(async () => document.fonts?.ready)
}

const routes = [
  ['home', '/en/'],
  ['technical', '/en/technical/'],
  ['creative', '/en/creative/'],
  ['services', '/en/services/web-development/'],
  ['about', '/en/about/'],
  ['case-studies', '/en/case-studies/'],
  ['creative-case-study', '/en/case-studies/remoria/'],
  ['bi-case-study', '/en/case-studies/opstwin/'],
  ['searchsignal-case-study', '/en/case-studies/searchsignal/'],
  ['relay-case-study', '/en/case-studies/relay/'],
  ['data-brief-ai-case-study', '/en/case-studies/data-brief-ai/'],
  ['halo-control', '/en/case-studies/halo-control/'],
  ['bi-notebook-lab', '/en/case-studies/bi-notebook-lab/'],
  ['apps', '/en/apps/'],
  ['photography', '/en/photography/'],
  ['photography-morocco', '/en/photography/morocco/'],
  ['photography-waterline', '/en/photography/the-waterline/'],
  ['photography-golden', '/en/photography/golden/'],
  ['visuals', '/en/visuals/'],
  ['ai-integrations-service', '/en/services/ai-integrations/'],
  ['brand-service', '/en/services/brand-systems/'],
  ['home-es', '/'],
  ['technical-es', '/technical/'],
  ['creative-es', '/creative/'],
  ['photography-es', '/photography/'],
  ['photography-morocco-es', '/photography/morocco/'],
  ['photography-waterline-es', '/photography/the-waterline/'],
  ['photography-golden-es', '/photography/golden/'],
  ['about-es', '/about/'],
  ['case-studies-es', '/case-studies/'],
  ['searchsignal-case-study-es', '/case-studies/searchsignal/'],
  ['relay-case-study-es', '/case-studies/relay/'],
  ['data-brief-ai-case-study-es', '/case-studies/data-brief-ai/'],
  ['halo-control-es', '/case-studies/halo-control/'],
  ['bi-notebook-lab-es', '/case-studies/bi-notebook-lab/'],
  ['apps-es', '/apps/'],
  ['visuals-es', '/visuals/'],
  ['ai-integrations-service-es', '/services/integraciones-ia/'],
  ['brand-service-es', '/services/sistemas-de-marca/'],
  ['data-service', '/en/services/creative-automation/'],
  ['data-service-es', '/services/automatizacion-creativa/'],
  ['ai-product-service', '/en/services/product-prototypes/'],
  ['ai-product-service-es', '/services/prototipos-producto-ia/'],
] as const

test.describe('Portfolio visual regression', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Visual baselines are owned by Chromium.')

  for (const [name, path] of routes) {
    test(`${name} is visually stable`, async ({ page }, testInfo) => {
      if (name.startsWith('photography') || path.includes('/case-studies/')) test.setTimeout(90_000)
      await prepare(page, path)
      const viewport = testInfo.project.name.includes('mobile') ? '390' : '1440'
      await expect(page).toHaveScreenshot(`${name}-${viewport}.png`, {
        animations: 'disabled',
        fullPage: !/\/photography\/[^/]+\/$/.test(path),
        caret: 'hide',
        timeout: 20_000,
        maxDiffPixelRatio: 0.01,
      })
    })
  }
})
