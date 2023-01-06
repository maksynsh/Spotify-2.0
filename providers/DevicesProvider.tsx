import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { availableDevicesState } from 'atoms/devices'
import { useSpotify } from 'hooks'

interface DevicesProviderProps {
  children: React.ReactNode
}

const REFRESH_DEVICES_INTERVAL = 60000

export const DevicesProvider = ({ children }: DevicesProviderProps) => {
  const spotifyApi = useSpotify()
  const [_, setAvailableDevices] = useRecoilState(availableDevicesState)

  useEffect(() => {
    if (!spotifyApi.getAccessToken()) {
      return
    }

    spotifyApi
      .getMyDevices()
      .then((data) => setAvailableDevices(data.body.devices))
      .catch((err) => console.error(err))

    const refreshInterval = setInterval(() => {
      spotifyApi
        .getMyDevices()
        .then((data) => setAvailableDevices(data.body.devices))
        .catch((err) => console.error(err.message))
    }, REFRESH_DEVICES_INTERVAL)

    return () => clearInterval(refreshInterval)
  }, [])

  return <>{children}</>
}
