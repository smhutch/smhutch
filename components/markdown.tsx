import { link } from 'css/link'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { css } from 'system/css'

const Heading1 = (props: PropsWithChildren) => {
  return (
    <h1 className={css({ fontSize: '4xl', fontWeight: 'semibold', mb: 4 })}>
      {props.children}
    </h1>
  )
}

const Heading2 = (props: PropsWithChildren) => {
  return (
    <h2
      className={css({
        fontSize: '2xl',
        fontWeight: 'semibold',
        mb: 4,
        'p + &, ul + &': {
          mt: 8,
        },
      })}
    >
      {props.children}
    </h2>
  )
}

const Heading3 = (props: PropsWithChildren) => {
  return (
    <h3 className={css({ fontSize: 'xl', fontWeight: 'semibold', mb: 4 })}>
      {props.children}
    </h3>
  )
}

const Paragraph = (props: PropsWithChildren) => {
  return <p className={css({ color: 'gray.800', mb: 4 })}>{props.children}</p>
}

const Ul = (props: PropsWithChildren) => {
  return <ul className={css({ mb: 4 })}>{props.children}</ul>
}

const Li = (props: PropsWithChildren) => {
  return (
    <li
      className={css({
        mb: 2,
        ml: 4,
        position: 'relative',
        _before: {
          content: '""',
          position: 'absolute',
          left: '-4',
          top: '50%',
          height: '1px',
          width: '6px',
          background: 'gray.400',
          borderRadius: '1px',
        },
      })}
    >
      {props.children}
    </li>
  )
}

const Anchor = (props: PropsWithChildren<{ href: string }>) => {
  const isExternal = props.href && !props.href.startsWith('/')
  const className = link({ variant: 'underline' })

  if (isExternal) {
    return (
      <Link
        className={className}
        href={props.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {props.children}
      </Link>
    )
  }

  return (
    <Link className={className} href={props.href}>
      {props.children}
    </Link>
  )
}

/** Map for Markdoc.renderers.react (tag names: h1, h2, h3, p, a, ul, ol, li) */
export const MARKDOC_COMPONENTS = {
  a: Anchor,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  ul: Ul,
  ol: Ul,
  li: Li,
}
