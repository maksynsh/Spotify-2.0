import type { NextPage } from 'next'

import { Layout } from 'components'
import { LibrarySection, RecommendsSection } from 'components/home'

const Home: NextPage = () => {
  return (
    <Layout gradientOpacity={60}>
      <div className='flex flex-col align-center gap-10 mx-2 md:mx-8 my-2 md:my-5 h-fit'>
        <RecommendsSection />
        <LibrarySection />
      </div>
    </Layout>
  )
}

export default Home
