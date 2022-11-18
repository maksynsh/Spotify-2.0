import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

import { currentContextUriState, isPlayingState } from 'atoms/song'
import { getRandomGradientColor } from 'components/Layout/components/Content/GradientBackground'
import { backgroundGradientState } from 'atoms/background'
import { usePlay } from 'hooks'

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
  const [hover, setHover] = useState(false)
  const [isPlaying] = useRecoilState(isPlayingState)
  const [currentContextUri] = useRecoilState(currentContextUriState)

  const isPlalistPlaying = useMemo(
    () => isPlaying && currentContextUri === uri,
    [isPlaying, currentContextUri, uri],
  )

  const play = usePlay()

  const handlePlay = () => {
    play({ contextUri: uri })
  }

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  return (
    <Link href={url}>
      <figure
        className='flex flex-col shrink-0 w-32 md:w-48 h-44 md:h-[17rem] rounded-lg overflow-hidden font-bold cursor-pointer 
        p-0 md:p-3 gap-3
        md:bg-dark md:hover:bg-[#282828] transition-colors ease duration-300'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='relative'>
          <img
            className={`h-32 md:h-[10.5rem] w-32 md:w-[10.5rem] object-cover rounded-md mx-auto md:mx-0
          ${hover && 'bg-no-repeat brightness-75'} transition-all ease duration-300`}
            aria-hidden='false'
            draggable='false'
            loading='lazy'
            src={imageUrl}
            data-testid='shortcut-image'
            alt=''
          />
          <div
            onClick={handlePlay}
            className={`hover:scale-105 transition-all ease duration-200 
            w-12 h-12 min-w-12 absolute bottom-2 right-2
           bg-green text-dark rounded-full cursor-default 
            hidden xl:flex items-center justify-center
            ${hover || isPlalistPlaying ? 'opacity-100 translate-x-0' : 'opacity-0 translate-y-4'}`}
          >
            {isPlalistPlaying ? (
              <PauseIcon className='w-8 h-8' />
            ) : (
              <PlayIcon className='w-[29px] h-[29px] ml-0.5' />
            )}
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
