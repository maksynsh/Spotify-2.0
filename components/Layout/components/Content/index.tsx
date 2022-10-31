import { signOut, useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

import { UserIcon } from 'assets'
import { Button } from 'components'
import { GradientBackground } from './GradientBackground'

interface LayoutProps {
  children: React.ReactNode
}

export const Content: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession()

  return (
    <div className='flex flex-col flex-grow min-h-screen text-white relative mb-14 md:mb-24'>
      <GradientBackground />
      <header className='flex items-center justify-between h-16 p-2 px-2 md:px-6 absolute left-0 right-0 top-0 z-40'>
        <Button color='secondary' onClick={() => signOut()}>
          Log out
        </Button>
        <div className='flex items-center gap-2 max-w-[12rem] bg-black rounded-full h-11 w-11 md:w-auto p-1 md:p-0.5 cursor-pointer ease-in duration-75 hover:opacity-90'>
          {session?.user?.image ? (
            <img
              className='rounded-full object-cover h-full md:w-10 md:h-10'
              src={session?.user?.image ?? '/user.svg'}
              alt='userImage'
            />
          ) : (
            <UserIcon className='rounded-full object-cover h-full md:w-10 md:h-10 text-white border-2 border-white p-1.5' />
          )}
          <h4 className='font-semibold truncate mb-0.5 hidden md:block'>
            {session?.user?.name ?? 'user'}
          </h4>
          <ChevronDownIcon className='h-5 w-5 pr-2 hidden md:block' />
        </div>
      </header>
      <div className='pt-16 relative'>{children}</div>
    </div>
  )
}
