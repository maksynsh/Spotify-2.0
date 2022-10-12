import React, { MouseEvent } from 'react'
import Link from 'next/link'

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string
}

export const BaseButton = ({ to, onClick = () => {}, children, ...props }: BaseButtonProps) => {
  return (
    <>
      {to ? (
        <Link href={to}>
          <button {...props}>{children}</button>
        </Link>
      ) : (
        <button onClick={onClick} {...props}>
          {children}
        </button>
      )}
    </>
  )
}
