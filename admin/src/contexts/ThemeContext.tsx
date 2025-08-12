'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type ColorMode = 'light' | 'dark'

interface ThemeContextType {
  theme: ColorMode
  setTheme: (theme: ColorMode) => void
  toggleTheme: () => void
  themeStyle: string
  setThemeStyle: (style: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ColorMode>('light')
  const [themeStyle, setThemeStyle] = useState<string>('default')
  const [mounted, setMounted] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme') as ColorMode
    const savedThemeStyle = localStorage.getItem('admin-themeStyle') || 'default'
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    
    setTheme(initialTheme)
    setThemeStyle(savedThemeStyle)
    setMounted(true)
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add new theme classes
    root.classList.add(theme)
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      const color = theme === 'dark' ? '#002b36' : '#fdf6e3'
      metaThemeColor.setAttribute('content', color)
    }

    // Save to localStorage
    localStorage.setItem('admin-theme', theme)
    localStorage.setItem('admin-themeStyle', themeStyle)
  }, [theme, themeStyle, mounted])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (event: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a theme
      if (!localStorage.getItem('admin-theme')) {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light')
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme,
      themeStyle,
      setThemeStyle
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}