"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, ExternalLink, Play, Code, Zap, Brain, TrendingUp, Award, Star, Users, GitFork } from "lucide-react"
import { Project } from "@/lib/api"
import SkillBadgeSlider from "./ui/SkillBadgeSlider"

interface ProjectCardProps {
  project: Project
  compact?: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, compact = false }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500'
      case 'in-progress': return 'text-yellow-500'
      case 'maintained': return 'text-cyan-500'
      default: return 'text-gray-500'
    }
  }
  
  if (compact) {
    return (
      <div
        className="group relative bg-card rounded-lg border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-foreground/5 hover:border-border p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start justify-between mb-2">
          <Link href={`/projects/${project.id}`} className="flex-1">
            <h3 className="text-sm font-semibold text-foreground line-clamp-1 hover:text-accent transition-colors">
              {project.title}
            </h3>
          </Link>
          <div className="flex gap-1 ml-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Source Code"
              >
                <Github size={14} />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Live Site"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {project.description}
        </p>
        
        <SkillBadgeSlider skills={project.technologies} maxVisible={3} className="text-xs" />
      </div>
    )
  }
  
  return (
    <div
      className="group relative bg-card rounded-xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5 hover:border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            <Link href={`/projects/${project.id}`}>
              <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-accent transition-colors">
                {project.title}
              </h3>
            </Link>
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
        <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-3">
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
          {project.stats.stars > 0 && (
            <div className="flex items-center">
              <Star size={12} className="mr-1" />
              <span>{project.stats.stars}</span>
            </div>
          )}
          {project.stats.forks > 0 && (
            <div className="flex items-center">
              <GitFork size={12} className="mr-1" />
              <span>{project.stats.forks}</span>
            </div>
          )}
          {project.stats.commits > 0 && (
            <div className="flex items-center">
              <Code size={12} className="mr-1" />
              <span>{project.stats.commits} commits</span>
            </div>
          )}
          <div className={`ml-auto ${getStatusColor(project.status)}`}>
            {project.status}
          </div>
        </div>

        {/* Technologies */}
        <div className="flex items-center justify-between">
          <SkillBadgeSlider skills={project.technologies} maxVisible={4} className="flex-1" />
          <Link 
            href={`/projects/${project.id}`}
            className="ml-4 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-accent/3 to-accent/5 rounded-xl transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      } pointer-events-none`} />
    </div>
  )
}

export default ProjectCard