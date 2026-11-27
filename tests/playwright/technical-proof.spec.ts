import { expect, test } from '@playwright/test'

const projects = [
  ['searchsignal', 2],
  ['relay', 2],
  ['data-brief-ai', 2],
] as const

for (const locale of ['es', 'en'] as const) {
  const prefix = locale === 'en' ? '/en' : ''

  for (const [slug, proofCount] of projects) {
    test(`${slug} shows sourced product evidence in ${locale}`, async ({ page }) => {
      await page.goto(`${prefix}/case-studies/${slug}/`, { waitUntil: 'networkidle' })

      const proofs = page.locator('.case-study-repository-proof')
      await expect(proofs).toHaveCount(proofCount)
      for (const proof of await proofs.all()) {
        const image = proof.locator('img')
        await image.scrollIntoViewIfNeeded()
        await expect.poll(() => image.evaluate((element) => {
          const photo = element as HTMLImageElement
          return photo.complete && photo.naturalWidth > 0
        })).toBe(true)
        await expect(proof.locator('figcaption a[href*="github.com/RaulMermans/"]')).toHaveCount(1)
      }

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        await page.evaluate(() => window.innerWidth),
      )
    })
  }
}
