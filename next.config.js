const bundleAnalyzerPlugin = require('@next/bundle-analyzer')
const mdxPlugin = require('@next/mdx')
const emojis = require('rehype-accessible-emojis')
const remarkCodeTitles = require('remark-code-titles')
const remarkExternalLinks = require('remark-external-links')
const remarkSlug = require('remark-slug')

const withBundleAnalyzer = bundleAnalyzerPlugin()
const withMDX = mdxPlugin({
  options: {
    remarkPlugins: [
      // adds .remark-code-title, and filename above code blocks.
      remarkCodeTitles,
      [
        // Add html attributes to external links
        remarkExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
      remarkSlug,
    ],
    rehypePlugins: [
      // makes emoji a11y compliant
      emojis.rehypeAccessibleEmojis,
    ],
  },
})

module.exports = (_phase, { defaultConfig }) => {
  const isPuppeteer = !!process.env.META

  const config = {
    ...defaultConfig,
    devIndicators: {
      // Hide prerender indicator during automation.
      autoPrerender: !isPuppeteer,
    },
    env: {
      GA_TRACKING_ID: process.env.GA_TRACKING_ID,
      IS_PUPPETEER: isPuppeteer,
      SITE_URL: process.env.SITE_URL,
    },
    // Only allow MDX and TypeScript pages
    pageExtensions: ['ts', 'mdx', 'tsx'],
  }

  if (process.env.ANALYZE === 'true') {
    return withBundleAnalyzer(withMDX(config))
  }

  return withMDX(config)
}
