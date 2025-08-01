"use client"

import { useState, useEffect } from "react"
import { Github, Search } from "lucide-react"
import { portfolioApi, Project } from "@/lib/api"
import { generateProjects } from "@/lib/projectGenerator"
import ProjectCard from "./ProjectCard"
import Pagination from "./ui/Pagination"

const PROJECTS_PER_PAGE = 8
const PROJECTS_PER_PAGE_COMPACT = 12

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await portfolioApi.getProjects()
        // Generate additional projects to demonstrate pagination
        const generatedProjects = generateProjects(200)
        setProjects([...data, ...generatedProjects])
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery])


  if (loading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        </div>
      </section>
    )
  }

  const categories = ['all', 'AI/ML', 'DevOps/SRE', 'Infrastructure', 'Social Impact']
  
  // Filter projects by category and search query
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })
  
  // Pagination
  const projectsPerPage = viewMode === 'grid' ? PROJECTS_PER_PAGE : PROJECTS_PER_PAGE_COMPACT
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage)

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge AI & infrastructure projects with real-world impact
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-12 space-y-6">
          {/* Search bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          {/* Category filters and view mode */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
                >
                  {category === 'all' ? 'All Projects' : category}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={viewMode === 'compact' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
              >
                Compact
              </button>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="text-center mb-6 text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + projectsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
        </div>

        {/* Projects grid */}
        <div className={viewMode === 'grid' ? 'grid lg:grid-cols-2 gap-8' : 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'}>
          {paginatedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              compact={viewMode === 'compact'}
            />
          ))}
        </div>
        
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://github.com/alamin-mahamud"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg group"
            >
              <Github size={18} className="mr-2" />
              View GitHub Profile
            </a>
            
            <div className="text-sm text-muted-foreground">
              {projects.reduce((sum, p) => sum + (p.stats.stars || 0), 0).toLocaleString()}+ stars across {projects.length} repositories
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects