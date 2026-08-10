import { expect, test } from '@playwright/test'

const locales = [
  { path: '/en/about/', title: 'RAÚL MERMANS' },
  { path: '/es/about/', title: 'RAÚL MERMANS' },
] as const

for (const locale of locales) {
  test(`About retains the clean landing in ${locale.path}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 960 })
    await page.goto(locale.path, { waitUntil: 'networkidle' })

    const hero = page.locator('.about-landing__hero')
    await expect(hero).toBeVisible()
    await expect(hero.getByRole('heading', { name: locale.title })).toBeVisible()
    await expect(hero.locator('.about-landing__portrait img')).toBeVisible()
    await expect(page.locator('.about-landing__proof-card')).toHaveCount(3)
    await expect(page.locator('.about-operating-profile')).toBeVisible()
    await expect(page.locator('.about-timeline__node')).toHaveCount(6)

    await expect(page.locator('.about-vocabulary')).toHaveCount(0)
    await expect(page.locator('.about-proof-links')).toHaveCount(0)

    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }))
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport)

    await hero.screenshot({ path: testInfo.outputPath(`about-${locale.path.includes('/en/') ? 'en' : 'es'}.png`) })
  })
}

test('About stays within the mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/about/', { waitUntil: 'networkidle' })

  await expect(page.locator('.about-landing__hero')).toBeVisible()
  await expect(page.locator('.about-landing__proof-card')).toHaveCount(3)

  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }))
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport)
})
