const withBundleAnalyzer = require('@next/bundle-analyzer')()
const withMDX = require('@next/mdx')()

module.exports = (_phase, { defaultConfig }) => {
  const config = {
    ...defaultConfig,
    env: {
      GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    },
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
    webpack: (config) => {
      // import aliases to avoid long import paths.
      config.resolve.alias['components'] = `${__dirname}/components`
      config.resolve.alias['lib'] = `${__dirname}/lib`
      return config
    },
  }

  if (process.env.ANALYZE === 'true') {
    return withBundleAnalyzer(config)
  }

  return withMDX(config)
}
