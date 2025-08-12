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
  Activity,
  BarChart3
} from 'lucide-react'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, badge: null },
  { name: 'Messages', href: '/messages', icon: MessageSquare, badge: '12' },
  { name: 'Projects', href: '/projects', icon: FolderOpen, badge: null },
  { name: 'Resume', href: '/resume', icon: FileText, badge: null },
  { name: 'Translations', href: '/translations', icon: Languages, badge: '2' },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, badge: null },
  { name: 'Settings', href: '/settings', icon: Settings, badge: null },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-card border-r border-border theme-transition">
      {/* Brand Header */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
            <Activity className="h-4 w-4 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Alamin.rocks</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/70 hover:translate-x-1'
              )}
            >
              <div className="flex items-center">
                <item.icon className={clsx(
                  'mr-3 h-4 w-4 transition-colors',
                  isActive ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-foreground'
                )} />
                {item.name}
              </div>
              {item.badge && (
                <span className={clsx(
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  isActive 
                    ? 'bg-accent-foreground/20 text-accent-foreground'
                    : 'bg-accent text-accent-foreground'
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Storage Used</span>
            <span>68%</span>
          </div>
          <div className="w-full bg-border rounded-full h-1.5">
            <div className="bg-accent h-1.5 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>
        
        <button
          className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group"
          onClick={() => {
            localStorage.removeItem('admin_token')
            window.location.href = '/login'
          }}
        >
          <LogOut className="mr-3 h-4 w-4 group-hover:text-destructive" />
          Logout
        </button>
      </div>
    </div>
  )
}