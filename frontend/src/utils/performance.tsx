// Performance monitoring and optimization utilities

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

// Web Vitals tracking
export const reportWebVitals = (metric: any) => {
  // Send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric)
  }
}

// Performance observer for custom metrics
export class PerformanceTracker {
  private static instance: PerformanceTracker
  private observers: PerformanceObserver[] = []

  static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker()
    }
    return PerformanceTracker.instance
  }

  // Track custom performance marks
  mark(name: string): void {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(name)
    }
  }

  // Measure between two marks
  measure(name: string, startMark: string, endMark?: string): number | null {
    if (typeof performance !== 'undefined' && performance.measure) {
      try {
        if (endMark) {
          performance.measure(name, startMark, endMark)
        } else {
          performance.measure(name, startMark)
        }
        
        const measure = performance.getEntriesByName(name, 'measure')[0]
        return measure ? measure.duration : null
      } catch (error) {
        console.warn('Performance measure failed:', error)
        return null
      }
    }
    return null
  }

  // Track component rendering time
  trackComponentRender(componentName: string, renderFn: () => void): void {
    this.mark(`${componentName}-start`)
    renderFn()
    this.mark(`${componentName}-end`)
    
    const duration = this.measure(
      `${componentName}-render`,
      `${componentName}-start`,
      `${componentName}-end`
    )
    
    if (duration && duration > 16) { // > 1 frame at 60fps
      console.warn(`Slow component render: ${componentName} took ${duration.toFixed(2)}ms`)
    }
  }

  // Monitor long tasks
  observeLongTasks(): void {
    if (typeof PerformanceObserver !== 'undefined') {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) { // Tasks longer than 50ms
              console.warn('Long task detected:', entry.duration + 'ms')
              
              // Send to analytics
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'long_task', {
                  value: Math.round(entry.duration),
                  event_category: 'Performance',
                })
              }
            }
          })
        })
        
        observer.observe({ entryTypes: ['longtask'] })
        this.observers.push(observer)
      } catch (error) {
        console.warn('Long task observer not supported:', error)
      }
    }
  }

  // Monitor layout shifts
  observeLayoutShifts(): void {
    if (typeof PerformanceObserver !== 'undefined') {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.value > 0.1) { // Significant layout shift
              console.warn('Layout shift detected:', entry.value)
            }
          })
        })
        
        observer.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(observer)
      } catch (error) {
        console.warn('Layout shift observer not supported:', error)
      }
    }
  }

  // Clean up observers
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Resource preloading utilities
export const preloadResource = (href: string, as: string, type?: string): void => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (type) link.type = type
    document.head.appendChild(link)
  }
}

export const prefetchResource = (href: string): void => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)
  }
}

// Bundle size monitoring
export const logBundleSize = (): void => {
  if (typeof window !== 'undefined' && window.performance) {
    const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
    if (entries.length > 0) {
      const navigation = entries[0]
      const transferSize = navigation.transferSize
      const encodedBodySize = navigation.encodedBodySize
      
      console.log('Bundle metrics:', {
        transferSize: `${(transferSize / 1024).toFixed(2)}KB`,
        encodedBodySize: `${(encodedBodySize / 1024).toFixed(2)}KB`,
        compressionRatio: `${((1 - transferSize / encodedBodySize) * 100).toFixed(1)}%`
      })
    }
  }
}

// Image optimization utilities
export const getOptimizedImageUrl = (
  src: string, 
  width: number, 
  height?: number, 
  quality = 80
): string => {
  // For Next.js Image component or external image optimization service
  if (src.startsWith('http')) {
    // External image - use your preferred CDN/optimization service
    return src
  }
  
  // Local images - Next.js will handle optimization
  return src
}

// Component performance HOC
import React, { ComponentType, useEffect } from 'react'

export function withPerformanceTracking<P extends Record<string, any>>(
  WrappedComponent: ComponentType<P>,
  componentName: string
): ComponentType<P> {
  const PerformanceTrackedComponent = (props: P) => {
    const tracker = PerformanceTracker.getInstance()
    
    useEffect(() => {
      tracker.mark(`${componentName}-mount-start`)
      
      return () => {
        tracker.mark(`${componentName}-mount-end`)
        tracker.measure(
          `${componentName}-mount-duration`,
          `${componentName}-mount-start`,
          `${componentName}-mount-end`
        )
      }
    }, [tracker])

    return <WrappedComponent {...props} />
  }

  PerformanceTrackedComponent.displayName = `withPerformanceTracking(${componentName})`
  return PerformanceTrackedComponent
}

// React Suspense fallback with skeleton
export const createSkeletonFallback = (type: 'card' | 'list' | 'hero') => {
  switch (type) {
    case 'card':
      return (
        <div className="animate-pulse bg-card rounded-lg p-6 border border-border">
          <div className="h-6 bg-solarized-base02 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-solarized-base02 rounded"></div>
            <div className="h-4 bg-solarized-base02 rounded w-5/6"></div>
            <div className="h-4 bg-solarized-base02 rounded w-4/6"></div>
          </div>
        </div>
      )
    
    case 'list':
      return (
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-solarized-base02 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-solarized-base02 rounded w-3/4"></div>
                <div className="h-3 bg-solarized-base02 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )
    
    case 'hero':
      return (
        <div className="animate-pulse min-h-screen flex items-center justify-center">
          <div className="text-center space-y-8">
            <div className="h-16 bg-solarized-base02 rounded w-96 mx-auto"></div>
            <div className="h-8 bg-solarized-base02 rounded w-64 mx-auto"></div>
            <div className="flex justify-center space-x-4">
              <div className="h-12 bg-solarized-base02 rounded w-32"></div>
              <div className="h-12 bg-solarized-base02 rounded w-32"></div>
            </div>
          </div>
        </div>
      )
    
    default:
      return (
        <div className="animate-pulse">
          <div className="h-8 bg-solarized-base02 rounded mb-4"></div>
          <div className="h-4 bg-solarized-base02 rounded mb-2"></div>
          <div className="h-4 bg-solarized-base02 rounded w-2/3"></div>
        </div>
      )
  }
}

// Initialize performance tracking
export const initPerformanceTracking = (): void => {
  if (typeof window !== 'undefined') {
    const tracker = PerformanceTracker.getInstance()
    
    // Start monitoring
    tracker.observeLongTasks()
    tracker.observeLayoutShifts()
    
    // Log bundle size
    logBundleSize()
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      tracker.disconnect()
    })
  }
}

// Utility to delay non-critical operations
export const idleCallback = (callback: () => void, timeout = 5000): void => {
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(callback, { timeout })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(callback, 0)
    }
  }
}

// Memory usage monitoring
export const logMemoryUsage = (): void => {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory
    console.log('Memory usage:', {
      used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
      total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
      limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`
    })
  }
}