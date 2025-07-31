// API utility functions with fallback to static data

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Generic API client with retry and fallback logic
class ApiClient {
  private baseUrl: string
  private timeout: number

  constructor(baseUrl: string = API_BASE_URL, timeout: number = 5000) {
    this.baseUrl = baseUrl
    this.timeout = timeout
  }

  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  async get<T>(endpoint: string, fallbackData?: T): Promise<T> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.warn(`API call failed for ${endpoint}:`, error)
      
      if (fallbackData) {
        console.log(`Using fallback data for ${endpoint}`)
        return fallbackData
      }
      
      throw error
    }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

export const apiClient = new ApiClient()

// Type definitions
export interface Project {
  id: string
  title: string
  description: string
  long_description?: string
  technologies: string[]
  github_url?: string
  live_url?: string
  demo_url?: string
  image_url?: string
  featured: boolean
  category: string
  impact: Record<string, any>
  stats: Record<string, any>
  status: 'completed' | 'in-progress' | 'maintained'
  ai_powered?: boolean
}

export interface Achievement {
  id: string
  title: string
  value: string
  description: string
  icon: string
  color: string
  percentage: number
  details: string[]
  category: string
}

export interface TechSkill {
  id: string
  name: string
  category: string
  level: number
  years_exp: number
  icon: string
  color: string
  projects: number
}

export interface LinkedInRecommendation {
  id: string
  recommender_name: string
  recommender_title: string
  recommender_company: string
  recommender_image?: string
  relationship: string
  content: string
  date: string
  skills_mentioned: string[]
}

export interface Hero {
  id: string
  roles: string[]
  name: string
  description: string
  metrics: Record<string, string>
}

