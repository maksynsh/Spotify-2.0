import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { ToastContainer, Flip } from 'react-toastify'

import { AppHistoryProvider, DevicesProvider } from 'providers'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>Spotify Next</title>
        <link rel='icon' href='/spotify-logo.svg' />
      </Head>
      <SessionProvider session={session}>
        <RecoilRoot>
          <AppHistoryProvider>
            <DevicesProvider>
              <Component {...pageProps} />
            </DevicesProvider>
          </AppHistoryProvider>
          <ToastContainer
            autoClose={6000}
            limit={3}
            position='bottom-left'
            theme='dark'
            transition={Flip}
            closeOnClick={false}
            newestOnTop
            hideProgressBar
            pauseOnFocusLoss
            pauseOnHover
          />
        </RecoilRoot>
      </SessionProvider>
    </>
  )
}

export default App
