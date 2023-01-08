import Image from 'next/image'
import { useRecoilState } from 'recoil'

import { usePlayPause } from 'hooks'
import { currentTrackIdState, isPlayingState } from 'atoms/song'
import { duration } from 'lib/utils'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import { LinkList } from 'components'

export const Song = ({
  id,
  name,
  uri,
  album,
  duration_ms,
  artists,
}: SpotifyApi.TrackObjectFull) => {
  const [currentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying] = useRecoilState(isPlayingState)

  const isCurrentSongPlaying = currentTrackId === id && isPlaying

  const { play, pause } = usePlayPause()

  const playPause = () => {
    if (isCurrentSongPlaying) {
      pause()
      return
    }
    play({ contextUri: album.uri, songUri: uri, songId: id })
  }

  return (
    <div
      className='flex items-center gap-4 text-gray h-14 text-sm ease-in duration-100 w-full
      hover:bg-carbon hover:bg-opacity-60 hover:text-white p-2 rounded cursor-default group'
    >
      <div className='relative'>
        <div
          className={`relative w-10 h-10 shrink-0 group-hover:bg-no-repeat 
          group-hover:brightness-50 ${currentTrackId === id && 'brightness-50'}`}
        >
          <Image
            src={(album.images.at(-1) || album.images[0]).url}
            loader={() => (album.images.at(-1) || album.images[0]).url}
            layout='fill'
            width={40}
            height={40}
            alt='album'
          />
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-white
          ${currentTrackId === id ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}
          onClick={playPause}
        >
          {isCurrentSongPlaying ? (
            <PauseIcon className='w-5 h-5' />
          ) : (
            <PlayIcon className='w-5 h-5' />
          )}
        </div>
      </div>

      <div className='flex flex-col flex-1 min-w-0 h-full justify-center md:justify-between'>
        <h3
          className={`font-semibold leading-none line-clamp-1 ${
            isCurrentSongPlaying ? 'text-green' : 'text-white'
          }`}
        >
          {name}
        </h3>
        <div className='leading-tight text-gray line-clamp-1'>
          <LinkList type='artist' array={artists} />
        </div>
      </div>
      <div className='w-11'>{duration(duration_ms)}</div>
    </div>
  )
}
