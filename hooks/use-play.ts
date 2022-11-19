import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import { useSpotify } from './use-spotify'
import { availableDevicesState } from 'atoms/devices'
import { currentContextUriState, currentTrackIdState, isPlayingState } from 'atoms/song'
import { useFetchPlayerState } from './use-fetch-player-state'

interface PlayParams {
  contextUri: string
  songUri?: string
  songId?: string
}

export const usePlay = () => {
  const spotifyApi = useSpotify()
  const [, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [, setSongContextUri] = useRecoilState(currentContextUriState)
  const [, setIsPlaying] = useRecoilState(isPlayingState)
  const [availableDevices] = useRecoilState(availableDevicesState)

  const fetchCurrentPlaybackState = useFetchPlayerState()

  return ({ contextUri, songUri, songId }: PlayParams) => {
    spotifyApi
      .play({
        context_uri: contextUri,
        offset: songUri ? { uri: songUri } : undefined,
        //uris: [row.original.uri || ''],
        device_id:
          availableDevices?.find((d) => d.is_active)?.id ||
          (availableDevices && availableDevices[0]?.id) ||
          '',
      })
      .then(() => {
        setCurrentTrackId(songId || '')
        setIsPlaying(true)
        setSongContextUri(contextUri)

        setTimeout(() => fetchCurrentPlaybackState(), 500)
      })
      .catch((err) => {
        if (!availableDevices?.length || err.reason === 'NO_ACTIVE_DEVICE') {
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
}
