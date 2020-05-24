export const Credit = ({ id, owner, site }) => {
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
