import React, { ReactNode } from 'react'
import Image from 'next/image'

import { Layout, PlayButton } from 'components'
import { useDimensions } from 'hooks'
import moment from 'moment'

interface PlaylistProps {
  uri: string
  id?: string | string[]
  info?: SpotifyApi.SinglePlaylistResponse | SpotifyApi.SingleAlbumResponse
  children: ReactNode
  total?: number
  creator?: string
  isLoading: boolean
}

export const PlaylistContainer = ({
  id,
  uri,
  creator,
  info,
  children,
  total,
  isLoading,
}: PlaylistProps) => {
  const { width } = useDimensions()

  const title = id === 'liked' ? 'Liked Songs' : info?.name

  return (
    <Layout
      Controller={({ headerOpacity }) => (
        <div
          className='flex items-center truncate min-w-0 gap-4'
          style={{ opacity: headerOpacity }}
        >
          <div
            className={`hidden sm:block
            ${headerOpacity >= 1 ? 'opacity-100' : 'opacity-0'}
            transition-all duration-400 ease-in`}
          >
            <PlayButton size={width < 640 ? 'small' : 'default'} uri={uri} />
          </div>
          <h2 className='text-base sm:text-lg md:text-xl font-bold truncate'>{title}</h2>
        </div>
      )}
      isLoading={isLoading}
    >
      <div className='flex flex-col sm:flex-row -mt-1 sm:mt-0 align-center gap-4 mx-2 md:mx-8 py-2 md:my-5 h-fit'>
        <div className='shrink-0 w-36 h-36 sm:w-40 sm:h-40 md:w-56 md:h-56 shadow-2xl shadow-dark relative mx-auto sm:mx-0'>
          <Image
            priority
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
            objectFit='cover'
            alt='playlistCover'
          />
        </div>
        <div className='flex flex-col'>
          <p className='uppercase hidden sm:block'>
            {info && 'public' in info && info.public && 'public'} {info?.type}
          </p>
          <h2
            className={`whitespace-nowrap h-auto sm:h-28 md:h-36 overflow-hidden text-ellipsis sm:whitespace-normal 
              font-bold text-2xl md:text-4xl xl:text-6xl playlist-header
              ${(info?.name?.length ?? 1) > 19 && 'text-xl md:text-2xl xl:text-3xl'}
              ${(info?.name?.length ?? 1) > 35 && 'text-lg md:text-xl xl:text-2xl'}`}
          >
            {title}
          </h2>
          <p className='mt-auto text-sm md:text-base'>
            <span className='font-semibold'>{creator}</span>
            {info?.type === 'album' && (
              <>
                <span className='mx-1'>•</span>
                {moment(info?.release_date).format('YYYY')}
              </>
            )}
            <wbr />
            <span className='mx-1'>•</span>
            {total} songs
          </p>
        </div>
      </div>
      {children}
    </Layout>
  )
}
