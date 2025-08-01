// Contact Types
export interface ContactMessage {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  created_at: string
  status: string
}

export interface ContactRequest {
  name: string
  email: string
  subject?: string
  message: string
}

// Portfolio Types
export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  image_url?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface ProjectCreate {
  title: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  image_url?: string
  featured: boolean
}

// Resume Types
export interface ContactInfo {
  name: string
  email: string
  phone: string
  website?: string
  location: string
}

export interface Experience {
  id: string
  company: string
  role: string
  duration: string
  location: string
  current: boolean
  achievements: string[]
  technologies: string[]
  website?: string
}

export interface ResumeProject {
  id: string
  title: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  featured: boolean
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  duration: string
  gpa?: number
}

export interface Award {
  id: string
  title: string
  organization: string
  location: string
  year: string
  description?: string
}

export interface Certification {
  id: string
  name: string
  organization: string
  status: string
  year?: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface CommunityEngagement {
  id: string
  type: string
  platform: string
  description: string
  followers?: string
}

export interface Resume {
  contact: ContactInfo
  executive_summary: string[]
  experiences: Experience[]
  projects: ResumeProject[]
  education: Education[]
  awards: Award[]
  certifications: Certification[]
  skills: SkillCategory[]
  community_engagement: CommunityEngagement[]
  updated_at: string
}

// Admin Types
export interface AdminUser {
  id: string
  username: string
  email: string
  role: string
}

export interface DashboardStats {
  totalMessages: number
  totalProjects: number
  featuredProjects: number
  lastLogin?: string
}