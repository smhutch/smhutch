import { fontSizes, space } from 'lib/theme'

import { ResetCSS } from './ResetCSS'
import { SpaceCSS } from './SpaceCSS'

export const GlobalCSS = () => {
  return (
    <>
      <ResetCSS />
      <SpaceCSS />
      <style global jsx>{`
        :root {
          --color-text: #444;
          --color-dark: #222;
          --color-offset: #5b7588;
          --color-light: #ddd;
          --color-link: #1767a1;
          --space-1: ${space[1]};
          --space-2: ${space[2]};
          --space-3: ${space[3]};
          --space-4: ${space[4]};
          --space-5: ${space[5]};
          --space-6: ${space[6]};
          --font: Inter, Helvetica Neue, sans-serif;
          --font-size-xxl: ${fontSizes.scale[6]};
          --font-size-xl: ${fontSizes.scale[5]};
          --font-size-l: ${fontSizes.scale[4]};
          --font-size-m: ${fontSizes.scale[3]};
          --font-size: ${fontSizes.scale[2]};
          --font-size-s: ${fontSizes.scale[1]};
        }

        * {
          box-sizing: border-box;
          margin: 0;
        }

        html {
          font-size: ${fontSizes.base};
        }

        body {
          color: var(--color-text);
          font-family: var(--font);
          font-weight: 300;
        }

        hr {
          height: 1px;
          background-color: var(--color-light);
          border: none;
        }

        a {
          color: var(--color-link);
          text-decoration: none;
          position: relative;
        }

        a:after {
          content: '';
          position: absolute;
          background: transparent;
          left: 0px;
          right: 0px;
          bottom: 0px;
          height: 40%;
          pointer-events: none;
          transition: 0.2s ease all;
          transform: scaleX(0);
          transform-origin: left center;
          z-index: -1;
          opacity: 0.5;
        }

        a:focus:after,
        a:hover:after {
          background: gold;
          transform: scaleX(1);
        }

        p {
          line-height: 1.6rem;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        ul li {
          padding-left: var(--space-4);
          position: relative;
        }

        ul li:not(:last-of-type) {
          margin-bottom: var(--space-3);
        }

        ul li::before {
          content: '—';
          color: var(--color-light);
          font-weight: 800;
          display: inline-block;
          position: absolute;
          left: 0px;
        }

        /* Utils */
        .container {
          margin-left: auto;
          margin-right: auto;
          max-width: 1000px;
          width: 100%;
          padding-left: 20px;
          padding-right: 20px;
        }

        article {
          max-width: 600px;
        }

        article > * {
          margin-bttom: 20px !important;
        }

        .nums {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </>
  )
}
