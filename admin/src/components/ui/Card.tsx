import React from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  hover?: boolean
  action?: React.ReactNode
}

export function Card({ 
  children, 
  className, 
  title, 
  description, 
  hover = false,
  action 
}: CardProps) {
  return (
    <div className={clsx(
      'bg-card border border-border rounded-lg p-6',
      hover && 'transition-shadow hover:shadow-md',
      className
    )}>
      {(title || description || action) && (
        <div className="mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {title && (
                <h3 className="text-sm font-semibold text-foreground">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            {action && (
              <div className="ml-4">
                {action}
              </div>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}