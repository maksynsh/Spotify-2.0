import { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'

import type { NextPageWithLayout } from 'pages/_app'
import { LibraryLayout, PlaylistCard } from 'components'
import { playlistListState } from 'atoms/playlist'

const LibraryPlaylists: NextPageWithLayout = ({}) => {
  const [playlists] = useRecoilState<SpotifyApi.PlaylistObjectSimplified[]>(playlistListState)

  return (
    <div className='flex flex-wrap justify-between w-full gap-2 md:gap-4'>
      {playlists?.map(({ uri, id, images, name, description }) => (
        <PlaylistCard
          key={id}
          uri={uri}
          imageUrl={images[0].url}
          name={name}
          description={description}
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
