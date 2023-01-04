import { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'

import { usePlayPause, useSearch } from 'hooks'
import { Card, SearchLayout } from 'components'
import { NextPageWithLayout } from 'pages/_app'
import { SearchType } from 'types/spotify'
import { currentTrackIdState, isPlayingState } from 'atoms/song'
import { duration } from 'lib/utils'

const searchTypes: SearchType[] = ['album', 'artist', 'playlist', 'track']

const Song = ({ id, name, uri, album, duration_ms, artists }: SpotifyApi.TrackObjectFull) => {
  const [currentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying] = useRecoilState(isPlayingState)

  const { play } = usePlayPause()

  const playSong = () => play({ contextUri: album.uri, songUri: uri, songId: id })

  return (
    <div
      className='flex items-center gap-4 text-gray h-14 ease-in duration-100 w-full
      hover:bg-carbon hover:bg-opacity-60 hover:text-white px-2 rounded cursor-default'
      onClick={playSong}
    >
      <div className='relative w-10 h-10 shrink-0'>
        <Image
          src={album.images[0].url}
          loader={() => album.images[0].url}
          layout='fill'
          width={40}
          height={40}
          alt='album'
        />
      </div>
      <div className='flex flex-col flex-1 min-w-0 justify-center md:justify-between'>
        <h3 className='font-semibold leading-none text-inherit line-clamp-1'>{name}</h3>
        <div className='leading-none text-gray line-clamp-1'>{artists[0].name}</div>
      </div>
      <div className='w-11'>{duration(duration_ms)}</div>
    </div>
  )
}

const Search: NextPageWithLayout = ({}) => {
  const router = useRouter()
  const { query } = router.query

  const { data, isLoading, error } = useSearch(query as string, searchTypes)

  if (isLoading) return <div className='text-2xl text-green'>Loading...</div>

  if (!data)
    return (
      <div>
        <div className='text-2xl'>Search anything</div>
        <div className='text-lg'>Here you can find any song, playlist, album and so much more!</div>
      </div>
    )

  return (
    <div>
      <div className='flex flex-wrap gap-3 sm:gap-6'>
        <section className='flex flex-col gap-3 sm:gap-6'>
          <h2 className='text-base sm:text-3xl font-extrabold'>Top result</h2>
          <div className='min-w-min md:min-w-[24rem] max-w-lg'>
            {data?.playlists?.items[0] && (
              <Card
                variant='large'
                uri={data.playlists.items[0].uri}
                imageUrl={data.playlists.items[0].images[0].url}
                name={data.playlists.items[0].name}
                caption={data.playlists.items[0].description}
                url={`/playlist/${data.playlists.items[0].id}`}
              />
            )}
          </div>
        </section>
        <section className='flex flex-col gap-3 sm:gap-6 flex-1'>
          <h2 className='text-base sm:text-3xl font-extrabold'>Songs</h2>
          <div className=''>
            {data?.tracks?.items.slice(0, 5).map((song) => (
              <Song key={song.id} {...song} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <SearchLayout>{page}</SearchLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default Search
