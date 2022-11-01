import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

import { isPlayingState } from 'atoms/song'

interface SimplifiedPlaylistCardProps {
  id: string
  name: string
  imageUrl: string
  url: string
}

export const SimplifiedPlaylistCard = ({ id, name, imageUrl }: SimplifiedPlaylistCardProps) => {
  const [hover, setHover] = useState(false)
  const [isPlaying] = useRecoilState(isPlayingState)

  return (
    <figure
      className='flex h-20 rounded-lg overflow-hidden font-bold cursor-pointer
        bg-dark bg-opacity-75 hover:bg-opacity-60 transition-colors ease duration-300'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        aria-hidden='false'
        draggable='false'
        loading='lazy'
        src={imageUrl}
        data-testid='shortcut-image'
        alt=''
      />
      <figcaption className='flex items-center justify-between px-4 min-w-0 flex-1'>
        <p className='truncate'>{name}</p>
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
