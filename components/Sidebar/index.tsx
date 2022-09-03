import React from 'react'
import {QueueListIcon} from '@heroicons/react/24/outline'
import { MenuItem } from './components/MenuItem'

export const Sidebar = () => {
  return (
    <section className='bg-black shadow-lg'>
      <ul>
        <MenuItem id={'1'} title='Your Library' path='/library' active={false} Icon={<QueueListIcon className="h-6 w-6"/>}/>
      </ul>
    </section>
  )
}
