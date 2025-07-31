'use client'

import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Palette } from 'lucide-react'

export function ThemeSelector() {
  const { themeStyle, setThemeStyle, availableThemes, theme } = useTheme()

  return (
    <div className="relative group">
      <button
        className="p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Select theme style"
      >
        <Palette className="w-5 h-5" />
      </button>
      
      <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <h3 className="text-sm font-semibold mb-3">Theme Style</h3>
        <div className="space-y-2">
          {Object.entries(availableThemes).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setThemeStyle(key)}
              className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                themeStyle === key 
                  ? 'border-accent bg-accent/10' 
                  : 'border-border hover:border-accent/50 hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="font-medium text-sm">{config.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {config.description}
                  </div>
                </div>
                <div className="flex gap-1">
                  <div 
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ 
                      backgroundColor: theme === 'dark' 
                        ? config.preview.dark.accent 
                        : config.preview.light.accent 
                    }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}