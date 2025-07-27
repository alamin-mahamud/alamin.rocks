"use client"

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-up">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 mono">
            Hi, I&apos;m{" "}
            <span className="text-solarized-blue">
              Alamin!
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed mono">
            Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.
          </p>
          <p className="text-lg text-solarized-base01 mb-8 max-w-2xl mx-auto mono">
            Proven track record of saving over $1M in cloud costs and contributing to SaaS ARR of $20M+.
          </p>

          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com/alamin-mahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card hover:bg-muted transition-colors border border-border"
            >
              <Github size={24} className="text-foreground" />
            </a>
            <a
              href="https://linkedin.com/in/alamin-mahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card hover:bg-muted transition-colors border border-border"
            >
              <Linkedin size={24} className="text-foreground" />
            </a>
            <a
              href="mailto:hello@alamin.rocks"
              className="p-3 rounded-lg bg-card hover:bg-muted transition-colors border border-border"
            >
              <Mail size={24} className="text-foreground" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={scrollToProjects}
              className="px-8 py-3 bg-solarized-green text-solarized-base3 rounded-lg hover:bg-solarized-cyan transition-colors mono font-medium"
            >
              View My Work
            </button>
            <a
              href="#contact"
              className="px-8 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors mono font-medium"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToProjects}>
            <ArrowDown size={24} className="text-solarized-base1" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
