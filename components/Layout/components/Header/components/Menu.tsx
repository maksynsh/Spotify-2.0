import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

import { UserIcon } from 'assets'
import { BaseButton } from 'components'
import { menu, MenuItemType } from 'lib/menu'

interface MenuProps {
  userName?: string
  imageUrl?: string
}

const MenuItem = ({ title, path, newTab, onClick, Icon }: MenuItemType) => {
  return (
    <BaseButton
      className={`btn-base gap-2 w-full p-3 pr-2 rounded-sm
      justify-between items-center
      bg-transparent hover:bg-white hover:bg-opacity-10`}
      to={path}
      onClick={onClick}
    >
      <div className='text-ellipsis overflow-hidden whitespace-nowrap leading-tight'>{title}</div>
      {Icon && (
        <div className='w-5 h-5' id='menu-icon'>
          {Icon}
        </div>
      )}
    </BaseButton>
  )
}

export const Menu = ({ userName, imageUrl }: MenuProps) => {
  const menuRef = useRef<any>(null)
  const dropdownRef = useRef<any>(null)

  const [open, setOpen] = useState(false)

  const handleMenuClick = () => {
    setOpen((prev) => !prev)
  }

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        if (open) {
          setOpen(false)
        }
      }
    },
    [open],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [dropdownRef, handleOutsideClick])

  return (
    <div className='relative' id='menu' aria-label='Menu'>
      <div
        className='flex items-center gap-2 max-w-[12rem] bg-black rounded-full p-1 md:p-0.5 
        cursor-pointer group'
        ref={menuRef}
        onClick={handleMenuClick}
      >
        {imageUrl ? (
          <div className='relative w-7 h-7 md:w-9 md:h-9'>
            <Image
              className='rounded-full '
              src={imageUrl ?? '/user.svg'}
              loader={() => imageUrl ?? '/user.svg'}
              layout='fill'
              objectFit='cover'
              alt='userImage'
            />
          </div>
        ) : (
          <UserIcon className='rounded-full object-cover h-full md:w-10 md:h-10 text-white border-2 border-white p-1.5' />
        )}
        <h4
          className='font-semibold select-none truncate hidden md:block 
          ease-in duration-100 group-hover:opacity-80'
        >
          {userName ?? 'user'}
        </h4>
        <ChevronDownIcon className='h-5 w-5 pr-2 hidden md:block' />
      </div>
      <div
        className={`${
          !open ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        } transition-all ease-out duration-200
          fixed right-0 w-48 p-1 bg-dark text-base z-50 
          list-none divide-y divide-carbon rounded-md shadow-xl mt-2`}
        ref={dropdownRef}
        id='dropdown'
        aria-label='Menu dropdown'
      >
        {menu.map((section, i) => (
          <div key={i}>
            {section.map((menuItem) => (
              <MenuItem key={menuItem.id} {...menuItem} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
