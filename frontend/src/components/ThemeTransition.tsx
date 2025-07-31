'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { useEffect, useState } from 'react'

const ThemeTransition = () => {
  const { theme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Trigger transition animation when theme changes
    setIsTransitioning(true)
    
    // Generate random particles for transition effect
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5
    }))
    setParticles(newParticles)

    const timer = setTimeout(() => {
      setIsTransitioning(false)
      setParticles([])
    }, 1000)

    return () => clearTimeout(timer)
  }, [theme])

  if (!isTransitioning) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Ripple effect from center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`w-4 h-4 rounded-full ${
            theme === 'dark' 
              ? 'bg-solarized-blue/30' 
              : 'bg-solarized-yellow/30'
          } animate-ping`}
          style={{
            animationDuration: '1s',
            animationIterationCount: '1'
          }}
        />
        <div 
          className={`absolute w-8 h-8 rounded-full ${
            theme === 'dark' 
              ? 'bg-solarized-blue/20' 
              : 'bg-solarized-yellow/20'
          } animate-ping`}
          style={{
            animationDuration: '1s',
            animationIterationCount: '1',
            animationDelay: '0.1s'
          }}
        />
        <div 
          className={`absolute w-16 h-16 rounded-full ${
            theme === 'dark' 
              ? 'bg-solarized-blue/10' 
              : 'bg-solarized-yellow/10'
          } animate-ping`}
          style={{
            animationDuration: '1s',
            animationIterationCount: '1',
            animationDelay: '0.2s'
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-1 h-1 rounded-full ${
            theme === 'dark'
              ? 'bg-solarized-cyan'
              : 'bg-solarized-orange'
          } opacity-70`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float 1s ease-out forwards`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}

      {/* Overlay gradient sweep */}
      <div 
        className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-transparent via-solarized-base03/10 to-transparent'
            : 'bg-gradient-to-r from-transparent via-solarized-base3/10 to-transparent'
        } translate-x-[-100%] animate-sweep`}
      />

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20px) scale(1);
            opacity: 0;
          }
        }

        @keyframes sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-sweep {
          animation: sweep 0.8s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default ThemeTransition