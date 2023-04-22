import {
  default as BaseInfiniteScroll,
  Props as BaseInfiniteScrollProps,
} from 'react-infinite-scroll-component'
import { Preloader } from 'components'

interface InfititeScrollProps extends Omit<BaseInfiniteScrollProps, 'loader'> {
  children: React.ReactNode
}

export const InfiniteScroll = ({ children, ...props }: InfititeScrollProps) => {
  return (
    <BaseInfiniteScroll
      {...props}
      loader={
        <div className='w-full flex justify-center'>
          <Preloader />
        </div>
      }
    >
      {children}
    </BaseInfiniteScroll>
  )
}
