import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import { currentContextUriState, currentTrackIdState, isPlayingState } from 'atoms/song'
import { useLocalStorage, useSpotify } from 'hooks'
import { repeatState, shuffleState } from 'atoms/player'

export const useFetchPlayerState = () => {
  const spotifyApi = useSpotify()
  const [, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [, setIsPlaying] = useRecoilState(isPlayingState)
  const [, setSongContextUri] = useRecoilState(currentContextUriState)
  const [, setRepeatMode] = useRecoilState(repeatState)
  const [, setShuffleMode] = useRecoilState(shuffleState)
  const [, setVolume] = useLocalStorage<number>({ key: 'volume', initialValue: 50 })

  return () => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyCurrentPlaybackState()
        .then((data) => {
          if (!data?.body) return setCurrentTrackId(null)

          if (data?.body?.item?.id) setCurrentTrackId(data.body.item.id)
          setIsPlaying(data.body.is_playing)
          setRepeatMode(data.body.repeat_state || 'off')
          setShuffleMode(!!data.body.shuffle_state)
          if (data?.body?.context?.uri) {
            setSongContextUri(data.body.context.uri)
          }
          if (data.body.device?.volume_percent) {
            setVolume(data.body.device.volume_percent)
          }
        })
        .catch(() =>
          toast.error('Check your internet connection or try reloading page.', {
            toastId: 'player-error',
            autoClose: 11000,
          }),
        )
    }
  }
}
