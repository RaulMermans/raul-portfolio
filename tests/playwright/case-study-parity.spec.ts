import { expect, test } from '@playwright/test'

const caseStudySlugs = [
  'ai-sports',
  'remoria',
  'raul-portfolio',
  'website-auditor',
  'campaign-sandbox',
  'blogagent',
  'territoryops-spain',
  'data-brief-ai',
  'benchmark-dashboard',
] as const

for (const locale of ['es', 'en'] as const) {
  test(`all case studies expose consistent back navigation in ${locale}`, async ({ page }) => {
    const prefix = locale === 'en' ? '/en' : ''
    const expectedIndex = `${prefix}/case-studies`

    for (const slug of caseStudySlugs) {
      await page.goto(`${expectedIndex}/${slug}`, { waitUntil: 'domcontentloaded' })

      const backLink = page.locator('main .data-brief-back').first()
      await expect(backLink, `${slug} should expose the standard back link`).toBeVisible()
      await expect(backLink).toHaveAttribute('href', expectedIndex)
    }
  })
}

test('Campaign Sandbox renders complete Spanish page copy', async ({ page }) => {
  await page.goto('/case-studies/campaign-sandbox', { waitUntil: 'domcontentloaded' })

  await expect(page.getByRole('heading', { name: 'La estrategia empieza con información fragmentada.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Una arquitectura híbrida de flujo y agentes.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Construido para trabajo interno, no como SaaS.' })).toBeVisible()
  await expect(page.getByText('Internal AI Strategy Workspace', { exact: true })).toHaveCount(0)
  await expect(page.getByText('Strategy starts with fragmented inputs.', { exact: true })).toHaveCount(0)
})

test('shared gallery heading follows the active locale', async ({ page }) => {
  await page.goto('/case-studies/ai-sports', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: 'Galería' })).toBeVisible()

  await page.goto('/en/case-studies/ai-sports', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: 'Gallery' })).toBeVisible()
})
