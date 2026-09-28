import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { join } from 'node:path'
import { getCaseStudies } from '../../data/case-studies'
import { SYSTEM_COLLECTIONS, SELECTED_SYSTEM_SLUGS, independentSystems } from '../../data/independent-systems'
import { getApps } from '../../data/apps'
import { siteCopy } from '../../data/site-copy'
import { serviceLandings } from '../../data/service-landings'
import { switchLocalePath } from '../../lib/i18n'

const sectionScreenshotStyles = join(__dirname, 'section-screenshot.css')

function structure(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(structure)
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, structure(item)]))
  return typeof value
}

test('canonical content keeps equivalent locale structures and exhaustive editorial tiers', () => {
  expect(structure(siteCopy.en)).toEqual(structure(siteCopy.es))
  expect(getApps('en').map((app) => app.slug)).toEqual(getApps('es').map((app) => app.slug))
  expect(getCaseStudies('en').map((study) => study.slug)).toEqual(getCaseStudies('es').map((study) => study.slug))
  const tierSlugs = SYSTEM_COLLECTIONS.flatMap((tier) => [...tier.slugs])
  expect(new Set(tierSlugs).size).toBe(tierSlugs.length)
  expect([...tierSlugs].sort()).toEqual(getCaseStudies('en').map((study) => study.slug).sort())
  for (const system of Object.values(independentSystems)) {
    expect(system.en.chapters.map((chapter) => chapter.id)).toEqual(system.es.chapters.map((chapter) => chapter.id))
    expect(structure(system.en.snapshot)).toEqual(structure(system.es.snapshot))
  }
  for (const service of serviceLandings.filter((item) => item.locale === 'en')) {
    const equivalent = serviceLandings.find((item) => item.href === service.alternateHref)
    expect(equivalent).toBeDefined()
    expect(structure(service)).toEqual(structure(equivalent))
    expect(switchLocalePath(service.href, 'es')).toBe(service.alternateHref)
  }
})

