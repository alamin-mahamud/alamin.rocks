'use client'

import { useEffect } from 'react'

const SkipNavigation = () => {
  useEffect(() => {
    // Add focus styles for skip links
    const style = document.createElement('style')
    style.textContent = `
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: hsl(var(--accent));
        color: hsl(var(--accent-foreground));
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 600;
        font-size: 14px;
        z-index: 1000;
        transition: top 0.3s ease;
      }
      
      .skip-link:focus {
        top: 6px;
      }
      
      .skip-link:hover {
        background: hsl(var(--accent) / 0.9);
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  const skipLinks = [
    { href: '#main-content', text: 'Skip to main content' },
    { href: '#navigation', text: 'Skip to navigation' },
    { href: '#footer', text: 'Skip to footer' }
  ]

  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    
    const target = document.getElementById(targetId.substring(1))
    if (target) {
      // Make target focusable if it isn't already
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1')
      }
      
      target.focus()
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })

      // Remove tabindex after focus to restore natural tab order
      setTimeout(() => {
        if (target.getAttribute('tabindex') === '-1') {
          target.removeAttribute('tabindex')
        }
      }, 100)
    }
  }

  return (
    <div className="sr-only-focusable">
      {skipLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="skip-link"
          onClick={(e) => handleSkipClick(e, link.href)}
        >
          {link.text}
        </a>
      ))}
    </div>
  )
}

export default SkipNavigation