import { Card } from '@/components/ui/Card'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  color?: 'default' | 'success' | 'warning' | 'danger'
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  color = 'default' 
}: StatsCardProps) {
  const colorClasses = {
    default: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-destructive/10 text-destructive'
  }

  return (
    <Card className="relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground mt-2 mb-1">
            {value}
          </p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {trend.value > 0 ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={`text-sm font-semibold ${
                trend.value > 0 ? 'text-success' : 'text-destructive'
              }`}>
                {trend.value > 0 ? '+' : ''}{trend.value}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {trend.label}
            </span>
          </div>
        </div>
      )}
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/[0.02] pointer-events-none" />
    </Card>
  )
}