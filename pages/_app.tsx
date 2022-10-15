import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { DevicesProvider } from 'atoms/providers'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Spotify Next</title>
        <link rel='icon' href='/spotify-logo.svg' />
      </Head>
      <SessionProvider session={session}>
        <RecoilRoot>
          <DevicesProvider>
            <Component {...pageProps} />
          </DevicesProvider>
        </RecoilRoot>
      </SessionProvider>
    </>
  )
}

export default App
