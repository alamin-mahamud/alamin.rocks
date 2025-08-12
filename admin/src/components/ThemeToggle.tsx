'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className="relative p-2 hover:bg-muted/70 transition-all duration-200"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="relative">
          {theme === 'light' ? (
            <Moon className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
          ) : (
            <Sun className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
          )}
        </div>
      </Button>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded-md whitespace-nowrap z-50 animate-fadeIn">
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-foreground rotate-45"></div>
        </div>
      )}
    </div>
  )
}