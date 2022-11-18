import { Player } from 'components'
import { useDimensions } from 'hooks'
import { Content } from './components/Content'
import { Sidebar } from './components/Sidebar'

interface LayoutProps {
  isLoading?: boolean
  gradientOpacity?: number
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ isLoading = false, gradientOpacity, children }) => {
  const { height } = useDimensions()

  return (
    <div className='bg-dragonstone' style={{ height: height + 'px' }}>
      <main className='flex flex-col-reverse md:flex-row'>
        <Sidebar />
        <Content gradientOpacity={gradientOpacity}>{!isLoading && children}</Content>
      </main>

      <Player />
    </div>
  )
}
