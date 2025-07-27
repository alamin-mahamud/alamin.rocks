import { Github, Linkedin, Mail, Terminal } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-solarized-base02 text-solarized-base2 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 mono text-solarized-green">alamin@rocks:~$</h3>
            <p className="text-solarized-base1 mb-4 mono">
              # DevOps Engineer & SRE<br/>
              # Building scalable cloud platforms<br/>
              # 10+ years experience
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/alamin-mahamud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-solarized-base1 hover:text-solarized-green transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/alamin-mahamud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-solarized-base1 hover:text-solarized-green transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:hello@alamin.rocks"
                className="text-solarized-base1 hover:text-solarized-green transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 mono text-solarized-cyan">$ ls navigation/</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-solarized-base1 hover:text-solarized-green transition-colors mono">
                  ./about.md
                </a>
              </li>
              <li>
                <a href="#experience" className="text-solarized-base1 hover:text-solarized-green transition-colors mono">
                  ./experience.log
                </a>
              </li>
              <li>
                <a href="#projects" className="text-solarized-base1 hover:text-solarized-green transition-colors mono">
                  ./projects/
                </a>
              </li>
              <li>
                <a href="#contact" className="text-solarized-base1 hover:text-solarized-green transition-colors mono">
                  ./contact.sh
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 mono text-solarized-blue">$ cat tech_stack.txt</h4>
            <div className="text-solarized-base1 mono text-sm">
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

        <div className="border-t border-solarized-base01 mt-8 pt-8 text-center">
          <p className="text-solarized-base1 flex items-center justify-center mono">
            <Terminal size={16} className="mr-2 text-solarized-green" />
            Built with passion © {currentYear} Alamin Mahamud
            <Terminal size={16} className="ml-2 text-solarized-green" />
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
