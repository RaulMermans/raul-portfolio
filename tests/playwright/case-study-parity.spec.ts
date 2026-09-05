import { expect, test } from '@playwright/test'

const caseStudySlugs = [
  'opstwin',
  'searchsignal',
  'campaign-pulse',
  'demandos',
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

const caseStudyMiniNavSlugs = [
  'opstwin',
  'searchsignal',
  'campaign-pulse',
  'demandos',
  'campaign-sandbox',
  'data-brief-ai',
  'website-auditor',
  'benchmark-dashboard',
  'blogagent',
  'territoryops-spain',
  'raul-portfolio',
  'relay',
] as const

for (const locale of ['es', 'en'] as const) {
  test(`case-study index has a visible collection introduction in ${locale}`, async ({
    page,
  }) => {
    const prefix = locale === 'en' ? '/en' : ''
    const title = locale === 'es' ? 'Casos de estudio' : 'Case Studies'

    await page.goto(`${prefix}/case-studies`, { waitUntil: 'domcontentloaded' })

    const intro = page.locator('.ui-page-intro')
    await expect(intro).toBeVisible()
    await expect(intro.getByRole('heading', { level: 1, name: title })).toBeVisible()
    await expect(intro.locator('.ui-eyebrow')).toHaveText(
      locale === 'es' ? 'Trabajo seleccionado' : 'Selected work'
    )
  })

  test(`case-study index brings the first project directly after its introduction in ${locale}`, async ({
    page,
  }) => {
    const prefix = locale === 'en' ? '/en' : ''

    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto(`${prefix}/case-studies`, { waitUntil: 'domcontentloaded' })

    const readingGap = await page.evaluate(() => {
      const lede = document.querySelector('.ui-page-intro__content > p:not(.ui-eyebrow)')
      const firstCard = document.querySelector('[data-mobile-audit="case-study-card"]')

      if (!(lede instanceof HTMLElement) || !(firstCard instanceof HTMLElement)) {
        throw new Error('Case-study index reading-flow elements are missing')
      }

      return firstCard.getBoundingClientRect().top - lede.getBoundingClientRect().bottom
    })

    expect(readingGap).toBeGreaterThanOrEqual(0)
    expect(readingGap).toBeLessThanOrEqual(160)
  })

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
    const expectedIndex = `${prefix}/case-studies/`
    const expectedLabels =
      locale === 'es'
        ? ['01Problema', '02Sistema', '03Prueba', '04Valor', '05Límite']
        : [
            '01Problem',
            '02System',
            '03Proof',
            '04Value',
            '05Limitation',
          ]

    for (const slug of caseStudySlugs) {
      await page.goto(`${expectedIndex}${slug}`, {
        waitUntil: 'domcontentloaded',
      })

      const backLink = page
        .locator('main .data-brief-back, main .case-study-hero-new__back')
        .first()
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

      expect(
        await page.locator('.case-study-next-new__card').count(),
        `${slug} should expose at least two related systems`
      ).toBeGreaterThanOrEqual(2)
    }
  })
}

for (const locale of ['es', 'en'] as const) {
  const prefix = locale === 'en' ? '/en' : ''

  test(`photography intro stays connected to the gallery in ${locale}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto(`${prefix}/photography`, { waitUntil: 'domcontentloaded' })

    const layout = await page.evaluate(() => {
      const intro = document.querySelector('.gallery.photography-page > .photography-intro')
      const grid = document.querySelector('.gallery.photography-page > .gallery__grid')

      if (!(intro instanceof HTMLElement) || !(grid instanceof HTMLElement)) {
        throw new Error('Photography intro or gallery is missing')
      }

      const introRect = intro.getBoundingClientRect()
      const gridRect = grid.getBoundingClientRect()

      return {
        introMinHeight: getComputedStyle(intro).minHeight,
        readingGap: gridRect.top - introRect.bottom,
      }
    })

    expect(layout.introMinHeight).toBe('auto')
    expect(layout.readingGap).toBeGreaterThanOrEqual(0)
    expect(layout.readingGap).toBeLessThanOrEqual(160)
  })
}

for (const [locale, path, alternatePath] of [
  ['en', '/en/services/web-development', '/services/desarrollo-web'],
  ['es', '/services/desarrollo-web', '/en/services/web-development'],
] as const) {
  test(`web-development locale links stay paired from ${locale}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' })

    const languageLabel = locale === 'en' ? 'Language switcher' : 'Selector de idioma'
    const alternateShort = locale === 'en' ? 'ES' : 'EN'
    const alternateLink = page
      .locator(`[role="group"][aria-label="${languageLabel}"]`)
      .getByRole('link', { name: alternateShort, exact: true })

    await expect(alternateLink).toHaveAttribute('href', alternatePath)

    const footerLink = page.locator('footer').getByRole('link', {
      name: locale === 'en' ? 'Web Development & Digital Experiences' : 'Desarrollo Web y Experiencias Digitales',
      exact: true,
    })
    await expect(footerLink).toHaveAttribute('href', alternatePath === '/services/desarrollo-web' ? '/en/services/web-development' : '/services/desarrollo-web')
  })
}

