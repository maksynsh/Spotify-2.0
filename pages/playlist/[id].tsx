import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getSession } from 'next-auth/react'

import { GradientSection, Layout, Song, SongsTable } from 'components'
import { useSpotify } from 'hooks'

const Playlist: NextPage = ({}) => {
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
    <Layout isLoading={isLoading}>
      <GradientSection>
        <div className='flex flex-col sm:flex-row -mt-11 sm:mt-0 align-center gap-4 mx-2 md:mx-8 py-2 md:my-5 h-fit'>
          <div className='w-36 h-36 sm:w-40 sm:h-40 md:w-56 md:h-56 shadow-2xl shadow-dark relative mx-auto sm:mx-0'>
            <Image
              src={playlist?.info?.images[0]?.url || ''}
              loader={() => playlist?.info?.images[0]?.url || ''}
              layout='fill'
              alt='playlistCover'
            />
          </div>
          <div className='flex flex-col'>
            <p className='uppercase hidden sm:block'>
              {playlist?.info?.public && 'public'} {playlist?.info?.type}
            </p>
            <h2
              className={`whitespace-nowrap h-auto sm:h-28 md:h-36 overflow-hidden text-ellipsis sm:whitespace-normal 
              font-bold text-2xl md:text-4xl xl:text-6xl playlist-header
              ${(playlist?.info?.name?.length ?? 1) > 19 && 'text-xl md:text-2xl xl:text-3xl'}
              ${(playlist?.info?.name?.length ?? 1) > 35 && 'text-lg md:text-xl xl:text-2xl'}`}
            >
              {playlist?.info?.name}
            </h2>
            <p className='mt-auto text-sm'>
              <span className='font-semibold'>{playlist?.info?.owner.display_name}</span>
              <wbr />
              <span className='mx-1'>•</span>
              {playlist?.tracks.length} songs
            </p>
          </div>
        </div>
      </GradientSection>
      <div className='-mt-[13.5rem]'>
        <SongsTable
          data={playlist?.tracks || []}
          playlistUri={playlist?.info.uri ?? `spotify:playlist:${id}`}
        />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default Playlist
