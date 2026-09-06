import { expect, test } from '@playwright/test'

test.describe('SearchSignal case study', () => {
  test('keeps its product story readable on a phone viewport', async ({ page }, testInfo) => {
    await page.goto('/en/case-studies/searchsignal/', { waitUntil: 'networkidle' })

    const hero = page.locator('.searchsignal-hero')
    await expect(hero).toHaveClass(/data-brief-hero/)
    await expect(page.getByRole('heading', { name: 'SearchSignal' })).toBeVisible()
    await expect(page.locator('#searchsignal-title > span')).toHaveCount(2)
    await expect(page.getByText('Search quality starts before search.')).toBeVisible()
    await expect(page.getByLabel('Project links').getByRole('link', { name: 'Open live demonstrator' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'A visible path from source record to search result.' })).toBeVisible()
    await expect(page.locator('#premise-heading')).toHaveCSS('text-transform', 'uppercase')
    await expect(page.locator('#premise-heading')).toHaveCSS('font-family', /bebasNeue|Bebas Neue|Impact/i)

    const viewport = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    }))
    expect(viewport.documentWidth).toBeLessThanOrEqual(viewport.viewportWidth)

    await page.screenshot({ path: testInfo.outputPath(`searchsignal-mobile-${testInfo.project.name}.png`), fullPage: false })
  })

  test('keeps its workflow and evidence visible on desktop', async ({ baseURL, browser }, testInfo) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
    const page = await context.newPage()
    if (!baseURL) throw new Error('Playwright baseURL is required for the desktop SearchSignal check')
    await page.goto(`${baseURL}/en/case-studies/searchsignal/`, { waitUntil: 'networkidle' })

    const metadata = page.locator('.searchsignal-meta')
    await expect(metadata).toBeVisible()
    await expect(metadata.locator('div')).toHaveCount(4)
    await expect(page.locator('.searchsignal-pipeline li')).toHaveCount(8)
    await expect(page.getByText('340', { exact: true })).toBeVisible()

    const viewport = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    }))
    expect(viewport.documentWidth).toBeLessThanOrEqual(viewport.viewportWidth)

    await page.screenshot({ path: testInfo.outputPath(`searchsignal-desktop-${testInfo.project.name}.png`), fullPage: false })
    await context.close()
  })
})
