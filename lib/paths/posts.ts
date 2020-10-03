import fs from 'fs'
import path from 'path'

const postDir = path.join(process.cwd(), 'posts')
const postFiles = fs.readdirSync(postDir).filter((fn) => {
  return fn !== 'index.js'
})

const stripExtension = (fileName: string) => fileName.replace('.mdx', '')
const addExtension = (fileName: string) => fileName + '.mdx'

export const postIds = () => {
  const ids = postFiles.map(stripExtension)

  return ids
}

export const getPost = (fileName: string): Buffer => {
  const post = fs.readFileSync(path.resolve(postDir, addExtension(fileName)))
  return post
}
