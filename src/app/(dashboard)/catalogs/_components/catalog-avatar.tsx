'use client'

import { Avatar } from '@nextui-org/react'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

import type { AvatarProps } from '@nextui-org/react'

export const CatalogAvatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, className, classNames = {}, ...props }, ref) => (
    <Avatar
      {...props}
      ref={ref}
      classNames={{
        ...classNames,
        base: cn(
          'bg-transparent border border-divider',
          classNames?.base,
          className
        ),
        name: cn(
          'text-default-500 text-[0.6rem] font-semibold',
          classNames?.name
        )
      }}
      getInitials={name => name.charAt(0).toUpperCase()}
      name={name}
      radius="md"
      size="sm"
    />
  )
)

CatalogAvatar.displayName = 'CatalogAvatar'
