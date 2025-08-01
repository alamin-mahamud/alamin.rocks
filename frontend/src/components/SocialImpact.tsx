"use client"

import React from "react"
import { Heart, Users, Globe, BookOpen, Code, Lightbulb, Award, MapPin, Calendar } from "lucide-react"

interface SocialWorkItem {
  title: string
  organization: string
  role: string
  duration: string
  location: string
  description: string
  impact: string[]
  skills: string[]
  category: 'education' | 'community' | 'technology' | 'mentorship'
  icon: React.ReactNode
}

const SocialImpact = () => {
  const socialWorkItems: SocialWorkItem[] = [
    {
      title: "AlterYouth.com - C2C Scholarship Platform",
      organization: "Self-Founded Initiative",
      role: "Founder & Platform Architect",
      duration: "2020 - Present",
      location: "Global (Remote)",
      description: "Founded a comprehensive C2C scholarship platform enabling global scholarship funding through digital banking. Built to democratize access to education funding and connect donors with deserving students worldwide.",
      impact: [
        "Connected 500+ students with scholarship opportunities",
        "Facilitated $50K+ in educational funding",
        "Built platform serving users across 15+ countries",
        "Created sustainable funding model for underprivileged students"
      ],
      skills: ["Full-Stack Development", "Digital Banking", "Payment Processing", "Social Impact", "Platform Architecture"],
      category: 'education',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Source Code Podcast - Technical Education",
      organization: "Independent Content Creator",
      role: "Founder & Host",
      duration: "March 2025 - Present",
      location: "Global (Podcast)",
      description: "Created and host Source Code Podcast to democratize technical knowledge through deep technical discussions on cloud infrastructure, DevOps, and modern software engineering practices.",
      impact: [
        "15+ episodes covering advanced technical topics",
        "Growing audience of 5K+ technical professionals",
        "Free technical education content for global community",
        "Mentoring through practical technical examples"
      ],
      skills: ["Content Creation", "Technical Communication", "Community Building", "Knowledge Sharing"],
      category: 'education',
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Open Source Contributions",
      organization: "Various Open Source Projects",
      role: "Contributor & Maintainer",
      duration: "2018 - Present",
      location: "Global (Remote)",
      description: "Active contributor to open source projects in DevOps, cloud infrastructure, and automation tools. Focus on creating tools that help other developers and organizations scale efficiently.",
      impact: [
        "20+ open source projects contributed to",
        "500+ GitHub stars across personal repositories",
        "Infrastructure tools used by 100+ organizations",
        "Documentation and tutorials benefiting developer community"
      ],
      skills: ["Open Source Development", "Community Collaboration", "Documentation", "Code Review"],
      category: 'technology',
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "Technical Mentorship Program",
      organization: "ADPList & Personal Network",
      role: "Technical Mentor",
      duration: "2021 - Present",
      location: "Global (Remote)",
      description: "Providing free technical mentorship to aspiring developers and DevOps engineers, helping them transition into tech careers and advance their technical skills.",
      impact: [
        "Mentored 50+ developers and engineers",
        "Helped 20+ individuals transition into DevOps roles",
        "Conducted 200+ free mentorship sessions",
        "Built sustainable career guidance framework"
      ],
      skills: ["Career Coaching", "Technical Leadership", "Knowledge Transfer", "Skill Development"],
      category: 'mentorship',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Tech Community Building",
      organization: "Local Tech Communities",
      role: "Community Organizer",
      duration: "2019 - Present",
      location: "Bangladesh & Remote",
      description: "Organizing and participating in tech meetups, conferences, and workshops to foster local tech community growth and knowledge sharing.",
      impact: [
        "Organized 10+ technical workshops and meetups",
        "Spoke at 5+ technology conferences",
        "Connected 1000+ local developers",
        "Promoted best practices in local tech ecosystem"
      ],
      skills: ["Event Organization", "Public Speaking", "Community Leadership", "Network Building"],
      category: 'community',
      icon: <Lightbulb className="w-6 h-6" />
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education':
        return 'text-blue-500'
      case 'community':
        return 'text-green-500'
      case 'technology':
        return 'text-purple-500'
      case 'mentorship':
        return 'text-orange-500'
      default:
        return 'text-accent'
    }
  }

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'education':
        return 'bg-blue-500/10'
      case 'community':
        return 'bg-green-500/10'
      case 'technology':
        return 'bg-purple-500/10'
      case 'mentorship':
        return 'bg-orange-500/10'
      default:
        return 'bg-accent/10'
    }
  }

  const totalImpactNumbers = {
    peopleHelped: socialWorkItems.reduce((total, item) => {
      const numbers = item.impact.join(' ').match(/(\d+)\+?\s*(students|individuals|developers|professionals|organizations)/gi)
      return total + (numbers?.reduce((sum, match) => {
        const num = parseInt(match.match(/\d+/)?.[0] || '0')
        return sum + num
      }, 0) || 0)
    }, 0),
    projectsContributed: 25,
    communitiesBuilt: 15,
    mentorshipHours: 400
  }

  return (
    <section id="social-impact" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Social Work & Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Committed to giving back to the community through education, mentorship, and technology initiatives
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {socialWorkItems.map((item, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl border border-border p-8 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 ${getCategoryBg(item.category)} rounded-xl flex items-center justify-center`}>
                    <div className={getCategoryColor(item.category)}>
                      {item.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-accent font-medium">{item.organization}</p>
                    <p className="text-muted-foreground font-medium">{item.role}</p>
                    
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Impact */}
                  <div>
                    <h4 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-accent" />
                      Impact & Achievements
                    </h4>
                    <ul className="space-y-2">
                      {item.impact.map((impact, impactIndex) => (
                        <li key={impactIndex} className="flex items-start gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span>{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Skills Applied:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, skillIndex) => (
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

        {/* Impact Summary */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Overall Impact Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-blue-500 mb-2">{totalImpactNumbers.peopleHelped}+</div>
              <div className="text-sm text-muted-foreground">People Helped</div>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-purple-500 mb-2">{totalImpactNumbers.projectsContributed}+</div>
              <div className="text-sm text-muted-foreground">Projects Contributed</div>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-green-500 mb-2">{totalImpactNumbers.communitiesBuilt}+</div>
              <div className="text-sm text-muted-foreground">Communities Built</div>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-orange-500 mb-2">{totalImpactNumbers.mentorshipHours}+</div>
              <div className="text-sm text-muted-foreground">Mentorship Hours</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Want to Collaborate on Social Impact?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I&apos;m always open to collaborating on meaningful projects that can make a positive impact on communities and help people grow in their careers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#contact"
              className="btn btn-primary"
            >
              <Heart className="w-4 h-4 mr-2" />
              Get in Touch
            </a>
            <a
              href="https://linkedin.com/in/alamin-mahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialImpact