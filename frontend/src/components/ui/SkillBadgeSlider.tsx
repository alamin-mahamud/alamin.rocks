"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SkillBadgeSliderProps {
  skills: string[]
  maxVisible?: number
  className?: string
}

const SkillBadgeSlider: React.FC<SkillBadgeSliderProps> = ({ 
  skills, 
  maxVisible = 4,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setIsOverflowing(skills.length > maxVisible)
  }, [skills.length, maxVisible])
  
  const visibleSkills = skills.slice(currentIndex, currentIndex + maxVisible)
  const canGoNext = currentIndex + maxVisible < skills.length
  const canGoPrev = currentIndex > 0
  
  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex(Math.min(currentIndex + maxVisible, skills.length - maxVisible))
    }
  }
  
  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex(Math.max(currentIndex - maxVisible, 0))
    }
  }
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {isOverflowing && (
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="btn btn-ghost btn-sm p-1 disabled:opacity-30 flex-shrink-0"
          aria-label="Previous skills"
        >
          <ChevronLeft size={14} />
        </button>
      )}
      
      <div 
        ref={containerRef}
        className="flex gap-2 overflow-hidden flex-1"
      >
        {visibleSkills.map((skill, idx) => (
          <span
            key={`${skill}-${currentIndex + idx}`}
            className="badge-tech mono flex-shrink-0 animate-fadeIn"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {skill}
          </span>
        ))}
      </div>
      
      {isOverflowing && (
        <>
          <span className="text-muted-foreground text-xs flex-shrink-0">
            +{skills.length - maxVisible}
          </span>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className="btn btn-ghost btn-sm p-1 disabled:opacity-30 flex-shrink-0"
            aria-label="Next skills"
          >
            <ChevronRight size={14} />
          </button>
        </>
      )}
    </div>
  )
}

export default SkillBadgeSlider