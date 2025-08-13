'use client'

import { useState, useEffect } from 'react'
import { AuthWrapper } from '@/components/AuthWrapper'
import { Layout } from '@/components/Layout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { Eye, Mail, Trash2, Filter, RefreshCw } from 'lucide-react'
import { ContactMessage } from '@/types'
import { contactApi } from '@/lib/api'
import { format } from 'date-fns'

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const response = await contactApi.getMessages()
      setMessages(response.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true
    return message.status === filter
  })

  const handleMarkAsRead = async (messageId: string) => {
    try {
      setUpdating(messageId)
      await contactApi.markAsRead(messageId)
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, status: 'read' } : msg
        )
      )
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: 'read' })
      }
    } catch (error) {
      console.error('Error marking message as read:', error)
    } finally {
      setUpdating(null)
    }
  }

  const handleMarkAsReplied = async (messageId: string) => {
    try {
      setUpdating(messageId)
      await contactApi.markAsReplied(messageId)
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, status: 'replied' } : msg
        )
      )
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: 'replied' })
      }
    } catch (error) {
      console.error('Error marking message as replied:', error)
    } finally {
      setUpdating(null)
    }
  }

  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return
    }
    
    try {
      setUpdating(messageId)
      await contactApi.deleteMessage(messageId)
      setMessages(prev => prev.filter(msg => msg.id !== messageId))
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    } finally {
      setUpdating(null)
    }
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
              <Button
                variant="secondary"
                onClick={fetchMessages}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="admin-input py-1"
                >
                  <option value="all">All Messages ({messages.length})</option>
                  <option value="unread">Unread ({messages.filter(m => m.status === 'unread').length})</option>
                  <option value="read">Read ({messages.filter(m => m.status === 'read').length})</option>
                  <option value="replied">Replied ({messages.filter(m => m.status === 'replied').length})</option>
                </select>
              </div>
            </div>
          </div>

          <Card>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                <span>Loading messages...</span>
              </div>
            ) : (
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
                  {filteredMessages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        {filter === 'all' ? 'No messages found' : `No ${filter} messages`}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMessages.map((message) => (
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
                              title="View message"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(message.id)}
                              disabled={message.status !== 'unread' || updating === message.id}
                              title="Mark as read"
                            >
                              {updating === message.id ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Mail className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(message.id)}
                              disabled={updating === message.id}
                              title="Delete message"
                            >
                              {updating === message.id ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
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
                      {selectedMessage.status === 'unread' && (
                        <Button
                          variant="secondary"
                          onClick={() => handleMarkAsRead(selectedMessage.id)}
                          disabled={updating === selectedMessage.id}
                        >
                          {updating === selectedMessage.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="primary"
                        onClick={() => {
                          window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)
                          if (selectedMessage.status !== 'replied') {
                            handleMarkAsReplied(selectedMessage.id)
                          }
                        }}
                      >
                        Reply via Email
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(selectedMessage.id)}
                        disabled={updating === selectedMessage.id}
                      >
                        {updating === selectedMessage.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Delete
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