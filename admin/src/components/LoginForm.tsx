'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simple authentication - in production, use proper auth
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('admin_token', 'mock-token')
        router.push('/')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground mt-2">
              Access the admin dashboard
            </p>
          </div>

          <div className="space-y-4">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            Sign In
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Demo credentials: admin / admin123
          </div>
        </form>
      </Card>
    </div>
  )
}