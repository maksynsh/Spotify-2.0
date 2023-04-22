import { atom } from 'recoil'

export const repeatState = atom<SpotifyApi.PlaybackObject['repeat_state']>({
  key: 'repeatState',
  default: 'off',
})

export const shuffleState = atom<SpotifyApi.PlaybackObject['shuffle_state']>({
  key: 'shuffleState',
  default: false,
})
