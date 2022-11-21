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
  path?: string
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
      Icon: <HomeIcon />,
    },
    {
      id: 'search',
      title: 'Search',
      path: '/search',
      Icon: <MagnifyingGlassIcon />,
    },
    {
      id: 'library',
      title: 'Your library',
      path: '/library',
      Icon: <QueueListIcon />,
    },
  ],
  secondary: [
    {
      id: 'create-playlist',
      title: 'Create playlist',
      path: '/playlist/create',
      Icon: <PlusCircleIcon />,
    },
    {
      id: 'liked',
      title: 'Liked songs',
      path: '/playlist/liked',
      Icon: <HeartIcon />,
    },
    {
      id: 'top',
      title: 'Your favorites',
      path: '/top',
      Icon: <RssIcon />,
    },
  ],
}
