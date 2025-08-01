'use client'

import { useState, useEffect } from 'react'
import { AuthWrapper } from '@/components/AuthWrapper'
import { Layout } from '@/components/Layout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  User, 
  Briefcase, 
  FolderOpen, 
  GraduationCap, 
  Award, 
  Certificate, 
  Code, 
  Users,
  Edit,
  Save,
  X
} from 'lucide-react'
import { Resume, Experience, SkillCategory } from '@/types'

// Mock resume data
const mockResume: Resume = {
  contact: {
    name: 'Md. Alamin Mahamud',
    email: 'hello@alamin.rocks',
    phone: '+880 168 7060 434',
    website: 'https://alamin.rocks',
    location: 'Istanbul, Turkey'
  },
  executive_summary: [
    'Dynamic technology leader with 10+ years of expertise in building scalable cloud platforms & leading DevOps + SRE teams.',
    'Proven track record of saving over $1M in cloud costs and contributing to SaaS ARR of $20M+.',
    'A multi-dimensional thinker with a global mindset, systems-level thinking, and a relentless execution habit.'
  ],
  experiences: [
    {
      id: '1',
      company: 'Kahf Yazılım A.Ş.',
      role: 'Senior DevOps Engineer',
      duration: 'May 2025 - July 2027',
      location: 'Istanbul, Turkey',
      current: true,
      achievements: [
        'On a mission to make online world safe & secure',
        'Migrating the entire infrastructure from Azure to Bare-metal'
      ],
      technologies: ['Bind9', 'CloudNative-PG', 'Kubernetes', 'Ansible', 'Terraform']
    }
  ],
  projects: [],
  education: [],
  awards: [],
  certifications: [],
  skills: [
    {
      category: 'SaaS Architecture, Development',
      skills: ['Python', 'Go', 'TypeScript', 'FastAPI', 'PostgreSQL']
    }
  ],
  community_engagement: [],
  updated_at: '2024-01-15T10:00:00Z'
}

interface EditableSection {
  section: string
  isEditing: boolean
}

export default function ResumePage() {
  const [resume, setResume] = useState<Resume>(mockResume)
  const [editingSections, setEditingSections] = useState<EditableSection[]>([])
  const [loading, setLoading] = useState(false)

  const isEditing = (section: string) => {
    return editingSections.some(es => es.section === section && es.isEditing)
  }

  const toggleEdit = (section: string) => {
    setEditingSections(prev => {
      const existing = prev.find(es => es.section === section)
      if (existing) {
        return prev.map(es =>
          es.section === section ? { ...es, isEditing: !es.isEditing } : es
        )
      } else {
        return [...prev, { section, isEditing: true }]
      }
    })
  }

  const handleSave = async (section: string) => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      console.log('Saving section:', section)
      toggleEdit(section)
    } catch (error) {
      console.error('Error saving section:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateContactInfo = (field: string, value: string) => {
    setResume(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }))
  }

  const updateExecutiveSummary = (index: number, value: string) => {
    setResume(prev => ({
      ...prev,
      executive_summary: prev.executive_summary.map((item, i) => 
        i === index ? value : item
      )
    }))
  }

  const addSummaryPoint = () => {
    setResume(prev => ({
      ...prev,
      executive_summary: [...prev.executive_summary, '']
    }))
  }

  const removeSummaryPoint = (index: number) => {
    setResume(prev => ({
      ...prev,
      executive_summary: prev.executive_summary.filter((_, i) => i !== index)
    }))
  }

  return (
    <AuthWrapper>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Resume Management</h1>
            <p className="text-muted-foreground">Update your resume content and information</p>
          </div>

          {/* Contact Information */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => isEditing('contact') ? handleSave('contact') : toggleEdit('contact')}
              >
                {isEditing('contact') ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              </Button>
            </div>

            {isEditing('contact') ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={resume.contact.name}
                  onChange={(e) => updateContactInfo('name', e.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  value={resume.contact.email}
                  onChange={(e) => updateContactInfo('email', e.target.value)}
                />
                <Input
                  label="Phone"
                  value={resume.contact.phone}
                  onChange={(e) => updateContactInfo('phone', e.target.value)}
                />
                <Input
                  label="Website"
                  type="url"
                  value={resume.contact.website || ''}
                  onChange={(e) => updateContactInfo('website', e.target.value)}
                />
                <Input
                  label="Location"
                  value={resume.contact.location}
                  onChange={(e) => updateContactInfo('location', e.target.value)}
                  className="md:col-span-2"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <p className="font-medium">{resume.contact.name}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <p className="font-medium">{resume.contact.email}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <p className="font-medium">{resume.contact.phone}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Website:</span>
                  <p className="font-medium">{resume.contact.website}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <p className="font-medium">{resume.contact.location}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Executive Summary */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Executive Summary</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => isEditing('summary') ? handleSave('summary') : toggleEdit('summary')}
              >
                {isEditing('summary') ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              </Button>
            </div>

            {isEditing('summary') ? (
              <div className="space-y-4">
                {resume.executive_summary.map((point, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <textarea
                      className="admin-input flex-1 min-h-[60px]"
                      value={point}
                      onChange={(e) => updateExecutiveSummary(index, e.target.value)}
                      placeholder="Enter summary point..."
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSummaryPoint(index)}
                      className="mt-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={addSummaryPoint}
                >
                  Add Point
                </Button>
              </div>
            ) : (
              <ul className="space-y-2">
                {resume.executive_summary.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Skills */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Skills</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => isEditing('skills') ? handleSave('skills') : toggleEdit('skills')}
              >
                {isEditing('skills') ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              </Button>
            </div>

            <div className="space-y-4">
              {resume.skills.map((skillCategory, index) => (
                <div key={index}>
                  <h4 className="font-medium text-foreground mb-2">{skillCategory.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-accent/10 text-accent text-sm rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <Briefcase className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{resume.experiences.length}</p>
              <p className="text-sm text-muted-foreground">Experience</p>
            </Card>
            <Card className="text-center">
              <FolderOpen className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{resume.projects.length}</p>
              <p className="text-sm text-muted-foreground">Projects</p>
            </Card>
            <Card className="text-center">
              <Code className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{resume.skills.length}</p>
              <p className="text-sm text-muted-foreground">Skill Categories</p>
            </Card>
            <Card className="text-center">
              <Certificate className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{resume.certifications.length}</p>
              <p className="text-sm text-muted-foreground">Certifications</p>
            </Card>
          </div>
        </div>
      </Layout>
    </AuthWrapper>
  )
}