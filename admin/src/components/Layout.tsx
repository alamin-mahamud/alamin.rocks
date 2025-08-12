'use client'

import { ReactNode, Suspense } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'

interface LayoutProps {
  children: ReactNode
}

const MainSkeleton = () => (
  <div className="animate-pulse p-6 space-y-6">
    <div className="h-8 bg-muted rounded w-64"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="h-32 bg-muted rounded"></div>
      <div className="h-32 bg-muted rounded"></div>
      <div className="h-32 bg-muted rounded"></div>
    </div>
    <div className="h-64 bg-muted rounded"></div>
  </div>
)

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background theme-transition">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<MainSkeleton />}>
            <div className="p-6 space-y-6">
              {children}
            </div>
          </Suspense>
        </main>
      </div>
    </div>
  )
}