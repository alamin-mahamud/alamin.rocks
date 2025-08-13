import React from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export function Input({
  label,
  error,
  helperText,
  className,
  id,
  prefix,
  suffix,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="space-y-1.5">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground text-sm">{prefix}</span>
          </div>
        )}
        <input
          id={inputId}
          className={clsx(
            'w-full px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground',
            'placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/20',
            'transition-colors duration-150',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            prefix && 'pl-8',
            suffix && 'pr-8',
            error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground text-sm">{suffix}</span>
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-muted-foreground mt-1">{helperText}</p>
      )}
    </div>
  )
}