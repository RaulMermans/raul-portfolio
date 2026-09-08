import { expect, test } from '@playwright/test'

const routes = [
  '/en/',
  '/en/services/web-development/',
  '/en/about/',
  '/en/case-studies/',
  '/en/case-studies/remoria/',
  '/en/case-studies/opstwin/',
  '/en/apps/',
  '/en/photography/',
] as const

test.describe('Portfolio experience invariants', () => {
  for (const path of routes) {
    test(`${path} keeps the shared shell, readable type, and mobile-safe document`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path, { waitUntil: 'networkidle' })

      await expect(page.getByTestId('site-header')).toBeVisible()
      await expect(page.locator('main')).toBeVisible()

      const h1 = page.locator('h1:visible')
      await expect(h1).toHaveCount(1)
      await expect(h1).toHaveCSS('font-family', /bebasNeue|Bebas Neue|Impact/i)

      const metrics = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        bodyFontSize: Number.parseFloat(getComputedStyle(document.body).fontSize),
      }))
      expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth)
      expect(metrics.bodyFontSize).toBeGreaterThanOrEqual(16)

      await page.getByTestId('site-header').getByRole('link').first().focus()
      await expect(page.locator(':focus-visible')).toHaveCount(1)
    })
  }
})
