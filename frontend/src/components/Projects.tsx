"use client"

import { useState, useEffect } from "react"
import { Github, ExternalLink } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  image_url?: string
  featured: boolean
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // For now, use mock data since backend isn't running
        const mockProjects: Project[] = [
          {
            id: "1",
            title: "HomeLab",
            description: "Infrastructure as Code and GitOps framework to automate provisioning, operating, and updating self-hosted services. Highly customizable homelab management system.",
            technologies: ["Terraform", "Kubernetes", "Ansible", "GitOps", "Infrastructure as Code"],
            github_url: "https://github.com/alamin-mahamud/homelab",
            featured: true
          },
          {
            id: "2",
            title: "Alexandria",
            description: "Terraform library providing Infrastructure as Code (IaC) templates and modules for deployment and management of cloud-based architectures.",
            technologies: ["Terraform", "AWS", "GCP", "Azure", "Infrastructure as Code"],
            github_url: "https://github.com/alamin-mahamud/alexandria",
            featured: true
          },
          {
            id: "3",
            title: "Capstone: Asset Allocation Solver",
            description: "Solves the Asset Allocation Problem - determining optimal resource allocation to maximize results given constraints and metrics. Strategy game optimization approach.",
            technologies: ["Python", "Optimization Algorithms", "Mathematical Modeling", "Resource Management"],
            github_url: "https://github.com/alamin-mahamud/capstone",
            featured: true
          },
          {
            id: "4",
            title: "AlterYouth.com",
            description: "'The Uber for Scholarships' - C2C scholarship platform enabling users worldwide to start scholarships for financially struggling students in Bangladesh through digital banking.",
            technologies: ["Full-Stack Development", "Digital Banking Integration", "Payment Processing", "Social Impact Platform"],
            github_url: "https://github.com/alamin-mahamud/alteryouth",
            featured: false
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

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 mono">
            $ ls ~/projects/
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mono">
            # Open source projects and infrastructure automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-foreground mono">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-solarized-base1 hover:text-foreground transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-solarized-base1 hover:text-foreground transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed mono">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-foreground text-sm rounded border border-border mono hover:bg-solarized-base2 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/alamin-mahamud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors mono"
          >
            <Github size={20} className="mr-2" />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects