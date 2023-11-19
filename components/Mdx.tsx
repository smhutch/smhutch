import { link } from 'css/link'
import Link from 'next/link'
import { css } from 'system/css'

const Heading1: React.FC = (props) => {
  return (
    <h1 className={css({ fontSize: '4xl', fontWeight: 'semibold', mb: 4 })}>
      {props.children}
    </h1>
  )
}

const Heading2: React.FC = (props) => {
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

const Heading3: React.FC = (props) => {
  return (
    <h3 className={css({ fontSize: 'xl', fontWeight: 'semibold', mb: 4 })}>
      {props.children}
    </h3>
  )
}

const Paragraph: React.FC = (props) => {
  return <p className={css({ color: 'gray.800', mb: 4 })}>{props.children}</p>
}

const Ul: React.FC = (props) => {
  return <ul className={css({ mb: 4 })}>{props.children}</ul>
}

const Li: React.FC = (props) => {
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

const Anchor: React.FC<{ href: string }> = (props) => {
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

export const MDX_COMPONENTS = {
  a: Anchor,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  ul: Ul,
  li: Li,
}
