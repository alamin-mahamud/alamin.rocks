import React from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20 disabled:pointer-events-none disabled:opacity-50'
  
  const variantClasses = {
    primary: 'bg-foreground text-background hover:bg-foreground/90 shadow-sm',
    secondary: 'bg-background border border-border hover:bg-muted',
    danger: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
    ghost: 'hover:bg-muted hover:text-foreground',
    outline: 'border border-border bg-transparent hover:bg-muted'
  }
  
  const sizeClasses = {
    sm: 'h-7 px-3 text-xs',
    md: 'h-8 px-4 text-sm',
    lg: 'h-10 px-6 text-sm'
  }

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        loading && 'relative text-transparent',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <span className={loading ? 'invisible' : ''}>
        {children}
      </span>
    </button>
  )
}