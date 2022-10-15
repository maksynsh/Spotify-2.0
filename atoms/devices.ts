import { atom } from 'recoil'

export const availableDevicesState = atom<SpotifyApi.UserDevice[] | null>({
  key: 'availableDevicesState',
  default: null,
})
