'use client';

import { cn } from '@/lib/utils';

interface WavePatternProps {
  className?: string;
  variant?: 'top' | 'bottom' | 'both';
  color?: string;
  opacity?: number;
}

export function WavePattern({
  className,
  variant = 'bottom',
  color = 'currentColor',
  opacity = 0.05
}: WavePatternProps) {
  const topWave = (
    <svg
      className="absolute top-0 left-0 w-full h-24 md:h-32 lg:h-40"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 85C672 90 768 90 864 80C960 70 1056 50 1152 45C1248 40 1344 50 1392 55L1440 60V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V120Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );

  const bottomWave = (
    <svg
      className="absolute bottom-0 left-0 w-full h-24 md:h-32 lg:h-40"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0L48 10C96 20 192 40 288 45C384 50 480 40 576 35C672 30 768 30 864 40C960 50 1056 70 1152 75C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );

  return (
    <div className={cn("decoration-container", className)} aria-hidden="true">
      {(variant === 'top' || variant === 'both') && topWave}
      {(variant === 'bottom' || variant === 'both') && bottomWave}
    </div>
  );
}

export function WaveDivider({
  className,
  flip = false,
  color = 'hsl(var(--muted))'
}: {
  className?: string;
  flip?: boolean;
  color?: string;
}) {
  return (
    <div className={cn("w-full overflow-hidden", flip && "rotate-180", className)} aria-hidden="true">
      <svg
        className="w-full h-16 md:h-20 lg:h-24"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 80L60 68.3C120 56.7 240 33.3 360 26.7C480 20 600 30 720 38.3C840 46.7 960 53.3 1080 51.7C1200 50 1320 40 1380 35L1440 30V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