for (const locale of ['es', 'en'] as const) {
  const prefix = locale === 'en' ? '/en' : ''

  for (const slug of ['ai-sports', 'remoria'] as const) {
    test(`creative case-study headings remain sequential for ${slug} in ${locale}`, async ({ page }) => {
      await page.goto(`${prefix}/case-studies/${slug}`, { waitUntil: 'domcontentloaded' })

      const levels = await page.locator('main h1, main h2, main h3, main h4, main h5, main h6').evaluateAll(
        (headings) => headings.map((heading) => Number(heading.tagName.slice(1))),
      )

      expect(levels.length).toBeGreaterThan(0)
      for (let index = 1; index < levels.length; index += 1) {
        expect(levels[index], `${slug} heading ${index + 1} should not skip a level`).toBeLessThanOrEqual(
          levels[index - 1] + 1,
        )
      }
    })
  }

  test(`app detail headings remain sequential in ${locale}`, async ({ page }) => {
    await page.goto(`${prefix}/apps/territoryops-spain`, { waitUntil: 'domcontentloaded' })

    const levels = await page.locator('main h1, main h2, main h3, main h4, main h5, main h6').evaluateAll(
      (headings) => headings.map((heading) => Number(heading.tagName.slice(1))),
    )

    expect(levels.length).toBeGreaterThan(0)
    for (let index = 1; index < levels.length; index += 1) {
      expect(levels[index], `app heading ${index + 1} should not skip a level`).toBeLessThanOrEqual(
        levels[index - 1] + 1,
      )
    }
  })
}

