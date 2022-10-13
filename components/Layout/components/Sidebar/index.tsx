import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { useRecoilState } from 'recoil'

import { MenuItem } from './components/MenuItem'
import { menu } from 'config/menu'
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
    <div
      id='resizable'
      className='flex w-full md:w-64 absolute z-50 bottom-0 md:static 
    bg-gradient-to-b from-transparent to-black md:bg-black'
    >
      <nav className='shadow-lg w-full font-medium text-xs md:text-sm flex flex-col content-between md:pb-3 md:h-screen md:overflow-y-auto scrollbar'>
        <section className={`flex flex-col`}>
          {/* Main menu items */}
          <div className='flex md:flex-col justify-center md:justify-start md:py-3'>
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
          <hr className='text-dark mx-4 hidden md:block' />
          {/* Secondary menu items */}
          <div className='flex-col py-3 hidden md:flex'>
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
          <hr className='text-dark mx-4 hidden md:block' />
          {/* Playlists */}
          <div className='flex-col hidden md:flex'>
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
        className='w-[5px] ml-0.5 h-full bg-transparent hover:bg-zinc-400 ease-in duration-100 cursor-col-resize hidden md:block'
        draggable='true'
        onDragStart={onDragStart}
        onDrag={onDrag}
      />
    </div>
  )
}
