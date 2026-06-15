import { expect, test } from '@playwright/test'

function parseColor(color: string) {
  const channels = color.match(/\d+(?:\.\d+)?/g)?.map(Number)

  if (!channels || channels.length < 3) {
    throw new Error(`Unsupported color format: ${color}`)
  }

  return {
    rgb: channels.slice(0, 3),
    alpha: channels[3] ?? 1,
  }
}

function relativeLuminance(channels: number[]) {
  const linearChannels = channels.map((channel) => {
    const normalized = channel / 255
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4
  })

  return (0.2126 * linearChannels[0]) + (0.7152 * linearChannels[1]) + (0.0722 * linearChannels[2])
}

function contrastRatio(foreground: string, background: string) {
  const foregroundColor = parseColor(foreground)
  const backgroundColor = parseColor(background)
  const renderedForeground = foregroundColor.rgb.map(
    (channel, index) => (channel * foregroundColor.alpha) + (backgroundColor.rgb[index] * (1 - foregroundColor.alpha)),
  )
  const foregroundLuminance = relativeLuminance(renderedForeground)
  const backgroundLuminance = relativeLuminance(backgroundColor.rgb)
  const lighter = Math.max(foregroundLuminance, backgroundLuminance)
  const darker = Math.min(foregroundLuminance, backgroundLuminance)

  return (lighter + 0.05) / (darker + 0.05)
}

test('BlogAgent dark sections keep copy and secondary CTA readable', async ({ page }) => {
  await page.goto('/es/case-studies/blogagent', { waitUntil: 'networkidle' })

  const colors = await page.evaluate(() => {
    const limitation = document.querySelector<HTMLElement>('.blogagent-limitations li')
    const backButton = document.querySelector<HTMLElement>('.blogagent-closing .data-brief-button:not(.data-brief-button--primary)')
    const limitationsSection = document.querySelector<HTMLElement>('#limitations')
    const closingSection = document.querySelector<HTMLElement>('#learning')

    if (!limitation || !backButton || !limitationsSection || !closingSection) {
      throw new Error('BlogAgent contrast targets were not rendered')
    }

    return {
      limitation: getComputedStyle(limitation).color,
      limitationBackground: getComputedStyle(limitationsSection).backgroundColor,
      backButton: getComputedStyle(backButton).color,
      backButtonBackground: getComputedStyle(closingSection).backgroundColor,
    }
  })

  expect(contrastRatio(colors.limitation, colors.limitationBackground)).toBeGreaterThanOrEqual(4.5)
  expect(contrastRatio(colors.backButton, colors.backButtonBackground)).toBeGreaterThanOrEqual(4.5)
})
