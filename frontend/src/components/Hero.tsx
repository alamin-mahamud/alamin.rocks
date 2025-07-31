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
      {/* Background particles/grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="border border-solarized-base1 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-up">
          {/* Enhanced Terminal-style greeting */}
          <div className="mb-8 bg-solarized-base03/90 rounded-lg p-4 max-w-2xl mx-auto backdrop-blur-sm border border-solarized-green/30">
            <div className="flex items-center mb-2">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-solarized-red"></div>
                <div className="w-3 h-3 rounded-full bg-solarized-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-solarized-green"></div>
              </div>
              <Terminal size={16} className="text-solarized-green" />
              <span className="text-solarized-green ml-2 text-sm mono">alamin@portfolio:~$ whoami</span>
            </div>
            <div className="text-left text-solarized-base0 mono text-sm">
              <span className="text-solarized-blue">{displayText}</span>
              <span className={`text-solarized-green ${isTyping ? 'animate-pulse' : 'opacity-0'}`}>|</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 mono">
            Hi, I&apos;m{" "}
            <span className="text-solarized-blue relative">
              Alamin!
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-solarized-green rounded-full animate-ping"></div>
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed mono">
            Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.
          </p>

          {/* Animated metrics */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto transition-all duration-1000 ${metricsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-solarized-green/30 hover:border-solarized-green/60 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <Cloud className="text-solarized-blue mr-2" size={24} />
                <span className="text-2xl font-bold text-solarized-green mono">$1M+</span>
              </div>
              <p className="text-sm text-muted-foreground mono">Cloud Cost Savings</p>
            </div>

            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-solarized-cyan/30 hover:border-solarized-cyan/60 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <Zap className="text-solarized-cyan mr-2" size={24} />
                <span className="text-2xl font-bold text-solarized-cyan mono">$20M+</span>
              </div>
              <p className="text-sm text-muted-foreground mono">SaaS ARR Impact</p>
            </div>

            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-solarized-magenta/30 hover:border-solarized-magenta/60 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <Code className="text-solarized-magenta mr-2" size={24} />
                <span className="text-2xl font-bold text-solarized-magenta mono">10+</span>
              </div>
              <p className="text-sm text-muted-foreground mono">Years Experience</p>
            </div>
          </div>

          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com/alamin-mahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-lg bg-card/80 backdrop-blur-sm hover:bg-solarized-base03 transition-all duration-300 border border-solarized-green/30 hover:border-solarized-green hover:shadow-lg hover:shadow-solarized-green/20 transform hover:scale-105"
            >
              <Github size={24} className="text-foreground group-hover:text-solarized-green transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/alamin-mahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-lg bg-card/80 backdrop-blur-sm hover:bg-solarized-base03 transition-all duration-300 border border-solarized-blue/30 hover:border-solarized-blue hover:shadow-lg hover:shadow-solarized-blue/20 transform hover:scale-105"
            >
              <Linkedin size={24} className="text-foreground group-hover:text-solarized-blue transition-colors" />
            </a>
            <a
              href="mailto:hello@alamin.rocks"
              className="group p-4 rounded-lg bg-card/80 backdrop-blur-sm hover:bg-solarized-base03 transition-all duration-300 border border-solarized-cyan/30 hover:border-solarized-cyan hover:shadow-lg hover:shadow-solarized-cyan/20 transform hover:scale-105"
            >
              <Mail size={24} className="text-foreground group-hover:text-solarized-cyan transition-colors" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={scrollToProjects}
              className="group px-8 py-4 bg-gradient-to-r from-solarized-green to-solarized-cyan text-solarized-base3 rounded-lg hover:from-solarized-cyan hover:to-solarized-blue transition-all duration-300 mono font-medium transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Code size={20} className="mr-2" />
                View My Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <a
              href="#contact"
              className="group px-8 py-4 border-2 border-solarized-green text-foreground rounded-lg hover:bg-solarized-green hover:text-solarized-base3 transition-all duration-300 mono font-medium transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Terminal size={20} className="mr-2" />
                Get In Touch
              </span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToProjects}
            className="p-3 rounded-full bg-solarized-green/20 backdrop-blur-sm border border-solarized-green/30 hover:border-solarized-green hover:bg-solarized-green/30 transition-all duration-300"
          >
            <ArrowDown size={24} className="text-solarized-green" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
