import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

import { useHistory } from 'providers'
import { BaseButton } from 'components'
import { Menu } from './components/Menu'
import { backgroundGradientState } from 'atoms/background'

const OPACITY_TRANSITION_OFFSET = 100 //px

interface HeaderProps {
  opacityOffset?: number
  Controller?: React.FC<{ headerOpacity: number }>
}

export const Header = ({ opacityOffset = OPACITY_TRANSITION_OFFSET, Controller }: HeaderProps) => {
  const { data: session } = useSession()
  const router = useRouter()
  const history = useHistory()

  const [backgroundGradient] = useRecoilState<string>(backgroundGradientState)
  const [headerOpacity, setHeaderOpacity] = useState(0)

  const headerBackground = useMemo(
    () => backgroundGradient.replace('from', 'bg'),
    [backgroundGradient],
  )

  const handleScroll = () => {
    const opacity = Math.floor((window.pageYOffset - opacityOffset) / 3) / 100

    if (opacity > 1) {
      return setHeaderOpacity(1)
    }
    if (opacity < 0) {
      return setHeaderOpacity(0)
    }
    setHeaderOpacity(opacity)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`flex items-center gap-4 h-auto md:h-16 p-2 px-2 md:px-6 
        sticky left-0 right-0 top-0 z-40
        `}
    >
      <div
        className={`absolute left-0 top-0 -z-10 w-full h-full ${
          headerBackground ? headerBackground : ''
        }`}
        style={{ opacity: headerOpacity, backgroundImage: 'linear-gradient(rgb(0 0 0/65%) 0 0)' }}
      />

      <BaseButton
        className='clickable p-1 w-8 h-8'
        onClick={() => router.back()}
        disabled={!history.canGoBack()}
      >
        <ArrowLeftIcon />
      </BaseButton>

      {Controller && (
        <div className='w-[50vw] sm:w-[65vw] md:w-[30vw] xl:w-[65%]'>
          <Controller headerOpacity={headerOpacity} />
        </div>
      )}

      <Menu imageUrl={session?.user?.image} userName={session?.user?.name} />
    </header>
  )
}
