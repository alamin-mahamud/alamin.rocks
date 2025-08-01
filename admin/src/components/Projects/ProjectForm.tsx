'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Project, ProjectCreate } from '@/types'

interface ProjectFormProps {
  project?: Project
  onSubmit: (data: ProjectCreate) => void
  onCancel: () => void
  loading?: boolean
}

export function ProjectForm({ project, onSubmit, onCancel, loading }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectCreate>({
    title: project?.title || '',
    description: project?.description || '',
    technologies: project?.technologies || [],
    github_url: project?.github_url || '',
    live_url: project?.live_url || '',
    image_url: project?.image_url || '',
    featured: project?.featured || false
  })

  const [techInput, setTechInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }))
      setTechInput('')
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Project Title"
        value={formData.title}
        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        required
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Description
        </label>
        <textarea
          className="admin-input min-h-[100px]"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Technologies
        </label>
        <div className="flex space-x-2 mb-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Add technology"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
          />
          <Button type="button" onClick={addTechnology} variant="secondary">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-accent/10 text-accent text-sm rounded-md flex items-center"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="ml-2 text-accent hover:text-accent/70"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <Input
        label="GitHub URL"
        type="url"
        value={formData.github_url}
        onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
        placeholder="https://github.com/username/repo"
      />

      <Input
        label="Live URL"
        type="url"
        value={formData.live_url}
        onChange={(e) => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
        placeholder="https://example.com"
      />

      <Input
        label="Image URL"
        type="url"
        value={formData.image_url}
        onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
        placeholder="/images/projects/project.png"
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
          className="rounded border-border"
        />
        <label htmlFor="featured" className="text-sm font-medium text-foreground">
          Featured Project
        </label>
      </div>

      <div className="flex items-center space-x-4 pt-4">
        <Button type="submit" loading={loading}>
          {project ? 'Update' : 'Create'} Project
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}