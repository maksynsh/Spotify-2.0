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
import { useLocalStorage, useSongInfo, useSpotify } from 'hooks'
import { debounce } from 'lodash'

export const Player = () => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useLocalStorage<number>({ key: 'volume', initialValue: 50 })
  const [repeatMode, setRepeatMode] = useState<SpotifyApi.PlaybackObject['repeat_state']>('off')
  const songInfo = useSongInfo()

  const fetchCurrentPlaybackState = () => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyCurrentPlaybackState()
        .then((data) => {
          if (!data?.body) return setCurrentTrackId(null)
          setCurrentTrackId(data?.body?.item?.id || null)
          setIsPlaying(data.body.is_playing)
          setRepeatMode(data.body.repeat_state || 'off')
          if (data.body.device?.volume_percent) {
            setVolume(data.body.device.volume_percent)
          }
        })
        .catch((err) => console.error('Could not fetch current track', err))
    }
  }

  useEffect(() => {
    fetchCurrentPlaybackState()

    const refreshInterval = setInterval(() => fetchCurrentPlaybackState(), 10000)

    return () => clearInterval(refreshInterval)
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

  const nextSong = () => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .skipToNext()
        .then(() => {
          setTimeout(() => fetchCurrentPlaybackState(), 50)
        })
        .catch((err) => {
          console.error(err)
          setCurrentTrackId(null)
        })
    }
  }

  const previousSong = () => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .skipToPrevious()
        .then(() => {
          setTimeout(() => fetchCurrentPlaybackState(), 50)
        })
        .catch((err) => {
          console.error(err)
          setCurrentTrackId(null)
        })
    }
  }

  const handlePlayPause = () => {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((data) => {
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
      .catch((err) => console.error(err))
  }

  const toggleRepeatMode = () => {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((data) => {
        if (data.body.repeat_state === 'off') {
          spotifyApi.setRepeat('track').then(() => setRepeatMode('track'))
          return
        }
        if (data.body.repeat_state === 'track') {
          spotifyApi.setRepeat('context').then(() => setRepeatMode('context'))
          return
        }
        spotifyApi.setRepeat('off').then(() => setRepeatMode('off'))
      })
      .catch((err) => console.error(err))
  }

  return (
    <div
      className={`${
        !currentTrackId && 'hidden'
      } fixed bottom-[3.5rem] md:bottom-0 w-[calc(100vw-16px)] md:w-full h-14 md:h-24 rounded-md md:rounded-none
      text-[11px] px-2 md:px-4 mx-2 md:mx-0 bg-carbon md:bg-gradient-to-b from-dragonstone via-dragonstone to-zinc-800
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
        <BackwardIcon className='player-btn hidden md:block' onClick={previousSong} />
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
        <ForwardIcon className='player-btn hidden md:block' onClick={nextSong} />
        <div
          className={`player-btn hidden md:block ${repeatMode !== 'off' && 'text-green'} relative`}
          onClick={toggleRepeatMode}
        >
          <ArrowPathRoundedSquareIcon />
          {repeatMode !== 'off' && <div className='btn-dot-green' />}
          {repeatMode === 'track' && (
            <div className='bg-dragonstone text-[10px] absolute top-0 left-1/2 transform -translate-x-1/2 -mt-1'>
              1
            </div>
          )}
        </div>
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
