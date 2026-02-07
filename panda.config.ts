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

  globalCss: {
    '#__next': {
      overflowX: 'hidden',
    },
    body: {
      backgroundColor: 'surface.page',
      color: 'text.default',
      transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
    },
  },

  theme: {
    extend: {
      tokens: {},
      semanticTokens: {
        colors: {
          surface: {
            page: {
              value: { base: '{colors.white}', _dark: '{colors.gray.950}' },
            },
            raised: {
              value: { base: '{colors.gray.50}', _dark: '{colors.gray.900}' },
            },
            sunken: {
              value: { base: '{colors.gray.100}', _dark: '{colors.gray.900}' },
            },
            overlay: {
              value: {
                base: 'rgba(255,255,255,0.8)',
                _dark: 'rgba(0,0,0,0.8)',
              },
            },
            'overlay.light': {
              value: {
                base: 'rgba(255,255,255,0.4)',
                _dark: 'rgba(0,0,0,0.4)',
              },
            },
            card: {
              value: {
                base: 'rgba(248,248,248,0.9)',
                _dark: 'rgba(30,30,30,0.9)',
              },
            },
          },
          text: {
            primary: {
              value: { base: '{colors.gray.950}', _dark: '{colors.gray.50}' },
            },
            default: {
              value: { base: '{colors.gray.800}', _dark: '{colors.gray.200}' },
            },
            secondary: {
              value: { base: '{colors.gray.600}', _dark: '{colors.gray.400}' },
            },
            tertiary: {
              value: { base: '{colors.gray.500}', _dark: '{colors.gray.500}' },
            },
            faint: {
              value: { base: '{colors.gray.400}', _dark: '{colors.gray.600}' },
            },
          },
          border: {
            default: {
              value: { base: '{colors.gray.200}', _dark: '{colors.gray.800}' },
            },
            subtle: {
              value: { base: '{colors.gray.100}', _dark: '{colors.gray.800}' },
            },
            decorative: {
              value: { base: '{colors.gray.300}', _dark: '{colors.gray.700}' },
            },
          },
          accent: {
            line: {
              value: { base: '{colors.black}', _dark: '{colors.white}' },
            },
            primary: {
              value: { base: '{colors.pink.600}', _dark: '{colors.pink.400}' },
            },
            'primary.subtle': {
              value: { base: '{colors.pink.100}', _dark: '{colors.pink.900}' },
            },
            hover: {
              value: { base: '{colors.pink.200}', _dark: '{colors.pink.800}' },
            },
          },
          interactive: {
            hover: {
              value: { base: '{colors.gray.100}', _dark: '{colors.gray.800}' },
            },
          },
        },
      },
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
