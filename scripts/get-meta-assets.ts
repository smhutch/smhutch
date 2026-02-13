import fs from 'node:fs'
import path from 'node:path'

import { chromium } from 'playwright'

const sketchDir = path.join(process.cwd(), 'sketches')
const CONCURRENCY = 10
const META_VIEWPORT = { width: 1200, height: 630 }
const FORCE_GENERATE = true

const sketchIds = fs
  .readdirSync(sketchDir)
  .map((f) => f.replace(/\.ts$/, ''))
  .filter((id) => id !== 'index')

async function captureOne(options: {
  context: Awaited<
    ReturnType<Awaited<ReturnType<typeof chromium.launch>>['newContext']>
  >
  id: string
  baseUrl: string
  outDir: string
}) {
  const { context, id, baseUrl, outDir } = options
  const page = await context.newPage()
  try {
    await page.setViewportSize(META_VIEWPORT)
    await page.goto(`${baseUrl}/sketches/meta/${id}`, {
      waitUntil: 'networkidle',
    })
    await page.waitForSelector('canvas', { timeout: 10000 })
    await page.waitForTimeout(500)

    await page.screenshot({ path: path.join(outDir, id, 'meta.png') })

    const canvas = page.locator('canvas').first()
    const count = await page.locator('canvas').count()

    if (count > 0) {
      await canvas.screenshot({ path: path.join(outDir, id, 'preview.png') })
    }
    console.log(`${id} — done`)
  } finally {
    await page.close()
  }
}

async function getSketchImages() {
  const baseUrl = 'http://localhost:3000'
  const outBaseDir = path.join(process.cwd(), 'public', 'sketches')

  const idsToGenerate = sketchIds.filter((id) => {
    if (FORCE_GENERATE) return true
    const metaPath = path.join(outBaseDir, id, 'meta.png')
    return !fs.existsSync(metaPath)
  })

  if (idsToGenerate.length === 0) {
    console.log('No assets to generate.')
    return
  }

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()

  for (let i = 0; i < idsToGenerate.length; i += CONCURRENCY) {
    const batch = idsToGenerate.slice(i, i + CONCURRENCY)
    for (const id of batch) {
      const outDir = path.join(outBaseDir, id)
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
    }
    await Promise.all(
      batch.map((id) =>
        captureOne({ context, id, baseUrl, outDir: outBaseDir })
      )
    )
  }

  await browser.close()
}

getSketchImages()
