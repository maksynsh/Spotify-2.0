import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getSession } from 'next-auth/react'

import { AlbumTable, PlaylistContainer } from 'components'
import { useSpotify } from 'hooks'

const AlbumSlug: NextPage = ({}) => {
  const spotifyApi = useSpotify()
  const router = useRouter()
  const { id } = router.query

  const [album, setAlbum] = useState<{
    info: SpotifyApi.SingleAlbumResponse
    tracks: SpotifyApi.TrackObjectSimplified[]
  }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setIsLoading(true)

      spotifyApi
        .getAlbum(id as string)
        .then((data) => {
          setAlbum({
            info: data?.body,
            tracks: data?.body?.tracks?.items ?? [],
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
      uri={album?.info?.uri ?? `spotify:playlist:${id}`}
      info={album?.info}
      total={album?.tracks.length}
      creator={
        <Link href={`/artist/${album?.info?.artists[0].id}`}>
          <span className='link'>{album?.info?.artists[0].name}</span>
        </Link>
      }
      isLoading={isLoading}
    >
      <AlbumTable
        data={album?.tracks || []}
        playlistUri={album?.info?.uri ?? `spotify:playlist:${id}`}
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

export default AlbumSlug
