declare module '@mdx-js/react' {
  type MdxProps = {
    children: React.ReactNode
    className?: string
  }

  type ProviderProps = {
    components: Record<string, (mdxProps: MdxProps) => React.ReactElement>
  }

  export class MDXProvider extends React.Component<ProviderProps> {}
}
