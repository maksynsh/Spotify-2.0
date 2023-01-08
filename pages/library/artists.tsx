import { ReactElement, useEffect, useState } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import type { NextPageWithLayout } from 'pages/_app'
import { Card, LibraryLayout, Preloader } from 'components'
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

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full h-3/4'>
        <Preloader />
      </div>
    )
  }

  return (
    <div className='card-grid'>
      {artists?.map(({ uri, id, images, name }) => (
        <Card
          key={id}
          uri={uri}
          imageUrl={images[0].url}
          name={name}
          caption='Artist'
          url={`/artist/${id}`}
          roundedImage
        />
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
