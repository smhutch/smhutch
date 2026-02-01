import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkSmartypants from 'remark-smartypants'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    date: { type: 'date', required: true },
    subtitle: { type: 'string', required: true },
    title: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace('.mdx', ''),
    },
    readingTime: {
      type: 'json',
      resolve: (doc) => readingTime(doc.body.raw, { wordsPerMinute: 275 }).text,
    },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkSmartypants],
  },
})
