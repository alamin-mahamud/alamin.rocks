'use client'

import { useState, useEffect } from 'react'
import { AuthWrapper } from '@/components/AuthWrapper'
import { Layout } from '@/components/Layout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import {
  RefreshCw,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Target,
  Users,
  BookOpen,
  Clock,
  Heart,
  CheckCircle
} from 'lucide-react'
import { moeApi } from '@/lib/api'
import { MoESummary, Persona, Principle, ScheduleBlock, LifestyleGuideline } from '@/types/moe'

type TabType = 'overview' | 'personas' | 'principles' | 'schedule' | 'lifestyle'

export default function MoEPage() {
  const [summary, setSummary] = useState<MoESummary | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await moeApi.getSummary()
      setSummary(response.data)
    } catch (err) {
      console.error('Error fetching MoE data:', err)
      setError('Failed to load MoE data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePersona = async (id: number) => {
    if (!confirm('Are you sure you want to delete this persona?')) return
    try {
      setDeleting(id)
      await moeApi.deletePersona(id)
      fetchData()
    } catch (err) {
      console.error('Error deleting persona:', err)
      alert('Failed to delete persona')
    } finally {
      setDeleting(null)
    }
  }

  const handleDeletePrinciple = async (id: number) => {
    if (!confirm('Are you sure you want to delete this principle?')) return
    try {
      setDeleting(id)
      await moeApi.deletePrinciple(id)
      fetchData()
    } catch (err) {
      console.error('Error deleting principle:', err)
      alert('Failed to delete principle')
    } finally {
      setDeleting(null)
    }
  }

  const handleDeleteScheduleBlock = async (id: number) => {
    if (!confirm('Are you sure you want to delete this schedule block?')) return
    try {
      setDeleting(id)
      await moeApi.deleteScheduleBlock(id)
      fetchData()
    } catch (err) {
      console.error('Error deleting schedule block:', err)
      alert('Failed to delete schedule block')
    } finally {
      setDeleting(null)
    }
  }

  const handleDeleteGuideline = async (id: number) => {
    if (!confirm('Are you sure you want to delete this guideline?')) return
    try {
      setDeleting(id)
      await moeApi.deleteLifestyleGuideline(id)
      fetchData()
    } catch (err) {
      console.error('Error deleting guideline:', err)
      alert('Failed to delete guideline')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <AuthWrapper>
        <Layout>
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span className="text-muted-foreground">Loading MoE data...</span>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }

  if (error) {
    return (
      <AuthWrapper>
        <Layout>
          <div className="flex items-center justify-center p-8 text-center">
            <div>
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">Error Loading MoE</h3>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchData} variant="secondary">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: Target },
    { id: 'personas' as TabType, label: 'Personas', icon: Users },
    { id: 'principles' as TabType, label: 'Principles', icon: BookOpen },
    { id: 'schedule' as TabType, label: 'Schedule', icon: Clock },
    { id: 'lifestyle' as TabType, label: 'Lifestyle', icon: Heart },
  ]

  return (
    <AuthWrapper>
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mission & Objectives Engine</h1>
              <p className="text-muted-foreground">Manage your life mission, personas, and principles</p>
            </div>
            <Button variant="secondary" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && summary && (
            <div className="space-y-6">
              {/* Super Objective */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-semibold text-lg">Super Objective</h2>
                    <p className="text-sm text-muted-foreground">Target: {summary.target_date}</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <p className="text-foreground">{summary.super_objective}</p>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Personas</div>
                  <div className="text-2xl font-bold text-foreground">{summary.personas.length}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Principles</div>
                  <div className="text-2xl font-bold text-foreground">{summary.principles.length}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Schedule Blocks</div>
                  <div className="text-2xl font-bold text-foreground">{summary.schedule_blocks.length}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Non-Negotiables</div>
                  <div className="text-2xl font-bold text-foreground">{summary.non_negotiables.length}</div>
                </Card>
              </div>

              {/* Non-Negotiables */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Non-Negotiables</h2>
                  <Button variant="secondary" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {summary.non_negotiables.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Dua */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Daily Dua</h2>
                  <Button variant="secondary" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <p className="text-foreground italic">&quot;{summary.dua_for_success}&quot;</p>
              </Card>
            </div>
          )}

          {/* Personas Tab */}
          {activeTab === 'personas' && summary && (
            <Card>
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold">Life Personas</h2>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Persona
                </Button>
              </div>
              <div className="divide-y divide-border">
                {summary.personas.map((persona) => (
                  <div key={persona.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm px-2 py-1 bg-muted rounded" style={{ color: persona.color }}>{persona.icon}</span>
                          <h3 className="font-semibold">{persona.name}</h3>
                          <span className="px-2 py-0.5 text-xs bg-muted rounded">{persona.domain}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{persona.eventually}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePersona(persona.id)}
                          disabled={deleting === persona.id}
                        >
                          {deleting === persona.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    {persona.milestones.length > 0 && (
                      <div className="mt-3 pl-8">
                        <div className="text-xs text-muted-foreground mb-2">Milestones</div>
                        <div className="space-y-1">
                          {persona.milestones.map((milestone, idx) => (
                            <div key={idx} className="flex items-center text-sm space-x-2">
                              <span className="text-muted-foreground">{milestone.date}:</span>
                              <span>{milestone.goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Principles Tab */}
          {activeTab === 'principles' && summary && (
            <Card>
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold">Guiding Principles</h2>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Principle
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.principles.map((principle) => (
                    <TableRow key={principle.id}>
                      <TableCell className="font-medium">{principle.order}</TableCell>
                      <TableCell className="font-medium">{principle.name}</TableCell>
                      <TableCell className="text-muted-foreground">{principle.meaning}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePrinciple(principle.id)}
                            disabled={deleting === principle.id}
                          >
                            {deleting === principle.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && summary && (
            <Card>
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold">Daily Schedule Blocks</h2>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Block
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Persona</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.schedule_blocks.map((block) => (
                    <TableRow key={block.id}>
                      <TableCell className="font-medium">{block.time}</TableCell>
                      <TableCell>{block.persona_name}</TableCell>
                      <TableCell className="text-muted-foreground">{block.activity}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteScheduleBlock(block.id)}
                            disabled={deleting === block.id}
                          >
                            {deleting === block.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Lifestyle Tab */}
          {activeTab === 'lifestyle' && summary && (
            <Card>
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold">Lifestyle Guidelines</h2>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Guideline
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guideline</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.lifestyle_guidelines.map((guideline) => (
                    <TableRow key={guideline.id}>
                      <TableCell className="font-medium">{guideline.title}</TableCell>
                      <TableCell className="text-muted-foreground">{guideline.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteGuideline(guideline.id)}
                            disabled={deleting === guideline.id}
                          >
                            {deleting === guideline.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </Layout>
    </AuthWrapper>
  )
}
