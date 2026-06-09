import { chromium } from 'playwright'
const BASE = process.env.BASE || 'http://localhost:4176'
const browser = await chromium.launch()
for (const [vp, width] of [['desktop', 1280], ['mobile', 390]]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.querySelector('#gallery')?.scrollIntoView())
  await page.waitForTimeout(1000)
  await page.screenshot({ path: `qa/k_${vp}_gallery.png` })
  await page.evaluate(() => document.querySelector('#visit')?.scrollIntoView())
  await page.waitForTimeout(800)
  await page.screenshot({ path: `qa/k_${vp}_visit.png` })
  console.log('shot', vp)
  await ctx.close()
}
await browser.close()
console.log('done')
