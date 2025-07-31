'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Sun, Moon, Palette } from 'lucide-react'
import { useState, useEffect } from 'react'

const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 rounded-full bg-card border-2 border-border hover:border-accent shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden backdrop-blur-sm"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-solarized-yellow/20 via-solarized-green/20 to-solarized-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        
        {/* Ripple effect on click */}
        <div className="absolute inset-0 rounded-full bg-accent/30 scale-0 group-active:scale-100 transition-transform duration-300" />
        
        {/* Main icon container */}
        <div className="relative z-10 transition-all duration-500">
          {theme === 'light' ? (
            <div className="relative">
              <Sun className="w-6 h-6 text-solarized-yellow transition-all duration-300 group-hover:rotate-45 group-hover:scale-110" />
              {/* Sun rays */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border border-solarized-yellow/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ) : (
            <div className="relative">
              <Moon className="w-6 h-6 text-solarized-blue transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110" />
              {/* Stars */}
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-solarized-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
              <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-solarized-violet rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
            </div>
          )}
        </div>

        {/* Floating palette icon indicator */}
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}>
          <Palette className="w-3 h-3" />
        </div>

      </button>
    </div>
  )
}

export default FloatingThemeToggle