"use client"

import React from "react"
import { GraduationCap, Calendar, MapPin, ExternalLink, Award, Clock } from "lucide-react"

interface TrainingProgram {
  title: string
  provider: string
  duration: string
  completedAt: string
  location: string
  description: string
  skills: string[]
  certificateUrl?: string
}

const Training = () => {
  const trainingPrograms: TrainingProgram[] = [
    {
      title: "Kubernetes Administration (CKA) Preparation",
      provider: "Cloud Native Computing Foundation",
      duration: "6 months",
      completedAt: "2025",
      location: "Online",
      description: "Comprehensive training on Kubernetes cluster administration, networking, security, and troubleshooting. Hands-on experience with real-world scenarios and best practices.",
      skills: ["Kubernetes", "Docker", "Container Orchestration", "Cluster Management", "YAML", "kubectl"],
      certificateUrl: "#"
    },
    {
      title: "AWS Solutions Architect Professional",
      provider: "Amazon Web Services",
      duration: "8 months",
      completedAt: "2024",
      location: "Online",
      description: "Advanced AWS training covering complex architectures, multi-account strategies, disaster recovery, and cost optimization for enterprise-scale solutions.",
      skills: ["AWS", "Cloud Architecture", "Infrastructure Design", "Cost Optimization", "Security", "Disaster Recovery"],
      certificateUrl: "#"
    },
    {
      title: "Observability with Grafana, Prometheus & Loki",
      provider: "Grafana Labs",
      duration: "3 months",
      completedAt: "2024",
      location: "Online",
      description: "Complete observability stack implementation including metrics collection, alerting, log aggregation, and dashboard creation for production environments.",
      skills: ["Prometheus", "Grafana", "Loki", "Monitoring", "Alerting", "Observability"],
      certificateUrl: "#"
    },
    {
      title: "DevOps Engineering Fundamentals",
      provider: "Linux Foundation",
      duration: "4 months",
      completedAt: "2023",
      location: "Online",
      description: "Comprehensive DevOps practices including CI/CD pipeline design, infrastructure as code, containerization, and automation strategies.",
      skills: ["DevOps", "CI/CD", "Infrastructure as Code", "Automation", "Linux", "Git"],
      certificateUrl: "#"
    },
    {
      title: "Terraform Infrastructure as Code",
      provider: "HashiCorp",
      duration: "2 months",
      completedAt: "2023",
      location: "Online",
      description: "Advanced Terraform usage for multi-cloud infrastructure provisioning, state management, and enterprise-scale deployments.",
      skills: ["Terraform", "Infrastructure as Code", "Multi-cloud", "State Management", "HCL"],
      certificateUrl: "#"
    },
    {
      title: "Python for DevOps and Automation",
      provider: "Python Software Foundation",
      duration: "3 months",
      completedAt: "2022",
      location: "Online",
      description: "Python programming focused on automation, scripting, API development, and infrastructure management tools.",
      skills: ["Python", "Automation", "Scripting", "API Development", "Infrastructure Management"],
      certificateUrl: "#"
    }
  ]

  return (
    <section id="training" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Training & Professional Development
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuous learning through specialized training programs and professional development courses
          </p>
        </div>

        <div className="space-y-8">
          {trainingPrograms.map((training, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl border border-border p-8 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Training Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {training.title}
                      </h3>
                      <p className="text-accent font-medium">{training.provider}</p>
                    </div>
                    {training.certificateUrl && (
                      <a
                        href={training.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
                      >
                        <Award className="w-4 h-4" />
                        View Certificate
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{training.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Completed {training.completedAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{training.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {training.description}
                  </p>

                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Skills Acquired:</h4>
                    <div className="flex flex-wrap gap-2">
                      {training.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="badge-tech text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-muted/30 rounded-xl">
            <div className="text-3xl font-bold text-accent mb-2">{trainingPrograms.length}</div>
            <div className="text-sm text-muted-foreground">Training Programs Completed</div>
          </div>
          <div className="text-center p-6 bg-muted/30 rounded-xl">
            <div className="text-3xl font-bold text-accent mb-2">
              {trainingPrograms.reduce((total, training) => {
                const months = parseInt(training.duration.split(' ')[0])
                return total + months
              }, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Months of Training</div>
          </div>
          <div className="text-center p-6 bg-muted/30 rounded-xl">
            <div className="text-3xl font-bold text-accent mb-2">
              {Array.from(new Set(trainingPrograms.flatMap(t => t.skills))).length}
            </div>
            <div className="text-sm text-muted-foreground">Skills Developed</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Training