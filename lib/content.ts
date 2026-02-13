import fs from 'node:fs'
import path from 'node:path'
import Markdoc from '@markdoc/markdoc'
import type { RenderableTreeNodes } from '@markdoc/markdoc'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { postFrontmatterSchema } from 'schemas/frontmatter'

const CONTENT_DIR = path.join(process.cwd(), 'content/posts')
const FILE_EXT = '.md'

export type PostMeta = {
  slug: string
  title: string
  subtitle: string
  date: string
  readingTime: string
}

export type Post = PostMeta & {
  content: RenderableTreeNodes
}

function getSlug(filename: string): string {
  return filename.replace(new RegExp(`${FILE_EXT}$`), '')
}

const markdocConfig = {
  nodes: Markdoc.nodes,
  tags: Markdoc.tags,
}

export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(CONTENT_DIR)
  const mdFiles = filenames.filter((f) => f.endsWith(FILE_EXT))

  const posts: PostMeta[] = []

  for (const filename of mdFiles) {
    const filePath = path.join(CONTENT_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(raw)
    const config = postFrontmatterSchema.parse(frontmatter)
    const { title, subtitle, date } = config

    const slug = getSlug(filename)
    const readingTimeResult = getReadingTime(content)

    posts.push({
      slug,
      title,
      subtitle,
      date,
      readingTime: readingTimeResult.text,
    })
  }

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const filename = `${slug}${FILE_EXT}`
  const filePath = path.join(CONTENT_DIR, filename)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const raw = fs.readFileSync(filePath, 'utf-8')

  const { data: frontmatter, content } = matter(raw)
  const config = postFrontmatterSchema.parse(frontmatter)
  const { title, subtitle, date } = config

  const readingTimeResult = getReadingTime(content)

  const ast = Markdoc.parse(content)
  const renderable = Markdoc.transform(ast, markdocConfig)

  // Next.js getStaticProps requires JSON-serializable props. Markdoc returns
  // Tag class instances; convert to plain objects so they serialize.
  const contentTree = JSON.parse(
    JSON.stringify(renderable)
  ) as RenderableTreeNodes

  return {
    slug,
    title,
    subtitle,
    date,
    readingTime: readingTimeResult.text,
    content: contentTree,
  }
}

const getReadingTime = (content: string) => {
  return readingTime(content, { wordsPerMinute: 275 })
}
