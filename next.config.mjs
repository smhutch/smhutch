const getConfig = (_phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    ...defaultConfig,
    typedRoutes: true,
  }

  return config
}

export default getConfig
