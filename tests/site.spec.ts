import { expect, test } from '@playwright/test'
import pageIndex from '../src/data/page-index.json' with { type: 'json' }

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:5173'

test('homepage interactions, source images and booking destinations', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(base)
  await expect(page.locator('h1')).toHaveText('Dental ImplantsLondon.')
  await page.getByRole('tab', { name: '02 All-on-4 / All-on-6' }).click()
  await expect(page.locator('#treatment-panel h3')).toHaveText('All-on-4 / All-on-6')
  await page.getByRole('tab', { name: '02 All-on-4 / All-on-6' }).press('ArrowDown')
  await expect(page.locator('#treatment-panel h3')).toHaveText('Implant-Retained Dentures')
  await page.getByRole('slider').fill('75')
  await expect(page.locator('.comparison-before')).toHaveCSS('clip-path', 'inset(0px 25% 0px 0px)')
  await page.getByRole('tab', { name: 'City of London', exact: true }).click()
  await expect(page.locator('#clinic-panel')).toContainText('5 Ave Maria Lane, London EC4M 7AQ')
  await page.locator('.faq-list summary').nth(3).click()
  await expect(page.locator('.faq-list details').nth(3)).toHaveAttribute('open', '')
  await page.getByRole('button', { name: 'Next dentists' }).click()
  await expect.poll(() => page.locator('.team-track').evaluate(element => element.scrollLeft)).toBeGreaterThan(0)
  for (const image of await page.locator('main img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth), { timeout: 20000 }).toBeGreaterThan(0)
  }
  await expect(page.locator('.hero-buttons .button')).toHaveAttribute('href', 'https://www.dental-implants-london.co.uk/booking')
  await expect(page.locator('.cost-table tbody tr')).toHaveCount(4)
  expect(errors).toEqual([])
})

test('hero videos open the supplied clips and close accessibly', async ({ page }) => {
  await page.goto(base)
  await expect(page.locator('.hero-photo')).toHaveCount(0)
  await expect(page.locator('.hero-video')).toHaveCount(3)
  await expect(page.locator('.hero-video-dialog iframe')).toHaveCount(0)
  for (const [index, id] of ['Huq5WJ2grKc', 'n33iO5y6N0g', 'M_ZfyFgI9y0'].entries()) {
    const trigger = page.locator('.hero-video').nth(index)
    await trigger.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('dialog').locator('iframe')).toHaveAttribute('src', `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`)
    await expect(page.getByRole('link', { name: 'Watch on YouTube' })).toHaveAttribute('href', `https://www.youtube.com/watch?v=${id}`)
    if (index === 1) await page.getByRole('button', { name: 'Close video' }).click()
    else await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(page.locator('.hero-video-dialog iframe')).toHaveCount(0)
    await expect(trigger).toBeFocused()
  }
})

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 })
    await page.goto(base)
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('.hero-description')).toHaveCSS('font-size', width < 700 ? '16px' : '17px')
    await expect(page.locator('.hero-description')).toHaveCSS('color', 'rgb(53, 68, 90)')
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    if (width < 700) {
      await page.getByRole('button', { name: 'Open navigation' }).click()
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0)
      const videosTop = await page.locator('.hero-video-strip').evaluate(element => element.getBoundingClientRect().top)
      expect(videosTop).toBeLessThan(844)
    }
    await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true })
  })
}

for (const route of ['/single-tooth-implant', '/dental-implants-cost', '/team', '/faq', '/contact', '/city-of-london', '/conditions', '/blog', '/areas-we-serve', '/terms']) {
  test(`source page ${route} loads on mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${base}${route}`)
    await expect(page.locator('.imported-content h1')).toBeVisible()
    await expect(page.locator('.imported-content p:not(.page-hero-copy h1 + p)').first()).toHaveCSS('color', 'rgb(53, 68, 90)')
    expect(await page.locator('.imported-content').innerText()).not.toHaveLength(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
    expect(await page.title()).not.toBe('dil-new')
  })
}

