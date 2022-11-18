import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

interface PlayButtonProps {
  isPlaying: boolean
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void
  size?: keyof typeof SIZES
}

const SIZES = {
  default: 'w-12 h-12',
  large: 'w-14 h-14',
}

export const PlayButton = ({ isPlaying, handleClick, size = 'default' }: PlayButtonProps) => {
  return (
    <div
      onClick={handleClick}
      className={`hover:scale-105 transition-all ease duration-200 
            ${SIZES[size]} min-w-12
           bg-green text-dark rounded-full cursor-default 
            flex items-center justify-center`}
    >
      {isPlaying ? (
        <PauseIcon className='w-8 h-8' />
      ) : (
        <PlayIcon className='w-[29px] h-[29px] ml-0.5' />
      )}
    </div>
  )
}
