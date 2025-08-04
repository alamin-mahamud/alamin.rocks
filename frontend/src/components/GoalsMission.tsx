"use client"

import React from "react"
import { Target, Compass, Star, Globe, Users, Lightbulb, Heart, TrendingUp, Award, Zap } from "lucide-react"

interface Goal {
  category: string
  title: string
  description: string
  metrics: string
  timeline: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

interface Mission {
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

const GoalsMission = () => {
  const mission: Mission[] = [
    {
      title: "Empowering Through Technology",
      description: "Democratize access to technology and knowledge by building scalable platforms, sharing expertise through mentorship, and creating educational content that helps others grow in their careers.",
      icon: <Globe className="w-8 h-8" />,
      color: "text-blue-500"
    },
    {
      title: "Islamic Values in Tech",
      description: "Demonstrate how Islamic principles of integrity, excellence, and service to humanity can guide ethical technology leadership and create positive impact in the global tech community.",
      icon: <Heart className="w-8 h-8" />,
      color: "text-green-500"
    },
    {
      title: "Bridging Communities",
      description: "Connect diverse communities through technology, fostering collaboration between Eastern and Western tech ecosystems, and promoting inclusive innovation that benefits all of humanity.",
      icon: <Users className="w-8 h-8" />,
      color: "text-purple-500"
    }
  ]

  const goals: Goal[] = [
    {
      category: "Professional Growth",
      title: "Become a Recognized Cloud Architecture Leader",
      description: "Establish thought leadership in cloud-native architectures, multi-cloud strategies, and sustainable infrastructure design through speaking, writing, and practical implementations.",
      metrics: "Complete CKA certification, speak at 5+ conferences, publish technical articles",
      timeline: "2025-2026",
      icon: <Target className="w-6 h-6" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      category: "Social Impact",
      title: "Scale AlterYouth Scholarship Platform",
      description: "Expand the scholarship platform to serve 10,000+ students globally, create sustainable funding partnerships, and build a network of mentors worldwide.",
      metrics: "10K+ students, $1M+ in scholarships, 100+ mentor network",
      timeline: "2025-2027",
      icon: <Users className="w-6 h-6" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      category: "Content Creation",
      title: "Build Source Code Podcast Brand",
      description: "Grow the podcast to become a leading technical education resource with consistent high-quality content, industry expert interviews, and practical learning resources.",
      metrics: "100+ episodes, 50K+ monthly listeners, industry partnerships",
      timeline: "2025-2026",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      category: "Entrepreneurship",
      title: "Launch Next-Generation SaaS Platform",
      description: "Build and launch an innovative SaaS platform that solves critical infrastructure challenges, focusing on sustainability, cost optimization, and developer experience.",
      metrics: "Product launch, $10M+ ARR, 1000+ enterprise customers",
      timeline: "2026-2028",
      icon: <Zap className="w-6 h-6" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      category: "Community Building",
      title: "Establish Tech Innovation Hub",
      description: "Create a physical and virtual space for technology innovation, mentorship, and collaboration, focusing on emerging markets and underrepresented communities.",
      metrics: "Innovation hub launch, 500+ members, 50+ startups incubated",
      timeline: "2027-2029",
      icon: <Star className="w-6 h-6" />,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    },
    {
      category: "Personal Development",
      title: "Master Islamic Finance & Ethics in Tech",
      description: "Deepen understanding of Islamic finance principles and their application in technology investments, ensuring all business ventures align with Islamic values.",
      metrics: "Islamic finance certification, halal investment portfolio, ethical tech framework",
      timeline: "2025-2026",
      icon: <Compass className="w-6 h-6" />,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    }
  ]

  const coreValues = [
    {
      title: "Excellence (Ihsan)",
      description: "Striving for perfection in all endeavors as if Allah is watching",
      icon: "⭐"
    },
    {
      title: "Integrity (Amanah)",
      description: "Maintaining trustworthiness and ethical conduct in all dealings",
      icon: "🤝"
    },
    {
      title: "Service (Khidmah)",
      description: "Using skills and resources to benefit humanity",
      icon: "🌍"
    },
    {
      title: "Knowledge (Ilm)",
      description: "Continuous learning and sharing of beneficial knowledge",
      icon: "📚"
    },
    {
      title: "Innovation (Ibda)",
      description: "Creative problem-solving while maintaining ethical boundaries",
      icon: "💡"
    },
    {
      title: "Balance (Mizan)",
      description: "Harmonizing worldly achievements with spiritual growth",
      icon: "⚖️"
    }
  ]

  return (
    <section id="goals-mission" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Mission & Vision
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Guided by Islamic values and driven by purpose, working towards meaningful goals that create positive impact for communities worldwide
          </p>
        </div>

        {/* Mission Statements */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Core Mission
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {mission.map((item, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-card rounded-xl border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className={item.color}>
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-4 group-hover:text-accent transition-colors">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Strategic Goals & Objectives
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 ${goal.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={goal.color}>
                      {goal.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium mb-2">
                      {goal.category}
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {goal.title}
                    </h4>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {goal.description}
                </p>
                
                <div className="space-y-2 pt-3 border-t border-border/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Timeline:</span>
                    <span className="text-accent font-semibold">{goal.timeline}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-xs text-muted-foreground font-medium block mb-1">Key Metrics:</span>
                    <p className="text-sm text-foreground font-medium">{goal.metrics}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Core Values & Principles
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="group text-center p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h4 className="text-sm font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{value.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-8 border border-accent/20">
          <div className="mb-6">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Join the Journey
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              These goals are not just personal ambitions but opportunities for collaboration and collective impact. 
              Whether you&apos;re a fellow entrepreneur, a student seeking mentorship, or an organization looking to make 
              a difference, let&apos;s work together to create meaningful change.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-medium transition-colors duration-200"
            >
              <Target className="w-4 h-4 mr-2" />
              Collaborate on Goals
            </a>
            <a
              href="https://linkedin.com/in/alaminmahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-card border border-border hover:bg-muted text-foreground rounded-lg font-medium transition-colors duration-200"
            >
              Connect & Follow Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoalsMission