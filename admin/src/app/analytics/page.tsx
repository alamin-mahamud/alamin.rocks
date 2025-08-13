'use client'

import { useState, useEffect } from 'react'
import { AuthWrapper } from '@/components/AuthWrapper'
import { Layout } from '@/components/Layout'
import { analyticsApi } from '@/lib/api'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  FolderOpen, 
  TrendingUp,
  Calendar,
  Eye,
  Clock,
  Target,
  Award
} from 'lucide-react'

interface AnalyticsOverview {
  total_messages: number
  read_messages: number
  replied_messages: number
  recent_messages: number
  total_projects: number
  featured_projects: number
  project_categories: number
  total_skills: number
  skill_categories: number
  avg_skill_proficiency: number
  total_experiences: number
  current_positions: number
}

interface TrafficData {
  daily_traffic: Array<{
    date: string
    page_views: number
    unique_visitors: number
    bounce_rate: number
  }>
  total_page_views: number
  total_unique_visitors: number
  avg_bounce_rate: number
}

interface MessageAnalytics {
  messages_by_day: Array<{
    date: string
    total: number
    read: number
    replied: number
  }>
  categories: Array<{
    category: string
    count: number
  }>
  response_rate: number
}

interface ProjectAnalytics {
  categories: Array<{
    category: string
    total: number
    featured: number
  }>
  technologies: Array<{
    technology: string
    count: number
  }>
  projects_by_year: Array<{
    year: number
    count: number
  }>
  total_projects: number
  total_featured: number
}

interface SkillsAnalytics {
  categories: Array<{
    category: string
    count: number
    avg_proficiency: number
  }>
  top_skills: Array<{
    name: string
    proficiency: number
    category: string
  }>
  total_skills: number
  avg_proficiency: number
}

