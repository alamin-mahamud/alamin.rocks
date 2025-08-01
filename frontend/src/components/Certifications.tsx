"use client"

import React from "react"
import { Award, Calendar, ExternalLink, CheckCircle, Shield, Cloud, Code, Database, Clock } from "lucide-react"

interface Certification {
  title: string
  issuer: string
  issuedDate: string
  expiryDate?: string
  credentialId: string
  status: 'active' | 'in-progress' | 'expired'
  description: string
  skills: string[]
  certificateUrl?: string
  icon: React.ReactNode
  color: string
}

const Certifications = () => {
  const certifications: Certification[] = [
    {
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      issuedDate: "In Progress",
      credentialId: "CKA-2025-XXX",
      status: 'in-progress',
      description: "Industry-standard certification for Kubernetes cluster administration, covering installation, configuration, networking, security, and troubleshooting.",
      skills: ["Kubernetes", "Docker", "Container Orchestration", "Cluster Administration", "kubectl", "YAML"],
      certificateUrl: "#",
      icon: <Shield className="w-6 h-6" />,
      color: "text-blue-500"
    },
    {
      title: "AWS Solutions Architect Professional",
      issuer: "Amazon Web Services",
      issuedDate: "2024",
      expiryDate: "2027",
      credentialId: "AWS-SAP-2024-XXX",
      status: 'active',
      description: "Advanced certification demonstrating expertise in designing distributed applications and systems on AWS platform with complex requirements.",
      skills: ["AWS", "Cloud Architecture", "Solution Design", "Cost Optimization", "Security", "Scalability"],
      certificateUrl: "#",
      icon: <Cloud className="w-6 h-6" />,
      color: "text-orange-500"
    },
    {
      title: "Observability Engineering with Grafana Stack",
      issuer: "Grafana Labs",
      issuedDate: "2024",
      expiryDate: "2026",
      credentialId: "GRAFANA-OBS-2024-XXX",
      status: 'active',
      description: "Comprehensive certification covering observability best practices using Grafana, Prometheus, and Loki for monitoring and alerting.",
      skills: ["Grafana", "Prometheus", "Loki", "Observability", "Monitoring", "Alerting"],
      certificateUrl: "#",
      icon: <Database className="w-6 h-6" />,
      color: "text-purple-500"
    },
    {
      title: "HashiCorp Certified: Terraform Associate",
      issuer: "HashiCorp",
      issuedDate: "2023",
      expiryDate: "2025",
      credentialId: "HASHI-TERRA-2023-XXX",
      status: 'active',
      description: "Validates skills in Infrastructure as Code using Terraform for multi-cloud deployments and infrastructure automation.",
      skills: ["Terraform", "Infrastructure as Code", "Multi-cloud", "Automation", "HCL"],
      certificateUrl: "#",
      icon: <Code className="w-6 h-6" />,
      color: "text-indigo-500"
    },
    {
      title: "Professional Scrum Master I (PSM I)",
      issuer: "Scrum.org",
      issuedDate: "2023",
      credentialId: "PSM-I-2023-XXX",
      status: 'active',
      description: "Demonstrates fundamental understanding of Scrum framework and ability to apply it effectively in software development teams.",
      skills: ["Scrum", "Agile", "Project Management", "Team Leadership", "Sprint Planning"],
      certificateUrl: "#",
      icon: <Award className="w-6 h-6" />,
      color: "text-green-500"
    },
    {
      title: "Docker Certified Associate (DCA)",
      issuer: "Docker Inc.",
      issuedDate: "2022",
      expiryDate: "2024",
      credentialId: "DOCKER-DCA-2022-XXX",
      status: 'expired',
      description: "Validates skills in containerization, Docker Engine, image management, networking, security, and orchestration.",
      skills: ["Docker", "Containerization", "Image Management", "Docker Compose", "Container Security"],
      certificateUrl: "#",
      icon: <Shield className="w-6 h-6" />,
      color: "text-blue-600"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Active
          </span>
        )
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        )
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-full text-xs font-medium">
            <ExternalLink className="w-3 h-3" />
            Expired
          </span>
        )
      default:
        return null
    }
  }

  const activeCertifications = certifications.filter(cert => cert.status === 'active').length
  const inProgressCertifications = certifications.filter(cert => cert.status === 'in-progress').length

  return (
    <section id="certifications" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Certifications & Credentials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized certifications validating expertise in cloud computing, DevOps, and software engineering
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-muted rounded-lg ${cert.color}`}>
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-accent font-medium text-sm">{cert.issuer}</p>
                  </div>
                </div>
                {getStatusBadge(cert.status)}
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Issued: {cert.issuedDate}</span>
                </div>
                {cert.expiryDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Expires: {cert.expiryDate}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {cert.description}
              </p>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="badge-tech text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground mono">
                  ID: {cert.credentialId}
                </div>
                {cert.certificateUrl && (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                  >
                    View Certificate
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <div className="text-3xl font-bold text-accent mb-2">{certifications.length}</div>
            <div className="text-sm text-muted-foreground">Total Certifications</div>
          </div>
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <div className="text-3xl font-bold text-green-500 mb-2">{activeCertifications}</div>
            <div className="text-sm text-muted-foreground">Active Certifications</div>
          </div>
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <div className="text-3xl font-bold text-yellow-500 mb-2">{inProgressCertifications}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <div className="text-3xl font-bold text-accent mb-2">
              {Array.from(new Set(certifications.flatMap(cert => cert.skills))).length}
            </div>
            <div className="text-sm text-muted-foreground">Validated Skills</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certifications