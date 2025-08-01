import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink, Play, Star, GitFork, Code, Calendar, Users, Award, Zap, TrendingUp, CheckCircle } from "lucide-react"
import { portfolioApi, Project } from "@/lib/api"
import { generateProjects } from "@/lib/projectGenerator"
import SkillBadgeSlider from "@/components/ui/SkillBadgeSlider"

// Generate static params for all possible project IDs
export async function generateStaticParams() {
  try {
    // Get both API projects and generated projects
    const apiProjects = await portfolioApi.getProjects().catch(() => [])
    const generatedProjects = generateProjects(200)
    const allProjects = [...apiProjects, ...generatedProjects]
    
    return allProjects.map((project) => ({
      id: project.id,
    }))
  } catch (error) {
    // Fallback to just generated projects if API fails
    const generatedProjects = generateProjects(200)
    return generatedProjects.map((project) => ({
      id: project.id,
    }))
  }
}

async function getProject(id: string): Promise<Project | null> {
  try {
    // Try to get from API first
    const project = await portfolioApi.getProject(id)
    if (project) return project
    
    // If not found in API, check generated projects
    const generatedProjects = generateProjects(200)
    return generatedProjects.find(p => p.id === id) || null
  } catch (error) {
    // Fallback to generated projects
    const generatedProjects = generateProjects(200)
    return generatedProjects.find(p => p.id === id) || null
  }
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)
  
  if (!project) {
    notFound()
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-500/10 border-green-500/20'
      case 'in-progress': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'maintained': return 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20'
    }
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />
      case 'in-progress': return <Calendar size={16} />
      case 'maintained': return <Code size={16} />
      default: return null
    }
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link href="/#projects" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Projects
        </Link>
        
        {/* Project header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-4">{project.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="text-muted-foreground">{project.category}</span>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                  {getStatusIcon(project.status)}
                  {project.status}
                </span>
                {project.featured && (
                  <span className="bg-foreground text-background px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
                {project.ai_powered && (
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                    AI-Powered
                  </span>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2 ml-4">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Play size={18} className="mr-2" />
                  Live Demo
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Github size={18} className="mr-2" />
                  Source Code
                </a>
              )}
              {project.live_url && !project.demo_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Live Site
                </a>
              )}
            </div>
          </div>
          
          {/* GitHub stats */}
          {(project.stats.stars > 0 || project.stats.forks > 0) && (
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              {project.stats.stars > 0 && (
                <div className="flex items-center">
                  <Star size={16} className="mr-2" />
                  <span>{project.stats.stars.toLocaleString()} stars</span>
                </div>
              )}
              {project.stats.forks > 0 && (
                <div className="flex items-center">
                  <GitFork size={16} className="mr-2" />
                  <span>{project.stats.forks.toLocaleString()} forks</span>
                </div>
              )}
              {project.stats.commits > 0 && (
                <div className="flex items-center">
                  <Code size={16} className="mr-2" />
                  <span>{project.stats.commits.toLocaleString()} commits</span>
                </div>
              )}
              {project.stats.contributors && project.stats.contributors > 1 && (
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  <span>{project.stats.contributors} contributors</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Overview</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {project.long_description || project.description}
                </p>
              </div>
            </section>
            
            {/* Impact metrics */}
            {Object.keys(project.impact).length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Impact & Results</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.impact.users && (
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center mb-2">
                        <Users className="text-cyan-500 mr-3" size={24} />
                        <h3 className="text-lg font-medium">User Reach</h3>
                      </div>
                      <p className="text-3xl font-bold text-foreground mb-1">
                        {project.impact.users.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Active users served</p>
                    </div>
                  )}
                  
                  {project.impact.savings && (
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center mb-2">
                        <Award className="text-green-500 mr-3" size={24} />
                        <h3 className="text-lg font-medium">Cost Savings</h3>
                      </div>
                      <p className="text-3xl font-bold text-foreground mb-1">
                        {project.impact.savings}
                      </p>
                      <p className="text-sm text-muted-foreground">Total value delivered</p>
                    </div>
                  )}
                  
                  {project.impact.performance && (
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center mb-2">
                        <Zap className="text-yellow-500 mr-3" size={24} />
                        <h3 className="text-lg font-medium">Performance</h3>
                      </div>
                      <p className="text-3xl font-bold text-foreground mb-1">
                        {project.impact.performance}
                      </p>
                      <p className="text-sm text-muted-foreground">Improvement achieved</p>
                    </div>
                  )}
                  
                  {project.impact.reliability && (
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="text-accent mr-3" size={24} />
                        <h3 className="text-lg font-medium">Reliability</h3>
                      </div>
                      <p className="text-3xl font-bold text-foreground mb-1">
                        {project.impact.reliability}
                      </p>
                      <p className="text-sm text-muted-foreground">System reliability</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <section className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="badge-tech mono">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
            
            {/* Quick stats */}
            <section className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Project Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-muted-foreground">Category</dt>
                  <dd className="text-sm font-medium">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Status</dt>
                  <dd className="text-sm font-medium capitalize">{project.status}</dd>
                </div>
                {project.stats.contributors && (
                  <div>
                    <dt className="text-sm text-muted-foreground">Contributors</dt>
                    <dd className="text-sm font-medium">{project.stats.contributors}</dd>
                  </div>
                )}
                {project.stats.commits > 0 && (
                  <div>
                    <dt className="text-sm text-muted-foreground">Total Commits</dt>
                    <dd className="text-sm font-medium">{project.stats.commits.toLocaleString()}</dd>
                  </div>
                )}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}