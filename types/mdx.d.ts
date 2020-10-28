declare module '*.mdx' {
  let MDXComponent: (props: unkown) => JSX.Element
  // eslint-disable-next-line import/no-default-export
  export default MDXComponent
}
