import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from '@heroicons/react/24/solid'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'

import { currentTrackIdState, isPlayingState } from 'atoms/song'
import { useSongInfo, useSpotify } from 'hooks'
import { debounce } from 'lodash'

export const Player = () => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const songInfo = useSongInfo()

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (!data?.body) {
        setCurrentTrackId(null)
        return
      }
      if (data.body.is_playing) {
        spotifyApi.pause().finally(() => setIsPlaying(false))
        return
      }
      spotifyApi.play().then(() => setIsPlaying(true))
    })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        if (!data?.body) return
        setCurrentTrackId(data?.body?.item?.id || null)
        setIsPlaying(data.body.is_playing)
        setVolume(data.body.device?.volume_percent || 50)
      })
    }
  }, [])

  useEffect(() => {
    if (volume < 100) {
      debounceAdjustedVolume(volume)
    }
  }, [volume])

  const debounceAdjustedVolume = useCallback(
    debounce((volume) => spotifyApi.setVolume(volume).catch((err) => console.error(err)), 75),
    [],
  )

  return (
    <div
      className={`${
        !currentTrackId && 'hidden'
      } fixed bottom-[3.5rem] md:bottom-0 w-[calc(100vw-16px)] md:w-full h-14 md:h-24 rounded-md md:rounded-none
      text-[11px] px-2 md:px-4 mx-2 md:mx-0 bg-carbon md:bg-gradient-to-b from-black to-stone-800
      z-50 text-white border-carbon md:border-t-[1px] grid grid-cols-[1fr_50px] md:grid-cols-3 items-center`}
    >
      <div className='flex gap-4'>
        <img
          className='h-10 w-10 md:h-14 md:w-14'
          src={songInfo?.album.images.at(-1)?.url}
          alt='song'
        />
        <div className='flex flex-col min-w-0 justify-center'>
          <h3 className='font-semibold text-white text-sm truncate'>{songInfo?.name}</h3>
          <div className='text-gray truncate'>{songInfo?.artists[0].name}</div>
        </div>
      </div>
      <div className='flex items-center justify-end md:justify-center gap-6'>
        <ArrowsRightLeftIcon className='player-btn hidden md:block' />
        <BackwardIcon className='player-btn hidden md:block' />
        <div
          onClick={handlePlayPause}
          className='player-btn w-8 h-8 md:bg-white md:text-dark rounded-full cursor-pointer flex items-center justify-center'
        >
          {isPlaying ? (
            <PauseIcon className='w-6 h-6' />
          ) : (
            <PlayIcon className='w-[21px] h-[21px] ml-0.5' />
          )}
        </div>
        <ForwardIcon className='player-btn hidden md:block' />
        <ArrowPathRoundedSquareIcon className='player-btn hidden md:block' />
      </div>
      <div className='hidden md:flex items-center gap-2 justify-end pr-5'>
        <div onClick={() => (volume === 0 ? setVolume(50) : setVolume(0))}>
          {volume === 0 ? (
            <SpeakerXMarkIcon className='player-btn' />
          ) : (
            <SpeakerWaveIcon className='player-btn' />
          )}
        </div>
        <input
          type='range'
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          step={1}
          min={0}
          max={100}
        />
      </div>
    </div>
  )
}
