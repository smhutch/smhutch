export const SpaceCSS = () => {
  return (
    <style global jsx>
      {`
        /* Padding X (left and right) */
        .px0 {
          padding-right: var(--space-0);
          padding-left: var(--space-0);
        }
        .px1 {
          padding-right: var(--space-1);
          padding-left: var(--space-1);
        }
        .px2 {
          padding-right: var(--space-2);
          padding-left: var(--space-2);
        }
        .px3 {
          padding-right: var(--space-3);
          padding-left: var(--space-3);
        }
        .px4 {
          padding-right: var(--space-4);
          padding-left: var(--space-4);
        }
        .px5 {
          padding-right: var(--space-5);
          padding-left: var(--space-5);
        }
        .px6 {
          padding-right: var(--space-6);
          padding-left: var(--space-6);
        }

        /* Padding Y (top and bottom) */
        .py0 {
          padding-top: var(--space-0);
          padding-bottom: var(--space-0);
        }
        .py1 {
          padding-top: var(--space-1);
          padding-bottom: var(--space-1);
        }
        .py2 {
          padding-top: var(--space-2);
          padding-bottom: var(--space-2);
        }
        .py3 {
          padding-top: var(--space-3);
          padding-bottom: var(--space-3);
        }
        .py4 {
          padding-top: var(--space-4);
          padding-bottom: var(--space-4);
        }
        .py5 {
          padding-top: var(--space-5);
          padding-bottom: var(--space-5);
        }
        .py6 {
          padding-top: var(--space-6);
          padding-bottom: var(--space-6);
        }

        /* Padding Top */
        .pt0 {
          padding-top: var(--space-0);
        }
        .pt1 {
          padding-top: var(--space-1);
        }
        .pt2 {
          padding-top: var(--space-2);
        }
        .pt3 {
          padding-top: var(--space-3);
        }
        .pt4 {
          padding-top: var(--space-4);
        }
        .pt5 {
          padding-top: var(--space-5);
        }
        .pt6 {
          padding-top: var(--space-6);
        }

        /* Padding Right */
        .pr0 {
          padding-right: var(--space-0);
        }
        .pr1 {
          padding-right: var(--space-1);
        }
        .pr2 {
          padding-right: var(--space-2);
        }
        .pr3 {
          padding-right: var(--space-3);
        }
        .pr4 {
          padding-right: var(--space-4);
        }
        .pr5 {
          padding-right: var(--space-5);
        }
        .pr6 {
          padding-right: var(--space-6);
        }

        /* Padding Bottom */
        .pb0 {
          padding-bottom: var(--space-0);
        }
        .pb1 {
          padding-bottom: var(--space-1);
        }
        .pb2 {
          padding-bottom: var(--space-2);
        }
        .pb3 {
          padding-bottom: var(--space-3);
        }
        .pb4 {
          padding-bottom: var(--space-4);
        }
        .pb5 {
          padding-bottom: var(--space-5);
        }
        .pb6 {
          padding-bottom: var(--space-6);
        }

        /* Padding Left */
        .pl0 {
          padding-left: var(--space-0);
        }
        .pl1 {
          padding-left: var(--space-1);
        }
        .pl2 {
          padding-left: var(--space-2);
        }
        .pl3 {
          padding-left: var(--space-3);
        }
        .pl4 {
          padding-left: var(--space-4);
        }
        .pl5 {
          padding-left: var(--space-5);
        }
        .pl6 {
          padding-left: var(--space-6);
        }

        /* Margin right */
        .mr0 {
          margin-right: var(--space-0);
        }
        .mr1 {
          margin-right: var(--space-1);
        }
        .mr2 {
          margin-right: var(--space-2);
        }
        .mr3 {
          margin-right: var(--space-3);
        }
        .mr4 {
          margin-right: var(--space-4);
        }
        .mr5 {
          margin-right: var(--space-5);
        }
        .mr6 {
          margin-right: var(--space-6);
        }

        /* Margin bottom */
        .mb0 {
          margin-bottom: var(--space-0);
        }
        .mb1 {
          margin-bottom: var(--space-1);
        }
        .mb2 {
          margin-bottom: var(--space-2);
        }
        .mb3 {
          margin-bottom: var(--space-3);
        }
        .mb4 {
          margin-bottom: var(--space-4);
        }
        .mb5 {
          margin-bottom: var(--space-5);
        }
        .mb6 {
          margin-bottom: var(--space-6);
        }

        /* Margin top? Use padding instead to avoid unexpected margin collapse. */
        /* Margin left? Use padding instead to avoid unexpected margin collapse. */
      `}
    </style>
  )
}
