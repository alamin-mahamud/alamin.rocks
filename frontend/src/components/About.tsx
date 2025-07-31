"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Award, Users, TrendingUp, MapPin, Calendar, Briefcase, Heart } from "lucide-react"
import { portfolioApi, About as AboutType } from "@/lib/api"

const About = () => {
  const [aboutData, setAboutData] = useState<AboutType | null>(null)
  const [loading, setLoading] = useState(true)

  // Static fallback data from resume and LinkedIn
  const staticAboutData = {
    title: "About Me",
    description: [
      "I'm a **strategic technology leader** dedicated to architecting and scaling **innovative cloud-native solutions** for global enterprises, with a strong **entrepreneurial spirit** that drives startup growth. Over the past **10+ years**, I've successfully built next-generation **Event-driven SaaS platforms**, led transformative **DevOps and SRE initiatives**, and consistently delivered **measurable impact**.",
      
      "Currently serving dual roles as **Senior DevOps Engineer** at [Kahf Yazılım A.Ş.](https://kahf.co) and **Senior Software Engineer - AI Products** at [LeadSync.ai](https://leadsync.ai), where I'm **migrating entire infrastructure from Azure to Bare-metal** and building **AI-powered Model Customization Platforms (MCP)** that accelerate time-to-market by **40%**.",
      
      "Previously at **BriteCore Inc**, I **generated $20M+ ARR** by designing and implementing highly available, cost-efficient SaaS platforms, while **cutting $1M+ cloud costs** through intelligent optimization strategies. I've **maintained 99.99% uptime** across 50+ client environments and **eliminated 30% of production brownouts** through advanced monitoring and automation.",
      
      "Beyond my technical expertise, I'm the **Founder & Host** of [Source Code Podcast](https://sourcecode.alamin.rocks) and **Founder & Platform Architect** at [Dark Knight Technologies](https://darkknight.tech), where I empower businesses by building **highly scalable, fault-tolerant applications** with robust cybersecurity."
    ],
    recommendations: [
      {
        text: "I've had the pleasure of working with Alamin, whose **expertise in building cloud-driven SaaS platforms** is impressive. Alamin has guided **DevOps efforts with a focus on scalability, functionality, and efficiency**. Alamin is a **reliable, forward-thinking professional** who delivers **real business impact** through technology.",
        author: "Sunny Parekh",
        title: "Director of Information Security, Technology and Compliance"
      },
      {
        text: "I had the privilege of mentoring him during his 2018 internship where he worked with Django REST Framework. Even then, he stood out for his **technical prowess, problem-solving skills, and ability to deliver production-ready solutions**. His **curiosity and dedication to mastering complex concepts** were truly impressive.",
        author: "Omar Faruque Tuhin",
        title: "Leading Teams to Build Robust Solutions in Kubernetes & Node.js"
      },
      {
        text: "I rarely come across **real talents** who stand out like Alamin. Alamin's **ability to handle multiple projects** was unlike any I've seen before and made a **dramatic increase in the productivity level** of our company.",
        author: "Ilias Kanchan",
        title: "Kubernetes | CKA | AWS | Linux | RHCE | Ansible | Docker"
      }
    ],
    achievements: [
      {
        icon: TrendingUp,
        title: "$21.2M+ Total Impact",
        description: "$20M+ SaaS ARR + $1.2M+ cost savings"
      },
      {
        icon: Users,
        title: "100K+ Users Served",
        description: "Across multiple platforms and projects"
      },
      {
        icon: Award,
        title: "99.99% Uptime",
        description: "Reliable systems across 50+ client environments"
      }
    ],
    skills: [
      "Python", "Go", "TypeScript", "Kubernetes", "AWS", "GCP", "Azure", 
      "Terraform", "Docker", "PostgreSQL", "Redis", "FastAPI", "Nest.JS", 
      "Next.JS", "Prometheus", "Grafana", "Ansible", "GitHub Actions", 
      "Elasticsearch", "MCP Protocol", "LLM Integration", "AI-SDK"
    ],
    quick_facts: {
      location: "Istanbul, Turkey / Remote",
      experience: "10+ Years",
      focus: "AI, Cloud & MLOps",
      interests: "Source Code Podcast, Open Source, Mentoring",
      languages: "English, Bangla, Hindi, Urdu, Turkish"
    }
  }

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await portfolioApi.getAbout()
        setAboutData(data)
      } catch (error) {
        console.error("Failed to fetch about data:", error)
        // Use static data as fallback
        setAboutData(staticAboutData as any)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  const formatDescription = (text: string) => {
    // Convert markdown-style bold to HTML
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1">$1<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>')
  }

  const data = aboutData || staticAboutData

  if (loading && !aboutData) {
    return (
      <section id="about" className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading about section...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A <strong className="text-foreground">multi-dimensional thinker</strong> with a <strong className="text-foreground">global mindset</strong>, 
            systems-level thinking, and a <strong className="text-foreground">relentless execution habit</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-6">
            {data.description?.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatDescription(paragraph) }}
              />
            ))}
          </div>

          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-accent" />
                Quick Facts
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location:
                  </span>
                  <span className="text-accent font-medium">{data.quick_facts?.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Experience:
                  </span>
                  <span className="text-accent font-medium">{data.quick_facts?.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Focus:
                  </span>
                  <span className="text-accent font-medium">{data.quick_facts?.focus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Interests:
                  </span>
                  <span className="text-accent font-medium">{data.quick_facts?.interests}</span>
                </div>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Key Achievements
              </h3>
              <div className="space-y-4">
                {data.achievements?.map((achievement, index) => {
                  const IconComponent = achievement.icon
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-accent/10 p-2 rounded-lg">
                        <IconComponent className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Technologies & Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {data.skills?.map((skill) => (
              <span
                key={skill}
                className="badge-tech"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            What Colleagues Say
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.recommendations?.map((rec, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover">
                <blockquote 
                  className="text-muted-foreground mb-4 leading-relaxed text-sm italic"
                  dangerouslySetInnerHTML={{ __html: formatDescription(`"${rec.text}"`) }}
                />
                <footer className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground text-sm">{rec.author}</div>
                  <div className="text-xs text-muted-foreground">{rec.title}</div>
                </footer>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://linkedin.com/in/alamin-mahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg group"
            >
              <Users className="w-5 h-5 mr-2" />
              Connect on LinkedIn
            </a>
            
            <a
              href="https://sourcecode.alamin.rocks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg group"
            >
              🎙️ Source Code Podcast
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About