import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'

import { InfiniteScroll, PlaylistContainer, SongsTable, SongType } from 'components'
import { useSpotify } from 'hooks'

const SONGS_LIMIT = 50

const PlaylistLiked: NextPage = ({}) => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()

  const [tracks, setTracks] = useState<SongType[]>([])
  const [pagination, setPagination] = useState<Omit<SpotifyApi.UsersSavedTracksResponse, 'items'>>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchLikedTracks = (offset?: number) => {
    spotifyApi
      .getMySavedTracks({ limit: SONGS_LIMIT, offset })
      .then((data) => {
        setPagination(() => {
          const { items, ...newPagination } = data.body
          return newPagination
        })

        setTracks((prev) => [
          ...(offset === 0 ? [] : prev),
          ...data.body.items.map((song) => ({
            added_at: song.added_at,
            image: song.track?.album.images.at(-1)?.url ?? '',
            ...song.track,
          })),
        ])
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
      fetchLikedTracks()
    }
  }, [spotifyApi])

  return (
    <PlaylistContainer
      id={'liked'}
      uri={`spotify:user:${session?.user?.id as string}:collection`}
      total={pagination?.total}
      creator={session?.user?.name}
      isLoading={isLoading}
    >
      <InfiniteScroll
        next={fetchLikedTracks}
        hasMore={tracks.length < (pagination?.total || 0)}
        dataLength={tracks.length}
      >
        <SongsTable
          data={tracks || []}
          playlistUri={`spotify:user:${session?.user?.id as string}:collection`}
        />
      </InfiniteScroll>
    </PlaylistContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default PlaylistLiked
