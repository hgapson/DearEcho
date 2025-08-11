'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from './utils'
import { buttonVariants, type ButtonVariantProps } from './button-variants'

type ButtonProps = React.ComponentProps<'button'> &
  ButtonVariantProps & {
    asChild?: boolean
  }

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export default Button
