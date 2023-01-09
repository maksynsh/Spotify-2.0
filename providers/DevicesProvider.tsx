import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { availableDevicesState, selectedDeviceIdState } from 'atoms/devices'
import { useSpotify } from 'hooks'

interface DevicesProviderProps {
  children: React.ReactNode
}

const REFRESH_DEVICES_INTERVAL = 60000

export const DevicesProvider = ({ children }: DevicesProviderProps) => {
  const spotifyApi = useSpotify()
  const [, setAvailableDevices] = useRecoilState(availableDevicesState)
  const [, setSelectedDeviceId] = useRecoilState(selectedDeviceIdState)

  useEffect(() => {
    if (!spotifyApi.getAccessToken()) {
      return
    }

    const fetchDevices = () => {
      spotifyApi
        .getMyDevices()
        .then((data) => {
          setSelectedDeviceId(
            (data.body.devices.find((d) => d.is_active) || data.body.devices[0]).id,
          )
          setAvailableDevices(data.body.devices)
        })
        .catch((err) => console.error(err))
    }

    fetchDevices()

    const refreshInterval = setInterval(() => {
      fetchDevices()
    }, REFRESH_DEVICES_INTERVAL)

    return () => clearInterval(refreshInterval)
  }, [])

  return <>{children}</>
}
