import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const criticalRoutes = [
  '/',
  '/en/',
  '/about/',
  '/en/about/',
  '/case-studies/',
  '/en/case-studies/',
  '/case-studies/opstwin/',
  '/photography/',
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
})
