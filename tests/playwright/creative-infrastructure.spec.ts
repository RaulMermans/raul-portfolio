import { expect, test } from '@playwright/test'

for (const [locale, path, technical, creative] of [
  ['English', '/en/', '/en/technical/', '/en/creative/'],
  ['Spanish', '/', '/technical/', '/creative/'],
] as const) {
  test(`portfolio gateway presents Raúl and both paths in ${locale}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(path, { waitUntil: 'networkidle' })

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByTestId('site-header')).toHaveCount(0)
    await expect(page.locator('footer')).toHaveCount(0)
    await expect(page.locator('main img')).toBeVisible()
    await expect(page.getByRole('link', { name: locale === 'English' ? 'About me' : 'Sobre mí' })).toBeVisible()
    await expect(page.locator(`#work a[href="${technical}"]`)).toHaveCount(1)
    await expect(page.locator(`#work a[href="${creative}"]`)).toHaveCount(1)
    await expect(page.locator('#gateway-scroll-hint')).toHaveText(locale === 'English' ? 'Swipe to explore ↔' : 'Desliza para explorar ↔')
    await expect(page.locator('main h1')).toHaveText('Raúl Mermans')
    await expect(page.locator('main h2')).toHaveCount(3)
    await expect(page.getByRole('heading', { level: 2, name: locale === 'English' ? 'About me' : 'Sobre mí' })).toBeVisible()
    const layout = await page.evaluate(() => {
      const gateway = document.querySelector('main > div')!
      const name = gateway.querySelector('h1')!.getBoundingClientRect()
      const strip = gateway.querySelector('#work')!
      return {
        background: getComputedStyle(gateway).backgroundColor,
        nameCenter: name.left + name.width / 2,
        stripScrollable: strip.scrollWidth > strip.clientWidth,
        viewportCenter: innerWidth / 2,
      }
    })
    expect(layout.background).toBe('rgb(21, 22, 22)')
    expect(Math.abs(layout.nameCenter - layout.viewportCenter)).toBeLessThanOrEqual(1)
    expect(layout.stripScrollable).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
    await page.getByRole('link', { name: locale === 'English' ? 'About me' : 'Sobre mí' }).click()
    await expect(page).toHaveURL(locale === 'English' ? /\/en\/about\/$/ : /\/about\/$/)
  })
}

test('gateway card responds to a mouse and rests when motion is reduced', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Pointer parallax is reserved for fine-pointer devices.')
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/', { waitUntil: 'networkidle' })
  const card = page.locator('#work a[href="/technical/"]')
  const bounds = await card.boundingBox()
  expect(bounds).not.toBeNull()
  await page.mouse.move(bounds!.x + bounds!.width * .75, bounds!.y + bounds!.height * .25)
  await expect.poll(() => card.evaluate((element) => element.style.getPropertyValue('--tilt-y'))).not.toBe('')
  await expect.poll(() => card.evaluate((element) => getComputedStyle(element).transform)).not.toBe('none')

  await page.mouse.move(0, 0)
  await expect.poll(() => card.evaluate((element) => element.style.getPropertyValue('--tilt-y'))).toBe('')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.mouse.move(bounds!.x + bounds!.width * .75, bounds!.y + bounds!.height * .25)
  await expect(card).toHaveCSS('transform', 'none')
})
