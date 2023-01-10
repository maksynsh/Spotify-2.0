import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ComputerDesktopIcon, DeviceTabletIcon } from '@heroicons/react/24/solid'

import { availableDevicesState, selectedDeviceIdState } from 'atoms/devices'

export const Devices = () => {
  const [devices] = useRecoilState(availableDevicesState)
  const [selectedId, setSelectedId] = useRecoilState(selectedDeviceIdState)

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

  const renderDeviceIcon = (type?: string) => {
    switch (type) {
      case 'Computer':
        return <ComputerDesktopIcon />
      case 'Smartphone':
        return <DeviceTabletIcon />
      default:
        return <ComputerDesktopIcon />
    }
  }

  const currentDevice = useMemo(
    () => devices?.find((d) => d.id === selectedId),
    [selectedId, devices],
  )

  return (
    <div className='relative' id='menu' aria-label='Menu'>
      <div
        className={`${!open ? 'hidden' : 'block'} whitespace-nowrap select-none text-white
          z-50 fixed max-md:left-0 bottom-0 md:bottom-10 md:absolute md:right-1/2 md:translate-x-1/2
          bg-dark text-base w-full md:w-auto p-4 pt-6
          list-none rounded-lg shadow-xl`}
        ref={dropdownRef}
        id='dropdown'
        aria-label='Menu dropdown'
      >
        <div className='flex items-center gap-4 px-4 py-2'>
          <div className='h-8 w-8'>{renderDeviceIcon(currentDevice?.type)}</div>
          <div>
            <h3 className='text-lg font-bold'>Current device</h3>
            <p className='text-green text-sm'>{currentDevice?.name}</p>
          </div>
        </div>
        <div>Select another device</div>
        <div className='mt-2 flex flex-col'>
          {devices
            ?.filter((d) => d.id !== selectedId)
            .map(({ id, name, type }) => (
              <div
                key={id}
                className='flex items-center gap-4 px-4 py-2 ease-in duration-100 
                hover:bg-carbon hover:bg-opacity-60 rounded'
                onClick={() => setSelectedId(id)}
              >
                <div className='h-8 w-8'>{renderDeviceIcon(type)}</div>
                <h3 className='text-sm font-bold'>{name}</h3>
              </div>
            ))}
        </div>
      </div>
      <div className='player-btn' ref={menuRef} onClick={handleMenuClick}>
        {renderDeviceIcon(currentDevice?.type)}
      </div>
    </div>
  )
}
