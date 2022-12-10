import { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

import { currentContextUriState, isPlayingState } from 'atoms/song'
import { usePlayPause } from 'hooks'

interface PlayButtonProps {
  uri: string
  size?: keyof typeof buttonConfig['sizes']
  transition?: keyof typeof buttonConfig['transitions']
  show?: boolean
}

const buttonConfig = {
  sizes: {
    small: {
      bg: 'w-10 h-10',
      pauseIcon: 'w-7 h-7',
      playIcon: 'w-[25px] h-[25px] ml-0.5',
    },
    default: {
      bg: 'w-12 h-12',
      pauseIcon: 'w-8 h-8',
      playIcon: 'w-[29px] h-[29px] ml-0.5',
    },
    large: {
      bg: 'w-14 h-14',
      pauseIcon: 'w-8 h-8',
      playIcon: 'w-[29px] h-[29px] ml-0.5',
    },
  },
  transitions: {
    none: '',
    slideIn: 'translate-y-12',
    slideInShort: 'translate-y-4',
  },
}

export const PlayButton = ({
  uri,
  size = 'default',
  transition = 'none',
  show = true,
}: PlayButtonProps) => {
  const [isPlaying] = useRecoilState(isPlayingState)
  const [currentContextUri] = useRecoilState(currentContextUriState)

  const { play, pause } = usePlayPause()

  const isCurrentPlaying = useMemo(
    () => isPlaying && currentContextUri === uri,
    [isPlaying, currentContextUri, uri],
  )

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()

    if (isCurrentPlaying) {
      pause()
      return
    }
    play({ contextUri: uri })
  }

  return (
    <div
      onClick={handleClick}
      className={`hover:scale-105 transition-all ease duration-200 
            ${buttonConfig.sizes[size].bg} min-w-12
           bg-green text-dark rounded-full cursor-default 
            flex items-center justify-center
            ${
              show || isCurrentPlaying
                ? 'opacity-100 translate-y-0 shadow-sm'
                : `opacity-0 ${buttonConfig.transitions[transition]}`
            }`}
    >
      {isCurrentPlaying ? (
        <PauseIcon className={buttonConfig.sizes[size].pauseIcon} />
      ) : (
        <PlayIcon className={buttonConfig.sizes[size].playIcon} />
      )}
    </div>
  )
}
