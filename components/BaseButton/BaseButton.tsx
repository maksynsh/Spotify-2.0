import React, { MouseEvent } from 'react'

import { useRouter } from 'next/router'
import { Url } from 'url'

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: Url
}

export const BaseButton = ({to, onClick, ...props}: BaseButtonProps) => {
  const router = useRouter()

  const handleLink = (e: MouseEvent<HTMLButtonElement>) => {
    if (to) {
      e.preventDefault()
      router.push(to)
    }
  }

  return (
    <button onClick={to ? handleLink : onClick} {...props}>BaseButton</button>
  )
}
