import { defineConfig, definePattern } from '@pandacss/dev'

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

  theme: {
    extend: {
      tokens: {},
    },
  },

  // Fix backdrop-filter: preset emits -webkit last, which overrides standard. Put standard last so it wins.
  utilities: {
    extend: {
      backdropFilter: {
        transform(value: string) {
          return {
            WebkitBackdropFilter: value,
            backdropFilter: value,
          }
        },
      },
    },
  },

  patterns: {
    extend: {
      container: definePattern({
        transform: (props) => {
          return {
            paddingX: 6,
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
