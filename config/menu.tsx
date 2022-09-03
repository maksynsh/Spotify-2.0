import {
  HomeIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { PlusCircleIcon, RssIcon } from '@heroicons/react/24/solid'

export interface MenuItemType {
  id: string
  title: string
  path?: string
  Icon?: JSX.Element
}

interface MenuSectionType {
  main: MenuItemType[]
  secondary: MenuItemType[]
}

export const menu: MenuSectionType = {
  main: [
    {
      id: 'home',
      title: 'Home',
      path: '/',
      Icon: <HomeIcon width='1.5rem' height='1.5rem' />,
    },
    {
      id: 'search',
      title: 'Search',
      path: '/search',
      Icon: <MagnifyingGlassIcon width='1.5rem' height='1.5rem' />,
    },
    {
      id: 'library',
      title: 'Your library',
      path: '/library',
      Icon: <QueueListIcon width='1.5rem' height='1.5rem' />,
    },
  ],
  secondary: [
    {
      id: 'create-playlist',
      title: 'Create playlist',
      path: '/playlist/create',
      Icon: <PlusCircleIcon width='1.5rem' height='1.5rem' />,
    },
    {
      id: 'liked',
      title: 'Liked songs',
      path: '/liked',
      Icon: <HeartIcon width='1.5rem' height='1.5rem' />,
    },
    {
      id: 'top',
      title: 'Your favorites',
      path: '/top',
      Icon: <RssIcon width='1.5rem' height='1.5rem' />,
    },
  ],
}
