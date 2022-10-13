import React from 'react'
import { BaseButton } from 'components'
import { MenuItemType } from 'config/menu'

export interface MenuItemProps extends MenuItemType {
  active: boolean
}

export const MenuItem = ({ title, active, path, Icon }: MenuItemProps) => {
  return (
    <BaseButton
      className={`btn-base flex-col md:flex-row gap-1 md:gap-3 w-auto md:w-auto
      flex-grow basis-full sm:basis-24 sm:flex-grow-0 flex-1 md:flex-auto border-b-4 md:border-l-4 md:border-b-0
      border-transparent bg-transparent md:hover:bg-dark ${
        active && 'text-white border-green md:bg-dark'
      }`}
      to={path}
    >
      {Icon}
      <div className='text-ellipsis overflow-hidden whitespace-nowrap'>{title}</div>
    </BaseButton>
  )
}
