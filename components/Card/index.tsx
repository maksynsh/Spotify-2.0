import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { PlayButton } from 'components'

interface CardProps {
  uri: string
  name: string
  imageUrl: string
  url: string
  caption: React.ReactElement | string | null
  variant?: keyof Styles
  roundedImage?: boolean
}

interface Variant {
  wrapperStyles: string
  imageStyles: string
  titleStyles: string
  buttonStyles: string
  captionStyles: string
}

interface Styles {
  default: Variant
  large: Variant
}

const styles: Styles = {
  default: {
    wrapperStyles: 'gap-3 p-0 md:p-3 mx-auto',
    imageStyles: 'w-full md:rounded-md',
    titleStyles: 'text-center md:text-left text-xs sm:text-base truncate',
    captionStyles: 'opacity-0 md:opacity-100',
    buttonStyles: 'bottom-2 right-2',
  },
  large: {
    wrapperStyles: 'bg-dark hover:bg-[#282828] rounded-lg gap-6 p-2 md:p-5 relative',
    imageStyles: 'w-24',
    titleStyles: 'font-extrabold line-clamp-1 text-left text-lg sm:text-2xl mb-1',
    captionStyles: '',
    buttonStyles: 'bottom-5 right-5',
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
            className={`${styles[variant].imageStyles} ${
              roundedImage ? 'md:rounded-full rounded-full' : ''
            }
              relative aspect-square object-cover md:mx-0 shadow-lg shadow-dragonstone
              group-hover:bg-no-repeat group-hover:brightness-75 transition-all ease duration-300 overflow-hidden`}
          >
            <Image
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
          <p title={name} className={`${styles[variant].titleStyles} break-words`}>
            {name}
          </p>
          <p
            className={`${styles[variant].captionStyles} 
            min-h-[2.5rem] line-clamp-2 text-gray text-sm font-normal`}
          >
            {caption}
          </p>
        </figcaption>
      </figure>
    </Link>
  )
}
