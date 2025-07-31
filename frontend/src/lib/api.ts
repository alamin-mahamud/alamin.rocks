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
      "Platform Engineer"
    ],
    name: "Alamin Mahamud",
    description: "Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.",
    metrics: {
      cost_savings: "$1M+",
      saas_arr: "$20M+", 
      experience: "10+"
    }
  },

  about: {
    id: "about",
    title: "About Me",
    description: [
      "Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams. Currently working as Senior DevOps Engineer at Kahf Yazılım A.Ş. and Senior Software Engineer at LeadSync.ai.",
      "Previously Senior Platform Engineer & SRE at BriteCore Inc where I generated $20M+ ARR and cut $1M+ cloud costs. I specialize in cloud architecture, Kubernetes, Infrastructure as Code, and building highly available SaaS platforms.",
      "A multi-dimensional thinker with a global mindset, systems-level thinking, and a relentless execution habit."
    ],
    skills: [
      "Python", "Go", "TypeScript", "Kubernetes", "AWS/GCP/Azure", "Terraform", 
      "Docker", "PostgreSQL", "Redis", "FastAPI", "Nest.JS", "Next.JS", 
      "Prometheus/Grafana", "Ansible", "Jenkins/GitHub Actions", "Elasticsearch"
    ],
    quick_facts: {
      location: "Istanbul, Turkey / Remote",
      experience: "10+ Years", 
      focus: "DevOps & SRE",
      interests: "Cloud Architecture, AI, Podcasting"
    }
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
      long_description: "End-to-end integration platform for advanced large language models featuring semantic enrichment, personalized AI-driven recommendations, and custom model fine-tuning capabilities. Built for enterprise-scale deployment with real-time inference optimization.",
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
    }
    // Add more fallback projects here...
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
    }
    // Add more fallback achievements here...
  ],

  techSkills: [
    {
      id: "python",
      name: "Python",
      category: "programming",
      level: 95,
      years_exp: 8,
      icon: "Code",
      color: "text-yellow-400",
      projects: 45
    }
    // Add more fallback tech skills here...
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