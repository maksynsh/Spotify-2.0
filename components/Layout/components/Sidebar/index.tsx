import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

import { useRecoilState } from 'recoil'

import { MenuItem } from './components/MenuItem'
import { menu } from 'config/menu'
import { Button } from 'components'
import { useResizable, useSpotify } from 'hooks'
import { playlistListState } from 'atoms/playlist'

export const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { asPath: currentPath } = useRouter()
  const { data: session } = useSession()
  const { onDragStart, onDrag } = useResizable({ elementId: 'resizable', min: 200, max: 356 })

  const [playlists, setPlaylists] =
    useRecoilState<SpotifyApi.PlaylistObjectSimplified[]>(playlistListState)

  useEffect(() => {
    if (spotifyApi.getAccessToken() && playlists.length < 1) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => {
          setPlaylists(data?.body?.items ?? [])
        })
        .catch((err) => {
          console.error('Something went wrong!', err)
        })
    }
  }, [session, spotifyApi])

  return (
    <div id='resizable' className='flex w-64 bg-black'>
      <nav className='shadow-lg font-medium text-xs md:text-sm flex flex-col content-between py-3 h-screen overflow-y-auto scrollbar'>
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
          <hr className='text-dark mx-4' />
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
          <hr className='text-dark mx-4' />
          {/* Playlists */}
          <div className='flex flex-col'>
            {playlists.map(({ id, name }) => (
              <MenuItem
                key={id}
                id={id}
                title={name}
                path={`/playlist/${id}`}
                active={currentPath === `/playlist/${id}`}
              />
            ))}
          </div>
        </section>
      </nav>
      <div
        className='w-2 ml-0.5 h-full bg-transparent hover:bg-zinc-400 ease-in duration-100 cursor-col-resize'
        draggable='true'
        onDragStart={onDragStart}
        onDrag={onDrag}
      />
    </div>
  )
}
