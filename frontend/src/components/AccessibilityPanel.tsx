'use client'

import { useAccessibility } from '@/contexts/AccessibilityContext'
import { Settings, X, Eye, Type, Zap, Volume2, Focus, Keyboard } from 'lucide-react'
import { useState, useEffect } from 'react'

const AccessibilityPanel = () => {
  const { settings, updateSetting, announce, resetSettings } = useAccessibility()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Handle Escape key to close panel
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        announce('Accessibility panel closed')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, announce])

  if (!mounted) {
    return null
  }

  const togglePanel = () => {
    const newState = !isOpen
    setIsOpen(newState)
    announce(newState ? 'Accessibility panel opened' : 'Accessibility panel closed')
  }

  const accessibilityOptions = [
    {
      key: 'reducedMotion' as const,
      label: 'Reduce Motion',
      description: 'Minimize animations and transitions',
      icon: Zap,
      value: settings.reducedMotion
    },
    {
      key: 'highContrast' as const,
      label: 'High Contrast',
      description: 'Increase color contrast for better visibility',
      icon: Eye,
      value: settings.highContrast
    },
    {
      key: 'largeText' as const,
      label: 'Large Text',
      description: 'Increase font size throughout the site',
      icon: Type,
      value: settings.largeText
    },
    {
      key: 'screenReaderMode' as const,
      label: 'Screen Reader Mode',
      description: 'Optimize layout for screen readers',
      icon: Volume2,
      value: settings.screenReaderMode
    },
    {
      key: 'focusVisible' as const,
      label: 'Enhanced Focus',
      description: 'Show clear focus indicators',
      icon: Focus,
      value: settings.focusVisible
    },
    {
      key: 'keyboardNavigation' as const,
      label: 'Keyboard Navigation',
      description: 'Enable keyboard-only navigation',
      icon: Keyboard,
      value: settings.keyboardNavigation
    }
  ]

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-card border-2 border-border hover:border-accent shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
      >
        <Settings className="w-6 h-6 text-foreground group-hover:text-accent transition-colors duration-300 group-hover:rotate-90" />
        
        {/* Indicator for active settings */}
        {Object.values(settings).some(value => value) && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-accent-foreground rounded-full" />
          </div>
        )}
      </button>

      {/* Panel Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Panel */}
          <div 
            className="fixed bottom-24 left-6 w-80 bg-card border border-border rounded-lg shadow-xl z-50 transform transition-all duration-300 animate-fade-up"
            role="dialog"
            aria-labelledby="accessibility-panel-title"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 
                id="accessibility-panel-title"
                className="text-lg font-semibold text-foreground"
              >
                Accessibility Settings
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-muted transition-colors duration-200"
                aria-label="Close accessibility panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Settings */}
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {accessibilityOptions.map((option) => {
                const Icon = option.icon
                return (
                  <div 
                    key={option.key}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <label 
                          htmlFor={`accessibility-${option.key}`}
                          className="text-sm font-medium text-foreground cursor-pointer"
                        >
                          {option.label}
                        </label>
                        <button
                          id={`accessibility-${option.key}`}
                          role="switch"
                          aria-checked={option.value}
                          onClick={() => updateSetting(option.key, !option.value)}
                          className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card ${
                            option.value ? 'bg-accent' : 'bg-muted'
                          }`}
                          aria-describedby={`accessibility-${option.key}-desc`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                              option.value ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                      <p 
                        id={`accessibility-${option.key}-desc`}
                        className="text-xs text-muted-foreground mt-1"
                      >
                        {option.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <button
                onClick={resetSettings}
                className="w-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card"
              >
                Reset All Settings
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AccessibilityPanel