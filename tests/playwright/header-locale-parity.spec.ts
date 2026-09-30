import { expect, test, type Page } from '@playwright/test'

async function headerMetrics(page: Page) {
  return page.getByTestId('site-header').evaluate((header) => {
    const style = getComputedStyle(header)
    const rect = (element: Element) => {
      const { x, y, width, height } = element.getBoundingClientRect()
      return { x, y, width, height }
    }
    return {
      surface: header.getAttribute('data-surface'),
      background: style.background,
      border: style.borderBottom,
      shadow: style.boxShadow,
      backdrop: style.backdropFilter,
      bounds: rect(header),
      links: Array.from(header.querySelectorAll('a'), rect),
      button: rect(header.querySelector('button')!),
    }
  })
}

for (const route of ['/', '/about/'] as const) {
  test(`language switching preserves header appearance and geometry on ${route}`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(route, { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    const spanish = await headerMetrics(page)
    const mobile = testInfo.project.name.includes('mobile')

    if (mobile) {
      await page.getByTestId('site-header').getByRole('button').click()
      await expect(page.getByRole('dialog')).toBeVisible()
      await page.getByRole('dialog').getByRole('link', { name: 'EN', exact: true }).click()
    } else {
      await page.getByTestId('site-header').getByRole('link', { name: 'EN', exact: true }).click()
    }
    await expect(page).toHaveURL(new RegExp(`/en${route}$`))
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByTestId('site-header')).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    const english = await headerMetrics(page)
    expect(english).toEqual(spanish)
    if (!mobile) {
      await expect(page.getByTestId('site-header').locator('a').last()).not.toHaveAttribute('aria-current', 'page')
      await expect(page.getByTestId('site-header').locator('a').nth(-2)).toHaveAttribute('aria-current', 'page')
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)

    if (mobile) {
      await page.getByTestId('site-header').getByRole('button').click()
      await expect(page.getByRole('dialog').getByRole('link', { name: 'Photography', exact: true })).toBeVisible()
      await expect(page.getByRole('dialog').getByRole('link', { name: 'EN', exact: true })).toHaveAttribute('aria-current', 'page')
      await page.keyboard.press('Escape')
      await expect(page.getByRole('dialog')).not.toBeVisible()
      await expect(page.getByTestId('site-header').getByRole('button')).toBeFocused()
    }
  })
}

test('tablet navigation keeps the same geometry in both languages', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 })
  await page.goto('/', { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  const spanish = await headerMetrics(page)
  await page.getByTestId('site-header').getByRole('link', { name: 'EN', exact: true }).click()
  await expect(page).toHaveURL(/\/en\/$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByTestId('site-header')).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
  expect(await headerMetrics(page)).toEqual(spanish)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
