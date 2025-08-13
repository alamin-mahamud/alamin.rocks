import React from 'react'
import { clsx } from 'clsx'

interface TableProps {
  children: React.ReactNode
  className?: string
}

interface TableHeaderProps {
  children: React.ReactNode
  className?: string
}

interface TableBodyProps {
  children: React.ReactNode
  className?: string
}

interface TableRowProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

interface TableHeadProps {
  children: React.ReactNode
  className?: string
  sortable?: boolean
  sorted?: 'asc' | 'desc' | false
  onSort?: () => void
}

interface TableCellProps {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={clsx(
        'w-full text-sm',
        className
      )}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead className={clsx(
      'border-b border-border',
      className
    )}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className }: TableBodyProps) {
  return (
    <tbody className={clsx(
      'divide-y divide-border',
      className
    )}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, className, onClick, hover = true }: TableRowProps) {
  return (
    <tr
      className={clsx(
        'transition-colors',
        hover && 'hover:bg-muted/30',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export function TableHead({ 
  children, 
  className, 
  sortable, 
  sorted,
  onSort 
}: TableHeadProps) {
  return (
    <th 
      className={clsx(
        'h-10 px-2 text-left align-middle font-medium text-muted-foreground',
        'text-xs uppercase tracking-wider',
        sortable && 'cursor-pointer select-none hover:text-foreground',
        className
      )}
      onClick={sortable ? onSort : undefined}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortable && (
          <span className="text-muted-foreground">
            {sorted === 'asc' && '↑'}
            {sorted === 'desc' && '↓'}
            {!sorted && '↕'}
          </span>
        )}
      </div>
    </th>
  )
}

export function TableCell({ 
  children, 
  className,
  align = 'left' 
}: TableCellProps) {
  return (
    <td className={clsx(
      'p-2 align-middle',
      {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right'
      },
      className
    )}>
      {children}
    </td>
  )
}