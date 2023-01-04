import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { PlayButton } from 'components'

interface CardProps {
  uri: string
  name: string
  imageUrl: string
  url: string
  caption: string | null
  roundedImage?: boolean
}

export const Card = ({ uri, name, imageUrl, caption, url, roundedImage = false }: CardProps) => {
  const [hover, setHover] = useState(false)

  return (
    <Link href={url}>
      <figure
        aria-label={name}
        className='flex flex-col min-w-[8rem] shrink-0 w-full h-full md:rounded-lg overflow-hidden font-bold cursor-pointer 
        p-0 md:p-3 gap-3 group
        md:bg-dark md:hover:bg-[#282828] transition-colors ease duration-300'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className='relative'>
          <div
            className={`w-full aspect-square object-cover md:rounded-md mx-auto md:mx-0 shadow-lg
              group-hover:bg-no-repeat group-hover:brightness-75 transition-all ease duration-300`}
          >
            <Image
              className={roundedImage ? 'rounded-full' : ''}
              aria-hidden='false'
              draggable='false'
              loading='lazy'
              src={imageUrl}
              layout='fill'
              objectFit='cover'
              loader={() => imageUrl}
              data-testid='shortcut-image'
              alt=''
            />
          </div>
          <div
            className={`absolute bottom-2 right-2
            hidden xl:block`}
          >
            <PlayButton uri={uri} transition={'slideInShort'} show={hover} />
          </div>
        </div>
        <figcaption className='min-w-0 flex flex-col flex-1 gap-1'>
          <p className='truncate text-center md:text-left text-xs sm:text-base'>{name}</p>
          <p className='min-h-[2.5rem] opacity-0 md:opacity-100 line-clamp-2 text-gray text-sm font-normal'>
            {caption}
          </p>
        </figcaption>
      </figure>
    </Link>
  )
}
