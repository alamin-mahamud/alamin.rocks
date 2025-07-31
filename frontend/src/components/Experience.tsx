"use client"

import { Calendar, MapPin, ExternalLink } from "lucide-react"

interface ExperienceItem {
  company: string
  role: string
  duration: string
  location: string
  current?: boolean
  achievements: string[]
  technologies: string[]
  website?: string
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      company: "Kahf Yazılım A.Ş.",
      role: "Senior DevOps Engineer",
      duration: "May 2025 - July 2027",
      location: "Istanbul, Turkey",
      current: true,
      achievements: [
        "On a mission to make online world safe & secure",
        "Migrating the entire infrastructure from Azure to Bare-metal"
      ],
      technologies: ["Bind9", "CloudNative-PG", "Kubernetes", "Ansible", "Terraform", "Microsoft Azure", "Traefik", "Helm Charts", "Prometheus", "Grafana", "Loki"]
    },
    {
      company: "LeadSync.ai",
      role: "Senior Software Engineer - AI Products",
      duration: "May 2025 - July 2027",
      location: "Singapore, Remote",
      current: true,
      achievements: [
        "Accelerated time-to-market by 40% by architecting and deploying an end-to-end integration of the Model Customization Platform (MCP) with advanced large language models (LLMs)",
        "Boosted qualified lead discovery by 25% through AI-driven lead scoring, semantic enrichment, and personalized outreach recommendations"
      ],
      technologies: ["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", "PostgreSQL", "Nest.JS", "Next.JS"]
    },
    {
      company: "BriteCore Inc",
      role: "Senior Platform Engineer & SRE – Cloud Team",
      duration: "Feb 2022 - Jan 2025",
      location: "Springfield, MO, USA",
      achievements: [
        "Generated $20M+ ARR by designing, implementing, and maintaining highly available, cost-efficient SaaS platforms",
        "Cut $1M+ cloud bill by spearheading cloud cost-saving initiatives",
        "Eliminated 30% of production brownouts by optimizing runtime configuration and state management",
        "Accelerated development cycles by ~35% by engineering CI/CD pipelines with GitHub Actions self-hosted runners",
        "Attained SOC2 compliance by lowering vulnerability exposure by ~60%",
        "Neutralized DDoS attacks from high-volume bot traffic through proactive monitoring",
        "Streamlined infrastructure provisioning by 80% by leveraging Terraform modules"
      ],
      technologies: ["AWS", "Terraform", "Kubernetes", "Docker", "GitHub Actions", "DataDog", "Python", "PostgreSQL"]
    },
    {
      company: "BriteCore Inc",
      role: "Platform Engineer - Platform & Cloud Team",
      duration: "Apr 2021 - Jan 2022",
      location: "Springfield, MO, USA",
      achievements: [
        "Cut AWS cloud costs by ~$36.5K/year by optimizing log ingestion on CloudWatch",
        "Mitigated data breaches and multi-million dollar customer churn by enhancing client data security",
        "Boosted system scalability and maintainability by 40% by leading cross-functional teams",
        "Expedited go-to-market timelines by ~30% and boosted overall product performance by ~15%",
        "Engineered a robust Data Abstraction Layer (DAL) enabling users to query observability metrics from 50+ accounts"
      ],
      technologies: ["AWS", "CloudWatch", "Terraform", "Python", "PostgreSQL", "Multi-account AWS"]
    },
    {
      company: "BriteCore Inc",
      role: "Site Reliability Engineer - SRE & SysOps Team",
      duration: "Sep 2019 - Mar 2021",
      location: "Springfield, MO, USA",
      achievements: [
        "Upheld 99.99% SLA for 50+ clients by integrating advanced monitoring tools",
        "Eliminated 30 minutes of downtime by implementing blue/green deployments",
        "Elevated internal team satisfaction by 20% by enabling custom production data selection",
        "Automated support operations by reducing manual toil by 75%",
        "Boosted high-profile customer satisfaction to 90% by enabling continuous delivery"
      ],
      technologies: ["AWS", "Monitoring", "Blue/Green Deployments", "Automation", "SLA Management"]
    },
    {
      company: "Pathao LLC",
      role: "Software Engineer",
      duration: "May 2019 - Jul 2019",
      location: "Dhaka, Bangladesh (On-Site)",
      achievements: [
        "Migrated 2M user ratings by architecting and deploying a scalable feedback system",
        "Standardized API structure by bootstrapping a robust API aggregation service",
        "Optimized order invoicing by authoring a stateless microservice to calculate invoice amounts accurately"
      ],
      technologies: ["Microservices", "API Design", "Scalable Architecture", "Database Migration"]
    },
    {
      company: "Portonics LLC",
      role: "Software Engineer",
      duration: "Apr 2018 - Apr 2019",
      location: "Dhaka, Bangladesh (On-Site)",
      achievements: [
        "Sustained 99.99% uptime for high-traffic applications with 1M+ daily hits",
        "Reduced page load times by over 90% by implementing robust caching mechanisms",
        "Enabled EMI features in the payment module by integrating with secure payment gateway",
        "Expanded system scalability for nationwide distribution network by decoupling monolithic architecture"
      ],
      technologies: ["High-traffic systems", "Caching", "Payment Integration", "Microservices", "Load Balancing"]
    },
    {
      company: "Cookups LLC",
      role: "Jr. Software Engineer",
      duration: "Dec 2017 - Mar 2018",
      location: "Dhaka, Bangladesh (On-Site)",
      achievements: [
        "Streamlined promotional workflows by 25% by integrating enhanced promo code generation",
        "Developed a messenger bot that can automate customer interactions for delivery service"
      ],
      technologies: ["Workflow Automation", "Bot Development", "Integration Systems"]
    }
  ]

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 mono">
            $ cat experience.log
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mono">
            # 10+ years of building scalable systems and leading teams
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-start">
                {/* Timeline dot */}
                <div className={`absolute left-6 w-4 h-4 rounded-full border-2 ${
                  exp.current 
                    ? 'bg-accent border-accent shadow-lg shadow-accent/50' 
                    : 'bg-background border-muted-foreground'
                } z-10`}>
                  {exp.current && (
                    <div className="absolute inset-1 bg-accent rounded-full animate-pulse"></div>
                  )}
                </div>

                {/* Content */}
                <div className="ml-16 flex-1">
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm card-hover">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mono">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-accent font-medium mono">
                          <span>{exp.company}</span>
                          {exp.website && (
                            <ExternalLink size={14} className="text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end mt-2 lg:mt-0">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mono">
                          <Calendar size={14} />
                          <span>{exp.duration}</span>
                          {exp.current && (
                            <span className="ml-2 px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mono mt-1">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mono mb-2">
                          # Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-foreground mono flex items-start">
                              <span className="text-accent mr-2 mt-1">•</span>
                              <span className="flex-1">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mono mb-2">
                          # Technologies:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="badge-tech mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience