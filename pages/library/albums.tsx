import { ReactElement, useEffect, useState } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import type { NextPageWithLayout } from 'pages/_app'
import { LibraryLayout, PlaylistCard } from 'components'
import { useSpotify } from 'hooks'

const LibraryAlbums: NextPageWithLayout = ({}) => {
  const spotifyApi = useSpotify()

  const [albums, setAlbums] = useState<SpotifyApi.SavedAlbumObject[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setIsLoading(true)

      spotifyApi
        .getMySavedAlbums({ limit: 30 })
        .then((data) => {
          setAlbums(data.body.items)
        })
        .catch((err) => {
          console.error('Something went wrong!', err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [spotifyApi])

  return (
    <div className='flex flex-wrap justify-between w-full gap-2 md:gap-4'>
      {albums?.map(({ album: { uri, id, images, name, artists } }) => (
        <PlaylistCard
          key={id}
          uri={uri}
          imageUrl={images[0].url}
          name={name}
          description={artists[0].name}
          url={`/playlist/${id}`}
        />
      ))}
    </div>
  )
}

LibraryAlbums.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout>{page}</LibraryLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default LibraryAlbums
