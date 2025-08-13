'use client'

import { Bell, Search, Command } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useState } from 'react'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-background border-b border-border">
      <div className="flex items-center flex-1">
        {/* Search - Vercel Style */}
        <div className="relative max-w-md w-full mr-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-background border border-border rounded-md 
                     placeholder:text-muted-foreground focus:outline-none focus:ring-1 
                     focus:ring-foreground/20 focus:border-foreground/20 transition-colors"
          />
          <kbd className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden sm:inline-flex h-5 
                        items-center gap-1 rounded border border-border px-1.5 
                        font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Notifications - Minimal Style */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground 
                         hover:bg-muted rounded-md transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-blue-500 rounded-full" />
        </button>
        
        <ThemeToggle />
        
        {/* User Menu - Vercel Style */}
        <button className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md 
                         hover:bg-muted transition-colors">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-gray-400 to-gray-600" />
          <span className="hidden sm:inline-block text-muted-foreground">admin</span>
        </button>
      </div>
    </header>
  )
}