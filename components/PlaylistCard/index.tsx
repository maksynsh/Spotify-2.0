import React, { useMemo } from 'react'
import Link from 'next/link'
import { useRecoilState } from 'recoil'

import { currentContextUriState, isPlayingState } from 'atoms/song'
import { usePlay } from 'hooks'
import { PlayButton } from 'components'

interface SimplifiedPlaylistCardProps {
  uri: string
  name: string
  imageUrl: string
  url: string
  description: string | null
}

export const PlaylistCard = ({
  uri,
  name,
  imageUrl,
  description,
  url,
}: SimplifiedPlaylistCardProps) => {
  const [isPlaying] = useRecoilState(isPlayingState)
  const [currentContextUri] = useRecoilState(currentContextUriState)

  const isPlalistPlaying = useMemo(
    () => isPlaying && currentContextUri === uri,
    [isPlaying, currentContextUri, uri],
  )

  const play = usePlay()

  const handlePlay = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    play({ contextUri: uri })
  }

  return (
    <Link href={url}>
      <figure
        className='flex flex-col shrink-0 w-32 md:w-48 h-44 md:h-[17rem] rounded-lg overflow-hidden font-bold cursor-pointer 
        p-0 md:p-3 gap-3 group
        md:bg-dark md:hover:bg-[#282828] transition-colors ease duration-300'
      >
        <div className='relative'>
          <img
            className={`h-32 md:h-[10.5rem] w-32 md:w-[10.5rem] object-cover rounded-md mx-auto md:mx-0
          group-hover:bg-no-repeat group-hover:brightness-75 transition-all ease duration-300`}
            aria-hidden='false'
            draggable='false'
            loading='lazy'
            src={imageUrl}
            data-testid='shortcut-image'
            alt=''
          />
          <div
            className={`absolute bottom-2 right-2
            hidden xl:block transition-all ease duration-200
            group-hover:translate-y-0 group-hover:opacity-100 
            ${isPlalistPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <PlayButton isPlaying={isPlalistPlaying} handleClick={handlePlay} />
          </div>
        </div>
        <figcaption className='min-w-0 flex flex-col flex-1 gap-1'>
          <p className='truncate text-center md:text-left text-xs sm:text-base'>{name}</p>
          <p className='opacity-0 md:opacity-100 line-clamp-2 text-gray text-sm font-normal'>
            {description}
          </p>
        </figcaption>
      </figure>
    </Link>
  )
}
