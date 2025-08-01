"use client"

import React from "react"

interface TechnologiesTextProps {
  className?: string
}

const TechnologiesText: React.FC<TechnologiesTextProps> = ({ className = "" }) => {
  const technologyCategories = [
    {
      title: "Programming Languages",
      technologies: ["Python", "Go", "TypeScript", "JavaScript"]
    },
    {
      title: "Web Frameworks",
      technologies: ["FastAPI", "Next.js", "NestJS", "Django", "Flask"]
    },
    {
      title: "Cloud Platforms",
      technologies: ["AWS", "Google Cloud", "Azure"]
    },
    {
      title: "DevOps & Infrastructure",
      technologies: ["Docker", "Kubernetes", "Terraform", "Ansible", "GitHub Actions", "ArgoCD"]
    },
    {
      title: "Databases & Storage",
      technologies: ["PostgreSQL", "Redis", "Elasticsearch", "MySQL"]
    },
    {
      title: "Monitoring & Observability",
      technologies: ["Prometheus", "Grafana", "DataDog", "ELK Stack"]
    },
    {
      title: "AI & Machine Learning",
      technologies: ["OpenAI", "TensorFlow", "LangChain", "MCP Protocol"]
    }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {technologyCategories.map((category, categoryIndex) => (
        <div key={category.title} className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            {category.title}
          </h4>
          <div className="flex flex-wrap gap-2">
            {category.technologies.map((tech, techIndex) => (
              <span
                key={tech}
                className="badge-tech"
                style={{ 
                  animationDelay: `${(categoryIndex * 100) + (techIndex * 50)}ms`
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TechnologiesText