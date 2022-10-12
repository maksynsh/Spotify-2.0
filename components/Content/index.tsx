import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import { shuffle } from 'lodash'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const COLORS = [
  'from-green',
  'from-purple-500',
  'from-red-500',
  'from-yellow-500',
  'from-orange-500',
  'from-slate-500',
  'from-pink-500',
  'from-indigo-500',
  'from-blue-500',
]

export const Content = () => {
  const { data: session } = useSession()
  const [color, setColor] = useState<string | undefined>()

  useEffect(() => {
    setColor(shuffle(COLORS).pop())
  }, [])

  return (
    <div className='flex flex-col flex-grow text-white relative'>
      <header className='flex justify-end p-2 px-6 absolute left-0 right-0 top-0'>
        <div className='flex items-center gap-2 bg-black rounded-full p-0.5 pr-2 cursor-pointer ease-in duration-75 opacity-90 hover:opacity-80'>
          <img
            className='rounded-full w-10 h-10'
            src={session?.user?.image ?? ''}
            alt='userImage'
          />
          <h4 className='font-semibold'>{session?.user?.name ?? 'user'}</h4>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-dark h-80 w-full text-white padding-8`}
      >
        <h1>Content space</h1>
      </section>
    </div>
  )
}