for (const width of [320, 390, 768, 1440]) {
  test(`gallery filtering and comparisons at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(`${base}/gallery`)
    await expect(page.locator('h1')).toHaveText('Smile Transformations')
    await expect(page.locator('.gallery-disclosure p').first()).toHaveCSS('font-size', '15px')
    await expect(page.locator('.gallery-disclosure p').first()).toHaveCSS('color', 'rgb(53, 68, 90)')
    await expect(page.locator('.gallery-case')).toHaveCount(24)
    const columns = await page.locator('.gallery-cases').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)
    expect(columns).toBe(width > 1100 ? 4 : width > 700 ? 2 : 1)
    await page.getByLabel('Treatments', { exact: true }).selectOption('Dental Implants')
    await expect(page.locator('.gallery-case')).toHaveCount(2)
    await expect(page.getByRole('status')).toHaveText('2 / 24 Case Studies')
    await page.getByRole('slider').first().fill('75')
    await expect(page.locator('.comparison-before').first()).toHaveCSS('clip-path', 'inset(0px 25% 0px 0px)')
    await page.getByRole('slider').first().press('ArrowLeft')
    await expect(page.getByRole('slider').first()).toHaveValue('74')
    await page.getByLabel('Treatments', { exact: true }).selectOption('All')
    await expect(page.locator('.gallery-case')).toHaveCount(24)
    for (const image of await page.locator('.gallery-case img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth), { timeout: 20000 }).toBeGreaterThan(0)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    await expect(page.locator('.gallery-heading .button')).toHaveCSS('background-color', 'rgb(21, 62, 117)')
    await page.locator('h1').click()
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.screenshot({ path: `test-results/gallery-${width}.png`, fullPage: true })
  })
}

test('inner-page navigation, profiles, FAQs and article directory work', async ({ page }) => {
  await page.goto(`${base}/team`)
  await expect(page.locator('.inner-profile')).toHaveCount(8)
  await page.goto(`${base}/faq`)
  const question = page.locator('.inner-page-body details').first()
  await question.locator('summary').click()
  await expect(question).toHaveAttribute('open', '')
  await page.getByRole('navigation', { name: 'On this page' }).locator('summary').click()
  const sectionLink = page.getByRole('navigation', { name: 'On this page' }).getByRole('link').first()
  const target = await sectionLink.getAttribute('href')
  await sectionLink.click()
  expect(new URL(page.url()).hash).toBe(target)
  await page.goto(`${base}/blog`)
  await expect(page.locator('.inner-blog-grid .inner-item')).toHaveCount(10)
  const firstTitle = await page.locator('.inner-blog-grid h2').first().innerText()
  await page.getByRole('button', { name: 'Next page', exact: true }).click()
  await expect(page.locator('.inner-pagination')).toContainText('Page 2 of 68')
  expect(await page.locator('.inner-blog-grid h2').first().innerText()).not.toBe(firstTitle)
  await page.getByRole('searchbox', { name: 'Search articles' }).fill('0% Finance')
  await expect(page.locator('.inner-blog-grid')).toContainText('0% Finance')
  await page.getByRole('searchbox', { name: 'Search articles' }).fill('no-matching-article-xyz')
  await expect(page.getByText('No articles found.')).toBeVisible()
  await page.goto(`${base}/blog/page/68`)
  await expect(page.locator('.inner-pagination')).toContainText('Page 68 of 68')
  await expect(page.getByRole('button', { name: 'Next page', exact: true })).toBeDisabled()
})

test('exhaustive inner-route layout audit', async ({ page }) => {
  test.skip(process.env.AUDIT_ALL_ROUTES !== '1', 'Enable for a complete route audit')
  test.setTimeout(1200000)
  const failures: string[] = []
  const routes = pageIndex.filter(entry => !['/', '/booking'].includes(entry.path))
  for (const [index, entry] of routes.entries()) {
    await page.setViewportSize({ width: 390, height: 900 })
    await page.goto(`${base}${entry.path}`, { waitUntil: 'domcontentloaded' })
    await page.locator('main h1').waitFor()
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      const result = await page.evaluate(async ({ file, route }) => {
        const source = await (await fetch(`/content/${file}`)).json()
        const original = new DOMParser().parseFromString(source.html, 'text/html')
        const rendered = document.querySelector('.inner-page, .gallery-page')
        const headingText = (root: ParentNode) => Array.from(root.querySelectorAll('h1,h2,h3,h4')).map(heading => heading.textContent?.trim()).sort()
        const isDirectory = route === '/blog' || route.startsWith('/blog/page/')
        return { overflow: document.documentElement.scrollWidth > innerWidth, missing: !rendered, headingsMatch: isDirectory || route === '/gallery' || JSON.stringify(headingText(original)) === JSON.stringify(headingText(rendered!)) }
      }, { file: entry.file, route: entry.path })
      if (result.overflow || result.missing || !result.headingsMatch) failures.push(`${entry.path} at ${width}: ${JSON.stringify(result)}`)
    }
    if ((index + 1) % 100 === 0) console.log(`Audited ${index + 1}/${routes.length} inner routes; ${failures.length} findings`)
  }
  console.log(`Audited ${routes.length} routes at mobile and desktop widths`)
  expect(failures).toEqual([])
})

test('all imported routes have individual content and safe links', async ({ request }) => {
  expect(pageIndex.length).toBe(827)
  expect(new Set(pageIndex.map(entry => entry.path)).size).toBe(pageIndex.length)
  for (const entry of pageIndex.filter(entry => entry.path.split('/').length < 3)) {
    const response = await request.get(`${base}/content/${entry.file}`)
    expect(response.ok(), entry.path).toBeTruthy()
    const content = await response.json()
    expect(content.title).toBeTruthy()
    expect(content.html).not.toMatch(/<script|\sonclick=|javascript:/i)
  }
})