"use client"

import { useState, useEffect } from "react"
import { 
  Code, 
  Database, 
  Cloud, 
  Server, 
  Activity,
  Cpu,
  LucideIcon
} from "lucide-react"
import { portfolioApi, TechSkill } from "@/lib/api"

const techIconMap: Record<string, LucideIcon> = {
  Code,
  Database,
  Cloud,
  Server,
  Activity,
  Cpu
}

interface LocalTechSkill extends Omit<TechSkill, 'icon'> {
  icon: LucideIcon
  yearsExp: number
}

const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([])
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [techSkills, setTechSkills] = useState<LocalTechSkill[]>([])
  const [loading, setLoading] = useState(true)

  // Comprehensive static tech skills data from resume
  const staticTechSkills: LocalTechSkill[] = [
    // Programming Languages
    { id: "python", name: "Python", category: "programming", level: 95, yearsExp: 8, years_exp: 8, icon: Code, color: "text-yellow-400", projects: 45 },
    { id: "go", name: "Go", category: "programming", level: 85, yearsExp: 4, years_exp: 4, icon: Code, color: "text-blue-400", projects: 12 },
    { id: "typescript", name: "TypeScript", category: "programming", level: 90, yearsExp: 6, years_exp: 6, icon: Code, color: "text-blue-600", projects: 35 },
    { id: "javascript", name: "JavaScript", category: "programming", level: 88, yearsExp: 7, years_exp: 7, icon: Code, color: "text-yellow-300", projects: 40 },
    
    // Web Frameworks
    { id: "fastapi", name: "FastAPI", category: "programming", level: 92, yearsExp: 4, years_exp: 4, icon: Code, color: "text-green-500", projects: 15 },
    { id: "nestjs", name: "Nest.JS", category: "programming", level: 88, yearsExp: 3, years_exp: 3, icon: Code, color: "text-red-500", projects: 8 },
    { id: "nextjs", name: "Next.JS", category: "programming", level: 85, yearsExp: 3, years_exp: 3, icon: Code, color: "text-gray-700", projects: 12 },
    { id: "gin", name: "Gin", category: "programming", level: 80, yearsExp: 2, years_exp: 2, icon: Code, color: "text-blue-500", projects: 6 },
    { id: "flask", name: "Flask", category: "programming", level: 85, yearsExp: 5, years_exp: 5, icon: Code, color: "text-gray-600", projects: 18 },
    { id: "django", name: "Django", category: "programming", level: 82, yearsExp: 4, years_exp: 4, icon: Code, color: "text-green-600", projects: 14 },
    
    // Cloud Platforms
    { id: "aws", name: "AWS", category: "cloud", level: 95, yearsExp: 7, years_exp: 7, icon: Cloud, color: "text-orange-500", projects: 50 },
    { id: "gcp", name: "GCP", category: "cloud", level: 80, yearsExp: 3, years_exp: 3, icon: Cloud, color: "text-blue-500", projects: 15 },
    { id: "azure", name: "Azure", category: "cloud", level: 88, yearsExp: 5, years_exp: 5, icon: Cloud, color: "text-blue-600", projects: 25 },
    
    // Container & Orchestration
    { id: "docker", name: "Docker", category: "system", level: 95, yearsExp: 8, years_exp: 8, icon: Server, color: "text-blue-500", projects: 60 },
    { id: "kubernetes", name: "Kubernetes", category: "system", level: 92, yearsExp: 6, years_exp: 6, icon: Server, color: "text-blue-600", projects: 35 },
    { id: "ecs", name: "ECS", category: "cloud", level: 85, yearsExp: 4, years_exp: 4, icon: Cloud, color: "text-orange-400", projects: 20 },
    { id: "eks", name: "EKS", category: "cloud", level: 88, yearsExp: 4, years_exp: 4, icon: Cloud, color: "text-orange-500", projects: 18 },
    
    // Infrastructure as Code  
    { id: "terraform", name: "Terraform", category: "system", level: 95, yearsExp: 6, years_exp: 6, icon: Server, color: "text-purple-500", projects: 40 },
    { id: "ansible", name: "Ansible", category: "system", level: 90, yearsExp: 5, years_exp: 5, icon: Server, color: "text-red-600", projects: 25 },
    { id: "cloudformation", name: "CloudFormation", category: "cloud", level: 80, yearsExp: 4, years_exp: 4, icon: Cloud, color: "text-orange-400", projects: 15 },
    
    // Databases & Caching
    { id: "postgresql", name: "PostgreSQL", category: "database", level: 92, yearsExp: 8, years_exp: 8, icon: Database, color: "text-blue-700", projects: 45 },
    { id: "mysql", name: "MySQL", category: "database", level: 85, yearsExp: 6, years_exp: 6, icon: Database, color: "text-blue-600", projects: 30 },
    { id: "redis", name: "Redis", category: "database", level: 88, yearsExp: 5, years_exp: 5, icon: Database, color: "text-red-500", projects: 28 },
    { id: "elasticsearch", name: "Elasticsearch", category: "database", level: 85, yearsExp: 4, years_exp: 4, icon: Database, color: "text-yellow-600", projects: 15 },
    
    // Monitoring & Observability
    { id: "prometheus", name: "Prometheus", category: "monitoring", level: 90, yearsExp: 5, years_exp: 5, icon: Activity, color: "text-orange-600", projects: 25 },
    { id: "grafana", name: "Grafana", category: "monitoring", level: 92, yearsExp: 5, years_exp: 5, icon: Activity, color: "text-orange-500", projects: 30 },
    { id: "datadog", name: "DataDog", category: "monitoring", level: 88, yearsExp: 4, years_exp: 4, icon: Activity, color: "text-purple-600", projects: 20 },
    { id: "cloudwatch", name: "CloudWatch", category: "monitoring", level: 85, yearsExp: 6, years_exp: 6, icon: Activity, color: "text-orange-400", projects: 35 },
    { id: "loki", name: "Loki", category: "monitoring", level: 80, yearsExp: 3, years_exp: 3, icon: Activity, color: "text-orange-400", projects: 12 },
    
    // CI/CD & DevOps
    { id: "github-actions", name: "GitHub Actions", category: "system", level: 95, yearsExp: 5, years_exp: 5, icon: Server, color: "text-gray-700", projects: 50 },
    { id: "jenkins", name: "Jenkins", category: "system", level: 82, yearsExp: 4, years_exp: 4, icon: Server, color: "text-blue-600", projects: 18 },
    { id: "argocd", name: "ArgoCD", category: "system", level: 85, yearsExp: 3, years_exp: 3, icon: Server, color: "text-blue-500", projects: 15 },
    { id: "helm", name: "Helm", category: "system", level: 88, yearsExp: 4, years_exp: 4, icon: Server, color: "text-blue-600", projects: 25 },
    
    // AI & ML
    { id: "mcp-protocol", name: "MCP Protocol", category: "programming", level: 90, yearsExp: 1, years_exp: 1, icon: Code, color: "text-purple-500", projects: 5 },
    { id: "llm-integration", name: "LLM Integration", category: "programming", level: 85, yearsExp: 1, years_exp: 1, icon: Code, color: "text-purple-600", projects: 8 },
    { id: "ai-sdk", name: "AI-SDK", category: "programming", level: 82, yearsExp: 1, years_exp: 1, icon: Code, color: "text-purple-400", projects: 6 },
    { id: "tensorflow", name: "TensorFlow", category: "programming", level: 75, yearsExp: 2, years_exp: 2, icon: Code, color: "text-orange-500", projects: 4 }
  ]

  useEffect(() => {
    const fetchTechSkills = async () => {
      try {
        const data = await portfolioApi.getTechSkills()
        const mappedData: LocalTechSkill[] = data.map(skill => ({
          ...skill,
          icon: techIconMap[skill.icon] || Code,
          yearsExp: skill.years_exp
        }))
        setTechSkills(mappedData)
      } catch (error) {
        console.error("Failed to fetch tech skills:", error)
        // Use static data as fallback
        setTechSkills(staticTechSkills)
      } finally {
        setLoading(false)
      }
    }

    fetchTechSkills()
  }, [])

  const categories: { id: string; name: string; icon: LucideIcon }[] = [
    { id: "all", name: "All Technologies", icon: Cpu },
    { id: "programming", name: "Programming", icon: Code },
    { id: "cloud", name: "Cloud Platforms", icon: Cloud },
    { id: "database", name: "Databases", icon: Database },
    { id: "monitoring", name: "Monitoring", icon: Activity },
    { id: "system", name: "System Tools", icon: Server }
  ]

  const filteredSkills = selectedCategory === "all" 
    ? techSkills 
    : techSkills.filter(skill => skill.category === selectedCategory)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (techSkills.length > 0) {
        setAnimatedSkills(techSkills.map(skill => skill.name))
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [techSkills])

  const getMetrics = (skill: LocalTechSkill) => {
    return {
      totalProjects: skill.projects,
      avgProjectsPerYear: Math.round(skill.projects / skill.yearsExp),
      proficiencyGrade: skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : "Intermediate"
    }
  }

  if (loading) {
    return (
      <section id="techstack" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading tech stack...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="techstack" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 mono">
            $ cat /proc/skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mono">
            # Comprehensive technology stack with real-time proficiency metrics
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 mono text-sm
                ${selectedCategory === category.id 
                  ? 'bg-accent text-accent-foreground border-accent shadow-md' 
                  : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-accent/50'
                }
              `}
            >
              <category.icon size={16} />
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            const metrics = getMetrics(skill)
            const isAnimated = animatedSkills.includes(skill.name)
            const isHovered = hoveredSkill === skill.name
            
            return (
              <div
                key={skill.id}
                className={`
                  group relative bg-card rounded-lg border border-border p-6 card-hover
                  transform transition-all duration-500 ${isAnimated ? 'animate-fade-up' : 'opacity-0'}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${skill.color}`}>
                      <skill.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mono">{skill.name}</h3>
                      <p className="text-xs text-muted-foreground mono">{skill.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-accent mono">{skill.level}%</div>
                    <div className="text-xs text-muted-foreground mono">{skill.yearsExp}y exp</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: isAnimated ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-medium text-foreground mono">{metrics.totalProjects}</div>
                    <div className="text-xs text-muted-foreground mono">Projects</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground mono">{metrics.avgProjectsPerYear}</div>
                    <div className="text-xs text-muted-foreground mono">Avg/Year</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-accent mono">{metrics.proficiencyGrade}</div>
                    <div className="text-xs text-muted-foreground mono">Level</div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/3 to-accent/5 rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* Summary stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mono">{techSkills.length}</div>
            <div className="text-sm text-muted-foreground mono">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mono">
              {techSkills.reduce((acc, skill) => acc + skill.yearsExp, 0)}
            </div>
            <div className="text-sm text-muted-foreground mono">Total Years</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mono">
              {techSkills.reduce((acc, skill) => acc + skill.projects, 0)}
            </div>
            <div className="text-sm text-muted-foreground mono">Projects Built</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mono">
              {Math.round(techSkills.reduce((acc, skill) => acc + skill.level, 0) / techSkills.length || 0)}%
            </div>
            <div className="text-sm text-muted-foreground mono">Avg Proficiency</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStack