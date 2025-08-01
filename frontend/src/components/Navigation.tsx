"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Terminal, Code2 } from "lucide-react"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const navItems = [
    { name: "Home", href: "/", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Goals", href: "#goals-mission", id: "goals-mission" },
    { name: "Podcast", href: "/podcast", id: "podcast" },
    { name: "Contact", href: "#contact", id: "contact" },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id)
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id)
    setIsOpen(false)
    
    if (href.startsWith("#")) {
      // Check if we're on the home page
      if (window.location.pathname === "/") {
        // We're on home page, scroll to section
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        // We're on a different page, navigate to home page with hash
        window.location.href = `/${href}`
      }
    }
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-background/98 backdrop-blur-lg border-b border-border/80 shadow-lg shadow-accent/5" 
        : "bg-background/90 backdrop-blur-md"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}>
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
            onClick={() => handleNavClick("/", "home")}
          >
            <div className="relative">
              <Terminal size={20} className="text-accent transition-all duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-accent/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold text-foreground mono group-hover:text-accent transition-colors duration-200">
              Alamin<span className="text-accent">.</span>rocks
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 mono text-sm ${
                    isActive
                      ? "text-accent bg-accent/10 shadow-md shadow-accent/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-pulse" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative p-2 rounded-lg hover:bg-muted/80 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isOpen ? (
                <X size={22} className="text-foreground transition-transform duration-200 rotate-180" />
              ) : (
                <Menu size={22} className="text-foreground transition-transform duration-200" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? "max-h-96 opacity-100 bg-background/98 backdrop-blur-lg border-t border-border/80" 
          : "max-h-0 opacity-0"
      }`}>
        <div className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.href, item.id)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 mono text-base ${
                  isActive
                    ? "text-accent bg-accent/10 border border-accent/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? 'slideInFromRight 0.3s ease-out forwards' : 'none'
                }}
              >
                <span>{item.name}</span>
                {isActive && (
                  <Code2 size={16} className="text-accent animate-pulse" />
                )}
              </Link>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navigation