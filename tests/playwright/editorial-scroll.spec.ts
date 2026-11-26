import { expect, test } from '@playwright/test'
import { PROJECT_EXPERIENCE } from '../../data/portfolio-experience'
import { PHOTOGRAPHY_SERIES } from '../../data/photography-series'

for (const [locale, prefix] of [['en', '/en'], ['es', '']] as const) {
  for (const [width, height, device] of [[1440, 900, 'desktop'], [768, 1024, 'tablet'], [390, 844, 'mobile']] as const) {
    test(`${locale} portfolio paths remain readable at ${device} width`, async ({ page }, testInfo) => {
      test.setTimeout(90_000)
      await page.setViewportSize({ width, height })
      for (const path of [`${prefix}/`, `${prefix}/technical/`, `${prefix}/creative/`]) {
        await page.goto(path, { waitUntil: 'networkidle' })
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
        if (path !== `${prefix}/`) {
          const intro = page.locator('header.portfolio-intro')
          const title = path.includes('technical')
            ? (locale === 'es' ? 'Trabajo técnico' : 'Technical work')
            : (locale === 'es' ? 'Trabajo creativo' : 'Creative work')
          await expect(intro).toHaveText(title)
          await expect(intro.locator('img')).toHaveCount(0)
          const surfaces = await page.evaluate(() => {
            const intro = document.querySelector<HTMLElement>('.portfolio-intro')!
            const masthead = document.querySelector<HTMLElement>('[data-testid="site-header"]')!
            return {
              introBackground: getComputedStyle(intro).backgroundColor,
              mastheadBackground: getComputedStyle(masthead).backgroundColor,
              introText: getComputedStyle(intro).color,
              mastheadText: getComputedStyle(masthead).color,
            }
          })
          expect(surfaces.introBackground).toBe(surfaces.mastheadBackground)
          expect(surfaces.introText).toBe(surfaces.mastheadText)
          const offset = await intro.locator('h1').evaluate((heading) => {
            const bounds = heading.getBoundingClientRect()
            return Math.abs(bounds.left + bounds.width / 2 - innerWidth / 2)
          })
          expect(offset).toBeLessThanOrEqual(1)
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBeLessThanOrEqual(width)
        if (path === `${prefix}/`) {
          const cards = await page.locator('#work a').evaluateAll((elements) => elements.map((element) => {
            const bounds = element.getBoundingClientRect()
            return { width: bounds.width, height: bounds.height, top: bounds.top }
          }))
          expect(cards).toHaveLength(3)
          for (const card of cards) expect(Math.abs(card.width - card.height)).toBeLessThanOrEqual(1)
          for (const card of cards.slice(1)) expect(Math.abs(cards[0].width - card.width)).toBeLessThanOrEqual(1)
          for (const card of cards.slice(1)) expect(Math.abs(cards[0].top - card.top)).toBeLessThanOrEqual(1)
          const strip = await page.locator('#work').evaluate((element) => ({
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
            snap: getComputedStyle(element).scrollSnapType,
          }))
          if (width < 1024) {
            expect(strip.scrollWidth).toBeGreaterThan(strip.clientWidth)
            expect(strip.snap).toBe('x mandatory')
            await expect(page.locator('#gateway-scroll-hint')).toBeVisible()
          } else {
            expect(strip.scrollWidth).toBeLessThanOrEqual(strip.clientWidth)
            await expect(page.locator('#gateway-scroll-hint')).toBeHidden()
          }
        } else if (path.includes('technical')) {
          if (width < 768) await expect(page.locator('#technical-scroll-hint')).toBeVisible()
          else await expect(page.locator('#technical-scroll-hint')).toBeHidden()
        } else {
          if (width < 768) await expect(page.locator('#creative-scroll-hint')).toBeVisible()
          else await expect(page.locator('#creative-scroll-hint')).toBeHidden()
        }
        const broken = await page.locator('main img').evaluateAll((images) => images.filter((item) => {
          const image = item as HTMLImageElement
          return image.complete && image.naturalWidth === 0
        }).map((image) => (image as HTMLImageElement).src))
        expect(broken, path).toEqual([])
        await page.screenshot({ path: testInfo.outputPath(`${locale}-${device}-${path.includes('technical') ? 'technical' : path.includes('creative') ? 'creative' : 'gateway'}.png`) })
      }
      await page.goto(`${prefix}/technical/`, { waitUntil: 'domcontentloaded' })
      const technicalCount = PROJECT_EXPERIENCE.filter((project) => project.caseStudyCategory !== 'creative-work').length
      await expect(page.locator('[class*="techRow"]')).toHaveCount(technicalCount)
      const technicalRail = page.locator('[class*="techList"]').first()
      await expect(technicalRail).toHaveJSProperty('scrollLeft', 0)
      await technicalRail.focus()
      await page.keyboard.press('ArrowRight')
      await expect.poll(() => technicalRail.evaluate((rail) => rail.scrollLeft)).toBeGreaterThan(0)
      await page.goto(`${prefix}/creative/`, { waitUntil: 'domcontentloaded' })
      await expect(page.locator('[class*="seriesCard"]')).toHaveCount(PHOTOGRAPHY_SERIES.length)
      await expect(page.locator('[class*="identityCard"]')).toHaveCount(3)
      const visualImage = page.locator('#creative-visuals img')
      await expect(visualImage).toBeVisible()
      const visualFrame = await visualImage.evaluate((image) => {
        const photo = image as HTMLImageElement
        const bounds = photo.getBoundingClientRect()
        return { loaded: photo.complete && photo.naturalWidth > 0, naturalRatio: photo.naturalWidth / photo.naturalHeight, renderedRatio: bounds.width / bounds.height }
      })
      expect(visualFrame.loaded).toBe(true)
      expect(Math.abs(visualFrame.renderedRatio - visualFrame.naturalRatio)).toBeLessThan(0.01)
      const creativeRail = page.locator('[class*="seriesGrid"]')
      await creativeRail.focus()
      await page.keyboard.press('ArrowRight')
      await expect.poll(() => creativeRail.evaluate((rail) => rail.scrollLeft)).toBeGreaterThan(0)
    })
  }

  test(`${locale} technical portfolio omits the apps section`, async ({ page }) => {
    await page.goto(`${prefix}/technical/`, { waitUntil: 'networkidle' })
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('#technical-apps-title, [class*="appCard"]')).toHaveCount(0)
    await expect(page.locator('[class*="techRow"]')).toHaveCount(
      PROJECT_EXPERIENCE.filter((project) => project.caseStudyCategory !== 'creative-work').length,
    )
  })
}
