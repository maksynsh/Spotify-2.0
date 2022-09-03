import {HomeIcon, MagnifyingGlassIcon, QueueListIcon, HeartIcon} from '@heroicons/react/24/outline'
import {PlusCircleIcon} from '@heroicons/react/24/solid'

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
      Icon: <HomeIcon className="h-6 w-6"/>,
    },
    {
      id: 'search',
      title: 'Search',
      path: '/search',
      Icon: <MagnifyingGlassIcon className="h-6 w-6"/>,
    },
    {
      id: 'library',
      title: 'Your library',
      path: '/library',
      Icon: <QueueListIcon className="h-6 w-6"/>,
    },
  ],
  secondary: [
    {
      id: 'create-playlist',
      title: 'Create playlist',
      path: '/playlist/create',
      Icon: <PlusCircleIcon className="h-6 w-6"/>,
    },
    {
      id: 'liked',
      title: 'Liked',
      path: '/liked',
      Icon: <HeartIcon className="h-6 w-6"/>,
    },
  ],
}