import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://admin.alamin.rocks'),
  title: 'Alamin Rocks - Admin Dashboard',
  description: 'Admin dashboard for managing alamin.rocks content - Modern interface with clean design',
  keywords: 'Admin, Dashboard, Content Management, DevOps, Portfolio',
  authors: [{ name: 'Alamin Mahamud', url: 'https://alamin.rocks' }],
  creator: 'Alamin Mahamud',
  publisher: 'Alamin Mahamud',
  robots: 'noindex, nofollow',
}

// Performance monitoring component
const PerformanceMonitor = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Admin dashboard performance monitoring enabled')
  }
  return null
}

const LoadingSkeleton = () => (
  <div className="animate-pulse min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-8">
      <div className="h-16 bg-muted rounded w-96 mx-auto"></div>
      <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
      <div className="flex justify-center space-x-4">
        <div className="h-12 bg-muted rounded w-32"></div>
        <div className="h-12 bg-muted rounded w-32"></div>
      </div>
    </div>
  </div>
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        
        {/* Viewport and theme color */}
        <meta name="theme-color" content="#002b36" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Resource hints for critical resources */}
        <link 
          rel="preload" 
          href="/fonts/geist.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <PerformanceMonitor />
        </ThemeProvider>
      </body>
    </html>
  )
}