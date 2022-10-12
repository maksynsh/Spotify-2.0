import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { spotifyApi } from 'config/spotify'

export const useSpotify = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn()
      }

      //@ts-ignore
      spotifyApi.setAccessToken(session?.user?.accessToken)
    }
  }, [session])

  return spotifyApi
}
