interface Props {
  id: string
  owner: string
  site?: 'unsplash'
}

export const Credit: React.FC<Props> = ({ id, owner, site = 'unsplash' }) => {
  switch (site) {
    case 'unsplash':
      return (
        <>
          Photo by <a href={`https://unsplash.com/photos/${id}`}>{owner}</a> on{' '}
          <a href="https://unsplash.com">Unsplash</a>
        </>
      )
    default:
      return null
  }
}
