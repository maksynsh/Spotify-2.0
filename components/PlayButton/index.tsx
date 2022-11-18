import { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

import { currentContextUriState, isPlayingState } from 'atoms/song'
import { usePlay } from 'hooks'

interface PlayButtonProps {
  uri: string
  size?: keyof typeof SIZES
  transition?: keyof typeof TRANSITIONS
  show?: boolean
}

const SIZES = {
  default: 'w-12 h-12',
  large: 'w-14 h-14',
}

const TRANSITIONS = {
  none: '',
  slideIn: 'translate-y-12',
  slideInShort: 'translate-y-4',
}

export const PlayButton = ({
  uri,
  size = 'default',
  transition = 'none',
  show = true,
}: PlayButtonProps) => {
  const [isPlaying] = useRecoilState(isPlayingState)
  const [currentContextUri] = useRecoilState(currentContextUriState)

  const play = usePlay()

  const isCurrentPlaying = useMemo(
    () => isPlaying && currentContextUri === uri,
    [isPlaying, currentContextUri, uri],
  )

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    play({ contextUri: uri })
  }

  return (
    <div
      onClick={handleClick}
      className={`hover:scale-105 transition-all ease duration-200 
            ${SIZES[size]} min-w-12
           bg-green text-dark rounded-full cursor-default 
            flex items-center justify-center
            ${
              show || isCurrentPlaying
                ? 'opacity-100 translate-y-0'
                : `opacity-0 ${TRANSITIONS[transition]}`
            }`}
    >
      {isCurrentPlaying ? (
        <PauseIcon className='w-8 h-8' />
      ) : (
        <PlayIcon className='w-[29px] h-[29px] ml-0.5' />
      )}
    </div>
  )
}
