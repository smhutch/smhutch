const withBundleAnalyzer = require('@next/bundle-analyzer')()
const withMDX = require('@next/mdx')()

module.exports = (_phase, { defaultConfig }) => {
  const config = {
    ...defaultConfig,
    env: {
      GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    },
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  }

  if (process.env.ANALYZE === 'true') {
    return withBundleAnalyzer(withMDX(config))
  }

  return withMDX(config)
}
