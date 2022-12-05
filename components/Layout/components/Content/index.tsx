import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { GradientBackground } from './components/GradientBackground'
import { Menu } from './components/Menu'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useHistory } from 'providers'
import { BaseButton } from 'components/BaseButton'

interface LayoutProps {
  gradientBrightness?: number
  children: React.ReactNode
}

export const Content: React.FC<LayoutProps> = ({ gradientBrightness, children }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const history = useHistory()

  return (
    <div className='flex flex-col flex-grow min-h-screen overflow-hidden text-white relative mb-14 md:mb-24'>
      <GradientBackground brightness={gradientBrightness} />
      <header className='flex items-center justify-between h-auto md:h-16 p-2 px-2 md:px-6 absolute left-0 right-0 top-0 z-40'>
        <BaseButton
          className='clickable p-1 w-8 h-8'
          onClick={() => router.back()}
          disabled={!history.canGoBack()}
        >
          <ArrowLeftIcon />
        </BaseButton>

        <Menu imageUrl={session?.user?.image} userName={session?.user?.name} />
      </header>

      <div className='pt-16 relative'>{children}</div>
    </div>
  )
}
