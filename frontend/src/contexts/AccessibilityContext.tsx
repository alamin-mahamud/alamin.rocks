'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { prefersReducedMotion, createLiveRegion, updateLiveRegion } from '@/utils/accessibility'

interface AccessibilitySettings {
  reducedMotion: boolean
  highContrast: boolean
  largeText: boolean
  screenReaderMode: boolean
  focusVisible: boolean
  keyboardNavigation: boolean
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSetting: (key: keyof AccessibilitySettings, value: boolean) => void
  announce: (message: string, priority?: 'polite' | 'assertive') => void
  resetSettings: () => void
}

const defaultSettings: AccessibilitySettings = {
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  screenReaderMode: false,
  focusVisible: true,
  keyboardNavigation: true
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [mounted, setMounted] = useState(false)

  // Load settings from localStorage and detect system preferences
  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedSettings = localStorage.getItem('accessibility-settings')
    let initialSettings = { ...defaultSettings }

    if (savedSettings) {
      try {
        initialSettings = { ...initialSettings, ...JSON.parse(savedSettings) }
      } catch (error) {
        console.warn('Failed to parse accessibility settings:', error)
      }
    }

    // Detect system preferences
    initialSettings.reducedMotion = prefersReducedMotion()
    
    // Detect high contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      initialSettings.highContrast = true
    }

    // Detect if user prefers reduced transparency
    if (window.matchMedia('(prefers-reduced-transparency: reduce)').matches) {
      initialSettings.highContrast = true
    }

    setSettings(initialSettings)
    setMounted(true)

    // Create live regions for screen reader announcements
    createLiveRegion('polite')
    createLiveRegion('assertive')
  }, [])

  // Apply settings to document
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const body = document.body

    // Apply reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Apply high contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Apply large text
    if (settings.largeText) {
      root.classList.add('large-text')
    } else {
      root.classList.remove('large-text')
    }

    // Apply screen reader mode
    if (settings.screenReaderMode) {
      body.classList.add('screen-reader-mode')
    } else {
      body.classList.remove('screen-reader-mode')
    }

    // Apply focus visible
    if (settings.focusVisible) {
      root.classList.add('focus-visible')
    } else {
      root.classList.remove('focus-visible')
    }

    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings))
  }, [settings, mounted])

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)')

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({ ...prev, reducedMotion: e.matches }))
    }

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({ ...prev, highContrast: e.matches }))
    }

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
    highContrastQuery.addEventListener('change', handleHighContrastChange)

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
      highContrastQuery.removeEventListener('change', handleHighContrastChange)
    }
  }, [])

  // Keyboard navigation detection
  useEffect(() => {
    if (typeof window === 'undefined') return

    let isKeyboardUser = false

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        isKeyboardUser = true
        document.body.classList.add('keyboard-user')
        setSettings(prev => ({ ...prev, keyboardNavigation: true }))
      }
    }

    const handleMouseDown = () => {
      if (isKeyboardUser) {
        isKeyboardUser = false
        document.body.classList.remove('keyboard-user')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    
    // Announce setting change to screen readers
    announce(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`)
  }

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    updateLiveRegion(message, priority)
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    announce('Accessibility settings reset to default')
  }

  if (!mounted) {
    return null
  }

  return (
    <AccessibilityContext.Provider value={{
      settings,
      updateSetting,
      announce,
      resetSettings
    }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}