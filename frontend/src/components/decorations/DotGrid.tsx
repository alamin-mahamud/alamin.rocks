'use client';

import { cn } from '@/lib/utils';

interface DotGridProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  spacing?: number;
  opacity?: number;
  fade?: 'none' | 'edges' | 'radial' | 'bottom';
}

export function DotGrid({
  className,
  dotColor = 'currentColor',
  dotSize = 1,
  spacing = 24,
  opacity = 0.15,
  fade = 'radial'
}: DotGridProps) {
  const fadeGradient = {
    none: '',
    edges: 'linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%)',
    radial: 'radial-gradient(ellipse at center, white 0%, white 50%, transparent 80%)',
    bottom: 'linear-gradient(to bottom, white 0%, white 60%, transparent 100%)'
  };

  return (
    <div
      className={cn("decoration-dots", className)}
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        opacity,
        ...(fade !== 'none' && {
          maskImage: fadeGradient[fade],
          WebkitMaskImage: fadeGradient[fade]
        })
      }}
    />
  );
}

export function GridPattern({
  className,
  lineColor = 'currentColor',
  size = 40,
  opacity = 0.05
}: {
  className?: string;
  lineColor?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${lineColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        maskImage: 'radial-gradient(ellipse at center, white 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, white 0%, transparent 70%)'
      }}
    />
  );
}
