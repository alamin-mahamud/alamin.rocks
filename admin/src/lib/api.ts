import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8120',
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

export default api
