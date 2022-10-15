import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { availableDevicesState } from 'atoms/devices'
import { useSpotify } from 'hooks'

interface DevicesProviderProps {
  children: JSX.Element
}

export const DevicesProvider = ({ children }: DevicesProviderProps) => {
  const spotifyApi = useSpotify()
  const [_, setAvailableDevices] = useRecoilState(availableDevicesState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyDevices()
        .then((data) => setAvailableDevices(data.body.devices))
        .catch((err) => console.error(err))
    }
  }, [])

  return children
}
