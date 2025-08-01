"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Technology {
  id: string
  name: string
  category: string
  level: number
  years: number
  icon: string // SVG string or emoji
  color: string
}

interface TechnologySliderProps {
  technologies: Technology[]
  className?: string
}

const TechnologySlider: React.FC<TechnologySliderProps> = ({ 
  technologies, 
  className = "" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const itemsPerView = {
    mobile: 3,
    tablet: 5,
    desktop: 7
  }
  
  // Get current items per view based on screen size
  const getCurrentItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.desktop
    
    if (window.innerWidth < 768) return itemsPerView.mobile
    if (window.innerWidth < 1024) return itemsPerView.tablet
    return itemsPerView.desktop
  }
  
  const [itemsPerViewCurrent, setItemsPerViewCurrent] = useState(getCurrentItemsPerView())
  
  useEffect(() => {
    const handleResize = () => {
      setItemsPerViewCurrent(getCurrentItemsPerView())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const maxIndex = Math.max(0, technologies.length - itemsPerViewCurrent)
  
  const goToNext = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }
  
  const goToPrev = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }
  
  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }
  
  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    intervalRef.current = setInterval(goToNext, 3000)
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, maxIndex])
  
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)
  
  const visibleTechnologies = technologies.slice(currentIndex, currentIndex + itemsPerViewCurrent)
  
  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-all duration-200 shadow-sm"
        aria-label="Previous technologies"
      >
        <ChevronLeft size={16} />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-all duration-200 shadow-sm"
        aria-label="Next technologies"
      >
        <ChevronRight size={16} />
      </button>
      
      {/* Slider container */}
      <div 
        ref={sliderRef}
        className="overflow-hidden"
      >
        <div 
          className="flex transition-transform duration-500 ease-out gap-4"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerViewCurrent)}%)`,
            width: `${(technologies.length / itemsPerViewCurrent) * 100}%`
          }}
        >
          {technologies.map((tech, index) => (
            <div
              key={tech.id}
              className="flex-shrink-0 group"
              style={{ width: `${100 / technologies.length}%` }}
            >
              <div className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5 hover:border-accent/50 hover:-translate-y-1">
                {/* Technology icon */}
                <div className="flex items-center justify-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                  >
                    {tech.icon}
                  </div>
                </div>
                
                {/* Technology name */}
                <h3 className="text-center font-semibold text-foreground mb-2 text-sm">
                  {tech.name}
                </h3>
                
                {/* Progress indicator */}
                <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                  <div 
                    className="h-1.5 rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${tech.level}%`,
                      backgroundColor: tech.color
                    }}
                  />
                </div>
                
                {/* Experience years */}
                <div className="text-center text-xs text-muted-foreground">
                  {tech.years}y exp
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dot indicators */}
      <div className="flex justify-center items-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-accent w-6' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default TechnologySlider