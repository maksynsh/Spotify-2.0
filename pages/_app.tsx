import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { ToastContainer, Flip } from 'react-toastify'

import { AppHistoryProvider, DevicesProvider } from 'providers'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout<T> = AppProps<T> & {
  Component: NextPageWithLayout
}

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<{ session: Session }>) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <title>Spotify Next</title>
        <link rel='icon' href='/spotify-logo.svg' />
      </Head>
      <SessionProvider session={session}>
        <RecoilRoot>
          <AppHistoryProvider>
            <DevicesProvider>{getLayout(<Component {...pageProps} />)}</DevicesProvider>
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
