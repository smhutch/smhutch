/*
  Fonts:
  - Inter: https://rsms.me/inter/
  - Fira Code: https://github.com/tonsky/FiraCode
*/

export const FontCSS = () => {
  return (
    <style global jsx>{`
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100;
        font-display: swap;
        src: url('/fonts/Inter-Thin.woff2') format('woff2'),
          url('/fonts/Inter-Thin.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: italic;
        font-weight: 100;
        font-display: swap;
        src: url('/fonts/Inter-ThinItalic.woff2') format('woff2'),
          url('/fonts/Inter-ThinItalic.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: url('/fonts/Inter-ExtraLight.woff2') format('woff2'),
          url('/fonts/Inter-ExtraLight.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: italic;
        font-weight: 200;
        font-display: swap;
        src: url('/fonts/Inter-ExtraLightItalic.woff2') format('woff2'),
          url('/fonts/Inter-ExtraLightItalic.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('/fonts/Inter-Light.woff2') format('woff2'),
          url('/fonts/Inter-Light.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: italic;
        font-weight: 300;
        font-display: swap;
        src: url('/fonts/Inter-LightItalic.woff2') format('woff2'),
          url('/fonts/Inter-LightItalic.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/Inter-Regular.woff2') format('woff2'),
          url('/fonts/Inter-Regular.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/Inter-Italic.woff2') format('woff2'),
          url('/fonts/Inter-Italic.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/Inter-Medium.woff2') format('woff2'),
          url('/fonts/Inter-Medium.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: italic;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/Inter-MediumItalic.woff2') format('woff2'),
          url('/fonts/Inter-MediumItalic.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/Inter-SemiBold.woff2') format('woff2'),
          url('/fonts/Inter-SemiBold.woff') format('woff');
      }
      @font-face {
        font-family: 'Inter';
        font-style: italic;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/Inter-SemiBoldItalic.woff2') format('woff2'),
          url('/fonts/Inter-SemiBoldItalic.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/Inter-Bold.woff2') format('woff2'),
          url('/fonts/Inter-Bold.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: italic;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/Inter-BoldItalic.woff2') format('woff2'),
          url('/fonts/Inter-BoldItalic.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url('/fonts/Inter-ExtraBold.woff2') format('woff2'),
          url('/fonts/Inter-ExtraBold.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: italic;
        font-weight: 800;
        font-display: swap;
        src: url('/fonts/Inter-ExtraBoldItalic.woff2') format('woff2'),
          url('/fonts/Inter-ExtraBoldItalic.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url('/fonts/Inter-Black.woff2') format('woff2'),
          url('/fonts/Inter-Black.woff') format('woff');
      }

      @font-face {
        font-family: 'Inter';
        font-style: italic;
        font-weight: 900;
        font-display: swap;
        src: url('/fonts/Inter-BlackItalic.woff2') format('woff2'),
          url('/fonts/Inter-BlackItalic.woff') format('woff');
      }

      @font-face {
        font-family: 'FiraCode';
        font-display: swap;
        src: url('/fonts/FiraCode-Regular.woff2') format('woff2'),
          url('/fonts/FiraCode-Regular.woff') format('woff');
      }
    `}</style>
  )
}
