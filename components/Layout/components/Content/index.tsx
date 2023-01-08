interface LayoutProps {
  children: React.ReactNode
}

export const Content: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col flex-grow min-h-screen overflow-hidden text-white relative mb-14 md:mb-24'>
      <div className='relative h-full'>{children}</div>
    </div>
  )
}
