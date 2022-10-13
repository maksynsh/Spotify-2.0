import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { GradientSection, Layout } from 'components'
import { useSpotify } from 'hooks'

const Playlist: NextPage = ({}) => {
  const spotifyApi = useSpotify()
  const router = useRouter()
  const { id } = router.query

  const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse | null>(null)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(id as string)
        .then((data) => {
          setPlaylist(data?.body ?? [])
        })
        .catch((err) => {
          console.error('Something went wrong!', err)
        })
    }
  }, [spotifyApi, id])

  return (
    <Layout>
      <GradientSection>
        <div className='flex align-center gap-4 mx-8 py-2 md:my-6 h-fit'>
          <div className='w-56 h-56 shadow-2xl shadow-dark relative'>
            <Image
              src={playlist?.images[0]?.url || ''}
              loader={() => playlist?.images[0]?.url || ''}
              layout='fill'
              alt='playlistCover'
            />
          </div>
          <div className='flex flex-col'>
            <p className='uppercase'>
              {playlist?.public && 'public'} {playlist?.type}
            </p>
            <h2
              style={{ width: 'calc(100vw - 600px) !important' }}
              className='max-h-32 md:max-h-36 xl:max-h-32 overflow-hidden text-ellipsis font-bold text-2xl md:text-3xl xl:text-6xl'
            >
              {playlist?.name}
            </h2>
            <p className='mt-auto text-sm'>
              <span className='font-semibold'>{playlist?.owner.display_name}</span>
              <span className='mx-1'>•</span>
              {playlist?.tracks?.items.length} songs
            </p>
          </div>
        </div>
      </GradientSection>
    </Layout>
  )
}

export default Playlist
