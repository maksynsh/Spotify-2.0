import type { NextPage } from 'next'
import Head from 'next/head'

import { Sidebar } from 'components'

const Home: NextPage = () => {
  return (
    <div className='h-screen overflow-hidden'>
      <Head>
        <title>Spotify Next</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Sidebar />
        {/* Center */}
      </main>

      {/* <section>Player</section> */}
    </div>
  )
}

export default Home
