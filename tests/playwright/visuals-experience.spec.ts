import { expect, test } from '@playwright/test'

test('Visuals separates the title and artwork while keeping arrows inside the image', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/visuals/', { waitUntil: 'networkidle' })

  const positions = await page.evaluate(() => {
    const title = document.querySelector('main h1')!.getBoundingClientRect()
    const artwork = document.querySelector('[data-mobile-audit="visual-card"]')!.getBoundingClientRect()
    const navigation = document.querySelector('main button[aria-label="Proyecto siguiente"]')!.getBoundingClientRect()
    return {
      titleRight: title.right,
      artworkLeft: artwork.left,
      artworkRight: artwork.right,
      artworkTop: artwork.top,
      artworkBottom: artwork.bottom,
      navigationLeft: navigation.left,
      navigationRight: navigation.right,
      navigationTop: navigation.top,
      navigationBottom: navigation.bottom,
    }
  })

  expect(positions.artworkLeft - positions.titleRight).toBeGreaterThanOrEqual(32)
  expect(positions.navigationLeft).toBeGreaterThan(positions.artworkLeft)
  expect(positions.navigationRight).toBeLessThan(positions.artworkRight)
  expect(positions.navigationTop).toBeGreaterThan(positions.artworkTop)
  expect(positions.navigationBottom).toBeLessThan(positions.artworkBottom)
  await expect(page.getByRole('heading', { name: 'Astralis', level: 2 })).toBeVisible()
})

test('Visuals artwork opens with keyboard and remains visible in the mobile exhibition', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/visuals/', { waitUntil: 'networkidle' })

  const artwork = page.getByRole('button', { name: 'Ver proyecto: Astralis' })
  await artwork.focus()
  await page.keyboard.press('Enter')

  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  const image = dialog.locator('img').first()
  await expect(image).toBeVisible()
  expect(await image.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(150)
  await page.getByRole('button', { name: 'Cerrar exposición' }).click()
  await expect(dialog).toHaveCount(0)

  await page.getByRole('button', { name: 'Proyecto siguiente' }).click()
  await expect(page.getByRole('heading', { name: 'Astro', level: 2 })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
})

test('Footer copyright does not overlap the name', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/visuals/', { waitUntil: 'networkidle' })
  const positions = await page.evaluate(() => {
    const name = document.querySelector('.footer__name-lockup')!.getBoundingClientRect()
    const year = document.querySelector('.footer__year')!.getBoundingClientRect()
    return { nameBottom: name.bottom, yearTop: year.top }
  })
  expect(positions.yearTop).toBeGreaterThan(positions.nameBottom)
})

test('Footer name and reading copy align on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/visuals/', { waitUntil: 'networkidle' })
  const positions = await page.evaluate(() => {
    const name = document.querySelector('.footer__name-lockup')!.getBoundingClientRect()
    const meta = document.querySelector('.footer__meta')!.getBoundingClientRect()
    return { nameTop: name.top, metaTop: meta.top, nameRight: name.right, metaLeft: meta.left }
  })
  expect(Math.abs(positions.nameTop - positions.metaTop)).toBeLessThanOrEqual(1)
  expect(positions.metaLeft - positions.nameRight).toBeGreaterThanOrEqual(32)
})
