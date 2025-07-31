'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { themes, defaultTheme, type ThemeConfig } from '@/styles/themes'

type ColorMode = 'light' | 'dark'

interface ThemeContextType {
  theme: ColorMode
  setTheme: (theme: ColorMode) => void
  toggleTheme: () => void
  themeStyle: string
  setThemeStyle: (style: string) => void
  availableThemes: Record<string, ThemeConfig>
  currentThemeConfig: ThemeConfig
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ColorMode>('light')
  const [themeStyle, setThemeStyle] = useState<string>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ColorMode
    const savedThemeStyle = localStorage.getItem('themeStyle') || defaultTheme
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
    Object.values(themes).forEach(theme => {
      root.classList.remove(theme.className)
    })
    
    // Add new theme classes
    root.classList.add(theme)
    const currentTheme = themes[themeStyle]
    if (currentTheme) {
      root.classList.add(currentTheme.className)
    }
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor && currentTheme) {
      const color = theme === 'dark' 
        ? currentTheme.preview.dark.background 
        : currentTheme.preview.light.background
      metaThemeColor.setAttribute('content', color)
    }

    // Save to localStorage
    localStorage.setItem('theme', theme)
    localStorage.setItem('themeStyle', themeStyle)
  }, [theme, themeStyle, mounted])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (event: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a theme
      if (!localStorage.getItem('theme')) {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light')
  }

  const currentThemeConfig = themes[themeStyle] || themes[defaultTheme]

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
      setThemeStyle,
      availableThemes: themes,
      currentThemeConfig
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