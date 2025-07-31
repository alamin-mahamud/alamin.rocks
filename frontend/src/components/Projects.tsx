"use client"

import { useState, useEffect } from "react"
import { Github, ExternalLink, Play, Code, Zap, Brain, TrendingUp, Award, Star, Users, GitFork } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  github_url?: string
  live_url?: string
  demo_url?: string
  image_url?: string
  featured: boolean
  category: string
  impact: {
    users?: number
    savings?: string
    performance?: string
    reliability?: string
  }
  stats: {
    stars?: number
    forks?: number
    commits?: number
    contributors?: number
  }
  status: 'completed' | 'in-progress' | 'maintained'
  aiPowered?: boolean
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // For now, use mock data since backend isn't running
        const mockProjects: Project[] = [
          {
            id: "1",
            title: "AI-Powered Model Customization Platform (MCP)",
            description: "Revolutionary LLM integration platform that accelerated time-to-market by 40% and boosted qualified lead discovery by 25%.",
            longDescription: "End-to-end integration platform for advanced large language models featuring semantic enrichment, personalized AI-driven recommendations, and custom model fine-tuning capabilities. Built for enterprise-scale deployment with real-time inference optimization.",
            technologies: ["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", "PostgreSQL", "Nest.JS", "Next.JS", "Python", "TensorFlow"],
            github_url: "https://github.com/leadsync-ai/mcp-platform",
            live_url: "https://leadsync.ai",
            demo_url: "https://demo.leadsync.ai",
            featured: true,
            category: "AI/ML",
            impact: {
              users: 50000,
              performance: "40% faster time-to-market",
              savings: "$2M+ in development costs"
            },
            stats: {
              stars: 342,
              forks: 67,
              commits: 1240,
              contributors: 8
            },
            status: "maintained",
            aiPowered: true
          },
          {
            id: "2",
            title: "Cloud Cost Optimization Engine",
            description: "AI-driven cost optimization system that saved $1M+ in cloud expenses across 50+ enterprise clients.",
            longDescription: "Intelligent cloud resource optimization platform using machine learning to predict usage patterns, automatically rightsizing instances, and implementing cost-saving strategies. Features real-time monitoring, predictive scaling, and automated resource lifecycle management.",
            technologies: ["Python", "AWS", "Terraform", "Kubernetes", "Machine Learning", "Prometheus", "Grafana", "DataDog"],
            github_url: "https://github.com/alamin-mahamud/cloud-optimizer",
            featured: true,
            category: "DevOps/SRE",
            impact: {
              savings: "$1M+ cloud cost reduction",
              users: 50,
              reliability: "99.99% SLA maintained"
            },
            stats: {
              stars: 156,
              forks: 23,
              commits: 890,
              contributors: 4
            },
            status: "completed",
            aiPowered: true
          },
          {
            id: "3",
            title: "HomeLab: GitOps Infrastructure",
            description: "Production-grade homelab automation framework with Kubernetes orchestration and Infrastructure as Code.",
            longDescription: "Comprehensive homelab management system featuring GitOps workflows, automated service deployment, monitoring stack integration, and disaster recovery mechanisms. Supports multi-cloud deployment and hybrid infrastructure management.",
            technologies: ["Terraform", "Kubernetes", "Ansible", "GitOps", "ArgoCD", "Prometheus", "Grafana", "Traefik"],
            github_url: "https://github.com/alamin-mahamud/homelab",
            demo_url: "https://demo.homelab.alamin.rocks",
            featured: true,
            category: "Infrastructure",
            impact: {
              performance: "80% faster deployment",
              reliability: "Zero-downtime updates"
            },
            stats: {
              stars: 89,
              forks: 15,
              commits: 467,
              contributors: 2
            },
            status: "maintained"
          },
          {
            id: "4",
            title: "Alexandria: Multi-Cloud IaC Library",
            description: "Terraform modules library for enterprise-grade multi-cloud deployments across AWS, GCP, and Azure.",
            longDescription: "Comprehensive Infrastructure as Code library providing reusable Terraform modules for complex cloud architectures. Features automated compliance checking, cost estimation, and security best practices enforcement.",
            technologies: ["Terraform", "AWS", "GCP", "Azure", "Infrastructure as Code", "Compliance", "Security"],
            github_url: "https://github.com/alamin-mahamud/alexandria",
            featured: true,
            category: "Infrastructure",
            impact: {
              users: 200,
              performance: "60% faster infrastructure provisioning"
            },
            stats: {
              stars: 203,
              forks: 34,
              commits: 324,
              contributors: 6
            },
            status: "maintained"
          },
          {
            id: "5",
            title: "Asset Allocation AI Solver",
            description: "Machine learning-powered optimization engine for strategic resource allocation in complex environments.",
            longDescription: "Advanced optimization system using genetic algorithms and reinforcement learning to solve multi-constraint asset allocation problems. Designed for financial portfolio management and strategic resource planning.",
            technologies: ["Python", "TensorFlow", "Optimization Algorithms", "Reinforcement Learning", "Mathematical Modeling"],
            github_url: "https://github.com/alamin-mahamud/capstone",
            demo_url: "https://asset-optimizer.alamin.rocks",
            featured: false,
            category: "AI/ML",
            impact: {
              performance: "35% better allocation efficiency"
            },
            stats: {
              stars: 45,
              forks: 8,
              commits: 156,
              contributors: 1
            },
            status: "completed",
            aiPowered: true
          },
          {
            id: "6",
            title: "AlterYouth: Social Impact Platform",
            description: "Blockchain-powered scholarship platform connecting global donors with students in need.",
            longDescription: "Revolutionary C2C scholarship platform integrating digital banking, blockchain transparency, and AI-powered student matching. Features automated fund distribution, impact tracking, and community building tools.",
            technologies: ["Full-Stack Development", "Blockchain", "Digital Banking", "Payment Processing", "React", "Node.js"],
            github_url: "https://github.com/alamin-mahamud/alteryouth",
            live_url: "https://alteryouth.com",
            featured: false,
            category: "Social Impact",
            impact: {
              users: 10000,
              savings: "$500K+ in scholarships distributed"
            },
            stats: {
              stars: 67,
              forks: 12,
              commits: 289,
              contributors: 3
            },
            status: "completed"
          }
        ]
        setProjects(mockProjects)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

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
                  {project.aiPowered && (
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
                    {isHovered && project.longDescription ? project.longDescription : project.description}
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
                        className="px-2 py-1 bg-muted text-foreground text-xs rounded border border-border hover:bg-accent/10 hover:border-accent/30 transition-all duration-300"
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
                <div className={`absolute inset-0 bg-gradient-to-r from-accent/5 to-cyan-500/5 rounded-lg transition-opacity duration-300 ${
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