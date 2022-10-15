import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { currentTrackIdState, isPlayingState } from 'atoms/song'
import { useSongInfo, useSpotify } from 'hooks'

export const Player = () => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const songInfo = useSongInfo()

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data?.body?.item?.id || null)
        setIsPlaying(data.body.is_playing)
        setVolume(data.body.device?.volume_percent || 50)
      })
    }
  }, [])
  console.log(songInfo)

  return (
    <div
      className={`${
        !currentTrackId && 'hidden'
      } fixed bottom-[3.5rem] md:bottom-0 w-[calc(100vw-16px)] md:w-full h-14 md:h-24
      text-[11px] px-2 md:px-4 mx-2 md:mx-0 bg-carbon md:bg-gradient-to-b from-black to-stone-800
      z-50 text-white border-carbon md:border-t-[1px] flex items-center`}
    >
      <div></div>
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
    </div>
  )
}
