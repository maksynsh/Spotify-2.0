import React from 'react'
import { BaseButton, BaseButtonProps } from 'components'

type Size = 'small' | 'default' | 'large'
type Type = 'primary' | 'secondary'

interface ButtonProps extends BaseButtonProps {
  size?: Size
  color?: Type
}

const SIZES = {
  small: 'btn-small',
  default: 'btn-default',
  large: 'btn-large',
}

const COLORS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
}

export const Button = ({
  size = 'default',
  color = 'primary',
  className,
  ...props
}: ButtonProps) => {
  return <BaseButton className={`${COLORS[color]} ${SIZES[size]} ${className}`} {...props} />
}
