import { atom } from 'recoil'

export const playlistListState = atom({
  key: 'playlistListState',
  default: [] as SpotifyApi.PlaylistObjectSimplified[],
})
