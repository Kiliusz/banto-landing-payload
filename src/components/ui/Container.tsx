import React from 'react'

import { cn } from '@/utilities/ui'

export const Container = ({
  children,
  className,
  size = 'default',
}: {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}) => (
  <div
    className={cn(
      'mx-auto w-full px-5 sm:px-8',
      {
        'max-w-[76rem]': size === 'default',
        'max-w-[46rem]': size === 'narrow',
        'max-w-[88rem]': size === 'wide',
      },
      className,
    )}
  >
    {children}
  </div>
)
