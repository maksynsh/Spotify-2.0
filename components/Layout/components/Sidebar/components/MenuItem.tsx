import React, { memo, useMemo } from 'react'
import { useRouter } from 'next/router'
import { SpeakerWaveIcon } from '@heroicons/react/24/outline'

import { BaseButton } from 'components'
import { SidebarItemType } from 'lib/sidebar'

export interface MenuItemProps extends SidebarItemType {
  isPlaying?: boolean
}

export const MenuItem = memo(
  ({ title, exact, path, href, isPlaying = false, Icon }: MenuItemProps) => {
    const { asPath: currentPath } = useRouter()

    const isActive = useMemo(
      () => (exact ? currentPath === path : currentPath.startsWith(path)),
      [path, currentPath, exact],
    )

    return (
      <BaseButton
        className={`btn-base flex-col md:flex-row gap-0.5 sm:gap-1 md:gap-2 w-auto md:w-auto px-2 sm:px-4 py-1 sm:py-2
      flex-grow basis-full sm:basis-24 sm:flex-grow-0 flex-1 md:flex-auto border-b-4 md:border-l-4 md:border-b-0
      border-transparent bg-transparent md:hover:bg-dark ${
        isActive && 'text-white border-green md:bg-dark'
      }`}
        to={href || path}
      >
        {Icon && (
          <div className='w-5 h-5 md:w-6 md:h-6' id='nav-icon'>
            {Icon}
          </div>
        )}
        <div className='text-ellipsis overflow-hidden whitespace-nowrap'>{title}</div>
        {isPlaying && <SpeakerWaveIcon className='text-green ml-auto w-4 h-4 shrink-0' />}
      </BaseButton>
    )
  },
)

MenuItem.displayName = 'MenuItem'
