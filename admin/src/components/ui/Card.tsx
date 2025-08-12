import React from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  hover?: boolean
}

export function Card({ children, className, title, description, hover = true }: CardProps) {
  return (
    <div className={clsx(
      'bg-card border border-border rounded-lg p-6 shadow-sm theme-transition',
      hover && 'card-hover',
      className
    )}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}