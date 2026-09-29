import { expect, test } from '@playwright/test'

for (const locale of ['en', 'es'] as const) {
  test(`cached photography images become visible after hydration in ${locale}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    const path = locale === 'en' ? '/en/photography/' : '/photography/'
    await page.goto(path, { waitUntil: 'networkidle' })
    await page.reload({ waitUntil: 'networkidle' })

    const firstImages = page.locator('.gallery__item img').first()
    await expect.poll(() => firstImages.evaluate((element) => {
      const image = element as HTMLImageElement
      return image.complete && image.naturalWidth > 0
    })).toBe(true)
    await expect(page.locator('.gallery__item').first()).toHaveClass(/loaded/)
    await expect(firstImages).toHaveCSS('opacity', '1')

    if (page.viewportSize()!.width < 768) {
      await page.locator('#photography-category-select').selectOption('architecture')
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    } else {
      await page.getByRole('tab', { name: locale === 'en' ? 'Architecture' : 'Arquitectura' }).click()
    }
    await expect(page.locator('#gallery-content')).toHaveAttribute('data-category', 'architecture')
    await expect(page.locator('.gallery__item').first()).toHaveClass(/loaded/)
    expect(errors).toEqual([])
  })
}
