import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useState } from 'react'

import { Button, Layout, SearchBar } from 'components'
import { useDebounce } from 'hooks'

const config = {
  buttons: [
    { id: 'all', title: 'All', url: '/search' },
    { id: 'playlists', title: 'Playlists', url: '/search/playlists' },
    { id: 'songs', title: 'Songs', url: '/search/songs' },
    { id: 'artists', title: 'Artists', url: '/search/artists' },
    { id: 'albums', title: 'Albums', url: '/search/albums' },
  ],
}

const NavButtons = () => {
  const router = useRouter()
  const { query } = router.query

  return (
    <div className='flex items-center overflow-x-scroll scrollbar-hidden md:gap-4'>
      {config.buttons.map(({ id, title, url }) => (
        <Link key={id} href={{ pathname: url, query: { query } }}>
          <Button
            className={`btn-base py-0 md:py-1 rounded-full ${
              router.pathname === url && 'text-black bg-white hover:text-black'
            }`}
          >
            {title}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export const SearchLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { query } = router.query

  const [value, setValue] = useState(query || '')

  const debouncedValue = useDebounce(value, 700)

  useEffect(() => {
    if (!debouncedValue) {
      router.push('/search')
      return
    }
    router.push({ pathname: '/search', query: { query: debouncedValue } })
  }, [debouncedValue])

  const handleChange = (v: string) => {
    setValue(v)
  }

  const handleClear = () => {
    handleChange('')
  }

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
        <div className='mt-2 md:mt-5 mb-4'>{children}</div>
      </div>
    </Layout>
  )
}
