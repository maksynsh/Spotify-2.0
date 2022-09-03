import React from 'react'
import { MenuItem } from './components/MenuItem'
import { menu } from 'config/menu'

export const Sidebar = () => {
  return (
    <nav className='bg-black shadow-lg font-medium text-sm flex flex-col items-center content-between'>
      <section className='flex flex-col gap-2'>
        {menu.main.map(({id, title, path, Icon}) => (
          <MenuItem id={id} title={title} path={path} active={false} Icon={Icon}/>
        ))}
        <hr className="text-dark"/>
        {menu.secondary.map(({id, title, path, Icon}) => (
          <MenuItem id={id} title={title} path={path} active={false} Icon={Icon}/>
        ))}
        <hr className="text-dark"/>
      </section>
    </nav>
  )
}
