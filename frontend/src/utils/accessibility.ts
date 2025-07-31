// Accessibility utilities and helpers

// Focus management
export const focusElement = (selector: string): boolean => {
  const element = document.querySelector(selector) as HTMLElement
  if (element) {
    element.focus()
    return true
  }
  return false
}

export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ')

  return Array.from(container.querySelectorAll(focusableSelectors))
}

// Trap focus within a container (useful for modals/dialogs)
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = getFocusableElements(container)
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }
  }

  container.addEventListener('keydown', handleTabKey)

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey)
  }
}

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Screen reader utilities
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.setAttribute('class', 'sr-only')
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Keyboard navigation helpers
export const handleArrowNavigation = (
  event: KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  orientation: 'horizontal' | 'vertical' = 'horizontal'
): number => {
  let newIndex = currentIndex

  switch (event.key) {
    case 'ArrowRight':
      if (orientation === 'horizontal') {
        event.preventDefault()
        newIndex = (currentIndex + 1) % items.length
      }
      break
    case 'ArrowLeft':
      if (orientation === 'horizontal') {
        event.preventDefault()
        newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
      }
      break
    case 'ArrowDown':
      if (orientation === 'vertical') {
        event.preventDefault()
        newIndex = (currentIndex + 1) % items.length
      }
      break
    case 'ArrowUp':
      if (orientation === 'vertical') {
        event.preventDefault()
        newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
      }
      break
    case 'Home':
      event.preventDefault()
      newIndex = 0
      break
    case 'End':
      event.preventDefault()
      newIndex = items.length - 1
      break
  }

  if (newIndex !== currentIndex) {
    items[newIndex]?.focus()
  }

  return newIndex
}

// Color contrast utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // This is a simplified version - in production, you'd want a more robust color parser
    const rgb = color.match(/\d+/g)?.map(Number) || [0, 0, 0]
    const [r, g, b] = rgb.map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

export const meetsWCAGContrastRequirements = (
  color1: string, 
  color2: string, 
  level: 'AA' | 'AAA' = 'AA',
  fontSize: 'normal' | 'large' = 'normal'
): boolean => {
  const contrast = getContrastRatio(color1, color2)
  
  if (level === 'AAA') {
    return fontSize === 'large' ? contrast >= 4.5 : contrast >= 7
  } else {
    return fontSize === 'large' ? contrast >= 3 : contrast >= 4.5
  }
}

// Accessibility checker
export const runAccessibilityChecks = (): {
  missingAltText: Element[]
  lowContrast: Element[]
  missingLabels: Element[]
  missingHeadings: boolean
  duplicateIds: Element[]
} => {
  const results = {
    missingAltText: [] as Element[],
    lowContrast: [] as Element[],
    missingLabels: [] as Element[],
    missingHeadings: false,
    duplicateIds: [] as Element[]
  }

  // Check for missing alt text on images
  const images = document.querySelectorAll('img')
  images.forEach(img => {
    if (!img.getAttribute('alt') && !img.getAttribute('aria-label')) {
      results.missingAltText.push(img)
    }
  })

  // Check for form inputs without labels
  const inputs = document.querySelectorAll('input, textarea, select')
  inputs.forEach(input => {
    const hasLabel = input.getAttribute('aria-label') || 
                    input.getAttribute('aria-labelledby') ||
                    document.querySelector(`label[for="${input.id}"]`)
    if (!hasLabel) {
      results.missingLabels.push(input)
    }
  })

  // Check for heading structure
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  if (headings.length === 0) {
    results.missingHeadings = true
  }

  // Check for duplicate IDs
  const allIds = new Set<string>()
  const elementsWithIds = document.querySelectorAll('[id]')
  elementsWithIds.forEach(element => {
    const id = element.id
    if (allIds.has(id)) {
      results.duplicateIds.push(element)
    } else {
      allIds.add(id)
    }
  })

  return results
}

// Skip link utilities
export const createSkipLink = (target: string, text: string): HTMLElement => {
  const skipLink = document.createElement('a')
  skipLink.href = `#${target}`
  skipLink.textContent = text
  skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:font-medium'
  
  skipLink.addEventListener('click', (e) => {
    e.preventDefault()
    const targetElement = document.getElementById(target)
    if (targetElement) {
      targetElement.focus()
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  })

  return skipLink
}

// ARIA live region utilities
export const createLiveRegion = (priority: 'polite' | 'assertive' = 'polite'): HTMLElement => {
  const liveRegion = document.createElement('div')
  liveRegion.setAttribute('aria-live', priority)
  liveRegion.setAttribute('aria-atomic', 'true')
  liveRegion.className = 'sr-only'
  liveRegion.id = `live-region-${priority}`
  
  document.body.appendChild(liveRegion)
  
  return liveRegion
}

export const updateLiveRegion = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const liveRegion = document.getElementById(`live-region-${priority}`)
  if (liveRegion) {
    liveRegion.textContent = message
  } else {
    // Create if doesn't exist
    const newRegion = createLiveRegion(priority)
    newRegion.textContent = message
  }
}