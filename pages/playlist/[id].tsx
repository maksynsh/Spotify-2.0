import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { PlaylistContainer, Preloader, SongsTable, SongType } from 'components'
import { useSpotify } from 'hooks'

const PlaylistSlug: NextPage = ({}) => {
  const spotifyApi = useSpotify()
  const router = useRouter()
  const { id } = router.query

  const [playlist, setPlaylist] = useState<{
    info: SpotifyApi.SinglePlaylistResponse
    tracks: SongType[]
  }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<{ status: number; message: string } | null>(null)

  const fetchTracks = () => {
    const offset = playlist?.tracks.length || 0

    spotifyApi
      .getPlaylistTracks(id as string, { offset, limit: 100 })
      .then((data) => {
        const { items } = data.body
        setPlaylist((prev) => ({
          tracks: [
            ...(prev?.tracks || []),
            ...(items?.map((song) => ({
              added_at: song.added_at,
              image: song.track?.album.images.at(-1)?.url ?? '',
              ...song.track,
            })) || []),
          ],
          //@ts-ignore
          info: prev.info,
        }))
      })
      .catch((err) => {
        console.error('Something went wrong!', err)
      })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setError(null)
      setIsLoading(true)

      spotifyApi
        .getPlaylist(id as string)
        .then((data) => {
          const { tracks } = data.body
          setPlaylist({
            info: data?.body,
            tracks:
              tracks?.items?.map((song) => ({
                added_at: song.added_at,
                image: song.track?.album.images.at(-1)?.url ?? '',
                ...song.track,
              })) ?? [],
          })
        })
        .catch((err) => {
          if (err.body.error.status === 404) {
            router.push('/404')
            return
          }
          setError(err.body.error)
          console.error('Something went wrong!', err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [spotifyApi, id])

  if (error) {
    return (
      <div className='text-red-600'>
        {error.status}. {error.message}
      </div>
    )
  }

  return (
    <PlaylistContainer
      id={id}
      uri={playlist?.info?.uri ?? `spotify:playlist:${id}`}
      info={playlist?.info}
      total={playlist?.info.tracks.total}
      creator={playlist?.info?.owner?.display_name}
      isLoading={isLoading}
    >
      <InfiniteScroll
        next={fetchTracks}
        hasMore={(playlist?.tracks?.length || 0) < (playlist?.info?.tracks?.total || 0)}
        dataLength={playlist?.tracks.length || 0}
        loader={
          <div className='w-full flex justify-center'>
            <Preloader />
          </div>
        }
      >
        <SongsTable
          data={playlist?.tracks || []}
          playlistUri={playlist?.info?.uri ?? `spotify:playlist:${id}`}
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

export default PlaylistSlug
