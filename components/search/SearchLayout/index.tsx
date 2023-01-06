import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'

import { BaseButton, Button, Layout, NoResults, SearchBar } from 'components'
import { useDebounce, useSearch } from 'hooks'
import { SearchType } from 'types/spotify'

interface NavConfig {
  id: string
  title: string
  url: string
  searchBy: SearchType[]
}

const config: { nav: NavConfig[] } = {
  nav: [
    { id: 'all', title: 'All', url: '/search', searchBy: ['album', 'artist', 'playlist', 'track'] },
    { id: 'playlists', title: 'Playlists', url: '/search/playlists', searchBy: ['playlist'] },
    { id: 'songs', title: 'Songs', url: '/search/songs', searchBy: ['track'] },
    { id: 'artists', title: 'Artists', url: '/search/artists', searchBy: ['artist'] },
    { id: 'albums', title: 'Albums', url: '/search/albums', searchBy: ['album'] },
  ],
}

const NavButtons = () => {
  const router = useRouter()
  const { query } = router.query

  return (
    <div className='flex items-center overflow-x-scroll scrollbar-hidden md:gap-4'>
      {config.nav.map(({ id, title, url }) => (
        <Link key={id} href={{ pathname: url, query: { query } }}>
          <BaseButton
            className={`btn-base py-0 md:py-1 rounded-full ${
              router.pathname === url && 'text-black bg-white hover:text-black'
            }`}
          >
            {title}
          </BaseButton>
        </Link>
      ))}
    </div>
  )
}

export const SearchLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { query } = router.query

  const searchTypes = useMemo(
    () => (config.nav.find((v) => v.url === router.pathname) || config.nav[0]).searchBy,
    [router],
  )

  const { data, isLoading, error } = useSearch(query as string, searchTypes)

  const [value, setValue] = useState(query || '')

  const debouncedValue = useDebounce(value, 700)

  //  if we emptied query, then return to default page
  //  else, push query to url params
  useEffect(() => {
    if (!debouncedValue) {
      router.push('/search')
      return
    }
    router.push({ pathname: router.pathname, query: { query: debouncedValue } })
  }, [debouncedValue])

  const handleChange = (v: string) => {
    setValue(v)
  }

  const handleClear = () => {
    handleChange('')
  }

  const isEmpty =
    data &&
    !data.playlists?.items.length &&
    !data.artists?.items.length &&
    !data.albums?.items.length &&
    !data.tracks?.items.length

  const renderPage = useMemo(() => {
    if (isEmpty) return <NoResults query={query} />

    if (error) return <div className='text-2xl text-red-700'>{error}</div>

    if (isLoading) return <div className='flex items-center text-2xl text-green'>Loading...</div>

    if (!data)
      return (
        <div>
          <div className='text-2xl underline'>Search anything</div>
          <div className='text-lg'>
            Here you can find any song, playlist, album and so much more!
          </div>
        </div>
      )

    return React.cloneElement(children as React.ReactElement<{ data: SpotifyApi.SearchResponse }>, {
      data,
    })
  }, [isEmpty, data, error, isLoading, query, children])

  return (
    <Layout
      headerOpacityOffset={0}
      headerOpacityDistance={150}
      Controller={() => (
        <SearchBar
          placeholder='What do you want to listen to?'
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onClear={handleClear}
        />
      )}
      gradientBrightness={0}
    >
      <div className='mx-3 md:mx-8 mt-2 md:mt-5 mb-4'>
        {query && <NavButtons />}
        <div className='mt-2 md:mt-5 mb-4'>{renderPage}</div>
      </div>
    </Layout>
  )
}
