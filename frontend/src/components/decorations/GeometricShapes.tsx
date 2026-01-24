'use client';

import { cn } from '@/lib/utils';

interface FloatingCircleProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
  animate?: boolean;
  filled?: boolean;
  strokeWidth?: number;
}

export function FloatingCircle({
  className,
  size = 100,
  color = 'currentColor',
  opacity = 0.1,
  animate = true,
  filled = false,
  strokeWidth = 1
}: FloatingCircleProps) {
  return (
    <svg
      className={cn(
        "absolute pointer-events-none",
        animate && "animate-float",
        className
      )}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
    </svg>
  );
}

export function FloatingTriangle({
  className,
  size = 80,
  color = 'currentColor',
  opacity = 0.1,
  animate = true,
  filled = false,
  strokeWidth = 1,
  rotation = 0
}: FloatingCircleProps & { rotation?: number }) {
  return (
    <svg
      className={cn(
        "absolute pointer-events-none",
        animate && "animate-float-slow",
        className
      )}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <polygon
        points="50,10 90,90 10,90"
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
    </svg>
  );
}

export function FloatingSquare({
  className,
  size = 60,
  color = 'currentColor',
  opacity = 0.1,
  animate = true,
  filled = false,
  strokeWidth = 1,
  rotation = 0
}: FloatingCircleProps & { rotation?: number }) {
  return (
    <svg
      className={cn(
        "absolute pointer-events-none",
        animate && "animate-float-delayed",
        className
      )}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <rect
        x="15"
        y="15"
        width="70"
        height="70"
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={strokeWidth}
        opacity={opacity}
        rx="4"
      />
    </svg>
  );
}

export function CrossPattern({
  className,
  color = 'currentColor',
  opacity = 0.05,
  size = 20,
  spacing = 60
}: {
  className?: string;
  color?: string;
  opacity?: number;
  size?: number;
  spacing?: number;
}) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="cross-pattern"
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <line
              x1={spacing / 2 - size / 2}
              y1={spacing / 2}
              x2={spacing / 2 + size / 2}
              y2={spacing / 2}
              stroke={color}
              strokeWidth="1"
              opacity={opacity}
            />
            <line
              x1={spacing / 2}
              y1={spacing / 2 - size / 2}
              x2={spacing / 2}
              y2={spacing / 2 + size / 2}
              stroke={color}
              strokeWidth="1"
              opacity={opacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cross-pattern)" />
      </svg>
    </div>
  );
}

export function GeometricBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} aria-hidden="true">
      <FloatingCircle
        className="top-[10%] left-[5%]"
        size={120}
        opacity={0.08}
        color="hsl(var(--accent))"
      />
      <FloatingTriangle
        className="top-[20%] right-[10%]"
        size={80}
        opacity={0.06}
        rotation={15}
        color="hsl(var(--info))"
      />
      <FloatingSquare
        className="bottom-[30%] left-[15%]"
        size={60}
        opacity={0.05}
        rotation={45}
        color="hsl(var(--success))"
      />
      <FloatingCircle
        className="bottom-[15%] right-[20%]"
        size={90}
        opacity={0.07}
        filled
        color="hsl(var(--accent))"
      />
    </div>
  );
}
