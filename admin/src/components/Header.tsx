'use client'

import { Bell, User } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/Button'

export function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-background border-b border-border">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-foreground">
          Alamin Rocks Admin
        </h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="h-4 w-4" />
        </Button>
        
        <ThemeToggle />
        
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-accent-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">Admin</span>
        </div>
      </div>
    </header>
  )
}