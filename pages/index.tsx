import type { NextPage } from 'next'

import { Layout } from 'components'
import { RecommendsSection } from 'components/home'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className='flex flex-col sm:flex-row sm:mt-0 align-center gap-4 mx-2 md:mx-8 md:my-5 h-fit'>
        <h2 className='text-3xl font-bold'>Hello!</h2>
        <RecommendsSection />
      </div>
    </Layout>
  )
}

export default Home
