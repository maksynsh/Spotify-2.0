import React from 'react'
import { useRouter } from 'next/router'

import { MenuItem } from './components/MenuItem'
import { menu } from 'config/menu'

export const Sidebar = () => {
  const {pathname: currentPath} = useRouter()

  return (
    <nav className='bg-black shadow-lg font-medium text-sm flex flex-col content-between'>
      <section className={`flex flex-col`}>
        {menu.main.map(({id, title, path, Icon}) => (
          <MenuItem key={id} id={id} title={title} path={path} active={currentPath === path} Icon={Icon}/>
        ))}
        <hr className="text-dark my-3"/>
        {menu.secondary.map(({id, title, path, Icon}) => (
          <MenuItem key={id} id={id} title={title} path={path} active={currentPath === path} Icon={Icon}/>
        ))}
        <hr className="text-dark my-3"/>
      </section>
    </nav>
  )
}