for (const locale of ['es', 'en'] as const) {
  test(`case-study chapter navigation stays in a single horizontal row in ${locale}`, async ({
    page,
  }) => {
    const prefix = locale === 'en' ? '/en' : ''

    for (const viewport of [
      { width: 1280, height: 800 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport)

      for (const slug of caseStudyMiniNavSlugs) {
        await page.goto(`${prefix}/case-studies/${slug}`, {
          waitUntil: 'domcontentloaded',
        })

        const nav = page.locator('[data-case-study-mini-nav]')
        await expect(nav, `${slug} should expose shared chapter navigation`).toBeVisible()

        const layout = await nav.evaluate(element => {
          const list = element.querySelector('.case-study-mini-nav__list')
          const links = [...element.querySelectorAll('a')]

          if (!(list instanceof HTMLElement) || links.length < 2) {
            throw new Error('Case-study chapter navigation is incomplete')
          }

          const tops = links.map(link => link.getBoundingClientRect().top)
          return {
            flexWrap: getComputedStyle(list).flexWrap,
            overflowX: getComputedStyle(element).overflowX,
            rowVariance: Math.max(...tops) - Math.min(...tops),
            documentWidth: document.documentElement.scrollWidth,
            viewportWidth: window.innerWidth,
          }
        })

        const context = `${slug} at ${viewport.width}px in ${locale}`
        expect(layout.flexWrap, `${context} should not wrap chapter links`).toBe('nowrap')
        expect(layout.overflowX, `${context} should scroll horizontally when needed`).toBe('auto')
        expect(layout.rowVariance, `${context} should keep chapter links on one row`).toBeLessThanOrEqual(1)
        expect(layout.documentWidth, `${context} should not widen the document`).toBeLessThanOrEqual(
          layout.viewportWidth
        )
      }
    }
  })
}

for (const locale of ['es', 'en'] as const) {
  const prefix = locale === 'en' ? '/en' : ''

  for (const slug of ['ai-sports', 'remoria'] as const) {
    test(`creative case-study hero keeps shared navigation and word spacing for ${slug} in ${locale}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 })
      await page.goto(`${prefix}/case-studies/${slug}`, { waitUntil: 'domcontentloaded' })

      const hero = page.locator('.case-study-hero-new')
      const backLink = hero.locator('.case-study-hero-new__back')
      const badge = hero.locator('.case-study-hero-new__badge')
      const title = hero.getByRole('heading', { level: 1 })

      await expect(hero).toHaveClass(/case-study-hero-new--creative-marketing/)
      await expect(backLink).toHaveAttribute('href', `${prefix}/case-studies/`)
      await expect(backLink).toBeVisible()
      await expect(badge).toBeVisible()
      await expect(title).toBeVisible()

      const layout = await page.evaluate(() => {
        const heroElement = document.querySelector('.case-study-hero-new')
        const backElement = document.querySelector('.case-study-hero-new__back')
        const badgeElement = document.querySelector('.case-study-hero-new__badge')
        const titleElement = document.querySelector('.case-study-hero-new__title')
        const subtitleElement = document.querySelector('.case-study-hero-new__subtitle')
        const words = [...document.querySelectorAll('.case-study-hero-new__tagline-word')]

        if (
          !(heroElement instanceof HTMLElement) ||
          !(backElement instanceof HTMLElement) ||
          !(badgeElement instanceof HTMLElement) ||
          !(titleElement instanceof HTMLElement) ||
          !(subtitleElement instanceof HTMLElement) ||
          words.length < 2
        ) {
          throw new Error('Creative case-study hero elements are missing')
        }

        const hero = heroElement.getBoundingClientRect()
        const back = backElement.getBoundingClientRect()
        const badge = badgeElement.getBoundingClientRect()
        const title = titleElement.getBoundingClientRect()
        const firstWord = words[0].getBoundingClientRect()
        const secondWord = words[1].getBoundingClientRect()

        return {
          backTop: back.top - hero.top,
          backBottom: back.bottom - hero.top,
          badgeBottom: badge.bottom - hero.top,
          titleTop: title.top - hero.top,
          wordGap: secondWord.left - firstWord.right,
          subtitleWhiteSpace: getComputedStyle(subtitleElement).whiteSpace,
          viewportWidth: window.innerWidth,
          documentWidth: document.documentElement.scrollWidth,
        }
      })

      expect(layout.backTop).toBeGreaterThanOrEqual(80)
      expect(layout.backBottom).toBeLessThan(layout.titleTop)
      expect(layout.badgeBottom).toBeLessThanOrEqual(layout.titleTop)
      expect(layout.wordGap).toBeGreaterThan(2)
      expect(layout.subtitleWhiteSpace).not.toBe('nowrap')
      expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)

      await page.setViewportSize({ width: 390, height: 844 })
      const mobileOverflow = await page.evaluate(() => ({
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
      }))
      expect(mobileOverflow.documentWidth).toBeLessThanOrEqual(mobileOverflow.viewportWidth)
    })
  }
}

for (const locale of ['es', 'en'] as const) {
  test(`Relay uses shared technical case-study hero structure in ${locale}`, async ({
    page,
  }) => {
    const prefix = locale === 'en' ? '/en' : ''
    const indexHref = `${prefix}/case-studies/`

    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto(`${prefix}/case-studies/relay`, {
      waitUntil: 'domcontentloaded',
    })

    const hero = page.locator('[data-case-study-hero]')
    const backLink = hero.locator('[data-case-study-hero-back]')
    const label = hero.locator('[data-case-study-hero-label]')
    const title = hero.getByRole('heading', { level: 1, name: 'Relay' })
    const tagline = hero.locator('[data-case-study-hero-tagline]')
    const metadata = hero.locator('[data-case-study-hero-meta]')
    const evidence = hero.locator('[data-case-study-hero-evidence]')

    await expect(hero).toHaveAttribute('data-presentation-family', 'technical-product')
    await expect(backLink).toBeVisible()
    await expect(backLink).toHaveAttribute('href', indexHref)
    await expect(label).toBeVisible()
    await expect(title).toBeVisible()
    await expect(tagline).toBeVisible()
    await expect(metadata).toBeVisible()
    await expect(evidence).toBeVisible()

    const layout = await page.evaluate(() => {
      const heroElement = document.querySelector('[data-case-study-hero]')
      const backElement = document.querySelector('[data-case-study-hero-back]')
      const labelElement = document.querySelector('[data-case-study-hero-label]')
      const titleElement = document.querySelector('#relay-title')
      const taglineElement = document.querySelector('[data-case-study-hero-tagline]')

      if (
        !(heroElement instanceof HTMLElement) ||
        !(backElement instanceof HTMLElement) ||
        !(labelElement instanceof HTMLElement) ||
        !(titleElement instanceof HTMLElement) ||
        !(taglineElement instanceof HTMLElement)
      ) {
        throw new Error('Relay shared hero elements are missing')
      }

      const hero = heroElement.getBoundingClientRect()
      const back = backElement.getBoundingClientRect()
      const label = labelElement.getBoundingClientRect()
      const title = titleElement.getBoundingClientRect()
      const tagline = taglineElement.getBoundingClientRect()

      return {
        backTop: back.top - hero.top,
        backBottom: back.bottom - hero.top,
        labelTop: label.top - hero.top,
        titleTop: title.top - hero.top,
        taglineTop: tagline.top - hero.top,
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }
    })

    expect(layout.backTop).toBeGreaterThanOrEqual(80)
    expect(layout.backBottom).toBeLessThan(layout.labelTop)
    expect(layout.labelTop).toBeLessThan(layout.titleTop)
    expect(layout.titleTop).toBeLessThan(layout.taglineTop)
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)

    await backLink.focus()
    await expect(backLink).toBeFocused()

    await page.setViewportSize({ width: 390, height: 844 })
    const mobileOverflow = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    }))
    expect(mobileOverflow.documentWidth).toBeLessThanOrEqual(mobileOverflow.viewportWidth)
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
