'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  hasAnimated: boolean;
}

export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  delay = 0
}: UseScrollAnimationOptions = {}): UseScrollAnimationReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }

          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { ref, isVisible, hasAnimated };
}

interface UseStaggerAnimationOptions {
  staggerDelay?: number;
  baseDelay?: number;
  threshold?: number;
}

export function useStaggerAnimation({
  staggerDelay = 100,
  baseDelay = 0,
  threshold = 0.1
}: UseStaggerAnimationOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = container.children;
          Array.from(children).forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set(prev).add(index));
            }, baseDelay + index * staggerDelay);
          });
          observer.unobserve(container);
        }
      },
      { threshold }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [staggerDelay, baseDelay, threshold]);

  const isItemVisible = useCallback(
    (index: number) => visibleItems.has(index),
    [visibleItems]
  );

  return { containerRef, isItemVisible, visibleItems };
}

// Animation class utilities
export const animationClasses = {
  fadeInUp: 'opacity-0 translate-y-5 transition-all duration-500 ease-out',
  fadeInUpVisible: 'opacity-100 translate-y-0',

  fadeIn: 'opacity-0 transition-opacity duration-500 ease-out',
  fadeInVisible: 'opacity-100',

  scaleIn: 'opacity-0 scale-95 transition-all duration-500 ease-out',
  scaleInVisible: 'opacity-100 scale-100',

  slideInLeft: 'opacity-0 -translate-x-5 transition-all duration-500 ease-out',
  slideInLeftVisible: 'opacity-100 translate-x-0',

  slideInRight: 'opacity-0 translate-x-5 transition-all duration-500 ease-out',
  slideInRightVisible: 'opacity-100 translate-x-0',
};

export function getAnimationClass(
  type: keyof typeof animationClasses,
  isVisible: boolean
): string {
  const baseType = type.replace('Visible', '') as keyof typeof animationClasses;
  const visibleType = `${baseType}Visible` as keyof typeof animationClasses;

  return isVisible
    ? `${animationClasses[baseType]} ${animationClasses[visibleType]}`
    : animationClasses[baseType];
}
