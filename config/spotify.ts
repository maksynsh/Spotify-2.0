import SpotifyWebApi from 'spotify-web-api-node'

const scopes: string = [
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-modify-playback-state',
  'user-library-read',
  'user-library-modify',
  'user-follow-read',
  'user-top-read',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'app-remote-control',
].join(',')

const params = {
  scope: scopes,
}

const queryParamsString = new URLSearchParams(params)

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString.toString()}`

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})
