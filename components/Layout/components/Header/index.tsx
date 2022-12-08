import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

import { useHistory } from 'providers'
import { BaseButton } from 'components'
import { Menu } from './components/Menu'

export const Header = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const history = useHistory()

  return (
    <header className='flex items-center justify-between h-auto md:h-16 p-2 px-2 md:px-6 sticky left-0 right-0 top-0 z-40'>
      <BaseButton
        className='clickable p-1 w-8 h-8'
        onClick={() => router.back()}
        disabled={!history.canGoBack()}
      >
        <ArrowLeftIcon />
      </BaseButton>

      <Menu imageUrl={session?.user?.image} userName={session?.user?.name} />
    </header>
  )
}
