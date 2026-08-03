import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inline' | 'white'
export type ButtonSize = 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-blue text-white hover:bg-blue-dark shadow-banto-sm',
  secondary: 'bg-pink text-white hover:brightness-95 shadow-banto-sm',
  ghost: 'bg-transparent text-ink ring-2 ring-inset ring-line hover:ring-blue hover:text-blue',
  white: 'bg-white text-blue hover:bg-cream shadow-banto-sm',
  inline: 'text-blue underline underline-offset-4 decoration-2 hover:text-blue-dark px-0 py-0',
}

const SIZES: Record<ButtonSize, string> = {
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
}

export const buttonClasses = ({
  size = 'md',
  variant = 'primary',
}: {
  size?: ButtonSize
  variant?: ButtonVariant
} = {}) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-banto font-semibold',
    'transition-[background-color,transform,box-shadow] duration-200',
    'active:translate-y-0 disabled:cursor-default disabled:opacity-60',
    variant !== 'inline' && 'hover:-translate-y-0.5',
    variant !== 'inline' && SIZES[size],
    VARIANTS[variant],
  )

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize
  variant?: ButtonVariant
}

export const Button = ({ className, size, variant, ...props }: ButtonProps) => (
  <button className={cn(buttonClasses({ size, variant }), className)} {...props} />
)

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  size?: ButtonSize
  variant?: ButtonVariant
}

export const ButtonLink = ({ className, size, variant, ...props }: ButtonLinkProps) => (
  <Link className={cn(buttonClasses({ size, variant }), className)} {...props} />
)
