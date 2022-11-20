import { signOut } from 'next-auth/react'
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'

export interface MenuItemType {
  id: string
  title: string
  path?: string
  newTab?: boolean
  onClick?: () => void
  Icon?: JSX.Element
}

export const menu: MenuItemType[][] = [
  [
    {
      id: 'account',
      title: 'Account',
      path: '/account',
      newTab: true,
      Icon: <ArrowUpOnSquareIcon />,
    },
    {
      id: 'settings',
      title: 'Settings',
      path: '/settings',
    },
  ],
  [
    {
      id: 'logout',
      title: 'Logout',
      onClick: () => signOut(),
    },
  ],
]
