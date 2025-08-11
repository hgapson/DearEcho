'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from './utils'
import { badgeVariants, type BadgeVariantProps } from './badge-variants'

type BadgeProps = React.ComponentProps<'span'> &
  BadgeVariantProps & { asChild?: boolean }

export function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}
