import { useSession } from 'next-auth/react'

import { GradientBackground } from './components/GradientBackground'
import { Menu } from './components/Menu'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

interface LayoutProps {
  gradientOpacity?: number
  children: React.ReactNode
}

export const Content: React.FC<LayoutProps> = ({ gradientOpacity, children }) => {
  const { data: session } = useSession()

  return (
    <div className='flex flex-col flex-grow min-h-screen overflow-hidden text-white relative mb-14 md:mb-24'>
      <GradientBackground opacity={gradientOpacity} />
      <header className='flex items-center justify-between h-16 p-2 px-2 md:px-6 absolute left-0 right-0 top-0 z-40'>
        <ArrowLeftIcon className='w-6 h-6' />

        <Menu imageUrl={session?.user?.image} userName={session?.user?.name} />
      </header>

      <div className='pt-16 relative'>{children}</div>
    </div>
  )
}
