import { atom } from 'recoil'

export const availableDevicesState = atom<SpotifyApi.UserDevice[] | null>({
  key: 'availableDevicesState',
  default: null,
})

export const selectedDeviceIdState = atom<string | null>({
  key: 'selectedDeviceIdState',
  default: null,
})
