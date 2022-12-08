import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Layout } from 'components'
import { ArtistsSection, LibrarySection, RecommendsSection } from 'components/home'

const Home: NextPage = () => {
  return (
    <Layout headerOpacityOffset={0} gradientBrightness={0.45}>
      <div className='flex flex-col align-center gap-10 mx-2 md:mx-8 my-2 md:my-5 h-fit'>
        <RecommendsSection />
        <LibrarySection />
        <ArtistsSection />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default Home
