"use client"

import React from "react"

interface Technology {
  name: string
  icon: string
  color: string
}

interface TechnologyCategory {
  title: string
  technologies: Technology[]
}

interface TechnologiesGridProps {
  className?: string
}

const TechnologiesGrid: React.FC<TechnologiesGridProps> = ({ className = "" }) => {
  const technologyCategories: TechnologyCategory[] = [
    {
      title: "Programming Languages",
      technologies: [
        { name: "Python", icon: "🐍", color: "#3776ab" },
        { name: "Go", icon: "🔷", color: "#00add8" },
        { name: "TypeScript", icon: "📘", color: "#3178c6" },
        { name: "JavaScript", icon: "🟨", color: "#f7df1e" },
      ]
    },
    {
      title: "Web Frameworks",
      technologies: [
        { name: "FastAPI", icon: "⚡", color: "#009688" },
        { name: "Next.js", icon: "▲", color: "#000000" },
        { name: "NestJS", icon: "🔴", color: "#e0234e" },
        { name: "Django", icon: "🎯", color: "#092e20" },
        { name: "Flask", icon: "🌶️", color: "#000000" },
      ]
    },
    {
      title: "Cloud Platforms",
      technologies: [
        { name: "AWS", icon: "☁️", color: "#ff9900" },
        { name: "Google Cloud", icon: "🌩️", color: "#4285f4" },
        { name: "Azure", icon: "🔷", color: "#0078d4" },
      ]
    },
    {
      title: "DevOps & Infrastructure",
      technologies: [
        { name: "Docker", icon: "🐳", color: "#2496ed" },
        { name: "Kubernetes", icon: "☸️", color: "#326ce5" },
        { name: "Terraform", icon: "🏗️", color: "#7b42bc" },
        { name: "Ansible", icon: "🔧", color: "#ee0000" },
        { name: "GitHub Actions", icon: "🚀", color: "#2088ff" },
        { name: "ArgoCD", icon: "🎯", color: "#ef7b4d" },
      ]
    },
    {
      title: "Databases & Storage",
      technologies: [
        { name: "PostgreSQL", icon: "🐘", color: "#336791" },
        { name: "Redis", icon: "🔴", color: "#dc382d" },
        { name: "Elasticsearch", icon: "🔍", color: "#005571" },
        { name: "MySQL", icon: "🐬", color: "#4479a1" },
      ]
    },
    {
      title: "Monitoring & Observability",
      technologies: [
        { name: "Prometheus", icon: "📊", color: "#e6522c" },
        { name: "Grafana", icon: "📈", color: "#f46800" },
        { name: "DataDog", icon: "🐶", color: "#632ca6" },
        { name: "ELK Stack", icon: "🔍", color: "#005571" },
      ]
    },
    {
      title: "AI & Machine Learning",
      technologies: [
        { name: "OpenAI", icon: "🤖", color: "#10a37f" },
        { name: "TensorFlow", icon: "🧠", color: "#ff6f00" },
        { name: "LangChain", icon: "🔗", color: "#1c3c3c" },
        { name: "MCP Protocol", icon: "⚙️", color: "#6366f1" },
      ]
    }
  ]

  return (
    <div className={`space-y-8 ${className}`}>
      {technologyCategories.map((category, categoryIndex) => (
        <div key={category.title} className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            {category.title}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {category.technologies.map((tech, techIndex) => (
              <div
                key={tech.name}
                className="group bg-card border border-border rounded-lg p-3 hover:border-accent/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
                style={{ 
                  animationDelay: `${(categoryIndex * 100) + (techIndex * 50)}ms`
                }}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div 
                    className="text-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ filter: `drop-shadow(0 0 8px ${tech.color}40)` }}
                  >
                    {tech.icon}
                  </div>
                  <span 
                    className="text-sm font-medium transition-colors duration-300 group-hover:font-semibold"
                    style={{ color: tech.color }}
                  >
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TechnologiesGrid