import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRecoilState } from 'recoil'

import { Layout, PlayButton, SongsTable, Song } from 'components'
import { useDimensions } from 'hooks'
import { backgroundGradientState } from 'atoms/background'

const HEADER_OFFSET_START = 100 //px

interface PlaylistInfo {
  name?: string
  public?: boolean | null
  owner?: SpotifyApi.UserObjectPublic
  images?: SpotifyApi.ImageObject[]
}

interface PlaylistProps {
  uri: string
  id?: string | string[]
  info?: PlaylistInfo
  tracks?: Song[]
  total?: number
  creator?: string
  isLoading: boolean
}

export const PlaylistContainer = ({
  id,
  uri,
  creator,
  info,
  tracks,
  total,
  isLoading,
}: PlaylistProps) => {
  const { width } = useDimensions()

  const [backgroundGradient] = useRecoilState<string>(backgroundGradientState)
  const [headerOpacity, setHeaderOpacity] = useState(0)

  const headerBackground = useMemo(
    () => backgroundGradient.replace('from', 'bg'),
    [backgroundGradient],
  )

  const handleScroll = () => {
    const opacity = Math.floor((window.pageYOffset - HEADER_OFFSET_START) / 3) / 100

    if (opacity > 1) {
      return setHeaderOpacity(1)
    }
    if (opacity < 0) {
      return setHeaderOpacity(0)
    }
    setHeaderOpacity(opacity)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const title = id === 'liked' ? 'Liked Songs' : info?.name

  return (
    <Layout isLoading={isLoading}>
      <div
        className={`fixed w-full top-0 px-8 py-2 z-40 ${headerBackground ? headerBackground : ''}
          flex flex-row-reverse sm:flex-row gap-4 items-center ${!headerOpacity && 'hidden'}
          `}
        style={{ opacity: headerOpacity, backgroundImage: 'linear-gradient(rgb(0 0 0/65%) 0 0)' }}
      >
        <div
          className={`${
            headerOpacity >= 1 ? 'opacity-100' : 'opacity-0'
          } transition-all duration-400 ease-in`}
        >
          <PlayButton size={width < 640 ? 'small' : 'default'} uri={uri} />
        </div>
        <h2 className='text-lg sm:text-xl font-bold truncate'>{title}</h2>
      </div>

      <div className='flex flex-col sm:flex-row -mt-11 sm:mt-0 align-center gap-4 mx-2 md:mx-8 py-2 md:my-5 h-fit'>
        <div className='shrink-0 w-36 h-36 sm:w-40 sm:h-40 md:w-56 md:h-56 shadow-2xl shadow-dark relative mx-auto sm:mx-0'>
          <Image
            src={
              info?.images
                ? info?.images[0]?.url || ''
                : 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'
            }
            loader={() =>
              info?.images
                ? info?.images[0]?.url || ''
                : 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'
            }
            layout='fill'
            alt='playlistCover'
          />
        </div>
        <div className='flex flex-col'>
          <p className='uppercase hidden sm:block'>{info?.public && 'public'} Playlist</p>
          <h2
            className={`whitespace-nowrap h-auto sm:h-28 md:h-36 overflow-hidden text-ellipsis sm:whitespace-normal 
              font-bold text-2xl md:text-4xl xl:text-6xl playlist-header
              ${(info?.name?.length ?? 1) > 19 && 'text-xl md:text-2xl xl:text-3xl'}
              ${(info?.name?.length ?? 1) > 35 && 'text-lg md:text-xl xl:text-2xl'}`}
          >
            {title}
          </h2>
          <p className='mt-auto text-sm'>
            <span className='font-semibold'>{creator}</span>
            <wbr />
            <span className='mx-1'>•</span>
            {total ? total : tracks?.length} songs
          </p>
        </div>
      </div>
      <SongsTable data={tracks || []} playlistUri={uri} />
    </Layout>
  )
}