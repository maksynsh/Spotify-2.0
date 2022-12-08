import { ReactElement, useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import { useSpotify } from 'hooks'
import { SearchLayout } from 'components'
import { NextPageWithLayout } from 'pages/_app'

const Search: NextPageWithLayout = ({}) => {
  const spotifyApi = useSpotify()
  const router = useRouter()
  const { query } = router.query

  const [search, setSearch] = useState()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
