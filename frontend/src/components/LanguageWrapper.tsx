"use client"

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface LanguageWrapperProps {
  children: React.ReactNode
}

const LanguageWrapper: React.FC<LanguageWrapperProps> = ({ children }) => {
  const { language } = useLanguage()

  useEffect(() => {
    // Update the html lang attribute
    document.documentElement.lang = language
  }, [language])

  return <>{children}</>
}

export default LanguageWrapper