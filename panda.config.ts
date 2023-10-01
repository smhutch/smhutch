import { defineConfig, definePattern } from '@pandacss/dev'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './components/**/*.{ts,tsx}',
    './css/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  globalCss: {
    '#__next': {
      overflowX: 'hidden',
    },
  },

  // Useful for theme customization
  theme: {
    extend: {},
  },

  patterns: {
    extend: {
      container: definePattern({
        description: 'foo',
        transform: (props) => {
          return {
            paddingX: 8,
            marginX: 'auto',
            maxWidth: 1200,
            width: '100%',
            ...props,
          }
        },
      }),
    },
  },

  // The output directory for your css system
  outdir: 'system',

  // opt-in to stitches-like styled prop
  jsxFramework: 'react',
})
