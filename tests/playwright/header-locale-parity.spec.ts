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
      bounds: rect(header),
      links: Array.from(header.querySelectorAll('a'), (link, index) => {
        const bounds = rect(link)
        return index === 1 ? { center: Math.round(bounds.x + bounds.width / 2), y: bounds.y, height: bounds.height } : bounds
      }),
    }
  })
}

for (const route of ['/technical/', '/about/'] as const) {
  test(`minimal masthead keeps its geometry when switching language on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'load' })
    const header = page.getByTestId('site-header')
    await expect(header.locator('a')).toHaveCount(4)
    await expect(header.locator('a').first()).toHaveText('Raúl Mermans')
    await expect(header.getByRole('navigation')).toHaveCount(0)
    await expect(header.getByRole('button')).toHaveCount(0)
    const spanish = await headerMetrics(page)

    await header.getByRole('link', { name: 'EN', exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/en${route}$`))
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByTestId('site-header').getByRole('link', { name: 'EN', exact: true })).toHaveAttribute('aria-current', 'page')
    expect(await headerMetrics(page)).toEqual(spanish)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

test('tablet masthead keeps the same geometry in both languages', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 })
  await page.goto('/technical/', { waitUntil: 'load' })
  const spanish = await headerMetrics(page)
  await page.getByTestId('site-header').getByRole('link', { name: 'EN', exact: true }).click()
  await expect(page).toHaveURL(/\/en\/technical\/$/)
  expect(await headerMetrics(page)).toEqual(spanish)
})

test('masthead controls stay separated on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 })
  await page.goto('/technical/', { waitUntil: 'load' })
  const links = await page.getByTestId('site-header').locator('a').evaluateAll((elements) => elements.map((element) => {
    const { left, right } = element.getBoundingClientRect()
    return { left, right }
  }))
  for (let index = 1; index < links.length; index++) expect(links[index].left - links[index - 1].right).toBeGreaterThanOrEqual(8)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
})

test('technical and creative titles include the name once in both languages', async ({ page }) => {
  for (const [path, title] of [
    ['/technical/', 'Portfolio técnico | Raúl Mermans'],
    ['/creative/', 'Portfolio creativo | Raúl Mermans'],
    ['/en/technical/', 'Technical Portfolio | Raúl Mermans'],
    ['/en/creative/', 'Creative Portfolio | Raúl Mermans'],
  ]) {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveTitle(title)
  }
})

test('four-link navigation is absent throughout the public site', async ({ page }) => {
  for (const route of ['/technical/', '/creative/', '/about/', '/photography/', '/case-studies/iris/', '/apps/', '/visuals/']) {
    await page.goto(route, { waitUntil: 'domcontentloaded' })
    const header = page.getByTestId('site-header')
    await expect(header.locator('a')).toHaveCount(4)
    await expect(header.locator('nav, button')).toHaveCount(0)
  }
})
