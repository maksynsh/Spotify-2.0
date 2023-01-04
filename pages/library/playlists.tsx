import { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'

import type { NextPageWithLayout } from 'pages/_app'
import { Card, LibraryLayout } from 'components'
import { playlistListState } from 'atoms/playlist'

const LibraryPlaylists: NextPageWithLayout = ({}) => {
  const [playlists] = useRecoilState<SpotifyApi.PlaylistObjectSimplified[]>(playlistListState)

  return (
    <div className='card-grid'>
      {playlists?.map(({ uri, id, images, name, description }) => (
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

LibraryPlaylists.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout>{page}</LibraryLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default LibraryPlaylists
