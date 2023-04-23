import {
  default as BaseInfiniteScroll,
  Props as BaseInfiniteScrollProps,
} from 'react-infinite-scroll-component'
import { Preloader } from 'components'

interface InfititeScrollProps extends Omit<BaseInfiniteScrollProps, 'loader' | 'next'> {
  next: (offset: number) => void
  children: React.ReactNode
}

export const InfiniteScroll = ({ children, next, dataLength, ...props }: InfititeScrollProps) => {
  const fetchNext = () => {
    const offset = dataLength || 0
    next(offset)
  }

  return (
    <BaseInfiniteScroll
      {...props}
      next={fetchNext}
      dataLength={dataLength}
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
