import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { currentTrackIdState } from 'atoms/song'
import { useSpotify } from './use-spotify'

export const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const [currentTrackId] = useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState<SpotifyApi.SingleTrackResponse | null>(null)

  useEffect(() => {
    if (currentTrackId) {
      spotifyApi
        .getTrack(currentTrackId)
        .then((data) => setSongInfo(data.body))
        .catch((err) => console.error(err))
    }
  }, [currentTrackId, spotifyApi])

  return songInfo
}
