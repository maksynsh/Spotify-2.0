import React from 'react'
import {QueueListIcon} from '@heroicons/react/24/outline'
import { MenuItem } from './components/MenuItem'

export const Sidebar = () => {
  return (
    <nav className='bg-black shadow-lg font-medium text-sm flex flex-col items-center content-between'>
      <section className='flex flex-col gap-2'>
        <MenuItem id={'1'} title='Your Library' path='/library' active={false} Icon={<QueueListIcon className="h-6 w-6"/>}/>
        <hr className="text-dark"/>
        <MenuItem id={'1'} title='Your Library' path='/library' active={false} Icon={<QueueListIcon className="h-6 w-6"/>}/>
        <MenuItem id={'1'} title='Your Library' path='/library' active={false} Icon={<QueueListIcon className="h-6 w-6"/>}/>
      </section>
    </nav>
  )
}