export interface About {
  id: string
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

export interface ContactInfo {
  id: string
  email: string
  phone: string
  location: string
  social_links: Record<string, string>
}

// API service functions with fallback data
export const portfolioApi = {
  // Projects
  async getProjects(params?: { featured?: boolean; category?: string; limit?: number }): Promise<Project[]> {
    const searchParams = new URLSearchParams()
    if (params?.featured !== undefined) searchParams.append('featured', params.featured.toString())
    if (params?.category) searchParams.append('category', params.category)
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    
    const endpoint = `/projects${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    return apiClient.get<Project[]>(endpoint, FALLBACK_DATA.projects)
  },

  async getProject(id: string): Promise<Project> {
    const project = await apiClient.get<Project>(`/projects/${id}`, 
      FALLBACK_DATA.projects.find(p => p.id === id)
    )
    return project
  },

  // Achievements
  async getAchievements(params?: { category?: string; limit?: number }): Promise<Achievement[]> {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.append('category', params.category)
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    
    const endpoint = `/achievements${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    return apiClient.get<Achievement[]>(endpoint, FALLBACK_DATA.achievements)
  },

  // Tech Stack
  async getTechSkills(params?: { category?: string; min_level?: number; limit?: number }): Promise<TechSkill[]> {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.append('category', params.category)
    if (params?.min_level) searchParams.append('min_level', params.min_level.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    
    const endpoint = `/techstack${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    return apiClient.get<TechSkill[]>(endpoint, FALLBACK_DATA.techSkills)
  },

  // LinkedIn Recommendations
  async getRecommendations(params?: { limit?: number; recent?: boolean }): Promise<LinkedInRecommendation[]> {
    const searchParams = new URLSearchParams()
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.recent) searchParams.append('recent', params.recent.toString())
    
    const endpoint = `/recommendations${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    return apiClient.get<LinkedInRecommendation[]>(endpoint, FALLBACK_DATA.recommendations)
  },

  // Hero
  async getHero(): Promise<Hero> {
    return apiClient.get<Hero>('/hero', FALLBACK_DATA.hero)
  },

  // About
  async getAbout(): Promise<About> {
    return apiClient.get<About>('/about', FALLBACK_DATA.about)
  },

  // Contact Info
  async getContactInfo(): Promise<ContactInfo> {
    return apiClient.get<ContactInfo>('/contact-info', FALLBACK_DATA.contactInfo)
  },

  // Contact form submission
  async submitContactForm(data: {
    name: string
    email: string
    subject?: string
    message: string
  }): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/contact', data)
  }
}

// Fallback static data - this matches the current static data in components
const FALLBACK_DATA = {
  hero: {
    id: "hero",
    roles: [
      "Senior DevOps Engineer",
      "AI Products Engineer", 
      "Site Reliability Engineer",
      "Cloud Architect",
      "Platform Engineer",
      "Co-Founder & CSO",
      "Founder & Host"
    ],
    name: "Alamin Mahamud",
    description: "Strategic technology leader with 10+ years of expertise in building scalable cloud platforms, leading DevOps + SRE teams, and architecting AI-powered solutions that drive $20M+ ARR and serve 100K+ users globally.",
    metrics: {
      cost_savings: "$1.2M+",
      saas_arr: "$20M+", 
      experience: "10+",
      users_served: "100K+",
      uptime_sla: "99.99%",
      total_impact: "$21.2M+"
    }
  },

  about: {
    id: "about",
    title: "About Me",
    description: [
      "I'm a **strategic technology leader** dedicated to architecting and scaling **innovative cloud-native solutions** for global enterprises, with a strong **entrepreneurial spirit** that drives startup growth. Over the past **10+ years**, I've successfully built next-generation **Event-driven SaaS platforms**, led transformative **DevOps and SRE initiatives**, and consistently delivered **measurable impact**.",
      
      "Currently serving dual roles as **Senior DevOps Engineer** at [Kahf Yazılım A.Ş.](https://kahf.co) and **Senior Software Engineer - AI Products** at [LeadSync.ai](https://leadsync.ai), where I'm **migrating entire infrastructure from Azure to Bare-metal** and building **AI-powered Model Customization Platforms (MCP)** that accelerate time-to-market by **40%**.",
      
      "Previously at **BriteCore Inc** for **5 years 5 months**, I **generated $20M+ ARR** by designing and implementing highly available, cost-efficient SaaS platforms, while **cutting $1M+ cloud costs** through intelligent optimization strategies. I've **maintained 99.99% uptime** across 50+ client environments and **eliminated 30% of production brownouts** through advanced monitoring and automation.",
      
      "Beyond my technical expertise, I'm the **Founder & Host** of [Source Code Podcast](https://sourcecode.alamin.rocks) since **March 2025** and **Founder & Platform Architect** at [Dark Knight Technologies](https://darkknight.tech) since **November 2023**, where I empower businesses by building **highly scalable, fault-tolerant applications** with robust cybersecurity.",
      
      "I'm also a **Co-Founder & CSO** at **AK2 Tech** (August 2024 - April 2025), where I built **next-generation AI-powered solutions** to assist on-call support, spearheaded product strategy and GTM, secured initial customer traction in **Bangladesh and Southeast Asia**, and grew the internal team to **10+ members across 3 time zones**."
    ],
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
        icon: "TrendingUp",
        title: "$21.2M+ Total Impact",
        description: "$20M+ SaaS ARR + $1.2M+ cost savings"
      },
      {
        icon: "Users",
        title: "100K+ Users Served",
        description: "Across multiple platforms and projects"
      },
      {
        icon: "Award",
        title: "99.99% Uptime",
        description: "Reliable systems across 50+ client environments"
      }
    ]
  },

  contactInfo: {
    id: "contact",
    email: "hello@alamin.rocks",
    phone: "+880 168 7060 434",
    location: "Istanbul, Turkey",
    social_links: {
      github: "https://github.com/alamin-mahamud",
      linkedin: "https://linkedin.com/in/alamin-mahamud",
      twitter: "https://twitter.com/alamin_rocks"
    }
  },

  projects: [
    {
      id: "1",
      title: "AI-Powered Model Customization Platform (MCP)",
      description: "Revolutionary LLM integration platform that accelerated time-to-market by 40% and boosted qualified lead discovery by 25%.",
      long_description: "End-to-end integration platform for advanced large language models featuring semantic enrichment, personalized AI-driven recommendations, and custom model fine-tuning capabilities. Built for enterprise-scale deployment with real-time inference optimization at LeadSync.ai.",
      technologies: ["MCP Protocol", "LLM Integration", "AI-SDK", "TypeScript", "PostgreSQL", "Nest.JS", "Next.JS", "Python", "TensorFlow"],
      github_url: "https://github.com/leadsync-ai/mcp-platform",
      live_url: "https://leadsync.ai",
      demo_url: "https://demo.leadsync.ai",
      featured: true,
      category: "AI/ML",
      impact: {
        users: 50000,
        performance: "40% faster time-to-market",
        savings: "$2M+ in development costs"
      },
      stats: {
        stars: 342,
        forks: 67,
        commits: 1240,
        contributors: 8
      },
      status: "maintained" as const,
      ai_powered: true
    },
    {
      id: "2",
      title: "Enterprise SaaS Platform - BriteCore",
      description: "Generated $20M+ ARR by designing highly available, cost-efficient SaaS platforms for 50+ enterprise clients.",
      long_description: "Comprehensive enterprise SaaS platform featuring multi-tenant architecture, advanced monitoring, automated deployment pipelines, and cost optimization strategies. Achieved 99.99% uptime across 50+ client environments while cutting $1M+ in cloud costs through intelligent optimization.",
      technologies: ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "DataDog", "Prometheus", "Grafana", "Python", "PostgreSQL"],
      featured: true,
      category: "DevOps/SRE",
      impact: {
        savings: "$20M+ ARR + $1M+ cost reduction",
        users: 100000,
        reliability: "99.99% SLA maintained"
      },
      stats: {
        commits: 5000,
        contributors: 20,
        deployments: 200
      },
      status: "completed" as const
    },
    {
      id: "3",
      title: "HomeLab: GitOps Infrastructure",
      description: "Production-grade homelab automation framework with Kubernetes orchestration and Infrastructure as Code.",
      long_description: "Comprehensive homelab management system featuring GitOps workflows, automated service deployment, monitoring stack integration, and disaster recovery mechanisms. Supports multi-cloud deployment and hybrid infrastructure management with highly customizable framework.",
      technologies: ["Terraform", "Kubernetes", "Ansible", "GitOps", "ArgoCD", "Prometheus", "Grafana", "Traefik"],
      github_url: "https://github.com/alamin-mahamud/homelab",
      demo_url: "https://demo.homelab.alamin.rocks",
      featured: true,
      category: "Infrastructure",
      impact: {
        performance: "80% faster deployment",
        reliability: "Zero-downtime updates"
      },
      stats: {
        stars: 89,
        forks: 15,
        commits: 467,
        contributors: 2
      },
      status: "maintained" as const
    },
    {
      id: "4",
      title: "Alexandria: Multi-Cloud IaC Library",
      description: "Terraform modules library for enterprise-grade multi-cloud deployments across AWS, GCP, and Azure.",
      long_description: "Comprehensive Infrastructure as Code library providing reusable Terraform modules for complex cloud architectures. Features automated compliance checking, cost estimation, and security best practices enforcement for facilitating deployment and management of cloud-based architectures.",
      technologies: ["Terraform", "AWS", "GCP", "Azure", "Infrastructure as Code", "Compliance", "Security"],
      github_url: "https://github.com/alamin-mahamud/alexandria",
      featured: true,
      category: "Infrastructure",
      impact: {
        users: 200,
        performance: "60% faster infrastructure provisioning"
      },
      stats: {
        stars: 203,
        forks: 34,
        commits: 324,
        contributors: 6
      },
      status: "maintained" as const
    },
    {
      id: "5",
      title: "Capstone: Asset Allocation AI Solver",
      description: "Machine learning-powered optimization engine for strategic resource allocation in complex environments.",
      long_description: "Advanced optimization system using genetic algorithms and reinforcement learning to solve multi-constraint asset allocation problems. The solution is akin to strategy games where optimal resource allocation is key, designed for financial portfolio management and strategic resource planning.",
      technologies: ["Python", "TensorFlow", "Optimization Algorithms", "Reinforcement Learning", "Mathematical Modeling"],
      github_url: "https://github.com/alamin-mahamud/capstone",
      demo_url: "https://asset-optimizer.alamin.rocks",
      featured: false,
      category: "AI/ML",
      impact: {
        performance: "35% better allocation efficiency"
      },
      stats: {
        stars: 45,
        forks: 8,
        commits: 156,
        contributors: 1
      },
      status: "completed" as const,
      ai_powered: true
    },
    {
      id: "6",
      title: "AlterYouth: Social Impact Platform",
      description: "C2C scholarship platform enabling global scholarship funding through digital banking for Bangladesh students.",
      long_description: "Revolutionary 'The Uber for Scholarships' - C2C scholarship app enabling users worldwide to start scholarships directly for financially struggling students in Government Primary Schools of Bangladesh through digital banking integration with secure payment processing.",
      technologies: ["Full-Stack Development", "Digital Banking", "Payment Processing", "React", "Node.js", "Blockchain"],
      github_url: "https://github.com/alamin-mahamud/alteryouth",
      live_url: "https://alteryouth.com",
      featured: false,
      category: "Social Impact",
      impact: {
        users: 10000,
        savings: "$500K+ in scholarships distributed"
      },
      stats: {
        stars: 67,
        forks: 12,
        commits: 289,
        contributors: 3
      },
      status: "completed" as const
    },
    {
      id: "7",
      title: "AK2 Tech: AI-Powered On-Call Solutions",
      description: "Next-generation AI-powered solutions to assist on-call support with customer traction across Southeast Asia.",
      long_description: "Co-founded startup building AI-powered solutions for on-call support automation. Spearheaded product strategy and go-to-market initiatives, secured initial customer traction in Bangladesh and Southeast Asia, and grew internal team to 10+ members across 3 time zones. Currently raising pre-seed strategic investment.",
      technologies: ["AI/ML", "Python", "TypeScript", "Kubernetes", "AWS", "Product Strategy", "GTM"],
      featured: false,
      category: "AI/ML",
      impact: {
        users: 5000,
        performance: "Secured initial customer traction",
        team: "10+ members across 3 time zones"
      },
      stats: {
        commits: 800,
        contributors: 10
      },
      status: "in-progress" as const,
      ai_powered: true
    }
  ],

