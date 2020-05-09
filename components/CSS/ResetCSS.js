export const ResetCSS = () => {
  return (
    <style global jsx>{`
      button {
        padding: 0;
        background-color: transparent;
        border: none;
      }

      ul.reset,
      ol.reset {
        padding: 0;
      }

      ul.reset li,
      ol.reset li {
        padding: 0;
        list-style: none;
      }

      a:focus {
        outline: 3px solid var(--color-offset);
        outline-offset: 2px;
      }

      a:active {
        outline: 3px solid var(--color-light);
        outline-offset: 2px;
      }

      button:focus,
      input:focus,
      textarea:focus {
        outline: none;
      }

      button:hover,
      button:focus {
        box-shadow: 0px 0px 0px 3px var(--color-light);
      }
    `}</style>
  )
}
