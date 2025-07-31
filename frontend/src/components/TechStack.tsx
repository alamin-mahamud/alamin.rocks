"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  Code, 
  Database, 
  Cloud, 
  Server, 
  Zap, 
  Shield, 
  GitBranch,
  Container,
  Activity,
  Cpu,
  HardDrive,
  Network,
  LucideIcon
} from "lucide-react"

interface TechSkill {
  name: string
  category: string
  level: number
  yearsExp: number
  icon: LucideIcon
  color: string
  projects: number
}

const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([])
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const techSkills: TechSkill[] = useMemo(() => [
    // Programming & Frameworks
    { name: "Python", category: "programming", level: 95, yearsExp: 8, icon: Code, color: "text-yellow-400", projects: 45 },
    { name: "Go", category: "programming", level: 88, yearsExp: 5, icon: Code, color: "text-blue-400", projects: 28 },
    { name: "TypeScript", category: "programming", level: 92, yearsExp: 6, icon: Code, color: "text-blue-600", projects: 35 },
    { name: "FastAPI", category: "programming", level: 90, yearsExp: 4, icon: Zap, color: "text-green-500", projects: 20 },
    { name: "Next.js", category: "programming", level: 85, yearsExp: 3, icon: Code, color: "text-gray-300", projects: 15 },
    
    // Cloud & Infrastructure
    { name: "AWS", category: "cloud", level: 95, yearsExp: 7, icon: Cloud, color: "text-orange-400", projects: 50 },
    { name: "GCP", category: "cloud", level: 82, yearsExp: 4, icon: Cloud, color: "text-blue-500", projects: 25 },
    { name: "Azure", category: "cloud", level: 78, yearsExp: 3, icon: Cloud, color: "text-blue-400", projects: 18 },
    { name: "Kubernetes", category: "orchestration", level: 92, yearsExp: 6, icon: Container, color: "text-blue-500", projects: 40 },
    { name: "Docker", category: "orchestration", level: 95, yearsExp: 8, icon: Container, color: "text-blue-400", projects: 55 },
    { name: "Terraform", category: "iac", level: 90, yearsExp: 5, icon: Server, color: "text-purple-500", projects: 35 },
    { name: "Ansible", category: "iac", level: 85, yearsExp: 4, icon: Server, color: "text-red-500", projects: 30 },
    
    // Databases & Storage
    { name: "PostgreSQL", category: "database", level: 88, yearsExp: 7, icon: Database, color: "text-blue-600", projects: 42 },
    { name: "Redis", category: "database", level: 85, yearsExp: 5, icon: Database, color: "text-red-500", projects: 25 },
    { name: "Elasticsearch", category: "database", level: 80, yearsExp: 4, icon: Database, color: "text-yellow-500", projects: 20 },
    
    // Monitoring & Observability
    { name: "Prometheus", category: "monitoring", level: 90, yearsExp: 5, icon: Activity, color: "text-orange-500", projects: 35 },
    { name: "Grafana", category: "monitoring", level: 88, yearsExp: 5, icon: Activity, color: "text-orange-400", projects: 32 },
    { name: "DataDog", category: "monitoring", level: 85, yearsExp: 4, icon: Activity, color: "text-purple-600", projects: 20 },
    
    // CI/CD & DevOps
    { name: "GitHub Actions", category: "cicd", level: 92, yearsExp: 5, icon: GitBranch, color: "text-gray-300", projects: 40 },
    { name: "Jenkins", category: "cicd", level: 78, yearsExp: 6, icon: GitBranch, color: "text-blue-600", projects: 25 }
  ], [])

  const categories: { id: string; name: string; icon: LucideIcon }[] = [
    { id: "all", name: "All Technologies", icon: Cpu },
    { id: "programming", name: "Programming", icon: Code },
    { id: "cloud", name: "Cloud Platforms", icon: Cloud },
    { id: "orchestration", name: "Orchestration", icon: Container },
    { id: "iac", name: "Infrastructure as Code", icon: Server },
    { id: "database", name: "Databases", icon: Database },
    { id: "monitoring", name: "Monitoring", icon: Activity },
    { id: "cicd", name: "CI/CD", icon: GitBranch }
  ]

  const filteredSkills = selectedCategory === "all" 
    ? techSkills 
    : techSkills.filter(skill => skill.category === selectedCategory)

  useEffect(() => {
    // Animate skills on load
    const timer = setTimeout(() => {
      setAnimatedSkills(techSkills.map(skill => skill.name))
    }, 500)
    return () => clearTimeout(timer)
  }, [techSkills])

  const getSkillMetrics = (skill: TechSkill) => {
    return {
      totalProjects: skill.projects,
      avgProjectsPerYear: Math.round(skill.projects / skill.yearsExp),
      proficiencyGrade: skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : "Intermediate"
    }
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
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-all duration-300 mono text-sm ${
                  selectedCategory === category.id
                    ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/30"
                    : "bg-card text-muted-foreground border-border hover:border-accent/50 hover:text-foreground"
                }`}
              >
                <Icon size={16} className="mr-2" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon
            const metrics = getSkillMetrics(skill)
            const isAnimated = animatedSkills.includes(skill.name)
            const isHovered = hoveredSkill === skill.name

            return (
              <div
                key={skill.name}
                className={`group relative bg-card rounded-lg border border-border p-6 card-hover ${
                  isAnimated ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Skill header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Icon size={24} className={`${skill.color} mr-3`} />
                    <h3 className="font-semibold text-foreground mono">{skill.name}</h3>
                  </div>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded mono">
                    {skill.yearsExp}y
                  </span>
                </div>

                {/* Proficiency bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground mono">Proficiency</span>
                    <span className="text-accent mono font-medium">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-1000 ease-out ${
                        isAnimated ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ 
                        width: isAnimated ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 100 + 200}ms`
                      }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground mono">Projects:</span>
                    <span className="text-accent mono font-medium">{metrics.totalProjects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground mono">Level:</span>
                    <span className={`mono font-medium ${
                      metrics.proficiencyGrade === "Expert" ? "text-accent" :
                      metrics.proficiencyGrade === "Advanced" ? "text-accent/80" :
                      "text-warning"
                    }`}>
                      {metrics.proficiencyGrade}
                    </span>
                  </div>
                </div>

                {/* Hover overlay with additional metrics */}
                <div className={`absolute inset-0 bg-card/95 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 border border-accent/30 ${
                  isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}>
                  <div className="flex items-center mb-4">
                    <Icon size={24} className={`${skill.color} mr-3`} />
                    <h3 className="font-semibold text-foreground mono">{skill.name}</h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground mono">Total Projects:</span>
                      <span className="text-accent mono font-bold">{metrics.totalProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground mono">Projects/Year:</span>
                      <span className="text-accent mono font-bold">{metrics.avgProjectsPerYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground mono">Experience:</span>
                      <span className="text-accent mono font-bold">{skill.yearsExp} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground mono">Proficiency:</span>
                      <span className="text-accent mono font-bold">{skill.level}%</span>
                    </div>
                  </div>

                  {/* Real-time activity indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-accent/30 card-hover">
            <div className="flex items-center mb-2">
              <Code className="text-accent mr-2" size={24} />
              <span className="text-2xl font-bold text-accent mono">
                {techSkills.length}
              </span>
            </div>
            <p className="text-muted-foreground mono text-sm">Technologies Mastered</p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-accent/30 card-hover">
            <div className="flex items-center mb-2">
              <HardDrive className="text-accent mr-2" size={24} />
              <span className="text-2xl font-bold text-accent mono">
                {techSkills.reduce((sum, skill) => sum + skill.projects, 0)}
              </span>
            </div>
            <p className="text-muted-foreground mono text-sm">Total Projects</p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-accent/30 card-hover">
            <div className="flex items-center mb-2">
              <Network className="text-accent mr-2" size={24} />
              <span className="text-2xl font-bold text-accent mono">
                {Math.round(techSkills.reduce((sum, skill) => sum + skill.level, 0) / techSkills.length)}%
              </span>
            </div>
            <p className="text-muted-foreground mono text-sm">Average Proficiency</p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-accent/30 card-hover">
            <div className="flex items-center mb-2">
              <Shield className="text-accent mr-2" size={24} />
              <span className="text-2xl font-bold text-accent mono">
                {techSkills.filter(skill => skill.level >= 90).length}
              </span>
            </div>
            <p className="text-muted-foreground mono text-sm">Expert Level Skills</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStack