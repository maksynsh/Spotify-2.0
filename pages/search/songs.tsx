import { ReactElement } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { SearchLayout, SearchSongsTable } from 'components'
import { NextPageWithLayout } from 'pages/_app'

interface SearchPlaylistsProps {
  data: SpotifyApi.SearchResponse
}

const SearchPlaylists: NextPageWithLayout<SearchPlaylistsProps> = ({ data }) => {
  return <SearchSongsTable data={data.tracks?.items || []} />
}

SearchPlaylists.getLayout = function getLayout(page: ReactElement) {
  return <SearchLayout>{page}</SearchLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default SearchPlaylists
