"use client"

import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' }
  ] as const

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode: 'en' | 'bn') => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-solarized-base2 dark:bg-solarized-base02 hover:bg-solarized-base1 dark:hover:bg-solarized-base01 transition-colors"
        aria-label={t('common.language')}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage?.nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white dark:bg-solarized-base03 shadow-lg border border-solarized-base2 dark:border-solarized-base01 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-solarized-base2 dark:hover:bg-solarized-base02 transition-colors ${
                language === lang.code 
                  ? 'bg-solarized-base1 dark:bg-solarized-base01 font-semibold' 
                  : ''
              }`}
            >
              <span className="block">{lang.nativeName}</span>
              <span className="block text-xs text-solarized-base01 dark:text-solarized-base1">
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector