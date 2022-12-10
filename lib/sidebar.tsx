import {
  HomeIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { PlusCircleIcon, RssIcon } from '@heroicons/react/24/solid'

export interface SidebarItemType {
  id: string
  title: string
  path: string
  href?: string
  exact: boolean
  Icon?: JSX.Element
}

interface SidebarSectionType {
  main: SidebarItemType[]
  secondary: SidebarItemType[]
}

export const sidebar: SidebarSectionType = {
  main: [
    {
      id: 'home',
      title: 'Home',
      path: '/',
      exact: true,
      Icon: <HomeIcon />,
    },
    {
      id: 'search',
      title: 'Search',
      path: '/search',
      exact: false,
      Icon: <MagnifyingGlassIcon />,
    },
    {
      id: 'library',
      title: 'Your library',
      path: '/library',
      href: '/library/playlists',
      exact: false,
      Icon: <QueueListIcon />,
    },
  ],
  secondary: [
    {
      id: 'create-playlist',
      title: 'Create playlist',
      path: '/playlist/create',
      exact: true,
      Icon: <PlusCircleIcon />,
    },
    {
      id: 'liked',
      title: 'Liked songs',
      path: '/playlist/liked',
      exact: true,
      Icon: <HeartIcon />,
    },
    {
      id: 'top',
      title: 'Your favorites',
      path: '/top',
      exact: true,
      Icon: <RssIcon />,
    },
  ],
}
