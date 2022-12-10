import { ReactElement, useState } from 'react'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import { useSearch } from 'hooks'
import { SearchLayout } from 'components'
import { NextPageWithLayout } from 'pages/_app'
import { SearchType } from 'types/spotify'

const searchTypes: SearchType[] = ['album', 'artist', 'playlist', 'track']

const Search: NextPageWithLayout = ({}) => {
  const router = useRouter()
  const { query } = router.query

  const { data, isLoading, error } = useSearch(query as string, searchTypes)

  return <div>Search {query}</div>
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
