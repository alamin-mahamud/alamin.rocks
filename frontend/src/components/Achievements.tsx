"use client"

import { useState, useEffect, useRef } from "react"
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Award, 
  Zap, 
  Shield, 
  Target,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  Sparkles,
  LucideIcon
} from "lucide-react"

interface Achievement {
  id: string
  title: string
  value: string
  description: string
  icon: LucideIcon
  color: string
  percentage: number
  details: string[]
  category: string
}

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

const AnimatedCounter = ({ end, suffix = "", prefix = "", duration = 2000, decimals = 0 }: CounterProps) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = end * easeOutQuart

      setCount(currentCount)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isVisible, end, duration])

  return (
    <div ref={counterRef} className="inline-block">
      {prefix}{count.toFixed(decimals)}{suffix}
    </div>
  )
}

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredAchievement, setHoveredAchievement] = useState<string | null>(null)
  const [metricsVisible, setMetricsVisible] = useState(false)

  const achievements: Achievement[] = [
    {
      id: "cloud-savings",
      title: "Cloud Cost Optimization",
      value: "$1.2M+",
      description: "Total cloud infrastructure cost savings achieved",
      icon: DollarSign,
      color: "text-solarized-green",
      percentage: 100,
      details: [
        "Optimized AWS CloudWatch log ingestion saving $36.5K/year",
        "Implemented intelligent resource rightsizing algorithms",
        "Automated cost monitoring and alert systems",
        "Cross-functional team leadership for cost optimization initiatives"
      ],
      category: "financial"
    },
    {
      id: "saas-arr",
      title: "SaaS ARR Generation",
      value: "$20M+",
      description: "Annual Recurring Revenue contribution to SaaS platforms",
      icon: TrendingUp,
      color: "text-solarized-cyan",
      percentage: 100,
      details: [
        "Designed and maintained highly available SaaS platforms",
        "Implemented scalable cloud architectures",
        "Enhanced platform reliability and performance",
        "Drove customer retention through system optimization"
      ],
      category: "financial"
    },
    {
      id: "platform-reliability",
      title: "System Reliability",
      value: "99.99%",
      description: "Uptime SLA maintained across 50+ client environments",
      icon: Shield,
      color: "text-solarized-blue",
      percentage: 99.99,
      details: [
        "Advanced monitoring and alerting systems",
        "Blue/green deployment strategies eliminating downtime",
        "Proactive incident response and resolution",
        "Comprehensive disaster recovery planning"
      ],
      category: "operational"
    },
    {
      id: "performance-improvement",
      title: "Performance Optimization",
      value: "40%",
      description: "Average performance improvement across systems",
      icon: Zap,
      color: "text-solarized-yellow",
      percentage: 40,
      details: [
        "Accelerated time-to-market by 40% with MCP platform",
        "Reduced page load times by 90% through caching",
        "Eliminated 30% of production brownouts",
        "Optimized runtime configuration and state management"
      ],
      category: "performance"
    },
    {
      id: "user-impact",
      title: "User Base Served",
      value: "100K+",
      description: "Active users across deployed platforms and systems",
      icon: Users,
      color: "text-solarized-magenta",
      percentage: 100,
      details: [
        "LeadSync.ai platform serving 50K+ users",
        "AlterYouth scholarship platform with 10K+ users",
        "HomeLab framework adopted by 200+ users",
        "Enterprise platforms serving 50+ B2B clients"
      ],
      category: "impact"
    },
    {
      id: "security-compliance",
      title: "Security & Compliance",
      value: "60%",
      description: "Vulnerability exposure reduction achieving SOC2 compliance",
      icon: Award,
      color: "text-solarized-orange",
      percentage: 60,
      details: [
        "Achieved SOC2 Type II compliance certification",
        "Implemented comprehensive security frameworks",
        "Mitigated data breaches and security vulnerabilities",
        "Enhanced client data protection measures"
      ],
      category: "security"
    },
    {
      id: "automation-efficiency",
      title: "Automation Efficiency",
      value: "80%",
      description: "Infrastructure provisioning time reduction through automation",
      icon: Target,
      color: "text-solarized-red",
      percentage: 80,
      details: [
        "Terraform modules streamlined provisioning by 80%",
        "CI/CD pipelines accelerated development cycles by 35%",
        "Automated support operations reducing manual toil by 75%",
        "GitOps workflows enabling continuous deployment"
      ],
      category: "operational"
    },
    {
      id: "team-satisfaction",
      title: "Team Satisfaction",
      value: "90%",
      description: "High-profile customer and internal team satisfaction scores",
      icon: CheckCircle,
      color: "text-solarized-violet",
      percentage: 90,
      details: [
        "Boosted high-profile customer satisfaction to 90%",
        "Elevated internal team satisfaction by 20%",
        "Led cross-functional teams improving scalability by 40%",
        "Mentored junior engineers and knowledge sharing"
      ],
      category: "leadership"
    }
  ]

  const categories: { id: string; name: string; icon: LucideIcon }[] = [
    { id: "all", name: "All Achievements", icon: Sparkles },
    { id: "financial", name: "Financial Impact", icon: DollarSign },
    { id: "operational", name: "Operational Excellence", icon: Activity },
    { id: "performance", name: "Performance", icon: Zap },
    { id: "impact", name: "User Impact", icon: Users },
    { id: "security", name: "Security", icon: Shield },
    { id: "leadership", name: "Leadership", icon: Award }
  ]

  const filteredAchievements = selectedCategory === "all" 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory)

  useEffect(() => {
    const timer = setTimeout(() => setMetricsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const totalSavings = achievements
    .filter(a => a.category === "financial")
    .reduce((sum, a) => {
      const value = parseFloat(a.value.replace(/[$M+K,]/g, ''))
      return sum + (a.value.includes('M') ? value : value / 1000)
    }, 0)

  return (
    <section id="achievements" className="py-20 bg-muted relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-solarized-green animate-pulse" 
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 mono">
            $ grep -r &quot;achievements&quot; ~/career/*
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mono">
            # Quantifiable impact across cloud infrastructure, AI platforms, and team leadership
          </p>
        </div>

        {/* Summary metrics */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
          metricsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-gradient-to-br from-solarized-green/20 to-solarized-cyan/20 backdrop-blur-sm rounded-xl p-8 border border-solarized-green/30 text-center">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="text-solarized-green mr-3" size={32} />
              <span className="text-4xl font-bold text-solarized-green mono">
                <AnimatedCounter end={21.2} suffix="M+" prefix="$" decimals={1} />
              </span>
            </div>
            <p className="text-muted-foreground mono">Total Financial Impact</p>
          </div>
          
          <div className="bg-gradient-to-br from-solarized-blue/20 to-solarized-violet/20 backdrop-blur-sm rounded-xl p-8 border border-solarized-blue/30 text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="text-solarized-blue mr-3" size={32} />
              <span className="text-4xl font-bold text-solarized-blue mono">
                <AnimatedCounter end={100} suffix="K+" />
              </span>
            </div>
            <p className="text-muted-foreground mono">Users Served</p>
          </div>
          
          <div className="bg-gradient-to-br from-solarized-orange/20 to-solarized-red/20 backdrop-blur-sm rounded-xl p-8 border border-solarized-orange/30 text-center">
            <div className="flex items-center justify-center mb-4">
              <Award className="text-solarized-orange mr-3" size={32} />
              <span className="text-4xl font-bold text-solarized-orange mono">
                <AnimatedCounter end={8} />
              </span>
            </div>
            <p className="text-muted-foreground mono">Major Achievements</p>
          </div>
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
                    ? "bg-solarized-green text-solarized-base3 border-solarized-green shadow-lg shadow-solarized-green/30"
                    : "bg-card text-muted-foreground border-border hover:border-solarized-green/50 hover:text-foreground"
                }`}
              >
                <Icon size={16} className="mr-2" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Achievements grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredAchievements.map((achievement, index) => {
            const Icon = achievement.icon
            const isHovered = hoveredAchievement === achievement.id

            return (
              <div
                key={achievement.id}
                className={`group relative bg-card rounded-xl border border-border p-8 transition-all duration-500 hover:shadow-2xl hover:border-solarized-green/50 transform hover:scale-[1.02] ${
                  achievement.category === "financial" ? "ring-2 ring-solarized-green/20" : ""
                }`}
                onMouseEnter={() => setHoveredAchievement(achievement.id)}
                onMouseLeave={() => setHoveredAchievement(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg bg-gradient-to-br from-${achievement.color.replace('text-', '')}/20 to-${achievement.color.replace('text-', '')}/10 border border-${achievement.color.replace('text-', '')}/30`}>
                      <Icon size={32} className={achievement.color} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-foreground mono group-hover:text-solarized-green transition-colors">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mono">
                        {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-3xl font-bold mono ${achievement.color}`}>
                      {achievement.value}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 mono text-sm leading-relaxed">
                  {achievement.description}
                </p>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground mono">Impact Level</span>
                    <span className={`mono font-medium ${achievement.color}`}>
                      {achievement.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-solarized-green to-solarized-cyan transition-all duration-2000 ease-out`}
                      style={{ 
                        width: metricsVisible ? `${achievement.percentage}%` : "0%",
                        transitionDelay: `${index * 200 + 500}ms`
                      }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className={`space-y-2 transition-all duration-300 ${
                  isHovered ? "opacity-100 max-h-96" : "opacity-70 max-h-20 overflow-hidden"
                }`}>
                  <h4 className="text-sm font-medium text-solarized-green mono mb-3 flex items-center">
                    <BarChart3 size={14} className="mr-2" />
                    KEY ACHIEVEMENTS
                  </h4>
                  {achievement.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start text-sm">
                      <CheckCircle size={14} className="text-solarized-green mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground mono">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-solarized-green/5 to-solarized-cyan/5 rounded-xl transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                } pointer-events-none`} />
              </div>
            )
          })}
        </div>

        {/* Footer stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-solarized-green/10 to-solarized-cyan/10 backdrop-blur-sm rounded-full border border-solarized-green/30">
            <TrendingUp className="text-solarized-green mr-3" size={24} />
            <span className="text-lg font-medium text-foreground mono">
              Consistent track record of delivering measurable business impact through technical excellence
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Achievements