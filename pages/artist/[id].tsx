import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import moment from 'moment'

import { useDimensions, useSpotify } from 'hooks'
import { Button, Card, Layout, PlayButton, Song } from 'components'

const ArtistSlug: NextPage = ({}) => {
  const spotifyApi = useSpotify()
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { width } = useDimensions()

  const [isLoading, setIsLoading] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const [artist, setArtist] = useState<SpotifyApi.SingleArtistResponse>()
  const [topTracks, setTopTracks] = useState<SpotifyApi.ArtistsTopTracksResponse>()
  const [albums, setAlbums] = useState<SpotifyApi.ArtistsAlbumsResponse>()
  const [isFollowing, setIsFollowing] = useState<boolean>()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setIsLoading(true)

      Promise.allSettled([
        spotifyApi.getArtist(id),
        spotifyApi.getArtistTopTracks(id, 'US'),
        spotifyApi.getArtistAlbums(id, { limit: 30 }),
        spotifyApi.isFollowingArtists([id]),
      ])
        .then(([info, top, albumsRes, following]) => {
          if (info.status === 'fulfilled') setArtist(info.value.body)
          if (top.status === 'fulfilled') setTopTracks(top.value.body)
          if (albumsRes.status === 'fulfilled') setAlbums(albumsRes.value.body)
          if (following.status === 'fulfilled') setIsFollowing(following.value.body[0])
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false))
    }
  }, [spotifyApi, id])

  const toggleShowMore = () => setShowMore((prev) => !prev)

  const toggleFollowStatus = () => {
    spotifyApi
      .isFollowingArtists([id])
      .then((data) => {
        if (data.body[0]) {
          spotifyApi
            .unfollowArtists([id])
            .then(() => {
              setIsFollowing(false)
              toast.success('Removed from your artists')
            })
            .catch((err) => toast.error('Could not unfollow: ' + err?.body?.error?.message))
          return
        }
        spotifyApi
          .followArtists([id])
          .then(() => {
            setIsFollowing(true)
            toast.success('Added to your artists')
          })
          .catch((err) => toast.error('Could not follow: ' + err?.body?.error?.message))
      })
      .catch(() => toast.error('Status has not changed. Try again', { toastId: 'follow-error' }))
  }

  return (
    <Layout
      Controller={({ headerOpacity }) => (
        <div
          className='flex items-center truncate min-w-0 gap-4'
          style={{ opacity: headerOpacity }}
        >
          <div
            className={`hidden sm:block
          ${headerOpacity >= 1 ? 'opacity-100' : 'opacity-0'}
          transition-all duration-400 ease-in`}
          >
            <PlayButton
              size={width < 640 ? 'small' : 'default'}
              uri={artist?.uri ?? `spotify:artist:${id}`}
            />
          </div>
          <h2 className='text-base sm:text-lg md:text-xl font-bold truncate'>{artist?.name}</h2>
        </div>
      )}
      isLoading={isLoading}
    >
      <div className='flex flex-col gap-4 -mt-1 sm:mt-0 mx-2 md:mx-8 py-2 md:my-3 h-fit'>
        <div className='flex flex-col lg:flex-row items-center gap-4'>
          <div
            className='shrink-0 w-36 h-36 sm:w-40 sm:h-40 md:w-56 md:h-56 
            shadow-2xl rounded-full overflow-hidden shadow-dark relative mx-auto sm:mx-0'
          >
            <Image
              priority
              src={artist?.images[0].url || ''}
              loader={() => artist?.images[0].url || ''}
              layout='fill'
              objectFit='cover'
              alt=''
            />
          </div>
          <div className='flex flex-col gap-1 items-center'>
            <h2
              className={`line-clamp-2 pb-2 text-center w-fit
              font-bold text-2xl md:text-4xl xl:text-6xl playlist-header
              ${(artist?.name?.length ?? 1) > 35 && 'text-lg md:text-xl xl:text-2xl'}`}
            >
              {artist?.name}
            </h2>
            <div className='flex flex-col w-full sm:flex-row justify-around gap-3 text-gray text-xs uppercase'>
              <div className='flex flex-col items-center'>
                <span className='font-semibold text-green text-lg leading-tight'>
                  {artist?.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                <div className='mt-1'>Followers</div>
              </div>
              <div className='hidden md:flex flex-col items-center'>
                {artist?.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className='font-semibold leading-tight text-green text-lg capitalize'
                  >
                    {genre}
                  </span>
                ))}
                <div className='mt-1'>Genres</div>
              </div>
              <div className='hidden md:flex flex-col items-center'>
                <span className='font-semibold text-green text-lg leading-tight'>
                  {artist?.popularity}%
                </span>
                <div className='mt-1'>Popularity</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='text-white bg-dark bg-opacity-30 backdrop-blur-md px-2 md:px-8'>
        <div className='flex items-center gap-6 py-4'>
          <PlayButton size='large' uri={artist?.uri ?? `spotify:artist:${id}`} />
          <Button color={isFollowing ? 'secondary' : 'primary'} onClick={toggleFollowStatus}>
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>

        <div className='flex flex-col lg:flex-row gap-4'>
          <section className='flex flex-col gap-2 sm:gap-4 flex-1'>
            <h2 className='text-base sm:text-2xl font-extrabold'>Top tracks</h2>
            <div className=''>
              {(showMore ? topTracks?.tracks : topTracks?.tracks.slice(0, 5))?.map((song) => (
                <Song key={song.id} {...song} />
              ))}
              <div
                className='clickable uppercase text-sm font-extrabold text-gray mt-2 w-fit'
                onClick={toggleShowMore}
              >
                {showMore ? 'Show less' : 'Show more'}
              </div>
            </div>
          </section>
          <section className='flex flex-col gap-2 sm:gap-4'>
            <h2 className='text-base sm:text-2xl font-extrabold text-left lg:text-right'>
              Last release
            </h2>
            <div className='flex flex-col gap-4 min-w-[240px] max-w-[400px]'>
              {albums?.items
                .sort((a, b) => moment().diff(a.release_date) - moment().diff(b.release_date))
                .slice(0, 1)
                ?.map(({ id, uri, images, name, album_type }) => (
                  <div key={id} className='max-h-fit'>
                    <Card
                      variant='large'
                      uri={uri}
                      imageUrl={images[0].url}
                      name={name}
                      caption={album_type.toUpperCase()}
                      url={`/album/${id}`}
                    />
                  </div>
                ))}
            </div>
          </section>
        </div>
        <section className='flex flex-col gap-2 sm:gap-4 mt-8'>
          <h2 className='text-base sm:text-2xl font-extrabold'>Albums</h2>
          <div className='card-grid'>
            {albums?.items?.map(({ id, uri, images, name, album_type }) => (
              <Card
                key={id}
                uri={uri}
                imageUrl={images[0].url}
                name={name}
                caption={album_type.toUpperCase()}
                url={`/album/${id}`}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default ArtistSlug
