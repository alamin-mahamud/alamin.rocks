import type { Metadata } from "next"
import "./globals.css"
import { Suspense } from "react"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { AccessibilityProvider } from "@/contexts/AccessibilityContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import FloatingThemeToggle from "@/components/FloatingThemeToggle"
import ThemeTransition from "@/components/ThemeTransition"
import AccessibilityPanel from "@/components/AccessibilityPanel"
import SkipNavigation from "@/components/SkipNavigation"
import AccessibilityTester from "@/components/AccessibilityTester"
import LanguageWrapper from "@/components/LanguageWrapper"

export const metadata: Metadata = {
  metadataBase: new URL('https://alamin.rocks'),
  title: "Alamin Mahamud - Senior DevOps Engineer & AI Products Engineer",
  description: "Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams. Proven track record of saving over $1M in cloud costs and contributing to SaaS ARR of $20M+.",
  keywords: "DevOps, SRE, AI, Cloud, AWS, Kubernetes, Python, TypeScript, Infrastructure",
  authors: [{ name: "Alamin Mahamud", url: "https://alamin.rocks" }],
  creator: "Alamin Mahamud",
  publisher: "Alamin Mahamud",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alamin.rocks",
    title: "Alamin Mahamud - Senior DevOps Engineer & AI Products Engineer",
    description: "Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.",
    siteName: "Alamin Mahamud Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alamin Mahamud - Senior DevOps Engineer & AI Products Engineer",
    description: "Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.",
  },
}

// Performance monitoring component
const PerformanceMonitor = () => {
  if (typeof window !== 'undefined' && process.env.ENABLE_PERFORMANCE_TRACKING === 'true') {
    import('@/utils/performance').then(({ initPerformanceTracking }) => {
      initPerformanceTracking()
    })
  }
  return null
}

const HeroSkeleton = () => (
  <div className="animate-pulse min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-8">
      <div className="h-16 bg-solarized-base02 rounded w-96 mx-auto"></div>
      <div className="h-8 bg-solarized-base02 rounded w-64 mx-auto"></div>
      <div className="flex justify-center space-x-4">
        <div className="h-12 bg-solarized-base02 rounded w-32"></div>
        <div className="h-12 bg-solarized-base02 rounded w-32"></div>
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
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://api.github.com" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        
        {/* Viewport and theme color */}
        <meta name="theme-color" content="#002b36" />
        <meta name="color-scheme" content="light" />
        
        {/* Resource hints for critical resources */}
        <link 
          rel="preload" 
          href="/fonts/jetbrains-mono.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AccessibilityProvider>
            <LanguageProvider>
              <LanguageWrapper>
                <SkipNavigation />
                <Suspense fallback={<HeroSkeleton />}>
                  {children}
                </Suspense>
                <FloatingThemeToggle />
                <AccessibilityPanel />
                <AccessibilityTester />
                <ThemeTransition />
                <PerformanceMonitor />
              </LanguageWrapper>
            </LanguageProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
