import { Player } from 'components'
import { useDimensions } from 'hooks'
import { Sidebar } from './components/Sidebar'
import { Content } from './components/Content'
import { GradientBackground } from './components/GradientBackground'
import { Header } from './components/Header'

interface LayoutProps {
  isLoading?: boolean
  gradientBrightness?: number
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({
  isLoading = false,
  gradientBrightness,
  children,
}) => {
  const { height } = useDimensions()

  return (
    <div className='bg-dragonstone' style={{ height: height + 'px' }}>
      <main className='flex flex-col-reverse md:flex-row'>
        <Sidebar />
        <div className='flex flex-col'>
          <GradientBackground brightness={gradientBrightness} />
          <Header />
          <Content>{!isLoading && children}</Content>
        </div>
      </main>

      <Player />
    </div>
  )
}
