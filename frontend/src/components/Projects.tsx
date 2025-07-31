"use client"

import { useState, useEffect } from "react"
import { Github, ExternalLink, Play, Code, Zap, Brain, TrendingUp, Award, Star, Users, GitFork } from "lucide-react"
import { portfolioApi, Project } from "@/lib/api"

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await portfolioApi.getProjects()
        setProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [selectedCategory])


  if (loading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        </div>
      </section>
    )
  }

  const categories = ['all', 'AI/ML', 'DevOps/SRE', 'Infrastructure', 'Social Impact']
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500'
      case 'in-progress': return 'text-yellow-500'
      case 'maintained': return 'text-cyan-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge AI & infrastructure projects with real-world impact
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredProject === project.id
            
            return (
              <div
                key={project.id}
                className="group relative bg-card rounded-xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5 hover:border-border"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {project.featured && (
                    <div className="bg-foreground text-background px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </div>
                  )}
                  {project.ai_powered && (
                    <div className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-medium">
                      AI
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {project.title}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {project.category}
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost btn-sm p-2"
                          title="Live Demo"
                        >
                          <Play size={16} />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost btn-sm p-2"
                          title="Source Code"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost btn-sm p-2"
                          title="Live Site"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {isHovered && project.long_description ? project.long_description : project.description}
                  </p>

                  {/* Impact metrics */}
                  {Object.keys(project.impact).length > 0 && (
                    <div className="mb-4 p-3 bg-accent/5 rounded-lg border border-accent/20">
                      <h4 className="text-xs font-medium text-accent mb-2 flex items-center">
                        <TrendingUp size={12} className="mr-1" />
                        IMPACT METRICS
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {project.impact.users && (
                          <div className="flex items-center">
                            <Users size={10} className="text-cyan-500 mr-2" />
                            <span className="text-muted-foreground">{project.impact.users.toLocaleString()} users</span>
                          </div>
                        )}
                        {project.impact.savings && (
                          <div className="flex items-center">
                            <Award size={10} className="text-green-500 mr-2" />
                            <span className="text-muted-foreground">{project.impact.savings}</span>
                          </div>
                        )}
                        {project.impact.performance && (
                          <div className="flex items-center col-span-full">
                            <Zap size={10} className="text-yellow-500 mr-2" />
                            <span className="text-muted-foreground">{project.impact.performance}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* GitHub stats */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    {project.stats.stars && (
                      <div className="flex items-center">
                        <Star size={12} className="mr-1" />
                        <span>{project.stats.stars}</span>
                      </div>
                    )}
                    {project.stats.forks && (
                      <div className="flex items-center">
                        <GitFork size={12} className="mr-1" />
                        <span>{project.stats.forks}</span>
                      </div>
                    )}
                    {project.stats.commits && (
                      <div className="flex items-center">
                        <Code size={12} className="mr-1" />
                        <span>{project.stats.commits} commits</span>
                      </div>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, isHovered ? project.technologies.length : 4).map((tech) => (
                      <span
                        key={tech}
                        className="badge-tech mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {!isHovered && project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-muted-foreground text-xs">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-accent/3 to-accent/5 rounded-xl transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                } pointer-events-none`} />
              </div>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://github.com/alamin-mahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg group"
            >
              <Github size={18} className="mr-2" />
              Explore More Projects
            </a>
            
            <div className="text-sm text-muted-foreground">
              {projects.reduce((sum, p) => sum + (p.stats.stars || 0), 0)}+ stars across all repositories
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects