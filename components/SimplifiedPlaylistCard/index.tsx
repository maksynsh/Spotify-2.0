import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRecoilState } from 'recoil'

import { getRandomGradientColor } from 'components/Layout/components/Content/GradientBackground'
import { backgroundGradientState } from 'atoms/background'
import { PlayButton } from 'components'

interface SimplifiedPlaylistCardProps {
  uri: string
  name: string
  imageUrl: string
  url: string
}

//TODO: make smooth gradient transition

export const SimplifiedPlaylistCard = ({
  uri,
  name,
  imageUrl,
  url,
}: SimplifiedPlaylistCardProps) => {
  const [hover, setHover] = useState(false)
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
    <Link href={url}>
      <figure
        className='flex h-14 sm:h-20 rounded-lg overflow-hidden font-bold cursor-pointer
        bg-zinc-800 bg-opacity-70 hover:bg-opacity-60 transition-colors ease duration-300'
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
          <p className='truncate text-xs sm:text-base'>{name}</p>
          <div className='min-w-12 hidden xl:block'>
            <PlayButton uri={uri} transition={'slideIn'} show={hover} />
          </div>
        </figcaption>
      </figure>
    </Link>
  )
}
