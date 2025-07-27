const About = () => {
  const skills = [
    "Python",
    "Go",
    "TypeScript",
    "Kubernetes",
    "AWS/GCP/Azure",
    "Terraform",
    "Docker",
    "PostgreSQL",
    "Redis",
    "FastAPI",
    "Nest.JS",
    "Next.JS",
    "Prometheus/Grafana",
    "Ansible",
    "Jenkins/GitHub Actions",
    "Elasticsearch"
  ]

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 mono">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mono">
            A multi-dimensional thinker with a global mindset, systems-level thinking, and a relentless execution habit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed mono">
              Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.
              Currently working as Senior DevOps Engineer at Kahf Yazılım A.Ş. and Senior Software Engineer at LeadSync.ai.
            </p>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed mono">
              Previously Senior Platform Engineer & SRE at BriteCore Inc where I generated $20M+ ARR and cut $1M+ cloud costs.
              I specialize in cloud architecture, Kubernetes, Infrastructure as Code, and building highly available SaaS platforms.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-background rounded border border-border text-sm text-foreground mono hover:bg-solarized-base2 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6 mono"># Quick Facts</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">location:</span>
                <span className="text-solarized-blue mono">Istanbul, Turkey / Remote</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">experience:</span>
                <span className="text-solarized-green mono">10+ Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">focus:</span>
                <span className="text-solarized-cyan mono">DevOps & SRE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground mono">interests:</span>
                <span className="text-solarized-magenta mono">Cloud Architecture, AI, Podcasting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About