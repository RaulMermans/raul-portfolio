import { expect, test } from '@playwright/test'

declare global {
  interface Window {
    portfolioLayoutShift: number
  }
}

for (const locale of ['en', 'es'] as const) {
  test(`positioning surfaces avoid major layout shifts in ${locale}`, async ({ page }) => {
    await page.addInitScript(() => {
      const metrics = window
      metrics.portfolioLayoutShift = 0
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean }
          if (!shift.hadRecentInput) metrics.portfolioLayoutShift += shift.value
        }
      }).observe({ type: 'layout-shift', buffered: true })
    })
    const prefix = locale === 'en' ? '/en' : ''
    for (const path of [`${prefix}/`, `${prefix}/case-studies/local-ai-coding-agent/`, `${prefix}/case-studies/iris/`]) {
      await page.goto(path, { waitUntil: 'networkidle' })
      await page.evaluate(async () => document.fonts.ready)
      const shift = await page.evaluate(() => window.portfolioLayoutShift)
      expect(shift, `${path} should stay within the good CLS threshold`).toBeLessThanOrEqual(0.1)
    }
  })
}
