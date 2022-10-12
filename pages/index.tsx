import type { NextPage } from 'next'

import { Content, Sidebar } from 'components'

const Home: NextPage = () => {
  return (
    <div className='h-screen overflow-hidden bg-dark'>
      <main className='flex'>
        <Sidebar />
        <Content />
      </main>

      {/* <section>Player</section> */}
    </div>
  )
}

export default Home
