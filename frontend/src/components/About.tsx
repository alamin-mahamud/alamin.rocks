"use client"

import React from "react"
import { ExternalLink, Award, Users, TrendingUp, MapPin, Calendar, Briefcase, Heart } from "lucide-react"
import TechnologiesText from "./ui/TechnologiesText"

interface AboutData {
  title: string
  description: string[]
  skills: string[]
  quick_facts: Record<string, string>
  recommendations?: {
    text: string
    author: string
    title: string
  }[]
  achievements?: {
    icon: any
    title: string
    description: string
  }[]
}

const About = () => {

  // Complete static data extracted from resume and LinkedIn profile
  const staticAboutData = {
    title: "About Me",
    description: [
      "I'm a **strategic technology leader** dedicated to architecting and scaling **innovative cloud-native solutions** for global enterprises, with a strong **entrepreneurial spirit** that drives startup growth. Over the past **10+ years**, I've successfully built next-generation **Event-driven SaaS platforms**, led transformative **DevOps and SRE initiatives**, and consistently delivered **measurable impact**.",
      
      "Currently serving dual roles as **Senior DevOps Engineer** at [Kahf Yazılım A.Ş.](https://kahf.co) and **Senior Software Engineer - AI Products** at [LeadSync.ai](https://leadsync.ai), where I'm **migrating entire infrastructure from Azure to Bare-metal** and building **AI-powered Model Customization Platforms (MCP)** that accelerate time-to-market by **40%**.",
      
      "Previously at **BriteCore Inc** for **5 years 5 months**, I **generated $20M+ ARR** by designing and implementing highly available, cost-efficient SaaS platforms, while **cutting $1M+ cloud costs** through intelligent optimization strategies. I've **maintained 99.99% uptime** across 50+ client environments and **eliminated 30% of production brownouts** through advanced monitoring and automation.",
      
      "Beyond my technical expertise, I'm the **Founder & Host** of [Source Code Podcast](https://sourcecode.alamin.rocks) since **March 2025** and **Founder & Platform Architect** at [Dark Knight Technologies](https://darkknight.tech) since **November 2023**, where I empower businesses by building **highly scalable, fault-tolerant applications** with robust cybersecurity.",
      
      "I'm also a **Co-Founder & CSO** at **AK2 Tech** (August 2024 - April 2025), where I built **next-generation AI-powered solutions** to assist on-call support, spearheaded product strategy and GTM, secured initial customer traction in **Bangladesh and Southeast Asia**, and grew the internal team to **10+ members across 3 time zones**."
    ],
    
    // Professional Experience Summary
    experience: [
      {
        company: "Kahf Yazılım A.Ş.",
        role: "Senior DevOps Engineer",
        duration: "July 2025 - Present",
        location: "Istanbul, Turkey",
        achievements: [
          "On a mission to make online world safe & secure",
          "Migrating entire infrastructure from Azure to Bare-metal"
        ],
        technologies: ["Bind9", "CloudNative-PG", "Kubernetes", "Ansible", "Terraform", "Microsoft Azure", "Traefik", "Helm Charts", "Prometheus", "Grafana", "Loki"]
      },
      {
        company: "LeadSync.ai",
        role: "Senior Software Engineer - AI Products",
        duration: "May 2025 - July 2025",
        location: "Singapore, Remote",
        achievements: [
          "Accelerated time-to-market by 40% by architecting end-to-end MCP integration with advanced LLMs",
          "Boosted qualified lead discovery by 25% through AI-driven lead scoring and semantic enrichment"
        ],
        technologies: ["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", "PostgreSQL", "Nest.JS", "Next.JS"]
      },
      {
        company: "BriteCore Inc",
        role: "Senior Platform Engineer & SRE",
        duration: "February 2022 - January 2025 (3 years)",
        location: "Springfield, MO, USA",
        achievements: [
          "Generated $20M+ ARR by designing highly available, cost-efficient SaaS platforms",
          "Cut $1M+ cloud bill by spearheading cost-saving initiatives",
          "Eliminated 30% of production brownouts through runtime optimization",
          "Accelerated development cycles by ~35% with CI/CD pipelines enabling 200+ daily builds",
          "Attained SOC2 compliance by lowering vulnerability exposure by ~60%",
          "Neutralized DDoS attacks blocking several thousand malicious requests per day",
          "Streamlined infrastructure provisioning by 80% using Terraform modules",
          "Enhanced production visibility by reducing MTTD by 80% through real-time dashboards"
        ],
        technologies: ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "DataDog", "Prometheus", "Grafana"]
      }
    ],

    // Complete LinkedIn Recommendations
    linkedinRecommendations: [
      {
        text: "I've had the pleasure of working with Alamin, whose **expertise in building cloud-driven SaaS platforms** is impressive. Alamin has guided **DevOps efforts with a focus on scalability, functionality, and efficiency**. Alamin is a **reliable, forward-thinking professional** who delivers **real business impact** through technology.",
        author: "Sunny Parekh",
        title: "Director of Information Security, Technology and Compliance",
        relationship: "Worked directly with Alamin"
      },
      {
        text: "I had the privilege of mentoring him during his 2018 internship where he worked with Django REST Framework. Even then, he stood out for his **technical prowess, problem-solving skills, and ability to deliver production-ready solutions**. His **curiosity and dedication to mastering complex concepts** were truly impressive.",
        author: "Omar Faruque Tuhin",
        title: "Leading Teams to Build Robust Solutions in Kubernetes & Node.js",
        relationship: "Mentored Alamin"
      },
      {
        text: "I rarely come across **real talents** who stand out like Alamin. Alamin's **ability to handle multiple projects** was unlike any I've seen before and made a **dramatic increase in the productivity level** of our company.",
        author: "Ilias Kanchan",
        title: "Kubernetes | CKA | AWS | Linux | RHCE | Ansible | Docker",
        relationship: "Worked with Alamin"
      },
      {
        text: "Alamin is a **problem solver and a very quick learner**. Worked with him in several services directly and found him very **passionate about what he does**. Wish him a very bright career ahead.",
        author: "Fazle Rabby",
        title: "Engineering Manager @ Wolt | DoorDash",
        relationship: "Worked with Alamin on several services"
      },
      {
        text: "It is rare that you come across a person like Alamin Mahamud. He has **transformed himself from a Mechanical Engineer to a professional Software Engineer**. He has built a **reputation in the dev community with his broad vision**. I recommend Alamin Mahamud highly as I know that he will **never let anyone down**.",
        author: "Ariful Islam",
        title: "Software Engineering | Android | Kotlin | Flutter | Node.Js | MongoDB",
        relationship: "Knows Alamin professionally"
      },
      {
        text: "Alamin was a **fantastic person to work with**, and is not only a **multi-skilled and insightful colleague**, but also an **inspiring strategist**. Very good person. Great employee with a **very strong problem solving skills**. He is an **asset to any company**.",
        author: "Al Amin Ibne Mosaddeque Chayan",
        title: "Principal Software Engineer | Certified Laravel Developer, Zend Certified Engineer",
        relationship: "Worked with Alamin"
      }
    ],

    achievements: [
      {
        icon: TrendingUp,
        title: "$21.2M+ Total Impact",
        description: "$20M+ SaaS ARR + $1.2M+ cost savings"
      },
      {
        icon: Users,
        title: "100K+ Users Served",
        description: "Across multiple platforms and projects"
      },
      {
        icon: Award,
        title: "99.99% Uptime",
        description: "Reliable systems across 50+ client environments"
      }
    ],

    // Comprehensive Skills from Resume
    skills: [
      // Programming Languages
      "Python", "Go", "TypeScript", "JavaScript",
      
      // Web Frameworks
      "FastAPI", "Nest.JS", "Next.JS", "Gin", "Flask", "Django",
      
      // Cloud Platforms
      "AWS", "GCP", "Azure",
      
      // Container & Orchestration
      "Docker", "Kubernetes", "ECS", "EKS", "Containerd", "LXC",
      
      // Infrastructure as Code
      "Terraform", "AWS CDK", "CloudFormation", "Ansible", "SaltStack",
      
      // CI/CD & DevOps
      "GitHub Actions", "Jenkins", "ArgoCD", "Helm", "Kustomize",
      
      // Databases & Caching
      "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "OpenSearch",
      
      // Monitoring & Observability
      "Prometheus", "Grafana", "DataDog", "CloudWatch", "Loki", "ELK Stack",
      
      // Networking & Security
      "Traefik", "Nginx", "Istio", "Calico", "pfSense", "VPN", "TLS", "BGP",
      
      // AI & ML
      "MCP Protocol", "LLM Integration", "AI-SDK", "TensorFlow",
      
      // Messaging & Queues
      "RabbitMQ",
      
      // Storage & Backup
      "Longhorn", "Ceph", "ZFS", "NFS", "TrueNAS",
      
      // Operating Systems
      "Linux", "Ubuntu", "Debian", "Arch"
    ],

    quick_facts: {
      location: "Istanbul, Turkey / Remote",
      experience: "10+ Years",
      focus: "AI, Cloud & MLOps",
      interests: "Source Code Podcast, Open Source, Mentoring",
      languages: "English (Native/Bilingual), Bangla (Native/Bilingual), Hindi (Native/Bilingual), Urdu (Full Professional), Turkish (Limited Working)",
      education: "BSc Mechanical Engineering, CUET (2013-2017)",
      certifications: "CKA (In-Progress), Observability with Grafana/Prometheus/Loki",
      awards: "Hackathon Champion & App Fest Runner-Up (2015)"
    },

    // Projects from Resume
    projects: [
      {
        name: "HomeLab",
        description: "Infrastructure as Code and GitOps framework for automating homelab provisioning and operations",
        technologies: ["Terraform", "Kubernetes", "Ansible", "GitOps", "ArgoCD"],
        type: "Infrastructure"
      },
      {
        name: "Alexandria",
        description: "Terraform library for Infrastructure as Code templates and modules for cloud-based architectures",
        technologies: ["Terraform", "AWS", "GCP", "Azure", "IaC"],
        type: "Infrastructure"
      },
      {
        name: "Capstone",
        description: "Asset Allocation Problem solver using optimization algorithms for strategic resource allocation",
        technologies: ["Python", "Optimization Algorithms", "Mathematical Modeling"],
        type: "AI/ML"
      },
      {
        name: "AlterYouth.com",
        description: "C2C scholarship platform enabling global scholarship funding through digital banking",
        technologies: ["Full-Stack Development", "Digital Banking", "Payment Processing"],
        type: "Social Impact"
      }
    ]
  }

  const formatDescription = (text: string) => {
    // Convert markdown-style bold to HTML
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1">$1<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>')
  }

  const data = staticAboutData

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A <strong className="text-foreground">multi-dimensional thinker</strong> with a <strong className="text-foreground">global mindset</strong>, 
            systems-level thinking, and a <strong className="text-foreground">relentless execution habit</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-6">
            {data.description?.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatDescription(paragraph) }}
              />
            ))}
          </div>

          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-accent" />
                Quick Facts
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location:
                  </span>
                  <span className="text-accent font-medium">{data.quick_facts?.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Experience:
                  </span>
                  <span className="text-accent font-medium">{data.quick_facts?.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Focus:
                  </span>
                  <span className="text-accent font-medium">{data.quick_facts?.focus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Interests:
                  </span>
                  <span className="text-accent font-medium">{data.quick_facts?.interests}</span>
                </div>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Key Achievements
              </h3>
              <div className="space-y-4">
                {data.achievements?.map((achievement, index) => {
                  const IconComponent = achievement.icon
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-accent/10 p-2 rounded-lg">
                        <IconComponent className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Technologies & Expertise */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Technologies & Expertise
          </h3>
          <TechnologiesText />
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://linkedin.com/in/alamin-mahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg group"
            >
              <Users className="w-5 h-5 mr-2" />
              Connect on LinkedIn
            </a>
            
            <a
              href="https://sourcecode.alamin.rocks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg group"
            >
              🎙️ Source Code Podcast
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About