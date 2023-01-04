import { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import { useSearch } from 'hooks'
import { Card, SearchLayout } from 'components'
import { NextPageWithLayout } from 'pages/_app'
import { SearchType } from 'types/spotify'

const searchTypes: SearchType[] = ['album', 'artist', 'playlist', 'track']

const Search: NextPageWithLayout = ({}) => {
  const router = useRouter()
  const { query } = router.query

  const { data, isLoading, error } = useSearch(query as string, searchTypes)

  return (
    <div>
      <div className='flex flex-wrap'>
        <section className='flex flex-col gap-3 sm:gap-6'>
          <h2 className='text-base sm:text-3xl font-extrabold'>Top result</h2>
          <div>
            {data?.playlists?.items[0] && (
              <Card
                uri={data.playlists.items[0].uri}
                imageUrl={data.playlists.items[0].images[0].url}
                name={data.playlists.items[0].name}
                caption={data.playlists.items[0].description}
                url={`/playlist/${data.playlists.items[0].id}`}
              />
            )}
          </div>
        </section>
        <section className='flex flex-col'></section>
      </div>
    </div>
  )
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <SearchLayout>{page}</SearchLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default Search
