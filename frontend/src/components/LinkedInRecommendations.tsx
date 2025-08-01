"use client"

import React, { useState } from "react"
import { Quote, Linkedin, Users, Building, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import Pagination from "./ui/Pagination"

interface LinkedInRecommendation {
  text: string
  author: string
  title: string
  relationship: string
}

const RECOMMENDATIONS_PER_PAGE = 6

const LinkedInRecommendations = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRecommendation, setSelectedRecommendation] = useState<number | null>(null)

  // Static LinkedIn recommendations from About component
  const linkedinRecommendations: LinkedInRecommendation[] = [
    {
      text: "I've had the pleasure of working with Alamin, whose **expertise in building cloud-driven SaaS platforms** is impressive. Alamin has guided **DevOps efforts with a focus on scalability, functionality, and efficiency**. Alamin is a **reliable, forward-thinking professional** who delivers **real business impact** through technology.",
      author: "Sunny Parekh",
      title: "Director of Information Security, Technology and Compliance",
      relationship: "Worked directly with Alamin"
    },
    {
      text: "I had the privilege of mentoring him during his 2018 internship where he worked with Django REST Framework. Even then, he stood out for his **technical prowess, problem-solving skills, and ability to deliver production-ready solutions**. His **curiosity and dedication to mastering complex concepts** were truly impressive.",
      author: "Omar Faruque Tuhin",
      title: "Leading Teams to Build Robust Solutions in Kubernetes & Node.js",
      relationship: "Mentored Alamin"
    },
    {
      text: "I rarely come across **real talents** who stand out like Alamin. Alamin's **ability to handle multiple projects** was unlike any I've seen before and made a **dramatic increase in the productivity level** of our company.",
      author: "Ilias Kanchan",
      title: "Kubernetes | CKA | AWS | Linux | RHCE | Ansible | Docker",
      relationship: "Worked with Alamin"
    },
    {
      text: "Alamin is a **problem solver and a very quick learner**. Worked with him in several services directly and found him very **passionate about what he does**. Wish him a very bright career ahead.",
      author: "Fazle Rabby",
      title: "Engineering Manager @ Wolt | DoorDash",
      relationship: "Worked with Alamin on several services"
    },
    {
      text: "It is rare that you come across a person like Alamin Mahamud. He has **transformed himself from a Mechanical Engineer to a professional Software Engineer**. He has built a **reputation in the dev community with his broad vision**. I recommend Alamin Mahamud highly as I know that he will **never let anyone down**.",
      author: "Ariful Islam",
      title: "Software Engineering | Android | Kotlin | Flutter | Node.Js | MongoDB",
      relationship: "Knows Alamin professionally"
    },
    {
      text: "Alamin was a **fantastic person to work with**, and is not only a **multi-skilled and insightful colleague**, but also an **inspiring strategist**. Very good person. Great employee with a **very strong problem solving skills**. He is an **asset to any company**.",
      author: "Al Amin Ibne Mosaddeque Chayan",
      title: "Principal Software Engineer | Certified Laravel Developer, Zend Certified Engineer",
      relationship: "Worked with Alamin"
    }
  ]

  const formatDescription = (text: string) => {
    // Convert markdown-style bold to HTML
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
  }

  // Pagination
  const totalPages = Math.ceil(linkedinRecommendations.length / RECOMMENDATIONS_PER_PAGE)
  const startIndex = (currentPage - 1) * RECOMMENDATIONS_PER_PAGE
  const paginatedRecommendations = linkedinRecommendations.slice(startIndex, startIndex + RECOMMENDATIONS_PER_PAGE)

  return (
    <section id="linkedin-recommendations" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            LinkedIn Recommendations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What colleagues and industry professionals say about working with me
          </p>
          <div className="flex items-center justify-center mt-4 gap-2">
            <Linkedin className="text-accent" size={20} />
            <span className="text-muted-foreground text-sm">
              {linkedinRecommendations.length} recommendations from industry professionals
            </span>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-6 text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + RECOMMENDATIONS_PER_PAGE, linkedinRecommendations.length)} of {linkedinRecommendations.length} recommendations
        </div>

        {/* Recommendations Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {paginatedRecommendations.map((recommendation, index) => {
            const isExpanded = selectedRecommendation === (startIndex + index)
            const shouldTruncate = recommendation.text.length > 250

            return (
              <div
                key={index}
                className="group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5 hover:border-accent/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote size={48} className="text-accent" />
                  </div>

                  {/* LinkedIn Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
                      <Linkedin size={14} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">LinkedIn</span>
                    </div>
                  </div>

                  {/* Recommender Info */}
                  <div className="flex items-start mb-6 mt-12">
                    <div className="w-14 h-14 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-accent-foreground font-semibold text-lg">
                        {recommendation.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {recommendation.author}
                      </h3>
                      <p className="text-accent font-medium text-sm">
                        {recommendation.title}
                      </p>
                      <div className="flex items-center text-muted-foreground text-sm mt-1">
                        <Users size={12} className="mr-1" />
                        <span>{recommendation.relationship}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Content */}
                  <div className="mb-6">
                    <blockquote 
                      className="text-muted-foreground leading-relaxed text-sm italic"
                      dangerouslySetInnerHTML={{ 
                        __html: formatDescription(
                          `"${shouldTruncate && !isExpanded 
                            ? `${recommendation.text.substring(0, 250)}...` 
                            : recommendation.text}"`
                        ) 
                      }}
                    />
                    
                    {shouldTruncate && (
                      <button
                        onClick={() => setSelectedRecommendation(
                          isExpanded ? null : (startIndex + index)
                        )}
                        className="text-accent hover:text-accent/80 text-sm mt-2 font-medium transition-colors"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/3 to-accent/5 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" />
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
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm rounded-full border border-accent/30">
            <Linkedin className="text-accent mr-3" size={24} />
            <span className="text-lg font-medium text-foreground">
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

export default LinkedInRecommendations