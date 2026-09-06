import { expect, test, type Page } from '@playwright/test'

async function expectHeaderState(page: Page, scrollY: number, hidden: boolean) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), scrollY)

  await expect.poll(async () => page.locator('header').getAttribute('data-hidden')).toBe(hidden ? 'true' : null)
}

for (const route of ['/', '/en/case-studies/opstwin'] as const) {
  test(`the header hides downwards and returns upwards on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(route, { waitUntil: 'networkidle' })

    await expect(page.locator('header')).not.toHaveAttribute('data-hidden', 'true')
    await expectHeaderState(page, 900, true)
    await expectHeaderState(page, 680, false)
    await expectHeaderState(page, 0, false)
  })
}

test('the mobile header remains available for its menu and keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/case-studies/opstwin', { waitUntil: 'networkidle' })

  await expectHeaderState(page, 900, true)
  await expectHeaderState(page, 680, false)

  const menuButton = page.getByRole('button', { name: 'Open menu' })
  await menuButton.focus()
  await expectHeaderState(page, 1200, false)

  await menuButton.click()
  await expect(page.getByRole('dialog', { name: 'Navigation' })).toBeVisible()
  await expect(page.locator('header')).not.toHaveAttribute('data-hidden', 'true')
})
