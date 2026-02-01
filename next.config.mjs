import withMarkdoc from '@markdoc/next.js'
import bundleAnalyzerPlugin from '@next/bundle-analyzer'
import typeSafeRoutes from 'next-type-safe-routes/plugin.js'

const withBundleAnalyzer = bundleAnalyzerPlugin()

const TYPE = process.env.BUILD_TYPE || 'normal'

const getConfig = (_phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const config = withMarkdoc()({
    ...defaultConfig,
    pageExtensions: ['md', 'tsx'],
  })

  if (TYPE === 'ROUTES') {
    return typeSafeRoutes({
      ...config,
      typescript: {
        ignoreBuildErrors: true,
      },
    })
  }

  if (TYPE === 'ANALYZE') {
    return withBundleAnalyzer(config)
  }

  return config
}

export default getConfig
