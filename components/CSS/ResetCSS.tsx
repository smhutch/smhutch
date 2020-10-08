export const ResetCSS: React.FC = () => {
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

      button:focus,
      input:focus,
      textarea:focus {
        outline: none;
      }

      button:focus {
        box-shadow: 0px 0px 0px 3px var(--color-light);
      }
    `}</style>
  )
}
