import { expect, test } from '@playwright/test'

const locales = [
  { path: '/en/about/', title: 'About me', story: 'The work changed. The questions stayed.', first: 'Learning the business side.', last: 'Bringing the pieces together.', method: 'A useful system leaves room for judgment.', removed: 'One practice, different forms.' },
  { path: '/about/', title: 'Sobre mí', story: 'Cambió el trabajo. Las preguntas siguieron.', first: 'Aprender el lado del negocio.', last: 'Juntar las piezas.', method: 'Un sistema útil deja espacio para el criterio.', removed: 'Una práctica, distintas formas.' },
] as const

for (const locale of locales) {
  test(`About tells a scrollable story in ${locale.path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 960 })
    await page.goto(locale.path, { waitUntil: 'networkidle' })

    await expect(page.getByRole('heading', { level: 1, name: locale.title })).toBeVisible()
    await expect(page.getByRole('img', { name: /Raúl Mermans (con|holding)/ })).toBeVisible()
    await page.getByRole('link', { name: /Keep reading|Seguir leyendo/ }).click()
    await expect(page.getByRole('heading', { name: locale.story })).toBeVisible()

    const chapters = page.locator('[data-about-chapter]')
    await expect(chapters).toHaveCount(6)
    await expect(chapters.first().getByRole('heading', { name: locale.first })).toBeVisible()
    await chapters.last().scrollIntoViewIfNeeded()
    await expect(chapters.last().getByRole('heading', { name: locale.last })).toBeVisible()

    await expect(page.getByRole('heading', { name: locale.removed })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: locale.method })).toBeVisible()
    await expect(page.locator('main').getByRole('link', { name: 'LinkedIn' })).toBeVisible()
  })

  test(`About stays readable on mobile in ${locale.path}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(locale.path, { waitUntil: 'networkidle' })
    await expect(page.getByRole('img', { name: /Raúl Mermans (con|holding)/ })).toBeVisible()
    await expect(page.locator('[data-about-chapter]')).toHaveCount(6)
    const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }))
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport)
  })
}
