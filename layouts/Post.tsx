import { Article } from 'components/Article'
import { Meta } from 'components/Meta'
import { Text } from 'components/Text'
import type { BlogSettings } from 'types/blog'

export const Post: React.FC<BlogSettings> = ({
  description,
  title,
  children,
}) => {
  return (
    <>
      <Meta description={description} title={title} />
      <Article>
        <Text el="h1">{title}</Text>
        {children}
      </Article>
    </>
  )
}
