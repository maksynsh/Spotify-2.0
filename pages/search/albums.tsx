import { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Card, SearchLayout } from 'components'
import { NextPageWithLayout } from 'pages/_app'

interface SearchAlbumsProps {
  data: SpotifyApi.SearchResponse
}

const SearchAlbums: NextPageWithLayout<SearchAlbumsProps> = ({ data }) => {
  return (
    <div className='card-grid'>
      {data.albums?.items.map(({ uri, id, images, name, artists }) => (
        <Card
          key={id}
          uri={uri}
          imageUrl={images[0].url}
          name={name}
          caption={artists[0]?.name}
          url={`/album/${id}`}
        />
      ))}
    </div>
  )
}

SearchAlbums.getLayout = function getLayout(page: ReactElement) {
  return <SearchLayout>{page}</SearchLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default SearchAlbums
