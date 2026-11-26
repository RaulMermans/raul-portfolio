import { expect, test } from '@playwright/test'

const serviceLandingLinks = [
  {
    path: '/en/technical/',
    links: [
      ['AI Systems & Product', '/en/services/product-prototypes'],
      ['Data & Decision Intelligence', '/en/services/creative-automation'],
      ['Brand & Creative Systems', '/en/services/brand-systems'],
    ],
  },
  {
    path: '/technical/',
    links: [
      ['Sistemas de IA y producto', '/services/prototipos-producto-ia'],
      ['Datos e inteligencia para la decisión', '/services/automatizacion-creativa'],
      ['Sistemas de marca y creatividad', '/services/sistemas-de-marca'],
    ],
  },
] as const

for (const locale of serviceLandingLinks) {
  test(`footer capabilities link to their landing pages in ${locale.path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto(locale.path, { waitUntil: 'networkidle' })

    const capabilities = page.locator('footer .footer__column').nth(1)
    for (const [title, href] of locale.links) {
      await expect(capabilities.getByRole('link', { name: title })).toHaveAttribute('href', `${href}/`)
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
