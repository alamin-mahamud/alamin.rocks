"use client"

import { useState, useEffect } from "react"
import { Quote, Linkedin, Star, Users, Building, Calendar } from "lucide-react"
import { portfolioApi, LinkedInRecommendation } from "@/lib/api"

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<LinkedInRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await portfolioApi.getRecommendations({ limit: showAll ? undefined : 6 })
        setRecommendations(data)
      } catch (error) {
        console.error("Failed to fetch recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [showAll])

  if (loading) {
    return (
      <section id="recommendations" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading recommendations...</div>
          </div>
        </div>
      </section>
    )
  }

  const displayedRecommendations = showAll ? recommendations : recommendations.slice(0, 6)

  return (
    <section id="recommendations" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            LinkedIn Recommendations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What colleagues and clients say about working with me
          </p>
          <div className="flex items-center justify-center mt-4 gap-2">
            <Linkedin className="text-accent" size={20} />
            <span className="text-muted-foreground mono text-sm">
              {recommendations.length} recommendations from industry professionals
            </span>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {displayedRecommendations.map((recommendation, index) => {
            const isExpanded = selectedRecommendation === recommendation.id
            const shouldTruncate = recommendation.content.length > 300

            return (
              <div
                key={recommendation.id}
                className="group relative bg-card rounded-xl border border-border p-8 card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={48} className="text-accent" />
                </div>

                {/* Recommender Info */}
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-accent-foreground font-semibold mono text-lg">
                      {recommendation.recommender_name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mono">
                      {recommendation.recommender_name}
                    </h3>
                    <p className="text-accent font-medium text-sm mono">
                      {recommendation.recommender_title}
                    </p>
                    <div className="flex items-center text-muted-foreground text-sm mt-1">
                      <Building size={12} className="mr-1" />
                      <span className="mono">{recommendation.recommender_company}</span>
                    </div>
                  </div>
                </div>

                {/* Relationship & Date */}
                <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Users size={12} className="mr-1" />
                    <span className="mono">{recommendation.relationship}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    <span className="mono">
                      {new Date(recommendation.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })}
                    </span>
                  </div>
                </div>

                {/* Recommendation Content */}
                <div className="mb-6">
                  <p className="text-foreground leading-relaxed mono text-sm">
                    {shouldTruncate && !isExpanded 
                      ? `${recommendation.content.substring(0, 300)}...` 
                      : recommendation.content
                    }
                  </p>
                  
                  {shouldTruncate && (
                    <button
                      onClick={() => setSelectedRecommendation(
                        isExpanded ? null : recommendation.id
                      )}
                      className="text-accent hover:text-accent/80 text-sm mt-2 mono font-medium transition-colors"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>

                {/* Skills Mentioned */}
                {recommendation.skills_mentioned.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <h4 className="text-xs font-medium text-muted-foreground mono mb-2 flex items-center">
                      <Star size={12} className="mr-1" />
                      SKILLS MENTIONED
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.skills_mentioned.map((skill, idx) => (
                        <span
                          key={idx}
                          className="badge-tech mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/3 to-accent/5 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* Show More/Less Button */}
        {recommendations.length > 6 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-secondary btn-lg"
            >
              {showAll ? 'Show Less' : `Show All ${recommendations.length} Recommendations`}
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm rounded-full border border-accent/30">
            <Linkedin className="text-accent mr-3" size={24} />
            <span className="text-lg font-medium text-foreground mono">
              <a 
                href="https://linkedin.com/in/alamin-mahamud" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                View full LinkedIn profile for more recommendations
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Recommendations