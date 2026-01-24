'use client';

import { cn } from '@/lib/utils';

interface GradientBlobProps {
  className?: string;
  colors?: [string, string];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  animate?: boolean;
  blur?: number;
  opacity?: number;
}

const sizeClasses = {
  sm: 'w-48 h-48 md:w-64 md:h-64',
  md: 'w-72 h-72 md:w-96 md:h-96',
  lg: 'w-96 h-96 md:w-[32rem] md:h-[32rem]',
  xl: 'w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem]'
};

const positionClasses = {
  'top-left': '-top-24 -left-24',
  'top-right': '-top-24 -right-24',
  'bottom-left': '-bottom-24 -left-24',
  'bottom-right': '-bottom-24 -right-24',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
};

export function GradientBlob({
  className,
  colors = ['hsl(var(--accent))', 'hsl(var(--info))'],
  size = 'md',
  position = 'top-right',
  animate = true,
  blur = 60,
  opacity = 0.2
}: GradientBlobProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none",
        sizeClasses[size],
        positionClasses[position],
        animate && "animate-blob",
        className
      )}
      aria-hidden="true"
      style={{
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
        filter: `blur(${blur}px)`,
        opacity
      }}
    />
  );
}

export function GradientOrb({
  className,
  color = 'hsl(var(--accent))',
  size = 200,
  blur = 80,
  opacity = 0.15,
  animate = true
}: {
  className?: string;
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
  animate?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none",
        animate && "animate-float",
        className
      )}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity
      }}
    />
  );
}

export function MultiBlob({
  className
}: {
  className?: string
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} aria-hidden="true">
      <GradientBlob
        position="top-left"
        size="lg"
        colors={['hsl(var(--accent))', 'hsl(250 100% 70%)']}
        opacity={0.15}
        className="animation-delay-0"
      />
      <GradientBlob
        position="top-right"
        size="md"
        colors={['hsl(var(--info))', 'hsl(200 100% 60%)']}
        opacity={0.12}
        className="animation-delay-2000"
      />
      <GradientBlob
        position="bottom-right"
        size="lg"
        colors={['hsl(var(--success))', 'hsl(160 70% 50%)']}
        opacity={0.1}
        className="animation-delay-4000"
      />
    </div>
  );
}
