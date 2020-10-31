import fs from 'fs'
import path from 'path'

import type { BlogPreview } from 'types/blog'

const blogDir = path.join(process.cwd(), '/pages/blog')
const blogPosts = fs
  .readdirSync(blogDir)
  .filter((file) => file !== 'index.tsx')
  .map((fileName) => fileName.replace('.tsx', ''))

export const getBlogIndex = async (): Promise<BlogPreview[]> => {
  const posts: BlogPreview[] = []

  for await (const fileName of blogPosts) {
    const mod = await import(`../pages/blog/${fileName}`)

    if (mod.settings === undefined) {
      throw new Error(`${fileName} must export a settings object`)
    }

    posts.push({
      ...mod.settings,
      permalink: fileName,
    })
  }

  return posts
}