  achievements: [
    {
      id: "cloud-savings",
      title: "Cloud Cost Optimization",
      value: "$1.2M+",
      description: "Total cloud infrastructure cost savings achieved",
      icon: "DollarSign",
      color: "text-accent",
      percentage: 100,
      details: [
        "Optimized AWS CloudWatch log ingestion saving $36.5K/year",
        "Implemented intelligent resource rightsizing algorithms",
        "Automated cost monitoring and alert systems",
        "Cross-functional team leadership for cost optimization initiatives"
      ],
      category: "financial"
    },
    {
      id: "saas-arr",
      title: "SaaS ARR Generation",
      value: "$20M+",
      description: "Annual Recurring Revenue contribution to SaaS platforms",
      icon: "TrendingUp",
      color: "text-accent",
      percentage: 100,
      details: [
        "Designed and maintained highly available SaaS platforms",
        "Implemented scalable cloud architectures",
        "Enhanced platform reliability and performance",
        "Drove customer retention through system optimization"
      ],
      category: "financial"
    },
    {
      id: "platform-reliability",
      title: "System Reliability",
      value: "99.99%",
      description: "Uptime SLA maintained across 50+ client environments",
      icon: "Shield",
      color: "text-accent",
      percentage: 99.99,
      details: [
        "Advanced monitoring and alerting systems",
        "Blue/green deployment strategies eliminating downtime",
        "Proactive incident response and resolution",
        "Comprehensive disaster recovery planning"
      ],
      category: "operational"
    },
    {
      id: "performance-improvement",
      title: "Performance Optimization",
      value: "40%",
      description: "Average performance improvement across systems",
      icon: "Zap",
      color: "text-warning",
      percentage: 40,
      details: [
        "Accelerated time-to-market by 40% with MCP platform",
        "Reduced page load times by 90% through caching",
        "Eliminated 30% of production brownouts",
        "Optimized runtime configuration and state management"
      ],
      category: "performance"
    },
    {
      id: "user-impact",
      title: "User Base Served",
      value: "100K+",
      description: "Active users across deployed platforms and systems",
      icon: "Users",
      color: "text-accent",
      percentage: 100,
      details: [
        "LeadSync.ai platform serving 50K+ users",
        "AlterYouth scholarship platform with 10K+ users",
        "HomeLab framework adopted by 200+ users",
        "Enterprise platforms serving 50+ B2B clients"
      ],
      category: "impact"
    },
    {
      id: "security-compliance",
      title: "Security & Compliance",
      value: "60%",
      description: "Vulnerability exposure reduction achieving SOC2 compliance",
      icon: "Award",
      color: "text-accent",
      percentage: 60,
      details: [
        "Achieved SOC2 Type II compliance certification",
        "Implemented comprehensive security frameworks",
        "Mitigated data breaches and security vulnerabilities",
        "Enhanced client data protection measures"
      ],
      category: "security"
    },
    {
      id: "automation-efficiency",
      title: "Automation Efficiency",
      value: "80%",
      description: "Infrastructure provisioning time reduction through automation",
      icon: "Target",
      color: "text-accent",
      percentage: 80,
      details: [
        "Terraform modules streamlined provisioning by 80%",
        "CI/CD pipelines accelerated development cycles by 35%",
        "Automated support operations reducing manual toil by 75%",
        "GitOps workflows enabling continuous deployment"
      ],
      category: "operational"
    },
    {
      id: "team-satisfaction",
      title: "Team Satisfaction",
      value: "90%",
      description: "High-profile customer and internal team satisfaction scores",
      icon: "CheckCircle",
      color: "text-accent",
      percentage: 90,
      details: [
        "Boosted high-profile customer satisfaction to 90%",
        "Elevated internal team satisfaction by 20%",
        "Led cross-functional teams improving scalability by 40%",
        "Mentored junior engineers and knowledge sharing"
      ],
      category: "leadership"
    }
  ],

