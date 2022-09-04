import NextAuth, { TokenSet } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

import { LOGIN_URL, spotifyApi } from 'config/spotify'

async function refreshAccessToken(token: TokenSet) {
  try {
    spotifyApi.setAccessToken(token.access_token as string)
    spotifyApi.setRefreshToken(token.refresh_token as string)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account?.expires_at || 3600) * 1000,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          user,
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        console.info('Existing access token is valid')
        return token
      }

      // Access token has expired, try to update it
      console.log('Access token has expired. Refreshing token...')
      return refreshAccessToken(token)
    },

    async session({ session, token }) {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
      }

      return newSession
    },
  },
})
