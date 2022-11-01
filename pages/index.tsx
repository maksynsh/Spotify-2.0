import type { NextPage } from 'next'

import { Layout } from 'components'
import { RecommendsSection } from 'components/home'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className='flex flex-col align-center gap-4 mx-2 md:mx-8 md:my-5 h-fit'>
        <RecommendsSection />
      </div>
    </Layout>
  )
}

export default Home
