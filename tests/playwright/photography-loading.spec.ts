import { expect, test } from '@playwright/test'
import { PHOTOGRAPHY_IMAGES } from '../../data/photography'
import { PHOTOGRAPHY_SERIES } from '../../data/photography-series'

test('selected photo essays use unique photographs from the personal archive', () => {
  const allPhotos = Object.values(PHOTOGRAPHY_IMAGES).flat()
  const seriesPhotos = PHOTOGRAPHY_SERIES.flatMap((series) => series.photos)
  expect(PHOTOGRAPHY_SERIES.map((series) => series.slug)).toEqual(['morocco', 'the-waterline', 'golden'])
  expect(new Set(seriesPhotos.map((photo) => photo.src)).size).toBe(seriesPhotos.length)
  expect(seriesPhotos.every((photo) => allPhotos.includes(photo))).toBe(true)
  expect(allPhotos.some((photo) => photo.src.endsWith('/Street16.webp'))).toBe(false)
})

test('Waterline keeps the horizon edit and includes the new coastal rock', () => {
  const photos = PHOTOGRAPHY_SERIES.find((series) => series.slug === 'the-waterline')!.photos
  const sources = photos.map((photo) => photo.src)
  expect(sources).toContain('/images/photography/coast/DSCF9849.webp')
  for (const filename of ['Street20.webp', 'Street21.webp', 'DSCF9838.webp', 'DSCF9810.webp']) {
    expect(sources.some((source) => source.endsWith(`/${filename}`))).toBe(false)
  }
})

test('withdrawn waterfront sunset is not served', async ({ request }) => {
  for (const path of [
    '/images/photography/street/Street16.webp',
    '/images/derived/photography/street/Street16-768.webp',
  ]) {
    expect((await request.get(path)).status(), path).toBe(404)
  }
})

for (const locale of ['en', 'es'] as const) {
  const prefix = locale === 'en' ? '/en' : ''

  test(`withdrawn walking series is absent in ${locale}`, async ({ page }) => {
    await page.goto(`${prefix}/photography/`, { waitUntil: 'domcontentloaded' })
    await expect(page.locator(`[data-series-list] a[href="${prefix}/photography/on-foot/"]`)).toHaveCount(0)
    const response = await page.goto(`${prefix}/photography/on-foot/`, { waitUntil: 'domcontentloaded' })
    expect(response?.status()).toBe(404)
  })

  test(`photography index opens a series in ${locale}`, async ({ page }) => {
    await page.goto(`${prefix}/photography/`, { waitUntil: 'networkidle' })
    await expect(page.locator('[data-series-list] a')).toHaveCount(PHOTOGRAPHY_SERIES.length)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.locator('[data-series-list] a').first().click()
    await expect(page).toHaveURL(new RegExp(`${prefix}/photography/morocco/?$`), { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(locale === 'es' ? 'Marruecos' : 'Morocco')
  })

  test(`photography index opens Golden in ${locale}`, async ({ page }) => {
    await page.goto(`${prefix}/photography/`, { waitUntil: 'networkidle' })
    await page.locator(`[data-series-list] a[href="${prefix}/photography/golden/"]`).click()
    await expect(page).toHaveURL(new RegExp(`${prefix}/photography/golden/?$`))
    await expect(page.getByRole('heading', { name: 'Golden', level: 1 })).toBeVisible()
  })

  test(`series index and essay fit a narrow phone in ${locale}`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 })
    for (const path of [`${prefix}/photography/`, ...PHOTOGRAPHY_SERIES.map((series) => `${prefix}/photography/${series.slug}/`)]) {
      await page.goto(path, { waitUntil: 'domcontentloaded' })
      const heading = page.getByRole('heading', { level: 1 })
      await expect(heading).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      expect(await heading.evaluate((element) => element.getBoundingClientRect().bottom <= innerHeight)).toBe(true)
    }
  })

  test(`Golden cover reaches the first phone screen in ${locale}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${prefix}/photography/golden/`, { waitUntil: 'domcontentloaded' })
    const coverTop = await page.locator('[data-photography-essay="golden"] figure').first().evaluate((cover) => cover.getBoundingClientRect().top)
    expect(coverTop).toBeLessThan(844 * 0.4)
  })

  test(`morocco keeps its page height while photographs load in ${locale}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${prefix}/photography/morocco/`, { waitUntil: 'networkidle' })
    const images = page.locator('[data-series-image]')
    const before = await page.evaluate(() => document.documentElement.scrollHeight)
    await images.evaluateAll((elements) => {
      for (const image of elements) (image as HTMLImageElement).loading = 'eager'
    })
    await expect.poll(() => images.evaluateAll((elements) => elements.every((image) => {
      const photo = image as HTMLImageElement
      return photo.complete && photo.naturalWidth > 0
    })), { timeout: 30_000 }).toBe(true)
    const after = await page.evaluate(() => document.documentElement.scrollHeight)
    expect(Math.abs(after - before)).toBeLessThanOrEqual(1)
  })

  for (const series of PHOTOGRAPHY_SERIES) {
    test(`${series.slug} shows every frame in ${locale}`, async ({ page }) => {
      await page.goto(`${prefix}/photography/${series.slug}/`, { waitUntil: 'domcontentloaded' })
      const images = page.locator('[data-series-image]')
      await expect(images).toHaveCount(series.photos.length)
      await expect(page.getByTestId('site-header')).toHaveCount(0)
      await expect(page.locator('[data-photography-essay] .sequencePart figcaption')).toHaveCount(0)
      await expect(page.locator('[data-photography-essay] .sequencePart p')).toHaveCount(0)
      await expect(page.locator('[data-spread] [data-series-image]')).toHaveCount(series.photos.length - 1)
      const pair = page.locator('[data-spread="pair"]').first()
      await expect(pair).toBeVisible()
      const columns = await pair.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)
      expect(columns).toBe(page.viewportSize()!.width >= 768 ? 2 : 1)
      await expect.poll(() => images.first().evaluate((image) => {
        const element = image as HTMLImageElement
        return element.complete && element.naturalWidth > 0
      })).toBe(true)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      await expect(page.getByRole('link', { name: locale === 'es' ? /Todas las series/ : /All series/ }).first()).toBeVisible()
      const backWidth = await page.getByTestId('site-back-link').evaluate((element) => element.getBoundingClientRect().width)
      expect(backWidth).toBeLessThan(page.viewportSize()!.width * 0.7)
    })
  }
}
