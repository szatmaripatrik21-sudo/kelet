import { chromium } from 'playwright'
const BASE = process.env.BASE || 'http://localhost:4179'
const b = await chromium.launch()
const p = await (await b.newContext({ viewport: { width: 1280, height: 860 } })).newPage()
await p.goto(BASE + '/', { waitUntil: 'networkidle' })
await p.waitForTimeout(1500)
await p.screenshot({ path: 'qa/k_hero_1.png' })
await p.waitForTimeout(3800)
await p.screenshot({ path: 'qa/k_hero_2.png' })
await b.close()
console.log('done')
