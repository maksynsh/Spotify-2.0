import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

import { UserIcon } from 'assets'
interface LayoutProps {
  children: React.ReactNode
}

export const Content: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession()

  return (
    <div className='flex flex-col flex-grow text-white relative'>
      <header className='flex justify-end h-16 p-2 px-6 absolute left-0 right-0 top-0'>
        <div className='flex items-center gap-2 bg-black rounded-full p-0.5 pr-2 cursor-pointer ease-in duration-75 opacity-90 hover:opacity-80'>
          {session?.user?.image ? (
            <img
              className='rounded-full w-10 h-10'
              src={session?.user?.image ?? '/user.svg'}
              alt='userImage'
            />
          ) : (
            <UserIcon className='rounded-full w-10 h-10 text-white border-2 border-white p-1.5' />
          )}
          <h4 className='font-semibold mb-0.5'>{session?.user?.name ?? 'user'}</h4>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </header>

      {children}
    </div>
  )
}
