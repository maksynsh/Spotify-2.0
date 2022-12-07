import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

import { Layout } from 'components'

const config = {
  buttons: [
    { id: 'library-playlists', title: 'Playlists', url: '/library/playlists' },
    { id: 'library-artists', title: 'Artists', url: '/library/artists' },
  ],
}

export const LibraryLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  return (
    <Layout gradientBrightness={0}>
      <div className='mb-4 mx-2 md:mx-8'>
        <div className='flex items-center gap-4 mb-4 md:mb-6'>
          {config.buttons.map(({ id, title, url }) => (
            <Link key={id} href={url}>
              <button
                className={`btn-base rounded ${router.pathname === url && 'text-white bg-carbon'}`}
              >
                {title}
              </button>
            </Link>
          ))}
        </div>
        {children}
      </div>
    </Layout>
  )
}
