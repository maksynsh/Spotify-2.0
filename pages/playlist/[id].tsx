import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { GradientSection, Layout, SongsTable } from 'components'
import { useSpotify } from 'hooks'

const Playlist: NextPage = ({}) => {
  const spotifyApi = useSpotify()
  const router = useRouter()
  const { id } = router.query

  const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setIsLoading(true)

      spotifyApi
        .getPlaylist(id as string)
        .then((data) => {
          setPlaylist(data?.body ?? [])
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
        <div className='flex flex-col sm:flex-row -mt-11 sm:mt-0 align-center gap-4 mx-2 md:mx-8 py-2 md:my-6 h-fit'>
          <div className='w-36 h-36 sm:w-40 sm:h-40 md:w-56 md:h-56 shadow-2xl shadow-dark relative mx-auto sm:mx-0'>
            <Image
              src={playlist?.images[0]?.url || ''}
              loader={() => playlist?.images[0]?.url || ''}
              layout='fill'
              alt='playlistCover'
            />
          </div>
          <div className='flex flex-col'>
            <p className='uppercase hidden sm:block'>
              {playlist?.public && 'public'} {playlist?.type}
            </p>
            <h2
              className={`whitespace-nowrap h-auto sm:h-28 md:h-36 overflow-hidden text-ellipsis sm:whitespace-normal font-bold text-2xl md:text-3xl xl:text-6xl playlist-header
              ${(playlist?.name?.length ?? 1) > 19 && 'text-xl md:text-1xl xl:text-3xl'}
              ${(playlist?.name?.length ?? 1) > 35 && 'text-lg md:text-xl xl:text-2xl'}`}
            >
              {playlist?.name}
            </h2>
            <p className='mt-auto text-sm'>
              <span className='font-semibold'>{playlist?.owner.display_name}</span>
              <wbr />
              <span className='mx-1'>•</span>
              {playlist?.tracks?.items.length} songs
            </p>
          </div>
        </div>
      </GradientSection>
      <div className='-mt-32'>
        <SongsTable
          data={
            playlist?.tracks?.items?.map((song) => ({ added_at: song.added_at, ...song.track })) ??
            []
          }
        />
      </div>
    </Layout>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context)

//   return {
//     props: { session },
//   }
// }

export default Playlist
