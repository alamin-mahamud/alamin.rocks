'use client'

import { Bell, User, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-background border-b border-border theme-transition backdrop-blur-sm">
      <div className="flex items-center space-x-6">
        <h2 className="text-xl font-semibold text-foreground">
          Admin Dashboard
        </h2>
        
        {/* Search bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="p-2 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full flex items-center justify-center">
            <span className="text-xs text-accent-foreground font-medium">3</span>
          </span>
        </Button>
        
        <ThemeToggle />
        
        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-border">
          <div className="h-8 w-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-sm">
            <User className="h-4 w-4 text-accent-foreground" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-foreground">Admin User</div>
            <div className="text-xs text-muted-foreground">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  )
}