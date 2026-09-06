import { expect, test } from '@playwright/test'

const serviceImageByTitle = [
  ['Web Development & Digital Experiences', 'Services_Web_Development.webp'],
  ['Brand Systems & Creative Direction', 'Services_Creative_Direction.webp'],
  ['Data, Research & Intelligence', 'Services_Automation.webp'],
  ['Digital Products, AI & Prototyping', 'Services_AI_Agents.webp'],
  ['Photography & Visual Direction', 'Services_Photography.webp'],
] as const

const serviceLandingLinks = [
  {
    path: '/en/',
    links: [
      ['Web Development & Digital Experiences', '/en/services/web-development'],
      ['Brand Systems & Creative Direction', '/en/services/brand-systems'],
      ['Data, Research & Intelligence', '/en/services/creative-automation'],
      ['Digital Products, AI & Prototyping', '/en/services/product-prototypes'],
    ],
  },
  {
    path: '/',
    links: [
      ['Desarrollo Web y Experiencias Digitales', '/services/desarrollo-web'],
      ['Sistemas de Marca y Dirección Creativa', '/services/sistemas-de-marca'],
      ['Datos, Investigación e Inteligencia', '/services/automatizacion-creativa'],
      ['Productos Digitales, IA y Prototipado', '/services/prototipos-producto-ia'],
    ],
  },
] as const

test('services pair each topic with its own illustration', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/en/', { waitUntil: 'networkidle' })

  const services = page.locator('#services .service')
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

    const services = page.locator('#services .service')
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
