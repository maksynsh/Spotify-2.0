import { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Card, SearchLayout } from 'components'
import { NextPageWithLayout } from 'pages/_app'

interface SearchArtistssProps {
  data: SpotifyApi.SearchResponse
}

const SearchArtists: NextPageWithLayout<SearchArtistssProps> = ({ data }) => {
  return (
    <div className='card-grid'>
      {data.artists?.items.map(({ uri, id, images, name }) => (
        <Card
          key={id}
          uri={uri}
          imageUrl={images[0]?.url}
          name={name}
          caption={'Artist'}
          url={`/artist/${id}`}
        />
      ))}
    </div>
  )
}

SearchArtists.getLayout = function getLayout(page: ReactElement) {
  return <SearchLayout>{page}</SearchLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default SearchArtists
