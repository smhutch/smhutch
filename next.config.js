/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')()
const withMDX = require('@next/mdx')()

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
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  }

  if (process.env.ANALYZE === 'true') {
    return withBundleAnalyzer(withMDX(config))
  }

  return withMDX(config)
}
