import React, { MouseEvent } from 'react'
import { useRouter } from 'next/router'

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string
}

export const BaseButton = ({ to, onClick, children, ...props }: BaseButtonProps) => {
  const router = useRouter()

  const handleLink = (e: MouseEvent<HTMLButtonElement>) => {
    if (to) {
      e.preventDefault()
      router.push(to)
    }
  }

  return (
    <button onClick={to ? handleLink : onClick} {...props}>
      {children}
    </button>
  )
}
