import React from 'react'
import { BaseButton } from 'components'
import { MenuItemType } from 'config/menu'

export interface MenuItemProps extends MenuItemType {
  active: boolean
}

export const MenuItem = ({ title, active, path, Icon }: MenuItemProps) => {
  return (
    <BaseButton
      className={`btn-base border-l-4 border-transparent hover:bg-dark ${
        active && 'text-white border-green'
      }`}
      to={path}
    >
      {Icon}
      {title}
    </BaseButton>
  )
}
