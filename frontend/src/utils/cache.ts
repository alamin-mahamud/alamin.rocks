// Client-side caching utilities

interface CacheItem<T> {
  data: T
  timestamp: number
  expiry: number
}

class LocalCache {
  private cache = new Map<string, CacheItem<any>>()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL)
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return false
    }
    
    return true
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  cleanup(): void {
    const now = Date.now()
    const entries = Array.from(this.cache.entries())
    for (const [key, item] of entries) {
      if (now > item.expiry) {
        this.cache.delete(key)
      }
    }
  }

  size(): number {
    return this.cache.size
  }
}

// Singleton instance
export const cache = new LocalCache()

// Auto cleanup every 5 minutes
setInterval(() => {
  cache.cleanup()
}, 5 * 60 * 1000)

// Cache with async data fetching
export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Try to get from cache first
  const cached = cache.get<T>(key)
  if (cached !== null) {
    return cached
  }

  // Fetch fresh data
  try {
    const data = await fetcher()
    cache.set(key, data, ttl)
    return data
  } catch (error) {
    // If we have stale data, return it
    const stale = cache.get<T>(`${key}_stale`)
    if (stale !== null) {
      return stale
    }
    throw error
  }
}

// Browser storage cache for persistence
export class PersistentCache {
  private prefix: string

  constructor(prefix = 'alamin_portfolio_') {
    this.prefix = prefix
  }

  private getStorageKey(key: string): string {
    return `${this.prefix}${key}`
  }

  set<T>(key: string, data: T, ttl?: number): void {
    if (typeof window === 'undefined') return

    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + (ttl || 24 * 60 * 60 * 1000) // Default 24 hours
      }
      
      localStorage.setItem(this.getStorageKey(key), JSON.stringify(item))
    } catch (error) {
      console.warn('Failed to set persistent cache:', error)
    }
  }

  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null

    try {
      const stored = localStorage.getItem(this.getStorageKey(key))
      if (!stored) return null

      const item: CacheItem<T> = JSON.parse(stored)
      
      if (Date.now() > item.expiry) {
        this.delete(key)
        return null
      }

      return item.data
    } catch (error) {
      console.warn('Failed to get persistent cache:', error)
      return null
    }
  }

  delete(key: string): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.removeItem(this.getStorageKey(key))
    } catch (error) {
      console.warn('Failed to delete persistent cache:', error)
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return

    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.warn('Failed to clear persistent cache:', error)
    }
  }
}

export const persistentCache = new PersistentCache()

// Hook for cached API calls
import { useState, useEffect } from 'react'

export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number
    persistent?: boolean
    staleWhileRevalidate?: boolean
  } = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { ttl, persistent = false, staleWhileRevalidate = true } = options
  const cacheInstance = persistent ? persistentCache : cache

  useEffect(() => {
    let mounted = true

    const loadData = async () => {
      try {
        // Try to get from cache first
        const cached = cacheInstance.get<T>(key)
        
        if (cached !== null) {
          setData(cached)
          setLoading(false)
          
          if (!staleWhileRevalidate) {
            return
          }
        }

        // Fetch fresh data
        const freshData = await fetcher()
        
        if (mounted) {
          setData(freshData)
          setError(null)
          cacheInstance.set(key, freshData, ttl)
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error)
          // If we don't have cached data, set loading to false
          if (data === null) {
            setLoading(false)
          }
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [key, ttl, persistent, staleWhileRevalidate, cacheInstance, fetcher, data])

  const refetch = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const freshData = await fetcher()
      setData(freshData)
      cacheInstance.set(key, freshData, ttl)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    refetch
  }
}