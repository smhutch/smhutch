#!/usr/bin/env zx

import 'zx/globals'

import fs from 'node:fs'
import path from 'node:path'

import { chromium } from 'playwright'

const sketchDir = path.join(process.cwd(), '/sketches')

const sketchFiles = fs
  .readdirSync(sketchDir)
  .map((filename) => filename.replace('.ts', ''))
  .filter((filename) => filename !== 'index')

const getSketchImages = async () => {
  const ids = sketchFiles
  const _publicSketchAssets = path.join(process.cwd(), 'public/sketches')

  const idsToGenerate = ids.filter((_id) => {
    // const needsMetaImage = !fs.existsSync(
    //   `${publicSketchAssets}/${id}/preview.png`
    // )
    // return needsMetaImage
  })

  // Only proceed if assets have not already been generated.
  if (!idsToGenerate.length) {
    console.log('No assets need generated.')
    return
  }

  const getImages = async (ids) => {
    // use headless: false to debug.
    const browser = await chromium.launch({ headless: false })

    const browserContext = await browser.newContext()
    const page = await browserContext.newPage()

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

      console.log(id, ids)

      // Go to meta page
      await page.goto(`http://localhost:8000/sketches/${id}`)

      // Screenshot entire page, for meta image
      await page.screenshot({ path: `${outDir}/meta.png` })

      const _canvas = await page.$('canvas')
      // console.log(canvas)
      // await canvas.screenshot({ path: `${outDir}/preview.png` })

      // console.log(`${id} — Assets created.`)
    }
    // await browser.close()
  }

  await getImages(idsToGenerate)
}

getSketchImages()
