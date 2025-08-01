"use client"

import React, { useState } from "react"
import { Play, Clock, Eye, Calendar, Search, Filter, Grid, List } from "lucide-react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

interface PodcastEpisode {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  publishedAt: string
  tags: string[]
  videoUrl: string
}

const PodcastPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  
  // Sample podcast episodes data - replace with real data
  const podcastEpisodes: PodcastEpisode[] = [
    {
      id: "1",
      title: "Building Scalable Cloud Infrastructure with Kubernetes",
      description: "Deep dive into Kubernetes orchestration, scaling strategies, and best practices for production deployments.",
      thumbnail: "/api/placeholder/320/180",
      duration: "45:32",
      views: "12.5K",
      publishedAt: "2025-01-15",
      tags: ["Kubernetes", "DevOps", "Cloud"],
      videoUrl: "https://youtube.com/watch?v=example1"
    },
    {
      id: "2",
      title: "FastAPI vs Django: Modern Python Web Development",
      description: "Comparing FastAPI and Django for building modern web applications, performance benchmarks, and use cases.",
      thumbnail: "/api/placeholder/320/180",
      duration: "38:21",
      views: "8.9K",
      publishedAt: "2025-01-08",
      tags: ["Python", "FastAPI", "Django"],
      videoUrl: "https://youtube.com/watch?v=example2"
    },
    {
      id: "3",
      title: "Microservices Architecture with Go and Docker",
      description: "Building microservices using Go, containerization with Docker, and orchestration patterns.",
      thumbnail: "/api/placeholder/320/180",
      duration: "52:18",
      views: "15.2K",
      publishedAt: "2025-01-01",
      tags: ["Go", "Microservices", "Docker"],
      videoUrl: "https://youtube.com/watch?v=example3"
    },
    {
      id: "4",
      title: "AI-Powered DevOps: Automating Infrastructure with Machine Learning",
      description: "Exploring how AI and ML can revolutionize DevOps workflows, from automated monitoring to predictive scaling.",
      thumbnail: "/api/placeholder/320/180",
      duration: "41:45",
      views: "22.1K",
      publishedAt: "2024-12-25",
      tags: ["AI", "DevOps", "Machine Learning"],
      videoUrl: "https://youtube.com/watch?v=example4"
    },
    {
      id: "5",
      title: "Terraform Best Practices for Enterprise Infrastructure",
      description: "Advanced Terraform techniques, state management, and infrastructure as code patterns for large organizations.",
      thumbnail: "/api/placeholder/320/180",
      duration: "48:33",
      views: "18.7K",
      publishedAt: "2024-12-18",
      tags: ["Terraform", "IaC", "Enterprise"],
      videoUrl: "https://youtube.com/watch?v=example5"
    },
    {
      id: "6",
      title: "Next.js 14 and Server Components Deep Dive",
      description: "Exploring Next.js 14 features, server components, and modern React development patterns.",
      thumbnail: "/api/placeholder/320/180",
      duration: "43:12",
      views: "25.8K",
      publishedAt: "2024-12-11",
      tags: ["Next.js", "React", "Frontend"],
      videoUrl: "https://youtube.com/watch?v=example6"
    }
  ]

  // Get all unique tags
  const allTags = Array.from(new Set(podcastEpisodes.flatMap(episode => episode.tags)))

  // Filter episodes based on search and tags
  const filteredEpisodes = podcastEpisodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         episode.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || episode.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const EpisodeCard: React.FC<{ episode: PodcastEpisode; isListView?: boolean }> = ({ 
    episode, 
    isListView = false 
  }) => (
    <div className={`group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all duration-300 ${
      isListView ? 'flex gap-4' : ''
    }`}>
      {/* Thumbnail */}
      <div className={`relative bg-muted ${isListView ? 'w-80 flex-shrink-0' : 'aspect-video'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-accent/30 transition-colors">
            <Play className="w-8 h-8 text-accent ml-1" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
          {episode.duration}
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${isListView ? 'flex-1' : ''}`}>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {episode.title}
        </h3>
        <p className={`text-muted-foreground text-sm mb-3 ${isListView ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {episode.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {episode.tags.slice(0, 3).map(tag => (
            <span key={tag} className="badge-tech text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{episode.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(episode.publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
              🎙️ Source Code Podcast
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Deep technical discussions on cloud infrastructure, DevOps, and modern software engineering practices
            </p>
            
            {/* Channel Stats */}
            <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>{podcastEpisodes.length} Episodes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Weekly Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Technical Deep Dives</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search episodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg border transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-accent text-accent-foreground border-accent' 
                    : 'bg-card border-border hover:border-accent/50'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg border transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-accent text-accent-foreground border-accent' 
                    : 'bg-card border-border hover:border-accent/50'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                !selectedTag 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-card border border-border hover:border-accent/50'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === tag 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-card border border-border hover:border-accent/50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground mb-6">
            Showing {filteredEpisodes.length} of {podcastEpisodes.length} episodes
          </div>

          {/* Episodes Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredEpisodes.map((episode, index) => (
              <div
                key={episode.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-fade-up"
              >
                <a href={episode.videoUrl} target="_blank" rel="noopener noreferrer">
                  <EpisodeCard episode={episode} isListView={viewMode === 'list'} />
                </a>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredEpisodes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg mb-4">No episodes found</div>
              <p className="text-muted-foreground">
                Try adjusting your search query or filter tags
              </p>
            </div>
          )}

          {/* Subscribe CTA */}
          <div className="text-center mt-16 py-12 bg-muted/30 rounded-xl">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Stay Updated with New Episodes
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to get notified about new technical deep dives, interviews with industry experts, 
              and insights into modern software engineering practices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://sourcecode.alamin.rocks"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                🎙️ Visit Podcast Website
              </a>
              <a
                href="https://youtube.com/@sourcecode-podcast"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default PodcastPage