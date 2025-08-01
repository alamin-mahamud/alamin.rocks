'use client'

import { AuthWrapper } from '@/components/AuthWrapper'
import { Layout } from '@/components/Layout'
import { StatsCard } from '@/components/Dashboard/StatsCard'
import { RecentActivity } from '@/components/Dashboard/RecentActivity'
import { MessageSquare, FolderOpen, FileText, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  return (
    <AuthWrapper>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your content.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Messages"
              value="24"
              description="Unread: 3"
              icon={MessageSquare}
              trend={{ value: 12, label: 'from last month' }}
            />
            <StatsCard
              title="Projects"
              value="12"
              description="Featured: 4"
              icon={FolderOpen}
              trend={{ value: 8, label: 'from last month' }}
            />
            <StatsCard
              title="Resume Views"
              value="1,234"
              description="This month"
              icon={FileText}
              trend={{ value: 23, label: 'from last month' }}
            />
            <StatsCard
              title="Portfolio Visits"
              value="5,678"
              description="This month"
              icon={TrendingUp}
              trend={{ value: 15, label: 'from last month' }}
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity />
            
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="admin-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="admin-button-primary text-center">
                    Add Project
                  </button>
                  <button className="admin-button-secondary text-center">
                    Update Resume
                  </button>
                  <button className="admin-button-secondary text-center">
                    View Messages
                  </button>
                  <button className="admin-button-secondary text-center">
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </AuthWrapper>
  )
}