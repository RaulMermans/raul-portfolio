import { expect, test } from '@playwright/test'

for (const viewport of [
  { name: 'desktop', width: 2048, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
] as const) {
  test(`Visuals footer ends the document on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/visuals', { waitUntil: 'networkidle' })
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))

    const bounds = await page.evaluate(() => {
      const footer = document.querySelector('footer')
      if (!footer) throw new Error('Footer was not rendered')

      const footerRect = footer.getBoundingClientRect()
      const footerBottom = footerRect.bottom + window.scrollY

      return {
        documentHeight: document.documentElement.scrollHeight,
        bodyHeight: document.body.scrollHeight,
        footerBottom,
      }
    })

    expect(Math.abs(bounds.documentHeight - bounds.footerBottom)).toBeLessThanOrEqual(1)
    expect(Math.abs(bounds.bodyHeight - bounds.documentHeight)).toBeLessThanOrEqual(1)
  })
}

test('closing the Visuals exhibition restores a valid footer scroll position', async ({ page }) => {
  await page.setViewportSize({ width: 2048, height: 1024 })
  await page.goto('/visuals', { waitUntil: 'networkidle' })
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))

  await page.locator('[data-mobile-audit="visual-card"]').click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Cerrar exposición' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)

  const state = await page.evaluate(() => ({
    scrollY: window.scrollY,
    maxScroll: Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
    bodyPosition: document.body.style.position,
    bodyTop: document.body.style.top,
    htmlOverflow: document.documentElement.style.overflow,
  }))

  expect(state.scrollY).toBeLessThanOrEqual(state.maxScroll)
  expect(state.bodyPosition).toBe('')
  expect(state.bodyTop).toBe('')
  expect(state.htmlOverflow).toBe('')
})
