'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        setLoading(false)
        router.push('/login')
        return
      }

      try {
        await authApi.verify(token)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Auth verification failed:', error)
        localStorage.removeItem('admin_token')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
  }, [router])

  const logout = async () => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      try {
        await authApi.logout(token)
      } catch (error) {
        console.error('Logout API call failed:', error)
      }
    }
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    router.push('/login')
  }

  return { isAuthenticated, loading, logout }
}