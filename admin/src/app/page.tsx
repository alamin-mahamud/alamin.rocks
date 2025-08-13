'use client'

import { useState, useEffect } from 'react'
import { AuthWrapper } from '@/components/AuthWrapper'
import { Layout } from '@/components/Layout'
import { StatsCard } from '@/components/Dashboard/StatsCard'
import { RecentActivity } from '@/components/Dashboard/RecentActivity'
import { MessageSquare, FolderOpen, FileText, TrendingUp } from 'lucide-react'
import { portfolioApi, contactApi, resumeApi } from '@/lib/api'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    totalProjects: 0,
    featuredProjects: 0,
    resumeViews: 1234,
    portfolioVisits: 5678
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard statistics
        const [projectsResponse, contactStatsResponse] = await Promise.allSettled([
          portfolioApi.getProjects(),
          contactApi.getStats()
        ])

        // Extract data from responses
        const projects = projectsResponse.status === 'fulfilled' ? projectsResponse.value.data || [] : []
        const contactStats = contactStatsResponse.status === 'fulfilled' ? contactStatsResponse.value.data : { total: 0, unread: 0 }
        
        setStats({
          totalMessages: contactStats.total || 0,
          unreadMessages: contactStats.unread || 0,
          totalProjects: projects.length,
          featuredProjects: projects.filter((p: any) => p.featured).length,
          resumeViews: 1234, // Mock data for now
          portfolioVisits: 5678 // Mock data for now
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        // Keep default values on error
        setStats({
          totalMessages: 0,
          unreadMessages: 0,
          totalProjects: 0,
          featuredProjects: 0,
          resumeViews: 1234,
          portfolioVisits: 5678
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <AuthWrapper>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your content.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Messages"
              value={loading ? "..." : stats.totalMessages.toString()}
              description={`Unread: ${stats.unreadMessages}`}
              icon={MessageSquare}
              trend={{ value: 12, label: 'from last month' }}
            />
            <StatsCard
              title="Projects"
              value={loading ? "..." : stats.totalProjects.toString()}
              description={`Featured: ${stats.featuredProjects}`}
              icon={FolderOpen}
              trend={{ value: 8, label: 'from last month' }}
            />
            <StatsCard
              title="Resume Views"
              value={loading ? "..." : stats.resumeViews.toLocaleString()}
              description="This month"
              icon={FileText}
              trend={{ value: 23, label: 'from last month' }}
            />
            <StatsCard
              title="Portfolio Visits"
              value={loading ? "..." : stats.portfolioVisits.toLocaleString()}
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