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

  conditions: {
    extend: {
      dark: '.dark &',
    },
  },

  theme: {
    extend: {
      tokens: {
        colors: {
          black: {
            value: '#000000',
          },
          white: {
            value: '#FFFFFF',
          },
          // black: mapColorTokensToPandaConfig(GRAY_DARK),
          // white: mapColorTokensToPandaConfig(GRAY_LIGHT),
        },
        durations: {
          common: {
            value: '0.2s',
          },
        },
      },
      semanticTokens: {
        colors: {
          surface: {
            page: {
              value: { base: '{colors.white}', _dark: '{colors.black}' },
            },
            sunken: {
              value: {
                base: '{colors.gray.100}',
                _dark: '{colors.neutral.950}',
              },
            },
          },
          text: {
            DEFAULT: {
              value: { base: '{colors.gray.800}', _dark: '{colors.gray.200}' },
            },
            primary: {
              value: { base: '{colors.gray.950}', _dark: '{colors.gray.50}' },
            },
            secondary: {
              value: {
                base: '{colors.gray.600}',
                _dark: '{colors.neutral.300}',
              },
            },
            tertiary: {
              value: { base: '{colors.gray.500}', _dark: '{colors.gray.400}' },
            },
          },
          border: {
            DEFAULT: {
              value: {
                base: '{colors.neutral.100}',
                _dark: '{colors.neutral.900}',
              },
            },
          },
          accent: {
            primary: {
              value: { base: '{colors.pink.600}', _dark: '{colors.pink.400}' },
            },
            hover: {
              value: { base: '{colors.pink.200}', _dark: '{colors.pink.800}' },
            },
          },
          header: {},
        },
      },
    },
  },

  globalCss: {
    '#__next': {
      overflowX: 'hidden',
    },
    body: {
      backgroundColor: '{colors.surface.page}',
      color: 'text',
      transition: '{transitions.common}',
      transitionDuration: '{durations.common}',
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
            maxWidth: 1100,
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
