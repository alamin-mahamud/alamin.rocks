import { Github, Linkedin, Mail, Twitter, Youtube, MapPin, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const Footer = () => {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#techstack" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Training", href: "#training" },
    { name: "Education", href: "#education" }
  ]

  const moreLinks = [
    { name: "Social Impact", href: "#social-impact" },
    { name: "Daily Rituals", href: "#daily-rituals" },
    { name: "Hobbies", href: "#hobbies" },
    { name: "Podcast", href: "/podcast" },
    { name: "Recommendations", href: "#linkedin-recommendations" },
    { name: "Contact", href: "#contact" }
  ]

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/alamin-mahamud", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/alamin-mahamud", icon: Linkedin },
    { name: "Email", href: "mailto:hello@alamin.rocks", icon: Mail },
    { name: "Twitter", href: "https://twitter.com/alamin_mahamud", icon: Twitter },
    { name: "Podcast", href: "https://sourcecode.alamin.rocks", icon: Youtube }
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">A</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Alamin<span className="text-accent">.</span>rocks
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Strategic technology leader building scalable cloud-native solutions and empowering global communities through mentorship and innovation.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Istanbul, Turkey / Remote</span>
            </div>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200 hover:scale-105"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Portfolio</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">More</h4>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Stats */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Impact</h4>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-accent">$21M+</div>
                <div className="text-xs text-muted-foreground">Total Business Impact</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-accent">1600+</div>
                <div className="text-xs text-muted-foreground">People Helped</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-accent">200+</div>
                <div className="text-xs text-muted-foreground">Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© {currentYear} Alamin Mahamud. All rights reserved.</span>
              <span className="hidden md:block">•</span>
              <span className="flex items-center gap-1">
                Built with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> and lots of ☕
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
