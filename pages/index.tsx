import type { NextPage } from 'next'

import { Sidebar } from 'components'

const Home: NextPage = () => {
  return (
    <div className='h-screen overflow-hidden bg-dark'>
      <main>
        <Sidebar />
        {/* Center */}
      </main>

      {/* <section>Player</section> */}
    </div>
  )
}

export default Home
