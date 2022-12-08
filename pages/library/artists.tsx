import { ReactElement, useEffect, useState } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import type { NextPageWithLayout } from 'pages/_app'
import { ArtistCard, LibraryLayout } from 'components'
import { useSpotify } from 'hooks'

const LibraryArtists: NextPageWithLayout = ({}) => {
  const spotifyApi = useSpotify()

  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setIsLoading(true)

      spotifyApi
        .getFollowedArtists({ limit: 30 })
        .then((data) => {
          setArtists(data.body.artists.items)
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
      {artists?.map(({ uri, id, images, name }) => (
        <ArtistCard key={id} uri={uri} imageUrl={images[0].url} name={name} url={`/artist/${id}`} />
      ))}
    </div>
  )
}

LibraryArtists.getLayout = function getLayout(page: ReactElement) {
  return <LibraryLayout>{page}</LibraryLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default LibraryArtists
