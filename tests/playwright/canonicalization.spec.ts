import { expect, test } from '@playwright/test'

const localizedRoutes = [
  ['/', 'es', 'https://www.raulmermans.com/'],
  ['/about/', 'es', 'https://www.raulmermans.com/about/'],
  ['/case-studies/', 'es', 'https://www.raulmermans.com/case-studies/'],
  ['/en/', 'en', 'https://www.raulmermans.com/en/'],
  ['/en/about/', 'en', 'https://www.raulmermans.com/en/about/'],
  ['/en/case-studies/', 'en', 'https://www.raulmermans.com/en/case-studies/'],
] as const

test.describe('Canonical document contract', () => {
  for (const [path, language, canonical] of localizedRoutes) {
    test(`${path} ships its ${language} document metadata`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' })

      await expect(page.locator('html')).toHaveAttribute('lang', language)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical)
      await expect(page.locator('link[hreflang="en-US"]')).toHaveCount(1)
      await expect(page.locator('link[hreflang="es-ES"]')).toHaveCount(1)
      await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1)
    })
  }

  test('carousel clones do not expose focusable links', async ({ page }) => {
    await page.goto('/en/', { waitUntil: 'networkidle' })

    const cloneLinks = page.locator('[data-carousel-clone] a')
    await expect(cloneLinks).toHaveCount(0)
  })

  test('case-study hierarchy keeps selected work first', async ({ page }) => {
    await page.goto('/en/case-studies/', { waitUntil: 'domcontentloaded' })

    const groups = page.locator('.case-study-gallery-group')
    await expect(groups).toHaveCount(3)
    await expect(groups.nth(0).getByRole('heading')).toHaveText('Selected projects')
    await expect(groups.nth(0).locator('[data-mobile-audit="case-study-card"]')).toHaveCount(4)
  })
})
