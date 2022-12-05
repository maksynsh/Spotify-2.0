import React from 'react'
import { useRecoilState } from 'recoil'

import { PlaylistCard } from 'components'
import { playlistListState } from 'atoms/playlist'

export const LibrarySection = () => {
  const [playlists] = useRecoilState(playlistListState)

  return (
    <section className='flex flex-col gap-3 sm:gap-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-base sm:text-2xl font-extrabold'>Your library</h2>
        <div className='uppercase text-sm font-extrabold text-gray'>See all</div>
      </div>
      <div
        className='flex md:flex-wrap justify-between scrollbar-hidden overflow-x-auto md:overflow-hidden
                    w-full gap-2 md:gap-4 md:h-72'
      >
        {playlists?.slice(0, 10).map(({ uri, id, images, name, description }) => (
          <PlaylistCard
            key={id}
            uri={uri}
            imageUrl={images[0].url}
            name={name}
            description={description}
            url={`/playlist/${id}`}
          />
        ))}
      </div>
    </section>
  )
}
