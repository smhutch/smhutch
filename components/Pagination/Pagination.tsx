import Link from 'next/link'

import { Text } from 'components/Text'

interface Props {
  id: string
  next?: string
  prev?: string
}

export const Pagination: React.FC<Props> = ({ id, next, prev }) => {
  return (
    <>
      {prev && (
        <Link href={prev} legacyBehavior>
          <a className="mr3" title="previous">
            &larr;
          </a>
        </Link>
      )}
      <Text className="mr3" variant="mono" inline>
        {id}
      </Text>
      {next && (
        <Link href={next} legacyBehavior>
          <a title="next">&rarr;</a>
        </Link>
      )}
    </>
  )
}
