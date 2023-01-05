import { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Card, SearchLayout } from 'components'
import { NextPageWithLayout } from 'pages/_app'

interface SearchPlaylistsProps {
  data: SpotifyApi.SearchResponse
}

const SearchPlaylists: NextPageWithLayout<SearchPlaylistsProps> = ({ data }) => {
  return (
    <div className='card-grid'>
      {data.playlists?.items.map(({ uri, id, images, name, description }) => (
        <Card
          key={id}
          uri={uri}
          imageUrl={images[0].url}
          name={name}
          caption={description}
          url={`/playlist/${id}`}
        />
      ))}
    </div>
  )
}

SearchPlaylists.getLayout = function getLayout(page: ReactElement) {
  return <SearchLayout>{page}</SearchLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default SearchPlaylists
