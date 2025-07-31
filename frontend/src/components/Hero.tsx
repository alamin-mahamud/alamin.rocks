"use client"

import { useState, useEffect } from "react"
import { ArrowDown, Github, Linkedin, Mail, Terminal, Code, Cloud, Zap } from "lucide-react"

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [metricsVisible, setMetricsVisible] = useState(false)


  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    setTimeout(() => setMetricsVisible(true), 1000)
  }, [])

  // Typing animation effect
  useEffect(() => {
    const roles = [
      "Senior DevOps Engineer",
      "AI Products Engineer",
      "Site Reliability Engineer",
      "Cloud Architect",
      "Platform Engineer"
    ]

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
  }, [currentRole])

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
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              Alamin
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.
          </p>

          {/* Metrics */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto transition-all duration-1000 ${metricsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">$1M+</div>
              <div className="text-sm text-muted-foreground">Cloud Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">$20M+</div>
              <div className="text-sm text-muted-foreground">SaaS ARR Impact</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">10+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
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
              View My Work
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <a
              href="#contact"
              className="btn btn-secondary btn-lg"
            >
              <Terminal size={18} className="mr-2" />
              Get In Touch
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
