import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { getCaseStudies } from '../../data/case-studies'
import { independentSystems } from '../../data/independent-systems'
import { CASE_STUDY_CATEGORIES, PROJECT_EXPERIENCE } from '../../data/portfolio-experience'
import { getApps } from '../../data/apps'
import { siteCopy } from '../../data/site-copy'
import { serviceLandings } from '../../data/service-landings'
import { switchLocalePath } from '../../lib/i18n'

function structure(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(structure)
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, structure(item)]))
  return typeof value
}

test('canonical content keeps equivalent locale structures and exhaustive case-study categories', () => {
  expect(structure(siteCopy.en)).toEqual(structure(siteCopy.es))
  expect(getApps('en').map((app) => app.slug)).toEqual(getApps('es').map((app) => app.slug))
  expect(getCaseStudies('en').map((study) => study.slug)).toEqual(getCaseStudies('es').map((study) => study.slug))
  const projectSlugs = PROJECT_EXPERIENCE.map((project) => project.slug)
  expect(new Set(projectSlugs).size).toBe(projectSlugs.length)
  expect([...projectSlugs].sort()).toEqual(getCaseStudies('en').map((study) => study.slug).sort())
  expect(CASE_STUDY_CATEGORIES.map((category) => category.id)).toEqual(['creative-work', 'ai-systems', 'software-products', 'data-analytics'])
  for (const project of PROJECT_EXPERIENCE) {
    expect(CASE_STUDY_CATEGORIES.some((category) => category.id === project.caseStudyCategory)).toBe(true)
  }
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
  test(`home and independent cases fit the tablet viewport in ${locale}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'One tablet run per locale is sufficient.')
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const path of [`${prefix}/`, `${prefix}/case-studies/local-ai-coding-agent/`, `${prefix}/case-studies/iris/`, `${prefix}/case-studies/halo-control/`, `${prefix}/case-studies/bi-notebook-lab/`]) {
      await page.goto(path, { waitUntil: 'networkidle' })
      const dimensions = await page.evaluate(() => ({ actual: document.documentElement.scrollWidth, viewport: innerWidth }))
      expect(dimensions.actual).toBeLessThanOrEqual(dimensions.viewport)
      await expect(page.locator('h1')).toBeVisible()
      if (path === `${prefix}/`) await expect(page.locator('#selected-systems')).toHaveCount(0)
    }
  })

  test(`home routes work into case studies and preserves creative paths in ${locale}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(`${prefix}/`, { waitUntil: 'networkidle' })
    await expect(page.locator('#selected-systems')).toHaveCount(0)
    await expect(page.locator('[data-home-section="hero"] a[href$="#work"]')).toHaveCount(1)
    await expect(page.locator('a[href*="/photography"]').first()).toBeAttached()
    await expect(page.locator('a[href*="/visuals"]').first()).toBeAttached()
    await expect(page.locator('body')).not.toContainText(/Q3 2026|T3 2026/)
    const accessibility = await new AxeBuilder({ page }).include('[data-home-section="work"]').analyze()
    expect(accessibility.violations).toEqual([])
    await page.locator('[data-home-section="hero"] a[href$="#work"]').click()
    await expect.poll(async () => page.evaluate(() => {
      const work = document.querySelector('#work')!.getBoundingClientRect()
      return work.top < innerHeight && work.bottom > 0
    })).toBe(true)
  })

  for (const slug of ['local-ai-coding-agent', 'iris', 'halo-control', 'bi-notebook-lab'] as const) {
    test(`${slug} keeps public evidence boundaries and language equivalence in ${locale}`, async ({ page }, testInfo) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      const path = `${prefix}/case-studies/${slug}/`
      await page.goto(path, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toHaveText(independentSystems[slug].title)
      const tagline = await page.locator('.data-brief-hero__subtitle').boundingBox()
      expect(tagline!.height).toBeLessThanOrEqual(page.viewportSize()!.height * 0.35)
      await expect(page.locator(`main a[href="${independentSystems[slug].repository}"]`)).toHaveCount(1)
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
      if (slug === 'bi-notebook-lab') {
        const proofImages = page.locator('.independent-system-proof img')
        await proofImages.evaluateAll((images) => {
          for (const image of images) (image as HTMLImageElement).loading = 'eager'
        })
        await expect.poll(() => proofImages.evaluateAll((images) => images.every((image) => {
          const element = image as HTMLImageElement
          return element.complete && element.naturalWidth > 0
        }))).toBe(true)
      }
      await expect(page).toHaveScreenshot(`${slug}-${locale}-${testInfo.project.name}.png`, { fullPage: true, animations: 'disabled', timeout: 15000 })
    })
  }

  test(`case index classifies every project and selects square categories in ${locale}`, async ({ page }) => {
    await page.goto(`${prefix}/case-studies/`, { waitUntil: 'networkidle' })
    const selectors = page.locator('.case-studies-index__category')
    await expect(selectors).toHaveCount(4)
    await expect(page.locator('[data-project-category]')).toHaveCount(4)
    await expect(page.locator('[data-mobile-audit="case-study-card"]')).toHaveCount(PROJECT_EXPERIENCE.length)
    const hrefs = await page.locator('[data-mobile-audit="case-study-card"]').evaluateAll((cards) => cards.map((card) => card.getAttribute('href')))
    expect(new Set(hrefs).size).toBe(PROJECT_EXPERIENCE.length)
    for (const [category, count] of [['creative-work', 3], ['ai-systems', 6], ['software-products', 4], ['data-analytics', 5]] as const) {
      const selector = page.locator(`[data-category-selector="${category}"]`)
      await selector.click()
      await expect(selector).toHaveAttribute('aria-pressed', 'true')
      await expect(page.locator('[data-project-category]')).toHaveCount(1)
      await expect(page.locator(`[data-project-category="${category}"] [data-mobile-audit="case-study-card"]`)).toHaveCount(count)
    }
    await page.getByRole('button', { name: locale === 'en' ? 'View all' : 'Ver todos' }).click()
    await expect(page.locator('[data-project-category]')).toHaveCount(4)
    const creativeSelector = page.locator('[data-category-selector="creative-work"]')
    await creativeSelector.focus()
    await page.keyboard.press('Enter')
    await expect(creativeSelector).toHaveAttribute('aria-pressed', 'true')
    await page.getByRole('button', { name: locale === 'en' ? 'View all' : 'Ver todos' }).click()
    const dimensions = await page.evaluate(() => ({ actual: document.documentElement.scrollWidth, viewport: innerWidth }))
    expect(dimensions.actual).toBeLessThanOrEqual(dimensions.viewport)
    const accessibility = await new AxeBuilder({ page }).include('.case-study-thumbnail-gallery').analyze()
    expect(accessibility.violations).toEqual([])
    await page.setViewportSize({ width: 360, height: 780 })
    const narrowWidth = await page.evaluate(() => ({ actual: document.documentElement.scrollWidth, viewport: innerWidth }))
    expect(narrowWidth.actual).toBeLessThanOrEqual(narrowWidth.viewport)
    const squareSizes = await selectors.evaluateAll((buttons) => buttons.map((button) => {
      const bounds = button.getBoundingClientRect()
      return Math.abs(bounds.width - bounds.height)
    }))
    for (const difference of squareSizes) expect(difference).toBeLessThanOrEqual(1)
  })
}
