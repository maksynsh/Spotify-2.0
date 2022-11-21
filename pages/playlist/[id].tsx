import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import { PlaylistContainer, Song } from 'components'
import { useSpotify } from 'hooks'

const PlaylistSlug: NextPage = ({}) => {
  const spotifyApi = useSpotify()
  const router = useRouter()
  const { id } = router.query

  const [playlist, setPlaylist] = useState<{
    info: SpotifyApi.SinglePlaylistResponse
    tracks: Song[]
  }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setIsLoading(true)

      spotifyApi
        .getPlaylist(id as string)
        .then((data) => {
          setPlaylist({
            info: data?.body,
            tracks:
              data?.body?.tracks?.items?.map((song) => ({
                added_at: song.added_at,
                image: song.track?.album.images.at(-1)?.url ?? '',
                ...song.track,
              })) ?? [],
          })
        })
        .catch((err) => {
          console.error('Something went wrong!', err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [spotifyApi, id])

  return (
    <PlaylistContainer
      id={id}
      uri={playlist?.info?.uri ?? `spotify:playlist:${id}`}
      info={playlist?.info}
      tracks={playlist?.tracks}
      isLoading={isLoading}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default PlaylistSlug
