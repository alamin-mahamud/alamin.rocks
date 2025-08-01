'use client'

import { AuthWrapper } from '@/components/AuthWrapper'
import { Layout } from '@/components/Layout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Settings, User, Bell, Shield, Database } from 'lucide-react'

export default function SettingsPage() {
  return (
    <AuthWrapper>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your admin dashboard preferences</p>
          </div>

          {/* Profile Settings */}
          <Card>
            <div className="flex items-center space-x-2 mb-4">
              <User className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Profile Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Admin Name" defaultValue="Admin User" />
              <Input label="Email" type="email" defaultValue="admin@alamin.rocks" />
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
            </div>
            
            <div className="flex justify-end mt-4">
              <Button>Update Profile</Button>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card>
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email alerts for new messages</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Project Updates</p>
                  <p className="text-sm text-muted-foreground">Get notified when projects are viewed</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">Receive weekly analytics reports</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Security</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="secondary" size="sm">Setup</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Session Timeout</p>
                  <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                </div>
                <select className="admin-input w-32">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>Never</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Data Management */}
          <Card>
            <div className="flex items-center space-x-2 mb-4">
              <Database className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Export Data</p>
                  <p className="text-sm text-muted-foreground">Download all your data as JSON</p>
                </div>
                <Button variant="secondary" size="sm">Export</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Clear Cache</p>
                  <p className="text-sm text-muted-foreground">Clear cached data and refresh</p>
                </div>
                <Button variant="secondary" size="sm">Clear</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-destructive">Delete All Data</p>
                  <p className="text-sm text-muted-foreground">Permanently delete all content</p>
                </div>
                <Button variant="danger" size="sm">Delete</Button>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </AuthWrapper>
  )
}