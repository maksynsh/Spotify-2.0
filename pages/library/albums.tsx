import { ReactElement, useEffect, useState } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import type { NextPageWithLayout } from 'pages/_app'
import { Card, InfiniteScroll, LibraryLayout, Preloader } from 'components'
import { useSpotify } from 'hooks'

const LibraryAlbums: NextPageWithLayout = ({}) => {
  const spotifyApi = useSpotify()

  const [data, setData] = useState<SpotifyApi.UsersSavedAlbumsResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = (offset: number = 0) => {
    spotifyApi
      .getMySavedAlbums({ limit: 30, offset })
      .then((res) => {
        setData(res.body)
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
        {data?.items.map(({ album: { uri, id, images, name, artists } }) => (
          <Card
            key={id}
            uri={uri}
            imageUrl={images[0].url}
            name={name}
            caption={artists[0].name}
            url={`/album/${id}`}
          />
        ))}
      </div>
    </InfiniteScroll>
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
