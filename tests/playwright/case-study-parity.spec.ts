import { expect, test } from '@playwright/test'

const caseStudySlugs = [
  'campaign-pulse',
  'campaign-sandbox',
  'data-brief-ai',
  'website-auditor',
  'benchmark-dashboard',
  'ai-sports',
  'remoria',
  'blogagent',
  'territoryops-spain',
  'raul-portfolio',
] as const

for (const locale of ['es', 'en'] as const) {
  test(`case-study index follows the portfolio priority order in ${locale}`, async ({
    page,
  }) => {
    const prefix = locale === 'en' ? '/en' : ''
    await page.goto(`${prefix}/case-studies`, { waitUntil: 'domcontentloaded' })

    const hrefs = await page
      .locator('[data-mobile-audit="case-study-card"]')
      .evaluateAll(cards => cards.map(card => card.getAttribute('href')))

    expect(hrefs).toEqual(
      caseStudySlugs.map(slug => `${prefix}/case-studies/${slug}/`)
    )
  })

  test(`all case studies expose the shared editorial system in ${locale}`, async ({
    page,
  }) => {
    const prefix = locale === 'en' ? '/en' : ''
    const expectedIndex = `${prefix}/case-studies`
    const expectedLabels =
      locale === 'es'
        ? ['Problema', 'Sistema', 'Prueba', 'Valor', 'Límite']
        : ['Problem', 'System', 'Proof', 'Value', 'Limitation']

    for (const slug of caseStudySlugs) {
      await page.goto(`${expectedIndex}/${slug}`, {
        waitUntil: 'domcontentloaded',
      })

      const backLink = page.locator('main .data-brief-back').first()
      await expect(
        backLink,
        `${slug} should expose the standard back link`
      ).toBeVisible()
      await expect(backLink).toHaveAttribute('href', expectedIndex)

      const snapshotFacts = page.locator('.case-study-snapshot__facts > div')
      await expect(
        snapshotFacts,
        `${slug} should expose five snapshot facts`
      ).toHaveCount(5)
      await expect(snapshotFacts.locator('dt')).toHaveText(expectedLabels)

      await expect(
        page.locator('.case-study-next-new__card'),
        `${slug} should expose two related systems`
      ).toHaveCount(2)
    }
  })
}

test('Campaign Sandbox renders complete Spanish page copy', async ({
  page,
}) => {
  await page.goto('/case-studies/campaign-sandbox', {
    waitUntil: 'domcontentloaded',
  })

  await expect(
    page.getByRole('heading', {
      name: 'La estrategia empieza con información fragmentada.',
    })
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Una arquitectura híbrida de flujo y agentes.',
    })
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Construido para trabajo interno, no como SaaS.',
    })
  ).toBeVisible()
  await expect(
    page.getByText('Internal AI Strategy Workspace', { exact: true })
  ).toHaveCount(0)
  await expect(
    page.getByText('Strategy starts with fragmented inputs.', { exact: true })
  ).toHaveCount(0)
})

test('shared gallery heading follows the active locale', async ({ page }) => {
  await page.goto('/case-studies/ai-sports', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: 'Galería' })).toBeVisible()

  await page.goto('/en/case-studies/ai-sports', {
    waitUntil: 'domcontentloaded',
  })
  await expect(page.getByRole('heading', { name: 'Gallery' })).toBeVisible()
})