  techSkills: [
    // Programming Languages
    { id: "python", name: "Python", category: "programming", level: 95, years_exp: 8, icon: "Code", color: "text-yellow-400", projects: 45 },
    { id: "go", name: "Go", category: "programming", level: 85, years_exp: 4, icon: "Code", color: "text-blue-400", projects: 12 },
    { id: "typescript", name: "TypeScript", category: "programming", level: 90, years_exp: 6, icon: "Code", color: "text-blue-600", projects: 35 },
    { id: "javascript", name: "JavaScript", category: "programming", level: 88, years_exp: 7, icon: "Code", color: "text-yellow-300", projects: 40 },
    
    // Web Frameworks
    { id: "fastapi", name: "FastAPI", category: "programming", level: 92, years_exp: 4, icon: "Code", color: "text-green-500", projects: 15 },
    { id: "nestjs", name: "Nest.JS", category: "programming", level: 88, years_exp: 3, icon: "Code", color: "text-red-500", projects: 8 },
    { id: "nextjs", name: "Next.JS", category: "programming", level: 85, years_exp: 3, icon: "Code", color: "text-gray-700", projects: 12 },
    { id: "gin", name: "Gin", category: "programming", level: 80, years_exp: 2, icon: "Code", color: "text-blue-500", projects: 6 },
    { id: "flask", name: "Flask", category: "programming", level: 85, years_exp: 5, icon: "Code", color: "text-gray-600", projects: 18 },
    { id: "django", name: "Django", category: "programming", level: 82, years_exp: 4, icon: "Code", color: "text-green-600", projects: 14 },
    
    // Cloud Platforms
    { id: "aws", name: "AWS", category: "cloud", level: 95, years_exp: 7, icon: "Cloud", color: "text-orange-500", projects: 50 },
    { id: "gcp", name: "GCP", category: "cloud", level: 80, years_exp: 3, icon: "Cloud", color: "text-blue-500", projects: 15 },
    { id: "azure", name: "Azure", category: "cloud", level: 88, years_exp: 5, icon: "Cloud", color: "text-blue-600", projects: 25 },
    
    // Container & Orchestration
    { id: "docker", name: "Docker", category: "system", level: 95, years_exp: 8, icon: "Server", color: "text-blue-500", projects: 60 },
    { id: "kubernetes", name: "Kubernetes", category: "system", level: 92, years_exp: 6, icon: "Server", color: "text-blue-600", projects: 35 },
    { id: "ecs", name: "ECS", category: "cloud", level: 85, years_exp: 4, icon: "Cloud", color: "text-orange-400", projects: 20 },
    { id: "eks", name: "EKS", category: "cloud", level: 88, years_exp: 4, icon: "Cloud", color: "text-orange-500", projects: 18 },
    
    // Infrastructure as Code  
    { id: "terraform", name: "Terraform", category: "system", level: 95, years_exp: 6, icon: "Server", color: "text-purple-500", projects: 40 },
    { id: "ansible", name: "Ansible", category: "system", level: 90, years_exp: 5, icon: "Server", color: "text-red-600", projects: 25 },
    { id: "cloudformation", name: "CloudFormation", category: "cloud", level: 80, years_exp: 4, icon: "Cloud", color: "text-orange-400", projects: 15 },
    
    // Databases & Caching
    { id: "postgresql", name: "PostgreSQL", category: "database", level: 92, years_exp: 8, icon: "Database", color: "text-blue-700", projects: 45 },
    { id: "mysql", name: "MySQL", category: "database", level: 85, years_exp: 6, icon: "Database", color: "text-blue-600", projects: 30 },
    { id: "redis", name: "Redis", category: "database", level: 88, years_exp: 5, icon: "Database", color: "text-red-500", projects: 28 },
    { id: "elasticsearch", name: "Elasticsearch", category: "database", level: 85, years_exp: 4, icon: "Database", color: "text-yellow-600", projects: 15 },
    
    // Monitoring & Observability
    { id: "prometheus", name: "Prometheus", category: "monitoring", level: 90, years_exp: 5, icon: "Activity", color: "text-orange-600", projects: 25 },
    { id: "grafana", name: "Grafana", category: "monitoring", level: 92, years_exp: 5, icon: "Activity", color: "text-orange-500", projects: 30 },
    { id: "datadog", name: "DataDog", category: "monitoring", level: 88, years_exp: 4, icon: "Activity", color: "text-purple-600", projects: 20 },
    { id: "cloudwatch", name: "CloudWatch", category: "monitoring", level: 85, years_exp: 6, icon: "Activity", color: "text-orange-400", projects: 35 },
    { id: "loki", name: "Loki", category: "monitoring", level: 80, years_exp: 3, icon: "Activity", color: "text-orange-400", projects: 12 },
    
    // CI/CD & DevOps
    { id: "github-actions", name: "GitHub Actions", category: "system", level: 95, years_exp: 5, icon: "Server", color: "text-gray-700", projects: 50 },
    { id: "jenkins", name: "Jenkins", category: "system", level: 82, years_exp: 4, icon: "Server", color: "text-blue-600", projects: 18 },
    { id: "argocd", name: "ArgoCD", category: "system", level: 85, years_exp: 3, icon: "Server", color: "text-blue-500", projects: 15 },
    { id: "helm", name: "Helm", category: "system", level: 88, years_exp: 4, icon: "Server", color: "text-blue-600", projects: 25 },
    
    // AI & ML
    { id: "mcp-protocol", name: "MCP Protocol", category: "programming", level: 90, years_exp: 1, icon: "Code", color: "text-purple-500", projects: 5 },
    { id: "llm-integration", name: "LLM Integration", category: "programming", level: 85, years_exp: 1, icon: "Code", color: "text-purple-600", projects: 8 },
    { id: "ai-sdk", name: "AI-SDK", category: "programming", level: 82, years_exp: 1, icon: "Code", color: "text-purple-400", projects: 6 },
    { id: "tensorflow", name: "TensorFlow", category: "programming", level: 75, years_exp: 2, icon: "Code", color: "text-orange-500", projects: 4 }
  ],

  recommendations: [
    {
      id: "rec-1",
      recommender_name: "Sarah Johnson",
      recommender_title: "Senior Engineering Manager",
      recommender_company: "BriteCore Inc",
      recommender_image: "",
      relationship: "worked directly with",
      content: "Alamin is an exceptional DevOps engineer who transformed our infrastructure at BriteCore. His expertise in cloud cost optimization saved us over $1M annually while maintaining 99.99% uptime. He has a unique ability to balance technical excellence with business impact, making him invaluable to any organization.",
      date: "2024-11-15",
      skills_mentioned: ["DevOps", "Kubernetes", "Cost Optimization", "CI/CD", "Infrastructure"]
    }
    // Add more fallback recommendations here...
  ]
}

// Utility function to check if API is available
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000) // 3 second timeout
    })
    return response.ok
  } catch (error) {
    console.warn('API health check failed:', error)
    return false
  }
}