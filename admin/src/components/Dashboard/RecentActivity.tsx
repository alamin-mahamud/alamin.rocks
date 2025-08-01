import { Card } from '@/components/ui/Card'
import { MessageSquare, FolderOpen, FileText, Clock } from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'message' | 'project' | 'resume'
  title: string
  description: string
  timestamp: string
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'message',
    title: 'New contact message',
    description: 'From john.doe@example.com',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'project',
    title: 'Project updated',
    description: 'E-commerce Platform project modified',
    timestamp: '1 day ago'
  },
  {
    id: '3',
    type: 'resume',
    title: 'Resume updated',
    description: 'Added new certification',
    timestamp: '3 days ago'
  }
]

const getIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'message':
      return MessageSquare
    case 'project':
      return FolderOpen
    case 'resume':
      return FileText
    default:
      return Clock
  }
}

export function RecentActivity() {
  return (
    <Card title="Recent Activity">
      <div className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = getIcon(activity.type)
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}