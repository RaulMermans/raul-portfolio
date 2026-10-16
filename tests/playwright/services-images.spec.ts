import { expect, test } from '@playwright/test'

const serviceImageByTitle = [
  ['AI Systems & Product', 'Services_AI_Agents.webp'],
  ['Data & Decision Intelligence', 'Services_Automation.webp'],
  ['Brand & Creative Systems', 'Services_Creative_Direction.webp'],
] as const

const serviceLandingLinks = [
  {
    path: '/en/',
    links: [
      ['AI Systems & Product', '/en/services/product-prototypes'],
      ['Data & Decision Intelligence', '/en/services/creative-automation'],
      ['Brand & Creative Systems', '/en/services/brand-systems'],
    ],
  },
  {
    path: '/',
    links: [
      ['Sistemas de IA y producto', '/services/prototipos-producto-ia'],
      ['Datos e inteligencia para la decisión', '/services/automatizacion-creativa'],
      ['Sistemas de marca y creatividad', '/services/sistemas-de-marca'],
    ],
  },
] as const

test('services pair each topic with its own illustration', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/en/', { waitUntil: 'networkidle' })

  const services = page.locator('#capabilities .service')
  await expect(services).toHaveCount(serviceImageByTitle.length)

  for (const [title, image] of serviceImageByTitle) {
    const service = services.filter({ hasText: title })
    await expect(service).toHaveCount(1)
    await expect(service.locator('img')).toHaveAttribute('src', new RegExp(image))
  }
})

for (const locale of serviceLandingLinks) {
  test(`services link to their landing pages in ${locale.path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto(locale.path, { waitUntil: 'networkidle' })

    const services = page.locator('#capabilities .service')
    for (const [title, href] of locale.links) {
      const service = services.filter({ hasText: title })
      await expect(service).toHaveCount(1)
      await expect(service.locator('.service__cta')).toHaveAttribute('href', `${href}/`)
    }
  })
}

const webDevelopmentLandings = [
  ['/en/services/web-development', 'Web Development & Digital Experiences'],
  ['/services/desarrollo-web', 'Desarrollo Web y Experiencias Digitales'],
] as const

for (const [path, title] of webDevelopmentLandings) {
  test(`web development landing renders at ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' })

    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible()
    const schemaScripts = page.locator('script[type="application/ld+json"]')
    await expect(schemaScripts).not.toHaveCount(0)
    expect(
      await schemaScripts.evaluateAll((scripts) => scripts.some((script) => script.textContent?.includes('FAQPage'))),
    ).toBe(true)
  })
}
