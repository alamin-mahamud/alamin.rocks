'use client'

import { useEffect, useState } from 'react'
import { runAccessibilityChecks } from '@/utils/accessibility'
import { AlertCircle, CheckCircle, Eye, AlertTriangle } from 'lucide-react'

interface AccessibilityIssues {
  missingAltText: Element[]
  lowContrast: Element[]
  missingLabels: Element[]
  missingHeadings: boolean
  duplicateIds: Element[]
}

const AccessibilityTester = () => {
  const [issues, setIssues] = useState<AccessibilityIssues | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    const runTests = () => {
      const results = runAccessibilityChecks()
      setIssues(results)
    }

    // Run initial test
    runTests()

    // Run tests when DOM changes
    const observer = new MutationObserver(runTests)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    })

    return () => observer.disconnect()
  }, [])

  if (process.env.NODE_ENV !== 'development' || !issues) return null

  const totalIssues = 
    issues.missingAltText.length +
    issues.lowContrast.length +
    issues.missingLabels.length +
    (issues.missingHeadings ? 1 : 0) +
    issues.duplicateIds.length

  const getElementSelector = (element: Element): string => {
    let selector = element.tagName.toLowerCase()
    if (element.id) selector += `#${element.id}`
    if (element.className) selector += `.${element.className.split(' ')[0]}`
    return selector
  }

  return (
    <div className="fixed bottom-20 right-20 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          totalIssues > 0 
            ? 'bg-destructive text-destructive-foreground' 
            : 'bg-success text-white'
        }`}
        title={`Accessibility Issues: ${totalIssues}`}
      >
        {totalIssues > 0 ? (
          <AlertCircle className="w-6 h-6" />
        ) : (
          <CheckCircle className="w-6 h-6" />
        )}
        
        {/* Issue count badge */}
        {totalIssues > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-destructive rounded-full flex items-center justify-center text-xs font-bold">
            {totalIssues > 99 ? '99+' : totalIssues}
          </div>
        )}
      </button>

      {/* Issues Panel */}
      {isVisible && (
        <div className="absolute bottom-14 right-0 w-80 bg-card border border-border rounded-lg shadow-xl p-4 max-h-96 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Accessibility Check</h3>
          </div>

          {totalIssues === 0 ? (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">No accessibility issues found!</span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Missing Alt Text */}
              {issues.missingAltText.length > 0 && (
                <div className="border-l-4 border-warning pl-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="font-medium text-sm">Missing Alt Text ({issues.missingAltText.length})</span>
                  </div>
                  <div className="space-y-1">
                    {issues.missingAltText.slice(0, 3).map((element, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        {getElementSelector(element)}
                      </div>
                    ))}
                    {issues.missingAltText.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{issues.missingAltText.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Missing Labels */}
              {issues.missingLabels.length > 0 && (
                <div className="border-l-4 border-destructive pl-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="font-medium text-sm">Missing Form Labels ({issues.missingLabels.length})</span>
                  </div>
                  <div className="space-y-1">
                    {issues.missingLabels.slice(0, 3).map((element, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        {getElementSelector(element)}
                      </div>
                    ))}
                    {issues.missingLabels.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{issues.missingLabels.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Missing Headings */}
              {issues.missingHeadings && (
                <div className="border-l-4 border-warning pl-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="font-medium text-sm">No Heading Structure Found</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Page should have proper heading hierarchy (h1, h2, etc.)
                  </p>
                </div>
              )}

              {/* Duplicate IDs */}
              {issues.duplicateIds.length > 0 && (
                <div className="border-l-4 border-destructive pl-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="font-medium text-sm">Duplicate IDs ({issues.duplicateIds.length})</span>
                  </div>
                  <div className="space-y-1">
                    {issues.duplicateIds.slice(0, 3).map((element, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        {getElementSelector(element)}
                      </div>
                    ))}
                    {issues.duplicateIds.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{issues.duplicateIds.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Development mode only. This panel helps identify accessibility issues during development.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccessibilityTester