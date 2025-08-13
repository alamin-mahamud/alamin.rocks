import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Contact API
export const contactApi = {
  getMessages: () => api.get('/api/v1/contact/messages'),
  getMessage: (id: string) => api.get(`/api/v1/contact/messages/${id}`),
  getStats: () => api.get('/api/v1/contact/stats'),
  markAsRead: (id: string) => api.patch(`/api/v1/contact/messages/${id}/read`),
  markAsReplied: (id: string) => api.patch(`/api/v1/contact/messages/${id}/replied`),
  deleteMessage: (id: string) => api.delete(`/api/v1/contact/messages/${id}`),
}

// Portfolio API
export const portfolioApi = {
  getProjects: (featured?: boolean) => {
    const params = featured !== undefined ? { featured } : {}
    return api.get('/api/v1/portfolio/projects', { params })
  },
  getProject: (id: string) => api.get(`/api/v1/portfolio/projects/${id}`),
  createProject: (data: any) => api.post('/api/v1/portfolio/projects', data),
  updateProject: (id: string, data: any) => api.patch(`/api/v1/portfolio/projects/${id}`, data),
  deleteProject: (id: string) => api.delete(`/api/v1/portfolio/projects/${id}`),
}

// Resume API
export const resumeApi = {
  getResume: () => api.get('/api/v1/resume'),
  getContact: () => api.get('/api/v1/resume/contact'),
  getExperience: (currentOnly?: boolean) => {
    const params = currentOnly !== undefined ? { current_only: currentOnly } : {}
    return api.get('/api/v1/resume/experience', { params })
  },
  getProjects: (featuredOnly?: boolean) => {
    const params = featuredOnly !== undefined ? { featured_only: featuredOnly } : {}
    return api.get('/api/v1/resume/projects', { params })
  },
  getSkills: () => api.get('/api/v1/resume/skills'),
  getEducation: () => api.get('/api/v1/resume/education'),
  getAwards: () => api.get('/api/v1/resume/awards'),
  getCertifications: () => api.get('/api/v1/resume/certifications'),
  getCommunityEngagement: () => api.get('/api/v1/resume/community'),
}

// Translation API
export const translationApi = {
  getLanguages: () => api.get('/api/translations/languages'),
  getUITranslations: (languageCode: string = 'en') => api.get(`/api/translations/ui/${languageCode}`),
  getHero: (lang: string = 'en') => api.get('/api/translations/hero', { params: { lang } }),
  getAbout: (lang: string = 'en') => api.get('/api/translations/about', { params: { lang } }),
  getContactInfo: (lang: string = 'en') => api.get('/api/translations/contact', { params: { lang } }),
  getProjects: (lang: string = 'en', featured: boolean = false) => 
    api.get('/api/translations/projects', { params: { lang, featured } }),
  getTechSkills: (lang: string = 'en') => api.get('/api/translations/tech-skills', { params: { lang } }),
  getAchievements: (lang: string = 'en') => api.get('/api/translations/achievements', { params: { lang } }),
  getExperiences: (lang: string = 'en') => api.get('/api/translations/experiences', { params: { lang } }),
  getCompleteness: () => api.get('/api/translations/completeness'),
  
  // Admin endpoints for managing translations
  updateContentTranslation: (tableName: string, recordId: string, fieldName: string, languageCode: string, content: string) =>
    api.post(`/api/translations/content/${tableName}/${recordId}/${fieldName}`, null, {
      params: { language_code: languageCode, content }
    }),
  updateUITranslation: (key: string, languageCode: string, value: string) =>
    api.post(`/api/translations/ui/${key}`, null, {
      params: { language_code: languageCode, value }
    }),
  deleteContentTranslation: (tableName: string, recordId: string, fieldName: string, languageCode: string) =>
    api.delete(`/api/translations/content/${tableName}/${recordId}/${fieldName}`, {
      params: { language_code: languageCode }
    }),
}

// Analytics API
export const analyticsApi = {
  getOverview: (days?: number) => api.get('/api/analytics/overview', { params: { days } }),
  getTraffic: (days?: number) => api.get('/api/analytics/traffic', { params: { days } }),
  getMessages: (days?: number) => api.get('/api/analytics/messages', { params: { days } }),
  getProjects: () => api.get('/api/analytics/projects'),
  getSkills: () => api.get('/api/analytics/skills'),
}

// Hero API
export const heroApi = {
  getHero: () => api.get('/api/hero'),
}

// About API  
export const aboutApi = {
  getAbout: () => api.get('/api/about'),
}

// Tech Stack API
export const techStackApi = {
  getTechSkills: (category?: string, minLevel?: number) => {
    const params: any = {}
    if (category) params.category = category
    if (minLevel) params.min_level = minLevel
    return api.get('/api/techstack', { params })
  },
  getTechSkill: (id: string) => api.get(`/api/techstack/${id}`),
  getCategories: () => api.get('/api/techstack/categories/list'),
  getSummary: () => api.get('/api/techstack/summary/stats'),
}

// Achievements API
export const achievementsApi = {
  getAchievements: (category?: string) => {
    const params = category ? { category } : {}
    return api.get('/api/achievements', { params })
  },
  getAchievement: (id: string) => api.get(`/api/achievements/${id}`),
}

// Recommendations API
export const recommendationsApi = {
  getRecommendations: (limit?: number, recent?: boolean) => {
    const params: any = {}
    if (limit) params.limit = limit
    if (recent) params.recent = recent
    return api.get('/api/recommendations', { params })
  },
  getRecommendation: (id: string) => api.get(`/api/recommendations/${id}`),
  getSkillsMentioned: () => api.get('/api/recommendations/skills/mentioned'),
  getSummary: () => api.get('/api/recommendations/summary/stats'),
}

// Contact Info API
export const contactInfoApi = {
  getContactInfo: () => api.get('/api/contact-info'),
}

export default api
