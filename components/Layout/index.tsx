import { Player } from 'components'
import { Content } from './components/Content'
import { Sidebar } from './components/Sidebar'

interface LayoutProps {
  isLoading?: boolean
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ isLoading = false, children }) => {
  return (
    <div className='h-screen bg-dark'>
      <main className='flex flex-col-reverse md:flex-row'>
        <Sidebar />
        <Content>{!isLoading && children}</Content>
      </main>

      <Player />
    </div>
  )
}
