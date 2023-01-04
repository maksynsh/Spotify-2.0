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
  variant?: keyof Styles
  roundedImage?: boolean
}

interface Variant {
  wrapperStyles: string
  imageStyles: string
  titleStyles: string
  buttonStyles: string
}

interface Styles {
  default: Variant
  large: Variant
}

const styles: Styles = {
  default: {
    wrapperStyles: 'gap-3 p-0 md:p-3 mx-auto opacity-0 md:opacity-100',
    imageStyles: 'w-full',
    titleStyles: 'text-center md:text-left text-xs sm:text-base',
    buttonStyles: 'bottom-2 right-2',
  },
  large: {
    wrapperStyles: 'bg-dark hover:bg-[#282828] rounded-lg gap-5 p-2 md:p-5 relative',
    imageStyles: 'w-24',
    titleStyles: 'font-extrabold text-left text-lg sm:text-2xl mb-1',
    buttonStyles: 'bottom-4 right-4',
  },
}

export const Card = ({
  uri,
  name,
  imageUrl,
  caption,
  url,
  variant = 'default',
  roundedImage = false,
}: CardProps) => {
  const [hover, setHover] = useState(false)

  return (
    <Link href={url}>
      <figure
        aria-label={name}
        className={`flex flex-col min-w-[8rem] shrink-0 w-full h-full md:rounded-lg overflow-hidden font-bold cursor-pointer 
        ${styles[variant].wrapperStyles} group
        md:bg-dark md:hover:bg-[#282828] transition-colors ease duration-300`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className={variant === 'default' ? 'relative' : ''}>
          <div
            className={`${styles[variant].imageStyles} relative aspect-square object-cover md:rounded-md  md:mx-0 shadow-lg
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
          <div className={`${styles[variant].buttonStyles} absolute hidden xl:block`}>
            <PlayButton uri={uri} transition={'slideInShort'} show={hover} />
          </div>
        </div>
        <figcaption className='min-w-0 flex flex-col flex-1 gap-1'>
          <p title={name} className={`${styles[variant].titleStyles} line-clamp-1`}>
            {name}
          </p>
          <p className='min-h-[2.5rem] line-clamp-2 text-gray text-sm font-normal'>{caption}</p>
        </figcaption>
      </figure>
    </Link>
  )
}
