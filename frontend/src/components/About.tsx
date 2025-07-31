"use client"

import { useState, useEffect } from "react"
import { portfolioApi, About as AboutType } from "@/lib/api"

const About = () => {
  const [aboutData, setAboutData] = useState<AboutType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await portfolioApi.getAbout()
        setAboutData(data)
      } catch (error) {
        console.error("Failed to fetch about data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 mono">
            {aboutData?.title || 'About Me'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mono">
            A multi-dimensional thinker with a global mindset, systems-level thinking, and a relentless execution habit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {aboutData?.description?.map((paragraph, index) => (
              <p key={index} className="text-lg text-muted-foreground mb-6 leading-relaxed mono">
                {paragraph}
              </p>
            )) || (
              <>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed mono">
                  Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.
                  Currently working as Senior DevOps Engineer at Kahf Yazılım A.Ş. and Senior Software Engineer at LeadSync.ai.
                </p>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed mono">
                  Previously Senior Platform Engineer & SRE at BriteCore Inc where I generated $20M+ ARR and cut $1M+ cloud costs.
                  I specialize in cloud architecture, Kubernetes, Infrastructure as Code, and building highly available SaaS platforms.
                </p>
              </>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {(aboutData?.skills || [
                "Python", "Go", "TypeScript", "Kubernetes", "AWS/GCP/Azure", "Terraform", 
                "Docker", "PostgreSQL", "Redis", "FastAPI", "Nest.JS", "Next.JS", 
                "Prometheus/Grafana", "Ansible", "Jenkins/GitHub Actions", "Elasticsearch"
              ]).map((skill) => (
                <span
                  key={skill}
                  className="badge-tech mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-sm border border-border card-hover">
            <h3 className="text-xl font-semibold text-foreground mb-6 mono"># Quick Facts</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">location:</span>
                <span className="text-accent mono">{aboutData?.quick_facts?.location || "Istanbul, Turkey / Remote"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">experience:</span>
                <span className="text-accent mono">{aboutData?.quick_facts?.experience || "10+ Years"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">focus:</span>
                <span className="text-accent mono">{aboutData?.quick_facts?.focus || "DevOps & SRE"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">interests:</span>
                <span className="text-accent mono">{aboutData?.quick_facts?.interests || "Cloud Architecture, AI, Podcasting"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About