import { Github, Linkedin, Mail, Terminal } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted text-foreground py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 mono text-accent">alamin@rocks:~$</h3>
            <p className="text-muted-foreground mb-4 mono">
              # DevOps Engineer & SRE<br/>
              # Building scalable cloud platforms<br/>
              # 10+ years experience
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/alamin-mahamud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-all duration-200 hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/alamin-mahamud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-all duration-200 hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:hello@alamin.rocks"
                className="text-muted-foreground hover:text-accent transition-all duration-200 hover:scale-110"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 mono text-accent">$ ls navigation/</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-accent transition-colors mono">
                  ./about.md
                </a>
              </li>
              <li>
                <a href="#experience" className="text-muted-foreground hover:text-accent transition-colors mono">
                  ./experience.log
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-accent transition-colors mono">
                  ./projects/
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-accent transition-colors mono">
                  ./contact.sh
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 mono text-accent">$ cat tech_stack.txt</h4>
            <div className="text-muted-foreground mono text-sm">
              <p># Cloud & DevOps</p>
              <p>AWS | GCP | Azure | Kubernetes</p>
              <p>Terraform | Ansible | Docker</p>
              <p></p>
              <p># Languages & Frameworks</p>
              <p>Python | Go | TypeScript</p>
              <p>FastAPI | Nest.JS | Next.JS</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center mono">
            <Terminal size={16} className="mr-2 text-accent" />
            Built with passion © {currentYear} Alamin Mahamud
            <Terminal size={16} className="ml-2 text-accent" />
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
