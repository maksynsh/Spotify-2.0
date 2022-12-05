import React, { useEffect, useState } from 'react'

import { useSpotify } from 'hooks'
import { ArtistCard } from 'components'

export const ArtistsSection = () => {
  const spotifyApi = useSpotify()

  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setIsLoading(true)

      spotifyApi
        .getMyTopArtists({ limit: 10 })
        .then((data) => {
          setArtists(data.body.items)
        })
        .catch((err) => {
          console.error('Something went wrong!', err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [spotifyApi])

  if (isLoading) return null

  return (
    <section className='flex flex-col gap-3 sm:gap-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-base sm:text-2xl font-extrabold'>Favorite artists</h2>
        <div className='uppercase text-sm font-extrabold text-gray'>See all</div>
      </div>
      <div
        className='flex md:flex-wrap justify-between scrollbar-hidden overflow-x-auto md:overflow-hidden
                    w-full gap-2 md:gap-4 md:h-72'
      >
        {artists?.map(({ uri, id, images, name }) => (
          <ArtistCard
            key={id}
            uri={uri}
            imageUrl={images[0].url}
            name={name}
            url={`/playlist/${id}`}
          />
        ))}
      </div>
    </section>
  )
}