for (const locale of ['en', 'es'] as const) {
  const prefix = locale === 'en' ? '/en' : ''
  test(`selected systems and new cases fit the tablet viewport in ${locale}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'One tablet run per locale is sufficient.')
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const path of [`${prefix}/`, `${prefix}/case-studies/local-ai-coding-agent/`, `${prefix}/case-studies/iris/`]) {
      await page.goto(path, { waitUntil: 'networkidle' })
      const dimensions = await page.evaluate(() => ({ actual: document.documentElement.scrollWidth, viewport: innerWidth }))
      expect(dimensions.actual).toBeLessThanOrEqual(dimensions.viewport)
      await expect(page.locator('h1')).toBeVisible()
      if (path === `${prefix}/`) {
        const origins = await page.locator('[data-selected-system]').evaluateAll((cards) => cards.map((card) => ({
          title: card.querySelector('h3')!.getBoundingClientRect().top,
          body: card.querySelector('h3 + p')!.getBoundingClientRect().top,
        })))
        for (const index of [0, 2]) {
          expect(Math.abs(origins[index].title - origins[index + 1].title)).toBeLessThanOrEqual(1)
          expect(Math.abs(origins[index].body - origins[index + 1].body)).toBeLessThanOrEqual(1)
        }
        await expect(page.locator('#selected-systems')).toHaveScreenshot(`selected-systems-${locale}-tablet.png`, {
          animations: 'disabled', timeout: 15000,
          stylePath: sectionScreenshotStyles,
        })
      }
    }
  })

  test(`home presents four systems and preserves creative paths in ${locale}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(`${prefix}/`, { waitUntil: 'networkidle' })
    expect(await page.locator('[data-selected-system]').evaluateAll((cards) => cards.map((card) => card.getAttribute('data-selected-system')))).toEqual([...SELECTED_SYSTEM_SLUGS])
    await expect(page.locator('a[href*="/photography"]').first()).toBeAttached()
    await expect(page.locator('a[href*="/visuals"]').first()).toBeAttached()
    await expect(page.locator('body')).not.toContainText(/Q3 2026|T3 2026/)
    const rows = await page.locator('[data-selected-system]').evaluateAll((cards) => cards.map((card) => ({
      left: card.getBoundingClientRect().left,
      top: card.getBoundingClientRect().top,
      title: card.querySelector('h3')!.getBoundingClientRect().top,
      body: card.querySelector('h3 + p')!.getBoundingClientRect().top,
    })))
    if (rows[0].left !== rows[1].left) {
      for (const index of [0, 2]) {
        expect(Math.abs(rows[index].title - rows[index + 1].title)).toBeLessThanOrEqual(1)
        expect(Math.abs(rows[index].body - rows[index + 1].body)).toBeLessThanOrEqual(1)
      }
    }
    const accessibility = await new AxeBuilder({ page }).include('#selected-systems').analyze()
    expect(accessibility.violations).toEqual([])
    await expect(page.locator('#selected-systems')).toHaveScreenshot(`selected-systems-${locale}.png`, {
      animations: 'disabled',
      timeout: 15000,
      // Isolated section captures exclude fixed shell overlays; full-page baselines cover the shell.
      stylePath: sectionScreenshotStyles,
    })
    await page.locator('[data-home-section="hero"] a[href*="#selected-systems"]').click()
    await expect.poll(async () => page.evaluate(() => {
      const title = document.querySelector('#selected-systems-title')!.getBoundingClientRect().top
      const header = document.querySelector('[data-testid="site-header"]')!.getBoundingClientRect().bottom
      return title >= Math.max(0, header) && title < innerHeight
    })).toBe(true)
  })

  for (const slug of ['local-ai-coding-agent', 'iris'] as const) {
    test(`${slug} keeps public evidence boundaries and language equivalence in ${locale}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      const path = `${prefix}/case-studies/${slug}/`
      await page.goto(path, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toHaveText(independentSystems[slug].title)
      const tagline = await page.locator('.data-brief-hero__subtitle').boundingBox()
      expect(tagline!.height).toBeLessThanOrEqual(page.viewportSize()!.height * 0.35)
      if (slug === 'local-ai-coding-agent') {
        await expect(page.locator('main a[href*="github.com"]')).toHaveCount(0)
      } else {
        await expect(page.locator('main a[href="https://github.com/RaulMermans/JARVIS-OS"]')).toHaveCount(1)
      }
      await expect(page.locator('.case-study-snapshot')).toHaveCount(1)
      await expect(page.locator('[data-case-study-mini-nav] a')).toHaveCount(5)
      await expect(page.locator('#boundaries')).toBeAttached()
      const altLocale = locale === 'en' ? 'es' : 'en'
      const equivalent = switchLocalePath(path, altLocale)
      await expect(page.locator(`a[href="${equivalent}/"]`).first()).toBeAttached()
      const dimensions = await page.evaluate(() => ({ actual: document.documentElement.scrollWidth, viewport: innerWidth }))
      expect(dimensions.actual).toBeLessThanOrEqual(dimensions.viewport)
      const accessibility = await new AxeBuilder({ page }).include('main').analyze()
      expect(accessibility.violations).toEqual([])
      await expect(page).toHaveScreenshot(`${slug}-${locale}.png`, { fullPage: true, animations: 'disabled', timeout: 15000 })
    })
  }

  test(`case index preserves tiers when filtered in ${locale}`, async ({ page }) => {
    await page.goto(`${prefix}/case-studies/`, { waitUntil: 'networkidle' })
    await expect(page.locator('[data-project-tier]')).toHaveCount(3)
    const firstTier = page.locator('[data-project-tier="selected"]')
    await expect(firstTier.locator('a')).toHaveCount(4)
    await page.getByRole('button', { name: locale === 'en' ? 'AI & Automation' : 'IA y automatización', exact: true }).click()
    await expect(firstTier.locator('a')).toHaveCount(3)
    await expect(page.locator('[data-project-tier="practice"]')).toHaveCount(0)
  })
}
