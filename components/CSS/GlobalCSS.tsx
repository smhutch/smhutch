import { fontSizes, space } from 'lib/theme'

import { ResetCSS } from './ResetCSS'
import { SpaceCSS } from './SpaceCSS'

export const GlobalCSS: React.FC = () => {
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
          --color-ultralight: #f5f5f5;
          --color-link: #1767a1;
          --space-1: ${space[1]};
          --space-2: ${space[2]};
          --space-3: ${space[3]};
          --space-4: ${space[4]};
          --space-5: ${space[5]};
          --space-6: ${space[6]};
          --font: Inter, Helvetica Neue, sans-serif;
          --font-mono: 'IBM Plex Mono', monospace, monospace;
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
          scroll-behavior: smooth;
        }

        body {
          color: var(--color-text);
          font-family: var(--font);
          font-weight: 400;
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

        a:focus {
          outline: 2px dotted black;
          outline-offset: 5px;
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

        a.reset-hover:after {
          visibility: hidden;
        }

        a:hover:after {
          background: gold;
          transform: scaleX(1);
        }

        p {
          line-height: 1.6rem;
        }

        code {
          font-family: var(--font-mono);
        }

        ol,
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        ol {
          counter-reset: ol-counter;
        }

        ol li,
        ul li {
          padding-left: var(--space-4);
          position: relative;
        }

        ol li:not(:last-of-type),
        ul li:not(:last-of-type) {
          margin-bottom: var(--space-3);
        }

        ol li::before,
        ul li::before {
          display: inline-block;
          position: absolute;
          left: 0px;
          speak: none;
        }

        ul li::before {
          content: '—';
          color: var(--color-light);
        }

        ol li::before {
          counter-increment: ol-counter;
          content: counter(ol-counter) '.';
          color: var(--color-offset);
          font-family: var(--font-mono);
        }

        ul.reset li::before {
          display: none;
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

        .nums {
          font-variant-numeric: tabular-nums;
        }

        .block {
          display: block;
        }
      `}</style>
    </>
  )
}
