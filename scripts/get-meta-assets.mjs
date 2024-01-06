#!/usr/bin/env zx

import 'zx/globals'

import fs from 'fs'
import path from 'path'

import { chromium } from 'playwright'

const sketchDir = path.join(process.cwd(), '/sketches')

const sketchFiles = fs
  .readdirSync(sketchDir)
  .map((filename) => filename.replace('.ts', ''))

const getSketchImages = async () => {
  const ids = sketchFiles
  const publicSketchAssets = path.join(process.cwd(), 'public/sketches')

  const idsToGenerate = ids.filter((id) => {
    const needsPreview = !fs.existsSync(
      `${publicSketchAssets}/${id}/preview.png`
    )
    return needsPreview
  })

  // Only proceed if assets have not already been generated.
  if (!idsToGenerate.length) {
    console.log('No assets need generated.')
    return
  }

  const getImages = async (ids) => {
    const browser = await chromium.launch({ headless: false })

    // Create a new incognito browser context
    const context = await browser.newContext()
    // Create a new page inside context.
    const page = await context.newPage()
    await page.goto('https://example.com')

    // use headless: false to debug.
    // const browser = await pw.launch({ headless: true })
    // const page = await browser.newPage()

    // Sized for OG meta images.
    await page.setViewportSize({
      width: 1200,
      height: 630,
    })

    for (const id of ids) {
      const outDir = `public/sketches/${id}`

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir)
      }

      // Go to meta page
      await page.goto(`http://localhost:5000/sketches/${id}?pupeteer=true`)

      // Screenshot entire page, for meta image
      await page.screenshot({ path: `${outDir}/meta.png` })

      const canvas = await page.$('canvas')
      console.log(canvas)
      await canvas.screenshot({ path: `${outDir}/preview.png` })

      console.log(`${id} — Assets created.`)
    }

    debugger
    // await browser.close()
  }

  await getImages(idsToGenerate)
}

getSketchImages()
