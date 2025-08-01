"use client"

import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import About from "@/components/About"
import TechStack from "@/components/TechStack"
import Achievements from "@/components/Achievements"
import Terminal from "@/components/Terminal"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import LinkedInRecommendations from "@/components/LinkedInRecommendations"
import Training from "@/components/Training"
import Certifications from "@/components/Certifications"
import Education from "@/components/Education"
import SocialImpact from "@/components/SocialImpact"
import DailyRituals from "@/components/DailyRituals"
import Hobbies from "@/components/Hobbies"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import AIAssistant from "@/components/AIAssistant"
import { useEffect } from "react"

export default function Home() {
  // Handle hash navigation when page loads
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1))
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [])
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md">
        Skip to main content
      </a>
      
      <header role="banner">
        <Navigation />
      </header>
      
      <main id="main-content" role="main" tabIndex={-1}>
        <Hero />
        <About />
        <TechStack />
        <Achievements />
        <Terminal />
        <Experience />
        <Projects />
        <LinkedInRecommendations />
        <Training />
        <Certifications />
        <Education />
        <SocialImpact />
        <DailyRituals />
        <Hobbies />
        <Contact />
      </main>
      
      <footer id="footer" role="contentinfo">
        <Footer />
      </footer>
      
      <AIAssistant />
    </>
  )
}