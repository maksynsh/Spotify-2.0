import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import { useSpotify } from './use-spotify'
import { selectedDeviceIdState } from 'atoms/devices'
import { currentContextUriState, currentTrackIdState, isPlayingState } from 'atoms/song'
import { useFetchPlayerState } from './use-fetch-player-state'

interface PlayParams {
  contextUri: string
  songUri?: string
  songId?: string
}

export const usePlayPause = () => {
  const spotifyApi = useSpotify()
  const [, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [, setSongContextUri] = useRecoilState(currentContextUriState)
  const [, setIsPlaying] = useRecoilState(isPlayingState)
  const [selectedDeviceId] = useRecoilState(selectedDeviceIdState)

  const fetchCurrentPlaybackState = useFetchPlayerState()

  const play = ({ contextUri, songUri, songId }: PlayParams) => {
    //TODO: if currentContextUri === contextUri, than continue playing
    spotifyApi
      .play({
        context_uri: contextUri,
        offset: songUri ? { uri: songUri } : undefined,
        //uris: [row.original.uri || ''],
        device_id: selectedDeviceId || '',
      })
      .then(() => {
        setCurrentTrackId(songId || '')
        setIsPlaying(true)
        setSongContextUri(contextUri)

        setTimeout(() => fetchCurrentPlaybackState(), 500)
      })
      .catch((err) => {
        if (!selectedDeviceId || err.reason === 'NO_ACTIVE_DEVICE') {
          toast.warn('No available devices. Play any song on one of your devices first.', {
            toastId: 'no-devices-error',
          })
          return
        }
        toast.error(err.message, {
          toastId: 'play-api-error',
        })
      })
  }

  const pause = () => {
    spotifyApi
      .pause()
      .then(() => {
        setIsPlaying(false)
      })
      .catch((err) => {
        toast.error(err.message, {
          toastId: 'pause-api-error',
        })
      })
  }

  return { play, pause }
}
