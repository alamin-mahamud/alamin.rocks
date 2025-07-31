import { ReactNode } from 'react'
import { useLazyLoad } from '@/hooks/useLazyLoad'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

const LazySection = ({ 
  children, 
  fallback, 
  className = '', 
  threshold = 0.1, 
  rootMargin = '100px' 
}: LazySectionProps) => {
  const { elementRef, loaded } = useLazyLoad({ threshold, rootMargin })

  return (
    <div ref={elementRef as any} className={className}>
      {loaded ? children : (fallback || <SectionSkeleton />)}
    </div>
  )
}

const SectionSkeleton = () => (
  <div className="animate-pulse space-y-4 py-20">
    <div className="max-w-6xl mx-auto px-4">
      {/* Header skeleton */}
      <div className="text-center mb-16">
        <div className="h-12 bg-solarized-base02 rounded w-64 mx-auto mb-4"></div>
        <div className="h-6 bg-solarized-base02 rounded w-96 mx-auto"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-6 border border-border">
            <div className="h-6 bg-solarized-base02 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-solarized-base02 rounded"></div>
              <div className="h-4 bg-solarized-base02 rounded w-5/6"></div>
              <div className="h-4 bg-solarized-base02 rounded w-4/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default LazySection