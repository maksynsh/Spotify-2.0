import React from 'react'
import Link from 'next/link'
import { useRecoilState } from 'recoil'

import { Card } from 'components'
import { playlistListState } from 'atoms/playlist'

export const LibrarySection = () => {
  const [playlists] = useRecoilState(playlistListState)

  return (
    <section className='flex flex-col gap-3 sm:gap-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-base sm:text-2xl font-extrabold'>Your library</h2>
        <Link href='/library/playlists'>
          <div className='clickable uppercase text-sm font-extrabold text-gray'>See all</div>
        </Link>
      </div>
      <div className='max-md:card-grid-carousel md:card-grid-row'>
        {playlists?.slice(0, 10).map(({ uri, id, images, name, description }) => (
          <Card
            key={id}
            uri={uri}
            imageUrl={images[0].url}
            name={name}
            caption={description}
            url={`/playlist/${id}`}
          />
        ))}
      </div>
    </section>
  )
}
