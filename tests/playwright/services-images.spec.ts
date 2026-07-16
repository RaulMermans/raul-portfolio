import { expect, test } from '@playwright/test'

const serviceImageByTitle = [
  ['Creative Strategy & Marketing', 'Services_Web_Development.webp'],
  ['Brand Systems & Creative Direction', 'Services_Creative_Direction.webp'],
  ['Data, Research & Intelligence', 'Services_Automation.webp'],
  ['Digital Products, AI & Prototyping', 'Services_AI_Agents.webp'],
  ['Photography & Visual Direction', 'Services_Photography.webp'],
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