export default function AnalyticsPage() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null)
  const [traffic, setTraffic] = useState<TrafficData | null>(null)
  const [messageAnalytics, setMessageAnalytics] = useState<MessageAnalytics | null>(null)
  const [projectAnalytics, setProjectAnalytics] = useState<ProjectAnalytics | null>(null)
  const [skillsAnalytics, setSkillsAnalytics] = useState<SkillsAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState(30)

  useEffect(() => {
    loadAnalyticsData()
  }, [selectedPeriod]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      const [overviewRes, trafficRes, messagesRes, projectsRes, skillsRes] = await Promise.all([
        analyticsApi.getOverview(selectedPeriod),
        analyticsApi.getTraffic(7), // Always show 7 days for traffic
        analyticsApi.getMessages(selectedPeriod),
        analyticsApi.getProjects(),
        analyticsApi.getSkills()
      ])

      setOverview(overviewRes.data.overview)
      setTraffic(trafficRes.data)
      setMessageAnalytics(messagesRes.data)
      setProjectAnalytics(projectsRes.data)
      setSkillsAnalytics(skillsRes.data)
    } catch (err) {
      setError('Failed to load analytics data')
      console.error('Analytics error:', err)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color = 'accent' 
  }: { 
    title: string
    value: string | number
    change?: string
    icon: any
    color?: string
  }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↗ {change}</span> from last period
            </p>
          )}
        </div>
        <div className={`h-12 w-12 rounded-full bg-${color}/10 flex items-center justify-center`}>
          <Icon className={`h-6 w-6 text-${color}`} />
        </div>
      </div>
    </Card>
  )

  if (loading) {
    return (
      <AuthWrapper>
        <Layout>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading analytics...</p>
            </div>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }

  if (error) {
    return (
      <AuthWrapper>
        <Layout>
          <div className="flex items-center justify-center py-12">
            <Card className="p-8 max-w-md text-center">
              <h2 className="text-xl font-bold text-destructive mb-4">Error</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={loadAnalyticsData} variant="secondary">Retry</Button>
            </Card>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }

  return (
    <AuthWrapper>
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Monitor your portfolio performance and engagement</p>
            </div>
            <div className="flex gap-2">
              {[7, 30, 90].map((days) => (
                <Button
                  key={days}
                  variant={selectedPeriod === days ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedPeriod(days)}
                >
                  {days}d
                </Button>
              ))}
            </div>
          </div>

          {/* Overview Stats */}
          {overview && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Messages"
                value={overview.total_messages}
                change="+12%"
                icon={MessageSquare}
                color="blue"
              />
              <StatCard
                title="Response Rate"
                value={`${Math.round((overview.replied_messages / Math.max(overview.total_messages, 1)) * 100)}%`}
                change="+5%"
                icon={TrendingUp}
                color="green"
              />
              <StatCard
                title="Total Projects"
                value={overview.total_projects}
                change="+3"
                icon={FolderOpen}
                color="purple"
              />
              <StatCard
                title="Avg. Skill Level"
                value={`${Math.round(overview.avg_skill_proficiency)}%`}
                change="+2%"
                icon={Award}
                color="orange"
              />
            </div>
          )}

          {/* Traffic Analytics */}
          {traffic && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Eye className="mr-2 h-5 w-5" />
                  Traffic Overview (7 days)
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Page Views</p>
                      <p className="text-2xl font-bold text-foreground">{traffic.total_page_views}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Unique Visitors</p>
                      <p className="text-2xl font-bold text-foreground">{traffic.total_unique_visitors}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bounce Rate</p>
                      <p className="text-2xl font-bold text-foreground">{Math.round(traffic.avg_bounce_rate)}%</p>
                    </div>
                  </div>
                  
                  {/* Simple traffic chart */}
                  <div className="mt-6">
                    <div className="space-y-2">
                      {traffic.daily_traffic.slice(0, 7).map((day) => (
                        <div key={day.date} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{new Date(day.date).toLocaleDateString()}</span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <div 
                                className="h-2 bg-blue-500 rounded mr-2"
                                style={{ width: `${(day.page_views / Math.max(...traffic.daily_traffic.map(d => d.page_views))) * 60}px` }}
                              />
                              <span className="text-sm">{day.page_views}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Message Analytics */}
              {messageAnalytics && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Message Categories
                  </h3>
                  <div className="space-y-3">
                    {messageAnalytics.categories.slice(0, 8).map((category) => (
                      <div key={category.category} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground truncate">{category.category}</span>
                        <div className="flex items-center">
                          <div 
                            className="h-2 bg-accent rounded mr-2"
                            style={{ width: `${(category.count / Math.max(...messageAnalytics.categories.map(c => c.count))) * 40}px` }}
                          />
                          <span className="text-sm font-medium">{category.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Projects Analytics */}
          {projectAnalytics && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <FolderOpen className="mr-2 h-5 w-5" />
                  Projects by Category
                </h3>
                <div className="space-y-3">
                  {projectAnalytics.categories.map((category) => (
                    <div key={category.category} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{category.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{category.total} total</span>
                        <span className="text-xs text-accent">({category.featured} featured)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Top Technologies
                </h3>
                <div className="space-y-3">
                  {projectAnalytics.technologies.slice(0, 10).map((tech) => (
                    <div key={tech.technology} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{tech.technology}</span>
                      <div className="flex items-center">
                        <div 
                          className="h-2 bg-green-500 rounded mr-2"
                          style={{ width: `${(tech.count / Math.max(...projectAnalytics.technologies.map(t => t.count))) * 40}px` }}
                        />
                        <span className="text-sm font-medium">{tech.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Skills Analytics */}
          {skillsAnalytics && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Skills Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Categories</h4>
                  <div className="space-y-3">
                    {skillsAnalytics.categories.map((category) => (
                      <div key={category.category} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{category.category}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium">{category.count} skills</div>
                          <div className="text-xs text-muted-foreground">avg: {Math.round(category.avg_proficiency)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Top Skills</h4>
                  <div className="space-y-3">
                    {skillsAnalytics.top_skills.slice(0, 6).map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-foreground">{skill.name}</div>
                          <div className="text-xs text-muted-foreground">{skill.category}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-16 bg-border rounded-full h-2 mr-2">
                            <div
                              className="bg-accent h-2 rounded-full"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{skill.proficiency}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Layout>
    </AuthWrapper>
  )
}