import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useLazyLoad } from '@/hooks/useLazyLoad'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

const LazyImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  placeholder, 
  blurDataURL,
  onLoad,
  onError
}: LazyImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { elementRef, loaded } = useLazyLoad({ threshold: 0.1, rootMargin: '100px' })

  const handleLoad = useCallback(() => {
    setImageLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setImageError(true)
    onError?.()
  }, [onError])

  const placeholderSrc = placeholder || 
    blurDataURL || 
    `data:image/svg+xml,%3Csvg width='${width || 400}' height='${height || 300}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23073642'/%3E%3C/svg%3E`

  return (
    <div 
      ref={elementRef as any} 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      <div
        className={`absolute inset-0 w-full h-full bg-solarized-base02 transition-opacity duration-300 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />
      
      {/* Loading animation */}
      {loaded && !imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-solarized-base02">
          <div className="w-8 h-8 border-2 border-solarized-green border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Actual image */}
      {loaded && !imageError && (
        <Image
          src={src}
          alt={alt}
          width={width || 400}
          height={height || 300}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          unoptimized
        />
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-solarized-base02 text-solarized-base1">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image failed to load</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LazyImage