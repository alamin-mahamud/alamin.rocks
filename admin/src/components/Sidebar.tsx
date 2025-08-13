'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  MessageSquare, 
  FolderOpen, 
  FileText, 
  Settings,
  Languages,
  LogOut,
  BarChart3,
  ChevronRight
} from 'lucide-react'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, badge: null },
  { name: 'Messages', href: '/messages', icon: MessageSquare, badge: 12 },
  { name: 'Projects', href: '/projects', icon: FolderOpen, badge: null },
  { name: 'Resume', href: '/resume', icon: FileText, badge: null },
  { name: 'Translations', href: '/translations', icon: Languages, badge: 2 },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, badge: null },
  { name: 'Settings', href: '/settings', icon: Settings, badge: null },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-background border-r border-border">
      {/* Brand Header - Vercel Style */}
      <div className="h-14 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center space-x-2 text-foreground hover:opacity-80 transition-opacity">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 19.5h20L12 2z"/>
          </svg>
          <span className="font-semibold text-sm">Admin</span>
        </Link>
      </div>
      
      {/* Navigation - Vercel Style */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors group relative',
                isActive
                  ? 'bg-muted text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <div className="flex items-center">
                <item.icon className={clsx(
                  'mr-3 h-4 w-4 flex-shrink-0',
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                )} />
                <span>{item.name}</span>
              </div>
              <div className="flex items-center">
                {item.badge && (
                  <span className={clsx(
                    'text-xs px-1.5 py-0.5 rounded font-medium mr-1',
                    isActive 
                      ? 'bg-foreground/10 text-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>
      
      {/* User Section - Vercel Style */}
      <div className="p-3 border-t border-border">
        <div className="p-3 rounded-md bg-muted/30 mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Usage</span>
            <span className="text-xs font-medium text-foreground">68%</span>
          </div>
          <div className="w-full bg-border rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-foreground rounded-full transition-all duration-300" 
              style={{ width: '68%' }}
            />
          </div>
        </div>
        
        <button
          className="flex items-center justify-between w-full px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-muted/50 hover:text-foreground transition-colors"
          onClick={() => {
            localStorage.removeItem('admin_token')
            window.location.href = '/login'
          }}
        >
          <div className="flex items-center">
            <LogOut className="mr-3 h-4 w-4" />
            <span>Sign Out</span>
          </div>
        </button>
      </div>
    </div>
  )
}