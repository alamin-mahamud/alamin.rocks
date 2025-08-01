"use client"

import { useState, useEffect } from "react"
import { Quote, Linkedin, Star, Users, Building, Calendar, ChevronRight } from "lucide-react"
import { portfolioApi, LinkedInRecommendation } from "@/lib/api"
import Pagination from "./ui/Pagination"

const RECOMMENDATIONS_PER_PAGE = 4

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<LinkedInRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await portfolioApi.getRecommendations()
        setRecommendations(data)
      } catch (error) {
        console.error("Failed to fetch recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

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

  // Pagination
  const totalPages = Math.ceil(recommendations.length / RECOMMENDATIONS_PER_PAGE)
  const startIndex = (currentPage - 1) * RECOMMENDATIONS_PER_PAGE
  const paginatedRecommendations = recommendations.slice(startIndex, startIndex + RECOMMENDATIONS_PER_PAGE)

  return (
    <section id="recommendations" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Professional Recommendations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Testimonials from colleagues, clients, and industry leaders
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="inline-flex items-center px-4 py-2 bg-[#0077b5]/10 text-[#0077b5] rounded-full border border-[#0077b5]/20">
              <Linkedin size={18} className="mr-2" />
              <span className="text-sm font-medium">
                {recommendations.length} LinkedIn recommendations
              </span>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-8 text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + RECOMMENDATIONS_PER_PAGE, recommendations.length)} of {recommendations.length} recommendations
        </div>

        {/* Recommendations Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {paginatedRecommendations.map((recommendation, index) => {
            const isExpanded = selectedRecommendation === recommendation.id
            const shouldTruncate = recommendation.content.length > 300

            return (
              <div
                key={recommendation.id}
                className="group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-foreground/10 hover:border-accent/50 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8 relative">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote size={40} className="text-accent" />
                  </div>
                  
                  {/* LinkedIn Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="w-8 h-8 bg-[#0077b5] rounded flex items-center justify-center">
                      <Linkedin size={16} className="text-white" />
                    </div>
                  </div>

                  {/* Recommender Info */}
                  <div className="flex items-start mb-6 mt-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center flex-shrink-0 mr-4 shadow-lg">
                      <span className="text-accent-foreground font-bold text-lg">
                        {recommendation.recommender_name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {recommendation.recommender_name}
                      </h3>
                      <p className="text-accent font-semibold text-sm mb-1">
                        {recommendation.recommender_title}
                      </p>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Building size={14} className="mr-2" />
                        <span>{recommendation.recommender_company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Relationship & Date */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users size={14} className="mr-2" />
                      <span className="font-medium">{recommendation.relationship}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar size={14} className="mr-2" />
                      <span>
                        {new Date(recommendation.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Recommendation Content */}
                  <div className="mb-6">
                    <p className="text-foreground leading-relaxed text-base font-medium">
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
                        className="inline-flex items-center text-accent hover:text-accent/80 text-sm mt-3 font-semibold transition-colors group"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                        <ChevronRight size={14} className={`ml-1 transition-transform ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>
                    )}
                  </div>

                  {/* Skills Mentioned */}
                  {recommendation.skills_mentioned.length > 0 && (
                    <div className="border-t border-border/50 pt-4">
                      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                        <Star size={16} className="mr-2 text-yellow-500" />
                        Skills Highlighted
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.skills_mentioned.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium transition-all duration-200 hover:bg-accent/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/3 to-accent/5 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a 
            href="https://linkedin.com/in/alamin-mahamud" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#0077b5] text-white rounded-xl font-semibold transition-all duration-300 hover:bg-[#005885] hover:shadow-lg hover:shadow-[#0077b5]/25 hover:-translate-y-1 group"
          >
            <Linkedin size={24} className="mr-3" />
            <span className="text-lg">
              View Full LinkedIn Profile
            </span>
            <ChevronRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Recommendations