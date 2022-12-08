import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'

import { PlaylistContainer, Song, SongsTable } from 'components'
import { useSpotify } from 'hooks'

const SONGS_LIMIT = 50

const PlaylistLiked: NextPage = ({}) => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()

  const [tracks, setTracks] = useState<Song[]>()
  const [pagination, setPagination] = useState<Omit<SpotifyApi.UsersSavedTracksResponse, 'items'>>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchLikedTracks = (offset = 0) => {
    return spotifyApi
      .getMySavedTracks({ limit: SONGS_LIMIT, offset: offset })
      .then((data) => {
        setPagination(() => {
          const { items, ...newPagination } = data.body
          return newPagination
        })

        setTracks(
          data?.body?.items?.map((song) => ({
            added_at: song.added_at,
            image: song.track?.album.images.at(-1)?.url ?? '',
            ...song.track,
          })) ?? [],
        )
      })
      .catch((err) => {
        console.error('Something went wrong!', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!spotifyApi.getAccessToken()) {
      return
    }
    ;(async () => {
      setIsLoading(true)
      await fetchLikedTracks()
      setIsLoading(false)
    })()
  }, [spotifyApi])

  return (
    <PlaylistContainer
      id={'liked'}
      uri={`spotify:user:${session?.user?.id as string}:collection`}
      total={pagination?.total}
      creator={session?.user?.name}
      isLoading={isLoading}
    >
      <SongsTable
        data={tracks || []}
        playlistUri={`spotify:user:${session?.user?.id as string}:collection`}
      />
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
