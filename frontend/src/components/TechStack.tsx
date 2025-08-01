"use client"

import { useState, useEffect } from "react"
import { Zap, Code2, Award, TrendingUp } from "lucide-react"
import { portfolioApi, TechSkill } from "@/lib/api"
import TechnologySlider from "./ui/TechnologySlider"

interface Technology {
  id: string
  name: string
  category: string
  level: number
  years: number
  icon: string
  color: string
}

const TechStack = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [loading, setLoading] = useState(true)

  // Comprehensive technology data with proper icons and colors
  const staticTechnologies: Technology[] = [
    // Programming Languages
    { id: "python", name: "Python", category: "programming", level: 95, years: 8, icon: "🐍", color: "#3776ab" },
    { id: "go", name: "Go", category: "programming", level: 85, years: 4, icon: "🔷", color: "#00add8" },
    { id: "typescript", name: "TypeScript", category: "programming", level: 90, years: 6, icon: "📘", color: "#3178c6" },
    { id: "javascript", name: "JavaScript", category: "programming", level: 88, years: 7, icon: "🟨", color: "#f7df1e" },
    
    // Web Frameworks
    { id: "fastapi", name: "FastAPI", category: "frameworks", level: 92, years: 4, icon: "⚡", color: "#009688" },
    { id: "nextjs", name: "Next.js", category: "frameworks", level: 85, years: 3, icon: "▲", color: "#000000" },
    { id: "nestjs", name: "NestJS", category: "frameworks", level: 88, years: 3, icon: "🔴", color: "#e0234e" },
    { id: "react", name: "React", category: "frameworks", level: 90, years: 5, icon: "⚛️", color: "#61dafb" },
    
    // Cloud Platforms
    { id: "aws", name: "AWS", category: "cloud", level: 95, years: 7, icon: "☁️", color: "#ff9900" },
    { id: "gcp", name: "Google Cloud", category: "cloud", level: 80, years: 3, icon: "🌩️", color: "#4285f4" },
    { id: "azure", name: "Azure", category: "cloud", level: 88, years: 5, icon: "🔷", color: "#0078d4" },
    
    // Container & Orchestration
    { id: "docker", name: "Docker", category: "devops", level: 95, years: 8, icon: "🐳", color: "#2496ed" },
    { id: "kubernetes", name: "Kubernetes", category: "devops", level: 92, years: 6, icon: "☸️", color: "#326ce5" },
    { id: "helm", name: "Helm", category: "devops", level: 88, years: 4, icon: "⚓", color: "#0f1689" },
    
    // Infrastructure as Code
    { id: "terraform", name: "Terraform", category: "infrastructure", level: 95, years: 6, icon: "🏗️", color: "#7b42bc" },
    { id: "ansible", name: "Ansible", category: "infrastructure", level: 90, years: 5, icon: "🔧", color: "#ee0000" },
    
    // Databases
    { id: "postgresql", name: "PostgreSQL", category: "database", level: 92, years: 8, icon: "🐘", color: "#336791" },
    { id: "redis", name: "Redis", category: "database", level: 88, years: 5, icon: "🔴", color: "#dc382d" },
    { id: "elasticsearch", name: "Elasticsearch", category: "database", level: 85, years: 4, icon: "🔍", color: "#005571" },
    
    // Monitoring & Observability
    { id: "prometheus", name: "Prometheus", category: "monitoring", level: 90, years: 5, icon: "📊", color: "#e6522c" },
    { id: "grafana", name: "Grafana", category: "monitoring", level: 92, years: 5, icon: "📈", color: "#f46800" },
    { id: "datadog", name: "DataDog", category: "monitoring", level: 88, years: 4, icon: "🐶", color: "#632ca6" },
    
    // CI/CD
    { id: "github-actions", name: "GitHub Actions", category: "cicd", level: 95, years: 5, icon: "🚀", color: "#2088ff" },
    { id: "jenkins", name: "Jenkins", category: "cicd", level: 82, years: 4, icon: "🔨", color: "#d33833" },
    { id: "argocd", name: "ArgoCD", category: "cicd", level: 85, years: 3, icon: "🎯", color: "#ef7b4d" },
    
    // AI & ML
    { id: "openai", name: "OpenAI", category: "ai", level: 85, years: 2, icon: "🤖", color: "#10a37f" },
    { id: "tensorflow", name: "TensorFlow", category: "ai", level: 75, years: 2, icon: "🧠", color: "#ff6f00" },
    { id: "langchain", name: "LangChain", category: "ai", level: 80, years: 1, icon: "🔗", color: "#1c3c3c" },
  ]

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const data = await portfolioApi.getTechSkills()
        // Transform API data to match our Technology interface
        const transformedData: Technology[] = data.map(skill => ({
          id: skill.id,
          name: skill.name,
          category: skill.category,
          level: skill.level,
          years: skill.years_exp,
          icon: getIconForTech(skill.name),
          color: getColorForTech(skill.name)
        }))
        setTechnologies(transformedData)
      } catch (error) {
        console.error("Failed to fetch tech skills:", error)
        // Use static data as fallback
        setTechnologies(staticTechnologies)
      } finally {
        setLoading(false)
      }
    }

    fetchTechnologies()
  }, [])

  const getIconForTech = (name: string): string => {
    const iconMap: Record<string, string> = {
      'Python': '🐍', 'Go': '🔷', 'TypeScript': '📘', 'JavaScript': '🟨',
      'FastAPI': '⚡', 'Next.JS': '▲', 'NestJS': '🔴', 'React': '⚛️',
      'AWS': '☁️', 'GCP': '🌩️', 'Azure': '🔷', 'Google Cloud': '🌩️',
      'Docker': '🐳', 'Kubernetes': '☸️', 'Helm': '⚓',
      'Terraform': '🏗️', 'Ansible': '🔧',
      'PostgreSQL': '🐘', 'Redis': '🔴', 'Elasticsearch': '🔍',
      'Prometheus': '📊', 'Grafana': '📈', 'DataDog': '🐶',
      'GitHub Actions': '🚀', 'Jenkins': '🔨', 'ArgoCD': '🎯',
      'OpenAI': '🤖', 'TensorFlow': '🧠', 'LangChain': '🔗'
    }
    return iconMap[name] || '⚙️'
  }

  const getColorForTech = (name: string): string => {
    const colorMap: Record<string, string> = {
      'Python': '#3776ab', 'Go': '#00add8', 'TypeScript': '#3178c6', 'JavaScript': '#f7df1e',
      'FastAPI': '#009688', 'Next.JS': '#000000', 'NestJS': '#e0234e', 'React': '#61dafb',
      'AWS': '#ff9900', 'GCP': '#4285f4', 'Azure': '#0078d4', 'Google Cloud': '#4285f4',
      'Docker': '#2496ed', 'Kubernetes': '#326ce5', 'Helm': '#0f1689',
      'Terraform': '#7b42bc', 'Ansible': '#ee0000',
      'PostgreSQL': '#336791', 'Redis': '#dc382d', 'Elasticsearch': '#005571',
      'Prometheus': '#e6522c', 'Grafana': '#f46800', 'DataDog': '#632ca6',
      'GitHub Actions': '#2088ff', 'Jenkins': '#d33833', 'ArgoCD': '#ef7b4d',
      'OpenAI': '#10a37f', 'TensorFlow': '#ff6f00', 'LangChain': '#1c3c3c'
    }
    return colorMap[name] || '#6b7280'
  }

  if (loading) {
    return (
      <section id="techstack" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading technologies...</div>
          </div>
        </div>
      </section>
    )
  }

  // Calculate stats
  const totalYears = technologies.reduce((sum, tech) => sum + tech.years, 0)
  const avgProficiency = Math.round(technologies.reduce((sum, tech) => sum + tech.level, 0) / technologies.length)
  const expertTechnologies = technologies.filter(tech => tech.level >= 90).length

  return (
    <section id="techstack" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Technologies & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge technologies mastered through years of hands-on experience
          </p>
        </div>

        {/* Technology Slider */}
        <div className="mb-16">
          <TechnologySlider technologies={technologies} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5">
            <div className="flex items-center justify-center mb-3">
              <Code2 className="text-accent" size={24} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {technologies.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Technologies
            </div>
          </div>

          <div className="text-center bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {totalYears}
            </div>
            <div className="text-sm text-muted-foreground">
              Years Combined
            </div>
          </div>

          <div className="text-center bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5">
            <div className="flex items-center justify-center mb-3">
              <Award className="text-yellow-500" size={24} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {expertTechnologies}
            </div>
            <div className="text-sm text-muted-foreground">
              Expert Level
            </div>
          </div>

          <div className="text-center bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5">
            <div className="flex items-center justify-center mb-3">
              <Zap className="text-blue-500" size={24} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {avgProficiency}%
            </div>
            <div className="text-sm text-muted-foreground">
              Avg Proficiency
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-accent/10 text-foreground rounded-full border border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
            <Zap className="text-accent mr-2" size={20} />
            <span className="font-medium">
              Always learning and exploring new technologies
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStack