import { expect, test } from '@playwright/test'

const routes = [
  '/en/technical/',
  '/en/services/web-development/',
  '/en/about/',
  '/en/case-studies/',
  '/en/case-studies/remoria/',
  '/en/case-studies/opstwin/',
  '/en/apps/',
  '/en/photography/',
] as const

test.describe('Portfolio experience invariants', () => {
  test('shared footer name and details stay inside their columns', async ({ page }) => {
    for (const width of [1440, 390, 360]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/en/case-studies/local-ai-coding-agent/', { waitUntil: 'networkidle' })

      const bounds = await page.evaluate(() => {
        const footer = document.querySelector('.footer__inner')!.getBoundingClientRect()
        const name = document.querySelector('.footer__name-lockup')!.getBoundingClientRect()
        const nameLine = document.querySelector('.footer__name-lockup span:last-child')!.getBoundingClientRect()
        const meta = document.querySelector('.footer__meta')!.getBoundingClientRect()
        return { footerRight: footer.right, nameRight: name.right, nameLineRight: nameLine.right, nameBottom: name.bottom, metaLeft: meta.left, metaTop: meta.top }
      })

      expect(bounds.nameLineRight).toBeLessThanOrEqual(bounds.footerRight + 1)
      if (width > 1050) expect(bounds.nameLineRight).toBeLessThanOrEqual(bounds.metaLeft + 1)
      else expect(bounds.nameBottom).toBeLessThanOrEqual(bounds.metaTop + 1)
    }
  })

  for (const path of routes) {
    test(`${path} keeps the shared shell, readable type, and mobile-safe document`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path, { waitUntil: 'networkidle' })

      await expect(page.getByTestId('site-header')).toBeVisible()
      await expect(page.locator('main')).toBeVisible()

      const h1 = page.locator('h1:visible')
      await expect(h1).toHaveCount(1)
      await expect(h1).toHaveCSS('font-family', /instrumentSerif/i)

      const h2 = page.locator('main h2:visible').first()
      await expect(h2).toHaveCSS('font-family', /instrumentSerif/i)

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
