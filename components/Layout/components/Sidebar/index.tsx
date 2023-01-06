import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useRecoilState } from 'recoil'

import { MenuItem } from './components/MenuItem'
import { sidebar } from 'lib/sidebar'
import { useResizable, useSpotify } from 'hooks'
import { playlistListState } from 'atoms/playlist'
import { currentContextUriState, currentTrackIdState, isPlayingState } from 'atoms/song'

export const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const { onDragStart, onDrag } = useResizable({ elementId: 'resizable', min: 125, max: 356 })

  const [hidden, setHidden] = useState(false)
  const [playlists, setPlaylists] =
    useRecoilState<SpotifyApi.PlaylistObjectSimplified[]>(playlistListState)
  const [currentTrackId] = useRecoilState(currentTrackIdState)
  const [currentContextUri] = useRecoilState(currentContextUriState)
  const [isPlaying] = useRecoilState(isPlayingState)

  const toggleSidebar = () => {
    let resizable = document.getElementById('resizable')
    if (!resizable) {
      return
    }

    if (!hidden) {
      setHidden(true)
      resizable.style.width = '0px'
      return
    }
    setHidden(false)
    resizable.style.width = '250px'
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && playlists.length < 1) {
      spotifyApi
        .getUserPlaylists({ limit: 30 })
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
      className='flex w-full md:w-64 sticky z-50 bottom-0 md:sticky md:h-screen md:top-0 pt-2.5 md:pt-0
      bg-gradient-to-b from-transparent via-black/90 to-black md:bg-black ease-in duration-150'
    >
      <nav className='shadow-lg w-full font-medium text-xs md:text-sm flex flex-col content-between md:pb-3 md:h-screen md:overflow-y-auto scrollbar-hidden'>
        <section className={`flex flex-col`}>
          {/* Main menu items */}
          <div className='flex md:flex-col justify-center md:justify-start md:py-3'>
            {sidebar.main.map(({ id, ...item }) => (
              <MenuItem {...item} key={id} id={id} />
            ))}
          </div>
          <hr className='text-dark mx-4 hidden md:block' />
          {/* Secondary menu items */}
          <div className='flex-col py-3 hidden md:flex'>
            {sidebar.secondary.map(({ id, ...item }) => (
              <MenuItem
                {...item}
                key={id}
                id={id}
                isPlaying={
                  id === 'liked' &&
                  //@ts-ignore
                  currentContextUri === `spotify:user:${session?.user?.id}:collection`
                }
              />
            ))}
          </div>
          <hr className='text-dark mx-4 hidden md:block' />
          {/* Playlists */}
          <div className={`flex-col hidden md:flex ${currentTrackId && 'md:pb-24'}`}>
            {playlists.map(({ id, name, uri }) => (
              <MenuItem
                key={id}
                id={id}
                title={name}
                path={`/playlist/${id}`}
                exact
                isPlaying={uri === currentContextUri && isPlaying}
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
      <div
        className={`w-6 h-6 hover:brightness-90 box-content ease-in duration-150 bg-green text-white 
        rounded-full border-4 border-black cursor-pointer absolute top-4 -right-3 z-20 
        hidden md:flex justify-center items-center 
        ${hidden && 'rotate-180 -right-4 border-0 top-[20px] bg-dark bg-opacity-60'}`}
        onClick={toggleSidebar}
      >
        {<ChevronLeftIcon width={19} height={19} />}
      </div>
    </div>
  )
}
