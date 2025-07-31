'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useState, useEffect } from 'react'

const ThemeToggle = () => {
  const { theme, setTheme, toggleTheme } = useTheme()
  const [showOptions, setShowOptions] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-card border border-border animate-pulse" />
    )
  }

  const handleSystemTheme = () => {
    localStorage.removeItem('theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(systemTheme)
    setShowOptions(false)
  }

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      icon: Sun,
      action: () => {
        setTheme('light')
        setShowOptions(false)
      }
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: Moon,
      action: () => {
        setTheme('dark')
        setShowOptions(false)
      }
    },
    {
      value: 'system',
      label: 'System',
      icon: Monitor,
      action: handleSystemTheme
    }
  ]

  return (
    <div className="relative">
      {/* Quick Toggle Button */}
      <button
        onClick={toggleTheme}
        onContextMenu={(e) => {
          e.preventDefault()
          setShowOptions(!showOptions)
        }}
        className="w-10 h-10 rounded-lg bg-card border border-border hover:bg-muted transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
        title={`Current theme: ${theme}. Click to toggle, right-click for options`}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-solarized-yellow/10 to-solarized-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon with smooth rotation */}
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          {theme === 'light' ? (
            <Sun className="w-5 h-5 text-solarized-yellow rotate-0 transition-transform duration-300" />
          ) : (
            <Moon className="w-5 h-5 text-solarized-blue rotate-180 transition-transform duration-300" />
          )}
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-lg bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      </button>

      {/* Advanced Options Dropdown */}
      {showOptions && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowOptions(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden animate-fade-in">
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                Choose Theme
              </div>
              
              {themeOptions.map((option) => {
                const Icon = option.icon
                const isActive = option.value === theme || 
                  (option.value === 'system' && !localStorage.getItem('theme'))
                
                return (
                  <button
                    key={option.value}
                    onClick={option.action}
                    className={`w-full px-3 py-2 rounded-md flex items-center gap-3 text-sm transition-all duration-200 ${
                      isActive 
                        ? 'bg-accent text-accent-foreground' 
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{option.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-current opacity-70" />
                    )}
                  </button>
                )
              })}
            </div>
            
            {/* Footer */}
            <div className="px-3 py-2 border-t border-border bg-muted/50">
              <div className="text-xs text-muted-foreground">
                Right-click toggle for options
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ThemeToggle