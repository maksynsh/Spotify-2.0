import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

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
        .catch((err) => toast.error(err.message))
    }
  }, [])

  return children
}
