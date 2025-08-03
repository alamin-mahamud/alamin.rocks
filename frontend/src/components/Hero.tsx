"use client"

import { useState, useEffect } from "react"
import { ArrowDown, Github, Linkedin, Mail, Terminal, Code, Cloud, Zap } from "lucide-react"
import { portfolioApi, Hero as HeroType } from "@/lib/api"
import { useLanguage } from "@/contexts/LanguageContext"

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [metricsVisible, setMetricsVisible] = useState(false)
  const [heroData, setHeroData] = useState<HeroType | null>(null)
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()


  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Comprehensive static hero data from resume
  const staticHeroData: HeroType = {
    id: "hero",
    roles: [
      "Senior DevOps Engineer",
      "AI Products Engineer", 
      "Site Reliability Engineer",
      "Cloud Architect",
      "Platform Engineer",
      "Co-Founder & CSO",
      "Founder & Host"
    ],
    name: "Alamin Mahamud",
    description: "Strategic technology leader with 10+ years of expertise in building scalable cloud platforms, leading DevOps + SRE teams, and architecting AI-powered solutions that drive $20M+ ARR and serve 100K+ users globally.",
    metrics: {
      cost_savings: "$1.2M+",
      saas_arr: "$20M+", 
      experience: "10+",
      users_served: "100K+",
      uptime_sla: "99.99%",
      total_impact: "$21.2M+"
    }
  }

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await portfolioApi.getHero()
        setHeroData(data)
      } catch (error) {
        console.error("Failed to fetch hero data:", error)
        // Use static data as fallback
        setHeroData(staticHeroData)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroData()
    setTimeout(() => setMetricsVisible(true), 1000)
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (!heroData) return
    
    const roles = heroData.roles

    const role = roles[currentRole]
    let index = 0
    setDisplayText("")
    setIsTyping(true)

    const typeInterval = setInterval(() => {
      if (index < role.length) {
        setDisplayText(role.substring(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)

        // Wait before switching to next role
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [currentRole, heroData])

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-up">
          {/* Clean role display */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border border-border/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {displayText}
                <span className={`ml-1 ${isTyping ? 'animate-pulse' : 'opacity-0'}`}>|</span>
              </span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-foreground mb-6 tracking-tight">
            {t('hero.greeting')},{" "}
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              {heroData?.name.split(' ')[0] || 'Alamin'}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {heroData?.description || 'Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.'}
          </p>

          {/* Metrics */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto transition-all duration-1000 ${metricsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">{heroData?.metrics?.total_impact || '$21.2M+'}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t('hero.totalImpact')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">{heroData?.metrics?.users_served || '100K+'}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t('hero.usersServed')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">{heroData?.metrics?.uptime_sla || '99.99%'}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t('hero.uptimeSla')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">{heroData?.metrics?.experience || '10+'}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t('hero.yearsExperience')}</div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-12">
            <a
              href="https://github.com/alamin-mahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost group hover:text-accent"
            >
              <Github size={20} className="transition-all duration-200 group-hover:scale-110" />
            </a>
            <a
              href="https://linkedin.com/in/alamin-mahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost group hover:text-accent"
            >
              <Linkedin size={20} className="transition-all duration-200 group-hover:scale-110" />
            </a>
            <a
              href="mailto:hello@alamin.rocks"
              className="btn btn-ghost group hover:text-accent"
            >
              <Mail size={20} className="transition-all duration-200 group-hover:scale-110" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={scrollToProjects}
              className="btn btn-primary btn-lg group relative overflow-hidden"
            >
              <Code size={18} className="mr-2 transition-transform duration-200 group-hover:scale-110" />
              {t('hero.viewProjects')}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <a
              href="#contact"
              className="btn btn-secondary btn-lg"
            >
              <Terminal size={18} className="mr-2" />
              {t('hero.contactMe')}
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToProjects}
            className="btn btn-ghost p-3 rounded-full hover:text-accent transition-colors duration-200"
          >
            <ArrowDown size={20} className="transition-transform duration-200 hover:scale-110" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
