import React, { useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

import { isPlayingState } from 'atoms/song'
import { getRandomGradientColor } from 'components/Layout/components/Content/GradientBackground'
import { backgroundGradientState } from 'atoms/background'

interface SimplifiedPlaylistCardProps {
  id: string
  name: string
  imageUrl: string
  url: string
}

//TODO: make smooth gradient transition

export const SimplifiedPlaylistCard = ({ id, name, imageUrl }: SimplifiedPlaylistCardProps) => {
  const [hover, setHover] = useState(false)
  const [isPlaying] = useRecoilState(isPlayingState)
  const [_, setBackgroundGradient] = useRecoilState(backgroundGradientState)
  const mainColor = useMemo(() => getRandomGradientColor(), [getRandomGradientColor])

  const handleMouseEnter = () => {
    setHover(true)
    setBackgroundGradient(mainColor)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  return (
    <figure
      className='flex h-14 sm:h-20 rounded-lg overflow-hidden font-bold cursor-pointer
        bg-dark bg-opacity-75 hover:bg-opacity-60 transition-colors ease duration-300'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        aria-hidden='false'
        draggable='false'
        loading='lazy'
        src={imageUrl}
        data-testid='shortcut-image'
        alt=''
      />
      <figcaption className='flex items-center justify-between px-2 pr-0 sm:px-4 min-w-0 flex-1'>
        <p className='truncate text-sm sm:text-base'>{name}</p>
        <div className='min-w-12 hidden xl:block'>
          <div
            onClick={() => {}}
            className={`hover:scale-105 transition-all ease duration-200 p-0 ml-2 w-12 h-12 min-w-12
           bg-green text-dark rounded-full cursor-default 
            flex items-center justify-center 
            ${hover ? 'opacity-100 translate-x-0' : 'opacity-0 translate-y-12'}`}
          >
            {isPlaying ? (
              <PauseIcon className='w-8 h-8' />
            ) : (
              <PlayIcon className='w-[29px] h-[29px] ml-0.5' />
            )}
          </div>
        </div>
      </figcaption>
    </figure>
  )
}
