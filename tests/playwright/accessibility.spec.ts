import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const criticalRoutes = [
  '/',
  '/en/',
  '/technical/',
  '/en/technical/',
  '/creative/',
  '/en/creative/',
  '/about/',
  '/en/about/',
  '/case-studies/',
  '/en/case-studies/',
  '/case-studies/opstwin/',
  '/photography/',
  '/en/photography/',
  '/photography/morocco/',
  '/en/photography/morocco/',
  '/photography/golden/',
  '/en/photography/golden/',
  '/visuals/',
  '/services/integraciones-ia/',
]

test.describe('Accessibility', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Axe is run once on Chromium in CI.')

  for (const path of criticalRoutes) {
    test(`${path} has no serious or critical axe violations`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' })

      const results = await new AxeBuilder({ page }).analyze()
      const blockingViolations = results.violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical'
      )

      expect(
        blockingViolations.map(({ id, impact, nodes }) => ({
          id,
          impact,
          targets: nodes.map((node) => node.target.join(' ')),
        }))
      ).toEqual([])
    })
  }

  test('service proof text remains readable on hover', async ({ page }) => {
    await page.goto('/services/integraciones-ia/', { waitUntil: 'domcontentloaded' })
    const proofCard = page.locator('a[class*="proofCard"]').first()
    await expect(proofCard).toBeVisible()
    await proofCard.hover()

    const results = await new AxeBuilder({ page }).include('a[class*="proofCard"]').analyze()
    expect(results.violations.filter(({ id }) => id === 'color-contrast')).toEqual([])
  })
})
