import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { PROJECT_EXPERIENCE } from '../../data/portfolio-experience'

const technicalSlugs = PROJECT_EXPERIENCE
  .filter((project) => project.primaryDiscipline !== 'creative')
  .map((project) => project.slug)

for (const locale of ['es', 'en'] as const) {
  const prefix = locale === 'en' ? '/en' : ''

  for (const slug of technicalSlugs) {
    test(`${slug} has reachable chapters and loaded proof in ${locale}`, async ({ page }) => {
      test.setTimeout(90_000)
      await page.goto(`${prefix}/case-studies/${slug}/`, { waitUntil: 'domcontentloaded' })

      const main = page.locator('main')
      const chapterLinks = main.locator('[data-case-study-mini-nav] a[href^="#"]')
      const destinations = await chapterLinks.evaluateAll((links) =>
        links.map((link) => link.getAttribute('href')?.slice(1) ?? ''),
      )

      expect(destinations.length, `${slug}: chapter navigation`).toBeGreaterThan(0)
      for (const destination of destinations) {
        expect(destination, `${slug}: empty chapter target`).not.toBe('')
        await expect(main.locator(`[id="${destination}"]`), `${slug}: #${destination}`).toHaveCount(1)
      }

      const inPageTargets = await main.locator('a[href^="#"]').evaluateAll((links) =>
        links.map((link) => link.getAttribute('href')?.slice(1) ?? ''),
      )
      for (const destination of inPageTargets) {
        expect(destination, `${slug}: empty in-page target`).not.toBe('')
        await expect(page.locator(`[id="${destination}"]`), `${slug}: broken #${destination} link`).toHaveCount(1)
      }

      const images = main.locator('img')
      await images.evaluateAll((elements) => {
        for (const element of elements) (element as HTMLImageElement).loading = 'eager'
      })
      await expect.poll(
        () => images.evaluateAll((elements) => elements.every((element) => {
          const image = element as HTMLImageElement
          return image.complete && image.naturalWidth > 0
        })),
        { timeout: 20_000, message: `${slug}: all case-study images should load` },
      ).toBe(true)

      const layout = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }))
      expect(layout.documentWidth, `${slug}: horizontal overflow`).toBeLessThanOrEqual(layout.viewportWidth)

      if (locale === 'es' && page.viewportSize()?.width === 1440) {
        const results = await new AxeBuilder({ page }).include('main').analyze()
        const blocking = results.violations.filter((violation) =>
          violation.impact === 'serious' || violation.impact === 'critical',
        )
        expect(blocking.map((violation) => ({
          id: violation.id,
          count: violation.nodes.length,
          targets: violation.nodes.slice(0, 5).map((node) => node.target.join(' ')),
        })), `${slug}: blocking accessibility violations`).toEqual([])
      }
    })
  }
}
