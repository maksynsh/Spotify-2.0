import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { useSpotify } from 'hooks'
import { Card } from 'components'

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
        <Link href='/library/artists'>
          <div className='clickable uppercase text-sm font-extrabold text-gray'>See all</div>
        </Link>
      </div>
      <div className='max-md:card-grid-carousel md:card-grid-row'>
        {artists?.map(({ uri, id, images, name }) => (
          <Card
            key={id}
            uri={uri}
            imageUrl={images[0].url}
            name={name}
            caption={'Artist'}
            url={`/playlist/${id}`}
            roundedImage
          />
        ))}
      </div>
    </section>
  )
}
