import React, { useEffect, useRef } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface SearchBarProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onClear: () => void
}

const iconSizes = 'w-6 h-6 md:w-7 md: h-7'

export const SearchBar = ({ value, onClear, onChange, ...props }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const focus = () => {
    inputRef.current?.focus()
  }

  const handleClick = () => {
    focus()
  }

  const handleClear = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation()
    onClear()
  }

  useEffect(() => {
    focus()
  }, [])

  return (
    <div
      className='flex items-center gap-2 cursor-text 
        text-black bg-white p-1 md:p-2 rounded-full h-9 md:h-10 max-w-[340px]'
      onClick={handleClick}
    >
      <MagnifyingGlassIcon className={iconSizes} />
      <input
        {...props}
        ref={inputRef}
        onChange={onChange}
        autoFocus
        value={value}
        className='flex-1 h-full min-w-0 outline-none placeholder:text-sm'
        aria-label='Search bar'
        type='text'
      />
      {value ? (
        <XMarkIcon className={`cursor-pointer ${iconSizes}`} onClick={handleClear} />
      ) : (
        <div className={iconSizes} />
      )}
    </div>
  )
}
