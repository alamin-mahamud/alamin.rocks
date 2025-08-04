'use client'

import { useState, useEffect } from 'react'
import { AuthWrapper } from '@/components/AuthWrapper'
import { Layout } from '@/components/Layout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { ProjectForm } from '@/components/Projects/ProjectForm'
import { Plus, Edit, Trash2, Star, ExternalLink, Github } from 'lucide-react'
import { Project, ProjectCreate } from '@/types'
import { portfolioApi } from '@/lib/api'
import { format } from 'date-fns'

// Mock data - replace with actual API calls
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management',
    technologies: ['Next.js', 'FastAPI', 'PostgreSQL', 'Redis'],
    github_url: 'https://github.com/alamin-mahamud/ecommerce',
    live_url: 'https://shop.example.com',
    image_url: '/images/projects/ecommerce.png',
    featured: true,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    title: 'Task Management System',
    description: 'Collaborative task management app with real-time updates',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    github_url: 'https://github.com/alamin-mahamud/taskmaster',
    image_url: '/images/projects/taskmaster.png',
    featured: true,
    created_at: '2024-01-05T09:15:00Z',
    updated_at: '2024-01-12T16:20:00Z'
  }
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Load projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await portfolioApi.getProjects()
        setProjects(response.data || [])
      } catch (error) {
        console.error('Error fetching projects:', error)
        // Use mock data as fallback
        setProjects(mockProjects)
      } finally {
        setInitialLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleCreateProject = async (data: ProjectCreate) => {
    setLoading(true)
    try {
      const response = await portfolioApi.createProject(data)
      const newProject = response.data
      setProjects(prev => [newProject, ...prev])
      setShowForm(false)
    } catch (error) {
      console.error('Error creating project:', error)
      // Fallback to local creation
      const newProject: Project = {
        ...data,
        id: String(Date.now()),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setProjects(prev => [newProject, ...prev])
      setShowForm(false)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProject = async (data: ProjectCreate) => {
    if (!editingProject) return
    
    setLoading(true)
    try {
      const response = await portfolioApi.updateProject(editingProject.id, data)
      const updatedProject = response.data
      setProjects(prev =>
        prev.map(p => p.id === editingProject.id ? updatedProject : p)
      )
      setEditingProject(null)
      setShowForm(false)
    } catch (error) {
      console.error('Error updating project:', error)
      // Fallback to local update
      const updatedProject: Project = {
        ...editingProject,
        ...data,
        updated_at: new Date().toISOString()
      }
      setProjects(prev =>
        prev.map(p => p.id === editingProject.id ? updatedProject : p)
      )
      setEditingProject(null)
      setShowForm(false)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    try {
      await portfolioApi.deleteProject(projectId)
      setProjects(prev => prev.filter(p => p.id !== projectId))
    } catch (error) {
      console.error('Error deleting project:', error)
      // Still remove from local state even if API call fails
      setProjects(prev => prev.filter(p => p.id !== projectId))
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  if (initialLoading) {
    return (
      <AuthWrapper>
        <Layout>
          <div className="space-y-6">
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading projects...</div>
            </div>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }

  if (showForm) {
    return (
      <AuthWrapper>
        <Layout>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h1>
              <p className="text-muted-foreground">
                {editingProject ? 'Update project details' : 'Add a new project to your portfolio'}
              </p>
            </div>

            <Card>
              <ProjectForm
                project={editingProject || undefined}
                onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
                onCancel={handleCancelForm}
                loading={loading}
              />
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
              <h1 className="text-2xl font-bold text-foreground">Portfolio Projects</h1>
              <p className="text-muted-foreground">Manage your portfolio projects</p>
            </div>
            
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Technologies</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {project.description.substring(0, 60)}...
                          </div>
                        </div>
                        {project.featured && (
                          <Star className="h-4 w-4 text-warning fill-current" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium border rounded-full ${
                        project.featured
                          ? 'bg-success/10 text-success border-success/20'
                          : 'bg-muted text-muted-foreground border-border'
                      }`}>
                        {project.featured ? 'Featured' : 'Standard'}
                      </span>
                    </TableCell>
                    <TableCell>{format(new Date(project.updated_at), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {project.github_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(project.github_url, '_blank')}
                          >
                            <Github className="h-4 w-4" />
                          </Button>
                        )}
                        {project.live_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(project.live_url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
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
        </div>
      </Layout>
    </AuthWrapper>
  )
}