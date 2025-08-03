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

// Translation Types
export interface Language {
  code: string
  name: string
  native_name: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface TranslationKey {
  key: string
  category: string
  description?: string
  created_at: string
  updated_at: string
}

export interface TranslationValue {
  id: number
  key: string
  language_code: string
  value: string
  created_at: string
  updated_at: string
}

export interface Translation {
  id: number
  table_name: string
  record_id: string
  field_name: string
  language_code: string
  content: string
  created_at: string
  updated_at: string
}

export interface TranslationsResponse {
  language_code: string
  translations: Record<string, string>
}

export interface LanguagesResponse {
  languages: Language[]
}

// Translated Content Types
export interface TranslatedHero {
  id: string
  name: string
  metrics: Record<string, string>
  roles?: string[]
  description?: string
  translations?: Record<string, Record<string, any>>
  created_at: string
  updated_at: string
}

export interface TranslatedAbout {
  id: string
  skills: string[]
  title?: string
  description?: string[]
  quick_facts?: Record<string, string>
  translations?: Record<string, Record<string, any>>
  created_at: string
  updated_at: string
}

export interface TranslatedProject {
  id: string
  technologies: string[]
  github_url?: string
  live_url?: string
  demo_url?: string
  image_url?: string
  featured: boolean
  impact: Record<string, any>
  stats: Record<string, any>
  status: string
  ai_powered: boolean
  title?: string
  description?: string
  long_description?: string
  category?: string
  translations?: Record<string, Record<string, string>>
  created_at: string
  updated_at: string
}

export interface TranslatedTechSkill {
  id: string
  name: string
  level: number
  years_exp: number
  icon: string
  color: string
  projects: number
  category?: string
  translations?: Record<string, Record<string, string>>
  created_at: string
  updated_at: string
}

export interface TranslatedAchievement {
  id: string
  value: string
  icon: string
  color: string
  percentage: number
  category: string
  title?: string
  description?: string
  details?: string[]
  translations?: Record<string, Record<string, any>>
  created_at: string
  updated_at: string
}

export interface TranslatedExperience {
  id: string
  company: string
  duration: string
  current: boolean
  technologies: string[]
  website?: string
  role?: string
  location?: string
  achievements?: string[]
  translations?: Record<string, Record<string, any>>
  created_at: string
  updated_at: string
}

export interface TranslatedContactInfo {
  id: string
  email: string
  phone?: string
  social_links: Record<string, string>
  location?: string
  translations?: Record<string, Record<string, string>>
  created_at: string
  updated_at: string
}

export interface TranslationCompleteness {
  completeness: Record<string, Record<string, number>>
}