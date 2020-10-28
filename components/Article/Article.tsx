import { MDX } from 'components/MDX'
import { Stack } from 'components/Stack'

export const Article: React.FC = ({ children }) => {
  return (
    <>
      <main>
        <Stack className="pt4 pb6" el="article" gap={4}>
          <MDX>{children}</MDX>
        </Stack>
      </main>
      <style global jsx>{`
        article > pre {
          max-width: 100%;
        }

        article > pre > code,
        article > * {
          display: block;
          max-width: 600px;
          padding: 0 var(--space-4);
          margin-left: auto;
          margin-right: auto;
        }

        article p > code,
        article li > code {
          background-color: var(--color-ultralight);
          color: var(--color-offset);
          padding: 0 3px;
          border-radius: 2px;
        }

        article > blockquote {
          background-color: var(--color-ultralight);
          padding-top: var(--space-4);
          padding-bottom: var(--space-4);
          padding-left: calc(var(--space-4) - var(--space-1));
          position: relative;
          border-radius: 5px;
          border-left: var(--space-1) solid gold;
        }
      `}</style>
    </>
  )
}
