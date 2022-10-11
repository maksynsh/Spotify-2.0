import React from 'react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

import { MenuItem } from './components/MenuItem'
import { menu } from 'config/menu'
import { Button } from 'components'

export const Sidebar = () => {
  const { pathname: currentPath } = useRouter()
  const { data: session, status } = useSession()

  return (
    <nav className='bg-black shadow-lg font-medium text-sm flex flex-col content-between py-3'>
      <section className={`flex flex-col`}>
        <Button color='secondary' onClick={() => signOut()}>
          Log out
        </Button>
        {/* Main menu items */}
        <div className='flex flex-col py-3'>
          {menu.main.map(({ id, title, path, Icon }) => (
            <MenuItem
              key={id}
              id={id}
              title={title}
              path={path}
              active={currentPath === path}
              Icon={Icon}
            />
          ))}
        </div>
        <hr className='text-dark' />
        {/* Secondary menu items */}
        <div className='flex flex-col py-3'>
          {menu.secondary.map(({ id, title, path, Icon }) => (
            <MenuItem
              key={id}
              id={id}
              title={title}
              path={path}
              active={currentPath === path}
              Icon={Icon}
            />
          ))}
        </div>
        <hr className='text-dark' />
        {/* Playlists */}
        <div className='flex flex-col'>
          <MenuItem
            id={'id'}
            title={'Best of Red Hot Chilli Peppers'}
            path={'playlist/best-rhcp'}
            active={currentPath === 'playlist/best-rhcp'}
          />
        </div>
      </section>
    </nav>
  )
}
