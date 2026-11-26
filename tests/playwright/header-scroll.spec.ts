import { expect, test, type Page } from '@playwright/test'

async function scrollTo(page: Page, scrollY: number) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), scrollY)
}

async function expectHeaderState(page: Page, hidden: boolean) {
  const header = page.getByTestId('site-header')
  await expect(header).toHaveAttribute('data-hidden', String(hidden))
  await expect(header.locator('a')).toHaveCount(4)
  if (hidden) {
    await expect.poll(() => header.evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(0)
  } else {
    await expect.poll(() => header.evaluate((element) => element.getBoundingClientRect().bottom)).toBeGreaterThan(0)
  }
}

for (const route of ['/en/technical/', '/en/case-studies/opstwin'] as const) {
  test(`the minimal masthead hides down and returns up on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(route, { waitUntil: 'networkidle' })
    await scrollTo(page, 900)
    await expectHeaderState(page, true)
    await scrollTo(page, 680)
    await expectHeaderState(page, false)
    await expect(page.getByTestId('site-back-link')).toBeInViewport()
    await scrollTo(page, 0)
    await expectHeaderState(page, false)
  })
}

test('the mobile masthead returns when a hidden link receives focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/case-studies/opstwin', { waitUntil: 'networkidle' })
  await scrollTo(page, 900)
  await expectHeaderState(page, true)
  await expect(page.getByTestId('site-header').getByRole('button')).toHaveCount(0)
  await page.getByTestId('site-header').getByRole('link', { name: 'Home' }).focus()
  await expectHeaderState(page, false)
  await expect(page.locator(':focus-visible')).toHaveCount(1)
})

for (const { path, destination } of [
  { path: '/visuals/', destination: '/creative/' },
  { path: '/photography/morocco/', destination: '/photography/' },
  { path: '/case-studies/iris/', destination: '/technical/' },
  { path: '/case-studies/remoria/', destination: '/creative/' },
  { path: '/en/about/', destination: '/en/' },
] as const) {
  test(`back link on ${path} returns to its parent`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    await expect(page.getByTestId('site-back-link')).toHaveAttribute('href', destination)
  })
}
