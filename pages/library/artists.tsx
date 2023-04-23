import { ReactElement, useEffect, useState } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import type { NextPageWithLayout } from 'pages/_app'
import { Card, InfiniteScroll, LibraryLayout, Preloader } from 'components'
import { useSpotify } from 'hooks'

const LibraryArtists: NextPageWithLayout = ({}) => {
  const spotifyApi = useSpotify()

  const [data, setData] =
    useState<SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = () => {
    spotifyApi
      .getFollowedArtists({ limit: 30, after: data?.items.at(-1)?.id })
      .then((data) => {
        setData(data.body.artists)
      })
      .catch((err) => {
        console.error('Something went wrong!', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setIsLoading(true)
      fetchData()
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
    <InfiniteScroll
      next={fetchData}
      hasMore={(data?.items?.length || 0) < (data?.total || 0)}
      dataLength={data?.items?.length || 0}
    >
      <div className='card-grid'>
        {data?.items?.map(({ uri, id, images, name }) => (
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
    </InfiniteScroll>
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
