import fs from "node:fs";
import path from "node:path";

import { chromium } from "playwright";

const sketchDir = path.join(process.cwd(), "sketches");

const sketchFiles = fs
  .readdirSync(sketchDir)
  .map((filename) => filename.replace(".ts", ""))
  .filter((filename) => filename !== "index");

async function getSketchImages() {
  const ids = sketchFiles;
  const publicSketchAssets = path.join(process.cwd(), "public/sketches");

  const idsToGenerate = ids.filter((id) => {
    const metaPath = path.join(publicSketchAssets, id, "meta.png");
    return !fs.existsSync(metaPath);
  });

  if (idsToGenerate.length === 0) {
    console.log("No assets need generated.");
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  await context.setViewportSize({
    width: 1200,
    height: 630,
  });

  const page = await context.newPage();

  for (const id of idsToGenerate) {
    const outDir = path.join(process.cwd(), "public/sketches", id);

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    console.log(`Generating assets for ${id}...`);

    await page.goto(`http://localhost:8000/sketches/${id}`);
    await page.screenshot({ path: path.join(outDir, "meta.png") });

    const canvas = page.locator("canvas").first();
    const canvasCount = await page.locator("canvas").count();
    if (canvasCount > 0) {
      await canvas.screenshot({ path: path.join(outDir, "preview.png") });
    }

    console.log(`${id} — Assets created.`);
  }

  await browser.close();
}

getSketchImages();
