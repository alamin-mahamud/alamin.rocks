'use client'

import { useState, useEffect } from 'react'
import { AuthWrapper } from '@/components/AuthWrapper'
import { Layout } from '@/components/Layout'
import { translationApi } from '@/lib/api'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Language, 
  TranslationsResponse, 
  TranslationCompleteness,
  TranslatedHero,
  TranslatedAbout,
  TranslatedProject,
  TranslatedExperience 
} from '@/types'

export default function TranslationsPage() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  const [uiTranslations, setUITranslations] = useState<Record<string, string>>({})
  const [completeness, setCompleteness] = useState<Record<string, Record<string, number>>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Content data
  const [heroData, setHeroData] = useState<TranslatedHero | null>(null)
  const [aboutData, setAboutData] = useState<TranslatedAbout | null>(null)
  const [projectsData, setProjectsData] = useState<TranslatedProject[]>([])
  const [experiencesData, setExperiencesData] = useState<TranslatedExperience[]>([])

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (selectedLanguage) {
      loadContentForLanguage(selectedLanguage)
    }
  }, [selectedLanguage])

  const loadData = async () => {
    try {
      setLoading(true)
      const [languagesRes, completenessRes] = await Promise.all([
        translationApi.getLanguages(),
        translationApi.getCompleteness()
      ])
      
      setLanguages(languagesRes.data.languages)
      setCompleteness(completenessRes.data.completeness)
      
      // Set default language
      if (languagesRes.data.languages.length > 0) {
        setSelectedLanguage(languagesRes.data.languages[0].code)
      }
    } catch (err) {
      setError('Failed to load translation data')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadContentForLanguage = async (langCode: string) => {
    try {
      const [uiRes, heroRes, aboutRes, projectsRes, experiencesRes] = await Promise.all([
        translationApi.getUITranslations(langCode),
        translationApi.getHero(langCode),
        translationApi.getAbout(langCode),
        translationApi.getProjects(langCode, true), // Featured projects only
        translationApi.getExperiences(langCode)
      ])

      setUITranslations(uiRes.data.translations)
      setHeroData(heroRes.data)
      setAboutData(aboutRes.data)
      setProjectsData(projectsRes.data)
      setExperiencesData(experiencesRes.data)
    } catch (err) {
      console.error('Error loading content for language:', err)
    }
  }

  const updateUITranslation = async (key: string, value: string) => {
    try {
      await translationApi.updateUITranslation(key, selectedLanguage, value)
      setUITranslations(prev => ({ ...prev, [key]: value }))
    } catch (err) {
      console.error('Error updating UI translation:', err)
    }
  }

  const updateContentTranslation = async (
    tableName: string, 
    recordId: string, 
    fieldName: string, 
    content: string
  ) => {
    try {
      await translationApi.updateContentTranslation(tableName, recordId, fieldName, selectedLanguage, content)
      // Refresh the specific content
      await loadContentForLanguage(selectedLanguage)
    } catch (err) {
      console.error('Error updating content translation:', err)
    }
  }

  const getTranslatedValue = (
    data: any, 
    fieldName: string, 
    fallback: string = ''
  ): string => {
    if (data?.translations?.[selectedLanguage]?.[fieldName]) {
      const value = data.translations[selectedLanguage][fieldName]
      return typeof value === 'string' ? value : JSON.stringify(value)
    }
    return fallback
  }

  const getCompleteness = (tableName: string, langCode: string): number => {
    return completeness[tableName]?.[langCode] || 0
  }

  if (loading) {
    return (
      <AuthWrapper>
        <Layout>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading translations...</p>
            </div>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }

  if (error) {
    return (
      <AuthWrapper>
        <Layout>
          <div className="flex items-center justify-center py-12">
            <Card className="p-8 max-w-md text-center">
              <h2 className="text-xl font-bold text-destructive mb-4">Error</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={loadData} variant="secondary">Retry</Button>
            </Card>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }

  return (
    <AuthWrapper>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Translation Management</h1>
            <p className="text-muted-foreground">Manage multilingual content for the portfolio website</p>
          </div>

          {/* Language Selector */}
          <Card>
            <h2 className="text-lg font-semibold text-foreground mb-4">Select Language</h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLanguage === lang.code ? 'primary' : 'secondary'}
                  onClick={() => setSelectedLanguage(lang.code)}
                  size="sm"
                >
                  {lang.native_name} ({lang.code})
                </Button>
              ))}
            </div>
          </Card>

          {/* Translation Completeness */}
          <Card>
            <h2 className="text-lg font-semibold text-foreground mb-4">Translation Completeness</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(completeness).map(([tableName, langData]) => (
                <div key={tableName} className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2 capitalize">{tableName}</h3>
                  {Object.entries(langData).map(([langCode, percentage]) => (
                    <div key={langCode} className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{langCode.toUpperCase()}</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-border rounded-full h-2 mr-2">
                          <div
                            className="bg-accent h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-foreground">{Math.round(percentage)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>

          {/* UI Translations */}
          <Card>
            <h2 className="text-lg font-semibold text-foreground mb-4">UI Translations ({selectedLanguage.toUpperCase()})</h2>
            <div className="space-y-4">
              {Object.entries(uiTranslations).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-4">
                  <div className="w-48 text-sm text-muted-foreground truncate" title={key}>
                    {key}
                  </div>
                  <Input
                    value={value}
                    onChange={(e) => updateUITranslation(key, e.target.value)}
                    className="flex-1"
                    placeholder="Translation value"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Hero Content */}
          {heroData && (
            <Card>
              <h2 className="text-lg font-semibold text-foreground mb-4">Hero Section ({selectedLanguage.toUpperCase()})</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    value={getTranslatedValue(heroData, 'description', heroData.description || '')}
                    onChange={(e) => updateContentTranslation('hero', 'hero', 'description', e.target.value)}
                    className="admin-input min-h-[80px]"
                    rows={3}
                    placeholder="Hero description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Roles (JSON Array)</label>
                  <textarea
                    value={getTranslatedValue(heroData, 'roles', JSON.stringify(heroData.roles || []))}
                    onChange={(e) => updateContentTranslation('hero', 'hero', 'roles', e.target.value)}
                    className="admin-input font-mono text-sm min-h-[100px]"
                    rows={4}
                    placeholder='["Role 1", "Role 2", "Role 3"]'
                  />
                </div>
              </div>
            </Card>
          )}

        {/* About Content */}
        {aboutData && (
          <Card>
            <h2 className="text-lg font-semibold text-foreground mb-4">About Section ({selectedLanguage.toUpperCase()})</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <Input
                  value={getTranslatedValue(aboutData, 'title', aboutData.title || '')}
                  onChange={(e) => updateContentTranslation('about', 'about', 'title', e.target.value)}
                  placeholder="About section title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description (JSON Array)</label>
                <textarea
                  value={getTranslatedValue(aboutData, 'description', JSON.stringify(aboutData.description || []))}
                  onChange={(e) => updateContentTranslation('about', 'about', 'description', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/20 transition-colors duration-150 font-mono min-h-[120px]"
                  rows={6}
                  placeholder='["Paragraph 1", "Paragraph 2"]'
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Quick Facts (JSON Object)</label>
                <textarea
                  value={getTranslatedValue(aboutData, 'quick_facts', JSON.stringify(aboutData.quick_facts || {}))}
                  onChange={(e) => updateContentTranslation('about', 'about', 'quick_facts', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/20 transition-colors duration-150 font-mono min-h-[80px]"
                  rows={4}
                  placeholder='{"location": "City, Country", "experience": "X Years"}'
                />
              </div>
            </div>
          </Card>
        )}

        {/* Featured Projects */}
        {projectsData.length > 0 && (
          <Card>
            <h2 className="text-lg font-semibold text-foreground mb-4">Featured Projects ({selectedLanguage.toUpperCase()})</h2>
            <div className="space-y-6">
              {projectsData.map((project) => (
                <div key={project.id} className="border border-border rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3">Project: {project.id}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                      <Input
                        value={getTranslatedValue(project, 'title', project.title || '')}
                        onChange={(e) => updateContentTranslation('projects', project.id, 'title', e.target.value)}
                        placeholder="Project title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                      <Input
                        value={getTranslatedValue(project, 'category', project.category || '')}
                        onChange={(e) => updateContentTranslation('projects', project.id, 'category', e.target.value)}
                        placeholder="Project category"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                      <textarea
                        value={getTranslatedValue(project, 'description', project.description || '')}
                        onChange={(e) => updateContentTranslation('projects', project.id, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/20 transition-colors duration-150 min-h-[60px]"
                        rows={3}
                        placeholder="Project description"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Long Description</label>
                      <textarea
                        value={getTranslatedValue(project, 'long_description', project.long_description || '')}
                        onChange={(e) => updateContentTranslation('projects', project.id, 'long_description', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/20 transition-colors duration-150 min-h-[80px]"
                        rows={4}
                        placeholder="Detailed project description"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Experiences */}
        {experiencesData.length > 0 && (
          <Card>
            <h2 className="text-lg font-semibold text-foreground mb-4">Experiences ({selectedLanguage.toUpperCase()})</h2>
            <div className="space-y-6">
              {experiencesData.map((experience) => (
                <div key={experience.id} className="border border-border rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3">
                    Experience: {experience.company} ({experience.id})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                      <Input
                        value={getTranslatedValue(experience, 'role', experience.role || '')}
                        onChange={(e) => updateContentTranslation('experiences', experience.id, 'role', e.target.value)}
                        placeholder="Job role/title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                      <Input
                        value={getTranslatedValue(experience, 'location', experience.location || '')}
                        onChange={(e) => updateContentTranslation('experiences', experience.id, 'location', e.target.value)}
                        placeholder="Work location"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Achievements (JSON Array)</label>
                      <textarea
                        value={getTranslatedValue(experience, 'achievements', JSON.stringify(experience.achievements || []))}
                        onChange={(e) => updateContentTranslation('experiences', experience.id, 'achievements', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/20 transition-colors duration-150 font-mono min-h-[80px]"
                        rows={4}
                        placeholder='["Achievement 1", "Achievement 2"]'
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
        </div>
      </Layout>
    </AuthWrapper>
  )
}