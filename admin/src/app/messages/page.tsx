'use client'

import { useState, useEffect } from 'react'
import { AuthWrapper } from '@/components/AuthWrapper'
import { Layout } from '@/components/Layout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { Eye, Mail, Trash2, Filter } from 'lucide-react'
import { ContactMessage } from '@/types'
import { format } from 'date-fns'

// Mock data - replace with actual API calls
const mockMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    subject: 'Project Inquiry',
    message: 'Hi, I would like to discuss a potential project collaboration...',
    created_at: '2024-01-15T10:30:00Z',
    status: 'unread'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    subject: 'Job Opportunity',
    message: 'We have an exciting opportunity at our company and would love to connect...',
    created_at: '2024-01-14T14:20:00Z',
    status: 'read'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@startup.io',
    subject: 'Technical Consultation',
    message: 'Looking for technical expertise on cloud architecture...',
    created_at: '2024-01-13T09:15:00Z',
    status: 'replied'
  }
]

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(mockMessages)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true
    return message.status === filter
  })

  const handleMarkAsRead = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      )
    )
  }

  const handleDelete = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId))
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      unread: 'bg-warning/10 text-warning border-warning/20',
      read: 'bg-info/10 text-info border-info/20',
      replied: 'bg-success/10 text-success border-success/20'
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-medium border rounded-full ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    )
  }

  return (
    <AuthWrapper>
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Contact Messages</h1>
              <p className="text-muted-foreground">Manage and respond to contact form submissions</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="admin-input py-1"
                >
                  <option value="all">All Messages</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.subject || 'No subject'}</TableCell>
                    <TableCell>{getStatusBadge(message.status)}</TableCell>
                    <TableCell>{format(new Date(message.created_at), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedMessage(message)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(message.id)}
                          disabled={message.status !== 'unread'}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(message.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Message Detail Modal */}
          {selectedMessage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Message Details</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedMessage(null)}
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Name</label>
                      <p className="text-foreground">{selectedMessage.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <p className="text-foreground">{selectedMessage.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground">Subject</label>
                    <p className="text-foreground">{selectedMessage.subject || 'No subject'}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground">Message</label>
                    <div className="mt-2 p-4 bg-muted rounded-md">
                      <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(selectedMessage.created_at), 'MMM dd, yyyy HH:mm')}
                      </span>
                      {getStatusBadge(selectedMessage.status)}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleMarkAsRead(selectedMessage.id)}
                      >
                        Mark as Read
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </Layout>
    </AuthWrapper>
  )
}